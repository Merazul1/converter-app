import React from 'react';
import { Landmark, TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';
import { formatNumber } from '../services/currencyService';

interface PairInsightSectionProps {
  fromCurrency: string;
  toCurrency: string;
  fromName: string;
  toName: string;
  rate: number;
}

export const PairInsightSection: React.FC<PairInsightSectionProps> = ({
  fromCurrency,
  toCurrency,
  fromName,
  toName,
  rate,
}) => {
  // Estimated 3.5% hidden bank spread on a standard $1,000 equivalent transfer
  const sampleAmount = 1000;
  const realConverted = sampleAmount * rate;
  const bankRate = rate * 0.965; // 3.5% markup
  const bankReceived = sampleAmount * bankRate;
  const estimatedLoss = realConverted - bankReceived;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 my-10">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
          <TrendingUp size={14} /> Currency Pair Analysis
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Understanding {fromCurrency} to {toCurrency}: Rates, Economics &amp; Transfer Advice
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Detailed financial context and cost-saving insights when converting <strong>{fromName} ({fromCurrency})</strong> to <strong>{toName} ({toCurrency})</strong> at today’s real-time mid-market rate.
        </p>
      </div>

      {/* Fee Comparison Highlight Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
        <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
          <AlertCircle size={18} className="text-amber-600" />
          The Bank Fee Reality on {fromCurrency}/{toCurrency} Transfers
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          When sending money from {fromCurrency} to {toCurrency} through traditional commercial banks, a 3% to 5% hidden markup is typically added into the retail exchange rate quotation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Transfer Amount</div>
            <div className="text-lg font-extrabold text-slate-900 mt-1 font-mono">{sampleAmount.toLocaleString()} {fromCurrency}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20">
            <div className="text-[11px] font-bold text-emerald-700 uppercase">With Mid-Market Rate</div>
            <div className="text-lg font-extrabold text-emerald-700 mt-1 font-mono">
              {formatNumber(realConverted)} {toCurrency}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">CurrenFlow Baseline</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20">
            <div className="text-[11px] font-bold text-rose-700 uppercase">Typical Retail Bank Quote</div>
            <div className="text-lg font-extrabold text-rose-700 mt-1 font-mono">
              ~{formatNumber(bankReceived)} {toCurrency}
            </div>
            <div className="text-[10px] text-rose-600 font-bold mt-0.5">
              ~{formatNumber(estimatedLoss)} {toCurrency} lost in spread
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column In-Depth Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
            <Landmark size={20} className="text-blue-600" /> Key Economic Drivers
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            The exchange rate between {fromCurrency} and {toCurrency} is actively determined by benchmark central banking interest rates, monthly inflation releases (Consumer Price Index), bilateral trade volume, and broader global geopolitical sentiment.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When economic metrics indicate stronger growth or rising yields in one currency's jurisdiction relative to the other, institutional investors move capital accordingly, resulting in the day-to-day rate fluctuations observed on our live tracker.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-600" /> Best Practices for Currency Conversion
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>Compare Quotes:</strong> Always verify your bank's rate against CurrenFlow's real-time rate before authorizing transactions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>Avoid Weekend Trades:</strong> Interbank trading floors are closed on weekends; retail providers widen spreads to compensate for market risk.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>Choose Local Currency:</strong> When paying with a card abroad, decline automated dynamic conversion (DCC) and pay in {toCurrency}.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
