export default {
  id: 'architecture-barch-direct-entry',
  name: 'Architecture (Direct Entry Option)',
  degree: 'BArch',
  kind: 'major',
  school: 'Architecture',
  url: 'https://ga.rice.edu/programs-study/departments-programs/architecture/architecture/architecture-barch-direct-entry/',
  hours: 137,
  degreeHours: 192,
  notes: [
    'The BArch (direct entry) is a 192-hour degree: beyond the 137-hour major, 55 elective hours are required, 45 of which must be outside ARCH course offerings and 10 of which are free electives.',
    'Preceptorship: a 9-12 month internship taken as two semesters of ARCH 500 (S/U grading; must earn Satisfactory).',
    'ARCH 423 / ARCH 623 may be replaced by an ARCH course at the 300 level or above only if ARCH 423 was already completed during the first four years.',
    'Students at the Rice School of Architecture in Paris take one semester of ARCH 620 in place of ARCH 601 or ARCH 602.',
    'Second-Year Gateway Review and Fourth-Year Continuation Review are required. Required ARCH courses must follow the prescribed sequence, with a minimum grade of C in each upper-level required course. At least 19 courses (107 hours) at the 300 level or above; minimum major GPA of 2.00; no transfer credit.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'all', name: 'Design Studios', items: ['ARCH 101', 'ARCH 102', 'ARCH 201', 'ARCH 202', 'ARCH 301', 'ARCH 302', 'ARCH 401', 'ARCH 402'] },
      { type: 'all', name: 'History and Theory', items: [['ARCH 225', 'HART 225'], ['ARCH 345', 'HART 345'], 'ARCH 346', 'ARCH 352'] },
      { type: 'all', name: 'Technology', items: ['ARCH 207', 'ARCH 309', 'ARCH 314', 'ARCH 316'] },
      { type: 'course', name: 'Degree Project Seminar', options: ['ARCH 403'] },
    ]},
    { type: 'group', name: 'Preceptorship and Advanced Requirements', requirements: [
      { type: 'choose', name: 'Preceptorship Program', count: 2, from: ['ARCH 500'], note: 'Two semesters of ARCH 500 (15 hours each).' },
      { type: 'course', name: 'Practice', options: ['ARCH 423', 'ARCH 623'] },
      { type: 'all', name: 'Design', items: ['ARCH 601', 'ARCH 602'] },
    ]},
    { type: 'hours', name: 'Departmental (ARCH) Elective Requirements', hours: 9, from: [{ dept: 'ARCH', min: 300 }],
      note: '9 credit hours of ARCH courses at the 300 level or above.' },
  ],
};
