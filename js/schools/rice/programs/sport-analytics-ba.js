export default {
  id: 'sport-analytics-ba',
  name: 'Sport Analytics',
  degree: 'BA',
  kind: 'major',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/sport-analytics/sport-analytics-ba/',
  hours: 43,
  notes: [
    'A higher-level MATH course may be substituted for MATH 101 and/or MATH 102.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Computing', options: ['COMP 140', 'DSCI 101'] },
      { type: 'course', name: 'Probability and Statistics', options: ['DSCI 301', 'STAT 315', 'STAT 310', 'ECON 307'] },
      { type: 'choose', name: 'Machine Learning', count: 1, from: ['CMOR 438', 'COMP 341', 'DSCI 303', 'ELEC 478', 'STAT 413'] },
      { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
      { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
      { type: 'all', name: 'Sport Analytics Courses', items: [
        'SMGT 260', 'SMGT 276', 'SMGT 330', 'SMGT 373', 'SMGT 430', 'SMGT 431', 'SMGT 435', 'STAT 410',
      ]},
    ]},
    { type: 'course', name: 'Capstone Requirement', options: ['SMGT 490'] },
  ],
};
