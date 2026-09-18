export default {
  id: 'managerial-economics-organizational-sciences-ba',
  name: 'Managerial Economics and Organizational Sciences',
  degree: 'BA',
  kind: 'major',
  school: 'Social Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/social-sciences/managerial-economics-organizational-sciences/managerial-economics-organizational-sciences-ba/',
  hours: 49,
  notes: [
    'ECON 101, 103, 111, 113, 205, and 499 do not satisfy the Elective Requirements. BUSI 343 may substitute for ECON 343 and STAT 449 for ECON 449.',
    'Students with credit for ECON 111 and ECON 113 and a B- or better in MATH 102 at Rice may substitute any Economics major elective for ECON 100 (notify the DUS).',
    'Honors in MEOS requires ECON 445 with at least a B- and a 3.67 GPA in all major coursework.',
    'More than half of upper-level major coursework must be completed at Rice; post-matriculation transfer credit is limited to 2 math/stat and 3 econ/elective courses.',
  ],
  requirements: [
    { type: 'group', name: 'Mathematical and Statistical Foundations', requirements: [
      { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
      { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
      { type: 'choose', name: 'Statistics', count: 1, from: ['BUSI 395', 'SOSC 302', 'STAT 305', 'STAT 310', 'ECON 307', 'STAT 315', 'DSCI 301'] },
    ]},
    { type: 'all', name: 'Core Requirements', items: [
      'ECON 100', 'ECON 200', 'ECON 203', 'ECON 214', ['PSYC 101', 'PSYC 100'], 'PSYC 231', ['SOSC 444', 'SOSC 445'],
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Management, Economics, and Analytical Methods', count: 4,
        note: 'At most 1 course from the approved list outside ECON.',
        exclusive: [['BUSI 401', 'BUSI 447', 'BUSI 448', 'BUSI 450', 'CMOR 303', 'CMOR 350', 'CMOR 360', 'CMOR 404', 'CMOR 420', 'CMOR 435', 'MATH 435', 'CMOR 441', 'CMOR 442', 'CMOR 444', 'CMOR 455', 'CMOR 462', 'STAT 482']],
        from: ['CMOR 360', 'ECON 205', 'ECON 300', 'ECON 305', 'ECON 209', 'ECON 310', 'STAT 376', 'ECON 343', 'BUSI 343', 'ECON 355', 'ECON 422', 'ECON 435', 'ECON 437', 'ENST 437', 'ECON 445', 'ECON 449', 'STAT 449', 'ECON 480', 'ENST 480', 'SOCI 381', 'SOSC 303', 'STAT 405', 'STAT 410', 'STAT 411', 'STAT 421',
               'BUSI 401', 'BUSI 447', 'BUSI 448', 'BUSI 450', 'CMOR 303', 'CMOR 350', 'CMOR 404', 'CMOR 420', 'CMOR 435', 'MATH 435', 'CMOR 441', 'CMOR 442', 'CMOR 444', 'CMOR 455', 'CMOR 462', 'STAT 482'] },
      { type: 'choose', name: 'Social Sciences', count: 2,
        from: ['ANTH 307', 'ECON 208', 'ECON 210', 'ECON 211', 'ECON 213', 'ECON 215', 'ECON 239', 'POLI 210', 'POLI 335', 'POLI 337', 'POLI 338', 'SOSC 301', 'PSYC 333', 'PSYC 431'] },
    ]},
  ],
};
