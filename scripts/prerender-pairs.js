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

function renderPage(pageUrl, title, description) {
  let html = baseHtml;
  html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${title}" />`);
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${description}" />`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${pageUrl}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${pageUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta property="twitter:url" content=".*?" \/>/i, `<meta property="twitter:url" content="${pageUrl}" />`);
  html = html.replace(/<meta property="twitter:title" content=".*?" \/>/i, `<meta property="twitter:title" content="${title}" />`);
  html = html.replace(/<meta property="twitter:description" content=".*?" \/>/i, `<meta property="twitter:description" content="${description}" />`);
  return html;
}

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

  const pairHtml = renderPage(pairUrl, pageTitle, pageDesc);

  const pairDir = path.join(distDir, slug);
  if (!fs.existsSync(pairDir)) {
    fs.mkdirSync(pairDir, { recursive: true });
  }
  fs.writeFileSync(path.join(pairDir, 'index.html'), pairHtml, 'utf8');
}

console.log(`✓ Pre-rendered all ${POPULAR_PAIRS.length} currency pair pages.`);

// 2. Pre-render About Us Page
console.log('Pre-rendering /about page...');
const aboutUrl = 'https://www.currenflow.com/about';
const aboutTitle = 'About Us & Data Methodology - CurrenFlow';
const aboutDesc = 'Learn about CurrenFlow’s mission to provide 100% transparent mid-market exchange rates, our central bank data aggregation methodology, and editorial standards.';
const aboutHtml = renderPage(aboutUrl, aboutTitle, aboutDesc);

const aboutDir = path.join(distDir, 'about');
if (!fs.existsSync(aboutDir)) {
  fs.mkdirSync(aboutDir, { recursive: true });
}
fs.writeFileSync(path.join(aboutDir, 'index.html'), aboutHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'about.html'), aboutHtml, 'utf8');
console.log('✓ Pre-rendered /about and about.html');

// 3. Pre-render Guides Knowledge Base Hub Page
console.log('Pre-rendering /guides hub page...');
const guidesUrl = 'https://www.currenflow.com/guides';
const guidesTitle = 'Currency & Forex Guides - CurrenFlow Knowledge Base';
const guidesDesc = 'Explore comprehensive guides on foreign exchange rates, avoiding hidden commercial bank fees, understanding central bank policies, and saving on overseas transfers.';
const guidesHtml = renderPage(guidesUrl, guidesTitle, guidesDesc);

const guidesDir = path.join(distDir, 'guides');
if (!fs.existsSync(guidesDir)) {
  fs.mkdirSync(guidesDir, { recursive: true });
}
fs.writeFileSync(path.join(guidesDir, 'index.html'), guidesHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'guides.html'), guidesHtml, 'utf8');
console.log('✓ Pre-rendered /guides and guides.html');

// 4. Pre-render 5 In-Depth Financial Guide Articles
const GUIDES = [
  {
    slug: 'hidden-bank-exchange-rate-fees',
    title: 'The Hidden Cost of Foreign Exchange: How Commercial Banks Charge 3%–5% in Secret Markups',
    summary: 'Discover how traditional banks inflate retail exchange rates beyond the mid-market rate and learn actionable strategies to eliminate unnecessary foreign transaction fees.'
  },
  {
    slug: 'mid-market-vs-retail-exchange-rates',
    title: 'Mid-Market vs. Retail Exchange Rates: A Complete Beginner’s Guide',
    summary: 'Understand the difference between the true interbank exchange rate and the retail rates quoted by banks, airport kiosks, and credit cards.'
  },
  {
    slug: 'how-central-banks-impact-forex',
    title: 'How Central Banks Influence Everyday Exchange Rates (Fed, ECB, BoE, RBI)',
    summary: 'A clear explanation of how interest rate hikes, inflation targeting, and quantitative easing directly affect foreign exchange rates and your purchasing power.'
  },
  {
    slug: 'international-money-transfer-mistakes',
    title: 'Top 7 Costly Mistakes When Transferring Money Abroad',
    summary: 'Avoid expensive hidden currency conversion fees, SWIFT intermediary deductions, and poor transfer timing with these practical expert recommendations.'
  },
  {
    slug: 'understanding-currency-pairs-forex-spreads',
    title: 'Understanding Currency Pairs, Forex Spreads, and Pips',
    summary: 'Learn the foundational mechanics of base and quote currencies, bid-ask spreads, and pip valuations in global foreign currency markets.'
  }
];

console.log(`Pre-rendering ${GUIDES.length} financial guide articles...`);

for (const guide of GUIDES) {
  const guideUrl = `https://www.currenflow.com/guides/${guide.slug}`;
  const guideTitle = `${guide.title} | CurrenFlow Guides`;
  const guideArticleHtml = renderPage(guideUrl, guideTitle, guide.summary);

  const guideArticleDir = path.join(distDir, 'guides', guide.slug);
  if (!fs.existsSync(guideArticleDir)) {
    fs.mkdirSync(guideArticleDir, { recursive: true });
  }
  fs.writeFileSync(path.join(guideArticleDir, 'index.html'), guideArticleHtml, 'utf8');
}

console.log(`✓ Successfully pre-rendered all ${GUIDES.length} guide articles!`);
console.log('All static pages generated with perfect self-canonical tags.');
