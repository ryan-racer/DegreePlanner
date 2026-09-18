const APPLIED = [
  'CMOR 437', 'CMOR 452', 'CMOR 461', 'CMOR 462', 'CMOR 463', 'CMOR 465', 'CMOR 467', 'COMP 440', 'ELEC 440', 'COMP 441',
  'ELEC 478', 'STAT 413', 'COMP 459', 'ECON 437', 'ENST 437', 'ECON 443', 'ECON 449', 'ECON 470', 'ECON 481', 'ELEC 475',
  'ELEC 533', 'CMOR 553', 'STAT 583', 'STAT 313', 'CEVE 313', 'STAT 419', 'STAT 421', 'STAT 449', 'STAT 482',
  'STAT 502', 'COMP 502', 'ELEC 502', 'STAT 602', 'COMP 602', 'ELEC 602',
];
const THEORY = [
  'CMOR 404', 'CMOR 444', 'CMOR 446', 'CMOR 455', 'CMOR 531', 'CMOR 533', 'CMOR 543', 'CMOR 544', 'CMOR 552', 'STAT 581',
  'CMOR 554', 'STAT 552', 'CMOR 556', 'COMP 382', 'COMP 414', 'COMP 458', 'COMP 480', 'ELEC 570', 'MATH 412', 'STAT 418', 'STAT 419',
];

export default {
  id: 'operations-research-ba',
  name: 'Operations Research',
  degree: 'BA',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/computational-applied-mathematics-operations-research/operations-research-ba/',
  hours: 53,
  notes: [
    'Area of Specialization: 6 courses (18-19 hours), at least 3 of which must be CMOR courses. The same course cannot count for both an area core requirement and an area elective.',
    'Some listed electives are graduate (500-level and above) courses requiring special registration.',
  ],
  requirements: [
    { type: 'group', name: 'Introductory Requirements', requirements: [
      { type: 'all', name: 'Computation and Calculus', items: ['COMP 140', ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106']] },
      { type: 'any', name: 'Multivariable Calculus', options: [
        { type: 'course', name: 'MATH 212 or MATH 232', options: ['MATH 212', 'MATH 232'] },
        { type: 'all', name: 'MATH 221 and MATH 222', items: ['MATH 221', 'MATH 222'] },
      ]},
    ]},
    { type: 'group', name: 'Intermediate Requirements', requirements: [
      { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 354', 'MATH 355'] },
      { type: 'all', name: 'Stochastic Models, Optimization and Machine Learning', items: ['CMOR 350', 'CMOR 360', ['ELEC 378', 'CMOR 438']] },
      { type: 'choose', name: 'Probability and Statistics', count: 1, from: ['STAT 310', 'ECON 307', 'STAT 311', 'STAT 315', 'DSCI 301'] },
    ]},
    { type: 'choose', name: 'Advanced Requirements', count: 1, from: ['CMOR 404', 'CMOR 442', 'CMOR 444', 'CMOR 451'] },
    { type: 'any', name: 'Area of Specialization', options: [
      { type: 'group', name: 'Data Science', requirements: [
        { type: 'choose', name: 'Core Requirements', count: 3, from: [
          'CMOR 437', 'CMOR 531', 'CMOR 533', 'COMP 414', 'COMP 440', 'ELEC 440', 'COMP 441', 'ELEC 478', 'STAT 413',
          'COMP 459', 'ELEC 475', 'STAT 502', 'COMP 502', 'ELEC 502', 'STAT 602', 'COMP 602', 'ELEC 602',
        ]},
        { type: 'choose', name: 'Elective Requirements (Applied OR or Theoretical Foundations)', count: 3, from: [...APPLIED, ...THEORY] },
      ]},
      { type: 'group', name: 'Financial Engineering', requirements: [
        { type: 'choose', name: 'Core Requirements', count: 3, from: ['CMOR 455', 'CMOR 462', 'CMOR 531', 'CMOR 533', 'CMOR 544', 'ECON 443', 'STAT 449', 'STAT 482'] },
        { type: 'choose', name: 'Elective Requirements (Applied OR or Theoretical Foundations)', count: 3, from: [...APPLIED, ...THEORY] },
      ]},
      { type: 'group', name: 'Supply Chain Management', requirements: [
        { type: 'choose', name: 'Core Requirements', count: 3, from: ['CMOR 452', 'CMOR 461', 'CMOR 464', 'CMOR 465', 'CMOR 467'] },
        { type: 'choose', name: 'Elective Requirements (Applied OR or Theoretical Foundations)', count: 3, from: [...APPLIED, ...THEORY] },
      ]},
      { type: 'group', name: 'Breadth in Operations Research', requirements: [
        { type: 'choose', name: 'Applied Operations Research', count: 2, from: APPLIED },
        { type: 'choose', name: 'Additional Electives (Applied OR or Theoretical Foundations)', count: 4, from: [...APPLIED, ...THEORY] },
      ]},
    ]},
    { type: 'any', name: 'Senior Design', options: [
      { type: 'all', name: 'CMOR 492 and CMOR 493', items: ['CMOR 492', 'CMOR 493'] },
      { type: 'course', name: 'DSCI 435', options: ['DSCI 435', 'COMP 449'] },
    ]},
  ],
};
