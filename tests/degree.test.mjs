import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareCourses } from '../js/engine/audit.js';
import { auditDegree } from '../js/engine/degree.js';

const school = { id: 't', defaultHours: 3, catalog: {}, crosslist: {}, degree: {
  hours: 120, upperLevelHours: 48, upperLevel: 300,
  writing: { name: 'Writing', from: [{ dept: 'FWIS' }] },
  activity: { name: 'Activity', from: [{ dept: 'LPAP' }], minHours: 1 },
  hourCaps: [{ label: 'activity credit', from: [{ dept: 'LPAP' }], max: 4 }],
  residency: { hours: 60, upperLevelHours: 25 }, minGpa: 1.67, transferMinHours: 2.5,
  distribution: { groups: ['I', 'II'], courses: 3, minHours: 3, minDepartments: 2 },
  diversity: { name: 'Diversity', minHours: 3 },
} };
const attrs = { 'HIST 101': { dist: 'Distribution Group I' }, 'HIST 102': { dist: 'Distribution Group I' }, 'HIST 103': { dist: 'Distribution Group I' },
  'ENGL 101': { dist: 'Distribution Group I', ad: 1 }, 'ECON 100': { dist: 'Distribution Group II' }, 'HIST 110': { dist: 'Distribution Group I' } };
const loadDetails = async (code) => attrs[code] || null;
const run = (list, programs = []) => auditDegree({ school, programs, loadDetails, courses: prepareCourses(list.map(([code, hours = 3]) => ({ code, hours, status: 'completed' })), school, {}) });

test('hours use the larger of the university minimum and the declared degree; activity hours are capped', async () => {
  const d = await run([['LPAP 101', 1], ['LPAP 102', 1], ['LPAP 103', 1], ['LPAP 104', 1], ['LPAP 105', 1], ['COMP 300', 3]], [{ degreeHours: 125 }]);
  assert.equal(d.hours.need, 125);
  assert.equal(d.hours.have, 4 + 3, 'only 4 activity hours count');
  assert.equal(d.upper.have, 3);
});

test('distribution needs three courses of 3+ hours from at least two departments', async () => {
  const oneDept = await run([['HIST 101'], ['HIST 102'], ['HIST 103']]);
  assert.equal(oneDept.dist.I.satisfied, false);
  assert.equal(oneDept.dist.I.need, 1, 'count is met, but a second department is required');
  const twoDepts = await run([['HIST 101'], ['HIST 102'], ['ENGL 101']]);
  assert.equal(twoDepts.dist.I.satisfied, true);
  const small = await run([['HIST 101'], ['HIST 102'], ['HIST 110', 1]]);
  assert.equal(small.dist.I.have, 2, 'a 1-hour course does not count');
  assert.equal(small.distNeed.II, 3);
});

test('writing, activity, and diversity are single-course checks', async () => {
  const d = await run([['FWIS 100'], ['ENGL 101']]);
  assert.deepEqual(d.missing, ['activity']);
});

test('transferred courses need 2.5 hours to count toward distribution; courses taken here need 3', async () => {
  const mk = (list) => auditDegree({ school, programs: [], loadDetails, courses: prepareCourses(list, school, {}) });
  const tr = (code, hours) => ({ code, hours, status: 'completed', grade: 'TR', source: 'transfer' });
  const ok = await mk([tr('HIST 101', 2.668), tr('HIST 102', 2.668), { code: 'ENGL 101', hours: 3, status: 'completed' }]);
  assert.equal(ok.dist.I.satisfied, true, 'quarter-system courses convert to 2.668 hours and still count');
  const small = await mk([tr('HIST 101', 2.001), { code: 'HIST 102', hours: 2.668, status: 'completed' }]);
  assert.equal(small.dist.I.have, 0, 'a 2-hour transfer course does not count, and neither does a local course under 3 hours');
  assert.deepEqual(small.notes.map((n) => n.about), ['dist:I'], 'the audit says why, attached to the group');
});

test('residency, repeats, unarticulated transfer credit, and GPA', async () => {
  const mk = (list) => auditDegree({ school, programs: [], loadDetails: async (code) => (code === 'MUSI 300' ? { d: 'Ensemble. Repeatable for Credit.' } : null), courses: prepareCourses(list, school, {}) });
  const d = await mk([
    { code: 'TRAN 100', hours: 2.5, status: 'completed', source: 'transfer', generic: true },
    { code: 'TRAN 100', hours: 3.5, status: 'completed', source: 'transfer', generic: true },
    { code: 'COMP 300', hours: 3, status: 'completed', source: 'transfer' },
    { code: 'HIST 300', hours: 3, status: 'completed', grade: 'D', term: 'Fall 2024' },
    { code: 'HIST 300', hours: 3, status: 'completed', grade: 'D+', term: 'Fall 2025' },
    { code: 'MUSI 300', hours: 1, status: 'completed', grade: 'S', term: 'Fall 2024' },
    { code: 'MUSI 300', hours: 1, status: 'completed', grade: 'S', term: 'Fall 2025' },
  ]);
  assert.equal(d.hours.have, 2.5 + 3.5 + 3 + 3 + 2, 'placeholder rows all count; the repeated HIST 300 counts once; the ensemble counts twice');
  assert.equal(d.residency.hours.have, 5);
  assert.equal(d.residency.upper.have, 5);
  assert.equal(d.upper.have, 8);
  assert.ok(d.gpa < 1.67 && d.notes.some((n) => n.about === 'gpa'), 'both HIST 300 attempts are in the GPA');
  assert.ok(d.notes.some((n) => n.about === 'hours' && n.text.includes('HIST 300')));
});

test('excluded departments and excluded course numbers', async () => {
  const s2 = { ...school, degree: { ...school.degree, writing: { name: 'Writing', from: [{ dept: 'FWIS', exclude: ['FWIS 100'] }] }, distribution: { ...school.degree.distribution, excludeDepts: ['FWIS'] } } };
  const load = async (code) => (code.startsWith('FWIS') ? { dist: 'Distribution Group I' } : null);
  const courses = prepareCourses([{ code: 'FWIS 100', hours: 3, status: 'completed' }], s2, {});
  const d = await auditDegree({ school: s2, courses, programs: [], loadDetails: load });
  assert.ok(d.missing.includes('writing'), 'FWIS 100 cannot meet the writing requirement');
  assert.equal(d.dist.I.have, 0, 'writing seminars never count toward distribution');
});
