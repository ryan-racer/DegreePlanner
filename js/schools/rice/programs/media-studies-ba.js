export default {
  id: 'media-studies-ba',
  name: 'Media Studies',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/media-studies/media-studies-ba/',
  hours: 30,
  notes: [
    'ARTS 238 (special topics) counts only when the topic is related to Media Studies and is approved.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Introduction to Film Studies', options: ['MDIA 203'] },
      { type: 'course', name: 'History and Aesthetics of Film', options: ['ARTS 280', 'FILM 280', 'HART 280'] },
      { type: 'course', name: 'Introduction to Media Studies', options: ['MDIA 204'] },
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Film History and Aesthetics', count: 1, from: [
        'ENGL 286', 'ENGL 320', 'ENGL 374', 'ENGL 375', 'ENGL 398', 'FILM 180', 'FILM 218', 'FILM 280', 'FILM 336', 'FILM 373', 'FILM 383',
        'FILM 385', 'FILM 432', 'FILM 433', 'FILM 434', 'FILM 435', 'FREN 402', 'FREN 407', 'GERM 335', 'GERM 410', 'HART 336', 'HART 364',
        'HART 389', 'MDIA 201', 'MDIA 202', 'MDIA 211', 'MDIA 301', 'MDIA 332', 'SOCI 389',
      ]},
      { type: 'choose', name: 'Media and Cultural Theory', count: 1, from: [
        'ANTH 375', 'ANTH 385', 'ANTH 395', 'ANTH 428', 'ANTH 461', 'ASIA 358', 'COMP 301', 'ENGL 273', 'ENGL 290', 'ENGL 358', 'ENGL 366',
        'ENGL 382', 'ENGL 387', 'ENGL 388', 'ENST 316', 'FREN 305', 'FREN 324', 'GERM 332', 'HART 308', 'HART 311', 'LALX 330', 'LALX 350',
        'LALX 390', 'MDIA 242', 'MDIA 243', 'MDIA 251', 'MDIA 341', 'POLI 343', 'SPAN 328', 'SPAN 406',
      ]},
      { type: 'choose', name: 'Media Production and Applied Research', count: 1, from: [
        'ARTS 230', 'ARTS 238', 'ARTS 384', 'ENGL 302', 'ENGL 308', 'ENGL 388', 'FILM 284', 'FILM 287', 'FILM 324', 'FILM 327', 'FILM 328',
        'FILM 333', 'FILM 381', 'FILM 420', 'FILM 444', 'MDIA 381', 'MDIA 384', 'MDIA 401',
      ]},
      { type: 'choose', name: 'Additional Electives (any category)', count: 4, from: [
        'ENGL 286', 'ENGL 320', 'ENGL 374', 'ENGL 375', 'ENGL 398', 'FILM 180', 'FILM 218', 'FILM 280', 'FILM 336', 'FILM 373', 'FILM 383',
        'FILM 385', 'FILM 432', 'FILM 433', 'FILM 434', 'FILM 435', 'FREN 402', 'FREN 407', 'GERM 335', 'GERM 410', 'HART 336', 'HART 364',
        'HART 389', 'MDIA 201', 'MDIA 202', 'MDIA 211', 'MDIA 301', 'MDIA 332', 'SOCI 389',
        'ANTH 375', 'ANTH 385', 'ANTH 395', 'ANTH 428', 'ANTH 461', 'ASIA 358', 'COMP 301', 'ENGL 273', 'ENGL 290', 'ENGL 358', 'ENGL 366',
        'ENGL 382', 'ENGL 387', 'ENGL 388', 'ENST 316', 'FREN 305', 'FREN 324', 'GERM 332', 'HART 308', 'HART 311', 'LALX 330', 'LALX 350',
        'LALX 390', 'MDIA 242', 'MDIA 243', 'MDIA 251', 'MDIA 341', 'POLI 343', 'SPAN 328', 'SPAN 406',
        'ARTS 230', 'ARTS 238', 'ARTS 384', 'ENGL 302', 'ENGL 308', 'FILM 284', 'FILM 287', 'FILM 324', 'FILM 327', 'FILM 328',
        'FILM 333', 'FILM 381', 'FILM 420', 'FILM 444', 'MDIA 381', 'MDIA 384', 'MDIA 401',
      ]},
    ]},
    { type: 'course', name: 'Capstone', options: ['MDIA 410'] },
  ],
  constraints: [
    { type: 'atLeast', count: 6, from: [{ dept: '*', min: 300 }], label: 'At least 6 major courses at the 300 level or above' },
  ],
};
