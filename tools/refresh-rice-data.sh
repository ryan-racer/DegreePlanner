#!/bin/bash
# Rebuilds the generated Rice data from a crawl. Program definition files are authored by hand from raw/*.json
# (see docs/PROGRAM_FORMAT.md) and are NOT overwritten here.
# Usage: tools/refresh-rice-data.sh <workdir> [terms...]
set -euo pipefail
WORK=${1:?workdir}; shift || true
ROOT=$(cd "$(dirname "$0")/.." && pwd)
"$ROOT/tools/crawl-rice.sh" "$WORK" "$@"
cd "$ROOT"
python3 tools/extract-course-details.py "$WORK"
( cd "$WORK" && cp ugprograms.txt ugfinal.txt && python3 "$ROOT/tools/extract-ga-requirements.py" )   # raw/*.json + crosslist.json for authoring
node tools/gen-catalog.mjs "$WORK/catalog.json"
node tools/gen-crosslist.mjs "$WORK/crosslist.json"
python3 tools/gen-course-data.py "$WORK/descriptions.json" "$WORK/sched"
python3 tools/gen-schedule.py "$WORK/sched" "$WORK/descriptions.json" $(ls "$WORK/sched" | sed -E 's/.*_([0-9]{6})\.html/\1/' | sort -u)
node tools/gen-index.mjs rice
node tools/validate.mjs && node tools/smoke.mjs
echo "Done. Review raw/*.json in $WORK for catalog changes that need program-file edits."
