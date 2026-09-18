export default {
  id: 'sports-medicine-exercise-physiology-bs',
  name: 'Sports Medicine and Exercise Physiology',
  degree: 'BS',
  kind: 'major',
  school: 'Natural Sciences',
  url: 'https://ga.rice.edu/programs-study/departments-programs/natural-sciences/sports-medicine-exercise-physiology/sports-medicine-exercise-physiology-bs/',
  hours: 64,
  notes: [
    'No transfer credit is accepted for Core Requirements.',
    'Credit for PHYS 141 or PHYS 142 is not eligible for the major.',
    'Experiential learning, research, and lab courses (EMSP 281/282, HEAL 132, HEAL 407, KINE 275/320/351/375/495/499) are recommended but not required.',
  ],
  requirements: [
    { type: 'all', name: 'Core Requirements', items: [
      'HEAL 103', 'KINE 120', 'KINE 300', 'KINE 301', 'KINE 302', 'KINE 310', 'KINE 311', 'KINE 319', 'KINE 321',
    ]},
    { type: 'group', name: 'Elective Requirements', requirements: [
      { type: 'choose', name: 'Advanced Kinesiology (KINE) Electives', count: 3, from: [
        'KINE 326', 'KINE 403', 'KINE 410', 'KINE 412', 'KINE 415', 'KINE 419', 'KINE 421', 'KINE 430', 'KINE 441', 'KINE 455', 'KINE 460', 'KINE 498',
      ]},
      { type: 'hours', name: 'Natural Science Electives (Outside KINE)', hours: 24, from: [
        'BIOS 201', 'BIOS 101', 'BIOS 202', 'BIOS 102', 'BIOS 211', 'BIOS 301', 'BIOS 302', 'BIOS 311', 'BIOS 372',
        'CHEM 121', 'CHEM 111', 'CHEM 123', 'CHEM 113', 'CHEM 122', 'CHEM 112', 'CHEM 124', 'CHEM 114',
        'CHEM 211', 'CHEM 219', 'CHEM 313', 'CHEM 320', 'PHYS 101', 'PHYS 102', 'PHYS 125', 'PHYS 126',
      ]},
    ]},
    { type: 'course', name: 'Capstone Requirement', options: ['KINE 440'] },
  ],
};
