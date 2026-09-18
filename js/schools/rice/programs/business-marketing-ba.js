export default {
  id: 'business-marketing-ba',
  name: 'Business (Marketing Concentration)',
  degree: 'BA',
  kind: 'major',
  school: 'Business',
  url: 'https://ga.rice.edu/programs-study/departments-programs/business/business/business-marketing-ba/',
  hours: 48,
  notes: [
    'ECON 100 must be taken at Rice; no substitution or transfer/AP/IB credit is allowed.',
    'At least 11 courses (33-34 hours) at the 300 level or above. At most 3 courses (9 hours) from study abroad or transfer credit. Minimum major GPA of 2.00.',
    'Students may switch to the Finance or Management concentration at any time because the core is shared.',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'course', name: 'Business Communication', options: ['BUSI 396'] },
      { type: 'group', name: 'Foundation', requirements: [
        { type: 'choose', name: 'Statistics', count: 1, from: ['BUSI 395', 'STAT 310', 'ECON 307', 'STAT 315', 'DSCI 301'] },
        { type: 'course', name: 'Economics', options: ['ECON 100', 'BUSI 150'] },
        { type: 'any', name: 'Calculus', options: [
          { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
          { type: 'all', name: 'MATH 111 and MATH 112', items: ['MATH 111', 'MATH 112'] },
        ]},
      ]},
    ]},
    { type: 'group', name: 'Major Concentration: Marketing', requirements: [
      { type: 'all', name: 'Business Core Requirements', items: ['BUSI 305', 'BUSI 310', ['BUSI 343', 'ECON 343'], 'BUSI 374', 'BUSI 380', 'BUSI 390', 'BUSI 430'] },
      { type: 'all', name: 'Marketing Core Requirements', items: ['BUSI 371', 'BUSI 460', 'BUSI 470', 'BUSI 480'] },
      { type: 'choose', name: 'Elective Requirement', count: 1, from: ['BUSI 420', 'BUSI 421', 'BUSI 422', 'BUSI 431', 'BUSI 432', 'DSCI 302', 'DSCI 303', 'ECON 209', 'PSYC 202', 'PSYC 203'] },
    ]},
  ],
};
