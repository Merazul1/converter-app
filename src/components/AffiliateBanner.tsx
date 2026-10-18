import React from 'react';
import { Send, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AffiliateBannerProps {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

export const AffiliateBanner: React.FC<AffiliateBannerProps> = ({
  fromCurrency,
  toCurrency,
  amount
}) => {
  // Configurable affiliate referral link (e.g. Wise / Remitly / Revolut)
  // User can replace with their custom partner referral URL
  const partnerUrl = `https://wise.com/?source=currenflow&from=${fromCurrency}&to=${toCurrency}`;

  return (
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden my-8 border border-blue-500/20">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider mb-3 shadow-xs">
            <Send size={13} /> Recommended Transfer Partner
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            Sending {amount > 0 ? `${amount.toLocaleString()} ${fromCurrency}` : fromCurrency} to {toCurrency}?
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            Traditional banks often hide <strong className="text-amber-400">3% to 5%</strong> markups in their exchange rates. Transfer with certified mid-market partners to save up to 8x in hidden banking fees.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 size={14} /> Zero hidden markups
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 size={14} /> Real mid-market rate
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 size={14} /> Fast delivery
            </span>
          </div>
        </div>

        {/* CTA Button Box */}
        <div className="shrink-0 w-full lg:w-auto flex flex-col items-center sm:items-end">
          <a
            href={partnerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
          >
            <span>Compare & Send with Wise</span>
            <ArrowRight size={16} />
          </a>
          <span className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
            <ShieldCheck size={12} className="text-blue-400" />
            Transparent partner recommendation
          </span>
        </div>
      </div>
    </div>
  );
};
