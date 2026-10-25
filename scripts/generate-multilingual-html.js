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

// ==========================================
// 1. GENERATE SPANISH (ES) HTML
// ==========================================
let esHtml = baseHtml;

// Head meta tags & canonical
esHtml = esHtml.replace('<html lang="en"', '<html lang="es"');
esHtml = esHtml.replace(
  '<title>CurrenFlow - Live Currency Converter & Exchange Rates</title>',
  '<title>CurrenFlow - Convertidor de Divisas en Vivo y Tipos de Cambio</title>'
);
esHtml = esHtml.replace(
  '<meta name="title" content="CurrenFlow - Live Currency Converter & Exchange Rates" />',
  '<meta name="title" content="CurrenFlow - Convertidor de Divisas en Vivo y Tipos de Cambio" />'
);
esHtml = esHtml.replace(
  '<meta name="description" content="Convert 160+ currencies with real-time mid-market exchange rates today. Free currency converter calculator with zero hidden fees and live forex data." />',
  '<meta name="description" content="Calcula y convierte más de 160 divisas con tipos de cambio reales del mercado en tiempo real. Conversor de moneda gratuito sin comisiones ocultas." />'
);
esHtml = esHtml.replace(
  '<meta property="og:url" content="https://www.currenflow.com/" />',
  '<meta property="og:url" content="https://www.currenflow.com/es" />'
);
esHtml = esHtml.replace(
  '<meta property="og:title" content="CurrenFlow - Real-Time Currency Converter & Live Exchange Rates" />',
  '<meta property="og:title" content="CurrenFlow - Convertidor de Divisas en Vivo y Tipos de Cambio" />'
);
esHtml = esHtml.replace(
  '<meta property="og:description" content="Convert 160+ currencies with real-time mid-market exchange rates today. Free currency converter calculator with zero hidden fees." />',
  '<meta property="og:description" content="Calcula y convierte más de 160 divisas con tipos de cambio reales del mercado en tiempo real. Conversor de moneda gratuito sin comisiones ocultas." />'
);
esHtml = esHtml.replace(
  '<meta property="twitter:url" content="https://www.currenflow.com/" />',
  '<meta property="twitter:url" content="https://www.currenflow.com/es" />'
);
esHtml = esHtml.replace(
  '<meta property="twitter:title" content="CurrenFlow - Real-Time Currency Converter & Live Exchange Rates" />',
  '<meta property="twitter:title" content="CurrenFlow - Convertidor de Divisas en Vivo y Tipos de Cambio" />'
);
esHtml = esHtml.replace(
  '<meta property="twitter:description" content="Convert 160+ currencies with real-time mid-market exchange rates today. Free currency converter calculator with zero hidden fees." />',
  '<meta property="twitter:description" content="Calcula y convierte más de 160 divisas con tipos de cambio reales del mercado en tiempo real. Conversor de moneda gratuito sin comisiones ocultas." />'
);

// CRUCIAL: Self-referencing canonical tag for Spanish
esHtml = esHtml.replace(
  '<link rel="canonical" href="https://www.currenflow.com/" />',
  '<link rel="canonical" href="https://www.currenflow.com/es" />'
);

// Fallback crawlable body in Spanish
esHtml = esHtml.replace(
  '<a href="/" style="color: #2563eb; text-decoration: none;">Converter</a>',
  '<a href="/es" style="color: #2563eb; text-decoration: none;">Conversor</a>'
);
esHtml = esHtml.replace(
  'Live Currency Converter &amp; Real-Time Exchange Rates',
  'Convertidor de Divisas en Vivo y Tipos de Cambio en Tiempo Real'
);
esHtml = esHtml.replace(
  'Accurate, instantaneous foreign exchange calculations powered by live mid-market forex rates. Convert across 160+ world currencies including US Dollar (USD), Euro (EUR), British Pound (GBP), Indian Rupee (INR), Canadian Dollar (CAD), and Japanese Yen (JPY) with zero hidden fees.',
  'Cálculos precisos e instantáneos de tipos de cambio de divisas con tasas interbancarias reales. Convierte más de 160 monedas mundiales, incluyendo Dólar estadounidense (USD), Euro (EUR), Libra esterlina (GBP), Rupia india (INR) y Dólar canadiense (CAD) sin comisiones ocultas.'
);
esHtml = esHtml.replace(
  'Popular Currency Conversion Rates (Updated Today)',
  'Tasas de Conversión Populares (Actualizadas Hoy)'
);
esHtml = esHtml.replace(
  'Explore live mid-market conversion baselines for world reserve currencies:',
  'Explora conversiones interbancarias de referencia en tiempo real para las principales monedas:'
);
esHtml = esHtml.replace(
  'Why Use CurrenFlow for Currency Calculations?',
  '¿Por qué usar CurrenFlow para el cálculo de divisas?'
);

const esDir = path.join(distDir, 'es');
if (!fs.existsSync(esDir)) fs.mkdirSync(esDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'es.html'), esHtml, 'utf8');
fs.writeFileSync(path.join(esDir, 'index.html'), esHtml, 'utf8');
console.log('✓ Generated dist/es.html and dist/es/index.html with canonical https://www.currenflow.com/es');

// ==========================================
// 2. GENERATE ARABIC (AR) HTML
// ==========================================
let arHtml = baseHtml;

// Head meta tags & canonical (with RTL)
arHtml = arHtml.replace('<html lang="en"', '<html lang="ar" dir="rtl"');
arHtml = arHtml.replace(
  '<title>CurrenFlow - Live Currency Converter & Exchange Rates</title>',
  '<title>CurrenFlow - محول العملات وأسعار الصرف الحية</title>'
);
arHtml = arHtml.replace(
  '<meta name="title" content="CurrenFlow - Live Currency Converter & Exchange Rates" />',
  '<meta name="title" content="CurrenFlow - محول العملات وأسعار الصرف الحية" />'
);
arHtml = arHtml.replace(
  '<meta name="description" content="Convert 160+ currencies with real-time mid-market exchange rates today. Free currency converter calculator with zero hidden fees and live forex data." />',
  '<meta name="description" content="احسب وحوّل أكثر من 160 عملة مع أسعار الصرف اللحظية الحقيقية اليوم. محول عملات مجاني بدون رسوم خفية وبيانات فوركس مباشرة." />'
);
arHtml = arHtml.replace(
  '<meta property="og:url" content="https://www.currenflow.com/" />',
  '<meta property="og:url" content="https://www.currenflow.com/ar" />'
);
arHtml = arHtml.replace(
  '<meta property="og:title" content="CurrenFlow - Real-Time Currency Converter & Live Exchange Rates" />',
  '<meta property="og:title" content="CurrenFlow - محول العملات وأسعار الصرف الحية" />'
);
arHtml = arHtml.replace(
  '<meta property="og:description" content="Convert 160+ currencies with real-time mid-market exchange rates today. Free currency converter calculator with zero hidden fees." />',
  '<meta property="og:description" content="احسب وحوّل أكثر من 160 عملة مع أسعار الصرف اللحظية الحقيقية اليوم. محول عملات مجاني بدون رسوم خفية وبيانات فوركس مباشرة." />'
);
arHtml = arHtml.replace(
  '<meta property="twitter:url" content="https://www.currenflow.com/" />',
  '<meta property="twitter:url" content="https://www.currenflow.com/ar" />'
);
arHtml = arHtml.replace(
  '<meta property="twitter:title" content="CurrenFlow - Real-Time Currency Converter & Live Exchange Rates" />',
  '<meta property="twitter:title" content="CurrenFlow - محول العملات وأسعار الصرف الحية" />'
);
arHtml = arHtml.replace(
  '<meta property="twitter:description" content="Convert 160+ currencies with real-time mid-market exchange rates today. Free currency converter calculator with zero hidden fees." />',
  '<meta property="twitter:description" content="احسب وحوّل أكثر من 160 عملة مع أسعار الصرف اللحظية الحقيقية اليوم. محول عملات مجاني بدون رسوم خفية وبيانات فوركس مباشرة." />'
);

// CRUCIAL: Self-referencing canonical tag for Arabic
arHtml = arHtml.replace(
  '<link rel="canonical" href="https://www.currenflow.com/" />',
  '<link rel="canonical" href="https://www.currenflow.com/ar" />'
);

// Fallback crawlable body in Arabic
arHtml = arHtml.replace(
  '<a href="/" style="color: #2563eb; text-decoration: none;">Converter</a>',
  '<a href="/ar" style="color: #2563eb; text-decoration: none;">محول العملات</a>'
);
arHtml = arHtml.replace(
  'Live Currency Converter &amp; Real-Time Exchange Rates',
  'محول العملات المباشر وأسعار الصرف في الوقت الفعلي'
);
arHtml = arHtml.replace(
  'Accurate, instantaneous foreign exchange calculations powered by live mid-market forex rates. Convert across 160+ world currencies including US Dollar (USD), Euro (EUR), British Pound (GBP), Indian Rupee (INR), Canadian Dollar (CAD), and Japanese Yen (JPY) with zero hidden fees.',
  'حسابات دقيقة وفورية لأسعار صرف العملات الأجنبية مدعومة ببيانات أسعار السوق الحقيقية. تحويل أكثر من 160 عملة عالمية بما في ذلك الدولار الأمريكي واليورو والجنيه الإسترليني والروبية الهندية بدون رسوم خفية.'
);
arHtml = arHtml.replace(
  'Popular Currency Conversion Rates (Updated Today)',
  'أسعار تحويل العملات الشائعة (محدثة اليوم)'
);
arHtml = arHtml.replace(
  'Explore live mid-market conversion baselines for world reserve currencies:',
  'استكشف أسعار التحويل اللحظية الحقيقية لأهم العملات العالمية المتداولة:'
);
arHtml = arHtml.replace(
  'Why Use CurrenFlow for Currency Calculations?',
  'لماذا تختار CurrenFlow لحساب أسعار العملات؟'
);

const arDir = path.join(distDir, 'ar');
if (!fs.existsSync(arDir)) fs.mkdirSync(arDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'ar.html'), arHtml, 'utf8');
fs.writeFileSync(path.join(arDir, 'index.html'), arHtml, 'utf8');
console.log('✓ Generated dist/ar.html and dist/ar/index.html with canonical https://www.currenflow.com/ar');
