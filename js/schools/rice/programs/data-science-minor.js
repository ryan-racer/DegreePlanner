export default {
  id: 'data-science-minor',
  name: 'Data Science',
  degree: 'Minor',
  kind: 'minor',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/data-science/data-science-minor/',
  hours: 22,
  notes: [
    'MDHM 359 may satisfy either the Social, Political, and Ethical Contexts core or the Elective Requirement, but not both.',
    'STAT 180 (AP/other statistics credit) is not eligible for the minor.',
    'Other 300+ courses may fulfill the Elective Requirement with approval of the Minor Advisor.',
    'At least 5 courses (15-19 hours) at the 300 level or above. Minimum minor GPA of 2.00.',
  ],
  requirements: [
    { type: 'course', name: 'Prerequisite', options: ['DSCI 101', 'COMP 140'] },
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'choose', name: 'Statistics', count: 1, from: ['BIOE 439', 'BUSI 395', 'DSCI 301', 'STAT 315', 'ELEC 303', 'PSYC 339', 'SOCI 382', 'SOSC 302', 'STAT 280', 'STAT 305', 'STAT 310', 'ECON 307', 'STAT 311'] },
      { type: 'choose', name: 'Big Data', count: 1, from: ['DSCI 302', 'COMP 330', 'COMP 430'] },
      { type: 'choose', name: 'Machine Learning', count: 1, from: ['CMOR 438', 'COMP 341', 'COMP 540', 'DSCI 303', 'ELEC 378', 'ELEC 478', 'STAT 413'] },
      { type: 'choose', name: 'Social, Political, and Ethical Contexts in Data Science', count: 1, from: ['COMP 301', 'DSCI 305', 'HIST 314', 'HIST 346', 'HIST 449', 'MDHM 359'] },
    ]},
    { type: 'choose', name: 'Elective Requirement', count: 1, from: [
      'ASTR 408', 'BIOS 338', 'CEVE 427', 'MECH 427', 'CMOR 303', 'CMOR 442', 'COMP 340', 'COMP 447', 'ELEC 447', 'COMP 480', 'DSCI 304', 'ECON 310', 'STAT 376',
      'ECON 418', 'EEPS 450', 'EEPS 451', 'ELEC 431', 'ELEC 439', 'ELEC 440', 'COMP 440', 'ELEC 483', 'ELEC 498', 'COMP 498', 'MECH 498', 'LING 430', 'MDHM 359',
      'PSYC 439', 'SMGT 431', 'SMGT 440', 'SOCI 460', 'SOCI 483', 'STAT 405', 'STAT 410', 'STAT 411', 'STAT 419', 'STAT 421', 'STAT 423', 'STAT 425', 'STAT 449',
      'STAT 453', 'STAT 482', 'STAT 486', 'STAT 487',
    ], note: 'One department-approved elective at the 300 level or above.' },
    { type: 'course', name: 'Capstone Requirement', options: ['DSCI 435', 'COMP 449'] },
  ],
};
