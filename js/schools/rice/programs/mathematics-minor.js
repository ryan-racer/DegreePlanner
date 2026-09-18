export default {
  id: 'mathematics-minor',
  name: 'Mathematics',
  degree: 'Minor',
  kind: 'minor',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/mathematics/mathematics-minor/',
  hours: 18,
  notes: [
    'All 6 courses must be MATH courses at the 200 level or above. Each course number may count only once.',
    'With advance approval, one core area may be satisfied by an approved non-MATH course (which does not count toward the 18 hours) or another upper-level MATH course.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Analysis', count: 1, from: ['MATH 302', 'MATH 321', 'MATH 331', 'MATH 381', 'MATH 382'] },
      { type: 'choose', name: 'Discrete Mathematics and Algebra', count: 1, from: ['MATH 306', 'MATH 356', 'MATH 365', 'MATH 368'] },
      { type: 'choose', name: 'Linear Algebra', count: 1, from: ['MATH 221', 'MATH 354', 'MATH 355'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 3, from: [{ dept: 'MATH', min: 200 }],
      note: 'Additional MATH courses at the 200 level or above.' },
  ],
  constraints: [
    { type: 'atLeast', count: 4, from: [{ dept: 'MATH', min: 300 }], label: 'At least 4 MATH courses at the 300 level or above' },
    { type: 'atMost', hours: 3, from: ['MATH 479', { dept: 'MATH', min: 490, max: 499 }], among: ['1'], label: 'At most 3 elective credit hours from MATH 479 and MATH 490-499' },
  ],
};
