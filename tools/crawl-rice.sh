#!/bin/bash
# Downloads everything the Rice generators need into a work directory:
#   pages/     one HTML page per undergraduate program (General Announcements)
#   courses/   one HTML page per subject from the GA course listings
#   sched/     one HTML page per subject × term from the course schedule (courses.rice.edu)
# Usage: tools/crawl-rice.sh <workdir> [terms...]   (terms as Banner codes, e.g. 202710 = Fall 2026)
# Season prediction needs several years of history, so the default covers 13 terms. For an archived catalog year set
# GA_PREFIX=/archive/2024-2025 (program pages only matter then).
set -euo pipefail
WORK=${1:?workdir}; shift || true
TERMS=${*:-"202310 202320 202330 202410 202420 202430 202510 202520 202530 202610 202620 202630 202710"}
HOST=https://ga.rice.edu
GA=$HOST${GA_PREFIX:-}
mkdir -p "$WORK"/{pages,courses,sched}
cd "$WORK"

echo "== program pages"
: > depts.txt
for s in engineering natural-sciences social-sciences humanities business architecture music interdisciplinary; do
  { curl -sL "$GA/programs-study/departments-programs/$s/" |  grep -o "href=\"${GA_PREFIX:-}/programs-study/departments-programs/$s/[a-z0-9-]*/\"" || true; } | sed 's/href="//;s/"$//' >> depts.txt
done
sort -u depts.txt -o depts.txt
: > programs.txt
while read -r d; do
  { curl -sL "$HOST$d" | grep -o "href=\"${d}[a-z0-9-]*/\"" || true; } | sed 's/href="//;s/"$//' >> programs.txt
done < depts.txt
# undergraduate programs only: bachelor's degrees, concentrations, and minors
grep -E '(-ba|-bs|-bs[a-z]+|-barch|-barch-direct-entry|-bmus|-minor|-ba-[a-z-]+concentration|-bs-[a-z-]+concentration)/$' programs.txt \
  | { grep -vE '(-ad|certificate|mba|macc|mfin|phd|-ms[a-z]*|mstat|mcs|mds|business-administration)/$' || true; } | sort -u > ugprograms.txt
while read -r u; do
  f="pages/$(basename "$u").html"; [ -s "$f" ] || curl -sL "$HOST$u" -o "$f"
done < ugprograms.txt
echo "   $(ls pages | wc -l | tr -d ' ') program pages"

echo "== course listings"
curl -sL "$GA/programs-study/courses/" | grep -o 'href="/programs-study/courses/[a-z0-9-]*/"' | sed 's/href="//;s/"$//' | sort -u > course_depts.txt
while read -r d; do
  f="courses/$(basename "$d").html"; [ -s "$f" ] || curl -sL "$HOST$d" -o "$f"
done < course_depts.txt
echo "   $(ls courses | wc -l | tr -d ' ') subject pages"

echo "== schedule (terms: $TERMS)"
curl -sL 'https://courses.rice.edu/courses/!SWKSCAT.cat?p_action=CATALOG' -o cat_home.html
python3 - <<'PY'
import re
s = open('cat_home.html').read()
m = re.search(r'<select[^>]*name="p_subj"[^>]*>(.*?)</select>', s, re.S)
open('subjects.txt', 'w').write('\n'.join(re.findall(r'<option value="([A-Z]{2,5})"', m.group(1))) + '\n')
PY
for t in $TERMS; do for s in $(cat subjects.txt); do echo "$t $s"; done; done \
  | xargs -P 6 -n 2 sh -c 'f="sched/$1_$0.html"; [ -s "$f" ] || curl -sL -m 60 "https://courses.rice.edu/courses/!SWKSCAT.cat?p_action=QUERY&p_term=$0&p_subj=$1&p_mode=" -o "$f"'
echo "   $(ls sched | wc -l | tr -d ' ') subject-term pages"

echo "== Analyzing Diversity lists"
mkdir -p ad
for t in $TERMS; do
  f="ad/$t.html"; [ -s "$f" ] || curl -sL -m 60 "https://courses.rice.edu/courses/!SWKSCAT.cat?p_action=QUERY&p_term=$t&p_df=AD&p_mode=" -o "$f"
done
python3 - <<'PY'
import glob, html, json, re
codes = set()
for f in glob.glob('ad/*.html'):
    s = open(f, errors='ignore').read()
    for cell in re.findall(r'class="cls-crs"[^>]*>(.*?)</td>', s, re.S):
        t = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', cell))).strip()
        m = re.match(r'([A-Z]{2,5}) (\d{3}[A-Z]?) ', t + ' ')
        if m: codes.add(f'{m.group(1)} {m.group(2)}')
json.dump(sorted(codes), open('ad.json', 'w'))
print(f'   {len(codes)} Analyzing Diversity courses')
PY
