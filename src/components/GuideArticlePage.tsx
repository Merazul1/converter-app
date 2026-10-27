import React, { useEffect } from 'react';
import { ArrowLeft, Clock, Tag, User, CheckCircle2, AlertTriangle, Info, Coins, ChevronRight, HelpCircle } from 'lucide-react';
import type { GuideArticle } from '../data/guidesData';
import { GUIDES } from '../data/guidesData';
import { Footer } from './Footer';
import type { LegalTab } from './LegalModal';

interface GuideArticlePageProps {
  article: GuideArticle;
  onBackToGuides: () => void;
  onBackToHome: () => void;
  onSelectGuide: (slug: string) => void;
  onOpenAbout?: () => void;
  onOpenLegal?: (tab: LegalTab) => void;
  onSelectPair?: (from: string, to: string) => void;
}

export const GuideArticlePage: React.FC<GuideArticlePageProps> = ({
  article,
  onBackToGuides,
  onBackToHome,
  onSelectGuide,
  onOpenAbout,
  onOpenLegal,
  onSelectPair,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${article.title} | CurrenFlow Guides`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', article.summary);
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://www.currenflow.com/guides/${article.slug}`);
    }
  }, [article]);

  const otherGuides = GUIDES.filter((g) => g.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToGuides}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> All Guides
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 font-medium">
          <button type="button" onClick={onBackToHome} className="hover:text-blue-600 cursor-pointer">
            Home
          </button>
          <ChevronRight size={12} className="text-slate-400" />
          <button type="button" onClick={onBackToGuides} className="hover:text-blue-600 cursor-pointer">
            Guides
          </button>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-800 font-bold truncate max-w-xs">{article.category}</span>
        </nav>

        {/* Article Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
              <Tag size={12} /> {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-slate-400" /> {article.readTime}
            </span>
            <span>•</span>
            <span>{article.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-medium">
            {article.subtitle}
          </p>

          <div className="flex items-center gap-3 pt-6 border-t border-slate-100 text-xs text-slate-500">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <User size={16} />
            </div>
            <div>
              <div className="font-bold text-slate-900">{article.author}</div>
              <div className="text-[11px] text-slate-500">{article.authorRole}</div>
            </div>
          </div>
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-3xl p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-bold text-blue-950 mb-3 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600" size={20} /> Key Takeaways
            </h2>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-blue-900/90 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-10 space-y-10">
          {article.content.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {section.heading}
              </h2>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Callout box */}
              {section.callout && (
                <div
                  className={`p-5 rounded-2xl border my-4 ${
                    section.callout.type === 'warning'
                      ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                      : section.callout.type === 'tip'
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : 'bg-blue-50/80 border-blue-200 text-blue-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                    {section.callout.type === 'warning' ? (
                      <AlertTriangle size={18} className="text-amber-600" />
                    ) : (
                      <Info size={18} className="text-blue-600" />
                    )}
                    {section.callout.title}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">{section.callout.text}</p>
                </div>
              )}

              {/* Data Table */}
              {section.table && (
                <div className="overflow-x-auto my-6 border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold">
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3 sm:p-4">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 sm:p-4 text-slate-700 font-medium">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* Article FAQ */}
          {article.faq && article.faq.length > 0 && (
            <div className="pt-8 border-t border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <HelpCircle size={20} className="text-blue-600" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {article.faq.map((f, fIdx) => (
                  <div key={fIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{f.question}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Guides */}
        {otherGuides.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Read Next in Currency Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherGuides.map((g) => (
                <div
                  key={g.id}
                  onClick={() => onSelectGuide(g.slug)}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer shadow-xs group"
                >
                  <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    {g.category}
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm mb-2">
                    {g.title}
                  </h3>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>{g.readTime}</span>
                    <span>•</span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      Read article <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Home CTA */}
        <div className="text-center py-6">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            Launch Live Currency Calculator <ChevronRight size={16} />
          </button>
        </div>
      </main>

      <Footer
        onSelectPair={(from, to) => onSelectPair && onSelectPair(from, to)}
        onOpenLegal={(tab) => onOpenLegal && onOpenLegal(tab)}
        onOpenAbout={() => onOpenAbout && onOpenAbout()}
        onOpenGuides={() => onBackToGuides()}
        onSelectGuide={(slug) => onSelectGuide(slug)}
      />
    </div>
  );
};
