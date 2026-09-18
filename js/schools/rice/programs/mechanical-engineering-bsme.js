const BREADTH_ELECTIVES = [
  'CMOR 360', 'CMOR 423', 'CEVE 455', 'CEVE 476', 'COMP 462', 'MECH 400', 'CEVE 400', 'MECH 411', 'MECH 412', 'MECH 416',
  'MECH 417', 'CEVE 417', 'MECH 430', 'MECH 450', 'COMP 450', 'ELEC 450', 'MECH 454', 'BIOE 454', 'CEVE 454', 'MECH 466', 'CEVE 496',
  'MECH 471', 'MECH 472', 'MECH 474', 'MECH 475', 'MECH 478', 'MECH 480', 'MECH 482', 'MECH 484', 'MECH 487', 'MECH 488',
  'MECH 489', 'MECH 491', 'MECH 494', 'MECH 496', 'MECH 497', 'MECH 498', 'COMP 498', 'ELEC 498', 'MECH 505', 'MECH 508',
  'MECH 555', 'MECH 560', 'MECH 592', 'NSCI 591', 'MECH 678', 'MECH 679', 'MECH 683',
];

export default {
  id: 'mechanical-engineering-bsme',
  name: 'Mechanical Engineering',
  degree: 'BSME',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/mechanical-engineering/mechanical-engineering-bsme/',
  hours: 87,
  degreeHours: 127,
  notes: [
    'Technical electives: 3 courses (9 hours) in one area of specialization. A course used as the area core requirement may not also count as an area elective.',
    'DSCI 305 may not be used as the Limited Elective.',
    'PHYS 141 and PHYS 142 credit is not eligible for the major.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Basic Math and Science Courses (Required Prerequisites)', requirements: [
        { type: 'all', name: 'Chemistry and Mathematics', items: [
          ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], ['MATH 211', 'MATH 220'], ['MATH 212', 'MATH 232'],
        ]},
        { type: 'any', name: 'Mechanics', options: [
          { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
          { type: 'course', name: 'PHYS 111', options: ['PHYS 111'] },
        ]},
        { type: 'any', name: 'Electricity and Magnetism', options: [
          { type: 'all', name: 'PHYS 102 and PHYS 104', items: ['PHYS 102', 'PHYS 104'] },
          { type: 'course', name: 'PHYS 112', options: ['PHYS 112'] },
        ]},
      ]},
      { type: 'all', name: 'Computational Applied Mathematics and Operations Research', items: [
        ['CMOR 220', 'MECH 210'], ['CMOR 302', 'CMOR 303', 'MATH 355', 'MATH 354'], 'CMOR 304',
      ]},
      { type: 'all', name: 'Senior Design', items: ['MECH 407', 'MECH 408'] },
      { type: 'all', name: 'Laboratory Courses', items: ['MECH 231', 'MECH 331', 'MECH 332', 'MECH 340'] },
      { type: 'all', name: 'Mechanical Engineering', items: [
        'MECH 200', 'MECH 202', 'MECH 203', 'MECH 310', 'MECH 315', 'MECH 341', 'MECH 342', 'MECH 350', 'MECH 371', ['MECH 420', 'ELEC 436'], 'MECH 481',
      ]},
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Limited Elective', count: 1, from: [{ dept: ['CMOR', 'DSCI', 'MATH', 'STAT'], min: 300, exclude: ['DSCI 305'] }],
        note: 'One CMOR, DSCI, MATH or STAT course at the 300 level or above.' },
      { type: 'any', name: 'Technical Electives (Area of Specialization)', options: [
        { type: 'group', name: 'Aerospace', requirements: [
          { type: 'course', name: 'Core Requirement', options: ['MECH 494'] },
          { type: 'choose', name: 'Aerospace Electives', count: 2, from: [
            'MECH 411', 'MECH 412', 'MECH 417', 'CEVE 417', 'MECH 454', 'BIOE 454', 'CEVE 454', 'MECH 471', 'MECH 472', 'MECH 474',
            'MECH 478', 'MECH 480', 'MECH 482', 'MECH 483', 'MECH 488', 'MECH 491', 'MECH 496', 'MECH 498', 'COMP 498', 'ELEC 498',
            'MECH 508', 'CMOR 508', 'ELEC 508', 'MECH 555', 'MECH 592', 'NSCI 591',
          ]},
        ]},
        { type: 'group', name: 'Computational Engineering', requirements: [
          { type: 'course', name: 'Core Requirement', options: ['MECH 417', 'CEVE 417', 'MECH 454', 'BIOE 454', 'CEVE 454'] },
          { type: 'choose', name: 'Computational Engineering Electives', count: 2, from: [
            'CMOR 360', 'CMOR 423', 'CEVE 455', 'MECH 409', 'MECH 417', 'CEVE 417', 'MECH 427', 'CEVE 427', 'MECH 454', 'BIOE 454', 'CEVE 454',
            'MECH 466', 'CEVE 496', 'MECH 474', 'MECH 475', 'MECH 497', 'MECH 505', 'MECH 555', 'MECH 679', 'CEVE 679',
          ]},
        ]},
        { type: 'group', name: 'Mechanics/Dynamics', requirements: [
          { type: 'course', name: 'Core Requirement', options: ['MECH 412'] },
          { type: 'choose', name: 'Mechanics/Dynamics Electives', count: 2, from: [
            'CEVE 476', 'COMP 462', 'MECH 400', 'CEVE 400', 'MECH 411', 'MECH 416', 'MECH 417', 'CEVE 417', 'MECH 427', 'CEVE 427',
            'MECH 430', 'MECH 450', 'COMP 450', 'ELEC 450', 'MECH 474', 'MECH 478', 'MECH 488', 'MECH 496', 'MECH 497',
            'MECH 498', 'COMP 498', 'ELEC 498', 'MECH 508', 'CMOR 508', 'ELEC 508', 'MECH 560', 'MECH 678', 'CEVE 678',
          ], exclusive: [['COMP 462', 'MECH 498', 'COMP 498', 'ELEC 498']], note: 'Either COMP 462 or MECH 498 may count, but not both.' },
        ]},
        { type: 'group', name: 'Thermal Fluids', requirements: [
          { type: 'choose', name: 'Core Requirement', count: 1, from: ['MECH 454', 'BIOE 454', 'CEVE 454', 'MECH 472', 'MECH 475'] },
          { type: 'choose', name: 'Thermal Fluids Electives', count: 2, from: [
            'MECH 417', 'CEVE 417', 'MECH 454', 'BIOE 454', 'CEVE 454', 'MECH 472', 'MECH 475', 'MECH 480', 'MECH 482', 'MECH 483',
            'MECH 484', 'MECH 487', 'MECH 489', 'MECH 491', 'MECH 494', 'MECH 555', 'MECH 560', 'MECH 575', 'MECH 592', 'NSCI 591',
          ]},
        ]},
        { type: 'group', name: 'Breadth in Mechanical Engineering', requirements: [
          { type: 'choose', name: 'Core Requirement', count: 1, from: ['MECH 412', 'MECH 417', 'CEVE 417', 'MECH 454', 'BIOE 454', 'CEVE 454', 'MECH 472', 'MECH 475', 'MECH 494'] },
          { type: 'choose', name: 'Breadth Electives', count: 2, from: BREADTH_ELECTIVES },
        ]},
      ]},
    ]},
  ],
};
