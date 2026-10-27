import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const CURRENCY_NAMES = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  INR: 'Indian Rupee',
  BDT: 'Bangladeshi Taka',
  AED: 'UAE Dirham',
  SAR: 'Saudi Riyal',
  SGD: 'Singapore Dollar',
  HKD: 'Hong Kong Dollar',
  NZD: 'New Zealand Dollar',
  MXN: 'Mexican Peso',
  BRL: 'Brazilian Real',
  ZAR: 'South African Rand',
  TRY: 'Turkish Lira',
  KRW: 'South Korean Won',
  PKR: 'Pakistani Rupee',
  BTC: 'Bitcoin',
  ETH: 'Ethereum'
};

const POPULAR_PAIRS = [
  { from: 'USD', to: 'EUR' },
  { from: 'EUR', to: 'USD' },
  { from: 'USD', to: 'GBP' },
  { from: 'GBP', to: 'USD' },
  { from: 'USD', to: 'INR' },
  { from: 'USD', to: 'BDT' },
  { from: 'USD', to: 'CAD' },
  { from: 'CAD', to: 'USD' },
  { from: 'USD', to: 'AUD' },
  { from: 'AUD', to: 'USD' },
  { from: 'USD', to: 'JPY' },
  { from: 'JPY', to: 'USD' },
  { from: 'USD', to: 'AED' },
  { from: 'AED', to: 'USD' },
  { from: 'USD', to: 'SAR' },
  { from: 'SAR', to: 'USD' },
  { from: 'USD', to: 'CNY' },
  { from: 'CNY', to: 'USD' },
  { from: 'USD', to: 'PKR' },
  { from: 'USD', to: 'SGD' },
  { from: 'USD', to: 'CHF' },
  { from: 'EUR', to: 'GBP' },
  { from: 'GBP', to: 'EUR' },
  { from: 'EUR', to: 'CHF' },
  { from: 'USD', to: 'BRL' },
  { from: 'USD', to: 'MXN' },
  { from: 'USD', to: 'KRW' },
  { from: 'USD', to: 'TRY' },
  { from: 'USD', to: 'BTC' },
  { from: 'BTC', to: 'USD' }
];

console.log(`Pre-rendering ${POPULAR_PAIRS.length} popular currency pair pages...`);

for (const pair of POPULAR_PAIRS) {
  const slug = `${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`;
  const pairUrl = `https://www.currenflow.com/${slug}`;
  const fromName = CURRENCY_NAMES[pair.from] || pair.from;
  const toName = CURRENCY_NAMES[pair.to] || pair.to;

  const pageTitle = `${pair.from} to ${pair.to}: Live Mid-Market Exchange Rate (0% Bank Fees) | CurrenFlow`;
  const pageDesc = `Convert ${pair.from} (${fromName}) to ${pair.to} (${toName}) at live mid-market rates (0% bank fees). Check real-time exchange tables and calculate conversions on CurrenFlow.`;

  let pairHtml = baseHtml;

  // Replace Title & Meta Title
  pairHtml = pairHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${pageTitle}</title>`
  );
  pairHtml = pairHtml.replace(
    /<meta name="title" content=".*?" \/>/i,
    `<meta name="title" content="${pageTitle}" />`
  );

  // Replace Description
  pairHtml = pairHtml.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${pageDesc}" />`
  );

  // Replace Canonical Link (CRITICAL: self-canonical)
  pairHtml = pairHtml.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${pairUrl}" />`
  );

  // Replace Open Graph / Facebook tags
  pairHtml = pairHtml.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${pairUrl}" />`
  );
  pairHtml = pairHtml.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${pageTitle}" />`
  );
  pairHtml = pairHtml.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${pageDesc}" />`
  );

  // Replace Twitter tags
  pairHtml = pairHtml.replace(
    /<meta property="twitter:url" content=".*?" \/>/i,
    `<meta property="twitter:url" content="${pairUrl}" />`
  );
  pairHtml = pairHtml.replace(
    /<meta property="twitter:title" content=".*?" \/>/i,
    `<meta property="twitter:title" content="${pageTitle}" />`
  );
  pairHtml = pairHtml.replace(
    /<meta property="twitter:description" content=".*?" \/>/i,
    `<meta property="twitter:description" content="${pageDesc}" />`
  );

  // Write to dist/${slug}/index.html
  const pairDir = path.join(distDir, slug);
  if (!fs.existsSync(pairDir)) {
    fs.mkdirSync(pairDir, { recursive: true });
  }
  fs.writeFileSync(path.join(pairDir, 'index.html'), pairHtml, 'utf8');
}

console.log(`✓ Successfully pre-rendered all ${POPULAR_PAIRS.length} currency pair pages with self-canonical tags!`);
