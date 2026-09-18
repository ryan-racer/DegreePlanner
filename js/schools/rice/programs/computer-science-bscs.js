export default {
  id: 'computer-science-bscs',
  name: 'Computer Science',
  degree: 'BSCS',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/computer-science/computer-science-bscs/',
  hours: 68,
  notes: [
    'Minimum major GPA of 2.00. At least 13 upper-level courses (40 hours) are required for the degree.',
    'Students completing the BSCS cannot also receive the BA in Computer Science.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Math Courses', requirements: [
        { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
        { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
        { type: 'choose', name: 'Multivariable Calculus / Optimization', count: 1, from: ['COMP 282', 'MATH 212', 'MATH 222', 'MATH 232'] },
        { type: 'choose', name: 'Probability and Statistics', count: 1, from: ['ELEC 303', 'STAT 310', 'STAT 311', 'STAT 312', 'STAT 315'] },
        { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 221', 'MATH 354', 'MATH 355'] },
      ]},
      { type: 'all', name: 'Computer Science Courses', items: [
        'COMP 140', 'COMP 182', 'COMP 215', 'COMP 222', 'COMP 301', 'COMP 303', 'COMP 312', 'COMP 318', 'COMP 321', 'COMP 382',
      ]},
    ]},
    { type: 'choose', name: 'Design Requirement', count: 1, from: ['COMP 402', 'COMP 410', 'COMP 413', 'COMP 416', 'COMP 460', 'COMP 461', 'COMP 464'] },
    { type: 'group', name: 'Breadth Requirements', requirements: [
      { type: 'choose', name: 'Systems', count: 1, from: ['COMP 412', 'COMP 421', 'COMP 422', 'COMP 427', 'COMP 429', 'COMP 432', 'COMP 436', 'COMP 458', 'COMP 468'] },
      { type: 'choose', name: 'Application Domains', count: 1, from: ['COMP 418', 'COMP 431', 'COMP 440', 'COMP 442', 'COMP 447', 'COMP 450', 'COMP 459', 'COMP 462', 'COMP 471', 'COMP 484'] },
      { type: 'choose', name: 'Theory', count: 1, from: ['COMP 409', 'COMP 411', 'COMP 414', 'COMP 423', 'COMP 448', 'COMP 463', 'COMP 475', 'COMP 480', 'COMP 481', 'COMP 585'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 2, from: [{ dept: 'COMP', min: 300 }],
      exclusive: [['COMP 364', 'COMP 390', 'COMP 464', 'COMP 490', 'COMP 491']],
      note: 'Departmental (COMP) courses at the 300 level or above; at most 1 research or independent-study course.' },
  ],
};
