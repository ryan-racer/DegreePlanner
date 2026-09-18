// PDF → text using pdf.js (loaded on demand from cdnjs). Reconstructs lines from positioned text runs.

const PDFJS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs';
const WORKER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';

let pdfjsPromise;
function loadPdfJs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import(PDFJS_URL)
      .then((m) => { m.GlobalWorkerOptions.workerSrc = WORKER_URL; return m; })
      .catch((e) => { pdfjsPromise = null; throw new Error(`could not load the PDF reader (${e.message || 'network error'}). Check your connection, or paste the transcript text instead.`); });
  }
  return pdfjsPromise;
}

export async function pdfToText(arrayBuffer, onProgress) {
  const pdfjs = await loadPdfJs();
  let doc;
  try {
    doc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  } catch (e) {
    if (/password/i.test(e?.name || e?.message || '')) throw new Error('this PDF is password-protected. Remove the password or paste the transcript text instead.');
    throw new Error(`the file could not be opened as a PDF (${e.message || e}).`);
  }
  const pages = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    pages.push(itemsToLines(content.items));
    onProgress?.(p, doc.numPages);
  }
  const text = pages.join('\n\n');
  if (text.replace(/\s+/g, '').length < 40) throw new Error('this PDF has no selectable text, so it is probably a scanned image. Paste the text of your transcript instead.');
  return text;
}

function itemsToLines(items) {
  const rows = [];
  for (const it of items) {
    if (!it.str || !it.str.trim()) continue;
    const x = it.transform[4], y = it.transform[5];
    const h = Math.max(it.height || 0, 6);
    let row = rows.find((r) => Math.abs(r.y - y) <= h * 0.5);
    if (!row) { row = { y, items: [] }; rows.push(row); }
    row.items.push({ x, str: it.str, w: it.width || 0 });
  }
  rows.sort((a, b) => b.y - a.y);
  return rows.map((r) => {
    r.items.sort((a, b) => a.x - b.x);
    let out = '', lastEnd = null;
    for (const it of r.items) {
      if (lastEnd != null && it.x - lastEnd > 1.5) out += ' ';
      out += it.str;
      lastEnd = it.x + it.w;
    }
    return out.replace(/\s+/g, ' ').trim();
  }).join('\n');
}
