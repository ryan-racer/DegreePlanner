export default {
  id: 'museums-cultural-heritage-minor',
  name: 'Museums and Cultural Heritage',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/museums-cultural-heritage/museums-cultural-heritage-minor/',
  hours: 19,
  notes: [
    'At most 2 elective courses (6 credit hours) may share the same subject code.',
    'ANTH 341, ANTH 345, or HIST 244 must be completed before starting the practicum.',
    'With advisor approval, an HRC/CCL/School of Humanities internship or a faculty-directed independent study (300/400 level, at least 3 credit hours) may substitute for the listed practicum courses.',
    'MUCH 238 counts only when its topic relates to museums and cultural heritage.',
  ],
  requirements: [
    { type: 'course', name: 'Core Requirement', options: ['ANTH 341'] },
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Museums or Preservation', count: 2, from: [
        'ANTH 362', 'ANTH 364', 'ANTH 370', 'ARCH 346', 'ARCH 352', 'ARTS 378', 'CHEM 176', 'FILM 327',
        'HART 101', 'HART 201', 'HART 216', 'HART 297', 'HART 395', 'HART 397', 'HIST 244', 'HIST 343',
        'MUCH 238', 'RELI 335',
      ]},
      { type: 'choose', name: 'Cultural Heritage', count: 2, from: [
        'ANTH 205', 'ANTH 303', 'ANTH 312', 'ANTH 318', 'ANTH 345', 'ANTH 355', 'ANTH 363', 'ANTH 383',
        'ANTH 392', 'ARCH 225', 'ARCH 345', 'ARCH 346', 'ARCH 350', 'ARCH 352', 'ASIA 214', 'FWIS 140',
        'HART 324',
      ]},
    ]},
    { type: 'choose', name: 'Practicum Requirement', count: 1, from: ['HART 300', 'HART 301', 'HART 400', 'HART 401', 'HUMA 406', 'HUMA 407', 'MUCH 423'] },
    { type: 'course', name: 'Capstone Symposium', options: ['MUCH 424'] },
  ],
};
