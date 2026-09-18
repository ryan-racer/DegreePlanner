import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTranscript } from '../js/parser/transcript.js';

// Synthetic transcript reproducing the quirks of real ESTHER PDFs (no real student data).
const ESTHER = `Unofficial Academic Transcript - Test University
Current Program
Major (Major Concentration)
Electrical & Computer Eng.
AWARDED:
Sought
BS in Electrical & Comp Engi
Major (Major Concentration)
Electrical & Computer Eng.
Minor
Medical Humanities
TRANSFER CREDIT ACCEPTED BY INSTITUTION
2021-2023: Example College
Subject Course Title Grade Credit Hours Quality Points R
COMP 140 COMPUTATIONAL THINKING TR 4.000 0.00
ARTS 210 INTERMEDIATE WATERCOLOR STUDIOTR 2.001 0.00
TRAN 100 INTRO TO PROGRAMMING IN C++TR 2.340 0.00 I
TRAN 100 SURVEY OF WORLD MUSICTR 3.335 0.00
INSTITUTION CREDIT
Term: Fall Semester 2024
Subject Course Level Title Grade Credit Quality R
Hours Points
CMOR 220 UG INTRO TO ENG A+ 3.000 12.00
COMPUTATION
MATH 101 UG SINGLE VARIABLE CALCULUS IA+ 3.000 12.00
PHYS 103 UG MECHANICS DISCUSSION S 0.000 0.00
ELEC 999 UG FAILED THING F 3.000 0.00
Term Totals Attempt Hours Passed Hours Earned Hours GPA Hours Quality Points GPA
Current Term 16.000 16.000 16.000 16.000 62.68 3.91
COURSE(S) IN PROGRESS
Term: Fall Semester 2026
Subject Course Level Title Credit Hours
ELEC 303 UG RANDOM SIGNALS 3.000
`;

test('ESTHER quirks: terms, glued grades, placeholders, zero hours, statuses', () => {
  const { courses, declared } = parseTranscript(ESTHER, { transcript: { generic: /^TRAN \d/ } });
  const by = Object.fromEntries(courses.map((c) => [c.code, c]));
  const generic = courses.filter((c) => c.generic);
  assert.deepEqual(generic.map((c) => c.hours), [2.34, 3.335], 'each unarticulated transfer row is kept as general credit');
  assert.equal(by['MATH 101'].grade, 'A+', 'grade glued to the title is recovered');
  assert.equal(by['MATH 101'].term, 'Fall 2024', '"Fall Semester 2024" is understood');
  assert.equal(by['ARTS 210'].grade, 'TR');
  assert.equal(by['ARTS 210'].source, 'transfer');
  assert.equal(by['PHYS 103'].hours, 0, 'zero-credit sections keep zero hours');
  assert.equal(by['ELEC 999'].status, 'failed');
  assert.equal(by['ELEC 303'].status, 'in-progress', 'no grade column in the in-progress section');
  assert.equal(by['ELEC 303'].term, 'Fall 2026');
  assert.deepEqual(declared.majors, ['Electrical & Computer Eng.']);
  assert.deepEqual(declared.minors, ['Medical Humanities']);
  assert.match(declared.degreeHint, /BS in/);
});

test('split rows, Banner term codes, comma lists, and still-needed lines', () => {
  const t = 'Term: 202510\nCOMP 182 UG ALGORITHMIC THINKING\nB 4.000 12.00\nStill needed: 1 Class in COMP 999\nTaken: COMP 140, COMP 215 and MATH 102';
  const { courses, warnings } = parseTranscript(t, {});
  const codes = courses.map((c) => c.code).sort();
  assert.deepEqual(codes, ['COMP 140', 'COMP 182', 'COMP 215', 'MATH 102']);
  assert.equal(courses.find((c) => c.code === 'COMP 182').grade, 'B');
  assert.equal(courses.find((c) => c.code === 'COMP 182').term, 'Fall 2024');
  assert.ok(warnings.some((w) => /still needed/i.test(w)));
});

test('duplicates: same term merges, transfer plus institution merges, different terms are kept', () => {
  const t = 'TRANSFER CREDIT\nMATH 101 CALC TR 3.000 0.00\nINSTITUTION CREDIT\nTerm: Fall 2024\nMATH 101 UG CALC A 3.000 12.00\nMUSI 401 UG STUDIO A 1.000 4.00\nTerm: Spring 2025\nMUSI 401 UG STUDIO A 1.000 4.00';
  const { courses } = parseTranscript(t, {});
  assert.equal(courses.filter((c) => c.code === 'MATH 101').length, 1);
  assert.equal(courses.filter((c) => c.code === 'MUSI 401').length, 2);
});
