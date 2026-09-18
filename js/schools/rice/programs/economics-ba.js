export default {
  id: 'economics-ba',
  name: 'Economics',
  degree: 'BA',
  kind: 'major',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/economics/economics-ba/',
  hours: 44,
  notes: [
    'ECON 101, 103, 111, 113, 205, and 499 do not satisfy the Elective Requirements. BUSI 343 may substitute for ECON 343 and STAT 449 for ECON 449.',
    'Students with credit for ECON 111 and ECON 113 and a B- or better in MATH 102 at Rice may substitute any major elective for ECON 100 (notify the DUS).',
    'More than half of upper-level (300/400-level) major coursework must be completed at Rice; post-matriculation transfer credit is limited to 2 math/stat and 3 econ courses.',
  ],
  requirements: [
    { type: 'group', name: 'Mathematics and Statistics', requirements: [
      { type: 'any', name: 'Calculus I', options: [
        { type: 'course', name: 'Single Variable Calculus I', options: ['MATH 101', 'MATH 105'] },
        { type: 'all', name: 'Calculus: Differentiation and Integration', items: ['MATH 111', 'MATH 112'] },
      ]},
      { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
      { type: 'choose', name: 'Statistics', count: 1, from: ['BUSI 395', 'ECON 307', 'STAT 310', 'SOSC 302', 'STAT 311', 'STAT 315', 'DSCI 301'] },
    ]},
    { type: 'all', name: 'Economics and Econometrics', items: [
      'ECON 100', 'ECON 200', 'ECON 203', ['ECON 205', 'ECON 300', 'ECON 305'], 'ECON 209',
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Advanced Electives (ECON 410-497)', count: 2, from: [{ dept: 'ECON', min: 410, max: 497 }, 'ECON 498'] },
      { type: 'choose', name: 'Electives', count: 4,
        note: 'ECON 208-239 (listed), ECON 320-497, ECON 498, or at most 1 approved course outside ECON.',
        exclusive: [['BUSI 401', 'BUSI 447', 'BUSI 448', 'BUSI 450', 'CMOR 303', 'CMOR 350', 'CMOR 360', 'CMOR 404', 'CMOR 420', 'CMOR 435', 'MATH 435', 'CMOR 441', 'CMOR 442', 'CMOR 444', 'CMOR 455', 'CMOR 462', 'STAT 482']],
        from: ['ECON 208', 'ECON 210', 'ECON 211', 'ECON 213', 'ECON 214', 'ECON 215', 'ECON 239', { dept: 'ECON', min: 320, max: 497 }, 'ECON 498',
               'BUSI 401', 'BUSI 447', 'BUSI 448', 'BUSI 450', 'CMOR 303', 'CMOR 350', 'CMOR 360', 'CMOR 404', 'CMOR 420', 'CMOR 435', 'MATH 435', 'CMOR 441', 'CMOR 442', 'CMOR 444', 'CMOR 455', 'CMOR 462', 'STAT 482'] },
    ]},
  ],
};
