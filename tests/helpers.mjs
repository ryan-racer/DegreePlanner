// A tiny synthetic school so engine and planner tests do not depend on Rice data.
export const school = {
  id: 'test', name: 'Test U', defaultHours: 3, maxTermHours: 18, degreeHours: 120,
  crosslist: { 'STAT 310': ['ECON 307'], 'ECON 307': ['STAT 310'] },
  catalog: {
    'CS 101': { title: 'INTRO', hours: 4 }, 'CS 201': { title: 'DATA STRUCTURES', hours: 4 }, 'CS 301': { title: 'ALGORITHMS', hours: 3 },
    'CS 310': { title: 'SYSTEMS', hours: 3 }, 'CS 401': { title: 'SENIOR DESIGN I', hours: 3 }, 'CS 402': { title: 'SENIOR DESIGN II', hours: 3 },
    'CS 350': { title: 'FALL ONLY TOPIC', hours: 3 }, 'CS 360': { title: 'SPRING ONLY TOPIC', hours: 3 }, 'MA 101': { title: 'CALC', hours: 3 },
    'STAT 310': { title: 'PROB', hours: 3 }, 'ECON 307': { title: 'PROB', hours: 3 },
  },
  scheduleTerms: ['202410', '202420', '202510', '202520', '202610', '202620'],
  sectionTerms: [],
};
export const details = {
  'CS 101': { o: ['202410', '202420', '202510', '202520', '202610', '202620'] },
  'CS 201': { pre: 'CS 101', o: ['202410', '202420', '202510', '202520', '202610', '202620'] },
  'CS 301': { pre: 'CS 201 and MA 101', o: ['202410', '202420', '202510', '202520', '202610', '202620'] },
  'CS 310': { pre: 'CS 201', o: ['202410', '202420', '202510', '202520', '202610', '202620'] },
  'CS 350': { o: ['202410', '202510', '202610'] },          // fall only
  'CS 360': { o: ['202420', '202520', '202620'] },          // spring only
  'CS 401': { pre: 'CS 301', o: ['202410', '202510', '202610'] },
  'CS 402': { pre: 'CS 401', o: ['202420', '202520', '202620'] },
  'MA 101': { o: ['202410', '202420', '202510', '202520', '202610', '202620'] },
};
export const loadDetails = async (code) => details[code] || null;
export const prog = (requirements, extra = {}) => ({ id: 'p', name: 'Program', degree: 'BS', kind: 'major', school: 'S', url: '', requirements, ...extra });
export const c = (code, status = 'completed', more = {}) => ({ code, status, ...more });
