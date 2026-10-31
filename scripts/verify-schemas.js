import fs from 'fs';
import path from 'path';

function checkFile(relPath) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.error('File missing:', relPath);
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const descMatch = content.match(/<meta name="description" content="(.*?)" \/>/);
  const canonicalMatch = content.match(/<link rel="canonical" href="(.*?)" \/>/);
  
  console.log(`\n========================================`);
  console.log(`File: ${relPath}`);
  console.log(`Title (${titleMatch ? titleMatch[1].length : 0} chars): ${titleMatch ? titleMatch[1] : 'NONE'}`);
  console.log(`Description (${descMatch ? descMatch[1].length : 0} chars): ${descMatch ? descMatch[1] : 'NONE'}`);
  console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : 'NONE'}`);

  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  let count = 0;
  while ((match = regex.exec(content)) !== null) {
    count++;
    try {
      const parsed = JSON.parse(match[1]);
      const types = Array.isArray(parsed) ? parsed.map(p => p['@type']).join(', ') : parsed['@type'];
      console.log(`  ✓ Schema #${count}: [${types}]`);
    } catch (e) {
      console.error(`  ✗ Schema #${count} JSON parse error:`, e.message);
    }
  }
}

checkFile('dist/index.html');
checkFile('dist/usd-to-eur/index.html');
checkFile('dist/eur-to-usd/index.html');
checkFile('dist/about/index.html');
checkFile('dist/guides/index.html');
checkFile('dist/guides/hidden-bank-exchange-rate-fees/index.html');
