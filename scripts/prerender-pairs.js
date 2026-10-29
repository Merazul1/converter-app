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

  // Under 60 chars title, under 150 chars description
  const pageTitle = `${pair.from} to ${pair.to}: Live Rates (0% Bank Fees) | CurrenFlow`;
  const pageDesc = `Convert ${pair.from} to ${pair.to} at live mid-market rates (0% bank fees). Real-time calculator and exchange charts on CurrenFlow.`;

  const pairHtml = renderPage(pairUrl, pageTitle, pageDesc);

  const pairDir = path.join(distDir, slug);
  if (!fs.existsSync(pairDir)) {
    fs.mkdirSync(pairDir, { recursive: true });
  }
  fs.writeFileSync(path.join(pairDir, 'index.html'), pairHtml, 'utf8');
}

console.log(`✓ Pre-rendered all ${POPULAR_PAIRS.length} currency pair pages.`);

// 2. Pre-render About Us Page (under 60 chars title, under 150 chars desc)
console.log('Pre-rendering /about page...');
const aboutUrl = 'https://www.currenflow.com/about';
const aboutTitle = 'About Us & Methodology | CurrenFlow';
const aboutDesc = 'CurrenFlow provides transparent mid-market exchange rates, central bank methodology, and consumer-first financial tools.';
const aboutHtml = renderPage(aboutUrl, aboutTitle, aboutDesc);

const aboutDir = path.join(distDir, 'about');
if (!fs.existsSync(aboutDir)) {
  fs.mkdirSync(aboutDir, { recursive: true });
}
fs.writeFileSync(path.join(aboutDir, 'index.html'), aboutHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'about.html'), aboutHtml, 'utf8');
console.log('✓ Pre-rendered /about and about.html');

// 3. Pre-render Guides Knowledge Base Hub Page (under 60 chars title, under 150 chars desc)
console.log('Pre-rendering /guides hub page...');
const guidesUrl = 'https://www.currenflow.com/guides';
const guidesTitle = 'Forex & Currency Transfer Guides | CurrenFlow';
const guidesDesc = 'Expert foreign exchange guides: avoid hidden commercial bank markups, understand central bank rates, and save on global transfers.';
const guidesHtml = renderPage(guidesUrl, guidesTitle, guidesDesc);

const guidesDir = path.join(distDir, 'guides');
if (!fs.existsSync(guidesDir)) {
  fs.mkdirSync(guidesDir, { recursive: true });
}
fs.writeFileSync(path.join(guidesDir, 'index.html'), guidesHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'guides.html'), guidesHtml, 'utf8');
console.log('✓ Pre-rendered /guides and guides.html');

// 4. Pre-render 5 In-Depth Financial Guide Articles (all titles < 60 chars, descriptions < 150 chars)
const GUIDES = [
  {
    slug: 'hidden-bank-exchange-rate-fees',
    title: 'Hidden Bank Forex Fees: The 3%–5% Markup | CurrenFlow',
    summary: 'How commercial banks charge 3%–5% in hidden exchange rate markups and practical strategies to eliminate foreign transaction fees on transfers.'
  },
  {
    slug: 'mid-market-vs-retail-exchange-rates',
    title: 'Mid-Market vs Retail Exchange Rates Guide | CurrenFlow',
    summary: 'Understand the difference between the true mid-market exchange rate and retail markups quoted by banks, airport kiosks, and cards.'
  },
  {
    slug: 'how-central-banks-impact-forex',
    title: 'How Central Banks Impact Exchange Rates | CurrenFlow',
    summary: 'How central bank interest rate decisions (Fed, ECB, BoE, RBI) influence foreign exchange rates and your purchasing power.'
  },
  {
    slug: 'international-money-transfer-mistakes',
    title: '7 Costly Money Transfer Mistakes to Avoid | CurrenFlow',
    summary: 'Avoid expensive hidden currency conversion fees, SWIFT intermediary deductions, and poor transfer timing with expert tips.'
  },
  {
    slug: 'understanding-currency-pairs-forex-spreads',
    title: 'Currency Pairs, Forex Spreads & Pips | CurrenFlow',
    summary: 'A clear guide to currency pair notation, base vs quote currencies, pips, and calculating real bid-ask forex spreads.'
  }
];

console.log(`Pre-rendering ${GUIDES.length} financial guide articles...`);

for (const guide of GUIDES) {
  const guideUrl = `https://www.currenflow.com/guides/${guide.slug}`;
  const guideArticleHtml = renderPage(guideUrl, guide.title, guide.summary);

  const guideArticleDir = path.join(distDir, 'guides', guide.slug);
  if (!fs.existsSync(guideArticleDir)) {
    fs.mkdirSync(guideArticleDir, { recursive: true });
  }
  fs.writeFileSync(path.join(guideArticleDir, 'index.html'), guideArticleHtml, 'utf8');
}

console.log(`✓ Successfully pre-rendered all ${GUIDES.length} guide articles!`);
console.log('All static pages generated with perfect self-canonical tags and optimal SEO lengths.');
