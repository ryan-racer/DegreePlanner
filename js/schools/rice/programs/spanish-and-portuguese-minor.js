export default {
  id: 'spanish-and-portuguese-minor',
  name: 'Spanish and Portuguese',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/spanish-and-portuguese/spanish-and-portuguese-minor/',
  hours: 18,
  notes: [
    'Any 200- or 300-level SPAN/PORT course may be replaced by a 400-level SPAN/PORT course.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'SPAN or PORT course at the 200 level or above', count: 1, from: [{ dept: ['SPAN', 'PORT'], min: 200 }] },
      { type: 'choose', name: 'SPAN or PORT courses at the 300 level or above', count: 3, from: [{ dept: ['SPAN', 'PORT'], min: 300 }] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 2, from: [{ dept: ['SPAN', 'PORT'], min: 400 }], note: 'SPAN or PORT courses at the 400 level.' },
  ],
  constraints: [
    { type: 'atMost', count: 1, from: [{ dept: '*', max: 299 }], label: 'At most 1 course at the 200 level' },
  ],
};
