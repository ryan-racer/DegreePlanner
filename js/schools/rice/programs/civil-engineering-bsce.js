const AREA_I = ['CEVE 208', 'CEVE 302', 'ENGI 302', 'CEVE 307', 'CEVE 401', 'CEVE 406', 'CEVE 411', 'CEVE 426', 'CEVE 434', 'CEVE 444'];
const AREA_II = ['CEVE 314', 'CEVE 347', 'CEVE 412', 'CEVE 414', 'CEVE 418', 'CEVE 421'];
const AREA_III = ['CEVE 325', 'CEVE 400', 'CEVE 431', 'CEVE 432', 'CEVE 437', 'CEVE 439', 'CEVE 441', 'CEVE 445', 'CEVE 476', 'CEVE 496'];
const AREA_IV = ['CEVE 301', 'CEVE 313', 'CEVE 320', 'CEVE 348', 'CEVE 424', 'CEVE 425', 'CEVE 452', 'CEVE 456', 'CEVE 457', 'CEVE 460', 'CEVE 492'];

export default {
  id: 'civil-engineering-bsce',
  name: 'Civil Engineering',
  degree: 'BSCE',
  kind: 'major',
  school: 'Engineering and Computing',
  url: 'https://ga.rice.edu/programs-study/departments-programs/engineering/civil-environmental-engineering/civil-engineering-bsce/',
  hours: 94,
  degreeHours: 125,
  notes: [
    'Area of Specialization: 10 courses (30 hours) total - 4 in the chosen area and 2 from each of the other three areas. Other approved courses from CEVE (Area III also MECH; Area IV also CMOR, ECON, MGMT, STAT) may count with approval.',
    'Students in Areas I or II take CEVE 316 as the core lab; students in Areas III or IV take CEVE 472.',
    'STAT 310 may be replaced by any STAT course at the 300 level or above except STAT 305.',
    'PHYS 141 and PHYS 142 credit is not eligible for the major.',
    'Free electives fill out the 125 degree hours (no set number is required by the major). Suggested electives: ANTH 320, CEVE 417, CEVE 454, CEVE 477, CEVE 499, CHEM 211 and CHEM 213, CMOR 360, CMOR 422, CMOR 438, COMP 140, COMP 330, COMP 440, ECON 100, ECON 445, ENST 210, EEPS 436, EEPS 440, MECH 343, MECH 412, RCEL 450.',
  ],
  requirements: [
    { type: 'group', name: 'General Math and Science Requirements', requirements: [
      { type: 'all', name: 'Math and Science Courses', items: [
        ['CHEM 121', 'CHEM 111'], ['CHEM 123', 'CHEM 113'], 'CMOR 220', ['CMOR 302', 'MATH 355', 'MATH 354'],
        ['MATH 101', 'MATH 105'], ['MATH 102', 'MATH 106'], ['MATH 211', 'MATH 220'], ['MATH 212', 'MATH 232'],
        'PHYS 101', 'PHYS 103', 'PHYS 102', 'PHYS 104',
        ['STAT 310', 'ECON 307', { dept: 'STAT', min: 300, exclude: ['STAT 305'] }],
      ]},
      { type: 'choose', name: 'Earth, Environmental and Planetary Sciences', count: 1, from: [{ dept: 'EEPS' }] },
    ]},
    { type: 'all', name: 'Core Requirements', items: [
      'CEVE 101', 'CEVE 202', ['CEVE 211', 'MECH 211'], 'CEVE 310', ['CEVE 311', 'MECH 311'], 'CEVE 312', 'CEVE 315',
      'CEVE 363', 'CEVE 471', 'CEVE 481', 'CEVE 482',
    ]},
    { type: 'any', name: 'Area of Specialization', options: [
      { type: 'group', name: 'Area I - Environmental Engineering', requirements: [
        { type: 'course', name: 'Core Laboratory', options: ['CEVE 316'] },
        { type: 'choose', name: 'Area I Courses', count: 4, from: [...AREA_I, { dept: 'CEVE', min: 300 }] },
        { type: 'choose', name: 'Area II - Hydrology and Water Resources', count: 2, from: AREA_II },
        { type: 'choose', name: 'Area III - Structural Engineering and Mechanics', count: 2, from: AREA_III },
        { type: 'choose', name: 'Area IV - Urban Infrastructure, Reliability and Management', count: 2, from: AREA_IV },
      ]},
      { type: 'group', name: 'Area II - Hydrology and Water Resources', requirements: [
        { type: 'course', name: 'Core Laboratory', options: ['CEVE 316'] },
        { type: 'choose', name: 'Area II Courses', count: 4, from: [...AREA_II, { dept: 'CEVE', min: 300 }] },
        { type: 'choose', name: 'Area I - Environmental Engineering', count: 2, from: AREA_I },
        { type: 'choose', name: 'Area III - Structural Engineering and Mechanics', count: 2, from: AREA_III },
        { type: 'choose', name: 'Area IV - Urban Infrastructure, Reliability and Management', count: 2, from: AREA_IV },
      ]},
      { type: 'group', name: 'Area III - Structural Engineering and Mechanics', requirements: [
        { type: 'course', name: 'Core Laboratory', options: ['CEVE 472'] },
        { type: 'choose', name: 'Area III Courses', count: 4, from: [...AREA_III, { dept: ['CEVE', 'MECH'], min: 300 }] },
        { type: 'choose', name: 'Area I - Environmental Engineering', count: 2, from: AREA_I },
        { type: 'choose', name: 'Area II - Hydrology and Water Resources', count: 2, from: AREA_II },
        { type: 'choose', name: 'Area IV - Urban Infrastructure, Reliability and Management', count: 2, from: AREA_IV },
      ]},
      { type: 'group', name: 'Area IV - Urban Infrastructure, Reliability and Management', requirements: [
        { type: 'course', name: 'Core Laboratory', options: ['CEVE 472'] },
        { type: 'choose', name: 'Area IV Courses', count: 4, from: [...AREA_IV, { dept: 'CEVE', min: 300 }] },
        { type: 'choose', name: 'Area I - Environmental Engineering', count: 2, from: AREA_I },
        { type: 'choose', name: 'Area II - Hydrology and Water Resources', count: 2, from: AREA_II },
        { type: 'choose', name: 'Area III - Structural Engineering and Mechanics', count: 2, from: AREA_III },
      ]},
    ]},
  ],
};
