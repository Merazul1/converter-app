import React from 'react';
import { Coins, Globe2 } from 'lucide-react';

interface NavbarProps {
  onOpenEmbed?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="https://www.currenflow.com/" className="flex items-center gap-2.5 group cursor-pointer" title="CurrenFlow - Live Currency Converter">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Coins size={22} />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Curren<span className="text-blue-600">Flow</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
              Free Live Rates
            </span>
          </div>
        </a>

        {/* Action items */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100/70 px-3 py-1.5 rounded-full">
            <Globe2 size={14} className="text-emerald-500" />
            <span>160+ Currencies Supported</span>
          </div>
        </div>
      </div>
    </header>
  );
};
