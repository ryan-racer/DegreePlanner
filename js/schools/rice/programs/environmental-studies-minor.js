export default {
  id: 'environmental-studies-minor',
  name: 'Environmental Studies',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/environmental-studies/environmental-studies-minor/',
  hours: 18,
  notes: [
    'ENST 238 must be taken for at least 3 credit hours to count as an elective.',
    'Current or former BioSciences (or EEB) majors may substitute BIOS 332 for BIOS 124 as the introductory course.',
    'Students may propose additional environment-related courses to the Minor Director for the elective list.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Core Course', options: ['ENST 100'] },
      { type: 'choose', name: 'Introductory Course', count: 1, from: ['BIOS 122', 'BIOS 124', 'EEPS 101', 'EEPS 107', 'EEPS 109', 'EEPS 110', 'EEPS 111'] },
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Schools of Architecture, Business, Humanities and Arts, and Social Sciences', count: 2, from: [
        'ANTH 206', 'ANTH 210', 'ANTH 320', 'ANTH 323', 'ANTH 332', 'ANTH 348', 'ANTH 352', 'ANTH 357',
        'ANTH 377', 'ANTH 391', 'ANTH 393', 'ARCH 313', 'ARCH 322', 'ASIA 260', 'ASIA 348', 'BUSI 432',
        'ECON 213', 'ECON 437', 'ECON 480', 'ECON 485', 'ENGL 269', 'ENGL 310', 'ENGL 358', 'ENGL 368',
        'ENGL 459', 'ENST 205', 'ENST 210', 'ENST 211', 'ENST 238', 'ENST 250', 'ENST 301', 'ENST 311',
        'ENST 312', 'ENST 314', 'ENST 316', 'ENST 317', 'ENST 318', 'ENST 320', 'ENST 345', 'ENST 384',
        'ENST 415', 'ENST 422', 'ENST 445', 'ENST 446', 'FILM 324', 'FREN 433', 'FWIS 201', 'FWIS 258',
        'FWIS 260', 'GERM 281', 'HART 302', 'HART 408', 'HART 473', 'HIST 312', 'HIST 320', 'HIST 321',
        'HIST 442', 'HIST 470', 'LALX 345', 'POLI 441', 'RELI 280', 'SOCI 304', 'SOCI 367', 'SPAN 328',
        'SPAN 351',
      ]},
      { type: 'choose', name: 'Schools of Engineering and Computing and Natural Sciences', count: 2, from: [
        'BIOS 204', 'BIOS 207', 'BIOS 271', 'BIOS 280', 'BIOS 319', 'BIOS 320', 'BIOS 322', 'BIOS 323',
        'BIOS 327', 'BIOS 332', 'BIOS 336', 'BIOS 374', 'BIOS 423', 'CEVE 202', 'CEVE 302', 'CEVE 307',
        'CEVE 310', 'CEVE 314', 'CEVE 323', 'CEVE 406', 'CEVE 415', 'CEVE 421', 'CEVE 425', 'CEVE 452',
        'CHBE 366', 'CHBE 382', 'EEPS 234', 'EEPS 309', 'EEPS 321', 'EEPS 325', 'EEPS 415', 'EEPS 433',
        'EEPS 434', 'EEPS 435', 'EEPS 436', 'EEPS 437', 'EEPS 438', 'EEPS 439', 'EEPS 450', 'EEPS 457',
        'EEPS 471', 'EEPS 480', 'HEAL 372', 'HEAL 375', 'MECH 475', 'STAT 484', 'STAT 485',
      ]},
    ]},
  ],
};
