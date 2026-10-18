import { useState, useEffect } from 'react';
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
import { Footer } from './components/Footer';
import type { RatesData } from './types/currency';
import { fetchExchangeRates, convertCurrency } from './services/currencyService';
import { POPULAR_PAIRS } from './data/currencies';
import { TrendingUp, ShieldCheck } from 'lucide-react';

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

  // Check URL query parameters for initial state or embed mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlFrom = params.get('from');
      const urlTo = params.get('to');
      const urlAmount = params.get('amount');
      const urlEmbed = params.get('embed');

      if (urlFrom) setFromCurrency(urlFrom.toUpperCase());
      if (urlTo) setToCurrency(urlTo.toUpperCase());
      if (urlAmount && !isNaN(parseFloat(urlAmount))) setAmount(parseFloat(urlAmount));
      if (urlEmbed === 'true') setIsEmbedMode(true);
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenEmbed={() => setIsEmbedModalOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100/70 text-blue-700 border border-blue-200 mb-4">
            <TrendingUp size={14} /> 100% Free Live Exchange Calculator
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Convert <span className="text-blue-600">{fromCurrency}</span> to{' '}
            <span className="text-amber-500">{toCurrency}</span> at Live Market Rates
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Accurate, real-time mid-market currency exchange rates. Zero hidden banking fees, updated automatically every few minutes.
          </p>

          {/* Quick Popular Pair Shortcuts */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
            <span className="text-xs font-semibold text-slate-400">Trending:</span>
            {POPULAR_PAIRS.slice(0, 6).map((pair) => (
              <button
                key={`${pair.from}-${pair.to}`}
                type="button"
                onClick={() => {
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                }}
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

        {/* Core Converter Card (Step #3 in user image) */}
        <div>
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

          <CurrencyMatrix
            baseCurrency={fromCurrency}
            rates={rates}
            onSelectTarget={(target) => setToCurrency(target)}
          />
        </div>

        {/* Mid-Page In-Content Ad Slot */}
        <AdPlaceholder format="leaderboard" />

        {/* SEO-Rich Content Section (Step #2 in user image) */}
        <div className="mb-12">
          <SeoContent />
        </div>

        {/* FAQ Accordion (Step #2 in user image) */}
        <div className="mb-12">
          <FaqSection />
        </div>

        {/* Trust Banner */}
        <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <ShieldCheck size={24} className="text-blue-600 shrink-0" />
          <p className="text-xs sm:text-sm text-blue-900 font-medium">
            <strong>Security & Privacy Guaranteed:</strong> CurrenFlow never asks for your personal information, credit cards, or banking logins. All conversions happen securely in your browser.
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

      {/* Legal & Compliance Modal (AdSense Ready) */}
      <LegalModal
        isOpen={isLegalOpen}
        activeTab={activeLegalTab}
        onClose={() => setIsLegalOpen(false)}
        onSelectTab={setActiveLegalTab}
      />

      {/* Global Footer */}
      <Footer
        onSelectPair={(from, to) => {
          setFromCurrency(from);
          setToCurrency(to);
        }}
        onOpenLegal={(tab) => {
          setActiveLegalTab(tab);
          setIsLegalOpen(true);
        }}
      />
    </div>
  );
}

export default App;
