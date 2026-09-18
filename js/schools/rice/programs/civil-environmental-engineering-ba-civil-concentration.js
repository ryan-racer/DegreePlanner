export default {
  id: 'civil-environmental-engineering-ba-civil-concentration',
  name: 'Civil and Environmental Engineering (Civil Engineering Concentration)',
  degree: 'BA',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/civil-environmental-engineering/civil-environmental-engineering-ba-civil-concentration/',
  hours: 57,
  notes: [
    'Area of Specialization: 8 approved elective courses (24 hours) chosen with the CEVE advisor. At least 5 must be within one area of specialization, at least 5 at the 300 level or above, and at least 3 from CEVE.',
    'PHYS 141 credit is not eligible for the major.',
  ],
  requirements: [
    { type: 'all', name: 'Core Requirements', items: [
      ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['CMOR 220', 'CMOR 302'],
      ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], 'MATH 211', 'PHYS 101', 'PHYS 103',
    ]},
    { type: 'all', name: 'Major Concentration in Civil Engineering', items: [
      ['CEVE 211', 'MECH 211'], 'CEVE 310', ['CEVE 311', 'MECH 311'], 'CEVE 312', 'CEVE 325',
    ]},
    { type: 'group', name: 'Area of Specialization', requirements: [
      { type: 'choose', name: 'CEVE Electives', count: 3, from: [{ dept: 'CEVE' }] },
      { type: 'choose', name: 'Upper-Level Electives', count: 5, from: [{ dept: '*', min: 300 }],
        note: 'Approved electives selected with the CEVE advisor; at least 5 of the 8 must be at the 300 level or above.' },
    ]},
  ],
};
