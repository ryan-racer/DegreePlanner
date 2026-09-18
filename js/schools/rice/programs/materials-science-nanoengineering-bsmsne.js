const ENGINEERING_CLUSTER = [
  'BIOE 370', 'CEVE 310', 'CEVE 311', 'MECH 311', 'CEVE 427', 'MECH 427', 'CEVE 434', 'CHBE 390', 'CHBE 401',
  'ELEC 241', 'ELEC 240', 'ELEC 243', 'ELEC 261', 'ELEC 361', 'ELEC 462', 'ENGI 302', 'CEVE 302',
  'MECH 211', 'CEVE 211', 'MECH 403', 'MECH 417', 'CEVE 417', 'MECH 481',
];
const TECHNICAL_CLUSTER = [
  'MSNE 413', 'MSNE 433', 'MSNE 505', 'MSNE 512', 'MSNE 523', 'MSNE 538', 'CEVE 538', 'MSNE 555', 'MSNE 560', 'CHBE 560',
  'MSNE 569', 'MSNE 580', 'CHEM 580', 'MSNE 581', 'MECH 581', 'MSNE 593', 'CHBE 593', 'MSNE 594', 'CHBE 594', 'MSNE 650',
];

export default {
  id: 'materials-science-nanoengineering-bsmsne',
  name: 'Materials Science and NanoEngineering',
  degree: 'BSMSNE',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/materials-science-nanoengineering/materials-science-nanoengineering-bsmsne/',
  hours: 90,
  degreeHours: 124,
  notes: [
    'Cluster electives: 300-level or above Engineering courses may satisfy the Engineering Cluster and 300-level or above Natural Sciences courses the Math and Science Cluster, but courses not on the pre-approved lists need advisor approval.',
    'ELEC 241 and ELEC 240 must be taken together to count for the Engineering Cluster.',
    'STAT 180 (AP statistics) credit is not eligible for the major. PHYS 141 and PHYS 142 credit is not eligible.',
  ],
  requirements: [
    { type: 'group', name: 'Required Math and Science Prerequisites', requirements: [
      { type: 'all', name: 'Mathematics, Chemistry and Computation', items: [
        ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], ['MATH 211', 'MATH 220'], ['MATH 212', 'MATH 232'],
        ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114'],
        ['CMOR 220', 'COMP 140'],
      ]},
      { type: 'any', name: 'Mechanics', options: [
        { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
        { type: 'course', name: 'PHYS 111', options: ['PHYS 111'] },
      ]},
      { type: 'any', name: 'Electricity and Magnetism', options: [
        { type: 'all', name: 'PHYS 102 and PHYS 104', items: ['PHYS 102', 'PHYS 104'] },
        { type: 'course', name: 'PHYS 112', options: ['PHYS 112'] },
      ]},
      { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 355', 'MATH 354'] },
      { type: 'any', name: 'Additional Science', options: [
        { type: 'course', name: 'PHYS 201 or CHEM 301', options: ['PHYS 201', 'CHEM 301'] },
        { type: 'all', name: 'CHEM 211 and CHEM 213', items: ['CHEM 211', 'CHEM 213'] },
      ]},
    ]},
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'all', name: 'Materials Science and NanoEngineering Courses', items: [
        ['MSNE 201', 'MSNE 203'], 'MSNE 211', 'MSNE 302', 'MSNE 304', 'MSNE 311', 'MSNE 401', 'MSNE 402', 'MSNE 406',
        'MSNE 407', 'MSNE 408', 'MSNE 435', 'MSNE 450', 'MSNE 451',
      ]},
      { type: 'choose', name: 'Core Elective Courses', count: 3, from: ['MSNE 411', 'MSNE 414', 'MSNE 415', 'MSNE 421'] },
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Engineering Cluster', count: 1, from: ENGINEERING_CLUSTER },
      { type: 'choose', name: 'Math and Science Cluster', count: 1, from: [
        'BIOS 201', 'BIOS 101', 'BIOS 301', 'BIOS 385', 'CHEM 211', 'CHEM 301', 'CHEM 302', 'CHEM 330', 'CHEM 360',
        'CMOR 304', 'CMOR 360', 'CMOR 415', 'ELEC 488', 'NEUR 415', 'CMOR 422', 'CMOR 435', 'MATH 435', 'CMOR 500', 'CMOR 520',
        'EEPS 307', 'CEVE 307', 'ENST 307', 'EEPS 321', 'MATH 302', 'MATH 354', 'MATH 355',
        'PHYS 201', 'PHYS 202', 'PHYS 301', 'PHYS 302', 'PHYS 355', 'STAT 280', 'STAT 305',
      ]},
      { type: 'choose', name: 'Technical Cluster', count: 1, from: [...TECHNICAL_CLUSTER, ...ENGINEERING_CLUSTER],
        note: 'May also be met with an additional Engineering Cluster course.' },
    ]},
  ],
};
