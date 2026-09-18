export default {
  id: 'public-health-sciences-ba',
  name: 'Public Health Sciences',
  degree: 'BA',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/public-health-sciences/public-health-sciences-ba/',
  hours: 42,
  notes: [
    'Electives: 8 courses (24 hours) total, with at least 2 from the Humanities/Social Sciences list and at least 2 from the Engineering/Natural Sciences list.',
    'HEAL 379 and HEAL 495 are variable-credit courses; electives must total at least 24 credit hours.',
  ],
  requirements: [
    { type: 'all', name: 'Core Requirements', items: ['HEAL 222', 'HEAL 372', 'HEAL 407', 'HEAL 412', 'HEAL 462', 'KINE 319'] },
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Humanities and Social Sciences Electives', count: 2, from: [
        'AAAS 317', 'ANTH 381', 'ANTH 386', 'ANTH 446', 'ECON 481', 'ENGL 272', 'ENGL 273', 'ENST 301', 'ENST 315', 'ENST 367',
        'MDHM 201', 'MDHM 359', 'PHIL 266', 'PHIL 354', 'POLI 329', 'PSYC 345', 'PSYC 346', 'SOCI 313', 'SOCI 345', 'SOCI 351',
        'SOCI 465', 'SOSC 330',
      ]},
      { type: 'choose', name: 'Engineering and Natural Sciences Electives', count: 2, from: [
        'BIOE 360', 'BIOS 201', 'BIOS 101', 'BIOS 353', 'BIOS 370', 'BIOS 372', 'GLHT 201', 'HEAL 103', 'HEAL 119', 'HEAL 132',
        'HEAL 208', 'HEAL 212', 'HEAL 306', 'HEAL 313', 'HEAL 338', 'HEAL 350', 'HEAL 360', 'HEAL 375', 'HEAL 376', 'HEAL 379',
        'HEAL 380', 'HEAL 403', 'HEAL 495', 'HEAL 498', 'KINE 300', 'KINE 301', 'KINE 326', 'KINE 440',
      ]},
      { type: 'choose', name: 'Additional Electives (either list)', count: 4, from: [
        'AAAS 317', 'ANTH 381', 'ANTH 386', 'ANTH 446', 'ECON 481', 'ENGL 272', 'ENGL 273', 'ENST 301', 'ENST 315', 'ENST 367',
        'MDHM 201', 'MDHM 359', 'PHIL 266', 'PHIL 354', 'POLI 329', 'PSYC 345', 'PSYC 346', 'SOCI 313', 'SOCI 345', 'SOCI 351',
        'SOCI 465', 'SOSC 330',
        'BIOE 360', 'BIOS 201', 'BIOS 101', 'BIOS 353', 'BIOS 370', 'BIOS 372', 'GLHT 201', 'HEAL 103', 'HEAL 119', 'HEAL 132',
        'HEAL 208', 'HEAL 212', 'HEAL 306', 'HEAL 313', 'HEAL 338', 'HEAL 350', 'HEAL 360', 'HEAL 375', 'HEAL 376', 'HEAL 379',
        'HEAL 380', 'HEAL 403', 'HEAL 495', 'HEAL 498', 'KINE 300', 'KINE 301', 'KINE 326', 'KINE 440',
      ]},
    ]},
  ],
};
