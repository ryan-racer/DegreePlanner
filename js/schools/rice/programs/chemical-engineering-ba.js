export default {
  id: 'chemical-engineering-ba',
  name: 'Chemical Engineering',
  degree: 'BA',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/chemical-biomolecular-engineering/chemical-engineering-ba/',
  hours: 72,
  notes: [
    'PHYS 141 and PHYS 142 credit is not eligible for the major.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Chemistry', requirements: [
        { type: 'all', name: 'General and Physical Chemistry', items: [
          ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114'], 'CHEM 301',
        ]},
        { type: 'any', name: 'Organic Chemistry', options: [
          { type: 'all', name: 'CHEM 211 and CHEM 213', items: ['CHEM 211', 'CHEM 213'] },
          { type: 'course', name: 'CHEM 219', options: ['CHEM 219'] },
        ]},
      ]},
      { type: 'group', name: 'Mathematics', requirements: [
        { type: 'all', name: 'Calculus and Differential Equations', items: [['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], 'MATH 211'] },
        { type: 'any', name: 'Multivariable Calculus', options: [
          { type: 'course', name: 'MATH 212', options: ['MATH 212', 'MATH 232'] },
          { type: 'all', name: 'MATH 221 and MATH 222', items: ['MATH 221', 'MATH 222'] },
        ]},
      ]},
      { type: 'group', name: 'Physics', requirements: [
        { type: 'any', name: 'Mechanics', options: [
          { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
          { type: 'course', name: 'PHYS 111', options: ['PHYS 111'] },
        ]},
        { type: 'any', name: 'Electricity and Magnetism', options: [
          { type: 'all', name: 'PHYS 102 and PHYS 104', items: ['PHYS 102', 'PHYS 104'] },
          { type: 'course', name: 'PHYS 112', options: ['PHYS 112'] },
        ]},
      ]},
    ]},
    { type: 'all', name: 'Chemical and Biomolecular Engineering Core Courses', items: [
      'CHBE 243', 'CHBE 301', 'CHBE 302', 'CHBE 305', 'CHBE 310', 'CHBE 344', 'CHBE 390', 'CHBE 401', 'CHBE 402',
      'CHBE 403', 'CHBE 411', 'CHBE 412', ['CHBE 410', 'CHBE 415'],
    ]},
  ],
};
