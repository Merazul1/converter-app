import React, { useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, Tag, ArrowRight, Coins, Sparkles } from 'lucide-react';
import { GUIDES } from '../data/guidesData';
import { Footer } from './Footer';
import type { LegalTab } from './LegalModal';

interface GuidesHubPageProps {
  onBackToHome: () => void;
  onSelectGuide: (slug: string) => void;
  onOpenAbout?: () => void;
  onOpenLegal?: (tab: LegalTab) => void;
  onSelectPair?: (from: string, to: string) => void;
}

export const GuidesHubPage: React.FC<GuidesHubPageProps> = ({
  onBackToHome,
  onSelectGuide,
  onOpenAbout,
  onOpenLegal,
  onSelectPair,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Forex & Currency Transfer Guides | CurrenFlow';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Expert foreign exchange guides: avoid hidden commercial bank markups, understand central bank rates, and save on global transfers.'
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://www.currenflow.com/guides');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
            <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
              Knowledge Base
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

      {/* Main Hero */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100/70 text-blue-700 border border-blue-200 mb-4">
            <BookOpen size={14} /> Currency Education &amp; Insights
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Foreign Exchange &amp; International Transfer Guides
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Practical, in-depth resources explaining how exchange rates work, how to avoid hidden banking fees, and how to maximize your money across borders.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {GUIDES.map((guide) => (
            <article
              key={guide.id}
              onClick={() => onSelectGuide(guide.slug)}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Category & Read Time */}
                <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-500 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-blue-700 border border-slate-200 text-[11px]">
                    <Tag size={11} /> {guide.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock size={12} /> {guide.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                  {guide.title}
                </h2>

                {/* Subtitle / Summary */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {guide.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{guide.date}</span>
                <span className="inline-flex items-center gap-1 font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  Read Guide <ArrowRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-blue-600/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20 mb-3">
              <Sparkles size={14} /> Ready to calculate?
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Check Today’s Live Mid-Market Exchange Rates
            </h2>
            <p className="text-sm text-blue-100 max-w-xl">
              Use CurrenFlow's real-time currency calculator with 160+ world currencies, central bank rates, and zero retail markups.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToHome}
            className="px-6 py-3 bg-white text-blue-700 font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors shadow-md cursor-pointer shrink-0"
          >
            Launch Calculator
          </button>
        </div>
      </main>

      <Footer
        onSelectPair={(from, to) => onSelectPair && onSelectPair(from, to)}
        onOpenLegal={(tab) => onOpenLegal && onOpenLegal(tab)}
        onOpenAbout={() => onOpenAbout && onOpenAbout()}
        onOpenGuides={() => {}}
        onSelectGuide={(slug) => onSelectGuide(slug)}
      />
    </div>
  );
};
