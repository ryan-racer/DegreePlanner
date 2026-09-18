export default {
  id: 'physics-minor',
  name: 'Physics',
  degree: 'Minor',
  kind: 'minor',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/physics-astronomy/physics-minor/',
  hours: 29,
  notes: [
    'Credit for PHYS 125, PHYS 126, PHYS 141, or PHYS 142 is not eligible for the Physics minor.',
    'The elective may be PHYS 332 or PHYS 461 but not PHYS 491-494.',
    'Students without basic calculus credit may substitute more advanced MATH or CMOR coursework with department approval.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'any', name: 'Mechanics', options: [
        { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
        { type: 'course', name: 'PHYS 111', options: ['PHYS 111'] },
      ]},
      { type: 'any', name: 'Electricity and Magnetism', options: [
        { type: 'all', name: 'PHYS 102 and PHYS 104', items: ['PHYS 102', 'PHYS 104'] },
        { type: 'course', name: 'PHYS 112', options: ['PHYS 112'] },
      ]},
      { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
      { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
      { type: 'course', name: 'Differential Equations', options: ['MATH 211', 'MATH 220', 'MATH 221'] },
      { type: 'course', name: 'Multivariable Calculus', options: ['MATH 212', 'MATH 222', 'MATH 232'] },
      { type: 'all', name: 'Physics Courses', items: ['PHYS 201', 'PHYS 202'] },
    ]},
    { type: 'hours', name: 'Elective Requirement', hours: 3,
      from: [{ dept: 'PHYS', min: 300, exclude: ['PHYS 491', 'PHYS 492', 'PHYS 493', 'PHYS 494'] }] },
  ],
};
