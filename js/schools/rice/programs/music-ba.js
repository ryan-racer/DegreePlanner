export default {
  id: 'music-ba',
  name: 'Music',
  degree: 'BA',
  kind: 'major',
  school: 'Music',
  url: 'https://ga.rice.edu/programs-study/departments-programs/music/music/music-ba/',
  hours: 43,
  notes: [
    'Individual instrumental/vocal study and ensemble are repeated each semester: at least 4 semesters of each.',
    'Continuing private lessons beyond the required 4 semesters requires permission from the dean of the Shepherd School of Music.',
    'Minimum major GPA of 2.00.',
  ],
  requirements: [
    { type: 'group', name: 'Music Theory', requirements: [
      { type: 'all', name: 'Theory Courses', items: ['MUSI 211', 'MUSI 212', 'MUSI 311', 'MUSI 312'] },
      { type: 'choose', name: 'Theory Elective', count: 1, from: ['MUSI 315', 'MUSI 378', 'ASIA 378', 'MUSI 403', 'MUSI 404', 'MUSI 405', 'MUSI 416', 'MUSI 417', 'MUSI 512', 'MUSI 513', 'MUSI 514', 'MUSI 517', 'MUSI 613', 'MUSI 617'] },
    ]},
    { type: 'all', name: 'Aural Skills and Performance Techniques', items: ['MUSI 231', 'MUSI 232'] },
    { type: 'all', name: 'Music History', items: [['MUSI 222', 'MDEM 222'], 'MUSI 321', 'MUSI 322', 'MUSI 421'] },
    { type: 'group', name: 'Individual and Ensemble Study', requirements: [
      { type: 'choose', name: 'Individual Instrumental or Vocal Study', count: 4, from: [
        'MUSI 351', 'MUSI 353', 'MUSI 355', 'MUSI 357', 'MUSI 361', 'MUSI 363', 'MUSI 365', 'MUSI 367', 'MUSI 371', 'MUSI 373', 'MUSI 381', 'MUSI 383', 'MUSI 387', 'MUSI 391', 'MUSI 393', 'MUSI 395', 'MUSI 397',
        'MUSI 451', 'MUSI 453', 'MUSI 455', 'MUSI 457', 'MUSI 461', 'MUSI 463', 'MUSI 465', 'MUSI 467', 'MUSI 471', 'MUSI 473', 'MUSI 481', 'MUSI 483', 'MUSI 487', 'MUSI 491', 'MUSI 493', 'MUSI 495', 'MUSI 497',
      ], note: 'Minimum of 4 semesters of 300- or 400-level individual study.' },
      { type: 'choose', name: 'Ensemble', count: 4, from: ['MUSI 335', 'MUSI 337'], note: 'Minimum of 4 semesters.' },
    ]},
  ],
  constraints: [
    { type: 'atLeast', count: 14, from: [{ dept: '*', min: 300 }], label: 'At least 14 courses (30 hours) at the 300 level or above' },
  ],
};
