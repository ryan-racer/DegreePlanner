import test from 'node:test';
import assert from 'node:assert/strict';
import { detectDeclared } from '../js/import/declared.js';

const programs = [
  { id: 'ece-ba', name: 'Electrical and Computer Engineering', degree: 'BA', kind: 'major' },
  { id: 'ece-bs', name: 'Electrical and Computer Engineering', degree: 'BSECE', kind: 'major' },
  { id: 'cs-ba', name: 'Computer Science', degree: 'BA', kind: 'major' },
  { id: 'asia-lang', name: 'Asian Studies: Asian Language Concentration', degree: 'BA', kind: 'major' },
  { id: 'asia-minor', name: 'Asian Studies', degree: 'Minor', kind: 'minor' },
  { id: 'phs', name: 'Public Health Sciences', degree: 'BA', kind: 'major' },
  { id: 'mdhm', name: 'Medical Humanities', degree: 'Minor', kind: 'minor' },
];

test('abbreviated transcript names resolve, and the degree line breaks BA/BS ties', () => {
  assert.deepEqual(detectDeclared({ majors: ['Electrical & Computer Eng.'], minors: [], degreeHint: 'BS in Electrical & Comp Engi' }, programs), ['ece-bs']);
  assert.deepEqual(detectDeclared({ majors: ['Electrical & Computer Eng.'], minors: [], degreeHint: 'Bachelor of Arts' }, programs), ['ece-ba']);
});

test('concentrations, partial names, and minors', () => {
  const found = detectDeclared({ majors: ['Health Sciences', 'Asian Studies (Asian Language)'], minors: ['Medical Humanities'], degreeHint: 'Bachelor of Arts' }, programs);
  assert.deepEqual(found, ['phs', 'asia-lang', 'mdhm']);
});

test('unknown names resolve to nothing rather than a wrong program', () => {
  assert.deepEqual(detectDeclared({ majors: ['Underwater Basket Weaving'], minors: [], degreeHint: '' }, programs), []);
});
