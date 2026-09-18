export default {
  id: 'english-ba',
  name: 'English',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/english/english-ba/',
  hours: 33,
  notes: [
    'Historical Foundations: only one of the 3 courses may be a Shakespeare course.',
    'One Core course (Historical Foundations or Diverse Traditions) may also count toward the area of specialization, but the major must still total at least 11 courses.',
    'AP credit does not count toward the major. Specific course offerings vary by semester.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'all', name: 'English Core', items: ['ENGL 200', 'ENGL 300'] },
      { type: 'group', name: 'Pre-1800 and Pre-1900 (Historical Foundations)', requirements: [
        { type: 'choose', name: 'Pre-1800', count: 2, from: [
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
    { type: 'any', name: 'Area of Specialization', options: [
      { type: 'group', name: 'Culture and Social Change', requirements: [
        { type: 'choose', name: 'Culture and Social Change Courses', count: 3, from: [
          'ENGL 222', 'ENGL 230', 'ENGL 249', 'ENGL 250', 'ENGL 252', 'ENGL 253', 'ENGL 260', 'ENGL 263', 'ENGL 266', 'ENGL 267', 'ENGL 268',
          'ENGL 269', 'ENGL 270', 'ENGL 271', 'ENGL 273', 'ENGL 279', 'ENGL 290', 'ENGL 322', 'ENGL 337', 'ENGL 339', 'ENGL 341', 'ENGL 342',
          'ENGL 343', 'ENGL 344', 'ENGL 346', 'ENGL 352', 'ENGL 354', 'ENGL 358', 'ENGL 359', 'ENGL 360', 'ENGL 361', 'ENGL 363', 'ENGL 365',
          'ENGL 366', 'ENGL 368', 'ENGL 369', 'ENGL 370', 'ENGL 371', 'ENGL 372', 'ENGL 373', 'ENGL 376', 'ENGL 378', 'ENGL 379', 'ENGL 380',
          'ENGL 381', 'ENGL 382', 'ENGL 383', 'ENGL 387', 'ENGL 389', 'ENGL 392', 'ENGL 393', 'ENGL 394', 'ENGL 397', 'ENGL 398', 'ENGL 466', 'ENGL 471',
        ]},
      ]},
      { type: 'group', name: 'Literature and Literary History', requirements: [
        { type: 'choose', name: 'Literature and Literary History Courses', count: 3, from: [
          'ENGL 204', 'ENGL 210', 'ENGL 211', 'ENGL 215', 'ENGL 222', 'ENGL 230', 'ENGL 240', 'ENGL 250', 'ENGL 251', 'ENGL 252', 'ENGL 254',
          'ENGL 260', 'ENGL 267', 'ENGL 268', 'ENGL 270', 'ENGL 274', 'ENGL 279', 'ENGL 311', 'ENGL 312', 'ENGL 314', 'ENGL 316', 'ENGL 317',
          'ENGL 320', 'ENGL 321', 'ENGL 322', 'ENGL 323', 'ENGL 325', 'ENGL 328', 'ENGL 331', 'ENGL 332', 'ENGL 333', 'ENGL 337', 'ENGL 338',
          'ENGL 339', 'ENGL 340', 'ENGL 341', 'ENGL 342', 'ENGL 343', 'ENGL 344', 'ENGL 346', 'ENGL 352', 'ENGL 353', 'ENGL 354', 'ENGL 356',
          'ENGL 359', 'ENGL 360', 'ENGL 361', 'ENGL 362', 'ENGL 363', 'ENGL 365', 'ENGL 366', 'ENGL 370', 'ENGL 371', 'ENGL 372', 'ENGL 375',
          'ENGL 376', 'ENGL 379', 'ENGL 380', 'ENGL 381', 'ENGL 382', 'ENGL 392', 'ENGL 393', 'ENGL 394', 'ENGL 397', 'ENGL 461', 'ENGL 466', 'ENGL 484',
        ]},
      ]},
      { type: 'group', name: 'Science, Medicine, and the Environment', requirements: [
        { type: 'choose', name: 'Science, Medicine, and the Environment Courses', count: 3, from: [
          'ENGL 261', 'ENGL 269', 'ENGL 272', 'ENGL 273', 'ENGL 310', 'ENGL 312', 'ENGL 328', 'ENGL 331', 'ENGL 368', 'ENGL 369', 'ENGL 378',
          'ENGL 386', 'ENGL 395', 'ENGL 459', 'MDHM 359',
        ]},
      ]},
      { type: 'group', name: 'Visual Culture and Comparative Media', requirements: [
        { type: 'choose', name: 'Visual Culture and Comparative Media Courses', count: 3, from: [
          'ENGL 242', 'ENGL 243', 'ENGL 249', 'ENGL 253', 'ENGL 262', 'ENGL 263', 'ENGL 266', 'ENGL 272', 'ENGL 273', 'ENGL 281', 'ENGL 286',
          'ENGL 302', 'ENGL 308', 'ENGL 320', 'ENGL 327', 'ENGL 353', 'ENGL 373', 'ENGL 374', 'ENGL 375', 'ENGL 377', 'ENGL 385', 'ENGL 386',
          'ENGL 388', 'ENGL 390', 'ENGL 398',
        ]},
      ]},
    ]},
    { type: 'all', name: 'Major Capstone Requirement', items: ['ENGL 410', 'ENGL 411'] },
  ],
};
