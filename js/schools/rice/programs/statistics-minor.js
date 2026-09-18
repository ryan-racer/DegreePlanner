export default {
  id: 'statistics-minor',
  name: 'Statistics',
  degree: 'Minor',
  kind: 'minor',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/statistics/statistics-minor/',
  hours: 19,
  notes: [
    'Electives must be taken for at least 3 credit hours each.',
    'Track A: STAT 305, 310, 311, 312, 315, and 385 do not count as electives; recommended electives are STAT 313, 411, 413, 418, 421, 423, 425, 449, 453.',
    'Track B: STAT 305 and 385 do not count as electives; with advisor approval 1 elective may be from another department. Recommended: STAT 313, 405, 482, 484, 485, 486.',
    'At most 2 courses from study abroad or transfer credit. Minimum minor GPA of 2.00.',
  ],
  requirements: [
    { type: 'any', name: 'Area of Specialization', options: [
      { type: 'group', name: 'Track A', requirements: [
        { type: 'choose', name: 'Probability and Statistics', count: 1, from: ['STAT 310', 'ECON 307', 'STAT 311', 'STAT 315', 'DSCI 301'] },
        { type: 'all', name: 'Core Requirements', items: ['STAT 405', 'STAT 410'] },
        { type: 'choose', name: 'Elective Requirements', count: 3, from: [{ dept: 'STAT', min: 300, exclude: ['STAT 305', 'STAT 310', 'STAT 311', 'STAT 312', 'STAT 315', 'STAT 385'] }],
          note: 'STAT courses at the 300 level or above.' },
      ]},
      { type: 'group', name: 'Track B', requirements: [
        { type: 'course', name: 'Introductory Statistics', options: ['STAT 280', 'STAT 180', 'STAT 305'] },
        { type: 'course', name: 'Data Analysis', options: ['STAT 385', 'DSCI 101'] },
        { type: 'choose', name: 'Elective Requirements', count: 4, from: [{ dept: 'STAT', min: 300, exclude: ['STAT 305', 'STAT 385'] }],
          exclusive: [['STAT 310', 'STAT 311', 'STAT 312', 'STAT 315']],
          note: 'STAT courses at the 300 level or above; only one of STAT 310/311/312/315.' },
      ]},
    ]},
  ],
  constraints: [
    { type: 'atLeast', count: 4, from: [{ dept: '*', min: 300 }], label: 'At least 4 courses (12 hours) at the 300 level or above' },
  ],
};
