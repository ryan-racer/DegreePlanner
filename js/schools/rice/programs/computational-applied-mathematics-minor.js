export default {
  id: 'computational-applied-mathematics-minor',
  name: 'Computational and Applied Mathematics',
  degree: 'Minor',
  kind: 'minor',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/computational-applied-mathematics-operations-research/computational-applied-mathematics-minor/',
  hours: 18,
  notes: [
    'Electives must be taken for at least 3 credit hours each. Electives may not include CMOR 494, CMOR 495, or independent study (CMOR 490, CMOR 491).',
    'At least 5 courses (15 hours) at the 300 level or above. At most 2 courses from study abroad or transfer credit. Minimum minor GPA of 2.00.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Engineering Computation', options: ['CMOR 220'] },
      { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 354', 'MATH 355'] },
      { type: 'course', name: 'Differential Equations', options: ['CMOR 304'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 3, from: [
      'CMOR 404', 'CMOR 405', 'MATH 423', 'CMOR 410', 'CMOR 415', 'ELEC 488', 'NEUR 415', 'CMOR 416', 'ELEC 489', 'NEUR 416', 'CMOR 417', 'CMOR 420', 'CMOR 421',
      'CMOR 423', 'CEVE 455', 'CMOR 428', 'CMOR 435', 'MATH 435', 'CMOR 451', 'CMOR 465', 'CMOR 501', 'CMOR 508', 'ELEC 508', 'MECH 508', 'CMOR 525', 'CMOR 526',
      'CMOR 527', 'CMOR 534', 'CMOR 536', 'COMP 422', 'COMP 440', 'ELEC 440', 'COMP 441', 'CMOR 438', 'ELEC 478', 'COMP 458', 'COMP 459', 'COMP 480', 'COMP 522',
      'ELEC 570', 'INDE 517', 'MATH 322', 'MATH 382', 'MATH 410', 'MATH 412', 'MATH 425', 'MATH 427', 'MATH 523', 'MECH 420', 'ELEC 436', 'MECH 473', 'MECH 474',
      'STAT 418', 'STAT 541',
    ],
      atLeast: [
        { count: 2, from: [{ dept: 'CMOR' }], label: 'CMOR elective (at least 2 of the 3)' },
        { count: 2, from: [{ dept: '*', min: 400 }], label: '400-level elective (at least 2 of the 3)' },
      ],
      exclusive: [['COMP 441', 'CMOR 438', 'ELEC 478']],
      note: 'Department-approved electives. At least 2 must be CMOR courses and at least 2 at the 400 level; only one of COMP 441 / CMOR 438 / ELEC 478 may count.' },
  ],
};
