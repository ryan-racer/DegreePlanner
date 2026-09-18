export default {
  id: 'mathematics-bs',
  name: 'Mathematics',
  degree: 'BS',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/mathematics/mathematics-bs/',
  hours: 42,
  notes: [
    'A higher-level MATH course (200+, at least 3 hours) may substitute for MATH 101 and/or MATH 102.',
    'MATH 322 and MATH 370 may each fulfill only one requirement.',
    'A minimum of 11 courses (33 credit hours) at the 300 level or above is required overall, counting upper-level core courses; the elective slot below shows the additional hours beyond the 21 upper-level hours guaranteed by the core.',
    'At most 3 credit hours from MATH 479 and MATH 490-499 count toward electives; each course number may count only once.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
      { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
      { type: 'choose', name: 'Differential Equations', count: 1, from: ['MATH 211', 'MATH 220', 'MATH 381', 'MATH 423'] },
      { type: 'any', name: 'Multivariable Calculus', options: [
        { type: 'course', name: 'Multivariable Calculus', options: ['MATH 212', 'MATH 232', 'MATH 322', 'MATH 370'] },
        { type: 'all', name: 'MATH 221 and MATH 222', items: ['MATH 221', 'MATH 222'] },
      ]},
      { type: 'choose', name: 'Linear Algebra', count: 1, from: ['MATH 221', 'MATH 354', 'MATH 355'] },
      { type: 'choose', name: 'Real Analysis', count: 2, from: ['MATH 321', 'MATH 322', 'MATH 331', 'MATH 425'] },
      { type: 'choose', name: 'Algebra', count: 2, from: ['MATH 356', 'MATH 357', 'MATH 463'] },
      { type: 'choose', name: 'Geometry and Manifolds', count: 1, from: ['MATH 370', 'MATH 401', 'MATH 402', 'MATH 451', 'MATH 452'] },
      { type: 'course', name: 'Complex Analysis', options: ['MATH 382', 'MATH 427'] },
      { type: 'choose', name: 'Topology', count: 1, from: ['MATH 443', 'MATH 444', 'MATH 445'] },
    ]},
    { type: 'hours', name: 'Elective Requirements', hours: 12, from: [{ dept: 'MATH', min: 300 }],
      note: 'Additional MATH courses at the 300 level or above (33 upper-level hours total including core).' },
  ],
};
