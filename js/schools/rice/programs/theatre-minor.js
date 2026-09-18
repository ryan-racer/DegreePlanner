export default {
  id: 'theatre-minor',
  name: 'Theatre',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/theatre/theatre-minor/',
  hours: 18,
  notes: [
    'THEA 331 must be taken in section 001 (Production and Design) or section 002 (Performance) to count toward the minor.',
    'Electives are advisor-directed courses relevant to theatre and dramatic arts.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Introductory Course', count: 1, from: ['THEA 100', 'THEA 101', 'THEA 103'] },
      { type: 'all', name: 'Advanced Courses', items: [['THEA 300', 'THEA 301'], ['THEA 303', 'THEA 315'], 'THEA 331'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 2, from: [
      'AAAS 300', 'ARCH 225', 'ARCH 345', 'ARCH 346', 'FILM 280', 'FILM 284', 'FILM 383', 'FILM 432',
      'FILM 433', 'HART 101', 'HART 125', 'HART 201', 'HART 202', 'HART 204', 'HART 205', 'HART 216',
      'HART 241', 'HART 263', 'HART 307', 'HART 315', 'HART 317', 'HART 336', 'HART 364', 'HART 366',
      'ASIA 213', 'ASIA 214', 'ASIA 223', 'ASIA 237', 'ASIA 330', 'ASIA 332', 'ASIA 358', 'ASIA 372',
      'ASIA 399', 'ENGL 254', 'ENGL 286', 'ENGL 302', 'ENGL 320', 'ENGL 323', 'ENGL 353', 'ENGL 373',
      'ENGL 374', 'ENGL 375', 'ENGL 388', 'ENST 311', 'ENST 316', 'ENST 422', 'HIST 218', 'HIST 244',
      'HIST 338', 'CLAS 225', 'CLAS 235', 'CLAS 302', 'FREN 337', 'FREN 402', 'FREN 407', 'GERM 280',
      'GERM 335', 'GERM 336', 'GERM 380', 'LALX 330', 'SPAN 331', 'SPAN 361', 'SPAN 382', 'MUSI 378',
      'THEA 250', 'THEA 307', 'THEA 310', 'THEA 311', 'THEA 330',
    ]},
  ],
};
