export default {
  id: 'chemical-physics-bs',
  name: 'Chemical Physics',
  degree: 'BS',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/chemical-physics/chemical-physics-bs/',
  hours: 72,
  notes: [
    'Credit for PHYS 125, PHYS 126, PHYS 141, or PHYS 142 is not eligible for the Chemical Physics major.',
    'Students without credit for MATH 101/102 must take them or substitute more advanced MATH or CMOR coursework with program approval.',
  ],
  requirements: [
    {
      type: 'group',
      name: 'Core Requirements',
      requirements: [
        {
          type: 'group',
          name: 'Chemistry',
          requirements: [
            { type: 'all', name: 'General Chemistry I', items: [['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113']] },
            {
              type: 'any',
              name: 'General Chemistry II or Advanced Topics',
              options: [
                {
                  type: 'all',
                  name: 'General Chemistry II with Laboratory',
                  items: [['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114']],
                },
                { type: 'course', name: 'Advanced Topics in General Chemistry', options: ['CHEM 201'] },
              ],
            },
            {
              type: 'course',
              name: 'Organic Chemistry I',
              options: ['CHEM 211', 'CHEM 219'],
              note: 'CHEM 211 is taken with its discussion section CHEM 213.',
            },
            { type: 'all', name: 'Physical Chemistry', items: ['CHEM 301', 'CHEM 302'] },
            { type: 'choose', name: 'Chemistry Laboratory', count: 1, from: ['CHEM 365', 'CHEM 367', 'CHEM 368'] },
          ],
        },
        {
          type: 'group',
          name: 'Physics',
          requirements: [
            {
              type: 'choose',
              name: 'Mechanics',
              count: 1,
              from: ['PHYS 101', 'PHYS 111'],
              note: 'PHYS 101 is taken with PHYS 103.',
            },
            {
              type: 'choose',
              name: 'Electricity and Magnetism',
              count: 1,
              from: ['PHYS 102', 'PHYS 112'],
              note: 'PHYS 102 is taken with PHYS 104.',
            },
            {
              type: 'all',
              name: 'Physics Courses',
              items: ['PHYS 201', 'PHYS 202', 'PHYS 231', 'PHYS 301', 'PHYS 302'],
            },
          ],
        },
        {
          type: 'all',
          name: 'Mathematics',
          items: [
            ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], ['MATH 211', 'MATH 220', 'MATH 221'],
            ['MATH 212', 'MATH 222', 'MATH 232'],
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'Elective Requirements',
      requirements: [
        {
          type: 'choose',
          name: 'Advanced Coursework in Physics and Chemistry',
          count: 3,
          from: ['PHYS 311', 'PHYS 312', 'CHEM 430', 'CHEM 360', 'CHEM 415', 'CHEM 420', 'PHYS 425'],
        },
        {
          type: 'choose',
          name: 'Advanced Laboratories',
          count: 2,
          from: ['CHEM 366', 'CHEM 367', 'CHEM 368', 'CHEM 491', 'PHYS 461', 'PHYS 332'],
        },
        {
          type: 'choose',
          name: 'Advanced Coursework in Mathematics (MATH or CMOR)',
          count: 2,
          from: [{ dept: ['MATH', 'CMOR'], min: 300 }],
        },
      ],
    },
  ],
  constraints: [
    { type: 'atMost', hours: 2, from: ['CHEM 491', 'PHYS 461'], among: ['1.1'], label: 'At most 2 credit hours of CHEM 491 or PHYS 461 toward Advanced Laboratories' },
  ],
};
