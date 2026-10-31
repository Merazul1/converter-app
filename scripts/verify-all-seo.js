import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

let totalPages = 0;
let errors = 0;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (entry.name === 'index.html') {
      totalPages++;
      const content = fs.readFileSync(full, 'utf8');
      const title = (content.match(/<title>(.*?)<\/title>/) || [])[1] || '';
      const desc = (content.match(/<meta name="description" content="(.*?)" \/>/) || [])[1] || '';
      const canonical = (content.match(/<link rel="canonical" href="(.*?)" \/>/) || [])[1] || '';

      if (title.length > 60) {
        console.error(`[FAIL TITLE > 60] ${full}: ${title.length} chars -> "${title}"`);
        errors++;
      }
      if (desc.length > 160) {
        console.error(`[FAIL DESC > 160] ${full}: ${desc.length} chars -> "${desc}"`);
        errors++;
      }
      if (!canonical) {
        console.error(`[FAIL CANONICAL MISSING] ${full}`);
        errors++;
      }
    }
  }
}

scanDir(distDir);
console.log(`Scanned ${totalPages} HTML files in dist/. Errors found: ${errors}`);
if (errors === 0) {
  console.log('✓ All HTML files have 100% compliant Titles (<= 60 chars) and Descriptions (<= 160 chars)!');
}
