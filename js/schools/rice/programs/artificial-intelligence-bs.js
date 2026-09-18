export default {
  id: 'artificial-intelligence-bs',
  name: 'Artificial Intelligence',
  degree: 'BS',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/artificial-intelligence/artificial-intelligence-bs/',
  hours: 67,
  notes: [
    'The 3 AI electives must come from 3 different elective areas: AI Theory (COMP 409, 414, 480, 585); Cognitive Psychology (PSYC 430, 468); Knowledge and Graphs (COMP 459, 631); Perception and Language (COMP 447, 484); Robotics and Autonomy (COMP 442, 450, 462).',
  ],
  requirements: [
    { type: 'group', name: 'Core Requirements', requirements: [
      { type: 'group', name: 'Mathematics', requirements: [
        { type: 'course', name: 'Calculus I', options: ['MATH 101', 'MATH 105'] },
        { type: 'course', name: 'Calculus II', options: ['MATH 102', 'MATH 106'] },
        { type: 'choose', name: 'Linear Algebra', count: 1, from: ['CMOR 302', 'CMOR 303', 'MATH 221', 'MATH 354', 'MATH 355'] },
        { type: 'any', name: 'Statistics', options: [
          { type: 'all', name: 'STAT 310 or STAT 311 with STAT 314', items: [['STAT 310', 'STAT 311'], 'STAT 314'] },
          { type: 'course', name: 'STAT 315', options: ['STAT 315', 'DSCI 301'] },
        ]},
      ]},
      { type: 'all', name: 'Computer Science', items: ['COMP 140', 'COMP 182', 'COMP 215', 'COMP 222', 'COMP 282'] },
      { type: 'all', name: 'Artificial Intelligence', items: [
        'COMP 329', 'COMP 345', 'COMP 346', 'COMP 348', 'COMP 456', 'COMP 457', 'PHIL 108', 'PSYC 203',
      ]},
    ]},
    { type: 'choose', name: 'Elective Requirements', count: 3, from: [
      'COMP 409', 'COMP 414', 'COMP 480', 'COMP 585',
      'PSYC 430', 'PSYC 468',
      'COMP 459', 'COMP 631',
      'COMP 447', 'ELEC 447', 'COMP 484',
      'COMP 442', 'COMP 450', 'ELEC 450', 'MECH 450', 'COMP 462',
    ], note: '1 course from each of 3 of the 5 AI elective areas.' },
  ],
};
