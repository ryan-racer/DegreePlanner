export default {
  id: 'composition-bmus',
  name: 'Composition',
  degree: 'BMus',
  kind: 'major',
  school: 'Music',
  url: 'https://ga.rice.edu/programs-study/departments-programs/music/music/composition-bmus/',
  hours: 94,
  notes: [
    'Students must pass the Piano Proficiency Exam; enroll in MUSI 281 until it is passed, then MUSI 381, for a minimum of 8 semesters of piano study.',
    'Composition study (MUSI 401 and MUSI 303) and ensemble are repeated each semester: 8 semesters of MUSI 401 and MUSI 303, at least 5 semesters of ensemble.',
    'At least 14 courses (65 hours) at the 300 level or above. Minimum major GPA of 2.00.',
  ],
  requirements: [
    { type: 'group', name: 'Music Theory', requirements: [
      { type: 'all', name: 'Theory Courses', items: ['MUSI 211', 'MUSI 212', 'MUSI 311', 'MUSI 312', ['MUSI 403', 'MUSI 404'], 'MUSI 416'] },
      { type: 'choose', name: 'Advanced Theory', count: 1, from: ['MUSI 512', 'MUSI 513', 'MUSI 613'] },
    ]},
    { type: 'all', name: 'Aural Skills and Performance Techniques', items: ['MUSI 231', 'MUSI 232', 'MUSI 331', 'MUSI 332'] },
    { type: 'all', name: 'Music History', items: [['MUSI 222', 'MDEM 222'], 'MUSI 321', 'MUSI 322', 'MUSI 421'] },
    { type: 'group', name: 'Composition Study', requirements: [
      { type: 'choose', name: 'Composition for Majors', count: 8, from: ['MUSI 401'], note: 'Minimum of 8 semesters.' },
      { type: 'choose', name: 'Undergraduate Composition Seminar', count: 8, from: ['MUSI 303'], note: 'Minimum of 8 semesters.' },
    ]},
    { type: 'choose', name: 'Piano Study', count: 8, from: ['MUSI 281', 'MUSI 381'], note: 'Minimum of 8 semesters (16 hours).' },
    { type: 'choose', name: 'Ensemble', count: 5, from: ['MUSI 335', 'MUSI 337'], note: 'Minimum of 5 semesters.' },
    { type: 'course', name: 'Senior Recital', options: ['MUSI 441'] },
  ],
};
