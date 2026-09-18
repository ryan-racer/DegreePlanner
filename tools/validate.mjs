// Validates program definition files. Usage: node tools/validate.mjs [js/schools/rice/programs/*.js]
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const CODE = /^[A-Z]{2,5} \d{3}[A-Z]?$/;
const NODE_TYPES = new Set(['course', 'all', 'choose', 'hours', 'any', 'group']);
let errors = 0;
const err = (f, m) => { errors++; console.log(`✗ ${f}: ${m}`); };

function checkSpec(f, s, path) {
  if (typeof s === 'string') { if (!CODE.test(s)) err(f, `${path}: bad course code "${s}" (want e.g. "COMP 140")`); return; }
  if (!s || typeof s !== 'object') { err(f, `${path}: spec must be a string or object`); return; }
  const keys = Object.keys(s);
  for (const k of keys) if (!['dept', 'min', 'max', 'exclude', 'courses', 'label'].includes(k)) err(f, `${path}: unknown spec key "${k}"`);
  if (s.dept != null) for (const d of [].concat(s.dept)) if (d !== '*' && !/^[A-Z]{2,5}$/.test(d)) err(f, `${path}: bad dept "${d}"`);
  for (const c of s.exclude || []) if (!CODE.test(c)) err(f, `${path}: bad exclude code "${c}"`);
  for (const c of s.courses || []) if (!CODE.test(c)) err(f, `${path}: bad courses code "${c}"`);
  if (s.dept == null && !s.courses) err(f, `${path}: pattern spec needs dept or courses`);
}
function checkNode(f, n, path) {
  if (!n || typeof n !== 'object') return err(f, `${path}: node must be an object`);
  if (!NODE_TYPES.has(n.type)) return err(f, `${path}: unknown node type "${n.type}"`);
  if (n.type !== 'course' && !n.name) err(f, `${path}: ${n.type} node needs a name`);
  if (n.type === 'course') { if (!Array.isArray(n.options) || !n.options.length) err(f, `${path}: course needs options[]`); else n.options.forEach((s, i) => checkSpec(f, s, `${path}.options[${i}]`)); }
  if (n.type === 'all') { if (!Array.isArray(n.items) || !n.items.length) err(f, `${path}: all needs items[]`); else n.items.forEach((slot, i) => [].concat(slot).forEach((s, j) => checkSpec(f, s, `${path}.items[${i}][${j}]`))); }
  if (n.type === 'choose') { if (!Number.isInteger(n.count) || n.count < 1) err(f, `${path}: choose needs integer count >= 1`); if (!Array.isArray(n.from) || !n.from.length) err(f, `${path}: choose needs from[]`); else n.from.forEach((s, i) => checkSpec(f, s, `${path}.from[${i}]`)); }
  if (n.type === 'choose' || n.type === 'hours') {
    if (n.atLeast != null) {
      if (!Array.isArray(n.atLeast)) err(f, `${path}: atLeast must be an array`);
      else {
        n.atLeast.forEach((q, i) => { if (!Number.isInteger(q.count) || q.count < 1) err(f, `${path}.atLeast[${i}]: needs integer count >= 1`); if (n.type === 'choose' && q.count > n.count) err(f, `${path}.atLeast[${i}]: count (${q.count}) exceeds the node's count (${n.count})`); if (!Array.isArray(q.from) || !q.from.length) err(f, `${path}.atLeast[${i}]: needs from[]`); else q.from.forEach((s, j) => checkSpec(f, s, `${path}.atLeast[${i}].from[${j}]`)); });
      }
    }
    if (n.exclusive != null) {
      if (!Array.isArray(n.exclusive) || n.exclusive.some((g) => !Array.isArray(g) || g.length < 2)) err(f, `${path}: exclusive must be an array of code arrays (2+ codes each)`);
      else n.exclusive.flat().forEach((c) => { if (!CODE.test(c)) err(f, `${path}.exclusive: bad code "${c}"`); });
    }
  }
  if (n.type === 'hours') { if (!(n.hours > 0)) err(f, `${path}: hours needs hours > 0`); if (!Array.isArray(n.from) || !n.from.length) err(f, `${path}: hours needs from[]`); else n.from.forEach((s, i) => checkSpec(f, s, `${path}.from[${i}]`)); }
  if (n.type === 'any') { if (!Array.isArray(n.options) || n.options.length < 2) err(f, `${path}: any needs 2+ options`); else n.options.forEach((c, i) => checkNode(f, c, `${path}.options[${i}]`)); }
  if (n.type === 'group') { if (!Array.isArray(n.requirements) || !n.requirements.length) err(f, `${path}: group needs requirements[]`); else n.requirements.forEach((c, i) => checkNode(f, c, `${path}.requirements[${i}]`)); }
}

const args = process.argv.slice(2);
const files = args.length ? args : readdirSync('js/schools/rice/programs').filter((f) => f.endsWith('.js') && f !== 'index.js').map((f) => `js/schools/rice/programs/${f}`);
const ids = new Set();
for (const f of files) {
  let mod;
  try { mod = (await import(pathToFileURL(resolve(f)).href)).default; } catch (e) { err(f, `failed to import: ${e.message}`); continue; }
  if (!mod || typeof mod !== 'object') { err(f, 'no default export object'); continue; }
  for (const k of ['id', 'name', 'degree', 'kind', 'school', 'url']) if (typeof mod[k] !== 'string' || !mod[k]) err(f, `missing string field "${k}"`);
  if (!['major', 'minor', 'certificate'].includes(mod.kind)) err(f, `kind must be major|minor|certificate`);
  if (mod.hours != null && !(mod.hours > 0)) err(f, 'hours must be a positive number');
  if (mod.notes && !Array.isArray(mod.notes)) err(f, 'notes must be an array of strings');
  if (ids.has(mod.id)) err(f, `duplicate id ${mod.id}`); ids.add(mod.id);
  if (!Array.isArray(mod.requirements) || !mod.requirements.length) err(f, 'requirements[] is required'); else mod.requirements.forEach((n, i) => checkNode(f, n, `requirements[${i}]`));
  if (mod.degreeHours != null && !(mod.degreeHours >= 60)) err(f, 'degreeHours must be a number >= 60');
  if (mod.constraints != null) {
    if (!Array.isArray(mod.constraints)) err(f, 'constraints must be an array');
    else mod.constraints.forEach((k, i) => {
      const at = `constraints[${i}]`;
      if (!['atLeast', 'atMost'].includes(k.type)) err(f, `${at}: type must be atLeast or atMost`);
      if (!((Number.isInteger(k.count) && k.count >= 0) || k.hours >= 0)) err(f, `${at}: needs count or hours`);
      if (!k.label) err(f, `${at}: needs a label`);
      if (!Array.isArray(k.from) || !k.from.length) err(f, `${at}: needs from[]`); else k.from.forEach((sp, j) => checkSpec(f, sp, `${at}.from[${j}]`));
      if (k.among != null && (!Array.isArray(k.among) || k.among.some((a) => !/^\d+(\.(o?\d+))*$/.test(a)))) err(f, `${at}: among must be node paths like "1" or "0.2"`);
    });
  }
}
console.log(errors ? `${errors} error(s) in ${files.length} file(s)` : `✓ ${files.length} program file(s) valid`);
process.exit(errors ? 1 : 0);
