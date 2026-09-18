export default {
  id: 'greek-minor',
  name: 'Greek Language and Literature',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/greek-language-literature/greek-minor/',
  hours: 18,
  notes: ['CLAS 336 / LING 336 (Introduction to Indo-European) may substitute for any one elective.'],
  requirements: [
    { type: 'course', name: 'Core Requirement', options: ['CLAS 107'] },
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'GREE courses at the 300 level or above', count: 2, from: [{ dept: 'GREE', min: 300 }, 'CLAS 336'] },
      { type: 'choose', name: 'GREE courses at any level', count: 3, from: [{ dept: 'GREE' }, 'CLAS 336'] },
    ]},
  ],
};
