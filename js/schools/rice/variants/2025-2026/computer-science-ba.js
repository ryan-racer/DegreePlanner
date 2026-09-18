// 2025-2026 General Announcements.
export default {
  id: 'computer-science-ba',
  name: 'Computer Science',
  degree: 'BA',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/archive/2025-2026/programs-study/departments-programs/engineering/computer-science/computer-science-ba/',
  hours: 59,
  notes: [
    'A minimum of 17 courses (59-60 credit hours) satisfies the major; at least 9 courses (33 credit hours) must be at the 300 level or above.',
    'Electives must be taken for at least 3 credit hours each. At most 1 elective may be an independent study project (COMP 390, COMP 490, or COMP 491).',
    '500-level courses are allowed as electives; the only 600-level electives allowed are COMP 631 and COMP 646.',
    'At most 5 courses (20 credit hours) of study abroad or transfer credit after matriculation may count toward the major.',
    'Students completing the BA in Computer Science cannot also receive the BSCS.',
  ],
  constraints: [
    { type: 'atLeast', count: 9, from: [{ dept: '*', min: 300 }], label: 'At least 9 upper-level courses (300 level or above)' },
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Math Courses', requirements: [
        { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
        { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
        { type: 'course', name: 'Multivariable Calculus', options: ['MATH 212', 'MATH 222', 'MATH 232'] },
        { type: 'choose', name: 'Probability and Statistics', count: 1, from: ['ELEC 303', 'STAT 310', 'ECON 307', 'STAT 311', 'STAT 312', 'STAT 315', 'DSCI 301'] },
        { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 221', 'MATH 354', 'MATH 355'] },
      ]},
      { type: 'all', name: 'Computer Science Courses', items: [
        'COMP 140', 'COMP 182', 'COMP 215', 'COMP 222', 'COMP 301', 'COMP 312', 'COMP 318', 'COMP 321', 'COMP 382',
      ]},
    ]},
    { type: 'choose', name: 'Design Requirement', count: 1, from: ['COMP 402', 'COMP 410', 'COMP 413', 'COMP 416', 'COMP 460', 'ARTS 460', 'COMP 461'] },
    { type: 'choose', name: 'Elective Requirements', count: 2, from: [{ dept: 'COMP', min: 300, max: 599 }, 'COMP 631', 'COMP 646'],
      exclusive: [['COMP 390', 'COMP 490', 'COMP 491']],
      note: 'Departmental (COMP) courses at the 300 level or above; at most 1 independent-study course.' },
  ],
};
