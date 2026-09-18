export default {
  id: 'materials-science-nanoengineering-ba',
  name: 'Materials Science and NanoEngineering',
  degree: 'BA',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/materials-science-nanoengineering/materials-science-nanoengineering-ba/',
  hours: 64,
  notes: [
    'PHYS 141 and PHYS 142 credit is not eligible for the major.',
  ],
  requirements: [
    { type: 'group', name: 'Required Prerequisites', requirements: [
      { type: 'all', name: 'Mathematics and Chemistry', items: [
        ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], ['MATH 211', 'MATH 220'], ['MATH 212', 'MATH 232'],
        ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114'],
      ]},
      { type: 'any', name: 'Mechanics', options: [
        { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
        { type: 'course', name: 'PHYS 111', options: ['PHYS 111'] },
      ]},
      { type: 'any', name: 'Electricity and Magnetism', options: [
        { type: 'all', name: 'PHYS 102 and PHYS 104', items: ['PHYS 102', 'PHYS 104'] },
        { type: 'course', name: 'PHYS 112', options: ['PHYS 112'] },
      ]},
    ]},
    { type: 'all', name: 'Required Courses in Materials Science and NanoEngineering', items: [
      ['MSNE 201', 'MSNE 203'], 'MSNE 211', 'MSNE 302', 'MSNE 304', 'MSNE 311', 'MSNE 401', 'MSNE 402', 'MSNE 406', 'MSNE 435',
    ]},
    { type: 'choose', name: 'Core Elective Courses', count: 3, from: ['MSNE 411', 'MSNE 414', 'MSNE 415', 'MSNE 421'] },
  ],
};
