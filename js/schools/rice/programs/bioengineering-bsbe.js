export default {
  id: 'bioengineering-bsbe',
  name: 'Bioengineering',
  degree: 'BSBE',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/bioengineering/bioengineering-bsbe/',
  hours: 97,
  degreeHours: 131,
  notes: [
    'Technical electives must total at least 9 credit hours. BIOE 400, EDES 300 and GLHT 400 count only when taken for at least 3 hours in one semester.',
    'BIOE 400 taken for at least 3 credit hours in one semester may replace one Bioengineering Laboratory module (this does not count toward the technical elective allowance).',
    'EDES 355 may not be used as a technical elective if BIOE 447 is used as a Bioengineering Laboratory course.',
    'PHYS 141 and PHYS 142 credit is not eligible for the major.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Biosciences', options: ['BIOS 201', 'BIOS 101'] },
      { type: 'all', name: 'Chemistry', items: [
        ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114'], 'CHEM 211', 'CHEM 213',
      ]},
      { type: 'course', name: 'Computational Applied Mathematics', options: ['CMOR 220'] },
      { type: 'course', name: 'Electrical Engineering', options: ['ELEC 243'] },
      { type: 'all', name: 'Mathematics', items: [['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], 'MATH 211', 'MATH 212'] },
      { type: 'course', name: 'Mechanical Engineering', options: ['MECH 202', 'MECH 211', 'CEVE 211'] },
      { type: 'group', name: 'Physics', requirements: [
        { type: 'any', name: 'Mechanics', options: [
          { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
          { type: 'course', name: 'PHYS 111 or PHYS 125', options: ['PHYS 111', 'PHYS 125'] },
        ]},
        { type: 'any', name: 'Electricity and Magnetism', options: [
          { type: 'all', name: 'PHYS 102 and PHYS 104', items: ['PHYS 102', 'PHYS 104'] },
          { type: 'course', name: 'PHYS 112 or PHYS 126', options: ['PHYS 112', 'PHYS 126'] },
        ]},
      ]},
    ]},
    { type: 'all', name: 'Bioengineering Core Courses', items: [
      'BIOE 252', 'BIOE 320', 'BIOE 322', 'BIOE 330', 'BIOE 332', 'BIOE 341', 'BIOE 342', 'BIOE 370', 'BIOE 372',
      'BIOE 383', 'BIOE 385', 'BIOE 391', ['BIOE 420', 'CHBE 420'], ['BIOE 439', 'BIOE 440', 'STAT 440'], 'BIOE 451', 'BIOE 452',
    ]},
    { type: 'choose', name: 'Bioengineering Laboratory Courses', count: 2, from: [
      'BIOE 442', 'BIOE 443', 'BIOE 444', 'BIOE 445', 'BIOE 446', 'BIOE 447', 'BIOE 448', 'BIOE 449', 'GLHT 449',
    ]},
    { type: 'choose', name: 'Technical Electives', count: 3, from: [
      'BIOE 321', 'BIOE 345', 'BIOE 348', 'BIOE 360', 'BIOE 365', 'BIOE 380', 'BIOE 392', 'BIOE 400', 'BIOE 406', 'BIOE 415',
      'BIOE 421', 'BIOE 422', 'BIOE 431', 'BIOE 454', 'BIOE 464', 'BIOE 484', 'BIOE 492', 'BIOE 508', 'BIOE 509', 'BIOE 518',
      'BIOE 523', 'BIOE 526', 'BIOE 543', 'BIOE 558', 'BIOE 564', 'BIOE 574', 'BIOE 580', 'BIOE 587', 'BIOE 589', 'BIOE 615', 'BIOE 620',
      'CEVE 315', 'CEVE 316', 'CHBE 310', 'CHBE 390', 'CHBE 640',
      'CMOR 302', 'CMOR 303', 'CMOR 360', 'CMOR 423', 'CMOR 492',
      'COMP 341', 'COMP 450', 'COMP 502', 'COMP 571', 'COMP 576', 'DSCI 303', 'DSCI 435',
      'EDES 300', 'EDES 301', 'EDES 350', 'EDES 355',
      'ELEC 301', 'ELEC 305', 'ELEC 326', 'ELEC 327', 'ELEC 378', 'ELEC 384', 'ELEC 422', 'ELEC 425', 'ELEC 435', 'ELEC 475',
      'ELEC 478', 'ELEC 487', 'ELEC 489', 'ELEC 540', 'ELEC 677', 'GLHT 400',
      'MECH 310', 'MECH 311', 'MECH 343', 'MECH 371', 'MECH 400', 'MECH 417', 'MECH 420', 'MECH 488', 'MECH 497', 'MSNE 402',
    ], note: 'At least 3 courses and 9 credit hours from the approved technical elective list.' },
  ],
  constraints: [
    { type: 'atMost', hours: 6, from: ['BIOE 400', 'EDES 300', 'GLHT 400'], among: ['3'], label: 'At most 6 credit hours of BIOE 400, EDES 300 and GLHT 400 combined as technical electives' },
  ],
};
