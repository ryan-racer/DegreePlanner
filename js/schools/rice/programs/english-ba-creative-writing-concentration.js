export default {
  id: 'english-ba-creative-writing-concentration',
  name: 'English: Creative Writing Concentration',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/english/english-ba-creative-writing-concentration/',
  hours: 33,
  notes: [
    'Historical Foundations: only one of the 2 courses may be a Shakespeare course.',
    'Capstone: a 400-level creative writing course in the fall of senior year (counted among the 5 concentration courses) followed by ENGL 411 in the spring.',
    'AP credit does not count toward the major. Specific course offerings vary by semester.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'all', name: 'English Core', items: ['ENGL 200', 'ENGL 300'] },
      { type: 'group', name: 'Pre-1800 and Pre-1900 (Historical Foundations)', requirements: [
        { type: 'choose', name: 'Pre-1800', count: 1, from: [
          'ENGL 210', 'ENGL 215', 'ENGL 240', 'ENGL 254', 'ENGL 274', 'ENGL 311', 'ENGL 312', 'ENGL 314', 'ENGL 316', 'ENGL 317', 'ENGL 320',
          'ENGL 321', 'ENGL 322', 'ENGL 323', 'ENGL 328', 'ENGL 331', 'ENGL 332', 'ENGL 333', 'ENGL 340', 'ENGL 360',
        ]},
        { type: 'choose', name: 'Pre-1800 or Pre-1900', count: 1, from: [
          'ENGL 210', 'ENGL 215', 'ENGL 240', 'ENGL 254', 'ENGL 274', 'ENGL 311', 'ENGL 312', 'ENGL 314', 'ENGL 316', 'ENGL 317', 'ENGL 320',
          'ENGL 321', 'ENGL 322', 'ENGL 323', 'ENGL 328', 'ENGL 331', 'ENGL 332', 'ENGL 333', 'ENGL 340', 'ENGL 360',
          'ENGL 211', 'ENGL 250', 'ENGL 251', 'ENGL 260', 'ENGL 262', 'ENGL 337', 'ENGL 338', 'ENGL 339', 'ENGL 341', 'ENGL 342', 'ENGL 343',
          'ENGL 344', 'ENGL 361', 'ENGL 459', 'ENGL 461',
        ]},
      ]},
      { type: 'choose', name: 'Critical Race, Postcolonial, and Gender Studies (Diverse Traditions)', count: 1, from: [
        'ENGL 222', 'ENGL 230', 'ENGL 242', 'ENGL 243', 'ENGL 253', 'ENGL 263', 'ENGL 266', 'ENGL 267', 'ENGL 268', 'ENGL 271', 'ENGL 273',
        'ENGL 279', 'ENGL 281', 'ENGL 315', 'ENGL 316', 'ENGL 317', 'ENGL 342', 'ENGL 343', 'ENGL 352', 'ENGL 354', 'ENGL 359', 'ENGL 369',
        'ENGL 370', 'ENGL 371', 'ENGL 372', 'ENGL 376', 'ENGL 378', 'ENGL 379', 'ENGL 380', 'ENGL 381', 'ENGL 382', 'ENGL 383', 'ENGL 387',
        'ENGL 389', 'ENGL 393', 'ENGL 394', 'ENGL 398', 'ENGL 471',
      ]},
    ]},
    { type: 'group', name: 'Major Concentration in Creative Writing', requirements: [
      { type: 'choose', name: '400-level Elective', count: 1, from: ['ENGL 401', 'ENGL 402', 'ENGL 403', 'ENGL 404', 'ENGL 405'] },
      { type: 'choose', name: '300-level (or above) Electives', count: 3, from: [
        'ENGL 301', 'ENGL 302', 'ENGL 304', 'ENGL 305', 'ENGL 306', 'ENGL 307', 'ENGL 308', 'ENGL 309', 'ENGL 310', 'ENGL 315', 'ENGL 318',
        'ENGL 324', 'ENGL 327', 'ENGL 377', 'ENGL 401', 'ENGL 402', 'ENGL 403', 'ENGL 404', 'ENGL 405',
      ]},
      { type: 'choose', name: 'Lower-level or Additional Creative Writing Elective', count: 1, from: [
        'ENGL 113', 'ENGL 114', 'ENGL 201', 'ENGL 203', 'ENGL 204', 'ENGL 205', 'ENGL 261',
        'ENGL 301', 'ENGL 302', 'ENGL 304', 'ENGL 305', 'ENGL 306', 'ENGL 307', 'ENGL 308', 'ENGL 309', 'ENGL 310', 'ENGL 315', 'ENGL 318',
        'ENGL 324', 'ENGL 327', 'ENGL 377', 'ENGL 401', 'ENGL 402', 'ENGL 403', 'ENGL 404', 'ENGL 405',
      ]},
    ]},
    { type: 'course', name: 'Major Capstone Requirement', options: ['ENGL 411'] },
  ],
};
