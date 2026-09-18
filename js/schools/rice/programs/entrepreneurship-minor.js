export default {
  id: 'entrepreneurship-minor',
  name: 'Entrepreneurship',
  degree: 'Minor',
  kind: 'minor',
  school: 'Business',
  url: 'https://ga.rice.edu/programs-study/departments-programs/business/entrepreneurship/entrepreneurship-minor/',
  hours: 18,
  notes: [
    'At most 2 courses from study abroad or transfer credit. Minimum minor GPA of 2.00.',
  ],
  constraints: [
    { type: 'atLeast', count: 2, from: [{ dept: '*', min: 300 }], label: 'At least 2 courses at the 300 level or above' },
  ],
  requirements: [
    { type: 'all', name: 'Core Requirements', items: ['ENTR 220', 'ENTR 361', 'ENTR 369', 'ENTR 463'] },
    { type: 'choose', name: 'Elective Requirement', count: 2, from: [
      'ENTR 221', 'ENGI 221', 'ENTR 222', 'ENTR 223', 'ENTR 224', 'BIOE 123', 'ENTR 360', 'ENTR 364', 'GLHT 364', 'SOSC 364',
      'ENTR 365', 'ENTR 461', 'ENTR 465', 'ENTR 469', 'RCEL 450',
    ]},
  ],
};
