export default {
  id: 'european-studies-ba',
  name: 'European Studies',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/european-studies/european-studies-ba/',
  hours: 30,
  notes: [
    'Within Elective Group B, at most 2 courses may come from any one subject code.',
    'Up to 2 European-language courses at the 300 level or above (excluding FREN 301, FREN 302, GERM 301, GERM 302) may count as electives; an honors thesis may count as 2 electives.',
    'At least 6 courses, including EURO 102 and EURO 401, must be taken at Rice.',
  ],
  constraints: [
    { type: 'atLeast', count: 5, from: [{ dept: '*', min: 300 }], among: ['1'], label: 'At least 5 of the 8 electives at the 300 level or above' },
  ],
  requirements: [
    { type: 'course', name: 'Core Requirement', options: ['EURO 102'] },
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Elective Group A', count: 3, from: [
        'CLAS 316', 'PHIL 381',
        'FREN 307', 'FREN 311', 'FREN 312', 'FREN 313', 'FREN 324', 'FREN 350', 'FREN 370', 'FREN 402', 'FREN 407', 'FREN 416', 'FREN 424', 'FREN 450', 'FREN 453',
        'GERM 307', 'GERM 309', 'GERM 322', 'GERM 324', 'GERM 326', 'GERM 333', 'GERM 334', 'GERM 340', 'GERM 345', 'GERM 352', 'GERM 401', 'GERM 420', 'GERM 430',
        'LATI 316', 'LATI 318', 'PLST 301', 'PLST 302',
      ]},
      { type: 'choose', name: 'Elective Group B', count: 4, from: [
        'ENGL 314', 'ENGL 317', 'ENGL 321', 'ENGL 323', 'ENGL 328', 'ENGL 332', 'ENGL 333', 'ENGL 338', 'ENGL 341', 'ENGL 343', 'ENGL 346', 'ENGL 356',
        'HART 340', 'HART 341', 'HART 342', 'HART 354', 'HART 358', 'HART 365', 'HART 435', 'HART 452',
        'HIST 307', 'HIST 308', 'HIST 324', 'HIST 340', 'HIST 356', 'HIST 357', 'HIST 370', 'HIST 373', 'HIST 375', 'HIST 392', 'HIST 409', 'HIST 434', 'HIST 457', 'HIST 459',
        'PHIL 362', 'PHIL 372', 'PHIL 383', 'PHIL 386',
        'RELI 363', 'RELI 384', 'RELI 406', 'RELI 449',
        'SPAN 347',
      ], note: 'At most 2 courses from any one subject code.' },
      { type: 'choose', name: 'Additional Elective (Group A or B)', count: 1, from: [
        'CLAS 316', 'PHIL 381',
        'FREN 307', 'FREN 311', 'FREN 312', 'FREN 313', 'FREN 324', 'FREN 350', 'FREN 370', 'FREN 402', 'FREN 407', 'FREN 416', 'FREN 424', 'FREN 450', 'FREN 453',
        'GERM 307', 'GERM 309', 'GERM 322', 'GERM 324', 'GERM 326', 'GERM 333', 'GERM 334', 'GERM 340', 'GERM 345', 'GERM 352', 'GERM 401', 'GERM 420', 'GERM 430',
        'LATI 316', 'LATI 318', 'PLST 301', 'PLST 302',
        'ENGL 314', 'ENGL 317', 'ENGL 321', 'ENGL 323', 'ENGL 328', 'ENGL 332', 'ENGL 333', 'ENGL 338', 'ENGL 341', 'ENGL 343', 'ENGL 346', 'ENGL 356',
        'HART 340', 'HART 341', 'HART 342', 'HART 354', 'HART 358', 'HART 365', 'HART 435', 'HART 452',
        'HIST 307', 'HIST 308', 'HIST 324', 'HIST 340', 'HIST 356', 'HIST 357', 'HIST 370', 'HIST 373', 'HIST 375', 'HIST 392', 'HIST 409', 'HIST 434', 'HIST 457', 'HIST 459',
        'PHIL 362', 'PHIL 372', 'PHIL 383', 'PHIL 386',
        'RELI 363', 'RELI 384', 'RELI 406', 'RELI 449',
        'SPAN 347',
      ]},
    ]},
    { type: 'course', name: 'Capstone Requirement', options: ['EURO 401'] },
  ],
};
