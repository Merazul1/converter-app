import React from 'react';
import { Coins, BookOpen, Info } from 'lucide-react';

interface NavbarProps {
  onOpenHome?: () => void;
  onOpenGuides?: () => void;
  onOpenAbout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHome,
  onOpenGuides,
  onOpenAbout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            if (onOpenHome) {
              e.preventDefault();
              onOpenHome();
            }
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
          title="CurrenFlow - Live Currency Converter"
        >
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

        {/* Navigation Items */}
        <nav className="flex items-center gap-1 sm:gap-2 text-xs font-bold text-slate-700">
          <a
            href="/"
            onClick={(e) => {
              if (onOpenHome) {
                e.preventDefault();
                onOpenHome();
              }
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Converter
          </a>
          <a
            href="/guides"
            onClick={(e) => {
              if (onOpenGuides) {
                e.preventDefault();
                onOpenGuides();
              }
            }}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <BookOpen size={14} className="text-blue-600" />
            <span>Guides</span>
          </a>
          <a
            href="/about"
            onClick={(e) => {
              if (onOpenAbout) {
                e.preventDefault();
                onOpenAbout();
              }
            }}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <Info size={14} className="text-emerald-600" />
            <span>About</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
