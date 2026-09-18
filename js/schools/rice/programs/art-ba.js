export default {
  id: 'art-ba',
  name: 'Art',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/art/art-ba/',
  hours: 39,
  notes: [
    'Senior Studio option: ARTS 499 is taken in both fall and spring of senior year (6 credit hours total), and ARTS 387 must be one of the 3 Studio Core courses (spring of junior year).',
    'Senior Seminar option: ARTS 430 plus 1 Department Approved Studio Course in senior year.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Introductory Requirements', count: 4, from: [
        'ARTS 103', 'ARTS 165', 'ARTS 160', 'ARTS 225', 'ARTS 230', 'ARTS 235', 'ARTS 301', 'ARTS 311', 'ARTS 314', 'ARTS 320',
        'FILM 287', 'FILM 327', 'FILM 328', 'FOTO 205', 'FOTO 210', 'FOTO 220',
      ]},
      { type: 'choose', name: 'Studio Core Requirements', count: 3, from: [
        'ARTS 323', 'ARTS 326', 'ARTS 366', 'ARTS 387', 'ARTS 401', 'FILM 420', 'FILM 444', 'FILM 383', 'FILM 432', 'FILM 433', 'FILM 434',
        'FOTO 310', 'FOTO 383', 'FOTO 385',
      ]},
      { type: 'course', name: 'Critical Studies for Studio Practice', options: ['ARTS 388'] },
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Art History Elective', count: 1, from: [{ dept: 'HART', min: 101 }] },
      { type: 'choose', name: 'Studio Electives', count: 2, from: [{ dept: ['ARTS', 'FILM', 'FOTO'], min: 160 }] },
    ]},
    { type: 'any', name: 'Capstone Requirement: Senior Studio or Senior Seminar', options: [
      { type: 'group', name: 'Senior Studio', requirements: [
        { type: 'course', name: 'Senior Studio (2 semesters)', options: ['ARTS 499'], note: 'Taken in both fall and spring semesters of senior year.' },
      ]},
      { type: 'group', name: 'Senior Seminar', requirements: [
        { type: 'course', name: 'Arts Research and Practice', options: ['ARTS 430'] },
        { type: 'choose', name: 'Department Approved Studio Course', count: 1, from: [
          'ARTS 323', 'ARTS 366', 'ARTS 401', 'FILM 420', 'FILM 444', 'FOTO 310', 'FOTO 383', 'FOTO 385',
        ]},
      ]},
    ]},
  ],
};
