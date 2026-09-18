const CMOR_ELECTIVES = [
  'CMOR 404', 'CMOR 405', 'CMOR 410', 'CMOR 415', 'CMOR 416', 'CMOR 417', 'CMOR 420', 'CMOR 421', 'CMOR 423', 'CMOR 428',
  'CMOR 435', 'CMOR 438', 'CMOR 451', 'CMOR 465', 'CMOR 501', 'CMOR 508', 'CMOR 525', 'CMOR 526', 'CMOR 527', 'CMOR 534', 'CMOR 536',
];
const OTHER_ELECTIVES = [
  'COMP 422', 'COMP 440', 'COMP 441', 'ELEC 478', 'COMP 458', 'COMP 459', 'COMP 480', 'COMP 522', 'ELEC 570', 'INDE 517',
  'MATH 322', 'MATH 382', 'MATH 410', 'MATH 412', 'MATH 425', 'MATH 427', 'MATH 523',
  'MECH 420', 'MECH 473', 'MECH 474', 'STAT 418', 'STAT 541',
];

export default {
  id: 'computational-applied-mathematics-ba',
  name: 'Computational and Applied Mathematics',
  degree: 'BA',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/computational-applied-mathematics-operations-research/computational-applied-mathematics-ba/',
  hours: 49,
  notes: [
    'Electives: at least 2 of the 4 must be CMOR courses and at least 2 must be at the 400 level or above; each must be taken for at least 3 credit hours. CMOR 494, CMOR 495 and independent study (CMOR 490/491) do not count.',
    'Students with prior calculus experience may replace MATH 101/105 with an approved 200-level or above quantitative elective (in addition to the 4 electives).',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Introductory Courses', requirements: [
        { type: 'course', name: 'Engineering Computation', options: ['CMOR 220'] },
        { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
        { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
        { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 354', 'MATH 355'] },
        { type: 'any', name: 'Multivariable Calculus', options: [
          { type: 'course', name: 'MATH 212 or MATH 232', options: ['MATH 212', 'MATH 232'] },
          { type: 'all', name: 'MATH 221 and MATH 222', items: ['MATH 221', 'MATH 222'] },
        ]},
      ]},
      { type: 'group', name: 'Intermediate Courses', requirements: [
        { type: 'all', name: 'Differential Equations and Computational Science', items: ['CMOR 304', 'CMOR 420'] },
        { type: 'choose', name: 'Analysis', count: 1, from: ['MATH 302', 'MATH 321', 'MATH 322', 'MATH 331'] },
        { type: 'choose', name: 'Probability and Statistics', count: 1, from: ['STAT 310', 'ECON 307', 'STAT 311', 'STAT 315', 'DSCI 301'] },
      ]},
      { type: 'all', name: 'Advanced Courses', items: ['CMOR 422', 'CMOR 430'] },
      { type: 'any', name: 'Design Project', options: [
        { type: 'all', name: 'CMOR 492 and CMOR 493', items: ['CMOR 492', 'CMOR 493'] },
        { type: 'course', name: 'COMP 449', options: ['COMP 449', 'DSCI 435'] },
      ]},
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'CMOR Electives', count: 2, from: CMOR_ELECTIVES },
      { type: 'choose', name: 'Additional Electives', count: 2, from: [...CMOR_ELECTIVES, ...OTHER_ELECTIVES] },
    ]},
  ],
};
