import programs from './programs.bundle.js'; // generated from programs/*.js by tools/gen-index.mjs
import crosslist from './crosslist.js';
import catalog from './catalog.js';
import sample from './sample.js';
import scheduleTerms from './schedule.js';
import sectionTerms, { generated as sectionDataDate } from './section-terms.js';

export default {
  id: 'rice',
  name: 'Rice University',
  shortName: 'Rice',
  catalogYear: '2026–2027',
  catalogUrl: 'https://ga.rice.edu/',
  defaultHours: 3,
  maxTermHours: 18, // most a student can take in a term without an overload approval
  // Hints for the transcript parser (see js/parser/transcript.js for defaults).
  transcript: {
    inProgress: /\b(COURSES?\s+IN\s+PROGRESS|IN[- ]PROGRESS)\b/i,
    transfer: /\b(TRANSFER\s+CREDIT|ADVANCED\s+PLACEMENT|AP\s+CREDIT|TEST\s+CREDIT)\b/i,
    institution: /\b(INSTITUTION\s+CREDIT)\b/i,
    ignore: /^TRAN \d/, // unarticulated transfer credit placeholders
  },
  sample,
  // Per-department course details (descriptions, prerequisites, offerings), fetched lazily by js/ui/coursecard.js.
  courseDataPath: 'data/rice/courses/',
  scheduleTerms,
  // Section-level schedule data (meeting times) per term, fetched lazily by js/ui/schedule.js.
  sectionDataPath: 'data/rice/schedule/',
  sectionTerms,
  sectionDataDate,
  // University-wide graduation requirements (General Announcements, Graduation Requirements).
  degree: {
    hours: 120, upperLevelHours: 48, upperLevel: 300,
    writing: { name: 'First-Year Writing Intensive Seminar', short: 'FWIS', from: [{ dept: 'FWIS' }] },
    activity: { name: 'Lifetime Physical Activity Program', short: 'LPAP', from: [{ dept: 'LPAP' }], maxHoursCounted: 4 },
    distribution: { groups: ['I', 'II', 'III'], courses: 3, minHours: 3, minDepartments: 2 },
    diversity: { name: 'Analyzing Diversity', short: 'AD', minHours: 3 },
  },
  programs,
  crosslist,
  catalog,
};
