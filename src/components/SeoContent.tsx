import React from 'react';
import { ShieldCheck, Zap, Globe, Calculator, Layers, Award } from 'lucide-react';

export const SeoContent: React.FC = () => {
  return (
    <article className="prose prose-slate max-w-none space-y-12">
      {/* High Quality Introduction */}
      <section className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 uppercase tracking-wider mb-4">
            <Award size={14} /> Reliable & Accurate
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Smart, Free Online Currency Converter for Global Transactions
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-4">
            Whether you are traveling overseas, shopping on international e-commerce platforms, sending remittances to family, or analyzing global foreign exchange markets, <strong className="text-slate-900">CurrenFlow</strong> provides the real-time foreign exchange data you can trust.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Unlike many banks and currency exchange kiosks that quote inflated exchange rates with hidden 3% to 5% markups, our engine delivers the <strong className="text-slate-900">true mid-market exchange rate</strong> directly from interbank networks. Zero commissions, zero subscriptions, completely free.
          </p>
        </div>
      </section>

      {/* How It Works - 3 Step Visual (Step #2 & Step #3 from reel) */}
      <section className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
          How It Works in 3 Simple Steps
        </h3>
        <p className="text-slate-500 text-sm mb-8">
          Perform accurate currency calculations instantly on any device with zero friction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
              1
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Calculator size={18} className="text-blue-600" /> Enter the Amount
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Type in the number of units you want to convert. You can also pick from our quick shortcut chips ($50, $100, $500, etc.) for instant calculation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
              2
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Layers size={18} className="text-blue-600" /> Choose Currencies
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Select your origin currency and target currency from over 160 world currencies. Use the Swap button to immediately reverse the calculation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
              3
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Zap size={18} className="text-blue-600" /> Get Live Market Rate
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Instantly view the precise converted total, direct mid-market exchange rate, reverse rate, and 1-click copy functionality for your records.
            </p>
          </div>
        </div>
      </section>

      {/* Mid-Market Rate vs Bank Markups */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 md:p-10 shadow-lg">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
            <ShieldCheck size={14} /> Financial Transparency
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-white">
            Beware of Hidden Banking Markups
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            When you see advertisements claiming <em className="text-amber-400">"0% Commission Currency Exchange"</em>, providers often conceal their fees inside an unfair exchange rate spread. 
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h5 className="font-bold text-amber-400 text-sm mb-1">Traditional Banks & Kiosks</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add an invisible markup of 2% to 6% above the actual market rate, costing you tens or hundreds of dollars on large transfers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-400/30">
              <h5 className="font-bold text-blue-300 text-sm mb-1">CurrenFlow Mid-Market Rate</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Displays the 100% unbiased interbank equilibrium rate used by global institutions, giving you total transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Globe size={20} />
          </div>
          <h4 className="font-bold text-slate-900 text-base mb-1">160+ Currencies</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Full support for major reserve currencies, emerging markets, and key cryptocurrencies like Bitcoin.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Zap size={20} />
          </div>
          <h4 className="font-bold text-slate-900 text-base mb-1">Ultra-Fast & Mobile Ready</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Optimized for sub-second page loads, zero battery drain, and effortless touch controls on any mobile screen.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <ShieldCheck size={20} />
          </div>
          <h4 className="font-bold text-slate-900 text-base mb-1">Embeddable Free Widget</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Easily embed this responsive currency calculator directly into your own website or blog in 30 seconds.
          </p>
        </div>
      </section>
    </article>
  );
};
