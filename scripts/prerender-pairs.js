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
        name: `Do commercial banks charge hidden fees on ${pair.from} to ${pair.to} transfers?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. Most commercial banks add a 3% to 5% hidden margin to their quoted currency exchange rates in addition to international wire fees.`
        }
      },
      {
        '@type': 'Question',
        name: `How do I convert ${pair.from} to ${pair.to} at the true mid-market rate?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Use CurrenFlow's real-time converter as your price benchmark, then choose transparent transfer providers that execute transfers at interbank rates with low upfront fees.`
        }
      },
      {
        '@type': 'Question',
        name: `What is the difference between mid-market rate, buy rate, and sell rate?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The mid-market rate is the midpoint between global buy and sell orders on wholesale currency markets. Retail banks buy lower and sell higher, keeping the difference as profit.`
        }
      },
      {
        '@type': 'Question',
        name: `When is the best time to convert or send ${pair.from} to ${pair.to}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Market liquidity is highest during the overlap of the London and New York trading sessions (13:00 to 17:00 UTC). Avoiding weekend transfers helps bypass widened retail broker spreads.`
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
    const pairSectionHtml = `
        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); margin-bottom: 48px;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px;">Understanding ${pair.from} to ${pair.to} Rates &amp; Transfer Costs</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 16px;">When transferring money between ${fromName} and ${toName}, high-street commercial banks routinely add a 3% to 5% hidden markup to their quoted retail exchange rates. CurrenFlow provides transparent, real-time mid-market rates sourced directly from interbank financial feeds with zero hidden markups.</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #0f172a; margin-top: 0; margin-bottom: 8px;">Key Currency Pair Information</h3>
            <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>Base Currency:</strong> ${fromName} (${pair.from})</li>
              <li><strong>Quote Currency:</strong> ${toName} (${pair.to})</li>
              <li><strong>Calculation Formula:</strong> Amount (${pair.to}) = Amount (${pair.from}) &times; Live Mid-Market Rate</li>
              <li><strong>Transfer Advice:</strong> Always audit the net deliverable amount against CurrenFlow live rates before confirming bank wire transfers.</li>
            </ul>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Frequently Asked Questions: ${pair.from} to ${pair.to}</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;">What is the live exchange rate between ${fromName} and ${toName}?</h4>
              <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.5;">The live exchange rate between ${pair.from} and ${pair.to} reflects wholesale interbank spot prices. CurrenFlow updates continuously to display genuine mid-market rates with 0% retail bank markup.</p>
            </div>
            <div style="padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Do commercial banks charge hidden fees on ${pair.from} to ${pair.to} transfers?</h4>
              <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.5;">Yes, high-street retail banks frequently insert a 3% to 5% spread margin into the exchange rate in addition to international wire fees, costing users substantial money on large conversions.</p>
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
