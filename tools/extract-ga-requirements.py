import re, html, json, os, glob
os.makedirs('raw', exist_ok=True)
def clean(t):
    t = re.sub(r'<sup>(.*?)</sup>', r'[fn\1]', t)
    t = re.sub(r'<[^>]+>', ' ', t)
    t = html.unescape(t)
    return re.sub(r'\s+', ' ', t).strip()
xlist = {}
for f in sorted(glob.glob('pages/*.html')):
    slug = os.path.basename(f)[:-5]
    s = open(f).read()
    title = clean(re.search(r'<h1[^>]*class="page-title"[^>]*>(.*?)</h1>', s, re.S).group(1)) if re.search(r'<h1[^>]*class="page-title"', s) else slug
    m = re.search(r'id="requirementstextcontainer"(.*?)(<div id="[a-z]+textcontainer"|<footer|$)', s, re.S)
    seg = m.group(1) if m else ''
    # Also grab policies/other tabs headings for context
    out = {'slug': slug, 'title': title, 'url': f'https://ga.rice.edu/programs-study/departments-programs/', 'tables': [], 'footnotes': [], 'text': []}
    # tables
    for tbl in re.findall(r'<table[^>]*class="sc_courselist"[^>]*>(.*?)</table>', seg, re.S):
        rows = []
        for tr in re.findall(r'<tr[^>]*?(?:class="([^"]*)")?[^>]*>(.*?)</tr>', tbl, re.S):
            cls, body = tr
            if 'hidden' in cls: continue
            cells = re.findall(r'<td[^>]*>(.*?)</td>', body, re.S)
            codes = re.findall(r'class="code[^"]*"[^>]*>(.*?)</a>|<span class="code">(.*?)</span>', body, re.S)
            codecell = clean(cells[0]) if cells else ''
            titlecell = clean(cells[1]) if len(cells) > 1 else ''
            hours = clean(cells[2]) if len(cells) > 2 else ''
            indent = 'commentindent' in body or 'blockindent' in body
            rtype = 'course'
            if 'areaheader' in cls: rtype = 'header'
            elif 'areasubheader' in cls: rtype = 'subheader'
            elif 'orclass' in cls: rtype = 'or'
            elif 'listsum' in cls: rtype = 'sum'
            elif re.search(r'class="courselistcomment', body): rtype = 'comment'
            # split codes on ' / ' for cross-lists
            cl = [c.strip() for c in re.split(r'\s*/\s*', codecell.replace('or ', '').strip()) if re.match(r'^[A-Z]{3,4} \d{3}[A-Z]?$', c.strip())]
            if len(cl) > 1:
                for c in cl: xlist.setdefault(c, set()).update(x for x in cl if x != c)
            rows.append({'type': rtype, 'codes': cl, 'text': codecell if not cl else '', 'title': titlecell, 'hours': hours, 'indent': indent})
        out['tables'].append(rows)
    for tb in re.findall(r'<table[^>]*class="sc_footnotes"[^>]*>(.*?)</table>', seg, re.S):
        for sym, note in re.findall(r'<td[^>]*class="symcol"[^>]*>(.*?)</td>\s*<td[^>]*class="notecol"[^>]*>(.*?)</td>', tb, re.S):
            out['footnotes'].append({'n': clean(sym), 'text': clean(note)})
    seg = re.sub(r'<table[^>]*class="sc_footnotes".*?</table>', '', seg, flags=re.S)
    # paragraph text in requirements tab (rules like "at least 6 courses must be 300+")
    for p in re.findall(r'<p>(.*?)</p>', seg, re.S):
        t = clean(p)
        if t: out['text'].append(t)
    # find canonical url
    for line in open('ugfinal.txt'):
        if line.strip().endswith('/'+slug+'/'): out['url'] = 'https://ga.rice.edu' + line.strip()
    json.dump(out, open(f'raw/{slug}.json', 'w'), indent=1)
json.dump({k: sorted(v) for k, v in sorted(xlist.items())}, open('crosslist.json', 'w'), indent=1)
print(len(glob.glob('raw/*.json')), 'programs;', len(xlist), 'cross-listed codes')
