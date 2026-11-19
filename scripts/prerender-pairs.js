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

function renderPage(pageUrl, title, description, extraHead = '', bodyReplacer = null) {
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
  if (extraHead) {
    html = html.replace('</head>', `${extraHead}\n  </head>`);
  }
  if (typeof bodyReplacer === 'function') {
    html = bodyReplacer(html);
  }
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

// Real, stable facts per currency — used to make each pair page actually
// say something unique instead of swapping a code into identical sentences.
const CURRENCY_META = {
  USD: { issuer: 'the Federal Reserve', region: 'United States', crypto: false },
  EUR: { issuer: 'the European Central Bank', region: 'the Eurozone', crypto: false },
  GBP: { issuer: 'the Bank of England', region: 'the United Kingdom', crypto: false },
  JPY: { issuer: 'the Bank of Japan', region: 'Japan', crypto: false },
  CAD: { issuer: 'the Bank of Canada', region: 'Canada', crypto: false },
  AUD: { issuer: 'the Reserve Bank of Australia', region: 'Australia', crypto: false },
  CHF: { issuer: 'the Swiss National Bank', region: 'Switzerland', crypto: false },
  CNY: { issuer: "the People's Bank of China", region: 'mainland China', crypto: false },
  INR: { issuer: 'the Reserve Bank of India', region: 'India', crypto: false },
  BDT: { issuer: 'Bangladesh Bank', region: 'Bangladesh', crypto: false },
  AED: { issuer: 'the Central Bank of the UAE', region: 'the United Arab Emirates', crypto: false },
  SAR: { issuer: 'the Saudi Central Bank (SAMA)', region: 'Saudi Arabia', crypto: false },
  SGD: { issuer: 'the Monetary Authority of Singapore', region: 'Singapore', crypto: false },
  HKD: { issuer: 'the Hong Kong Monetary Authority', region: 'Hong Kong', crypto: false },
  NZD: { issuer: 'the Reserve Bank of New Zealand', region: 'New Zealand', crypto: false },
  MXN: { issuer: 'the Bank of Mexico', region: 'Mexico', crypto: false },
  BRL: { issuer: 'the Central Bank of Brazil', region: 'Brazil', crypto: false },
  ZAR: { issuer: 'the South African Reserve Bank', region: 'South Africa', crypto: false },
  TRY: { issuer: 'the Central Bank of the Republic of Turkey', region: 'Turkey', crypto: false },
  KRW: { issuer: 'the Bank of Korea', region: 'South Korea', crypto: false },
  PKR: { issuer: 'the State Bank of Pakistan', region: 'Pakistan', crypto: false },
  BTC: { issuer: 'no central authority — it is a decentralized network', region: 'a global peer-to-peer network', crypto: true },
  ETH: { issuer: 'no central authority — it is a decentralized network', region: 'a global peer-to-peer network', crypto: true }
};

// Short, pair-specific "why people convert this" lines. Generic, non-fabricated
// context (these are well-known, long-standing remittance/trade corridors) so
// each page gets a distinct opening instead of the same boilerplate.
const PAIR_CONTEXT = {
  'usd-inr': 'one of the largest remittance corridors in the world, driven by Indian professionals and students based in the US',
  'usd-bdt': 'a major remittance corridor for the Bangladeshi diaspora working abroad',
  'usd-pkr': 'a widely used corridor for remittances from Pakistani expatriates in North America',
  'usd-mxn': 'one of the highest-volume remittance corridors globally, linked to cross-border labor and trade between the US and Mexico',
  'usd-cny': 'closely watched by importers and exporters due to the scale of US-China trade',
  'usd-aed': 'commonly used by expatriates and businesses operating in or sending money to the UAE',
  'usd-sar': 'relevant to the large expatriate workforce remitting earnings from Saudi Arabia',
  'eur-gbp': 'one of the most actively traded pairs in Europe, reflecting UK-Eurozone trade and travel',
  'gbp-eur': 'closely tracked around UK-EU trade data and Bank of England / ECB policy decisions',
  'usd-btc': 'tracked by traders and holders as a benchmark price for Bitcoin against the US dollar',
  'btc-usd': 'the reference pair most exchanges use to price Bitcoin in US dollar terms'
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

console.log(`Pre-rendering ${POPULAR_PAIRS.length} popular currency pair pages with FAQPage, Breadcrumbs, and Pair-Specific HTML...`);

for (const pair of POPULAR_PAIRS) {
  const slug = `${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`;
  const pairUrl = `https://www.currenflow.com/${slug}`;
  const fromName = CURRENCY_NAMES[pair.from] || pair.from;
  const toName = CURRENCY_NAMES[pair.to] || pair.to;

  // Strict SEO lengths: title < 60 chars, description < 160 chars with high-CTR emoji hook
  const pageTitle = `${pair.from} to ${pair.to}: Live Rates (0% Bank Fees) | CurrenFlow`;
  const pageDesc = `⚡ Convert ${pair.from} to ${pair.to} at live mid-market rates (0% bank fees). Real-time calculator, fee comparisons & charts on CurrenFlow.`;

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'CurrenFlow',
        item: 'https://www.currenflow.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${pair.from} to ${pair.to}`,
        item: pairUrl
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the live exchange rate between ${fromName} (${pair.from}) and ${toName} (${pair.to})?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The live mid-market exchange rate between ${fromName} and ${toName} is updated in real time on CurrenFlow based on interbank spot markets, featuring 0% retail bank fee markup.`
        }
      },
      {
        '@type': 'Question',
        name: `Do banks charge hidden fees converting ${pair.from} to ${pair.to}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `See our guide to hidden bank exchange rate fees for how retail markups are typically applied on this corridor: https://www.currenflow.com/guides/hidden-bank-exchange-rate-fees`
        }
      },
      {
        '@type': 'Question',
        name: `Who issues ${fromName} and ${toName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${fromName} is issued by ${(CURRENCY_META[pair.from] || {}).issuer || 'its national monetary authority'}. ${toName} is issued by ${(CURRENCY_META[pair.to] || {}).issuer || 'its national monetary authority'}.`
        }
      }
    ]
  };

  const extraHead = `    <script type="application/ld+json">\n${JSON.stringify([breadcrumbsSchema, faqSchema], null, 2)}\n    </script>`;

  // Custom body replacer for static crawler fallback
  const pairBodyReplacer = (rawHtml) => {
    let replaced = rawHtml;
    // Replace generic H1 with pair-specific H1
    replaced = replaced.replace(
      /<h1 style="[^"]*">[\s\S]*?<\/h1>/i,
      `<h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; line-height: 1.25; margin-bottom: 16px;">${pair.from} to ${pair.to} Live Exchange Rate &amp; Currency Converter</h1>`
    );

    // Replace generic subtitle paragraph with pair-specific description
    replaced = replaced.replace(
      /<p style="font-size: 1\.125rem; color: #475569; max-width: 720px; margin: 0 auto; line-height: 1\.6;">[\s\S]*?<\/p>/i,
      `<p style="font-size: 1.125rem; color: #475569; max-width: 720px; margin: 0 auto; line-height: 1.6;">Convert ${fromName} (${pair.from}) to ${toName} (${pair.to}) at live mid-market exchange rates with 0% hidden banking markups. Calculate real-time conversion totals, review historical charts, and compare commercial bank transfer fees.</p>`
    );

    // Insert pair-specific editorial insight & FAQ section in static HTML before </main>
    const fromMeta = CURRENCY_META[pair.from] || {};
    const toMeta = CURRENCY_META[pair.to] || {};
    const contextLine = PAIR_CONTEXT[slug];
    const isCryptoPair = fromMeta.crypto || toMeta.crypto;

    const intro = contextLine
      ? `${pair.from}/${pair.to} is ${contextLine}. ${fromName} is issued by ${fromMeta.issuer || 'its national authority'}; ${toName} is issued by ${toMeta.issuer || 'its national authority'}.`
      : `${fromName} is issued by ${fromMeta.issuer || 'its national authority'} (${fromMeta.region || pair.from}), while ${toName} is issued by ${toMeta.issuer || 'its national authority'} (${toMeta.region || pair.to}).`;

    const bankFeeLine = isCryptoPair
      ? `Crypto exchanges typically widen the spread around ${pair.from}/${pair.to} rather than charging a flat fee, so the quoted "price" often already includes a 1%–3% margin before any withdrawal cost.`
      : `When moving money between ${fromMeta.region || fromName} and ${toMeta.region || toName}, commercial banks commonly apply a retail markup on top of the mid-market rate — see our <a href="/guides/hidden-bank-exchange-rate-fees">guide to hidden bank fees</a> for how that markup typically compares to the interbank rate.`;

    const pairSectionHtml = `
        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); margin-bottom: 48px;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px;">About the ${pair.from}/${pair.to} Pair</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 16px;">${intro}</p>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 16px;">${bankFeeLine}</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #0f172a; margin-top: 0; margin-bottom: 8px;">Key Currency Pair Information</h3>
            <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>Base Currency:</strong> ${fromName} (${pair.from}) &mdash; ${fromMeta.region || 'n/a'}</li>
              <li><strong>Quote Currency:</strong> ${toName} (${pair.to}) &mdash; ${toMeta.region || 'n/a'}</li>
              <li><strong>Calculation Formula:</strong> Amount (${pair.to}) = Amount (${pair.from}) &times; Live Mid-Market Rate</li>
            </ul>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Frequently Asked Questions: ${pair.from} to ${pair.to}</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;">What is the live exchange rate between ${fromName} and ${toName}?</h4>
              <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.5;">CurrenFlow shows the live mid-market rate for ${pair.from}/${pair.to}, sourced from interbank feeds, with no markup added to the displayed number.</p>
            </div>
            <div style="padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;">${isCryptoPair ? `Does the ${pair.from}/${pair.to} price vary between exchanges?` : `Do banks charge hidden fees converting ${pair.from} to ${pair.to}?`}</h4>
              <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.5;">${isCryptoPair
                ? `Yes — because ${isCryptoPair ? 'crypto' : ''} markets are fragmented across exchanges, the quoted ${pair.from}/${pair.to} price can differ by venue; CurrenFlow's rate is a reference, not an order-book price.`
                : `See our <a href="/guides/hidden-bank-exchange-rate-fees">bank fee guide</a> for a full breakdown of how retail markups are typically applied on this corridor.`}</p>
            </div>
          </div>
        </section>
      </main>`;

    replaced = replaced.replace('</main>', pairSectionHtml);
    return replaced;
  };

  const pairHtml = renderPage(pairUrl, pageTitle, pageDesc, extraHead, pairBodyReplacer);

  const pairDir = path.join(distDir, slug);
  if (!fs.existsSync(pairDir)) {
    fs.mkdirSync(pairDir, { recursive: true });
  }
  fs.writeFileSync(path.join(pairDir, 'index.html'), pairHtml, 'utf8');
}

console.log(`✓ Pre-rendered all ${POPULAR_PAIRS.length} currency pair pages with Google Rich Snippet schemas and pair-specific HTML.`);

// 2. Pre-render About Us Page with Breadcrumbs
console.log('Pre-rendering /about page...');
const aboutUrl = 'https://www.currenflow.com/about';
const aboutTitle = 'About Us & Methodology | CurrenFlow';
const aboutDesc = 'CurrenFlow provides transparent mid-market exchange rates, central bank methodology, and consumer-first financial tools.';

const aboutBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'CurrenFlow',
      item: 'https://www.currenflow.com/'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About Us',
      item: aboutUrl
    }
  ]
};
const aboutExtraHead = `    <script type="application/ld+json">\n${JSON.stringify(aboutBreadcrumbSchema, null, 2)}\n    </script>`;
const aboutHtml = renderPage(aboutUrl, aboutTitle, aboutDesc, aboutExtraHead);

const aboutDir = path.join(distDir, 'about');
if (!fs.existsSync(aboutDir)) {
  fs.mkdirSync(aboutDir, { recursive: true });
}
fs.writeFileSync(path.join(aboutDir, 'index.html'), aboutHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'about.html'), aboutHtml, 'utf8');
console.log('✓ Pre-rendered /about and about.html');

// 3. Pre-render Guides Knowledge Base Hub Page with Breadcrumbs
console.log('Pre-rendering /guides hub page...');
const guidesUrl = 'https://www.currenflow.com/guides';
const guidesTitle = 'Forex & Currency Transfer Guides | CurrenFlow';
const guidesDesc = 'Expert foreign exchange guides: avoid hidden commercial bank markups, understand central bank rates, and save on global transfers.';

const guidesBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'CurrenFlow',
      item: 'https://www.currenflow.com/'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Guides',
      item: guidesUrl
    }
  ]
};
const guidesExtraHead = `    <script type="application/ld+json">\n${JSON.stringify(guidesBreadcrumbSchema, null, 2)}\n    </script>`;
const guidesHtml = renderPage(guidesUrl, guidesTitle, guidesDesc, guidesExtraHead);

const guidesDir = path.join(distDir, 'guides');
if (!fs.existsSync(guidesDir)) {
  fs.mkdirSync(guidesDir, { recursive: true });
}
fs.writeFileSync(path.join(guidesDir, 'index.html'), guidesHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'guides.html'), guidesHtml, 'utf8');
console.log('✓ Pre-rendered /guides and guides.html');

// 4. Pre-render 5 In-Depth Financial Guide Articles with Breadcrumbs & Article schema
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

console.log(`Pre-rendering ${GUIDES.length} financial guide articles with Article & Breadcrumb schemas...`);

for (const guide of GUIDES) {
  const guideUrl = `https://www.currenflow.com/guides/${guide.slug}`;
  const guideBreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'CurrenFlow',
        item: 'https://www.currenflow.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://www.currenflow.com/guides'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title.replace(' | CurrenFlow', ''),
        item: guideUrl
      }
    ]
  };

  const guideArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title.replace(' | CurrenFlow', ''),
    description: guide.summary,
    url: guideUrl,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'CurrenFlow',
      url: 'https://www.currenflow.com/',
      logo: 'https://www.currenflow.com/logo.png'
    }
  };

  const guideExtraHead = `    <script type="application/ld+json">\n${JSON.stringify([guideBreadcrumbSchema, guideArticleSchema], null, 2)}\n    </script>`;
  const guideArticleHtml = renderPage(guideUrl, guide.title, guide.summary, guideExtraHead);

  const guideArticleDir = path.join(distDir, 'guides', guide.slug);
  if (!fs.existsSync(guideArticleDir)) {
    fs.mkdirSync(guideArticleDir, { recursive: true });
  }
  fs.writeFileSync(path.join(guideArticleDir, 'index.html'), guideArticleHtml, 'utf8');
}

console.log(`✓ Successfully pre-rendered all ${GUIDES.length} guide articles!`);
console.log('All static pages generated with perfect self-canonical tags, Rich Snippet schemas, and optimal SEO lengths.');
