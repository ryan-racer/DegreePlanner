import test from 'node:test';
import assert from 'node:assert/strict';
import { prereqStatus, prereqNeeds } from '../js/data/courseinfo.js';

const taken = new Set(['COMP 215', 'MATH 101']);
test('prereqStatus evaluates and/or with parentheses and boilerplate', () => {
  assert.equal(prereqStatus('COMP 215 and COMP 321', taken).met, false);
  assert.equal(prereqStatus('(COMP 215 or COMP 310) and MATH 101', taken).met, true);
  assert.equal(prereqStatus('COMP 182 or COMP 215', taken).met, true);
  assert.equal(prereqStatus('Prerequisite(s): COMP 321 with a minimum grade of C', taken).met, false);
  assert.equal(prereqStatus('Junior standing', taken).met, null);
  assert.equal(prereqStatus('', taken).met, null);
});
test('prereqNeeds returns the cheapest set of courses to add', () => {
  assert.deepEqual(prereqNeeds('COMP 215 and COMP 321', taken), ['COMP 321']);
  assert.deepEqual(prereqNeeds('(COMP 182 or COMP 310) and MATH 102', taken), ['COMP 182', 'MATH 102']);
  assert.deepEqual(prereqNeeds('COMP 215 or COMP 999', taken), []);
  assert.deepEqual(prereqNeeds('Junior standing', taken), []);
});
