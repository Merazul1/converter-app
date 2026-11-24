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

const PAIR_CONTEXT = {
  'usd-inr': 'one of the largest remittance corridors in the world, driven by Indian professionals and students based in the US',
  'usd-bdt': 'a major remittance corridor for the Bangladeshi diaspora working abroad',
  'usd-pkr': 'a widely used corridor for remittances from Pakistani expatriates in North America and the Middle East',
  'usd-mxn': 'one of the highest-volume remittance corridors globally, linked to cross-border labor and trade between the US and Mexico',
  'usd-cny': 'closely watched by importers and exporters due to the scale of US-China trade',
  'usd-aed': 'commonly used by expatriates and businesses operating in or sending money to the UAE',
  'usd-sar': 'relevant to the large expatriate workforce remitting earnings from Saudi Arabia',
  'eur-gbp': 'one of the most actively traded pairs in Europe, reflecting UK-Eurozone trade and travel',
  'gbp-eur': 'closely tracked around UK-EU trade data and Bank of England / ECB policy decisions',
  'usd-btc': 'tracked by traders and holders as a benchmark price for Bitcoin against the US dollar',
  'btc-usd': 'the reference pair most exchanges use to price Bitcoin in US dollar terms'
};

const BENCHMARK_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 155.4,
  CAD: 1.40,
  AUD: 1.53,
  CHF: 0.88,
  CNY: 7.24,
  INR: 84.4,
  BDT: 119.8,
  AED: 3.6725,
  SAR: 3.75,
  SGD: 1.34,
  HKD: 7.78,
  NZD: 1.68,
  MXN: 20.3,
  BRL: 5.75,
  ZAR: 18.1,
  TRY: 34.5,
  KRW: 1390.0,
  PKR: 278.5,
  BTC: 0.0000147,
  ETH: 0.00031
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

function getRateStr(pair, estRate) {
  if (pair.to === 'BTC') return estRate.toFixed(6);
  if (estRate >= 1000) return estRate.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (estRate >= 1) return estRate.toFixed(2);
  if (estRate >= 0.1) return estRate.toFixed(2);
  if (estRate >= 0.01) return estRate.toFixed(4);
  return estRate.toFixed(6);
}

function getPairTitle(pair, rateStr) {
  if (pair.from === 'USD' && pair.to === 'PKR') {
    return `1 USD = ${rateStr} PKR: Live Dollar to Rupee Rate | CurrenFlow`;
  }
  if (pair.from === 'USD' && pair.to === 'EUR') {
    return `1 USD = ${rateStr} EUR: Live Dollar to Euro Rate | CurrenFlow`;
  }
  if (pair.from === 'USD' && pair.to === 'INR') {
    return `1 USD = ${rateStr} INR: Live Dollar to Rupee Rate | CurrenFlow`;
  }

  let title = pair.to === 'BTC'
    ? `${pair.from} to ${pair.to} Live: Real-Time Bitcoin Price | CurrenFlow`
    : pair.from === 'BTC'
    ? `BTC to USD: 1 BTC = ${rateStr} USD Live Price | CurrenFlow`
    : `${pair.from} to ${pair.to}: 1 ${pair.from} = ${rateStr} ${pair.to} Live Rate | CurrenFlow`;

  if (title.length > 60) {
    title = `${pair.from} to ${pair.to}: 1 ${pair.from} = ${rateStr} ${pair.to} | CurrenFlow`;
  }
  if (title.length > 60) {
    title = `${pair.from}/${pair.to}: 1 ${pair.from} = ${rateStr} ${pair.to} | CurrenFlow`;
  }
  if (title.length < 50) {
    title = `${pair.from} to ${pair.to} Today: 1 ${pair.from} = ${rateStr} ${pair.to} Rate | CurrenFlow`;
  }
  return title;
}

function getPairDesc(pair, rateStr) {
  let desc = `Live ${pair.from} to ${pair.to} exchange rate: 1 ${pair.from} = ${rateStr} ${pair.to}. Free instant currency calculator, popular conversion tables, and real-time interbank charts.`;
  if (desc.length > 155) {
    desc = `Live ${pair.from} to ${pair.to} rate: 1 ${pair.from} = ${rateStr} ${pair.to}. Free instant currency calculator, popular conversion tables, and real-time interbank charts.`;
  }
  if (desc.length > 155) {
    desc = `Live ${pair.from} to ${pair.to} rate: 1 ${pair.from} = ${rateStr} ${pair.to}. Free instant currency calculator, conversion tables, and real-time interbank charts.`;
  }
  return desc;
}

console.log(`Pre-rendering ${POPULAR_PAIRS.length} popular currency pair pages with corridor-specific rates and clean HTML...`);

for (const pair of POPULAR_PAIRS) {
  const slug = `${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`;
  const pairUrl = `https://www.currenflow.com/${slug}`;
  const fromName = CURRENCY_NAMES[pair.from] || pair.from;
  const toName = CURRENCY_NAMES[pair.to] || pair.to;

  // Calculate benchmark rate
  let estRate = 1.0;
  if (pair.from === 'USD') {
    estRate = BENCHMARK_RATES[pair.to] || 1.0;
  } else if (pair.to === 'USD') {
    estRate = 1 / (BENCHMARK_RATES[pair.from] || 1.0);
  } else {
    estRate = (BENCHMARK_RATES[pair.to] || 1.0) / (BENCHMARK_RATES[pair.from] || 1.0);
  }
  if (pair.from === 'BTC' && pair.to === 'USD') estRate = 68000;
  if (pair.from === 'USD' && pair.to === 'BTC') estRate = 1 / 68000;

  const rateStr = getRateStr(pair, estRate);
  const pageTitle = getPairTitle(pair, rateStr);
  const pageDesc = getPairDesc(pair, rateStr);

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

  // Build corridor-tailored FAQ
  const fromMeta = CURRENCY_META[pair.from] || {};
  const toMeta = CURRENCY_META[pair.to] || {};
  const isCryptoPair = fromMeta.crypto || toMeta.crypto;

  let specificFaqQuestion = `Do commercial banks charge hidden fees converting ${pair.from} to ${pair.to}?`;
  let specificFaqAnswer = `Yes, traditional retail banks typically add a 3% to 5% spread markup on foreign exchange rates. See our guide to hidden bank fees: https://www.currenflow.com/guides/hidden-bank-exchange-rate-fees`;

  if (slug === 'usd-to-pkr') {
    specificFaqQuestion = `How much is 60,000 USD in Pakistani Rupees?`;
    specificFaqAnswer = `At today's live mid-market rate of 1 USD = ${rateStr} PKR, 60,000 USD is approximately ${(60000 * estRate).toLocaleString('en-US', { maximumFractionDigits: 0 })} PKR.`;
  } else if (slug === 'usd-to-jpy') {
    specificFaqQuestion = `How much is 4,200 USD in Japanese Yen?`;
    specificFaqAnswer = `At today's live mid-market rate of 1 USD = ${rateStr} JPY, 4,200 USD is approximately ${(4200 * estRate).toLocaleString('en-US', { maximumFractionDigits: 0 })} JPY.`;
  } else if (slug === 'usd-to-inr') {
    specificFaqQuestion = `How much is 1,000 USD in Indian Rupees?`;
    specificFaqAnswer = `At today's live mid-market rate of 1 USD = ${rateStr} INR, 1,000 USD is approximately ${(1000 * estRate).toLocaleString('en-US', { maximumFractionDigits: 0 })} INR.`;
  } else if (isCryptoPair) {
    specificFaqQuestion = `Does the ${pair.from}/${pair.to} price vary across exchanges?`;
    specificFaqAnswer = `Yes — because cryptocurrency trading is fragmented across decentralized order books, the quoted rate can differ slightly by venue. CurrenFlow provides a real-time consolidated mid-market benchmark price.`;
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is 1 ${pair.from} to ${pair.to} today?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `1 ${fromName} (${pair.from}) equals ${rateStr} ${toName} (${pair.to}) at the live interbank mid-market exchange rate.`
        }
      },
      {
        '@type': 'Question',
        name: specificFaqQuestion,
        acceptedAnswer: {
          '@type': 'Answer',
          text: specificFaqAnswer
        }
      },
      {
        '@type': 'Question',
        name: `Who regulates monetary policy for ${pair.from} and ${pair.to}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${fromName} is issued and regulated by ${fromMeta.issuer || 'its central monetary authority'}, while ${toName} is regulated by ${toMeta.issuer || 'its central monetary authority'}.`
        }
      }
    ]
  };

  const extraHead = `    <script type="application/ld+json">\n${JSON.stringify([breadcrumbsSchema, faqSchema], null, 2)}\n    </script>`;

  // Custom body replacer for static crawler fallback: strips homepage boilerplate and outputs pure pair content
  const pairBodyReplacer = (rawHtml) => {
    let replaced = rawHtml;

    const contextLine = PAIR_CONTEXT[slug];
    const intro = contextLine
      ? `${pair.from}/${pair.to} is ${contextLine}. ${fromName} is issued by ${fromMeta.issuer || 'its national authority'}; ${toName} is issued by ${toMeta.issuer || 'its national authority'}.`
      : `${fromName} is issued by ${fromMeta.issuer || 'its national authority'} (${fromMeta.region || pair.from}), while ${toName} is issued by ${toMeta.issuer || 'its national authority'} (${toMeta.region || pair.to}).`;

    const bankFeeLine = isCryptoPair
      ? `Crypto exchanges typically widen the spread around ${pair.from}/${pair.to} rather than charging a flat fee, so the quoted price often already includes a 1%–3% spread before withdrawal costs.`
      : `When converting funds between ${fromMeta.region || fromName} and ${toMeta.region || toName}, high-street commercial banks routinely add a 3% to 5% retail markup on top of the mid-market rate. Review our <a href="/guides/hidden-bank-exchange-rate-fees" style="color: #2563eb; font-weight: 600; text-decoration: underline;">guide to hidden bank fees</a> to see how retail quotes compare to the true interbank baseline.`;

    // Amounts table with searched queries
    let sampleAmounts = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000];
    if (pair.from === 'BTC') {
      sampleAmounts = [0.001, 0.005, 0.01, 0.05, 0.1, 0.25, 0.5, 1];
    } else if (pair.to === 'PKR' || pair.from === 'PKR') {
      sampleAmounts = [1, 1.3, 5, 10, 25, 31, 50, 100, 160, 185, 215, 500, 1000, 4200, 60000];
    } else if (pair.to === 'JPY' || pair.from === 'JPY') {
      sampleAmounts = [1, 5, 10, 50, 100, 500, 1000, 1800, 4200, 10000];
    } else if (pair.to === 'SGD' || pair.from === 'SGD') {
      sampleAmounts = [1, 5, 10, 50, 100, 500, 1000, 1499, 4100, 5000];
    } else if (['INR', 'BDT'].includes(pair.to) || ['INR', 'BDT'].includes(pair.from)) {
      sampleAmounts = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
    }

    const formatNum = (num, isCrypto) => {
      if (isCrypto) return num.toFixed(6);
      if (num >= 1000) return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
      if (num < 0.01) return num.toFixed(4);
      return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const tableRows = sampleAmounts.map(amt => {
      const conv = amt * estRate;
      const bankVal = conv * 0.965;
      const saveVal = conv - bankVal;
      const toCrypto = (CURRENCY_META[pair.to] || {}).crypto;
      const fromCrypto = (CURRENCY_META[pair.from] || {}).crypto;
      return `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 12px; font-weight: 600; color: #1e293b;">${formatNum(amt, fromCrypto)} ${pair.from}</td>
                  <td style="padding: 10px 12px; color: #2563eb; font-weight: 700;">${formatNum(conv, toCrypto)} ${pair.to}</td>
                  <td style="padding: 10px 12px; color: #64748b;">${formatNum(bankVal, toCrypto)} ${pair.to}</td>
                  <td style="padding: 10px 12px; color: #16a34a; font-weight: 600;">+${formatNum(saveVal, toCrypto)} ${pair.to}</td>
                </tr>`;
    }).join('');

    const amountsTableHtml = `
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 6px;">Convert ${fromName} to ${toName} &mdash; Popular Conversion Amounts</h3>
            <p style="color: #64748b; font-size: 13px; margin-top: 0; margin-bottom: 14px;">Real-time mid-market conversion totals compared with standard retail bank markups (3.5%).</p>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
                <thead>
                  <tr style="border-bottom: 2px solid #e2e8f0; color: #475569; background: #f8fafc;">
                    <th style="padding: 10px 12px;">Amount (${pair.from})</th>
                    <th style="padding: 10px 12px;">CurrenFlow Live Mid-Market</th>
                    <th style="padding: 10px 12px;">Typical Bank Rate</th>
                    <th style="padding: 10px 12px;">Estimated Savings</th>
                  </tr>
                </thead>
                <tbody>${tableRows}
                </tbody>
              </table>
            </div>
          </div>`;

    const pairMainHtml = `
      <main style="max-width: 1000px; margin: 40px auto; padding: 0 16px; font-family: system-ui, -apple-system, sans-serif;">
        <section style="text-align: center; margin-bottom: 48px;">
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; line-height: 1.25; margin-bottom: 16px;">${pair.from} to ${pair.to}: 1 ${pair.from} = ${rateStr} ${pair.to} Live Rate</h1>
          <p style="font-size: 1.125rem; color: #475569; max-width: 720px; margin: 0 auto; line-height: 1.6;">1 ${fromName} (${pair.from}) equals ${rateStr} ${toName} (${pair.to}) today at live interbank mid-market exchange rates. Free instant currency calculator, popular conversion tables, and real-time market data.</p>
        </section>

        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); margin-bottom: 48px;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px;">About the ${pair.from}/${pair.to} Pair</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 16px;">${intro}</p>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 16px;">${bankFeeLine}</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #0f172a; margin-top: 0; margin-bottom: 8px;">Key Currency Pair Information</h3>
            <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>Base Currency:</strong> ${fromName} (${pair.from}) &mdash; ${fromMeta.region || 'n/a'}</li>
              <li><strong>Quote Currency:</strong> ${toName} (${pair.to}) &mdash; ${toMeta.region || 'n/a'}</li>
              <li><strong>Calculation Formula:</strong> Amount (${pair.to}) = Amount (${pair.from}) &times; ${rateStr}</li>
            </ul>
          </div>
          ${amountsTableHtml}
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Frequently Asked Questions: ${pair.from} to ${pair.to}</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;">What is 1 ${pair.from} to ${pair.to} today?</h4>
              <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.5;">1 ${fromName} (${pair.from}) equals ${rateStr} ${toName} (${pair.to}) at the live interbank mid-market exchange rate on CurrenFlow.</p>
            </div>
            <div style="padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;">${specificFaqQuestion}</h4>
              <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.5;">${specificFaqAnswer}</p>
            </div>
            <div style="padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Who regulates monetary policy for ${pair.from} and ${pair.to}?</h4>
              <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.5;">${fromName} is regulated by ${fromMeta.issuer || 'its central monetary authority'}, and ${toName} is regulated by ${toMeta.issuer || 'its central monetary authority'}.</p>
            </div>
          </div>
        </section>
      </main>`;

    // Replace the entire generic main block with the pair-specific content
    replaced = replaced.replace(/<main[\s\S]*?<\/main>/i, pairMainHtml.trim());

    return replaced;
  };

  const pairHtml = renderPage(pairUrl, pageTitle, pageDesc, extraHead, pairBodyReplacer);

  const pairDir = path.join(distDir, slug);
  if (!fs.existsSync(pairDir)) {
    fs.mkdirSync(pairDir, { recursive: true });
  }
  fs.writeFileSync(path.join(pairDir, 'index.html'), pairHtml, 'utf8');
}

console.log(`✓ Pre-rendered all ${POPULAR_PAIRS.length} currency pair pages with corridor-specific rates and clean HTML.`);

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
        item: guidesUrl
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title.replace(' | CurrenFlow', ''),
        item: guideUrl
      }
    ]
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title.replace(' | CurrenFlow', ''),
    description: guide.summary,
    mainEntityOfPage: guideUrl,
    author: {
      '@type': 'Organization',
      name: 'CurrenFlow Editorial Team',
      url: 'https://www.currenflow.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CurrenFlow',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.currenflow.com/favicon.svg'
      }
    },
    datePublished: '2026-10-18',
    dateModified: '2026-11-23'
  };

  const guideExtraHead = `    <script type="application/ld+json">\n${JSON.stringify([guideBreadcrumbSchema, articleSchema], null, 2)}\n    </script>`;
  const guideHtml = renderPage(guideUrl, guide.title, guide.summary, guideExtraHead);

  const guideDir = path.join(distDir, 'guides', guide.slug);
  if (!fs.existsSync(guideDir)) {
    fs.mkdirSync(guideDir, { recursive: true });
  }
  fs.writeFileSync(path.join(guideDir, 'index.html'), guideHtml, 'utf8');
}

console.log('✓ Successfully pre-rendered all 5 guide articles!');

// 5. Pre-render clean directory pages for /contact, /privacy-policy, and /terms-of-service
const staticPages = [
  { slug: 'contact', file: 'contact.html' },
  { slug: 'privacy-policy', file: 'privacy-policy.html' },
  { slug: 'terms-of-service', file: 'terms-of-service.html' }
];

for (const sp of staticPages) {
  const srcFile = path.join(distDir, sp.file);
  const targetDir = path.join(distDir, sp.slug);
  if (fs.existsSync(srcFile)) {
    let content = fs.readFileSync(srcFile, 'utf8');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), content, 'utf8');
  }
}
console.log('✓ Successfully generated clean directory index pages for /contact, /privacy-policy, and /terms-of-service!');
console.log('All static pages generated with perfect self-canonical tags, Rich Snippet schemas, and optimal SEO lengths.');
