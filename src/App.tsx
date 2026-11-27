import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ConverterCard } from './components/ConverterCard';
import { AffiliateBanner } from './components/AffiliateBanner';
import { ConversionTable } from './components/ConversionTable';
import { PairInsightSection } from './components/PairInsightSection';
import { CurrencyMatrix } from './components/CurrencyMatrix';
import { SeoContent } from './components/SeoContent';
import { FaqSection } from './components/FaqSection';
import { AdUnit } from './components/AdUnit';
import { EmbedModal } from './components/EmbedModal';
import { LegalModal, type LegalTab } from './components/LegalModal';
import { LegalPage } from './components/LegalPage';
import { AboutPage } from './components/AboutPage';
import { GuidesHubPage } from './components/GuidesHubPage';
import { GuideArticlePage } from './components/GuideArticlePage';
import { Footer } from './components/Footer';
import type { RatesData } from './types/currency';
import { fetchExchangeRates, convertCurrency } from './services/currencyService';
import { CURRENCIES, POPULAR_PAIRS } from './data/currencies';
import { GUIDES } from './data/guidesData';
import { TrendingUp, ShieldCheck, Sparkles, ArrowUp, BookOpen, Zap, CheckCircle2 } from 'lucide-react';

type PageViewType = 'home' | 'privacy' | 'terms' | 'contact' | 'about' | 'guides' | 'guide-detail';

export function App() {
  const [ratesData, setRatesData] = useState<RatesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [isEmbedMode, setIsEmbedMode] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('privacy');
  const [pageView, setPageView] = useState<PageViewType>('home');
  const [activeGuideSlug, setActiveGuideSlug] = useState<string | null>(null);

  // Change currency pair and update URL without full page reload
  const updatePair = useCallback((from: string, to: string) => {
    setPageView('home');
    setFromCurrency(from);
    setToCurrency(to);
    if (typeof window !== 'undefined') {
      const newPath = `/${from.toLowerCase()}-to-${to.toLowerCase()}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({ from, to }, '', newPath);
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const navigateTo = useCallback((path: string, view: PageViewType) => {
    setPageView(view);
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const navigateToGuide = useCallback((slug: string) => {
    setActiveGuideSlug(slug);
    setPageView('guide-detail');
    if (typeof window !== 'undefined') {
      const path = `/guides/${slug}`;
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Parse path or query params on initial load and popstate
  const parseLocation = useCallback(() => {
    const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';

    // 1. Legal paths: /privacy-policy, /terms-of-service, /contact
    if (rawPath === '/privacy-policy' || rawPath === '/privacy-policy.html') {
      setPageView('privacy');
      return;
    }
    if (rawPath === '/terms-of-service' || rawPath === '/terms-of-service.html') {
      setPageView('terms');
      return;
    }
    if (rawPath === '/contact' || rawPath === '/contact.html') {
      setPageView('contact');
      return;
    }

    // 2. About Us & Methodology
    if (rawPath === '/about' || rawPath === '/about.html') {
      setPageView('about');
      return;
    }

    // 3. Guides Hub
    if (rawPath === '/guides' || rawPath === '/guides.html') {
      setPageView('guides');
      return;
    }

    // 4. Guide Detail /guides/:slug
    const guideMatch = rawPath.match(/^\/guides\/([a-z0-9-]+)(\.html)?$/i);
    if (guideMatch) {
      const slug = guideMatch[1];
      const found = GUIDES.find((g) => g.slug === slug);
      if (found) {
        setActiveGuideSlug(found.slug);
        setPageView('guide-detail');
        return;
      }
    }

    // 5. Check currency pair pathname: e.g. /usd-to-eur
    const pathMatch = rawPath.match(/\/([a-z]{3})-to-([a-z]{3})/i);
    if (pathMatch) {
      const from = pathMatch[1].toUpperCase();
      const to = pathMatch[2].toUpperCase();
      if (CURRENCIES.some((c) => c.code === from) && CURRENCIES.some((c) => c.code === to)) {
        setFromCurrency(from);
        setToCurrency(to);
        setPageView('home');
        return;
      }
    }

    // 6. Fallback to query params: ?from=USD&to=EUR
    setPageView('home');
    const params = new URLSearchParams(window.location.search);
    const urlFrom = params.get('from');
    const urlTo = params.get('to');
    const urlAmount = params.get('amount');
    const urlEmbed = params.get('embed');

    if (urlFrom) setFromCurrency(urlFrom.toUpperCase());
    if (urlTo) setToCurrency(urlTo.toUpperCase());
    if (urlAmount && !isNaN(parseFloat(urlAmount))) setAmount(parseFloat(urlAmount));
    if (urlEmbed === 'true') setIsEmbedMode(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';

      parseLocation();

      const handlePopState = () => parseLocation();
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [parseLocation]);

  // Dynamic SEO Title, Description, Canonical, and Rich Snippet JSON-LD for Home & Pair views
  useEffect(() => {
    if (typeof window !== 'undefined' && pageView === 'home') {
      const isDefaultHome = fromCurrency === 'USD' && toCurrency === 'EUR' && window.location.pathname === '/';
      const pairSlug = isDefaultHome ? '' : `/${fromCurrency.toLowerCase()}-to-${toCurrency.toLowerCase()}`;
      const canonicalUrl = `https://www.currenflow.com${pairSlug || '/'}`;

      const currentRate = ratesData?.rates?.[toCurrency] && ratesData?.rates?.[fromCurrency]
        ? (ratesData.rates[toCurrency] / ratesData.rates[fromCurrency])
        : null;
      const rateStr = currentRate
        ? (currentRate >= 100 ? currentRate.toFixed(2) : currentRate >= 1 ? currentRate.toFixed(2) : currentRate >= 0.01 ? currentRate.toFixed(4) : currentRate.toFixed(6))
        : '';

      if (isDefaultHome) {
        document.title = 'CurrenFlow: Live Currency Converter & Exchange Rates';
      } else if (fromCurrency === 'USD' && toCurrency === 'PKR') {
        document.title = `1 USD = ${rateStr || '278.50'} PKR: Live Dollar to Rupee Rate | CurrenFlow`;
      } else if (fromCurrency === 'USD' && toCurrency === 'EUR') {
        document.title = `1 USD = ${rateStr || '0.92'} EUR: Live Dollar to Euro Rate | CurrenFlow`;
      } else if (fromCurrency === 'USD' && toCurrency === 'INR') {
        document.title = `1 USD = ${rateStr || '84.40'} INR: Live Dollar to Rupee Rate | CurrenFlow`;
      } else if (fromCurrency === 'USD' && toCurrency === 'BDT') {
        document.title = `1 USD = ${rateStr || '119.80'} BDT: Live Dollar to Taka Rate | CurrenFlow`;
      } else if (fromCurrency === 'USD' && toCurrency === 'JPY') {
        document.title = `1 USD = ${rateStr || '155.40'} JPY: Live Dollar to Yen Rate | CurrenFlow`;
      } else if (fromCurrency === 'USD' && toCurrency === 'MXN') {
        document.title = `1 USD = ${rateStr || '20.30'} MXN: Dólar a Peso Mexicano | CurrenFlow`;
      } else if (fromCurrency === 'CAD' && toCurrency === 'USD') {
        document.title = `1 CAD = ${rateStr || '0.71'} USD: Live Canadian Dollar Rate | CurrenFlow`;
      } else {
        const ratePart = rateStr ? `1 ${fromCurrency} = ${rateStr} ${toCurrency}` : `${fromCurrency} to ${toCurrency}`;
        document.title = `${fromCurrency} to ${toCurrency}: ${ratePart} Live Rate | CurrenFlow`;
      }

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        if (isDefaultHome) {
          metaDesc.setAttribute(
            'content',
            'Convert 160+ world currencies at live mid-market exchange rates. Free instant currency calculator, popular conversion tables, and real-time interbank charts.'
          );
        } else {
          const rateSentence = rateStr ? `1 ${fromCurrency} = ${rateStr} ${toCurrency}. ` : '';
          metaDesc.setAttribute(
            'content',
            `Live ${fromCurrency} to ${toCurrency} exchange rate: ${rateSentence}Free instant currency calculator, popular conversion tables, and real-time interbank charts.`
          );
        }
      }

      // Update Canonical Link
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', canonicalUrl);
      }

      // Clean up any obsolete hreflang alternate tags
      const alternateTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
      alternateTags.forEach((tag) => tag.remove());

      // Dynamic Rich Snippet JSON-LD Schemas (BreadcrumbList & FAQPage)
      const fromObj = CURRENCIES.find((c) => c.code === fromCurrency);
      const toObj = CURRENCIES.find((c) => c.code === toCurrency);
      const fromName = fromObj?.name || fromCurrency;
      const toName = toObj?.name || toCurrency;

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'CurrenFlow',
            item: 'https://www.currenflow.com/'
          },
          ...(isDefaultHome
            ? []
            : [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: `${fromCurrency} to ${toCurrency}`,
                  item: canonicalUrl
                }
              ])
        ]
      };

      const faqSchema = isDefaultHome
        ? null
        : {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What is 1 ${fromCurrency} to ${toCurrency} today?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `1 ${fromName} (${fromCurrency}) is currently ${rateStr ? `${rateStr} ${toName} (${toCurrency})` : 'updated live'} at the interbank mid-market rate on CurrenFlow.`
                }
              },
              {
                '@type': 'Question',
                name: `Do commercial banks charge hidden fees on ${fromCurrency} to ${toCurrency} transfers?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Yes, retail banks frequently add a 3% to 5% spread margin on exchange rates. See our guide to hidden bank fees: https://www.currenflow.com/guides/hidden-bank-exchange-rate-fees`
                }
              },
              {
                '@type': 'Question',
                name: `How does CurrenFlow calculate ${fromCurrency} to ${toCurrency} conversions?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `CurrenFlow calculates conversions using real-time wholesale interbank exchange rates with zero retail markup.`
                }
              }
            ]
          };

      const schemasToInject = faqSchema ? [breadcrumbSchema, faqSchema] : [breadcrumbSchema];
      let pairSchemaEl = document.getElementById('currenflow-pair-schemas') as HTMLScriptElement | null;
      if (!pairSchemaEl) {
        pairSchemaEl = document.createElement('script');
        pairSchemaEl.id = 'currenflow-pair-schemas';
        pairSchemaEl.type = 'application/ld+json';
        document.head.appendChild(pairSchemaEl);
      }
      pairSchemaEl.textContent = JSON.stringify(schemasToInject);

      return () => {
        const el = document.getElementById('currenflow-pair-schemas');
        if (el) el.remove();
      };
    }
  }, [fromCurrency, toCurrency, pageView, ratesData]);

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

  const handleOpenLegal = (tab: LegalTab) => {
    setPageView(tab);
    if (typeof window !== 'undefined') {
      const path = tab === 'privacy' ? '/privacy-policy' : tab === 'terms' ? '/terms-of-service' : '/contact';
      window.history.pushState(null, '', path);
      window.scrollTo(0, 0);
    }
  };

  // Dedicated routes:
  if (pageView === 'privacy' || pageView === 'terms' || pageView === 'contact') {
    return (
      <LegalPage
        type={pageView}
        onBackToHome={() => navigateTo('/', 'home')}
      />
    );
  }

  if (pageView === 'about') {
    return (
      <AboutPage
        onBackToHome={() => navigateTo('/', 'home')}
        onOpenGuides={() => navigateTo('/guides', 'guides')}
        onOpenLegal={handleOpenLegal}
        onSelectPair={(from, to) => updatePair(from, to)}
        onSelectGuide={navigateToGuide}
      />
    );
  }

  if (pageView === 'guides') {
    return (
      <GuidesHubPage
        onBackToHome={() => navigateTo('/', 'home')}
        onSelectGuide={navigateToGuide}
        onOpenAbout={() => navigateTo('/about', 'about')}
        onOpenLegal={handleOpenLegal}
        onSelectPair={(from, to) => updatePair(from, to)}
      />
    );
  }

  if (pageView === 'guide-detail') {
    const currentArticle = GUIDES.find((g) => g.slug === activeGuideSlug) || GUIDES[0];
    return (
      <GuideArticlePage
        article={currentArticle}
        onBackToGuides={() => navigateTo('/guides', 'guides')}
        onBackToHome={() => navigateTo('/', 'home')}
        onSelectGuide={navigateToGuide}
        onOpenAbout={() => navigateTo('/about', 'about')}
        onOpenLegal={handleOpenLegal}
        onSelectPair={(from, to) => updatePair(from, to)}
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenHome={() => navigateTo('/', 'home')}
        onOpenGuides={() => navigateTo('/guides', 'guides')}
        onOpenAbout={() => navigateTo('/about', 'about')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-8 pb-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100/70 text-blue-700 border border-blue-200 mb-4">
            <TrendingUp size={14} /> Free Live Rates
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Convert <span className="text-blue-600">{fromCurrency}</span> to <span className="text-amber-500">{toCurrency}</span> at Live Market Rates
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Accurate, real-time mid-market currency exchange rates for <strong className="text-slate-900">{fromObj?.name || fromCurrency}</strong> to <strong className="text-slate-900">{toObj?.name || toCurrency}</strong>. Zero hidden banking fees, updated automatically every few minutes.
          </p>

          {/* Quick Popular Pair Shortcuts */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
            <span className="text-xs font-semibold text-slate-400">Trending:</span>
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
          />

          {/* Currency Pair Editorial Insight & Fee Analysis */}
          <PairInsightSection
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            fromName={fromObj?.name || fromCurrency}
            toName={toObj?.name || toCurrency}
            rate={rate}
          />

          <CurrencyMatrix
            baseCurrency={fromCurrency}
            rates={rates}
            onSelectTarget={(target) => updatePair(fromCurrency, target)}
          />
        </div>

        {/* Mid-Page In-Content Ad Slot */}
        <AdUnit slot="4589217032" format="horizontal" />

        {/* SEO-Rich Content Section */}
        <div className="mb-12">
          <SeoContent />
        </div>

        {/* FAQ Accordion */}
        <div className="mb-10">
          <FaqSection />
        </div>

        {/* Pre-Footer Conversion & Trust Hub */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden my-8">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles size={14} className="text-blue-400" /> Fast &amp; 100% Free Forever
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Convert Another Currency?
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Calculate live mid-market exchange rates across 160+ world currencies with zero banking markups and real-time interbank spreads.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <ArrowUp size={16} /> Convert Currency Now
              </button>
              <a
                href="/guides"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/guides', 'guides');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
              >
                <BookOpen size={16} /> Explore Forex Guides
              </a>
            </div>

            {/* Quick Corridor Jump Pills */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Popular Currency Corridors:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {[
                  { from: 'USD', to: 'EUR' },
                  { from: 'USD', to: 'PKR' },
                  { from: 'USD', to: 'INR' },
                  { from: 'USD', to: 'BDT' },
                  { from: 'USD', to: 'CAD' },
                  { from: 'USD', to: 'JPY' },
                  { from: 'EUR', to: 'GBP' },
                  { from: 'USD', to: 'MXN' },
                ].map((p) => (
                  <button
                    key={`${p.from}-${p.to}`}
                    type="button"
                    onClick={() => {
                      updatePair(p.from, p.to);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700/80 transition-colors cursor-pointer"
                  >
                    {p.from}/{p.to}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Core Trust Assurances */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-left text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-800">
                <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100 block font-semibold">100% Private</strong>
                  <span className="text-slate-400 text-[11px]">No logins or cookies. Conversions stay in browser.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-800">
                <Zap size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100 block font-semibold">Live Interbank Feeds</strong>
                  <span className="text-slate-400 text-[11px]">Real mid-market baseline updated automatically.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-800">
                <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100 block font-semibold">0% Retail Markups</strong>
                  <span className="text-slate-400 text-[11px]">Bypass 3%–5% commercial bank hidden charges.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
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
        onOpenAbout={() => navigateTo('/about', 'about')}
        onOpenGuides={() => navigateTo('/guides', 'guides')}
        onSelectGuide={navigateToGuide}
      />
    </div>
  );
}

export default App;
