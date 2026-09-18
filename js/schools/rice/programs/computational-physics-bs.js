export default {
  id: 'computational-physics-bs',
  name: 'Physics (Computational Physics Concentration)',
  degree: 'BS',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/physics-astronomy/computational-physics-bs/',
  hours: 72,
  notes: [
    'Credit for PHYS 125, PHYS 126, PHYS 141, or PHYS 142 is not eligible for the Physics major.',
    'PHYS 491 & PHYS 493 and PHYS 492 & PHYS 494 must each be taken concurrently.',
    'Students without basic calculus credit may substitute more advanced MATH or CMOR coursework with department approval.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
      { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
      { type: 'course', name: 'Differential Equations', options: ['MATH 211', 'MATH 220', 'MATH 221'] },
      { type: 'course', name: 'Multivariable Calculus', options: ['MATH 212', 'MATH 222', 'MATH 232'] },
      { type: 'any', name: 'Mechanics', options: [
        { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
        { type: 'course', name: 'PHYS 111', options: ['PHYS 111'] },
      ]},
      { type: 'any', name: 'Electricity and Magnetism', options: [
        { type: 'all', name: 'PHYS 102 and PHYS 104', items: ['PHYS 102', 'PHYS 104'] },
        { type: 'course', name: 'PHYS 112', options: ['PHYS 112'] },
      ]},
      { type: 'all', name: 'Physics Courses', items: ['PHYS 201', 'PHYS 202', 'PHYS 231', 'PHYS 301', 'PHYS 311'] },
      { type: 'all', name: 'Undergraduate Research (2 semesters)', items: ['PHYS 491', 'PHYS 493', 'PHYS 492', 'PHYS 494'] },
    ]},
    { type: 'group', name: 'Major Concentration in Computational Physics', requirements: [
      { type: 'all', name: 'Physics Courses', items: ['PHYS 302', ['PHYS 312', 'PHYS 425'], 'PHYS 416'] },
      { type: 'all', name: 'Computation and Mathematics Courses', items: [
        'CMOR 220', ['CMOR 303', 'CMOR 302', 'MATH 354', 'MATH 355'], ['CMOR 304', 'MATH 381'], 'CMOR 422', 'COMP 140',
      ]},
      { type: 'choose', name: 'Computational Electives', count: 2, from: ['CMOR 420', 'CMOR 421', 'CMOR 423', 'CMOR 435', 'MECH 454', 'PHYS 449', 'PHYS 580'] },
    ]},
  ],
};
