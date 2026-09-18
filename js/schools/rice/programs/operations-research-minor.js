export default {
  id: 'operations-research-minor',
  name: 'Operations Research',
  degree: 'Minor',
  kind: 'minor',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/computational-applied-mathematics-operations-research/operations-research-minor/',
  hours: 18,
  notes: [
    'Electives must be taken for at least 3 credit hours each.',
    'Graduate-level (500+) electives require special registration with instructor permission.',
    'At most 2 courses from study abroad or transfer credit.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'all', name: 'Required Core', items: ['CMOR 350', 'CMOR 360'] },
      { type: 'choose', name: 'Probability and Statistics', count: 1, from: ['STAT 310', 'ECON 307', 'STAT 311', 'STAT 315', 'DSCI 301'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 3, from: [
      'CMOR 404', 'CMOR 438', 'COMP 341', 'COMP 441', 'DSCI 303', 'ELEC 378', 'ELEC 478', 'STAT 413', 'CMOR 441', 'CMOR 442', 'CMOR 444', 'CMOR 446', 'CMOR 451', 'CMOR 452',
      'CMOR 455', 'CMOR 461', 'CMOR 462', 'CMOR 463', 'CMOR 464', 'CMOR 465', 'CMOR 467', 'CMOR 531', 'CMOR 533', 'CMOR 543', 'CMOR 544', 'COMP 440', 'ELEC 440', 'COMP 458',
      'COMP 459', 'COMP 480', 'ECON 343', 'ECON 437', 'ENST 437', 'ECON 443', 'ECON 445', 'ECON 449', 'ECON 470', 'ECON 481', 'ELEC 475', 'ELEC 533', 'CMOR 553', 'STAT 583',
      'ELEC 570', 'MATH 412', 'INDE 597', 'STAT 313', 'CEVE 313', 'STAT 418', 'STAT 419', 'STAT 421', 'STAT 449', 'STAT 482', 'STAT 486', 'STAT 581', 'CMOR 552', 'STAT 582',
    ],
      atLeast: [{ count: 2, from: [{ dept: 'CMOR' }], label: 'CMOR elective (at least 2 of the 3)' }],
      exclusive: [['CMOR 438', 'COMP 341', 'COMP 441', 'DSCI 303', 'ELEC 378', 'ELEC 478', 'STAT 413'], ['CMOR 461', 'CMOR 462']],
      note: 'Department-approved electives. At least 2 must be CMOR courses; only one machine-learning course and only one of CMOR 461 / 462 may count.' },
  ],
  constraints: [
    { type: 'atLeast', count: 6, from: [{ dept: '*', min: 300 }], label: 'All 6 courses at the 300 level or above' },
  ],
};
