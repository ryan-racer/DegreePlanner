export default {
  id: 'linguistics-ba',
  name: 'Linguistics',
  degree: 'BA',
  kind: 'major',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/linguistics/linguistics-ba/',
  hours: 36,
  notes: [
    'Language requirement: both courses must be in the same language. European languages (FREN, GERM, GREE, ITAL, LATI, PORT, SPAN) at the 200 level or above; non-European languages (ARAB, CHIN, HEBR, JAPA, KORE, TIBT) at the 100 level or above.',
    'One additional Research Seminar beyond LING 499 may be used as an elective.',
  ],
  constraints: [
    { type: 'atLeast', count: 9, from: [{ dept: 'LING', min: 300 }], label: 'At least 9 LING courses at the 300 level or above (including the 5 core courses)' },
  ],
  requirements: [
    { type: 'course', name: 'Required Prerequisite', options: ['LING 200', 'ANTH 200'] },
    { type: 'all', name: 'Core Requirements', items: ['LING 300', 'LING 301', 'LING 400', 'LING 401', 'LING 499'] },
    { type: 'any', name: 'Language Requirement', options: [
      { type: 'choose', name: 'European Language (200-level or above)', count: 2,
        from: [{ dept: ['FREN', 'GERM', 'GREE', 'ITAL', 'LATI', 'PORT', 'SPAN'], min: 200 }] },
      { type: 'choose', name: 'Non-European Language (100-level or above)', count: 2,
        from: [{ dept: ['ARAB', 'CHIN', 'HEBR', 'JAPA', 'KORE', 'TIBT'], min: 100 }] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 4, from: [{ dept: 'LING', min: 300 }],
      exclusive: [['LING 480', 'LING 481', 'LING 482']],
      note: 'Departmental (LING) courses at the 300 level or above; at most 1 independent study course.' },
  ],
};
