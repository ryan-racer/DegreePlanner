export default {
  id: 'creative-writing-minor',
  name: 'Creative Writing',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/creative-writing/creative-writing-minor/',
  hours: 18,
  notes: [
    'Of the 6 courses, at least 3 creative writing courses must be at the 300 level or above and at least 1 must be in a second genre or form (poetry, nonfiction, screenwriting, translation, publishing, etc.).',
    'Additional Core Requirement courses may count as electives, but no course counts toward both.',
    'At most 1 elective (3 credit hours) may be from outside ENGL; other outside courses may be approved by an advisor.',
  ],
  constraints: [
    { type: 'atLeast', count: 3, from: [{ dept: '*', min: 300 }], label: 'At least 3 courses at the 300 level or above' },
    { type: 'atLeast', count: 1, from: [{ dept: '*', min: 400, max: 499 }], label: 'At least 1 course at the 400 level' },
  ],
  requirements: [
    { type: 'choose', name: 'Core Requirement', count: 1, from: ['ENGL 113', 'ENGL 114', 'ENGL 201', 'ENGL 205', 'ENGL 301', 'ENGL 304', 'ENGL 305'] },
    { type: 'choose', name: 'Advanced Workshop Requirement', count: 1, from: ['ENGL 401', 'ENGL 402', 'ENGL 403', 'ENGL 404', 'ENGL 405'] },
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Creative writing electives (ENGL)', count: 3, from: [
        'ENGL 113', 'ENGL 114', 'ENGL 203', 'ENGL 204', 'ENGL 205', 'ENGL 261', 'ENGL 301', 'ENGL 302',
        'ENGL 304', 'ENGL 305', 'ENGL 306', 'ENGL 307', 'ENGL 308', 'ENGL 309', 'ENGL 310', 'ENGL 315',
        'ENGL 318', 'ENGL 324', 'ENGL 327', 'ENGL 377', 'ENGL 493',
      ]},
      { type: 'choose', name: 'Additional elective (ENGL or up to 1 approved course outside ENGL)', count: 1, from: [
        'ENGL 113', 'ENGL 114', 'ENGL 203', 'ENGL 204', 'ENGL 205', 'ENGL 261', 'ENGL 301', 'ENGL 302',
        'ENGL 304', 'ENGL 305', 'ENGL 306', 'ENGL 307', 'ENGL 308', 'ENGL 309', 'ENGL 310', 'ENGL 315',
        'ENGL 318', 'ENGL 324', 'ENGL 327', 'ENGL 377', 'ENGL 493', 'AAAS 300', 'ARTS 230', 'EURO 320',
        'FILM 324', 'FILM 327', 'FILM 328', 'FILM 420', 'FILM 444', 'FREN 302', 'FREN 401', 'GERM 402',
        'MDHM 260', 'THEA 313',
      ]},
    ]},
  ],
};
