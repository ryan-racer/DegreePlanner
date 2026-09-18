export default {
  id: 'behavioral-medicine-health-resilience-minor',
  name: 'Behavioral Medicine and Health Resilience',
  degree: 'Minor',
  kind: 'minor',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/behavioral-medicine-health-resilience/behavioral-medicine-health-resilience-minor/',
  hours: 24,
  notes: [
    'Capstone: PSYC 485 must be taken for at least 3 credit hours (max 6) in the section designated as the BMHR minor Capstone, with an approved faculty mentor; instructor permission required.',
    'PSYC 480 counts toward the minor only when the topic is health-relevant and the instance is approved.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Introductory Course', options: ['PSYC 101', 'PSYC 100'] },
      { type: 'all', name: 'Core Coursework', items: ['PSYC 345', 'PSYC 346'] },
      { type: 'choose', name: 'Methods or Measurement', count: 1, from: ['PSYC 339', 'PSYC 340', 'SOCI 381', 'SOSC 302', 'SOSC 303', 'STAT 280', 'STAT 180'] },
    ]},
    { type: 'group', name: 'Elective Requirements', note: '3 courses total; at least 1 from each category.', requirements: [
      { type: 'choose', name: 'Mechanisms and Processes: Individual, Neural, Biobehavioral', count: 1,
        from: ['PSYC 310', 'PSYC 332', 'PSYC 354', 'PSYC 445', 'PSYC 452', 'PSYC 463', 'PSYC 480'] },
      { type: 'choose', name: 'Populations and Systems: Social, Organizational, Structural', count: 1,
        from: ['ANTH 380', 'ANTH 381', 'ECON 210', 'ECON 481', 'SOCI 335', 'SOCI 344', 'SOCI 345', 'SOCI 351', 'SOCI 377'] },
      { type: 'choose', name: 'Additional Elective (either category)', count: 1,
        from: ['PSYC 310', 'PSYC 332', 'PSYC 354', 'PSYC 445', 'PSYC 452', 'PSYC 463', 'PSYC 480',
               'ANTH 380', 'ANTH 381', 'ECON 210', 'ECON 481', 'SOCI 335', 'SOCI 344', 'SOCI 345', 'SOCI 351', 'SOCI 377'] },
    ]},
    { type: 'course', name: 'Capstone: Health-Related Research Experience', options: ['PSYC 485'] },
  ],
};
