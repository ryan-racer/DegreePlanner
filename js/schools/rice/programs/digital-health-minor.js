export default {
  id: 'digital-health-minor',
  name: 'Digital Health',
  degree: 'Minor',
  kind: 'minor',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/digital-health/digital-health-minor/',
  hours: 18,
  notes: [
    'A course used for a Core Requirement may not also fulfill an Elective Requirement.',
    'At least 3 courses (9 hours) at the 300 level or above. At most 2 courses from study abroad or transfer credit. Minimum minor GPA of 2.00.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Introductory Core: Devices or AI', count: 1, from: ['ELEC 383', 'ELEC 384'] },
      { type: 'choose', name: 'Project-Based Capstone Core: Devices or AI', count: 1, from: ['ELEC 435', 'ELEC 482'] },
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Digital Health Technology', count: 2, from: [
        'CMOR 438', 'COMP 341', 'DSCI 303', 'ELEC 326', 'COMP 326', 'ELEC 378', 'ELEC 422', 'ELEC 424', 'COMP 424', 'ELEC 425', 'COMP 425', 'ELEC 431', 'ELEC 436', 'MECH 420',
        'ELEC 447', 'COMP 447', 'ELEC 475', 'ELEC 478', 'ELEC 487', 'MECH 343', 'MECH 488', 'MECH 498', 'COMP 498', 'ELEC 498', 'STAT 410', 'STAT 413', 'STAT 425',
      ]},
      { type: 'choose', name: 'Digital Health Sciences', count: 1, from: [
        'BIOE 383', 'ELEC 380', 'BIOE 380', 'NEUR 383', 'ELEC 383', 'ELEC 384', 'ELEC 418', 'ELEC 435', 'ELEC 438', 'ELEC 481', 'ELEC 482', 'ELEC 483', 'MECH 497', 'STAT 484', 'CEVE 484', 'STAT 453',
      ]},
      { type: 'choose', name: 'Ethics/Human Factors', count: 1, from: ['MDHM 201', 'MDHM 325', 'PHIL 324', 'MDHM 359', 'PHIL 266', 'MDHM 266', 'PSYC 463', 'PSYC 468'] },
    ]},
  ],
};
