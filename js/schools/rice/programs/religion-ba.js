export default {
  id: 'religion-ba',
  name: 'Religion',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/religion/religion-ba/',
  hours: 30,
  notes: [
    'Electives should be planned with a faculty advisor so that at least 3 courses form a concentrated area of study.',
    'The Senior Project is a seminar or independent study with a required research paper, approved by the Director of Undergraduate Studies.',
    'Double majors may substitute up to 2 approved religion-related courses from other departments for RELI electives.',
  ],
  requirements: [
    { type: 'course', name: 'Core Course', options: ['RELI 101'] },
    { type: 'choose', name: 'Senior Project', count: 1, from: [
      'RELI 403', 'RELI 404', 'RELI 406', 'RELI 407', 'RELI 416', 'RELI 417', 'RELI 421', 'RELI 424', 'RELI 426', 'RELI 430', 'RELI 431',
      'RELI 444', 'RELI 449', 'RELI 458', 'RELI 470', 'RELI 472', 'RELI 476', 'RELI 481', 'RELI 488',
    ]},
    { type: 'group', name: 'Religious Traditions', requirements: [
      { type: 'choose', name: 'Judaism / Christianity / Islam / African-American Religions', count: 1, from: [
        'RELI 108', 'RELI 112', 'RELI 124', 'RELI 126', 'RELI 127', 'RELI 157', 'RELI 158', 'RELI 203', 'RELI 215', 'RELI 221', 'RELI 223',
        'RELI 243', 'RELI 270', 'RELI 271', 'RELI 282', 'RELI 294', 'RELI 301', 'RELI 304', 'RELI 343', 'RELI 348', 'RELI 356', 'RELI 357',
        'RELI 359', 'RELI 365', 'RELI 382', 'RELI 383', 'RELI 384', 'RELI 388', 'RELI 395', 'RELI 406', 'RELI 416', 'RELI 424', 'RELI 426',
        'RELI 430', 'RELI 442', 'RELI 449', 'RELI 458', 'RELI 472', 'RELI 476', 'RELI 481', 'RELI 488',
      ]},
      { type: 'choose', name: 'Indigenous African Religions / American Religions / Buddhism / Hinduism', count: 1, from: [
        'RELI 111', 'RELI 157', 'RELI 231', 'RELI 233', 'RELI 234', 'RELI 270', 'RELI 311', 'RELI 322', 'RELI 332', 'RELI 333', 'RELI 337',
        'RELI 357', 'RELI 359', 'RELI 378', 'RELI 393', 'RELI 417', 'RELI 424', 'RELI 426', 'RELI 458', 'RELI 470',
      ]},
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 6, from: [{ dept: 'RELI' }],
      note: 'Departmental (RELI) courses.' },
  ],
};
