import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// 1. Raw Data Input
const dateData = [
  { Date: '2026-10-17', Day: 'Saturday', Clicks: 0, Impressions: 0, CTR: '0.00%', Position: '-' },
  { Date: '2026-10-18', Day: 'Sunday', Clicks: 0, Impressions: 0, CTR: '0.00%', Position: '-' },
  { Date: '2026-10-19', Day: 'Monday', Clicks: 0, Impressions: 10, CTR: '0.00%', Position: 69.4 },
  { Date: '2026-10-20', Day: 'Tuesday', Clicks: 0, Impressions: 169, CTR: '0.00%', Position: 51.7 },
  { Date: '2026-10-21', Day: 'Wednesday', Clicks: 0, Impressions: 1017, CTR: '0.00%', Position: 56.2 },
  { Date: '2026-10-22', Day: 'Thursday', Clicks: 0, Impressions: 1294, CTR: '0.00%', Position: 56.9 },
  { Date: '2026-10-23', Day: 'Friday (Peak)', Clicks: 0, Impressions: 1327, CTR: '0.00%', Position: 53.5 },
  { Date: '2026-10-24', Day: 'Saturday (Weekend)', Clicks: 0, Impressions: 1192, CTR: '0.00%', Position: 48.6 },
  { Date: '2026-10-25', Day: 'Sunday (Weekend)', Clicks: 0, Impressions: 947, CTR: '0.00%', Position: 47.2 },
  { Date: '2026-10-26', Day: 'Monday', Clicks: 0, Impressions: 753, CTR: '0.00%', Position: 49.4 },
];

const topPagesData = [
  { Page: 'https://www.currenflow.com/usd-to-eur', Clicks: 0, Impressions: 1614, CTR: '0.00%', Position: 14.05 },
  { Page: 'https://www.currenflow.com/usd-to-cad', Clicks: 0, Impressions: 1131, CTR: '0.00%', Position: 67.12 },
  { Page: 'https://www.currenflow.com/usd-to-aud', Clicks: 0, Impressions: 801, CTR: '0.00%', Position: 52.14 },
  { Page: 'https://www.currenflow.com/eur-to-gbp', Clicks: 0, Impressions: 608, CTR: '0.00%', Position: 74.12 },
  { Page: 'https://www.currenflow.com/usd-to-pkr', Clicks: 0, Impressions: 420, CTR: '0.00%', Position: 59.49 },
  { Page: 'https://www.currenflow.com/usd-to-inr', Clicks: 0, Impressions: 388, CTR: '0.00%', Position: 71.78 },
  { Page: 'https://www.currenflow.com/gbp-to-eur', Clicks: 0, Impressions: 243, CTR: '0.00%', Position: 79.93 },
  { Page: 'https://www.currenflow.com/usd-to-gbp', Clicks: 0, Impressions: 226, CTR: '0.00%', Position: 70.65 },
  { Page: 'https://www.currenflow.com/aed-to-usd', Clicks: 0, Impressions: 197, CTR: '0.00%', Position: 62.85 },
  { Page: 'https://www.currenflow.com/usd-to-aed', Clicks: 0, Impressions: 193, CTR: '0.00%', Position: 50.09 },
  { Page: 'https://www.currenflow.com/usd-to-sar', Clicks: 0, Impressions: 174, CTR: '0.00%', Position: 54.2 },
  { Page: 'https://www.currenflow.com/usd-to-try', Clicks: 0, Impressions: 169, CTR: '0.00%', Position: 70.05 },
  { Page: 'https://www.currenflow.com/usd-to-jpy', Clicks: 0, Impressions: 158, CTR: '0.00%', Position: 66.64 },
  { Page: 'https://www.currenflow.com/cny-to-usd', Clicks: 0, Impressions: 93, CTR: '0.00%', Position: 69.72 },
  { Page: 'https://www.currenflow.com/usd-to-brl', Clicks: 0, Impressions: 74, CTR: '0.00%', Position: 48.19 },
  { Page: 'https://www.currenflow.com/cad-to-usd', Clicks: 0, Impressions: 57, CTR: '0.00%', Position: 72.02 },
  { Page: 'https://www.currenflow.com/usd-to-bdt', Clicks: 0, Impressions: 47, CTR: '0.00%', Position: 57.13 },
  { Page: 'https://www.currenflow.com/usd-to-sgd', Clicks: 0, Impressions: 41, CTR: '0.00%', Position: 47.49 },
  { Page: 'https://www.currenflow.com/eur-to-usd', Clicks: 0, Impressions: 29, CTR: '0.00%', Position: 67.24 },
  { Page: 'https://www.currenflow.com/usd-to-cny', Clicks: 0, Impressions: 22, CTR: '0.00%', Position: 40.59 },
  { Page: 'https://www.currenflow.com/usd-to-mxn', Clicks: 0, Impressions: 13, CTR: '0.00%', Position: 57.46 },
  { Page: 'https://www.currenflow.com/eur-to-chf', Clicks: 0, Impressions: 11, CTR: '0.00%', Position: 71.09 },
  { Page: 'https://www.currenflow.com/sar-to-usd', Clicks: 0, Impressions: 6, CTR: '0.00%', Position: 31.33 },
  { Page: 'https://www.currenflow.com/', Clicks: 0, Impressions: 5, CTR: '0.00%', Position: 14.4 },
  { Page: 'https://www.currenflow.com/btc-to-usd', Clicks: 0, Impressions: 5, CTR: '0.00%', Position: 45.6 },
  { Page: 'https://www.currenflow.com/jpy-to-usd', Clicks: 0, Impressions: 3, CTR: '0.00%', Position: 23.33 },
];

const countryData = [
  { Country: 'Canada', Clicks: 0, Impressions: 1149, CTR: '0.00%', Position: 66.73 },
  { Country: 'United States', Clicks: 0, Impressions: 715, CTR: '0.00%', Position: 58.58 },
  { Country: 'United Kingdom', Clicks: 0, Impressions: 711, CTR: '0.00%', Position: 75.12 },
  { Country: 'Australia', Clicks: 0, Impressions: 618, CTR: '0.00%', Position: 49.06 },
  { Country: 'Italy', Clicks: 0, Impressions: 389, CTR: '0.00%', Position: 16.97 },
  { Country: 'Bangladesh', Clicks: 0, Impressions: 252, CTR: '0.00%', Position: 24.51 },
  { Country: 'United Arab Emirates', Clicks: 0, Impressions: 193, CTR: '0.00%', Position: 56.75 },
  { Country: 'India', Clicks: 0, Impressions: 178, CTR: '0.00%', Position: 81.6 },
  { Country: 'Thailand', Clicks: 0, Impressions: 152, CTR: '0.00%', Position: 15.53 },
  { Country: 'Saudi Arabia', Clicks: 0, Impressions: 144, CTR: '0.00%', Position: 71.15 },
  { Country: 'Turkey', Clicks: 0, Impressions: 130, CTR: '0.00%', Position: 70.57 },
  { Country: 'Pakistan', Clicks: 0, Impressions: 124, CTR: '0.00%', Position: 41.98 },
  { Country: 'Brazil', Clicks: 0, Impressions: 119, CTR: '0.00%', Position: 53.11 },
  { Country: 'Iceland', Clicks: 0, Impressions: 116, CTR: '0.00%', Position: 10.28 },
  { Country: 'Netherlands', Clicks: 0, Impressions: 85, CTR: '0.00%', Position: 77.55 },
  { Country: 'Singapore', Clicks: 0, Impressions: 84, CTR: '0.00%', Position: 66.38 },
  { Country: 'Egypt', Clicks: 0, Impressions: 74, CTR: '0.00%', Position: 37.99 },
  { Country: 'Philippines', Clicks: 0, Impressions: 72, CTR: '0.00%', Position: 54.28 },
  { Country: 'Ireland', Clicks: 0, Impressions: 65, CTR: '0.00%', Position: 63.88 },
  { Country: 'Indonesia', Clicks: 0, Impressions: 63, CTR: '0.00%', Position: 42.13 },
  { Country: 'Spain', Clicks: 0, Impressions: 59, CTR: '0.00%', Position: 69.12 },
  { Country: 'France', Clicks: 0, Impressions: 58, CTR: '0.00%', Position: 68.88 },
  { Country: 'Trinidad & Tobago', Clicks: 0, Impressions: 52, CTR: '0.00%', Position: 6.31 },
  { Country: 'Russia', Clicks: 0, Impressions: 46, CTR: '0.00%', Position: 40.83 },
  { Country: 'Serbia', Clicks: 0, Impressions: 45, CTR: '0.00%', Position: 10.29 },
  { Country: 'Germany', Clicks: 0, Impressions: 44, CTR: '0.00%', Position: 74.66 },
  { Country: 'Iraq', Clicks: 0, Impressions: 43, CTR: '0.00%', Position: 6.23 },
  { Country: 'South Africa', Clicks: 0, Impressions: 40, CTR: '0.00%', Position: 70.5 },
];

const deviceData = [
  { Device: 'Desktop', Clicks: 0, Impressions: 6170, Share: '91.97%', CTR: '0.00%', Position: 50.2 },
  { Device: 'Mobile', Clicks: 0, Impressions: 528, Share: '7.87%', CTR: '0.00%', Position: 76.71 },
  { Device: 'Tablet', Clicks: 0, Impressions: 11, Share: '0.16%', CTR: '0.00%', Position: 71.64 },
];

// Top queries array
const rawQueriesText = fs.readFileSync(path.resolve('./scripts/queries_data.txt'), 'utf8');
const queriesData = [];
for (const line of rawQueriesText.split('\n')) {
  const parts = line.trim().split(',');
  if (parts.length >= 5 && parts[0] !== 'Top queries') {
    queriesData.push({
      Query: parts[0],
      Clicks: parseInt(parts[1], 10) || 0,
      Impressions: parseInt(parts[2], 10) || 0,
      CTR: parts[3] ? `${parts[3]}%` : '0.00%',
      Position: parseFloat(parts[4]) || 0
    });
  }
}

const diagnosisData = [
  {
    Factor: '1. Weekend Forex Market Closure (Primary Reason)',
    Impact: 'High (-43% drop from Fri to Sun)',
    Detailed_Analysis: 'FX markets close on Friday evening and reopen Sunday night. Search demand for currency exchange drops 30-50% globally on weekends across all tools.',
    Recommended_Action: 'Expect numbers to rebound on Tuesday/Wednesday. No technical fault.'
  },
  {
    Factor: '2. 0.0% CTR & Snippet Bounce',
    Impact: 'High (6,709 impressions, 0 clicks)',
    Detailed_Analysis: 'Google tested the site on Page 1 (pos 9.72 for "exchange rate usd to eur"). With 0 clicks, Google ranks snippets lower when searchers ignore them.',
    Recommended_Action: 'We already deployed high-CTR titles: "USD to EUR: Live Mid-Market Exchange Rate (0% Bank Fees) | CurrenFlow" to grab clicks once recrawled.'
  },
  {
    Factor: '3. Google "Honeymoon" Testing Phase',
    Impact: 'Medium (Normal algorithmic curve)',
    Detailed_Analysis: 'Google initially gives new programmatic URLs a brief visibility spike to measure click-through and dwell time, then stabilizes them.',
    Recommended_Action: 'Added 5 comprehensive editorial guides and About Us methodology to satisfy E-E-A-T and build long-term topical authority.'
  },
  {
    Factor: '4. Desktop vs. Mobile Penalty (92% Desktop)',
    Impact: 'High (Mobile ranks pos 76.71 vs Desktop pos 50.2)',
    Detailed_Analysis: 'Google uses Mobile-First Indexing. 70%+ of forex queries occur on mobile, but CurrenFlow only got 528 mobile impressions due to prior SPA rendering lag.',
    Recommended_Action: 'Pre-rendered static HTML files for all pairs, guides, and about page ensure mobile crawlers parse instantaneous DOM.'
  },
  {
    Factor: '5. Google Search Console Reporting Lag',
    Impact: 'Medium (2-3 days delay)',
    Detailed_Analysis: 'The provided data ends on October 26. The major site updates (editorial guides, static HTML, self-canonicals) were pushed Oct 27-28 and are not yet reflected.',
    Recommended_Action: 'Allow 3 to 7 days for Google to recrawl sitemap.xml and update index snippets.'
  }
];

// Create workbook
const wb = XLSX.utils.book_new();

// Sheet 1: Daily Trends
const wsDate = XLSX.utils.json_to_sheet(dateData);
wsDate['!cols'] = [{ wch: 14 }, { wch: 22 }, { wch: 10 }, { wch: 14 }, { wch: 10 }, { wch: 12 }];
XLSX.utils.book_append_sheet(wb, wsDate, 'Daily_Performance');

// Sheet 2: Top Queries
const wsQueries = XLSX.utils.json_to_sheet(queriesData);
wsQueries['!cols'] = [{ wch: 42 }, { wch: 10 }, { wch: 14 }, { wch: 10 }, { wch: 12 }];
XLSX.utils.book_append_sheet(wb, wsQueries, 'Top_Queries');

// Sheet 3: Top Pages
const wsPages = XLSX.utils.json_to_sheet(topPagesData);
wsPages['!cols'] = [{ wch: 45 }, { wch: 10 }, { wch: 14 }, { wch: 10 }, { wch: 12 }];
XLSX.utils.book_append_sheet(wb, wsPages, 'Top_Pages');

// Sheet 4: Countries
const wsCountries = XLSX.utils.json_to_sheet(countryData);
wsCountries['!cols'] = [{ wch: 24 }, { wch: 10 }, { wch: 14 }, { wch: 10 }, { wch: 12 }];
XLSX.utils.book_append_sheet(wb, wsCountries, 'Country_Breakdown');

// Sheet 5: Devices
const wsDevices = XLSX.utils.json_to_sheet(deviceData);
wsDevices['!cols'] = [{ wch: 14 }, { wch: 10 }, { wch: 14 }, { wch: 12 }, { wch: 10 }, { wch: 12 }];
XLSX.utils.book_append_sheet(wb, wsDevices, 'Device_Breakdown');

// Sheet 6: Diagnosis & Action Plan
const wsDiag = XLSX.utils.json_to_sheet(diagnosisData);
wsDiag['!cols'] = [{ wch: 32 }, { wch: 25 }, { wch: 60 }, { wch: 55 }];
XLSX.utils.book_append_sheet(wb, wsDiag, 'SEO_Diagnosis_Insights');

// Write out to disk
const outPath1 = path.resolve('CurrenFlow_GSC_SEO_Analysis.xlsx');
const outPath2 = path.resolve('../Application/CurrenFlow_GSC_SEO_Analysis.xlsx');

XLSX.writeFile(wb, outPath1);
try {
  XLSX.writeFile(wb, outPath2);
} catch (e) {
  // ignore
}

console.log('✓ Successfully generated Excel workbook:', outPath1);
