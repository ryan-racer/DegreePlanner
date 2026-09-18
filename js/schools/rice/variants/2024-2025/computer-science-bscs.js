// 2024-2025 General Announcements.
export default {
  id: 'computer-science-bscs',
  name: 'Computer Science',
  degree: 'BSCS',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/archive/2024-2025/programs-study/departments-programs/engineering/computer-science/computer-science-bscs/',
  hours: 68,
  notes: [
    'A minimum of 20 courses (68-72 credit hours) satisfies the major; at least 12 courses must be at the 300 level or above.',
    'Electives must be taken for at least 3 credit hours each. At most 1 elective may be an independent study project (COMP 390, COMP 490, or COMP 491).',
    '500-level courses are allowed as electives; the only 600-level electives allowed are COMP 631 and COMP 646.',
    'At most 5 courses (20 credit hours) of study abroad or transfer credit after matriculation may count toward the major.',
    'Students completing the BSCS cannot also receive the BA in Computer Science.',
  ],
  constraints: [
    { type: 'atLeast', count: 12, from: [{ dept: '*', min: 300 }], label: 'At least 12 upper-level courses (300 level or above)' },
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
      { type: 'choose', name: 'Design Requirement', count: 1, from: ['COMP 402', 'COMP 410', 'COMP 413', 'COMP 416', 'COMP 460', 'ARTS 460', 'COMP 461'] },
    ]},
    { type: 'group', name: 'Breadth Requirements', requirements: [
      { type: 'choose', name: 'Systems', count: 1, from: ['COMP 412', 'COMP 421', 'ELEC 421', 'COMP 422', 'COMP 427', 'COMP 429', 'ELEC 429', 'COMP 436', 'ELEC 410', 'COMP 458', 'COMP 530'] },
      { type: 'choose', name: 'Application Domains', count: 1, from: ['COMP 418', 'COMP 431', 'COMP 440', 'ELEC 440', 'COMP 442', 'COMP 447', 'ELEC 447', 'COMP 450', 'ELEC 450', 'MECH 450', 'COMP 459', 'COMP 462'] },
      { type: 'choose', name: 'Theory', count: 1, from: ['COMP 409', 'COMP 411', 'COMP 414', 'COMP 416', 'COMP 423', 'COMP 448', 'MATH 448', 'COMP 463', 'COMP 480', 'COMP 481'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 2, from: [{ dept: 'COMP', min: 300, max: 599 }, 'COMP 631', 'COMP 646'],
      exclusive: [['COMP 390', 'COMP 490', 'COMP 491']],
      note: 'Departmental (COMP) courses at the 300 level or above; at most 1 independent-study course.' },
  ],
};
