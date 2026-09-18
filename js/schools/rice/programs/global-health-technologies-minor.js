export default {
  id: 'global-health-technologies-minor',
  name: 'Global Health Technologies',
  degree: 'Minor',
  kind: 'minor',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/global-health-technologies/global-health-technologies-minor/',
  hours: 22,
  notes: [
    'All other core courses must be completed before enrolling in the capstone (GLHT 451, GLHT 452); electives may be taken concurrently.',
    'A core selection course (e.g. ANTH 381, SOCI 345) not used for the core may count as an elective instead.',
    'At most 2 courses from study abroad or transfer credit. Minimum minor GPA of 2.00.',
  ],
  constraints: [
    { type: 'atLeast', count: 4, from: [{ dept: '*', min: 300 }], label: 'At least 4 courses at the 300 level or above' },
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'all', name: 'Required Core', items: ['GLHT 201', ['GLHT 360', 'BIOE 360']] },
      { type: 'choose', name: 'Core Selection', count: 1, from: ['ANTH 381', 'GLHT 314', 'BIOE 365', 'CEVE 314', 'GLHT 364', 'ENTR 364', 'SOSC 364', 'GLHT 392', 'BIOE 392', 'PSYC 370', 'SOCI 345', 'SOCI 381'] },
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Natural Sciences/Engineering Electives', count: 1, from: [
        'BIOE 449', 'GLHT 449', 'BIOS 318', 'BIOS 372', 'BIOS 424', 'BIOS 431', 'BIOS 447', 'BIOS 450', 'BIOS 460', 'CEVE 302', 'ENGI 302', 'EDES 200', 'EDES 350',
        'GLHT 314', 'BIOE 365', 'CEVE 314', 'GLHT 400', 'GLHT 401', 'GLHT 448', 'GLHT 510', 'BIOE 510', 'KINE 319', 'STAT 280', 'STAT 180', 'STAT 305',
      ], note: 'Minimum of 3 credit hours.' },
      { type: 'choose', name: 'Humanities/Social Sciences Electives', count: 1, from: [
        'ANTH 366', 'ANTH 381', 'ANTH 443', 'ANTH 446', 'ECON 450', 'ECON 460', 'ECON 481', 'ECON 484', 'ENGL 272', 'MDHM 272', 'ENGL 273', 'SWGS 273', 'ENGL 386', 'FILM 381',
        'ENST 313', 'ARCH 313', 'ENST 315', 'GLHT 364', 'ENTR 364', 'SOSC 364', 'HEAL 222', 'HEAL 313', 'HEAL 350', 'HEAL 375', 'HEAL 380', 'HEAL 407', 'HEAL 422', 'HEAL 460',
        'HIST 222', 'HIST 223', 'AAAS 223', 'HIST 312', 'PHIL 266', 'MDHM 266', 'PHIL 354', 'MDHM 354', 'POLI 260', 'LEAD 260', 'POLI 329', 'PSYC 345', 'PSYC 370', 'PSYC 409', 'PSYC 480',
        'RELI 424', 'SOCI 313', 'SOCI 345', 'SOCI 377', 'SOCI 381', 'SOCI 406', 'SOCI 453', 'SOCI 465', 'SWGS 465',
      ], note: 'Minimum of 3 credit hours.' },
    ]},
    { type: 'all', name: 'Capstone Requirement', items: ['GLHT 451', 'GLHT 452'] },
  ],
};
