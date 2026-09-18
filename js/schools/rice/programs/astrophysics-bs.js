export default {
  id: 'astrophysics-bs',
  name: 'Astrophysics',
  degree: 'BS',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/physics-astronomy/astrophysics-bs/',
  hours: 70,
  notes: [
    'ASTR 400 must be taken for 2 semesters, concurrently with PHYS 491/493 and PHYS 492/494.',
    'PHYS 491 & PHYS 493 and PHYS 492 & PHYS 494 must each be taken concurrently.',
    'Credit for PHYS 125, PHYS 126, PHYS 141, or PHYS 142 is not eligible for the Astrophysics major.',
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
      { type: 'all', name: 'Physics Courses', items: ['PHYS 201', 'PHYS 202', 'PHYS 231', 'PHYS 301', 'PHYS 302', 'PHYS 311', 'PHYS 425'] },
      { type: 'all', name: 'Undergraduate Research (2 semesters)', items: ['PHYS 491', 'PHYS 493', 'PHYS 492', 'PHYS 494'] },
      { type: 'all', name: 'Astronomy Courses', items: ['ASTR 229', 'ASTR 230', 'ASTR 350', 'ASTR 360', 'ASTR 400'] },
      { type: 'choose', name: 'Advanced Electives', count: 3,
        from: ['ASTR 408', 'ASTR 451', 'ASTR 452', 'ASTR 470', 'PHYS 312', 'PHYS 413', 'PHYS 480'] },
    ]},
  ],
};
