export default {
  id: 'philosophy-ba',
  name: 'Philosophy',
  degree: 'BA',
  kind: 'major',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/philosophy/philosophy-ba/',
  hours: 30,
  notes: [
    'PHIL 498 and PHIL 499 (senior thesis / departmental honors) are in addition to major requirements and do not fulfill Elective Requirements.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Logic', options: ['PHIL 210', 'PHIL 310'] },
      { type: 'course', name: 'History of Philosophy I', options: ['PHIL 281'] },
      { type: 'course', name: 'History of Philosophy II', options: ['PHIL 283'] },
    ]},
    { type: 'group', name: 'Areas of Study Requirements', requirements: [
      { type: 'choose', name: 'Group 1 (Metaphysics, Epistemology, Mind, Science)', count: 2, from: [
        'PHIL 318', 'PHIL 320', 'PHIL 325', 'PHIL 330', 'PHIL 340', 'PHIL 345', 'PHIL 350', 'PHIL 353', 'PHIL 354', 'PHIL 430', 'PHIL 431',
      ]},
      { type: 'choose', name: 'Group 2 (Ethics, Social and Political Philosophy)', count: 2, from: [
        'PHIL 360', 'PHIL 361', 'PHIL 362', 'PHIL 363', 'PHIL 370', 'PHIL 372', 'PHIL 373', 'PHIL 460', 'PHIL 470',
      ]},
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 3, from: [{ dept: 'PHIL', exclude: ['PHIL 498', 'PHIL 499'] }],
      note: 'Additional departmental (PHIL) courses.' },
  ],
  constraints: [
    { type: 'atMost', count: 2, from: [{ dept: '*', max: 199 }], label: 'At most 2 courses at the 100 level' },
  ],
};
