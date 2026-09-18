export default {
  id: 'music-history-bmus',
  name: 'Music History',
  degree: 'BMus',
  kind: 'major',
  school: 'Music',
  url: 'https://ga.rice.edu/programs-study/departments-programs/music/music/music-history-bmus/',
  hours: 76,
  notes: [
    'Students must pass the Piano Proficiency Exam.',
    'Individual study and ensemble are repeated each semester: at least 6 semesters of concentration instrument/voice and 5 semesters of ensemble. The senior thesis is 2 semesters of MUSI 449.',
    'Foreign language: one year (course numbers 141 and 142) in any language, or equivalency by university exam; German is highly recommended.',
    'Minimum major GPA of 2.00.',
  ],
  requirements: [
    { type: 'group', name: 'Music Theory', requirements: [
      { type: 'all', name: 'Theory Courses', items: ['MUSI 211', 'MUSI 212', 'MUSI 311', 'MUSI 312'] },
      { type: 'choose', name: 'Theory Elective', count: 1, from: ['MUSI 315', 'MUSI 378', 'ASIA 378', 'MUSI 403', 'MUSI 404', 'MUSI 405', 'MUSI 416', 'MUSI 417', 'MUSI 512', 'MUSI 513', 'MUSI 514', 'MUSI 517', 'MUSI 613', 'MUSI 617'] },
    ]},
    { type: 'all', name: 'Aural Skills and Performance Techniques', items: ['MUSI 231', 'MUSI 232', 'MUSI 331', 'MUSI 332'] },
    { type: 'all', name: 'Music History', items: [['MUSI 222', 'MDEM 222'], 'MUSI 321', 'MUSI 322', 'MUSI 421'] },
    { type: 'group', name: 'Individual and Ensemble Study', requirements: [
      { type: 'choose', name: 'Concentration Instrument or Voice', count: 6, from: [
        'MUSI 351', 'MUSI 353', 'MUSI 355', 'MUSI 357', 'MUSI 361', 'MUSI 363', 'MUSI 365', 'MUSI 367', 'MUSI 371', 'MUSI 373', 'MUSI 381', 'MUSI 383', 'MUSI 387', 'MUSI 391', 'MUSI 393', 'MUSI 395', 'MUSI 397',
      ], note: 'Minimum of 6 semesters.' },
      { type: 'choose', name: 'Ensemble', count: 5, from: ['MUSI 335', 'MUSI 337'], note: 'Minimum of 5 semesters.' },
    ]},
    { type: 'choose', name: 'Foreign Language', count: 2, from: [
      { dept: ['ARAB', 'CHIN', 'FREN', 'GERM', 'GREK', 'HEBR', 'HIND', 'ITAL', 'JAPA', 'KORE', 'LATN', 'PORT', 'RUSS', 'SPAN', 'SWAH', 'TURK', 'VIET'], min: 141, max: 142, label: 'Language 141 and 142' },
    ], note: 'One year of a foreign language (141 and 142).' },
    { type: 'group', name: 'Advanced Musicology Coursework', requirements: [
      { type: 'choose', name: 'Advanced Musicology Courses', count: 3, from: ['MUSI 524', 'MUSI 525', 'MUSI 527', 'MUSI 528', 'MUSI 529', 'MUSI 530', 'MUSI 534', 'MUSI 543', 'MUSI 621', 'MUSI 623', 'MUSI 624', 'MUSI 625', 'MUSI 626', 'MUSI 627', 'MUSI 716', 'MUSI 717'] },
      { type: 'choose', name: 'Additional Musicology or Advanced Theory Course', count: 1, from: [
        'MUSI 524', 'MUSI 525', 'MUSI 527', 'MUSI 528', 'MUSI 529', 'MUSI 530', 'MUSI 534', 'MUSI 543', 'MUSI 621', 'MUSI 623', 'MUSI 624', 'MUSI 625', 'MUSI 626', 'MUSI 627', 'MUSI 716', 'MUSI 717',
        'MUSI 512', 'MUSI 513', 'MUSI 514', 'MUSI 516', 'MUSI 517', 'MUSI 605', 'MUSI 606', 'MUSI 610', 'MUSI 611', 'MUSI 613', 'MUSI 614', 'MUSI 615', 'MUSI 617', 'MUSI 711', 'MUSI 712', 'MUSI 713', 'MUSI 723',
      ]},
    ]},
    { type: 'choose', name: 'Senior Thesis', count: 2, from: ['MUSI 449'], note: 'Two semesters of MUSI 449.' },
  ],
  constraints: [
    { type: 'atLeast', count: 16, from: [{ dept: '*', min: 300 }], label: 'At least 16 courses (57 hours) at the 300 level or above' },
  ],
};
