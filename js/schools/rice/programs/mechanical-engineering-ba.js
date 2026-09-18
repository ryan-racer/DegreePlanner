export default {
  id: 'mechanical-engineering-ba',
  name: 'Mechanical Engineering',
  degree: 'BA',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/mechanical-engineering/mechanical-engineering-ba/',
  hours: 64,
  notes: [
    'MECH major coursework must be taken after completing the Basic Math and Science prerequisites.',
    'PHYS 141 and PHYS 142 credit is not eligible for the major.',
  ],
  requirements: [
    { type: 'group', name: 'Basic Math and Science Courses (Prerequisites)', requirements: [
      { type: 'all', name: 'Chemistry and Mathematics', items: [
        ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], 'MATH 211', ['MATH 212', 'MATH 232'],
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
    { type: 'group', name: 'Required Courses for Mechanical Engineering', requirements: [
      { type: 'all', name: 'Computational Applied Mathematics Courses', items: [['CMOR 220', 'MECH 210'], 'CMOR 304'] },
      { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 354', 'MATH 355'] },
      { type: 'all', name: 'Mechanical Engineering Courses', items: [
        'MECH 200', 'MECH 202', 'MECH 203', 'MECH 310', 'MECH 315', 'MECH 341', 'MECH 342', 'MECH 350', 'MECH 371', ['MECH 420', 'ELEC 436'], 'MECH 481',
      ]},
    ]},
  ],
};
