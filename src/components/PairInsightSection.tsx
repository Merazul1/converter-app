import React from 'react';
import { Landmark, TrendingUp, AlertCircle, ShieldCheck, Calculator, History, Globe2, ArrowRightLeft } from 'lucide-react';
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
  const inverseRate = rate > 0 ? 1 / rate : 0;

  const isUsdEur = (fromCurrency === 'USD' && toCurrency === 'EUR') || (fromCurrency === 'EUR' && toCurrency === 'USD');

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-10 my-10">
      {/* 1. Header Overview */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
          <TrendingUp size={14} /> Currency Pair Analysis &amp; Market Insights
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Understanding {fromCurrency} to {toCurrency}: Rates, Economics &amp; Transfer Advice
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Comprehensive financial context, historical ranges, and cost-saving insights when converting <strong>{fromName} ({fromCurrency})</strong> to <strong>{toName} ({toCurrency})</strong> at today’s real-time mid-market rate of <strong>1 {fromCurrency} = {formatNumber(rate)} {toCurrency}</strong>.
        </p>
      </div>

      {/* 2. Fee Comparison Highlight Card (Bank Markups vs. Mid-Market) */}
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
            <div className="text-[10px] text-slate-500 mt-0.5">CurrenFlow Baseline (0% Markup)</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20">
            <div className="text-[11px] font-bold text-rose-700 uppercase">Typical Retail Bank Quote</div>
            <div className="text-lg font-extrabold text-rose-700 mt-1 font-mono">
              ~{formatNumber(bankReceived)} {toCurrency}
            </div>
            <div className="text-[10px] text-rose-600 font-bold mt-0.5">
              ~{formatNumber(estimatedLoss)} {toCurrency} lost in hidden spread
            </div>
          </div>
        </div>
      </div>

      {/* 3. Conversion Methods & Calculation Formula */}
      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Calculator size={20} className="text-blue-600" /> Currency Conversion Methods &amp; Formula
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          Converting {fromCurrency} to {toCurrency} is based on the global foreign exchange spot price. The mathematical formula used by commercial trading desks and CurrenFlow's real-time calculator is straightforward:
        </p>
        <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 font-mono text-xs sm:text-sm text-slate-800 space-y-2 mb-4">
          <div><strong>Direct Formula:</strong> Amount ({toCurrency}) = Amount ({fromCurrency}) × Live Mid-Market Exchange Rate ({formatNumber(rate)})</div>
          <div><strong>Inverse Formula:</strong> Amount ({fromCurrency}) = Amount ({toCurrency}) × Inverse Rate ({formatNumber(inverseRate)})</div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          For example, converting <strong>500 {fromCurrency}</strong> at today's benchmark rate yields exactly <strong>{formatNumber(500 * rate)} {toCurrency}</strong>. When dealing with commercial providers, compare their final deliverable total against this formula to determine the exact percentage fee deducted.
        </p>
      </div>

      {/* 4. Historical Trends & Trading Ranges */}
      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <History size={20} className="text-indigo-600" /> Historical {fromCurrency} to {toCurrency} Exchange Rates &amp; Ranges
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
          Exchange rates between major world currencies fluctuate dynamically across every 24-hour global trading cycle. {isUsdEur ? (
            <>Over recent quarters, the USD/EUR exchange rate has traded in a defined macroeconomic band between <strong>0.90 EUR and 0.96 EUR per US Dollar</strong> (or 1.04 to 1.11 USD per Euro). This range reflects changing investor sentiment regarding interest rate divergence between Washington and Frankfurt.</>
          ) : (
            <>Monitoring the historical 30-day and 90-day moving averages for {fromCurrency}/{toCurrency} helps business managers, expats, and travelers identify whether current quotations represent an advantageous conversion window or a cyclical peak.</>
          )}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Historical volatility is generally driven by quarterly economic GDP reports, monthly labor market figures, and geopolitical developments affecting bilateral trade balances.
        </p>
      </div>

      {/* 5. Central Bank Monetary Policy: Federal Reserve vs. ECB */}
      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Landmark size={20} className="text-blue-600" /> Central Bank Monetary Policy &amp; Economic Drivers
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          The primary driver of the {fromCurrency} to {toCurrency} exchange rate is the interest rate differential established by national monetary authorities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-900 mb-1">Federal Reserve &amp; US Dollar (USD)</h4>
            <p className="text-slate-600 leading-relaxed">
              The Federal Reserve's Federal Open Market Committee (FOMC) sets benchmark borrowing costs. Higher interest rates attract global institutional yield seekers, strengthening USD demand relative to foreign currencies.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-900 mb-1">European Central Bank &amp; Euro (EUR)</h4>
            <p className="text-slate-600 leading-relaxed">
              The European Central Bank (ECB) in Frankfurt manages Eurozone inflation and deposit facility rates across 20 member nations. Rate decisions directly impact European sovereign debt yields and EUR valuation.
            </p>
          </div>
        </div>
      </div>

      {/* 6. International Money Transfers & Best Practices */}
      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <ShieldCheck size={20} className="text-emerald-600" /> Best Practices for Sending Money from {fromCurrency} to {toCurrency}
        </h3>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
          <li className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
            <div>
              <strong>Audit the Implied Rate:</strong> Calculate the implied exchange rate offered by your bank by dividing the delivered target currency by your source funds. If the difference from CurrenFlow's live rate exceeds 0.5%, choose a transparent specialist.
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
            <div>
              <strong>Avoid Weekend Currency Conversions:</strong> Interbank foreign exchange markets close on Friday evening and reopen Sunday night. Many retail brokers widen conversion spreads by 1% to 2% over weekends to insulate themselves from market gap risk.
            </div>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
            <div>
              <strong>Decline Dynamic Currency Conversion (DCC):</strong> When paying with a credit or debit card abroad or withdrawing cash from an overseas ATM, always choose to be billed in the local currency ({toCurrency}) rather than home currency ({fromCurrency}). DCC markups routinely charge an unnecessary 6% to 12% fee.
            </div>
          </li>
        </ul>
      </div>

      {/* 7. Currency Overview: USD & EUR */}
      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Globe2 size={20} className="text-slate-700" /> Currency Profiles: {fromName} and {toName}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
          <div className="p-4 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <ArrowRightLeft size={16} className="text-blue-600" /> Base Currency: {fromName} ({fromCurrency})
            </div>
            <p className="leading-relaxed">
              The United States Dollar (USD) represents the world’s preeminent global reserve currency, accounting for over 85% of worldwide foreign exchange trading turnover and backing international commodities including crude oil and gold.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <ArrowRightLeft size={16} className="text-indigo-600" /> Quote Currency: {toName} ({toCurrency})
            </div>
            <p className="leading-relaxed">
              The Euro (EUR) is the official currency of 20 European Union member nations, serving as the second most actively traded currency globally. It is governed by the European Central Bank headquartered in Frankfurt am Main, Germany.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
