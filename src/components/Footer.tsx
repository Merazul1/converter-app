import React from 'react';
import { Coins, Heart } from 'lucide-react';
import { POPULAR_PAIRS } from '../data/currencies';
import type { LegalTab } from './LegalModal';

interface FooterProps {
  onSelectPair: (from: string, to: string) => void;
  onOpenLegal: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectPair,
  onOpenLegal,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1">
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
              Built with precision for 95+ Core Web Vitals speed.
            </div>
          </div>

          {/* Popular Pairs Links (SEO booster - all internal crawlable anchors) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Popular Currency Pairs (Live Rates)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {POPULAR_PAIRS.map((pair) => {
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

          {/* Compliance & Legal Links */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Legal &amp; Compliance
            </h4>
            <ul className="space-y-2 text-xs mb-4">
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
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Exchange rate figures are sourced from central and interbank feeds for informational purposes only.
            </p>
          </div>
        </div>

        {/* Bottom copyright & legal links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CurrenFlow (currenflow.com). All rights reserved.</p>
          <div className="flex items-center gap-4">
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
            <span>•</span>
            <span className="flex items-center gap-1">
              Made for users <Heart size={12} className="text-rose-500 fill-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
