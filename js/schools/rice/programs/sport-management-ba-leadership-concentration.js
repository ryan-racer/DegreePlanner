export default {
  id: 'sport-management-ba-leadership-concentration',
  name: 'Sport Management (Sport Leadership Concentration)',
  degree: 'BA',
  kind: 'major',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/sport-management/sport-management-ba-leadership-concentration/',
  hours: 46,
  notes: [
    'SMGT majors should enroll in SOSC 302 and SMGT 102 concurrently.',
    'Because the core is shared, students may switch between the Sport Law and Sport Leadership concentrations at any time.',
  ],
  requirements: [
    { type: 'all', name: 'Core Requirements', items: [
      'SMGT 260', 'SMGT 266', 'SMGT 276', 'SMGT 340', 'SMGT 350', 'SMGT 362', 'SMGT 376', 'SMGT 400', 'SMGT 440', 'SOSC 302', 'SMGT 102',
    ]},
    { type: 'group', name: 'Major Concentration: Sport Leadership', requirements: [
      { type: 'all', name: 'Required Courses', items: ['SMGT 366', 'SMGT 450'] },
      { type: 'choose', name: 'Elective Requirements', count: 3,
        from: ['BUSI 310', 'BUSI 390', 'SMGT 320', 'SMGT 360', 'SMGT 361', 'SMGT 364', 'SMGT 368', 'SMGT 377', 'SMGT 390', 'SMGT 396', 'SMGT 470'] },
    ]},
  ],
};
