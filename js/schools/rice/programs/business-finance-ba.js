export default {
  id: 'business-finance-ba',
  name: 'Business (Finance Concentration)',
  degree: 'BA',
  kind: 'major',
  school: 'Business',
  url: 'https://ga.rice.edu/programs-study/departments-programs/business/business/business-finance-ba/',
  hours: 48,
  notes: [
    'ECON 100 must be taken at Rice; no substitution or transfer/AP/IB credit is allowed.',
    'At least 11 courses (33-34 hours) at the 300 level or above. At most 3 courses (9 hours) from study abroad or transfer credit. Minimum major GPA of 2.00.',
    'Students may switch to the Management or Marketing concentration at any time because the core is shared.',
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
    { type: 'group', name: 'Major Concentration: Finance', requirements: [
      { type: 'group', name: 'Business Core Requirements', requirements: [
        { type: 'all', name: 'Required Business Core', items: ['BUSI 305', 'BUSI 310', ['BUSI 343', 'ECON 343']] },
        { type: 'choose', name: 'Business Core Selection', count: 4, from: ['BUSI 374', 'BUSI 380', 'BUSI 390', 'BUSI 430', 'ECON 200'] },
      ]},
      { type: 'all', name: 'Finance Core Requirements', items: ['BUSI 401', 'BUSI 447', 'BUSI 448', 'BUSI 450'] },
      { type: 'choose', name: 'Elective Requirement', count: 1, from: ['BUSI 420', 'BUSI 421', 'BUSI 422', 'BUSI 431', 'BUSI 432', 'BUSI 480', 'ECON 203', 'ECON 209', 'ECON 300', 'ECON 305'] },
    ]},
  ],
};
