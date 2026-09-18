export default {
  id: 'astronomy-minor',
  name: 'Astronomy',
  degree: 'Minor',
  kind: 'minor',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/physics-astronomy/astronomy-minor/',
  hours: 27,
  notes: [
    'Depending on electives chosen, additional MATH, PHYS, and/or COMP prerequisites (5-13 hours) may be required; the plan of study must be approved by the minor certifier.',
    'ASTR 461 counts as an elective only when taken for at least 3 credit hours.',
    'Credit for PHYS 125, PHYS 126, PHYS 141, or PHYS 142 is not eligible for the Astronomy minor.',
    'Students without basic calculus credit may substitute more advanced MATH or CMOR coursework with department approval.',
  ],
  requirements: [
    { type: 'group', name: 'Required Prerequisites', requirements: [
      { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
      { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
      { type: 'any', name: 'Mechanics', options: [
        { type: 'all', name: 'PHYS 101 and PHYS 103', items: ['PHYS 101', 'PHYS 103'] },
        { type: 'course', name: 'PHYS 111', options: ['PHYS 111'] },
      ]},
      { type: 'any', name: 'Electricity and Magnetism', options: [
        { type: 'all', name: 'PHYS 102 and PHYS 104', items: ['PHYS 102', 'PHYS 104'] },
        { type: 'course', name: 'PHYS 112', options: ['PHYS 112'] },
      ]},
    ]},
    { type: 'choose', name: 'Core Requirement', count: 1, from: ['ASTR 101', 'ASTR 102'] },
    { type: 'choose', name: 'Elective Requirements', count: 3,
      from: ['ASTR 229', 'ASTR 230', 'ASTR 243', 'ASTR 350', 'ASTR 360', 'ASTR 408', 'ASTR 461', 'PHYS 413'] },
    { type: 'course', name: 'Seminar Requirement', options: ['ASTR 400'] },
  ],
};
