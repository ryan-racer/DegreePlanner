export default {
  id: 'business-minor',
  name: 'Business',
  degree: 'Minor',
  kind: 'minor',
  school: 'Business',
  url: 'https://ga.rice.edu/programs-study/departments-programs/business/business/business-minor/',
  hours: 18,
  notes: [
    'BUSI 343 and BUSI 380 require prerequisites in microeconomics (BUSI 150 or ECON 100) and an approved STAT course; BUSI 343 and BUSI 390 require BUSI 305 (prerequisites are not waived).',
    'At least 5 courses (15 hours) at the 300 level or above. At most 2 courses from study abroad or transfer credit. Minimum minor GPA of 2.00.',
  ],
  requirements: [
    { type: 'choose', name: 'Core Requirements', count: 6, from: ['BUSI 305', 'BUSI 310', 'BUSI 343', 'ECON 343', 'BUSI 374', 'BUSI 380', 'BUSI 390', 'BUSI 396'],
      exclusive: [['BUSI 343', 'ECON 343']] },
  ],
};
