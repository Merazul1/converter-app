import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { CURRENCIES } from '../data/currencies';

interface CurrencySelectorProps {
  label: string;
  selectedCode: string;
  onSelect: (code: string) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  label,
  selectedCode,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedCurrency = CURRENCIES.find((c) => c.code === selectedCode) || {
    code: selectedCode,
    name: selectedCode,
    symbol: '',
    flag: '🌐',
    country: ''
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filtered = CURRENCIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  });

  const popularList = CURRENCIES.filter((c) => c.popular);

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs transition-all text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl shrink-0 leading-none" role="img" aria-label={selectedCurrency.name}>
            {selectedCurrency.flag}
          </span>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {selectedCurrency.code}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedCurrency.symbol}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate max-w-[130px] sm:max-w-[160px]">
              {selectedCurrency.name}
            </p>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-600' : 'group-hover:text-slate-600'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search Box */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/70">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search by code, country, or currency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Quick popular tags when no search query */}
            {!searchQuery && (
              <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 text-xs no-scrollbar">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                  Popular:
                </span>
                {popularList.slice(0, 5).map((pop) => (
                  <button
                    key={pop.code}
                    type="button"
                    onClick={() => {
                      onSelect(pop.code);
                      setIsOpen(false);
                    }}
                    className={`px-2 py-0.5 rounded-md font-medium text-xs transition-colors shrink-0 ${
                      selectedCode === pop.code
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {pop.flag} {pop.code}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency List */}
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 p-1">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-400">
                No currency found for "{searchQuery}"
              </div>
            ) : (
              filtered.map((item) => {
                const isSelected = item.code === selectedCode;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      onSelect(item.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50 text-blue-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl leading-none shrink-0" role="img" aria-label={item.name}>
                        {item.flag}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className={`text-sm ${isSelected ? 'text-blue-600 font-bold' : 'font-semibold text-slate-900'}`}>
                            {item.code}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {item.symbol}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate max-w-[200px]">
                          {item.name} • <span className="text-slate-400">{item.country}</span>
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check size={18} className="text-blue-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
