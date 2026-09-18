export default {
  id: 'architecture-ba',
  name: 'Architecture',
  degree: 'BA',
  kind: 'major',
  school: 'Architecture',
  url: 'https://ga.rice.edu/programs-study/departments-programs/architecture/architecture/architecture-ba/',
  hours: 75,
  notes: [
    'The BA in Architecture is a 130-hour degree: beyond the 75-hour major, 55 elective hours are required, 45 of which must be outside ARCH course offerings and 10 of which are free electives.',
    'Required ARCH courses must be taken in the sequence and semester prescribed by the School of Architecture.',
    'At least 11 courses (45 hours) at the 300 level or above. Minimum major GPA of 2.00. No study-abroad or transfer credit may count toward the major.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'all', name: 'Design Studios', items: ['ARCH 101', 'ARCH 102', 'ARCH 201', 'ARCH 202', 'ARCH 301', 'ARCH 302', 'ARCH 401', 'ARCH 402'] },
      { type: 'all', name: 'History and Theory', items: [['ARCH 225', 'HART 225'], ['ARCH 345', 'HART 345'], 'ARCH 346', 'ARCH 352'] },
      { type: 'all', name: 'Technology', items: ['ARCH 207', 'ARCH 309', 'ARCH 314', 'ARCH 316'] },
      { type: 'course', name: 'Degree Project Seminar', options: ['ARCH 403'] },
    ]},
  ],
};
