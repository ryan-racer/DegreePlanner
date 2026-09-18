export default {
  id: 'mathematics-ba',
  name: 'Mathematics',
  degree: 'BA',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/mathematics/mathematics-ba/',
  hours: 36,
  notes: [
    'A higher-level MATH course (200+, at least 3 hours) may substitute for MATH 101 and/or MATH 102.',
    'MATH 221 satisfies the differential equations slot only when paired with MATH 222.',
    'Each course number may count only once.',
    'Double majors may substitute approved mathematics-related courses for up to 3 of the 8 electives.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
      { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
      { type: 'course', name: 'Differential Equations', options: ['MATH 211', 'MATH 220', 'MATH 221', 'MATH 354', 'MATH 355', 'MATH 381', 'MATH 423'] },
      { type: 'course', name: 'Multivariable Calculus', options: ['MATH 212', 'MATH 222', 'MATH 232', 'MATH 322', 'MATH 370'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 8, from: [{ dept: 'MATH', min: 300 }],
      note: 'MATH courses at the 300 level or above.' },
  ],
  constraints: [
    { type: 'atMost', hours: 3, from: ['MATH 479', { dept: 'MATH', min: 490, max: 499 }], label: 'At most 3 credit hours from MATH 479 and MATH 490-499' },
  ],
};
