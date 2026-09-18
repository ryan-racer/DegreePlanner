export default {
  id: 'german-studies-ba',
  name: 'German Studies',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/german-studies/german-studies-ba/',
  hours: 30,
  notes: [
    'Placement test determines level; students may place out of 100- and 200-level courses in consultation with the program advisor.',
    'GERM 263/264 and GERM 301/302 may be replaced by intensive summer language courses at the University of Leipzig.',
    'At most 2 electives may be 100-level GERM courses, and at most 2 may be courses taught in English (GERM 322, 324, 326, 333, 336, 340, 345, 352). Any 100- or 200-level elective may be replaced by a higher-level GERM course.',
  ],
  requirements: [
    { type: 'all', name: 'Core Requirements', items: ['GERM 263', 'GERM 264', 'GERM 301', 'GERM 302'] },
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'GERM Electives at the 400 level or above', count: 2, from: [{ dept: 'GERM', min: 400 }] },
      { type: 'choose', name: 'GERM Electives at the 300 level or above', count: 2, from: [{ dept: 'GERM', min: 300 }] },
      { type: 'choose', name: 'GERM Electives (any level)', count: 2, from: [{ dept: 'GERM', min: 100 }] },
    ]},
  ],
  constraints: [
    { type: 'atMost', count: 2, from: [{ dept: 'GERM', max: 199 }], among: ['1'], label: 'No more than 2 electives at the 100 level' },
    { type: 'atMost', count: 2, from: ['GERM 322', 'GERM 324', 'GERM 326', 'GERM 333', 'GERM 336', 'GERM 340', 'GERM 345', 'GERM 352'], among: ['1'],
      label: 'No more than 2 electives taught in English' },
  ],
};
