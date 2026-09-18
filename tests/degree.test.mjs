import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareCourses } from '../js/engine/audit.js';
import { auditDegree } from '../js/engine/degree.js';

const school = { id: 't', defaultHours: 3, catalog: {}, crosslist: {}, degree: {
  hours: 120, upperLevelHours: 48, upperLevel: 300,
  writing: { name: 'Writing', from: [{ dept: 'FWIS' }] },
  activity: { name: 'Activity', from: [{ dept: 'LPAP' }], maxHoursCounted: 4 },
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
