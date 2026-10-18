import React from 'react';
import { Coins, Heart } from 'lucide-react';
import { POPULAR_PAIRS } from '../data/currencies';
import type { LegalTab } from './LegalModal';

interface FooterProps {
  onSelectPair: (from: string, to: string) => void;
  onOpenLegal: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPair, onOpenLegal }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <a href="https://currenflow.com/" className="flex items-center gap-2 mb-4 group cursor-pointer inline-flex" title="CurrenFlow">
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

          {/* Popular Pairs Links (SEO booster) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Popular Currency Pairs
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {POPULAR_PAIRS.map((pair) => (
                <button
                  key={`${pair.from}-${pair.to}`}
                  type="button"
                  onClick={() => {
                    onSelectPair(pair.from, pair.to);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
                >
                  {pair.from} to {pair.to} Calculator
                </button>
              ))}
            </div>
          </div>

          {/* Compliance & Legal Links */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs mb-4">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('contact')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Support
                </button>
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
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-400 transition-colors cursor-pointer"
            >
              Terms
            </button>
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
