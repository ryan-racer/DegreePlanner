#!/usr/bin/env python3
"""From GA course listing pages, writes catalog.json (code -> [title, hours]) and descriptions.json
(code -> {d, dist, pre, level, type, grade, restr, x}). Usage: tools/extract-course-details.py <workdir>"""
import glob, html, json, os, re, sys
work = sys.argv[1]
clean = lambda t: re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', t))).strip()
catalog, desc = {}, {}
for f in glob.glob(os.path.join(work, 'courses', '*.html')):
    s = open(f, errors='ignore').read()
    for blk in re.findall(r'<div class="courseblock">(.*?)</div>', s, re.S):
        t = re.search(r'courseblocktitle[^>]*><strong>(.*?)</strong>', blk, re.S)
        if not t: continue
        m = re.match(r'([A-Z]{2,5})\s+(\d{3}[A-Z]?)\s*-\s*(.*)$', clean(t.group(1)))
        if not m: continue
        code = f'{m.group(1)} {m.group(2)}'
        ch = re.search(r'Credit Hours?:\s*</strong>\s*([\d.]+)', blk)
        catalog[code] = [m.group(3).strip(), float(ch.group(1)) if ch else 3]
        field = lambda name: (lambda mm: clean(mm.group(1)) if mm else '')(re.search(r'<strong>' + name + r':\s*</strong>(.*?)</p>', blk, re.S))
        rec = {'d': field('Description')}
        for k, name in [('dist', 'Distribution Group'), ('pre', 'Prerequisite\\(s\\)'), ('co', 'Corequisites?'), ('level', 'Course Level'), ('type', 'Course Type'), ('grade', 'Grade Mode'), ('restr', 'Restrictions')]:
            v = field(name)
            if v: rec[k] = v
        x = re.search(r'Cross-list(?:ed)?:\s*</strong>(.*?)</p>', blk, re.S)
        if x: rec['x'] = clean(x.group(1))
        desc[code] = rec
json.dump(catalog, open(os.path.join(work, 'catalog.json'), 'w'))
json.dump(desc, open(os.path.join(work, 'descriptions.json'), 'w'))
print(f'{len(catalog)} courses -> catalog.json, descriptions.json')
