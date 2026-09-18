export default {
  id: 'sociology-ba',
  name: 'Sociology',
  degree: 'BA',
  kind: 'major',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/sociology/sociology-ba/',
  hours: 33,
  notes: [
    'Only one of SOCI 101 or SOCI 231 may count toward the major; neither may be used as an elective.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Introduction to Sociology', options: ['SOCI 101', 'SOCI 231'] },
      { type: 'all', name: 'Theory and Methods', items: ['SOCI 380', 'SOCI 381'] },
      { type: 'any', name: 'Statistics', options: [
        { type: 'course', name: 'Social Statistics', options: ['SOCI 382'] },
        { type: 'all', name: 'Quantitative Analysis with Sociology Lab', items: ['SOSC 302', 'SOCI 102'] },
      ]},
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 7, from: [{ dept: 'SOCI', min: 300 }],
      note: 'Departmental (SOCI) courses at the 300 level or above.' },
  ],
};
