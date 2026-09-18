export default {
  id: 'cinema-media-studies-minor',
  name: 'Cinema and Media Studies',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/media-studies/cinema-media-studies-minor/',
  hours: 18,
  notes: [
    'Excluding Core Requirements, no more than 2 elective courses (6 credit hours) may share the same subject code.',
    'ENGL 374 is a variable-topics course and counts only when the topic is approved by the Program Director.',
  ],
  requirements: [
    { type: 'choose', name: 'Core Requirements', count: 2, from: ['FILM 280', 'MDIA 201', 'MDIA 202', 'MDIA 203', 'MDIA 204'] },
    { type: 'choose', name: 'Elective Requirements', count: 4,
      atLeast: [{ count: 2, from: [{ dept: '*', min: 300 }], label: 'Elective at the 300 level or above (at least 2 of the 4)' }],
      from: [
      'ENGL 273', 'ENGL 286', 'ENGL 320', 'ENGL 374', 'ENGL 375', 'ENGL 398', 'FILM 180', 'FILM 218',
      'FILM 284', 'FILM 336', 'FILM 373', 'FILM 381', 'FILM 383', 'FILM 385', 'FILM 432', 'FILM 433',
      'FILM 434', 'FILM 435', 'FREN 305', 'FREN 402', 'FREN 407', 'GERM 335', 'GERM 410', 'HART 364',
      'HART 389', 'LALX 330', 'MDIA 211', 'MDIA 242', 'MDIA 243', 'MDIA 251', 'MDIA 301', 'MDIA 332',
      'MDIA 341', 'MDIA 381', 'MDIA 384', 'MDIA 401', 'MDHM 397', 'SOCI 389', 'SPAN 406',
    ]},
  ],
};
