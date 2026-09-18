export default {
  id: 'computer-science-ba',
  name: 'Computer Science',
  degree: 'BA',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/computer-science/computer-science-ba/',
  hours: 59,
  notes: [
    '500-level courses are allowed as electives; the only 600-level electives allowed are COMP 631 and COMP 646.',
    'Electives must be taken for at least 3 credit hours each.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Math Courses', requirements: [
        { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
        { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
        { type: 'choose', name: 'Multivariable Calculus / Optimization', count: 1, from: ['COMP 282', 'MATH 212', 'MATH 222', 'MATH 232'] },
        { type: 'choose', name: 'Probability and Statistics', count: 1, from: ['ELEC 303', 'STAT 310', 'ECON 307', 'STAT 311', 'STAT 312', 'STAT 315', 'DSCI 301'] },
        { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 221', 'MATH 354', 'MATH 355'] },
      ]},
      { type: 'all', name: 'Computer Science Courses', items: [
        'COMP 140', 'COMP 182', 'COMP 215', 'COMP 222', 'COMP 301', 'COMP 303', 'COMP 312', 'COMP 318', 'COMP 321', 'COMP 382',
      ]},
    ]},
    { type: 'choose', name: 'Design Requirement', count: 1, from: ['COMP 402', 'COMP 410', 'COMP 413', 'COMP 416', 'COMP 460', 'ARTS 460', 'COMP 461', 'COMP 464'] },
    { type: 'choose', name: 'Elective Requirements', count: 2, from: [{ dept: 'COMP', min: 300 }],
      exclusive: [['COMP 364', 'COMP 390', 'COMP 464', 'COMP 490', 'COMP 491']],
      note: 'Departmental (COMP) courses at the 300 level or above; at most 1 research or independent-study course.' },
  ],
};
