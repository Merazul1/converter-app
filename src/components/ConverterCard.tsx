import React, { useState } from 'react';
import { ArrowLeftRight, RefreshCw, Copy, Check, TrendingUp, Sparkles, Clock } from 'lucide-react';
import { CurrencySelector } from './CurrencySelector';
import { CURRENCIES } from '../data/currencies';
import type { RatesData } from '../types/currency';
import { convertCurrency, formatNumber } from '../services/currencyService';

interface ConverterCardProps {
  ratesData: RatesData | null;
  isLoading: boolean;
  onRefresh: () => void;
  fromCurrency: string;
  toCurrency: string;
  setFromCurrency: (code: string) => void;
  setToCurrency: (code: string) => void;
  amount: number;
  setAmount: (amt: number) => void;
}

export const ConverterCard: React.FC<ConverterCardProps> = ({
  ratesData,
  isLoading,
  onRefresh,
  fromCurrency,
  toCurrency,
  setFromCurrency,
  setToCurrency,
  amount,
  setAmount,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const fromCurrObj = CURRENCIES.find((c) => c.code === fromCurrency) || {
    code: fromCurrency,
    symbol: '$',
    name: fromCurrency,
    flag: '🌐'
  };

  const toCurrObj = CURRENCIES.find((c) => c.code === toCurrency) || {
    code: toCurrency,
    symbol: '€',
    name: toCurrency,
    flag: '🌐'
  };

  const rates = ratesData?.rates || {};
  const { result, rate, inverseRate } = convertCurrency(
    amount,
    fromCurrency,
    toCurrency,
    rates
  );

  const handleSwap = () => {
    setIsSwapping(true);
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const handleCopy = () => {
    const textToCopy = `${amount} ${fromCurrency} = ${formatNumber(result)} ${toCurrency} (Rate: 1 ${fromCurrency} = ${formatNumber(rate)} ${toCurrency})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickAmounts = [10, 50, 100, 500, 1000, 5000];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 transition-all">
      {/* Header bar of converter */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <TrendingUp size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Live Currency Converter
            </h2>
            <p className="text-xs text-slate-500">
              Real-time mid-market interbank exchange rate
            </p>
          </div>
        </div>

        {/* Live status badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {ratesData?.source === 'live' ? 'Live Interbank Feed' : 'Real-Time Cache'}
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh exchange rates"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin text-blue-600' : ''} />
          </button>
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Amount to Convert
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400 font-mono">
            {fromCurrObj.symbol}
          </span>
          <input
            type="number"
            min="0"
            step="any"
            value={amount === 0 ? '' : amount}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setAmount(isNaN(val) ? 0 : Math.max(0, val));
            }}
            placeholder="0.00"
            className="w-full pl-11 pr-20 py-4 text-2xl md:text-3xl font-extrabold text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-mono"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 uppercase tracking-wider">
            {fromCurrObj.code}
          </span>
        </div>

        {/* Quick Amount Pills */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-medium text-slate-400 shrink-0">
            Quick:
          </span>
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer ${
                amount === amt
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              +{amt.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Currency Pickers + Swap Button */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-end gap-3 md:gap-4 mb-6">
        <CurrencySelector
          label="From Currency"
          selectedCode={fromCurrency}
          onSelect={setFromCurrency}
        />

        {/* Swap Button */}
        <div className="flex justify-center md:pb-1">
          <button
            type="button"
            onClick={handleSwap}
            title="Swap Currencies"
            className={`w-12 h-12 rounded-2xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 border border-slate-200 hover:border-blue-200 flex items-center justify-center transition-all cursor-pointer shadow-xs ${
              isSwapping ? 'rotate-180 scale-105' : 'hover:scale-105'
            }`}
          >
            <ArrowLeftRight size={18} />
          </button>
        </div>

        <CurrencySelector
          label="To Currency"
          selectedCode={toCurrency}
          onSelect={setToCurrency}
        />
      </div>

      {/* Convert / Action Button */}
      <button
        type="button"
        onClick={() => {}}
        className="w-full py-4 px-6 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-lg rounded-2xl shadow-lg shadow-amber-400/20 transition-all duration-150 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mb-6"
      >
        <Sparkles size={20} className="text-amber-900" />
        Convert {fromCurrency} to {toCurrency}
      </button>

      {/* Prominent Conversion Result Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <div className="text-sm font-medium text-slate-400">
            {amount.toLocaleString()} {fromCurrObj.name} =
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Result</span>
              </>
            )}
          </button>
        </div>

        {/* Big Converted Value */}
        <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-mono mb-4">
          <span className="text-amber-400 mr-2">{toCurrObj.symbol}</span>
          {formatNumber(result)}
          <span className="text-lg sm:text-2xl font-bold text-slate-400 ml-2.5 font-sans">
            {toCurrObj.code}
          </span>
        </div>

        {/* Exchange Rates Formula & Inverse */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>
              1 {fromCurrency} ={' '}
              <strong className="text-white font-mono">{formatNumber(rate)} {toCurrency}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>
              1 {toCurrency} ={' '}
              <strong className="text-white font-mono">{formatNumber(inverseRate)} {fromCurrency}</strong>
            </span>
          </div>
        </div>

        {/* Timestamp Footer */}
        {ratesData?.lastUpdated && (
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500">
            <Clock size={12} />
            <span>Updated: {ratesData.lastUpdated}</span>
          </div>
        )}
      </div>
    </div>
  );
};
