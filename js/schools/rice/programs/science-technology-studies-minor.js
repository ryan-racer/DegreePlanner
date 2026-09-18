export default {
  id: 'science-technology-studies-minor',
  name: 'Science and Technology Studies',
  degree: 'Minor',
  kind: 'minor',
  school: 'Humanities and Arts',
  url: 'https://ga.rice.edu/programs-study/departments-programs/humanities/science-technology-studies/science-technology-studies-minor/',
  hours: 18,
  notes: [
    'At most 2 elective courses (6 credit hours) may share the same subject code.',
    'Additional Core Requirement courses may count as electives, but no course counts toward both.',
    'Special topics, independent study, and advanced topics courses (ARTS 238, ASIA 238, HIST 300, MDHM 238, PHIL 460) count only when the topic relates to STS and is approved.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'School of Humanities and Arts', count: 1, from: ['ASIA 220', 'ENGL 273', 'HIST 260', 'HIST 261', 'HIST 346'] },
      { type: 'choose', name: 'School of Social Sciences', count: 1, from: ['ANTH 334', 'ANTH 348', 'ANTH 422', 'ANTH 428'] },
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 4, from: [
      'ANTH 250', 'ANTH 321', 'ANTH 334', 'ANTH 342', 'ANTH 348', 'ANTH 377', 'ANTH 381', 'ANTH 399',
      'ANTH 417', 'ANTH 422', 'ANTH 428', 'ARTS 238', 'ASIA 216', 'ASIA 236', 'ASIA 238', 'ASIA 307',
      'ASIA 356', 'ASIA 357', 'ASIA 488', 'COMP 301', 'DSCI 305', 'ENGL 101', 'ENGL 199', 'ENGL 273',
      'ENGL 378', 'ENST 345', 'FREN 357', 'HIST 243', 'HIST 258', 'HIST 260', 'HIST 261', 'HIST 262',
      'HIST 265', 'HIST 300', 'HIST 312', 'HIST 314', 'HIST 319', 'HIST 321', 'HIST 325', 'HIST 346',
      'HIST 430', 'HIST 449', 'HIST 480', 'LALX 390', 'MDHM 238', 'MDHM 275', 'MDHM 330', 'MDHM 359',
      'MUSI 221', 'PHIL 150', 'PHIL 353', 'PHIL 460', 'RELI 250', 'SOCI 314', 'SOCI 335', 'SOCI 345',
      'SOCI 351', 'SOCI 460', 'SWGS 303', 'ASIA 220',
    ], atLeast: [{ count: 3, from: [{ dept: '*', min: 300 }], label: 'Elective at the 300 level or above (at least 3 of the 4)' }] },
  ],
};
