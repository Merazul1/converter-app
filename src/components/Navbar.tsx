import React from 'react';
import { Coins, Code2, Globe2 } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import type { Language, TranslationDict } from '../i18n/translations';

interface NavbarProps {
  onOpenEmbed: () => void;
  currentLang: Language;
  onSelectLanguage: (lang: Language) => void;
  dict: TranslationDict;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEmbed,
  currentLang,
  onSelectLanguage,
  dict,
}) => {
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
              {dict.nav.freeLiveRates}
            </span>
          </div>
        </a>

        {/* Action items */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100/70 px-3 py-1.5 rounded-full">
            <Globe2 size={14} className="text-emerald-500" />
            <span>{dict.nav.currenciesSupported}</span>
          </div>

          {/* Multilingual Selector */}
          <LanguageSelector
            currentLang={currentLang}
            onSelectLanguage={onSelectLanguage}
          />

          <button
            type="button"
            onClick={onOpenEmbed}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            <Code2 size={15} />
            <span className="hidden xs:inline">{dict.nav.embedWidget}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
