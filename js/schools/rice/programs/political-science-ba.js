export default {
  id: 'political-science-ba',
  name: 'Political Science',
  degree: 'BA',
  kind: 'major',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/political-science/political-science-ba/',
  hours: 41,
  notes: [
    'SOSC 302 should be taken before POLI 395; both must be taken at Rice.',
    'The 2 seminars (POLI 400-level, excluding POLI 405 and 406) must be from two different instructors and taken at Rice.',
    'The 4 courses at the 300 level (excluding POLI 305, 306, 307, and 395) must be taken at Rice.',
    'POLI 110, 111, and 112 do not count toward the major. POLI 305, 306, 307 and up to two POLI 3XX transfer courses may count as "additional courses".',
    'PLST 202 may fulfill 1 of the 3 additional courses only when taught by a Political Science faculty member and approved.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Introductory Courses', count: 2, from: ['POLI 210', 'POLI 211', 'POLI 212'] },
      { type: 'all', name: 'Research Methods Courses', items: ['SOSC 302', 'POLI 395'] },
    ]},
    { type: 'choose', name: 'Seminar Requirements', count: 2,
      from: [{ dept: 'POLI', min: 400, max: 499, exclude: ['POLI 405', 'POLI 406'] }],
      note: 'Departmental (POLI) seminars at the 400 level, from two different instructors.' },
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: '300-Level Courses', count: 4,
        from: [{ dept: 'POLI', min: 300, max: 399, exclude: ['POLI 305', 'POLI 306', 'POLI 307', 'POLI 395'] }] },
      { type: 'choose', name: 'Additional Courses at Any Level', count: 3,
        from: [{ dept: 'POLI', exclude: ['POLI 110', 'POLI 111', 'POLI 112'] }, 'PLST 202'] },
    ]},
  ],
};
