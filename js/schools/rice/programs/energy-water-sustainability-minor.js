export default {
  id: 'energy-water-sustainability-minor',
  name: 'Energy and Water Sustainability',
  degree: 'Minor',
  kind: 'minor',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/energy-water-sustainability/energy-water-sustainability-minor/',
  hours: 19,
  notes: [
    'Electives must come from at least 2 of the 3 categories (Energy, Water, Sustainability), with no more than 2 from any one category.',
    'At least 1 elective must be from a school other than the one hosting the student\'s major, and at least 1 elective may not be double-counted with major core requirements.',
    'Design Practicum: CEVE 499 (at least 1 credit hour), typically in the senior year; engineering/architecture students may satisfy it with a sustainability report tied to their capstone design.',
    'BIOS 559 and CHBE 548 are open only to juniors and seniors with permission. At least 5 courses (15 hours) at the 300 level or above. Minimum minor GPA of 2.00.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Engineering Economics or Energy Economics', options: ['CEVE 301', 'ECON 480', 'ENST 480'] },
      { type: 'course', name: 'Sustainable Design or Environmental Law', options: ['CEVE 302', 'ENGI 302', 'CEVE 406', 'ENST 406'] },
      { type: 'course', name: 'Energy and the Environment', options: ['CEVE 307', 'EEPS 307', 'ENST 307'] },
    ]},
    { type: 'course', name: 'Design Practicum', options: ['CEVE 499'] },
    { type: 'choose', name: 'Elective Requirements', count: 3, from: [
      'ASIA 488', 'CHBE 421', 'CHBE 548', 'ECON 437', 'ENST 437', 'EEPS 437', 'EEPS 457', 'ENST 250', 'MECH 475',
      'CEVE 314', 'BIOE 365', 'GLHT 314', 'CEVE 315', 'CEVE 347', 'CEVE 412', 'CEVE 444',
      'ARCH 313', 'ENST 313', 'ARCH 322', 'ENST 322', 'BIOS 280', 'BIOS 559', 'CEVE 406', 'ENST 406', 'CEVE 421', 'CEVE 425', 'CEVE 426', 'CEVE 492', 'ECON 485',
      'EDES 350', 'EEPS 438', 'ENST 210', 'ENST 301', 'ENST 302', 'SOCI 304', 'POLI 332', 'STAT 485',
    ], note: 'From the Energy, Water, and Sustainability categories; at least 2 categories, at most 2 per category.' },
  ],
};
