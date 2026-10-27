import React from 'react';
import { Coins, BookOpen } from 'lucide-react';
import { POPULAR_PAIRS } from '../data/currencies';
import { GUIDES } from '../data/guidesData';
import type { LegalTab } from './LegalModal';

interface FooterProps {
  onSelectPair: (from: string, to: string) => void;
  onOpenLegal: (tab: LegalTab) => void;
  onOpenAbout?: () => void;
  onOpenGuides?: () => void;
  onSelectGuide?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectPair,
  onOpenLegal,
  onOpenAbout,
  onOpenGuides,
  onSelectGuide,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info (col-span-3) */}
          <div className="md:col-span-3">
            <a href="https://www.currenflow.com/" className="flex items-center gap-2 mb-4 group cursor-pointer inline-flex" title="CurrenFlow">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Coins size={18} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                Curren<span className="text-blue-400">Flow</span>
              </span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Fast, free, and accurate currency converter with real-time mid-market exchange rates for global commerce, travel, and financial planning.
            </p>
            <div className="text-[11px] text-slate-500">
              Zero retail bank markups • Verified interbank feeds.
            </div>
          </div>

          {/* Popular Pairs Links (col-span-5) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Popular Currency Pairs (Live Rates)
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_PAIRS.slice(0, 14).map((pair) => {
                const path = `/${pair.from.toLowerCase()}-to-${pair.to.toLowerCase()}`;
                return (
                  <a
                    key={`${pair.from}-${pair.to}`}
                    href={path}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectPair(pair.from, pair.to);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-left text-xs text-slate-400 hover:text-white transition-colors py-0.5 truncate"
                    title={`Convert ${pair.from} to ${pair.to}`}
                  >
                    {pair.from} to {pair.to}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Educational Guides (col-span-3) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <BookOpen size={13} className="text-blue-400" /> Forex &amp; Fee Guides
            </h4>
            <ul className="space-y-2 text-xs">
              {GUIDES.map((g) => (
                <li key={g.id}>
                  <a
                    href={`/guides/${g.slug}`}
                    onClick={(e) => {
                      if (onSelectGuide) {
                        e.preventDefault();
                        onSelectGuide(g.slug);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-slate-400 hover:text-blue-400 transition-colors line-clamp-1"
                    title={g.title}
                  >
                    {g.title}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href="/guides"
                  onClick={(e) => {
                    if (onOpenGuides) {
                      e.preventDefault();
                      onOpenGuides();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="text-xs font-bold text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  View All Guides &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Company (col-span-2) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs mb-4">
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    if (onOpenAbout) {
                      e.preventDefault();
                      onOpenAbout();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Us &amp; Methodology
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenLegal('privacy');
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenLegal('terms');
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/contact.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenLegal('contact');
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact &amp; Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CurrenFlow (currenflow.com). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="/about"
              onClick={(e) => {
                if (onOpenAbout) {
                  e.preventDefault();
                  onOpenAbout();
                }
              }}
              className="hover:text-slate-400 transition-colors"
            >
              About
            </a>
            <span>•</span>
            <a
              href="/guides"
              onClick={(e) => {
                if (onOpenGuides) {
                  e.preventDefault();
                  onOpenGuides();
                }
              }}
              className="hover:text-slate-400 transition-colors"
            >
              Guides
            </a>
            <span>•</span>
            <a
              href="/privacy-policy.html"
              onClick={(e) => {
                e.preventDefault();
                onOpenLegal('privacy');
              }}
              className="hover:text-slate-400 transition-colors"
            >
              Privacy
            </a>
            <span>•</span>
            <a
              href="/terms-of-service.html"
              onClick={(e) => {
                e.preventDefault();
                onOpenLegal('terms');
              }}
              className="hover:text-slate-400 transition-colors"
            >
              Terms
            </a>
            <span>•</span>
            <a
              href="/contact.html"
              onClick={(e) => {
                e.preventDefault();
                onOpenLegal('contact');
              }}
              className="hover:text-slate-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
