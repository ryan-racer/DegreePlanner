export default {
  id: 'architecture-barch',
  name: 'Architecture',
  degree: 'BArch',
  kind: 'major',
  school: 'Architecture',
  url: 'https://ga.rice.edu/programs-study/departments-programs/architecture/architecture/architecture-barch/',
  hours: 62,
  notes: [
    'Post-baccalaureate BArch program (following the BA in Architecture); 62 hours total for the degree.',
    'Preceptorship: a 9-12 month internship taken as two semesters of ARCH 500 (S/U grading; must earn Satisfactory).',
    'ARCH 423 / ARCH 623 may be replaced by an ARCH course at the 300 level or above only if ARCH 423 was already completed during the first four years of study.',
    'Students at the Rice School of Architecture in Paris take one semester of ARCH 620 in place of ARCH 601 or ARCH 602.',
    'All courses must be taken in the prescribed sequence with a minimum grade of C (no Pass/Fail). Minimum major GPA of 2.00; no transfer credit.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Practice', requirements: [
        { type: 'choose', name: 'Preceptorship Program', count: 2, from: ['ARCH 500'], note: 'Two semesters of ARCH 500 (15 hours each).' },
        { type: 'course', name: 'Professionalism and Management', options: ['ARCH 423', 'ARCH 623', { dept: 'ARCH', min: 300, label: 'ARCH 300+ (only if ARCH 423 already completed)' }] },
      ]},
      { type: 'all', name: 'Design', items: ['ARCH 601', 'ARCH 602'] },
    ]},
    { type: 'hours', name: 'Elective Requirements', hours: 9, from: [{ dept: 'ARCH', min: 300 }],
      note: '9 credit hours of ARCH courses at the 300 level or above.' },
  ],
};
