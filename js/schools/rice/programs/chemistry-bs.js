export default {
  id: 'chemistry-bs',
  name: 'Chemistry',
  degree: 'BS',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/chemistry/chemistry-bs/',
  hours: 69,
  notes: [
    'Credit for PHYS 141 or PHYS 142 is not eligible for the Chemistry major.',
    'MATH 220 may substitute for MATH 211. MATH 212 is strongly recommended for physical/theoretical chemistry or graduate study.',
    'Chemistry students may enroll in BIOS 301 without BIOS 201 with instructor approval.',
    'Advanced coursework means CHEM lecture courses at the 400 level or above; courses in other departments with substantial chemistry content may count with approval of the Director of Undergraduate Studies.',
    'Research courses require instructor permission; CHEM 391 should be completed before the end of the junior year. CHEM 700 may count for at most 2 credit hours of research.',
  ],
  requirements: [
    {
      type: 'group',
      name: 'Core Requirements',
      requirements: [
        {
          type: 'group',
          name: 'Chemistry Foundation Courses',
          requirements: [
            {
              type: 'all',
              name: 'General Chemistry',
              items: [['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114']],
            },
            {
              type: 'course',
              name: 'Organic Chemistry I',
              options: ['CHEM 211', 'CHEM 219'],
              note: 'CHEM 211 is taken with its discussion section CHEM 213.',
            },
            {
              type: 'course',
              name: 'Organic Chemistry II',
              options: ['CHEM 313', 'CHEM 320'],
              note: 'CHEM 313 is taken with its discussion section CHEM 314.',
            },
            { type: 'all', name: 'Physical Chemistry', items: ['CHEM 301', 'CHEM 302'] },
            {
              type: 'all',
              name: 'Analytical, Inorganic, and Organic Laboratory',
              items: ['CHEM 330', 'CHEM 360', 'CHEM 365'],
            },
            { type: 'choose', name: 'Biochemistry', count: 1, from: ['BIOS 301', 'CHEM 340'] },
          ],
        },
        {
          type: 'all',
          name: 'Mathematics',
          items: [['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], ['MATH 211', 'MATH 220']],
        },
        {
          type: 'group',
          name: 'Physics',
          requirements: [
            {
              type: 'choose',
              name: 'Mechanics',
              count: 1,
              from: ['PHYS 101', 'PHYS 111', 'PHYS 125'],
              note: 'PHYS 101 is taken with PHYS 103.',
            },
            {
              type: 'choose',
              name: 'Electricity and Magnetism',
              count: 1,
              from: ['PHYS 102', 'PHYS 112', 'PHYS 126'],
              note: 'PHYS 102 is taken with PHYS 104.',
            },
          ],
        },
      ],
    },
    {
      type: 'choose',
      name: 'Advanced Laboratories',
      count: 2,
      from: ['BIOS 311', 'CHEM 366', 'CHEM 367', 'CHEM 368', 'CHEM 369'],
      note: 'CHEM 365 is a prerequisite for the CHEM advanced labs; BIOS 311 requires BIOS 211 and BIOS 301.',
    },
    { type: 'hours', name: 'Research', hours: 8, from: ['CHEM 391', 'CHEM 491', 'CHEM 492', 'CHEM 493', 'CHEM 700'] },
    {
      type: 'choose',
      name: 'Advanced Coursework in Chemistry',
      count: 3,
      from: ['BIOS 302', { dept: 'CHEM', min: 400, exclude: ['CHEM 491', 'CHEM 492', 'CHEM 493', 'CHEM 700'] }],
    },
  ],
};
