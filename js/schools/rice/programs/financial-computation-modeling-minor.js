export default {
  id: 'financial-computation-modeling-minor',
  name: 'Financial Computation and Modeling',
  degree: 'Minor',
  kind: 'minor',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/financial-computation-modeling/financial-computation-modeling-minor/',
  hours: 20,
  notes: [
    'STAT 499 must be the CoFES Quantitative Finance section.',
    'Electives: 3 courses from Groups I and II with at least 1 from each group.',
    'Minimum minor GPA of 2.00.',
  ],
  constraints: [
    { type: 'atLeast', count: 5, from: [{ dept: '*', min: 300 }], label: 'At least 5 courses at the 300 level or above' },
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Principles of Economics', options: ['ECON 100'] },
      { type: 'choose', name: 'Probability and Statistics', count: 1, from: ['STAT 310', 'ECON 307', 'STAT 311', 'STAT 315', 'DSCI 301'] },
      { type: 'course', name: 'Econometrics or Regression', options: ['STAT 376', 'ECON 310', 'STAT 410'] },
      { type: 'course', name: 'Topics in Statistical Sciences (CoFES section)', options: ['STAT 499'] },
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Group I', count: 1, from: ['CMOR 451', 'CMOR 455', 'CMOR 462', 'ECON 449', 'ECON 455', 'ECON 456', 'STAT 421', 'STAT 449', 'STAT 487'] },
      { type: 'choose', name: 'Group II', count: 1, from: ['BUSI 343', 'BUSI 448', 'BUSI 450', 'ECON 343', 'ECON 355', 'ECON 422', 'STAT 482', 'STAT 486'] },
      { type: 'choose', name: 'Additional Elective (Group I or II)', count: 1, from: [
        'CMOR 451', 'CMOR 455', 'CMOR 462', 'ECON 449', 'ECON 455', 'ECON 456', 'STAT 421', 'STAT 449', 'STAT 487',
        'BUSI 343', 'BUSI 448', 'BUSI 450', 'ECON 343', 'ECON 355', 'ECON 422', 'STAT 482', 'STAT 486',
      ]},
    ]},
  ],
};
