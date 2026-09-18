const AREA_I = ['CEVE 314', 'BIOE 365', 'GLHT 314', 'CEVE 347', 'CEVE 418', 'CEVE 426', 'CEVE 434', 'CEVE 444'];
const AREA_II = ['CEVE 202', 'CEVE 302', 'CEVE 307', 'CEVE 414', 'EEPS 433', 'EEPS 437', 'EEPS 438'];
const AREA_III = ['CEVE 208', 'CEVE 424', 'CEVE 425', 'CEVE 452', 'CEVE 543', 'EEPS 432'];
const AREA_IV = ['CEVE 301', 'CEVE 313', 'STAT 313', 'CEVE 320', 'ENGI 320', 'CEVE 348', 'CEVE 406', 'ENST 406', 'CEVE 421', 'CEVE 456', 'EEPS 435'];

export default {
  id: 'environmental-engineering-bsenve',
  name: 'Environmental Engineering',
  degree: 'BSEnvE',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/civil-environmental-engineering/environmental-engineering-bsenve/',
  hours: 93,
  degreeHours: 124,
  notes: [
    'Area of Specialization: 10 courses (30 hours) total - 4 in the chosen area and 2 from each of the other three areas. At least 7 of the 10 must be CEVE courses. Other approved CEVE courses may count in the chosen area.',
    'PHYS 141 credit is not eligible for the major.',
    'Free electives fill out the 124 degree hours (no set number is required by the major). Suggested electives: ANTH 320, BIOS 271, BIOS 374, BIOS 559, CHBE 382, EEPS 434, EEPS 436, ENST 210, ENST 250, ENST 301, ENST 313, ENST 315, ENST 322, ENST 332, ENST 415, ENST 437, ENST 480, HEAL 375, STAT 485.',
  ],
  requirements: [
    { type: 'all', name: 'General Math and Science Requirements', items: [
      ['BIOS 201', 'BIOS 101'], ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], ['CHEM 122', 'CHEM 112'], ['CHEM 124', 'CHEM 114'],
      ['CMOR 220', 'EEPS 220'], 'EEPS 107', ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], 'MATH 211', ['MATH 212', 'MATH 232'],
      'PHYS 101', 'PHYS 103', ['STAT 310', 'ECON 307', 'STAT 305'],
    ]},
    { type: 'all', name: 'Core Requirements', items: [
      'CEVE 101', ['CEVE 211', 'MECH 211'], 'CEVE 310', 'CEVE 315', 'CEVE 316', 'CEVE 363', 'CEVE 401', 'CEVE 411', 'CEVE 412', 'CEVE 481', 'CEVE 482',
    ]},
    { type: 'any', name: 'Area of Specialization', options: [
      { type: 'group', name: 'Area I - Sustainable Water', requirements: [
        { type: 'choose', name: 'Area I Courses', count: 4, from: [...AREA_I, { dept: 'CEVE', min: 300 }] },
        { type: 'choose', name: 'Area II - Air, Climate, and Energy', count: 2, from: AREA_II },
        { type: 'choose', name: 'Area III - Resilient Infrastructure, Disasters, and Risk', count: 2, from: AREA_III },
        { type: 'choose', name: 'Area IV - Environmental Management', count: 2, from: AREA_IV },
      ]},
      { type: 'group', name: 'Area II - Air, Climate, and Energy', requirements: [
        { type: 'choose', name: 'Area II Courses', count: 4, from: [...AREA_II, { dept: 'CEVE', min: 300 }] },
        { type: 'choose', name: 'Area I - Sustainable Water', count: 2, from: AREA_I },
        { type: 'choose', name: 'Area III - Resilient Infrastructure, Disasters, and Risk', count: 2, from: AREA_III },
        { type: 'choose', name: 'Area IV - Environmental Management', count: 2, from: AREA_IV },
      ]},
      { type: 'group', name: 'Area III - Resilient Infrastructure, Disasters, and Risk', requirements: [
        { type: 'choose', name: 'Area III Courses', count: 4, from: [...AREA_III, { dept: 'CEVE', min: 300 }] },
        { type: 'choose', name: 'Area I - Sustainable Water', count: 2, from: AREA_I },
        { type: 'choose', name: 'Area II - Air, Climate, and Energy', count: 2, from: AREA_II },
        { type: 'choose', name: 'Area IV - Environmental Management', count: 2, from: AREA_IV },
      ]},
      { type: 'group', name: 'Area IV - Environmental Management', requirements: [
        { type: 'choose', name: 'Area IV Courses', count: 4, from: [...AREA_IV, { dept: 'CEVE', min: 300 }] },
        { type: 'choose', name: 'Area I - Sustainable Water', count: 2, from: AREA_I },
        { type: 'choose', name: 'Area II - Air, Climate, and Energy', count: 2, from: AREA_II },
        { type: 'choose', name: 'Area III - Resilient Infrastructure, Disasters, and Risk', count: 2, from: AREA_III },
      ]},
    ]},
  ],
};
