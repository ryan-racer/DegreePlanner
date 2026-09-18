export default {
  id: 'philosophy-minor',
  name: 'Philosophy',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/philosophy/philosophy-minor/',
  hours: 18,
  notes: ['At least 3 of the 6 courses (9 credit hours) must be at the 300 level or above.'],
  requirements: [
    { type: 'course', name: 'Core Requirement (History of Philosophy)', options: ['PHIL 281', 'PHIL 283'] },
    { type: 'group', name: 'Areas of Study Requirements', requirements: [
      { type: 'choose', name: 'Group 1', count: 1, from: [
        'PHIL 318', 'PHIL 320', 'PHIL 325', 'PHIL 330', 'PHIL 340', 'PHIL 345', 'PHIL 350', 'PHIL 353',
        'PHIL 354', 'PHIL 430', 'PHIL 431',
      ]},
      { type: 'choose', name: 'Group 2', count: 1, from: [
        'PHIL 360', 'PHIL 361', 'PHIL 362', 'PHIL 363', 'PHIL 370', 'PHIL 372', 'PHIL 373', 'PHIL 460',
        'PHIL 470',
      ]},
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 3, from: [{ dept: 'PHIL' }], note: 'Departmental (PHIL) course offerings.' },
  ],
};
