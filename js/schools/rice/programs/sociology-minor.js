export default {
  id: 'sociology-minor',
  name: 'Sociology',
  degree: 'Minor',
  kind: 'minor',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/sociology/sociology-minor/',
  hours: 18,
  notes: [
    'Only one of SOCI 101 or SOCI 231 may count toward the minor; neither may be used as an elective.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Introduction to Sociology', options: ['SOCI 101', 'SOCI 231'] },
      { type: 'course', name: 'Theory or Methods', options: ['SOCI 380', 'SOCI 381'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 4, from: [{ dept: 'SOCI', min: 300 }],
      note: 'Departmental (SOCI) courses at the 300 level or above.' },
  ],
};
