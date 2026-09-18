export default {
  id: 'statistics-bs',
  name: 'Statistics',
  degree: 'BS',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/statistics/statistics-bs/',
  hours: 58,
  notes: [
    'Electives must be taken for at least 3 credit hours each. STAT 305, 310, 311, 312, 315 and 385 do not count as electives.',
    'With advisor approval, 1 elective may come from outside STAT (typically CMOR 350/360/451/455, COMP 322/330/382/422/430/440/441/502, DSCI 302/304/435, ECON 300/305/308/310/418); it may not replace a Methodology/Theory course.',
    'With advisor approval, other STAT courses at the 500 or 600 level may count as Methodology/Theory electives.',
    'The Senior Capstone may not be fulfilled by transfer credit. A course used for Advanced Computing or the Capstone may not also be used as an elective.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Mathematics', requirements: [
        { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
        { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
        { type: 'any', name: 'Multivariable Calculus', options: [
          { type: 'course', name: 'MATH 212 or MATH 232', options: ['MATH 212', 'MATH 232'] },
          { type: 'all', name: 'MATH 221 and MATH 222', items: ['MATH 221', 'MATH 222'] },
        ]},
        { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 355', 'MATH 354'] },
        { type: 'choose', name: 'Analysis', count: 1, from: ['MATH 302', 'MATH 321', 'MATH 331', 'MATH 427'] },
      ]},
      { type: 'course', name: 'Statistical Computation', options: ['STAT 405'] },
      { type: 'choose', name: 'Basic Computing', count: 1, from: ['CMOR 220', 'COMP 140', 'COMP 182'] },
      { type: 'choose', name: 'Advanced Computing', count: 1, from: [
        'CMOR 360', 'CMOR 420', 'CMOR 422', 'CMOR 441', 'COMP 215', 'COMP 322', 'ELEC 323', 'COMP 330', 'COMP 382', 'DSCI 302',
      ]},
      { type: 'group', name: 'Probability and Statistics', requirements: [
        { type: 'choose', name: 'Probability and Statistics', count: 1, from: ['STAT 310', 'ECON 307', 'STAT 311', 'STAT 315', 'DSCI 301'] },
        { type: 'all', name: 'Regression, Probability and Inference', items: ['STAT 410', 'STAT 418', 'STAT 419'] },
      ]},
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Methodology/Theory', count: 4, from: [
        'STAT 411', 'STAT 413', 'STAT 421', 'STAT 425', 'STAT 520', 'STAT 530', 'STAT 545',
      ]},
      { type: 'choose', name: 'Additional STAT Electives', count: 2, from: [
        { dept: 'STAT', min: 300, exclude: ['STAT 305', 'STAT 310', 'STAT 311', 'STAT 312', 'STAT 315', 'STAT 385'] },
        // Approved Electives outside Statistics (at most 1, with advisor approval)
        'CMOR 350', 'CMOR 360', 'CMOR 451', 'CMOR 455', 'COMP 322', 'COMP 330', 'COMP 382', 'COMP 422', 'COMP 430',
        'COMP 440', 'COMP 441', 'COMP 502', 'DSCI 302', 'DSCI 304', 'DSCI 435', 'ECON 300', 'ECON 305', 'ECON 308',
        'ECON 310', 'ECON 418',
      ], exclusive: [[
        'CMOR 350', 'CMOR 360', 'CMOR 451', 'CMOR 455', 'COMP 322', 'COMP 330', 'COMP 382', 'COMP 422', 'COMP 430',
        'COMP 440', 'COMP 441', 'DSCI 302', 'DSCI 304', 'DSCI 435', 'ECON 300', 'ECON 305', 'ECON 308', 'ECON 418',
      ]], note: 'STAT courses at the 300 level or above; with advisor approval, 1 may be an approved elective from outside STAT (COMP 502 and ECON 310 are cross-listed as STAT 502 and STAT 376).' },
    ]},
    { type: 'choose', name: 'Senior Capstone', count: 1, from: ['DSCI 435', 'COMP 449', 'STAT 450'] },
  ],
};
