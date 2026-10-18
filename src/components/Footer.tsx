import React from 'react';
import { Coins, Heart } from 'lucide-react';
import { POPULAR_PAIRS } from '../data/currencies';

interface FooterProps {
  onSelectPair: (from: string, to: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPair }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <a href="https://currenflow.vercel.app/" className="flex items-center gap-2 mb-4 group cursor-pointer inline-flex" title="CurrenFlow">
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

          {/* Compliance & Disclaimers */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Market Disclaimer
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Exchange rate figures provided by CurrenFlow are sourced from interbank market data and central banks for informational purposes only. They do not constitute financial advice or investment recommendations.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CurrenFlow. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for speed, accuracy & visitor satisfaction <Heart size={12} className="text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
