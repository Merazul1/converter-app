import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, Clock, ShieldCheck } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

export const ContactInfoCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(CONTACT_CONFIG.recipientEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Direct Email Card */}
      <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-white to-slate-50/80 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <Mail size={22} />
          </div>
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
              Direct Inquiries
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              Customer &amp; API Support
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Need assistance with exchange rate calculations, partnership integrations, or custom API access? Reach our engineering team directly:
        </p>

        {/* Email Address Container with full-width layout and actions */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
          <div>
            <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
              Official Email Address
            </span>
            <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight break-all select-all font-mono">
              {CONTACT_CONFIG.recipientEmail}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/70">
            <button
              type="button"
              onClick={handleCopy}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600 shrink-0" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="shrink-0" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${CONTACT_CONFIG.recipientEmail}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-blue-500/20 transition-all text-center"
              title="Open default email application"
            >
              <span>Mail</span>
              <ExternalLink size={13} className="shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Response Guarantee & Hours Card */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800">Support Desk Active</span>
          </div>
          <span className="text-[11px] font-medium text-slate-400">UTC Timezone</span>
        </div>

        <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <Clock size={14} className="text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Turnaround Time:</strong> Under 24 business hours (Monday – Friday, 9:00 AM – 6:00 PM UTC).
            </span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck size={14} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Privacy Guaranteed:</strong> We never share your email address or message details with third parties.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
