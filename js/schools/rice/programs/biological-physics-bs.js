export default {
  id: 'biological-physics-bs',
  name: 'Physics (Biological Physics Concentration)',
  degree: 'BS',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/physics-astronomy/biological-physics-bs/',
  hours: 75,
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
    { type: 'group', name: 'Major Concentration in Biological Physics', requirements: [
      { type: 'all', name: 'Physics Courses', items: ['PHYS 302', 'PHYS 312', 'PHYS 355', 'PHYS 425'] },
      { type: 'all', name: 'Biosciences Courses', items: [['BIOS 201', 'BIOS 101'], 'BIOS 211', ['BIOS 301', 'BIOS 341']] },
      { type: 'all', name: 'Chemistry Courses', items: [
        ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114'], 'CHEM 211', 'CHEM 213',
      ]},
      { type: 'course', name: 'Partial Differential Equations', options: ['MATH 381', 'CMOR 304'] },
    ]},
  ],
};
