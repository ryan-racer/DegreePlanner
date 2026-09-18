export default {
  id: 'spanish-and-portuguese-ba',
  name: 'Spanish and Portuguese',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/spanish-and-portuguese/spanish-and-portuguese-ba/',
  hours: 30,
  notes: [
    'Up to 1 elective may be a SPAN/PORT course at the 200 level.',
    'Up to 2 program-approved LALX electives (LALX 158, 350, 378, 492) may count as electives.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Writing / Brazilian Culture', count: 1, from: ['SPAN 330', 'PORT 302', 'PORT 331'] },
      { type: 'course', name: 'Approaches to Hispanic Literatures', options: ['SPAN 332'] },
    ]},
    { type: 'group', name: 'Advanced Coursework in Spanish and Portuguese', requirements: [
      { type: 'course', name: 'Hispanic Linguistics', options: ['SPAN 350'] },
      { type: 'choose', name: 'SPAN/PORT 401-489', count: 3, from: [{ dept: ['SPAN', 'PORT'], min: 401, max: 489 }] },
      { type: 'choose', name: 'SPAN/PORT 330-399', count: 2, from: [{ dept: ['SPAN', 'PORT'], min: 330, max: 399 }] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 2, from: [
      'SPAN 303', 'SPAN 321', 'SPAN 322', 'SPAN 325',
      { dept: ['SPAN', 'PORT'], min: 330 },
      'LALX 158', 'LALX 350', 'LALX 378', 'LALX 492',
    ]},
  ],
};
