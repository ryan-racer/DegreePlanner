export default {
  id: 'environmental-science-bs-ecology-evolutionary-biology-concentration',
  name: 'Environmental Science (Ecology and Evolutionary Biology Concentration)',
  degree: 'BS',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/environmental-science/environmental-science-bs-ecology-evolutionary-biology-concentration/',
  hours: 75,
  notes: [
    'STAT 180 may substitute for STAT 280.',
    'Students may petition to apply alternative courses toward the Advanced Electives requirement.',
    'Because of the common core, students may change their major concentration at any time.',
    'Independent research on environmental topics is encouraged but not required.',
  ],
  requirements: [
    {
      type: 'group',
      name: 'Core Requirements',
      requirements: [
        {
          type: 'all',
          name: 'Foundation Coursework',
          items: [
            ['BIOS 201', 'BIOS 101'], ['BIOS 202', 'BIOS 102'], 'BIOS 332', ['CHEM 121', 'CHEM 111'],
            ['CHEM 123', 'CHEM 113'], ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114'], ['MATH 101', 'MATH 105'],
            ['MATH 102', 'MATH 106'], ['STAT 280', 'STAT 305', 'STAT 180'],
          ],
        },
        {
          type: 'choose',
          name: 'Physics',
          count: 1,
          from: ['PHYS 101', 'PHYS 111', 'PHYS 125', 'PHYS 141'],
          note: 'PHYS 101 is taken with PHYS 103.',
        },
        {
          type: 'choose',
          name: 'Data and Quantitation',
          count: 1,
          from: [
            'BIOS 338', 'BIOS 470', 'CEVE 421', 'COMP 140', 'DSCI 101', 'EEPS 220', 'EEPS 435', 'EEPS 436',
            'EEPS 440', 'PHYS 102', 'PHYS 112', 'PHYS 126', 'PHYS 142', 'STAT 484', 'STAT 485',
          ],
          note: 'PHYS 102 is taken with PHYS 104.',
        },
        {
          type: 'group',
          name: 'Core Courses',
          requirements: [
            {
              type: 'all',
              name: 'Required Core Courses',
              items: ['BIOS 213', ['ENST 100', 'ARCH 105'], 'EEPS 321', 'EEPS 325'],
            },
            {
              type: 'choose',
              name: 'Introductory Earth Science',
              count: 1,
              from: [{ dept: 'EEPS', min: 100, max: 199 }],
              note: 'Any EEPS course at the 100 level (minimum 3 credit hours).',
            },
          ],
        },
        {
          type: 'hours',
          name: 'Field Experience',
          hours: 2,
          from: [
            'BIOS 127', 'BIOS 204', 'BIOS 316', 'BIOS 317', 'BIOS 319', 'BIOS 320', 'BIOS 322', 'BIOS 323',
            'BIOS 327', 'BIOS 330', 'BIOS 337', 'BIOS 339', 'EEPS 103', 'EEPS 309', 'EEPS 334',
          ],
          note: '1-2 courses totaling 2-3 credit hours. BIOS 204 (1 credit hour) may be applied only once.',
        },
      ],
    },
    {
      type: 'group',
      name: 'Major Concentration in Ecology and Evolutionary Biology',
      requirements: [
        {
          type: 'choose',
          name: 'Core Requirements',
          count: 2,
          from: ['BIOS 271', 'BIOS 326', 'BIOS 329', 'BIOS 334', 'BIOS 374', 'BIOS 423', 'BIOS 431'],
        },
        {
          type: 'choose',
          name: 'Elective Requirement',
          count: 1,
          from: ['BIOS 321', 'BIOS 326', 'BIOS 334', 'BIOS 336', 'BIOS 338', 'BIOS 423', 'BIOS 431'],
          note: 'The core course not used above may be applied here.',
        },
      ],
    },
    {
      type: 'group',
      name: 'Advanced Electives',
      requirements: [
        {
          type: 'choose',
          name: 'Humanities and Architecture',
          count: 1,
          from: [
            'ECON 480', 'ENGL 269', 'ENGL 310', 'ENGL 358', 'ENGL 459', 'ENST 205', 'ENST 307', 'ENST 313',
            'ENST 316', 'ENST 318', 'ENST 320', 'ENST 322', 'ENST 345', 'ENST 368', 'ENST 384', 'ENST 415',
            'ENST 445', 'ENST 446', 'HART 302', 'HART 408', 'HART 473', 'HIST 320', 'HIST 321', 'HIST 442',
            'HIST 470', 'POLI 441', 'SPAN 328',
          ],
        },
        {
          type: 'choose',
          name: 'Natural Sciences and Engineering and Computing',
          count: 1,
          from: [
            'BIOS 280', 'BIOS 374', 'BIOS 559', 'CEVE 302', 'CEVE 308', 'CEVE 310', 'CEVE 314', 'CEVE 323',
            'CEVE 401', 'CEVE 404', 'CEVE 411', 'CEVE 412', 'CEVE 414', 'CEVE 415', 'CEVE 420', 'CEVE 421',
            'CEVE 434', 'CEVE 484', 'CHBE 366', 'CHBE 382', 'CHEM 211', 'EEPS 415', 'EEPS 417', 'EEPS 418',
            'EEPS 420', 'EEPS 426', 'EEPS 433', 'EEPS 434', 'EEPS 436', 'EEPS 437', 'EEPS 438', 'EEPS 439',
            'EEPS 440', 'ENST 250', 'ENST 307', 'ENST 406', 'HEAL 372', 'HEAL 375', 'HEAL 376', 'HEAL 407',
            'MECH 475',
          ],
          note: 'CHEM 211 is taken with CHEM 213; PHYS 101/102 with PHYS 103/104. One course from the other major concentration\'s list may also count here.',
        },
        {
          type: 'choose',
          name: 'Business and Social Sciences',
          count: 1,
          from: [
            'ANTH 210', 'ANTH 303', 'ANTH 315', 'ANTH 348', 'ANTH 352', 'ANTH 355', 'ANTH 377', 'ANTH 381',
            'ANTH 393', 'BUSI 432', 'ECON 480', 'ECON 485', 'ENST 301', 'ENST 302', 'ENST 312', 'ENST 316',
            'ENST 332', 'ENST 367', 'ENST 437', 'POLI 332', 'POLI 362', 'POLI 441', 'SOCI 313', 'SOCI 368',
            'SOCI 423',
          ],
        },
      ],
    },
    {
      type: 'choose',
      name: 'Advanced Field or Research Experience',
      count: 1,
      from: ['BIOS 310', 'BIOS 322', 'BIOS 323', 'BIOS 401', 'EEPS 390', 'EEPS 391', 'EEPS 481'],
    },
    { type: 'course', name: 'Capstone Senior Seminar', options: ['BIOS 495', 'EEPS 495'] },
  ],
};
