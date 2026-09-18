export default {
  id: 'women-gender-sexuality-ba',
  name: 'Study of Women, Gender, and Sexuality',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/study-women-gender-sexuality/women-gender-sexuality-ba/',
  hours: 31,
  notes: [
    'Each student\'s course of study must be approved by the SWGS Undergraduate Advisor.',
    'Special topics / independent study courses (ENGL 397, LALX 238, PHIL 470, RELI 238, SWGS 238, SWGS 327, SWGS 477, SWGS 495) count only when the topic is related to SWGS or the required field.',
    'SWGS 247 counts toward Global South only when the cities of focus are relevant to that field.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'all', name: 'Introductory Courses', items: ['SWGS 100', 'SWGS 200'] },
      { type: 'choose', name: 'Critical Race', count: 1, from: [
        'ANTH 316', 'EDUC 304', 'ENGL 397', 'FREN 308', 'FREN 337', 'FREN 340', 'FREN 413', 'FREN 414', 'HART 306', 'MDHM 315', 'SOCI 307',
        'SOCI 343', 'SOCI 357', 'SOCI 389', 'SOCI 402', 'SWGS 247', 'SWGS 327', 'SWGS 329', 'SWGS 338', 'SWGS 354', 'SWGS 370', 'SWGS 389',
        'SWGS 415', 'SWGS 466',
      ]},
      { type: 'choose', name: 'Global South', count: 1, from: [
        'ANTH 316', 'ASIA 207', 'ASIA 336', 'ASIA 381', 'FREN 337', 'FREN 340', 'FREN 414', 'HART 212', 'LALX 265', 'POLI 456', 'POLI 459',
        'SOCI 389', 'SPAN 351', 'SPAN 356', 'SPAN 361', 'SPAN 372', 'SWGS 247', 'SWGS 250', 'SWGS 360', 'SWGS 399', 'SWGS 466',
      ]},
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 4, from: [
      'ANTH 321', 'ANTH 346', 'ANTH 380', 'ANTH 381', 'ANTH 382', 'ANTH 399', 'ANTH 428', 'CLAS 207', 'CLAS 254', 'ENGL 111', 'ENGL 332',
      'ENGL 378', 'ENST 318', 'FREN 370', 'FWIS 151', 'HART 307', 'HART 337', 'HART 356', 'HART 363', 'HART 364', 'HIST 258', 'HIST 391',
      'HUMA 134', 'LALX 238', 'LING 303', 'MDHM 260', 'MDHM 320', 'MDIA 242', 'MDIA 301', 'PHIL 267', 'PHIL 470', 'POLI 339', 'POLI 379',
      'POLI 459', 'POLI 461', 'RELI 150', 'RELI 238', 'RELI 393', 'SOCI 301', 'SOCI 345', 'SOCI 351', 'SWGS 205', 'SWGS 238', 'SWGS 273',
      'SWGS 301', 'SWGS 303', 'SWGS 305', 'SWGS 306', 'SWGS 317', 'SWGS 324', 'SWGS 325', 'SWGS 327', 'SWGS 331', 'SWGS 333', 'SWGS 343',
      'SWGS 345', 'SWGS 353', 'SWGS 364', 'SWGS 372', 'SWGS 380', 'SWGS 385', 'SWGS 424', 'SWGS 465', 'SWGS 477', 'SWGS 495', 'SWGS 498',
      'ANTH 316', 'EDUC 304', 'ENGL 397', 'FREN 308', 'FREN 337', 'FREN 340', 'FREN 413', 'FREN 414', 'HART 306', 'MDHM 315', 'SOCI 307',
      'SOCI 343', 'SOCI 357', 'SOCI 389', 'SOCI 402', 'SWGS 247', 'SWGS 329', 'SWGS 338', 'SWGS 354', 'SWGS 370', 'SWGS 389', 'SWGS 415', 'SWGS 466',
      'ASIA 207', 'ASIA 336', 'ASIA 381', 'HART 212', 'LALX 265', 'POLI 456', 'SPAN 351', 'SPAN 356', 'SPAN 361', 'SPAN 372', 'SWGS 250',
      'SWGS 360', 'SWGS 399',
    ], note: 'Department approved electives or additional Critical Race / Global South courses.' },
    { type: 'all', name: 'Capstone', items: ['SWGS 494', 'SWGS 496', 'SWGS 497'] },
  ],
};
