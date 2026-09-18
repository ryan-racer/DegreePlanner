export default {
  id: 'architectural-studies-ba',
  name: 'Architectural Studies',
  degree: 'BA',
  kind: 'major',
  school: 'Architecture',
  url: 'https://ga.rice.edu/programs-study/departments-programs/architecture/architecture/architectural-studies-ba/',
  hours: 48,
  notes: [
    'At least 2 courses (6 hours) of the major must be at the 300 level or above. Minimum major GPA of 2.00.',
    'No study-abroad or transfer credit may count toward the major.',
    'Enrollment is restricted to students admitted to the architecture program who have completed the first two years of required courses; cannot be combined with the Architecture major or the BArch (direct entry).',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'all', name: 'Design Studios', items: ['ARCH 101', 'ARCH 102', 'ARCH 201', 'ARCH 202'] },
      { type: 'all', name: 'History and Theory', items: [['ARCH 225', 'HART 225'], ['ARCH 345', 'HART 345']] },
      { type: 'all', name: 'Technology', items: ['ARCH 207', 'ARCH 309'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 4, from: [{ dept: 'ARCH' }],
      note: '4 elective courses from departmental (ARCH) course offerings.' },
  ],
};
