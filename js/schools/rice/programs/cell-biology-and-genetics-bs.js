export default {
  id: 'cell-biology-and-genetics-bs',
  name: 'Biosciences (Cell Biology and Genetics Concentration)',
  degree: 'BS',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/biosciences/cell-biology-and-genetics-bs/',
  hours: 68,
  notes: [
    'Credit for PHYS 141 or PHYS 142 is not eligible for the Biosciences major.',
    'Because of the common core, students may change their major concentration at any time.',
  ],
  requirements: [
    {
      type: 'group',
      name: 'Core Requirements',
      requirements: [
        {
          type: 'all',
          name: 'Non-Biology Courses',
          items: [
            ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'],
            ['PHYS 125', 'PHYS 101', 'PHYS 111'], ['STAT 305', 'STAT 315', 'DSCI 301'],
          ],
          note: 'PHYS 101 (with PHYS 103) or PHYS 111 may substitute for PHYS 125. With approval, STAT 280 or STAT 180 may substitute for STAT 305.',
        },
        { type: 'all', name: 'Core Lecture Courses', items: [['BIOS 201', 'BIOS 101'], ['BIOS 202', 'BIOS 102']] },
      ],
    },
    {
      type: 'group',
      name: 'Major Concentration in Cell Biology and Genetics',
      requirements: [
        { type: 'all', name: 'Non-Biology Courses', items: [['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114']] },
        {
          type: 'course',
          name: 'Organic Chemistry I',
          options: ['CHEM 211', 'CHEM 219'],
          note: 'CHEM 211 is taken with its discussion section CHEM 213.',
        },
        { type: 'all', name: 'Lecture Courses', items: ['BIOS 301', 'BIOS 341', 'BIOS 344'] },
        {
          type: 'choose',
          name: 'Capstone Requirement',
          count: 1,
          from: [
            'BIOS 405', 'BIOS 410', 'BIOS 420', 'BIOS 424', 'BIOS 425', 'BIOS 441', 'BIOS 442', 'BIOS 443',
            'BIOS 444', 'BIOS 447', 'BIOS 449', 'BIOS 450', 'BIOS 460', 'BIOS 470', 'BIOS 481',
          ],
          note: 'The capstone course is in addition to the other lecture requirements; a course may satisfy only one requirement.',
        },
        {
          type: 'choose',
          name: 'Elective Lecture Courses',
          count: 3,
          from: [
            'BIOE 464', 'BIOS 300', 'BIOS 302', 'BIOS 332', 'BIOS 334', 'BIOS 340', 'BIOS 352', 'BIOS 353',
            'BIOS 363', 'BIOS 368', 'BIOS 372', 'BIOS 385', 'BIOS 390', 'BIOS 405', 'BIOS 410', 'BIOS 420',
            'BIOS 424', 'BIOS 425', 'BIOS 431', 'BIOS 441', 'BIOS 442', 'BIOS 443', 'BIOS 444', 'BIOS 447',
            'BIOS 449', 'BIOS 450', 'BIOS 460', 'BIOS 470', 'BIOS 481', 'EEPS 439', 'NEUR 380',
          ],
        },
        { type: 'course', name: 'Core Laboratory Course', options: ['BIOS 211'] },
        {
          type: 'choose',
          name: 'Elective Laboratory Courses',
          count: 2,
          from: ['BIOE 342', 'BIOS 308', 'BIOS 311', 'BIOS 313', 'BIOS 314', 'BIOS 315', 'BIOS 318', 'BIOS 324', 'BIOS 393'],
        },
        {
          type: 'hours',
          name: 'Independent Research',
          hours: 9,
          from: ['BIOS 310', 'BIOS 401', 'BIOS 411', 'BIOS 402', 'BIOS 412'],
          note: 'At least 9 credit hours of BIOS 310 (at least 3 credit hours per semester), or at least 13 credit hours through BIOS 310 plus BIOS 401, BIOS 411, BIOS 402, and BIOS 412.',
        },
      ],
    },
    {
      type: 'choose',
      name: 'Core Elective Lecture Course',
      count: 1,
      from: [
        {
          dept: [
            'ASTR', 'BIOE', 'BIOS', 'CEVE', 'CHBE', 'CHEM', 'CMOR', 'COMP', 'DSCI', 'EDES', 'EEPS', 'ELEC', 'ENGI',
            'GLHT', 'HEAL', 'KINE', 'MATH', 'MECH', 'MSNE', 'NEUR', 'NSCI', 'PHYS', 'RCEL', 'STAT',
          ],
          min: 200,
        },
      ],
      note: 'One lecture course at the 200 level or above offered by the Wiess School of Natural Sciences or the George R. Brown School of Engineering and Computing.',
    },
  ],
};
