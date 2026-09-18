export default {
  id: 'classical-civilizations-minor',
  name: 'Classical Civilizations',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/classical-civilizations/classical-civilizations-minor/',
  hours: 18,
  notes: ['At least 3 courses (9 credit hours) must be at the 300 level or above.'],
  requirements: [
    { type: 'choose', name: 'Core Requirements', count: 2, from: ['CLAS 107', 'CLAS 108', 'CLAS 235', 'CLAS 336'] },
    { type: 'choose', name: 'Elective Requirements', count: 4, from: [{ dept: ['CLAS', 'GREE', 'LATI'] }], note: 'Departmental course offerings in CLAS, GREE, or LATI at any level.' },
  ],
};
