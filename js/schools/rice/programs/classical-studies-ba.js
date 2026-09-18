export default {
  id: 'classical-studies-ba',
  name: 'Classical Studies',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/classical-studies/classical-studies-ba/',
  hours: 30,
  notes: [],
  requirements: [
    { type: 'choose', name: 'Core Requirements', count: 2, from: ['CLAS 107', 'CLAS 108', 'CLAS 235', 'CLAS 336'] },
    { type: 'any', name: 'Area of Specialization', options: [
      { type: 'group', name: 'Classical Civilizations', requirements: [
        { type: 'choose', name: 'Classical Studies, Greek, or Latin Courses', count: 8, from: [{ dept: ['CLAS', 'GREE', 'LATI'] }],
          atLeast: [{ count: 2, from: [{ dept: ['CLAS', 'GREE', 'LATI'], min: 300 }], label: 'Course at the 300 level or above (at least 2 of the 8)' }] },
      ]},
      { type: 'group', name: 'Classical Languages', requirements: [
        { type: 'choose', name: 'Advanced Greek or Latin', count: 1, from: [{ dept: ['GREE', 'LATI'], min: 300 }] },
        { type: 'choose', name: 'Greek (200-level or above)', count: 1, from: [{ dept: 'GREE', min: 200 }] },
        { type: 'choose', name: 'Latin (200-level or above)', count: 1, from: [{ dept: 'LATI', min: 200 }] },
        { type: 'choose', name: 'Classical Studies, Greek, or Latin Courses', count: 5, from: [{ dept: ['CLAS', 'GREE', 'LATI'] }],
          atLeast: [{ count: 1, from: [{ dept: ['CLAS', 'GREE', 'LATI'], min: 300 }], label: 'Course at the 300 level or above (at least 1 of the 5)' }] },
      ]},
    ]},
  ],
};
