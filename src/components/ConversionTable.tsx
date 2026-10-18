import React from 'react';
import { formatNumber } from '../services/currencyService';

interface ConversionTableProps {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  inverseRate: number;
}

export const ConversionTable: React.FC<ConversionTableProps> = ({
  fromCurrency,
  toCurrency,
  rate,
  inverseRate
}) => {
  const tableValues = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          Conversion Breakdown Table
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Quick reference for popular {fromCurrency} to {toCurrency} and {toCurrency} to {fromCurrency} amounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: From -> To */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-sm text-slate-800 flex items-center justify-between">
            <span>{fromCurrency}</span>
            <span>{toCurrency}</span>
          </div>
          <div className="divide-y divide-slate-100 font-mono text-sm">
            {tableValues.map((val) => (
              <div
                key={`from-${val}`}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-blue-50/50 transition-colors"
              >
                <span className="font-medium text-slate-700">
                  {val.toLocaleString()} {fromCurrency}
                </span>
                <span className="font-bold text-blue-600">
                  {formatNumber(val * rate)} {toCurrency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: To -> From (Reverse) */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-sm text-slate-800 flex items-center justify-between">
            <span>{toCurrency}</span>
            <span>{fromCurrency}</span>
          </div>
          <div className="divide-y divide-slate-100 font-mono text-sm">
            {tableValues.map((val) => (
              <div
                key={`to-${val}`}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-amber-50/50 transition-colors"
              >
                <span className="font-medium text-slate-700">
                  {val.toLocaleString()} {toCurrency}
                </span>
                <span className="font-bold text-amber-600">
                  {formatNumber(val * inverseRate)} {fromCurrency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
