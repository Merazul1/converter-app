import React from 'react';
import { CURRENCIES } from '../data/currencies';
import { formatNumber } from '../services/currencyService';
import { ArrowUpRight } from 'lucide-react';

interface CurrencyMatrixProps {
  baseCurrency: string;
  rates: Record<string, number>;
  onSelectTarget: (code: string) => void;
}

export const CurrencyMatrix: React.FC<CurrencyMatrixProps> = ({
  baseCurrency,
  rates,
  onSelectTarget
}) => {
  const topCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BDT', 'AED', 'SAR']
    .filter((c) => c !== baseCurrency)
    .slice(0, 8);

  const baseRate = rates[baseCurrency] || 1;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Top Exchange Rates for 1 {baseCurrency}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Real-time value of 1 {baseCurrency} compared to major global reserve currencies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {topCurrencies.map((code) => {
          const curr = CURRENCIES.find((c) => c.code === code);
          const targetRate = rates[code] || 1;
          const directRate = targetRate / baseRate;

          return (
            <button
              key={code}
              type="button"
              onClick={() => onSelectTarget(code)}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl" role="img" aria-label={curr?.name}>
                  {curr?.flag || '🌐'}
                </span>
                <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-600 flex items-center">
                  Convert <ArrowUpRight size={13} className="inline ml-0.5" />
                </span>
              </div>
              <div className="font-mono text-base font-bold text-slate-900">
                {formatNumber(directRate)}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {code} <span className="text-slate-400">({curr?.name})</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
