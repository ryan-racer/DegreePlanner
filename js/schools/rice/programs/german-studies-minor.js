export default {
  id: 'german-studies-minor',
  name: 'German Studies',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/german-studies/german-studies-minor/',
  hours: 18,
  notes: [
    'Any lower-level course (GERM 100-299) may be replaced by a course at the 300 level or above.',
  ],
  constraints: [
    { type: 'atMost', count: 2, from: [{ dept: '*', min: 200, max: 299 }], label: 'At most 2 courses at the 200 level' },
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'GERM courses at the 100 level or above', count: 3, from: [{ dept: 'GERM', min: 100 }] },
      { type: 'choose', name: 'GERM courses at the 300 level or above', count: 3, from: [{ dept: 'GERM', min: 300 }] },
    ]},
  ],
};
