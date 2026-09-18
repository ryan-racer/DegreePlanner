import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareCourses, auditProgram, suggestCourses } from '../js/engine/audit.js';
import { school, prog, c } from './helpers.mjs';

const prep = (list) => prepareCourses(list, school, {});

test('all / course / choose / hours count remaining slots', () => {
  const p = prog([
    { type: 'all', name: 'Core', items: ['CS 101', 'CS 201', ['MA 101', 'MA 105']] },
    { type: 'choose', name: 'Pick', count: 2, from: ['CS 301', 'CS 310', 'CS 350'] },
    { type: 'hours', name: 'Upper', hours: 6, from: [{ dept: 'CS', min: 300 }] },
  ]);
  const r = auditProgram(p, prep([c('CS 101'), c('MA 101'), c('CS 301'), c('CS 310'), c('CS 350')]));
  assert.equal(r.tree[0].remaining, 1);          // CS 201 missing
  assert.equal(r.tree[1].remaining, 0);
  assert.equal(r.tree[2].earned, 3);             // only CS 350 left for the hours node
  assert.equal(r.remaining, 1 + 0 + 1);
});

test('a course fills only one slot, and named slots win over broad patterns', () => {
  const p = prog([
    { type: 'choose', name: 'Elective', count: 1, from: [{ dept: 'CS', min: 300 }] },
    { type: 'course', name: 'Algorithms', options: ['CS 301'] },
  ]);
  const r = auditProgram(p, prep([c('CS 301'), c('CS 310')]));
  assert.equal(r.remaining, 0);
  assert.equal(r.tree[0].filled[0].code, 'CS 310');
  assert.equal(r.tree[1].slots[0].course.code, 'CS 301');
});

test('demand tie-break: the slot with a single option gets that course', () => {
  const p = prog([{ type: 'choose', name: 'A', count: 1, from: ['CS 301', 'CS 310'] }, { type: 'course', name: 'B', options: ['CS 301'] }]);
  const r = auditProgram(p, prep([c('CS 301'), c('CS 310')]));
  assert.equal(r.remaining, 0);
});

test('cross-listed courses count for every listing', () => {
  const p = prog([{ type: 'course', name: 'Prob', options: ['STAT 310'] }]);
  assert.equal(auditProgram(p, prep([c('ECON 307')])).remaining, 0);
});

test('atLeast quotas and exclusive groups', () => {
  const node = { type: 'choose', name: 'Electives', count: 3, from: ['CS 301', 'CS 310', 'CS 350', 'MA 101', 'STAT 310'],
    atLeast: [{ count: 2, from: [{ dept: 'CS' }], label: 'CS elective' }], exclusive: [['CS 301', 'CS 310']] };
  const r = auditProgram(prog([node]), prep([c('CS 301'), c('CS 310'), c('MA 101'), c('STAT 310')]));
  // CS 301 and CS 310 are exclusive, so only one CS course can count: quota of 2 is short by one.
  assert.equal(r.remaining, 1);
  assert.equal(r.tree[0].missing[0].label, 'CS elective');
});

test('any picks the closest option', () => {
  const p = prog([{ type: 'any', name: 'Track', options: [
    { type: 'all', name: 'Systems', items: ['CS 310', 'CS 360'] },
    { type: 'all', name: 'Theory', items: ['CS 301', 'CS 350'] },
  ] }]);
  const r = auditProgram(p, prep([c('CS 301'), c('CS 350')]));
  assert.equal(r.tree[0].chosen.node.name, 'Theory');
  assert.equal(r.remaining, 0);
});

test('failed courses never count; completed beats in-progress beats planned', () => {
  const p = prog([{ type: 'choose', name: 'One', count: 1, from: [{ dept: 'CS' }] }]);
  assert.equal(auditProgram(p, prep([c('CS 101', 'failed')])).remaining, 1);
  const r = auditProgram(p, prep([c('CS 101', 'planned'), c('CS 201', 'in-progress'), c('CS 301', 'completed')]));
  assert.equal(r.tree[0].filled[0].code, 'CS 301');
});

test('manual substitutions fill the named slot and are not reused', () => {
  const p = prog([{ type: 'all', name: 'Core', items: ['CS 101', 'CS 201'] }, { type: 'choose', name: 'Any', count: 1, from: [{ dept: 'MA' }] }]);
  const courses = prep([c('CS 101'), c('MA 101')]);
  const r = auditProgram(p, courses, [{ key: '0#1', code: 'MA 101' }]);
  assert.equal(r.tree[0].slots[1].manual, true);
  assert.equal(r.tree[0].remaining, 0);
  assert.equal(r.tree[1].remaining, 1);          // MA 101 was spent on the substitution
});

test('suggestions collapse cross-listed duplicates and report pattern slots', () => {
  const p = prog([{ type: 'choose', name: 'Prob', count: 1, from: ['STAT 310', 'ECON 307'] }, { type: 'choose', name: 'Upper', count: 1, from: [{ dept: 'CS', min: 300 }] }]);
  const courses = prep([]);
  const { suggestions, patterns } = suggestCourses([auditProgram(p, courses)], courses, school, 10);
  assert.equal(suggestions.length, 1);
  assert.equal(patterns.length, 1);
});

test('program-level constraints: atLeast across sections and atMost caps', () => {
  const p = prog([
    { type: 'all', name: 'Core', items: ['CS 101', 'CS 201'] },
    { type: 'choose', name: 'Electives', count: 2, from: [{ dept: 'CS' }, { dept: 'MA' }] },
  ], { constraints: [
    { type: 'atLeast', count: 2, from: [{ dept: '*', min: 300 }], label: 'Two courses at 300+' },
    { type: 'atMost', count: 0, from: [{ dept: 'MA' }], among: ['1'], label: 'No MA electives' },
  ] });
  const bad = auditProgram(p, prep([c('CS 101'), c('CS 201'), c('MA 101'), c('CS 301')]));
  assert.equal(bad.constraints[0].satisfied, false);   // only CS 301 is 300+
  assert.ok(!bad.usedCourses.some((x) => x.code === 'MA 101'), 'a course over an "at most" cap is not spent, so it never counts');
  assert.equal(bad.tree[1].remaining, 1, 'its slot stays open instead');
  assert.equal(bad.satisfied, false);
  const good = auditProgram(p, prep([c('CS 101'), c('CS 201'), c('CS 310'), c('CS 301')]));
  assert.ok(good.constraints.every((k) => k.satisfied));
  assert.equal(good.remaining, 0);
});

test('the picker prefers courses that satisfy an unmet program-level rule', () => {
  // Three electives from any CS course, at least 2 at the 300 level. The student has plenty of both levels;
  // a greedy picker that takes CS 101 and CS 201 first would wrongly report the rule as unmet.
  const p = prog([{ type: 'choose', name: 'Electives', count: 3, from: [{ dept: 'CS' }] }],
    { constraints: [{ type: 'atLeast', count: 2, from: [{ dept: '*', min: 300 }], label: 'Two at 300+' }] });
  const r = auditProgram(p, prep([c('CS 101'), c('CS 201'), c('CS 301'), c('CS 310')]));
  assert.equal(r.constraints[0].satisfied, true);
  assert.equal(r.remaining, 0);
});

test('hour caps stop counting once reached', () => {
  const p = prog([{ type: 'hours', name: 'Research and electives', hours: 9, from: [{ dept: 'CS', min: 300 }] }],
    { constraints: [{ type: 'atMost', hours: 3, from: ['CS 350', 'CS 360'], label: 'At most 3 hours of topics' }] });
  const r = auditProgram(p, prep([c('CS 350'), c('CS 360'), c('CS 301')]));
  assert.equal(r.tree[0].earned, 6, 'only one topics course counts');
  assert.ok(r.constraints[0].satisfied);
});
