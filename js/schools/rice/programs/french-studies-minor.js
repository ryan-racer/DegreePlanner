export default {
  id: 'french-studies-minor',
  name: 'French Studies',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/french-studies/french-studies-minor/',
  hours: 18,
  notes: [
    'At most 2 elective courses (6 credit hours) may be at the 200 level.',
    'At most 1 course (3 credit hours) may be a FREN course taught in English (FREN 250, 308, 324, 325, 337, 355, 402, 478); courses taught in English outside FREN do not count.',
    'Core courses not used for the Core Requirements may count as electives; no course counts toward more than one requirement.',
    'Rice in France participants may count FREN 306 as an elective, allowing both FREN 300 and FREN 306 to count.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Language and Culture', count: 1, from: ['FREN 301', 'FREN 302', 'FREN 300', 'FREN 306', 'FREN 307'] },
      { type: 'choose', name: 'French and Francophone Studies', count: 1, from: ['FREN 311', 'FREN 312', 'FREN 313', 'FREN 314'] },
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'FREN electives at the 300 level or above', count: 2, from: [{ dept: 'FREN', min: 300 }] },
      { type: 'choose', name: 'FREN electives at the 200 level or above', count: 2, from: [{ dept: 'FREN', min: 200 }] },
    ]},
  ],
};
