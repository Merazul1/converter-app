import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ConverterCard } from './components/ConverterCard';
import { AffiliateBanner } from './components/AffiliateBanner';
import { ConversionTable } from './components/ConversionTable';
import { CurrencyMatrix } from './components/CurrencyMatrix';
import { SeoContent } from './components/SeoContent';
import { FaqSection } from './components/FaqSection';
import { AdPlaceholder } from './components/AdPlaceholder';
import { EmbedModal } from './components/EmbedModal';
import { LegalModal, type LegalTab } from './components/LegalModal';
import { LegalPage } from './components/LegalPage';
import { Footer } from './components/Footer';
import type { RatesData } from './types/currency';
import { fetchExchangeRates, convertCurrency } from './services/currencyService';
import { CURRENCIES, POPULAR_PAIRS } from './data/currencies';
import { TrendingUp, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS, type Language, getLocalizedSeo } from './i18n/translations';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [ratesData, setRatesData] = useState<RatesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [isEmbedMode, setIsEmbedMode] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('privacy');
  const [pageView, setPageView] = useState<'home' | 'privacy' | 'terms' | 'contact'>('home');

  const dict = TRANSLATIONS[currentLang];

  // Handle language change with clean URL updates
  const handleSelectLanguage = useCallback((newLang: Language) => {
    setCurrentLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currenflow_lang', newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';

      const currentPath = window.location.pathname.toLowerCase().replace(/\/$/, '');
      const cleanPath = currentPath.replace(/^\/(es|ar)/, '') || '';
      const newPrefix = newLang === 'en' ? '' : `/${newLang}`;
      const nextUrl = `${newPrefix}${cleanPath}` || '/';
      if (window.location.pathname !== nextUrl) {
        window.history.pushState(null, '', nextUrl);
      }
    }
  }, []);

  // Change pair and update URL without full page reload
  const updatePair = useCallback((from: string, to: string) => {
    setPageView('home');
    setFromCurrency(from);
    setToCurrency(to);
    if (typeof window !== 'undefined') {
      const langPrefix = currentLang === 'en' ? '' : `/${currentLang}`;
      const newPath = `${langPrefix}/${from.toLowerCase()}-to-${to.toLowerCase()}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({ from, to }, '', newPath);
      }
    }
  }, [currentLang]);

  // Parse path or query params on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const parseLocation = () => {
        const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '');
        let detectedLang: Language = 'en';
        let path = rawPath;

        // Detect language prefix
        if (rawPath.startsWith('/es')) {
          detectedLang = 'es';
          path = rawPath.replace(/^\/es/, '') || '/';
        } else if (rawPath.startsWith('/ar')) {
          detectedLang = 'ar';
          path = rawPath.replace(/^\/ar/, '') || '/';
        }

        setCurrentLang(detectedLang);
        document.documentElement.lang = detectedLang;
        document.documentElement.dir = detectedLang === 'ar' ? 'rtl' : 'ltr';

        // 1. Check legal paths: /privacy-policy, /terms-of-service, /contact
        if (path === '/privacy-policy') {
          setPageView('privacy');
          return;
        }
        if (path === '/terms-of-service') {
          setPageView('terms');
          return;
        }
        if (path === '/contact') {
          setPageView('contact');
          return;
        }

        setPageView('home');

        // 2. Check currency pair pathname: e.g. /usd-to-eur or /es/usd-to-eur
        const pathMatch = path.match(/\/([a-z]{3})-to-([a-z]{3})/i);
        if (pathMatch) {
          const from = pathMatch[1].toUpperCase();
          const to = pathMatch[2].toUpperCase();
          if (CURRENCIES.some((c) => c.code === from) && CURRENCIES.some((c) => c.code === to)) {
            setFromCurrency(from);
            setToCurrency(to);
            return;
          }
        }

        // 3. Fallback to query params: ?from=USD&to=EUR
        const params = new URLSearchParams(window.location.search);
        const urlFrom = params.get('from');
        const urlTo = params.get('to');
        const urlAmount = params.get('amount');
        const urlEmbed = params.get('embed');

        if (urlFrom) setFromCurrency(urlFrom.toUpperCase());
        if (urlTo) setToCurrency(urlTo.toUpperCase());
        if (urlAmount && !isNaN(parseFloat(urlAmount))) setAmount(parseFloat(urlAmount));
        if (urlEmbed === 'true') setIsEmbedMode(true);
      };

      parseLocation();

      const handlePopState = () => parseLocation();
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  // Dynamic SEO Title, Description, Canonical, and hreflang updates
  useEffect(() => {
    if (typeof window !== 'undefined' && pageView === 'home') {
      const fromObj = CURRENCIES.find((c) => c.code === fromCurrency);
      const toObj = CURRENCIES.find((c) => c.code === toCurrency);
      const fromName = fromObj?.name || fromCurrency;
      const toName = toObj?.name || toCurrency;

      // Update Document Title and Meta Description in active language
      const seo = getLocalizedSeo(currentLang, fromCurrency, toCurrency, fromName, toName);
      document.title = seo.title;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', seo.description);
      }

      // Update Canonical Link
      const canonical = document.querySelector('link[rel="canonical"]');
      const isDefaultHome = fromCurrency === 'USD' && toCurrency === 'EUR' && (window.location.pathname === '/' || window.location.pathname === '/es' || window.location.pathname === '/ar');
      const pairSlug = isDefaultHome ? '' : `/${fromCurrency.toLowerCase()}-to-${toCurrency.toLowerCase()}`;
      const canonicalUrl = currentLang === 'en'
        ? `https://www.currenflow.com${pairSlug || '/'}`
        : `https://www.currenflow.com/${currentLang}${pairSlug}`;

      if (canonical) {
        canonical.setAttribute('href', canonicalUrl);
      }

      // Update hreflang Alternate tags for Google global indexing
      const basePairSlug = isDefaultHome ? '' : `/${fromCurrency.toLowerCase()}-to-${toCurrency.toLowerCase()}`;
      const hreflangConfigs = [
        { lang: 'x-default', href: `https://www.currenflow.com${basePairSlug || '/'}` },
        { lang: 'en', href: `https://www.currenflow.com${basePairSlug || '/'}` },
        { lang: 'es', href: `https://www.currenflow.com/es${basePairSlug}` },
        { lang: 'ar', href: `https://www.currenflow.com/ar${basePairSlug}` },
      ];

      hreflangConfigs.forEach(({ lang, href }) => {
        let tag = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement | null;
        if (!tag) {
          tag = document.createElement('link');
          tag.rel = 'alternate';
          tag.hreflang = lang;
          document.head.appendChild(tag);
        }
        tag.href = href;
      });
    }
  }, [fromCurrency, toCurrency, pageView, currentLang]);

  const loadRates = async () => {
    setIsLoading(true);
    try {
      const data = await fetchExchangeRates();
      setRatesData(data);
    } catch (err) {
      console.error('Failed to load rates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, []);

  const rates = ratesData?.rates || {};
  const { rate, inverseRate } = convertCurrency(1, fromCurrency, toCurrency, rates);

  // If on a dedicated legal page route (/privacy-policy, /terms-of-service, /contact)
  if (pageView !== 'home') {
    return (
      <LegalPage
        type={pageView}
        onBackToHome={() => {
          setPageView('home');
          if (typeof window !== 'undefined') {
            window.history.pushState(null, '', '/');
          }
        }}
      />
    );
  }

  // If in embed mode, only render the converter card neatly
  if (isEmbedMode) {
    return (
      <div className="p-2 sm:p-4 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-xl">
          <ConverterCard
            ratesData={ratesData}
            isLoading={isLoading}
            onRefresh={loadRates}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            setFromCurrency={setFromCurrency}
            setToCurrency={setToCurrency}
            amount={amount}
            setAmount={setAmount}
          />
        </div>
      </div>
    );
  }

  const fromObj = CURRENCIES.find((c) => c.code === fromCurrency);
  const toObj = CURRENCIES.find((c) => c.code === toCurrency);

  const handleOpenLegal = (tab: LegalTab) => {
    setPageView(tab);
    if (typeof window !== 'undefined') {
      const path = tab === 'privacy' ? '/privacy-policy' : tab === 'terms' ? '/terms-of-service' : '/contact';
      window.history.pushState(null, '', path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white ${currentLang === 'ar' ? 'font-sans' : ''}`}>
      {/* Top Navbar with Multi-Language Switcher */}
      <Navbar
        onOpenEmbed={() => setIsEmbedModalOpen(true)}
        currentLang={currentLang}
        onSelectLanguage={handleSelectLanguage}
        dict={dict}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100/70 text-blue-700 border border-blue-200 mb-4">
            <TrendingUp size={14} /> {dict.nav.freeLiveRates}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {currentLang === 'es' ? (
              <>Convierte <span className="text-blue-600">{fromCurrency}</span> a <span className="text-amber-500">{toCurrency}</span> en Tiempo Real</>
            ) : currentLang === 'ar' ? (
              <>تحويل <span className="text-blue-600">{fromCurrency}</span> إلى <span className="text-amber-500">{toCurrency}</span> بأسعار السوق المباشرة</>
            ) : (
              <>Convert <span className="text-blue-600">{fromCurrency}</span> to <span className="text-amber-500">{toCurrency}</span> at Live Market Rates</>
            )}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {currentLang === 'es' ? (
              <>Tipos de cambio medios del mercado actualizados en tiempo real para <strong className="text-slate-900">{fromObj?.name || fromCurrency}</strong> a <strong className="text-slate-900">{toObj?.name || toCurrency}</strong>. Sin comisiones bancarias ocultas.</>
            ) : currentLang === 'ar' ? (
              <>أسعار صرف حقيقية ومباشرة من البنوك المركزية لتحويل <strong className="text-slate-900">{fromObj?.name || fromCurrency}</strong> إلى <strong className="text-slate-900">{toObj?.name || toCurrency}</strong> بدون أي رسوم خفية.</>
            ) : (
              <>Accurate, real-time mid-market currency exchange rates for <strong className="text-slate-900">{fromObj?.name || fromCurrency}</strong> to <strong className="text-slate-900">{toObj?.name || toCurrency}</strong>. Zero hidden banking fees, updated automatically every few minutes.</>
            )}
          </p>

          {/* Quick Popular Pair Shortcuts */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
            <span className="text-xs font-semibold text-slate-400">
              {currentLang === 'es' ? 'Populares:' : currentLang === 'ar' ? 'الأكثر طلباً:' : 'Trending:'}
            </span>
            {POPULAR_PAIRS.slice(0, 6).map((pair) => (
              <button
                key={`${pair.from}-${pair.to}`}
                type="button"
                onClick={() => updatePair(pair.from, pair.to)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  fromCurrency === pair.from && toCurrency === pair.to
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {pair.from}/{pair.to}
              </button>
            ))}
          </div>
        </div>

        {/* Top Monetization / Leaderboard Ad Slot */}
        <AdPlaceholder format="leaderboard" />

        {/* Core Converter Card */}
        <div>
          <ConverterCard
            ratesData={ratesData}
            isLoading={isLoading}
            onRefresh={loadRates}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            setFromCurrency={(from) => updatePair(from, toCurrency)}
            setToCurrency={(to) => updatePair(fromCurrency, to)}
            amount={amount}
            setAmount={setAmount}
            dict={dict}
          />
        </div>

        {/* High-Converting Remittance / FinTech Affiliate Card */}
        <AffiliateBanner
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          amount={amount}
        />

        {/* Quick Conversion Matrix & Breakdown Tables */}
        <div className="space-y-10 mb-12">
          <ConversionTable
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            rate={rate}
            inverseRate={inverseRate}
            dict={dict}
          />

          <CurrencyMatrix
            baseCurrency={fromCurrency}
            rates={rates}
            onSelectTarget={(target) => updatePair(fromCurrency, target)}
          />
        </div>

        {/* Mid-Page In-Content Ad Slot */}
        <AdPlaceholder format="leaderboard" />

        {/* SEO-Rich Content Section */}
        <div className="mb-12">
          <SeoContent />
        </div>

        {/* FAQ Accordion */}
        <div className="mb-12">
          <FaqSection dict={dict} />
        </div>

        {/* Trust Banner */}
        <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <ShieldCheck size={24} className="text-blue-600 shrink-0" />
          <p className="text-xs sm:text-sm text-blue-900 font-medium">
            <strong>Security &amp; Privacy Guaranteed:</strong> CurrenFlow never asks for your personal information, credit cards, or banking logins. All conversions happen securely in your browser.
          </p>
        </div>
      </main>

      {/* Embed Modal */}
      <EmbedModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />

      {/* Legal & Compliance Modal (Quick Popup) */}
      <LegalModal
        isOpen={isLegalOpen}
        activeTab={activeLegalTab}
        onClose={() => setIsLegalOpen(false)}
        onSelectTab={setActiveLegalTab}
      />

      {/* Global Footer */}
      <Footer
        onSelectPair={(from, to) => updatePair(from, to)}
        onOpenLegal={handleOpenLegal}
        dict={dict}
        currentLang={currentLang}
      />
    </div>
  );
}

export default App;
