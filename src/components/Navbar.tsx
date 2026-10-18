import React from 'react';
import { Coins, Code2, Globe2 } from 'lucide-react';

interface NavbarProps {
  onOpenEmbed: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEmbed }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20">
            <Coins size={22} />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Curren<span className="text-blue-600">Flow</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
              Free Live Rates
            </span>
          </div>
        </div>

        {/* Action items */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100/70 px-3 py-1.5 rounded-full">
            <Globe2 size={14} className="text-emerald-500" />
            <span>160+ Currencies Supported</span>
          </div>

          <button
            type="button"
            onClick={onOpenEmbed}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-all cursor-pointer"
          >
            <Code2 size={15} />
            <span>Embed Widget</span>
          </button>
        </div>
      </div>
    </header>
  );
};
