export default {
  id: 'english-minor',
  name: 'English',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/english/english-minor/',
  hours: 18,
  notes: [
    'At least 3 of the 6 courses (9 credit hours) must be at the 300 level or above.',
    'Additional Historical Foundations or Diverse Traditions courses may count as electives, but no course counts toward both.',
    'Up to 1 elective (3 credit hours) may be from outside ENGL with advisor approval.',
  ],
  constraints: [
    { type: 'atLeast', count: 3, from: [{ dept: '*', min: 300 }], label: 'At least 3 courses at the 300 level or above' },
  ],
  requirements: [
    { type: 'course', name: 'Core Requirement', options: ['ENGL 200'] },
    { type: 'choose', name: 'Historical Foundations', count: 1, from: [
      'ENGL 210', 'ENGL 211', 'ENGL 215', 'ENGL 240', 'ENGL 250', 'ENGL 251', 'ENGL 254', 'ENGL 260',
      'ENGL 262', 'ENGL 263', 'ENGL 266', 'ENGL 274', 'ENGL 311', 'ENGL 312', 'ENGL 314', 'ENGL 316',
      'ENGL 317', 'ENGL 320', 'ENGL 321', 'ENGL 323', 'ENGL 328', 'ENGL 331', 'ENGL 332', 'ENGL 333',
      'ENGL 337', 'ENGL 338', 'ENGL 339', 'ENGL 340', 'ENGL 342', 'ENGL 343', 'ENGL 344', 'ENGL 360',
      'ENGL 361', 'ENGL 459', 'ENGL 461',
    ]},
    { type: 'choose', name: 'Diverse Traditions', count: 1, from: [
      'ENGL 222', 'ENGL 230', 'ENGL 242', 'ENGL 243', 'ENGL 253', 'ENGL 263', 'ENGL 266', 'ENGL 267',
      'ENGL 268', 'ENGL 271', 'ENGL 273', 'ENGL 279', 'ENGL 281', 'ENGL 315', 'ENGL 316', 'ENGL 317',
      'ENGL 342', 'ENGL 343', 'ENGL 352', 'ENGL 354', 'ENGL 359', 'ENGL 369', 'ENGL 370', 'ENGL 371',
      'ENGL 372', 'ENGL 376', 'ENGL 378', 'ENGL 379', 'ENGL 380', 'ENGL 381', 'ENGL 382', 'ENGL 383',
      'ENGL 387', 'ENGL 389', 'ENGL 393', 'ENGL 394', 'ENGL 398', 'ENGL 471',
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 3, from: [{ dept: 'ENGL', exclude: ['ENGL 200'] }], note: 'Departmental (ENGL) course offerings.' },
  ],
};
