import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ConverterCard } from './components/ConverterCard';
import { AffiliateBanner } from './components/AffiliateBanner';
import { ConversionTable } from './components/ConversionTable';
import { PairInsightSection } from './components/PairInsightSection';
import { CurrencyMatrix } from './components/CurrencyMatrix';
import { SeoContent } from './components/SeoContent';
import { FaqSection } from './components/FaqSection';
import { AdPlaceholder } from './components/AdPlaceholder';
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
import { TrendingUp, ShieldCheck } from 'lucide-react';

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

  // Dynamic SEO Title, Description, and Canonical updates for Home & Pair views
  useEffect(() => {
    if (typeof window !== 'undefined' && pageView === 'home') {
      const fromObj = CURRENCIES.find((c) => c.code === fromCurrency);
      const toObj = CURRENCIES.find((c) => c.code === toCurrency);
      const fromName = fromObj?.name || fromCurrency;
      const toName = toObj?.name || toCurrency;

      const isDefaultHome = fromCurrency === 'USD' && toCurrency === 'EUR' && window.location.pathname === '/';
      const pairSlug = isDefaultHome ? '' : `/${fromCurrency.toLowerCase()}-to-${toCurrency.toLowerCase()}`;
      const canonicalUrl = `https://www.currenflow.com${pairSlug || '/'}`;

      if (isDefaultHome) {
        document.title = 'CurrenFlow: Live Currency Converter & Exchange Rates (0% Bank Fees)';
      } else {
        document.title = `${fromCurrency} to ${toCurrency}: Live Mid-Market Exchange Rate (0% Bank Fees) | CurrenFlow`;
      }

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        if (isDefaultHome) {
          metaDesc.setAttribute(
            'content',
            'Convert 160+ currencies with real-time mid-market exchange rates today (0% bank fees). Free live currency converter calculator with zero hidden markups.'
          );
        } else {
          metaDesc.setAttribute(
            'content',
            `Convert ${fromCurrency} (${fromName}) to ${toCurrency} (${toName}) at live mid-market rates (0% bank fees). Check real-time exchange tables and calculate conversions on CurrenFlow.`
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
    }
  }, [fromCurrency, toCurrency, pageView]);

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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16">
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
        <AdPlaceholder format="leaderboard" />

        {/* SEO-Rich Content Section */}
        <div className="mb-12">
          <SeoContent />
        </div>

        {/* FAQ Accordion */}
        <div className="mb-12">
          <FaqSection />
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
        onOpenAbout={() => navigateTo('/about', 'about')}
        onOpenGuides={() => navigateTo('/guides', 'guides')}
        onSelectGuide={navigateToGuide}
      />
    </div>
  );
}

export default App;
