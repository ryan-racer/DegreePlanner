export default {
  id: 'music-theory-bmus',
  name: 'Music Theory',
  degree: 'BMus',
  kind: 'major',
  school: 'Music',
  url: 'https://ga.rice.edu/programs-study/departments-programs/music/music/music-theory-bmus/',
  hours: 63,
  notes: [
    'Students must pass the Piano Proficiency Exam.',
    'Ensemble and piano study are repeated each semester: at least 5 semesters of ensemble and 4 semesters of MUSI 381. The senior project is 2 semesters of MUSI 449.',
    'MUSI 338 is recommended but not required.',
    'At least 14 courses (50 hours) at the 300 level or above. Minimum major GPA of 2.00.',
  ],
  requirements: [
    { type: 'all', name: 'Music Theory', items: ['MUSI 211', 'MUSI 212', 'MUSI 311', 'MUSI 312', 'MUSI 512', 'MUSI 513', 'MUSI 613'] },
    { type: 'all', name: 'Aural Skills and Performance Techniques', items: ['MUSI 231', 'MUSI 232', 'MUSI 331', 'MUSI 332'] },
    { type: 'all', name: 'Music History', items: [['MUSI 222', 'MDEM 222'], 'MUSI 321', 'MUSI 322', 'MUSI 421'] },
    { type: 'choose', name: 'Music Academic Elective', count: 1, from: [
      'MUSI 516', 'MUSI 517', 'MUSI 524', 'MUSI 525', 'MUSI 527', 'MUSI 528', 'MUSI 529', 'MUSI 530', 'MUSI 534', 'MUSI 543', 'MUSI 605', 'MUSI 606', 'MUSI 610', 'MUSI 611',
      'MUSI 614', 'MUSI 615', 'MUSI 617', 'MUSI 621', 'MUSI 623', 'MUSI 624', 'MUSI 625', 'MUSI 626', 'MUSI 627', 'MUSI 716', 'MUSI 717', 'MUSI 723',
    ]},
    { type: 'choose', name: 'Ensemble', count: 5, from: ['MUSI 335', 'MUSI 337'], note: 'Minimum of 5 semesters.' },
    { type: 'choose', name: 'Piano Study', count: 4, from: ['MUSI 381'], note: 'Minimum of 4 semesters.' },
    { type: 'choose', name: 'Senior Project', count: 2, from: ['MUSI 449'], note: 'Two semesters of MUSI 449.' },
  ],
};
