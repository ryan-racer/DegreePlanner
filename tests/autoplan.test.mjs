import test from 'node:test';
import assert from 'node:assert/strict';
import { autoPlan, upcomingTerms, inferGraduation, seasonPattern } from '../js/engine/autoplan.js';
import { school, loadDetails, details, prog, c } from './helpers.mjs';

const base = [c('CS 101', 'completed', { term: 'Fall 2025', hours: 4 }), c('MA 101', 'completed', { term: 'Fall 2025', hours: 3 })];
const run = (requirements, extra = {}) => autoPlan({ school, programs: [prog(requirements)], courses: base, plan: [], hoursPerTerm: 16, loadDetails, ...extra });
const where = (r, code) => r.plan.find((t) => t.courses.some((x) => x.code === code))?.term;

test('upcoming terms alternate fall and spring; graduation defaults to eight semesters', () => {
  assert.deepEqual(upcomingTerms('Fall 2025', 3), ['Spring 2026', 'Fall 2026', 'Spring 2027']);
  assert.equal(inferGraduation(base), 'Spring 2029');
});

test('season prediction from history', () => {
  assert.equal(seasonPattern(details['CS 350'], school.scheduleTerms).label, 'fall only');
  assert.equal(seasonPattern(details['CS 360'], school.scheduleTerms).label, 'spring only');
  assert.equal(seasonPattern(null, school.scheduleTerms).label, 'no recent offerings');
});

test('courses land only in seasons they have run in', async () => {
  const r = await run([{ type: 'all', name: 'Topics', items: ['CS 350', 'CS 360'] }]);
  assert.match(where(r, 'CS 350'), /^Fall/);
  assert.match(where(r, 'CS 360'), /^Spring/);
});

test('prerequisite chains are ordered across terms', async () => {
  const r = await run([{ type: 'all', name: 'Core', items: ['CS 201', 'CS 301'] }]);
  const order = upcomingTerms('Fall 2025', 10);
  assert.ok(order.indexOf(where(r, 'CS 201')) < order.indexOf(where(r, 'CS 301')));
});

test('a missing prerequisite is planned only when it is the way forward', async () => {
  const needed = await run([{ type: 'course', name: 'Algorithms', options: ['CS 301'] }]);
  assert.ok(where(needed, 'CS 201'), 'CS 201 is added because CS 301 cannot be taken without it');
  assert.equal(needed.placed.find((p) => p.code === 'CS 201').prereqFor, 'CS 301');
  const optional = await run([{ type: 'choose', name: 'One of', count: 1, from: ['CS 301', 'CS 350'] }]);
  assert.equal(where(optional, 'CS 201'), undefined, 'no prerequisite is dragged in when another option is takeable');
});

test('senior design waits for the final year and keeps its order', async () => {
  const r = await run([{ type: 'all', name: 'Path', items: ['CS 201', 'CS 301', 'CS 401', 'CS 402'] }], { graduateBy: 'Spring 2029' });
  const order = upcomingTerms('Fall 2025', 12);
  assert.ok(order.indexOf(where(r, 'CS 401')) >= order.indexOf('Fall 2028'));
  assert.ok(order.indexOf(where(r, 'CS 401')) < order.indexOf(where(r, 'CS 402')));
});

test('terms never exceed the hours cap, and the cap never exceeds the school maximum', async () => {
  const r = await autoPlan({ school, programs: [prog([{ type: 'all', name: 'Lots', items: ['CS 201', 'CS 310', 'CS 350', 'CS 360', 'CS 301'] }])], courses: base, plan: [], hoursPerTerm: 99, loadDetails });
  for (const t of r.plan) assert.ok(t.courses.reduce((a, x) => a + (x.hours ?? 3), 0) <= 18, `${t.term} is over 18 hours`);
});

test('pattern slots and distribution needs become placeholders; user entries are preserved', async () => {
  const mine = [{ term: 'Spring 2026', courses: [{ code: 'CS 360', hours: 3 }] }];
  const r = await autoPlan({ school, programs: [prog([{ type: 'choose', name: 'Upper', count: 2, from: [{ dept: 'CS', min: 300 }] }])], courses: base, plan: mine, hoursPerTerm: 16, loadDetails, distNeed: { I: 1 } });
  assert.ok(r.plan.find((t) => t.term === 'Spring 2026').courses.some((x) => x.code === 'CS 360' && !x.auto));
  assert.equal(r.placeholders.filter((p) => /elective/.test(p.label)).length, 1, 'one pattern slot is still open after the user course');
  assert.equal(r.placeholders.filter((p) => /Distribution I/.test(p.label)).length, 1);
});
