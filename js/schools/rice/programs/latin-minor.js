export default {
  id: 'latin-minor',
  name: 'Latin Language and Literature',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/latin-language-literature/latin-minor/',
  hours: 18,
  notes: ['CLAS 336 / LING 336 (Introduction to Indo-European) may substitute for any one elective.'],
  requirements: [
    { type: 'course', name: 'Core Requirement', options: ['CLAS 108', 'HUMA 111'] },
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'LATI courses at the 300 level or above', count: 2, from: [{ dept: 'LATI', min: 300 }, 'CLAS 336'] },
      { type: 'choose', name: 'LATI courses at any level', count: 3, from: [{ dept: 'LATI' }, 'CLAS 336'] },
    ]},
  ],
};
