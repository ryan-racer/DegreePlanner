export default {
  id: 'sport-management-ba-law-concentration',
  name: 'Sport Management (Sport Law Concentration)',
  degree: 'BA',
  kind: 'major',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/sport-management/sport-management-ba-law-concentration/',
  hours: 46,
  notes: [
    'SMGT majors should enroll in SOSC 302 and SMGT 102 concurrently.',
    'Because the core is shared, students may switch between the Sport Law and Sport Leadership concentrations at any time.',
  ],
  requirements: [
    { type: 'all', name: 'Core Requirements', items: [
      'SMGT 260', 'SMGT 266', 'SMGT 276', 'SMGT 340', 'SMGT 350', 'SMGT 362', 'SMGT 376', 'SMGT 400', 'SMGT 440', 'SOSC 302', 'SMGT 102',
    ]},
    { type: 'group', name: 'Major Concentration: Sport Law', requirements: [
      { type: 'course', name: 'Required Course', options: ['SMGT 364'] },
      { type: 'choose', name: 'Elective Requirements', count: 4,
        from: ['BUSI 422', 'ECON 239', 'HIST 332', 'HIST 426', 'HIST 449', 'HUMA 309', 'HUMA 315', 'PHIL 373', 'PHIL 470', 'PLST 305', 'PLST 306', 'PLST 307', 'PLST 331', 'PLST 401', 'PLST 402', 'POLI 319', 'POLI 321', 'POLI 323', 'SMGT 361', 'SMGT 368', 'SMGT 464', 'SMGT 465', 'SOCI 325', 'SOCI 396', 'ANTH 396'] },
    ]},
  ],
};
