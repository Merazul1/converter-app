import React, { useEffect } from 'react';
import { ArrowLeft, Coins, ShieldCheck, Database, Award, Users, CheckCircle, Mail, Globe } from 'lucide-react';
import { Footer } from './Footer';
import type { LegalTab } from './LegalModal';

interface AboutPageProps {
  onBackToHome: () => void;
  onOpenGuides?: () => void;
  onOpenLegal?: (tab: LegalTab) => void;
  onSelectPair?: (from: string, to: string) => void;
  onSelectGuide?: (slug: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onOpenGuides,
  onOpenLegal,
  onSelectPair,
  onSelectGuide,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us & Methodology | CurrenFlow';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'CurrenFlow provides transparent mid-market exchange rates, central bank methodology, and consumer-first financial tools.'
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://www.currenflow.com/about');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Coins size={22} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Curren<span className="text-blue-600">Flow</span>
            </span>
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Live Converter
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100/70 text-blue-700 border border-blue-200 mb-4">
            <ShieldCheck size={14} /> Transparency in Global Finance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            About CurrenFlow &amp; Our Exchange Rate Methodology
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Democratizing real-time foreign exchange data so everyday consumers, travelers, expats, and businesses never overpay on hidden bank conversion spreads.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Award className="text-blue-600" size={24} /> Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              CurrenFlow was founded with a singular, resolute objective: <strong>complete transparency in foreign exchange rates</strong>.
            </p>
            <p className="text-slate-600 leading-relaxed">
              For decades, traditional commercial banking institutions, airport kiosks, and retail credit card networks have operated in an opaque pricing environment. By advertising "low fees" or "0% commission" while simultaneously inflating exchange rates with a 3% to 5% hidden markup, billions of dollars are quietly extracted from international travelers, students, freelance workers, and migrant families sending remittances back home.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              CurrenFlow provides a real-time, independent, zero-markup benchmark. By exposing the true interbank mid-market exchange rate, we empower consumers to evaluate every transfer quote, challenge unreasonable bank fees, and keep their hard-earned money.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Data Methodology Section */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Database className="text-emerald-600" size={24} /> Data Sources &amp; Calculation Methodology
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Our real-time rates are aggregated from authoritative international financial institutions, open central banking networks, and global foreign exchange liquidity providers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 text-sm">
                  <CheckCircle size={16} className="text-emerald-600" /> European Central Bank (ECB) Reference Feeds
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Daily official reference rates published by the European Central Bank across major world reserve currencies, ensuring strict compliance with regulatory benchmarks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 text-sm">
                  <CheckCircle size={16} className="text-emerald-600" /> Real-Time Interbank Mid-Market Rates
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Live streaming quotations representing the exact mathematical midpoint between global buy and sell orders across international foreign exchange trading desks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 text-sm">
                  <CheckCircle size={16} className="text-emerald-600" /> Multi-Source Automated Redundancy
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our servers validate price quotes across multiple independent financial market nodes every few minutes to prevent anomalies, exchange rate freezes, or data skew.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 text-sm">
                  <CheckCircle size={16} className="text-emerald-600" /> Absolute Zero Retail Markups
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unlike commercial banking portals, CurrenFlow never adjusts, rounds up, or adds spreads to any displayed quotation. What you see is the true market baseline.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Editorial Standards & Integrity */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Globe className="text-blue-600" size={24} /> Editorial Standards &amp; Educational Focus
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              All guides, economic analyses, and educational resources published on CurrenFlow adhere to rigorous financial accuracy and consumer protection standards:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
              <li><strong>Independent &amp; Objective:</strong> Our educational guides prioritize consumer transparency over financial institution marketing claims.</li>
              <li><strong>Fact-Checked Data:</strong> All fee comparisons and exchange rate calculations cite public fee disclosures, central bank data, and documented market averages.</li>
              <li><strong>Regular Auditing:</strong> Articles are reviewed and refreshed regularly to reflect shifting central bank monetary policies and regulatory changes.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Corporate Transparency & Contact */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Users className="text-indigo-600" size={24} /> Who We Are &amp; Contact Information
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              CurrenFlow is developed and maintained by a dedicated group of software engineers and financial analysts passionate about open internet tools and fair global commerce. We do not require accounts, we do not store financial credentials, and our core calculator is 100% free forever.
            </p>
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900">Have questions, feedback, or API partnership inquiries?</div>
                <div className="text-xs text-slate-500 mt-0.5">Our support team responds within 24–48 hours.</div>
              </div>
              <a
                href="mailto:support@currenflow.com"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <Mail size={14} /> support@currenflow.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer
        onSelectPair={(from, to) => onSelectPair && onSelectPair(from, to)}
        onOpenLegal={(tab) => onOpenLegal && onOpenLegal(tab)}
        onOpenAbout={() => {}}
        onOpenGuides={() => onOpenGuides && onOpenGuides()}
        onSelectGuide={(slug) => onSelectGuide && onSelectGuide(slug)}
      />
    </div>
  );
};
