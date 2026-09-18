export default {
  id: 'politics-law-social-thought-minor',
  name: 'Politics, Law, and Social Thought',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/politics-law-social-thought/politics-law-social-thought-minor/',
  hours: 18,
  notes: [
    'No more than 2 elective courses (6 credit hours) may share the same subject code; this limit does not apply to PLST courses.',
    'At most 3 credit hours of independent study may count toward the electives.',
    'An extra course from the Core Requirement list may count toward the electives.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Politics, Law and Ethics', options: ['PLST 201'] },
      { type: 'choose', name: 'Political Thought', count: 1, from: [
        'HIST 373', 'HIST 392', 'LALX 378', 'PHIL 371', 'PLST 301', 'PLST 302', 'PLST 316', 'PLST 375',
        'POLI 321',
      ]},
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 4, from: [
      'AAAS 248', 'ANTH 309', 'ANTH 317', 'ANTH 326', 'ANTH 340', 'ANTH 351', 'ANTH 372', 'ANTH 429',
      'ANTH 430', 'HART 326', 'HART 389', 'ASIA 233', 'ASIA 377', 'ENST 406', 'HIST 237', 'HIST 305',
      'HIST 332', 'HIST 340', 'HIST 359', 'HIST 373', 'HIST 387', 'HIST 388', 'HIST 392', 'HIST 396',
      'HIST 405', 'HIST 412', 'HIST 423', 'HIST 426', 'HIST 449', 'HIST 455', 'HIST 457', 'HUMA 122',
      'HUMA 315', 'LING 331', 'MDIA 341', 'CLAS 204', 'FREN 324', 'GERM 333', 'GERM 334', 'LALX 378',
      'PHIL 269', 'PHIL 281', 'PHIL 283', 'PHIL 360', 'PHIL 362', 'PHIL 370', 'PHIL 372', 'PHIL 373',
      'PHIL 386', 'POLI 316', 'POLI 321', 'POLI 323', 'POLI 325', 'POLI 326', 'POLI 339', 'POLI 341',
      'POLI 371', 'POLI 457', 'PLST 201', 'PLST 202', 'PLST 301', 'PLST 302', 'PLST 305', 'PLST 306',
      'PLST 308', 'PLST 309', 'PLST 310', 'PLST 315', 'PLST 316', 'PLST 330', 'PLST 331', 'PLST 332',
      'PLST 375', 'PLST 401', 'PLST 402', 'SOCI 325', 'SOCI 358', 'SOCI 380', 'SOCI 433', 'PHIL 371',
    ]},
  ],
};
