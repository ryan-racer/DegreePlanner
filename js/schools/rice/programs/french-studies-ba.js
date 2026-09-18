export default {
  id: 'french-studies-ba',
  name: 'French Studies',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/french-studies/french-studies-ba/',
  hours: 30,
  notes: [
    'Core Requirement courses must be taken at Rice, as early as possible.',
    'Any 200- or 300-level elective may be replaced by a higher-level FREN course. Rice in France participants may count FREN 306 as an elective alongside FREN 300.',
  ],
  constraints: [
    { type: 'atMost', count: 2, from: ['FREN 250', 'FREN 308', 'FREN 324', 'FREN 325', 'FREN 337', 'FREN 355', 'FREN 402', 'FREN 478'], label: 'At most 2 FREN courses taught in English (FREN 250, 308, 324, 325, 337, 355, 402, 478)' },
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Language and Culture', count: 1, from: ['FREN 301', 'FREN 302', 'FREN 300', 'FREN 306', 'FREN 307'] },
      { type: 'choose', name: 'French Studies Survey', count: 2, from: ['FREN 311', 'FREN 312', 'FREN 313', 'FREN 314'] },
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'FREN Electives numbered 360 or above', count: 2, from: [{ dept: 'FREN', min: 360 }] },
      { type: 'choose', name: 'FREN Electives at the 300 level or above', count: 3, from: [{ dept: 'FREN', min: 300 }] },
      { type: 'choose', name: 'FREN Electives at the 200 level or above', count: 2, from: [{ dept: 'FREN', min: 200 }] },
    ]},
  ],
};
