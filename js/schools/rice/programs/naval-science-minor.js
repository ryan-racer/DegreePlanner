export default {
  id: 'naval-science-minor',
  name: 'Naval Science',
  degree: 'Minor',
  kind: 'minor',
  school: 'Interdisciplinary',
  url: 'https://ga.rice.edu/programs-study/departments-programs/interdisciplinary/naval-science/naval-science-minor/',
  hours: 18,
  notes: [
    'Open to all degree-seeking Rice undergraduates.',
    'NAVA 303 and NAVA 411 are offered every other year; all other NAVA courses are offered annually.',
    'At least 3 courses (9 hours) at the 300 level or above. At most 2 courses from study abroad or transfer credit.',
  ],
  requirements: [
    { type: 'all', name: 'Core Requirements', items: ['NAVA 101', 'NAVA 103', 'NAVA 203', 'NAVA 402'] },
    { type: 'choose', name: 'Elective Requirements', count: 2, from: ['NAVA 301', 'NAVA 302', 'NAVA 303', 'NAVA 403', 'NAVA 411'] },
  ],
};
