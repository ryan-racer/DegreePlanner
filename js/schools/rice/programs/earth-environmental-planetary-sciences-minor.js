export default {
  id: 'earth-environmental-planetary-sciences-minor',
  name: 'Earth, Environmental and Planetary Sciences',
  degree: 'Minor',
  kind: 'minor',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/earth-environmental-planetary-sciences/earth-environmental-planetary-sciences-minor/',
  hours: 19,
  notes: [
    'At least 5 courses (15 credit hours) must be at the 300 level or above.',
    'EEPS 32x courses not used for the core may count as electives.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Introductory Course', count: 1,
        from: ['EEPS 101', 'EEPS 106', 'EEPS 107', 'EEPS 108', 'EEPS 109', 'EEPS 110', 'EEPS 111', 'EEPS 115', 'EEPS 116'] },
      { type: 'choose', name: 'Intermediate Courses', count: 2, from: ['EEPS 321', 'EEPS 322', 'EEPS 323', 'EEPS 325', 'EEPS 334'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 3, from: [{ dept: 'EEPS', min: 300 }],
      note: 'EEPS courses at the 300 level or above.' },
  ],
};
