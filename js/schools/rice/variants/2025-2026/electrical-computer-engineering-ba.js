// 2025-2026 General Announcements. Areas of specialization that year: AI & Systems, Computer Engineering,
// Neuroengineering, and Photonics, Electronics, and Nano-devices.
const AI_SYSTEMS = [
  'COMP 330', 'DSCI 302', 'ELEC 378', 'ELEC 383', 'ELEC 384', 'ELEC 406', 'ELEC 430', 'ELEC 431', 'ELEC 434',
  'ELEC 435', 'ELEC 436', 'MECH 420', 'ELEC 437', 'ELEC 439', 'ELEC 447', 'COMP 447', 'ELEC 448', 'ELEC 475', 'ELEC 478',
  'ELEC 482', 'ELEC 498', 'COMP 498', 'MECH 498', 'MECH 488', 'STAT 413',
];
const COMPUTER_ENG = [
  'COMP 321', 'COMP 382', 'COMP 430', 'ELEC 323', 'COMP 322', 'ELEC 328', 'ELEC 410', 'COMP 436', 'ELEC 411', 'ELEC 414',
  'ELEC 421', 'COMP 421', 'ELEC 422', 'ELEC 423', 'ELEC 424', 'COMP 424', 'ELEC 425', 'COMP 425', 'ELEC 426',
  'ELEC 428', 'ELEC 429', 'COMP 429', 'ELEC 434', 'ELEC 437', 'ELEC 442', 'ELEC 450', 'COMP 450', 'MECH 450',
];
const NEUROENG = [
  'ELEC 380', 'BIOE 380', 'NEUR 383', 'ELEC 418', 'ELEC 435', 'ELEC 438', 'ELEC 481', 'ELEC 483', 'ELEC 487',
  'ELEC 488', 'CMOR 415', 'NEUR 415', 'ELEC 489', 'CMOR 416', 'NEUR 416',
];
const PHOTONICS = [
  'ELEC 262', 'ELEC 361', 'PHYS 311', 'ELEC 460', 'ELEC 461', 'PHYS 412', 'ELEC 462', 'ELEC 468', 'PHYS 302', 'PHYS 416',
];
const ALL_AREAS = [...AI_SYSTEMS, ...COMPUTER_ENG, ...NEUROENG, ...PHOTONICS];

export default {
  id: 'electrical-computer-engineering-ba',
  name: 'Electrical and Computer Engineering',
  degree: 'BA',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/archive/2025-2026/programs-study/departments-programs/engineering/electrical-computer-engineering/electrical-computer-engineering-ba/',
  hours: 62,
  notes: [
    'Area of Specialization: 4 courses (12 hours) from at least two areas - at least 2 from the chosen area, 1 from a different area, and 1 from any area. ELEC 500-level graduate courses may count with permission.',
    'In the Photonics, Electronics, and Nano-devices list, ELEC 361 or PHYS 311 is one choice, and ELEC 461 or PHYS 412 is one choice.',
    'The required Design Laboratory does not count as an area of specialization course; a second design lab counts only as a general elective.',
    'At least 8 courses (24 credit hours) must be taken at the 300 level or above.',
    'A course can satisfy only one requirement within the major. PHYS 141 and PHYS 142 credit is not eligible.',
    'Computer Engineering: COMP 140, COMP 182, and COMP 215 are recommended; COMP 222 is a recommended prerequisite for COMP 321, ELEC 421, ELEC 429, and ELEC 450.',
  ],
  constraints: [
    { type: 'atMost', count: 1, from: ['ELEC 361', 'PHYS 311'], among: ['1'], label: 'ELEC 361 or PHYS 311 counts once as a specialization course' },
    { type: 'atMost', count: 1, from: ['ELEC 461', 'PHYS 412'], among: ['1'], label: 'ELEC 461 or PHYS 412 counts once as a specialization course' },
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Mathematics and Science Courses', requirements: [
        { type: 'all', name: 'Physical Electronics, Random Signals and Calculus', items: ['ELEC 261', 'ELEC 303', ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106']] },
        { type: 'course', name: 'Multivariable Calculus', options: ['MATH 212', 'MATH 221', 'MATH 232'] },
        { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 355', 'MATH 354'] },
        { type: 'any', name: 'Mechanics', options: [
          { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
          { type: 'course', name: 'PHYS 111', options: ['PHYS 111'] },
        ]},
        { type: 'any', name: 'Electricity and Magnetism', options: [
          { type: 'all', name: 'PHYS 102 and PHYS 104', items: ['PHYS 102', 'PHYS 104'] },
          { type: 'course', name: 'PHYS 112', options: ['PHYS 112'] },
        ]},
      ]},
      { type: 'all', name: 'ECE Core Courses', items: ['ELEC 220', 'ELEC 241', 'ELEC 240', 'ELEC 242', 'ELEC 244', 'ELEC 305', ['ELEC 326', 'COMP 326']] },
      { type: 'course', name: 'Computation Course', options: ['COMP 140'] },
      { type: 'course', name: 'Design Laboratory', options: ['ELEC 327', 'ELEC 364'] },
    ]},
    { type: 'any', name: 'Area of Specialization', options: [
      { type: 'group', name: 'AI & Systems', requirements: [
        { type: 'choose', name: 'AI & Systems Courses', count: 2, from: AI_SYSTEMS },
        { type: 'choose', name: 'Course from Another Area', count: 1, from: [...COMPUTER_ENG, ...NEUROENG, ...PHOTONICS] },
        { type: 'choose', name: 'Course from Any Area', count: 1, from: ALL_AREAS },
      ]},
      { type: 'group', name: 'Computer Engineering', requirements: [
        { type: 'choose', name: 'Computer Engineering Courses', count: 2, from: COMPUTER_ENG },
        { type: 'choose', name: 'Course from Another Area', count: 1, from: [...AI_SYSTEMS, ...NEUROENG, ...PHOTONICS] },
        { type: 'choose', name: 'Course from Any Area', count: 1, from: ALL_AREAS },
      ]},
      { type: 'group', name: 'Neuroengineering', requirements: [
        { type: 'choose', name: 'Neuroengineering Courses', count: 2, from: NEUROENG },
        { type: 'choose', name: 'Course from Another Area', count: 1, from: [...AI_SYSTEMS, ...COMPUTER_ENG, ...PHOTONICS] },
        { type: 'choose', name: 'Course from Any Area', count: 1, from: ALL_AREAS },
      ]},
      { type: 'group', name: 'Photonics, Electronics, and Nano-devices', requirements: [
        { type: 'choose', name: 'Photonics, Electronics, and Nano-devices Courses', count: 2, from: PHOTONICS },
        { type: 'choose', name: 'Course from Another Area', count: 1, from: [...AI_SYSTEMS, ...COMPUTER_ENG, ...NEUROENG] },
        { type: 'choose', name: 'Course from Any Area', count: 1, from: ALL_AREAS },
      ]},
    ]},
  ],
};
