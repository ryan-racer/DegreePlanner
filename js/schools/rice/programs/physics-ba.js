export default {
  id: 'physics-ba',
  name: 'Physics',
  degree: 'BA',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/physics-astronomy/physics-ba/',
  hours: 45,
  notes: [
    'Credit for PHYS 125, PHYS 126, PHYS 141, or PHYS 142 is not eligible for the Physics major.',
    'The 6 additional upper-level hours may include PHYS 332 and PHYS 461 but not PHYS 491-494.',
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
      { type: 'all', name: 'Physics Courses', items: ['PHYS 201', 'PHYS 202', 'PHYS 231', 'PHYS 311'] },
      { type: 'choose', name: 'Intermediate Physics', count: 2, from: ['PHYS 301', 'PHYS 302', 'PHYS 312', 'PHYS 355', 'PHYS 411', 'PHYS 416', 'PHYS 425', 'PHYS 480'] },
      { type: 'hours', name: 'Upper-Level PHYS/ASTR Electives', hours: 6,
        from: [{ dept: ['PHYS', 'ASTR'], min: 300, exclude: ['PHYS 491', 'PHYS 492', 'PHYS 493', 'PHYS 494'] }] },
      { type: 'choose', name: 'Computational / Mathematics Course', count: 1,
        from: ['CMOR 220', { dept: 'CMOR', min: 300 }, { dept: 'MATH', min: 300 }] },
    ]},
  ],
};
