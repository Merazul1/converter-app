import React, { useState } from 'react';
import { X, Copy, Check, Code2, ExternalLink } from 'lucide-react';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  fromCurrency: string;
  toCurrency: string;
}

export const EmbedModal: React.FC<EmbedModalProps> = ({
  isOpen,
  onClose,
  fromCurrency,
  toCurrency
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'https://currenflow.vercel.app';
  const embedCode = `<iframe \n  src="${currentOrigin}?embed=true&from=${fromCurrency}&to=${toCurrency}" \n  width="100%" \n  height="480" \n  frameborder="0" \n  title="CurrenFlow Currency Converter" \n  style="border-radius: 16px; border: 1px solid #e2e8f0; max-width: 580px;"\n></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Code2 size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Embed on Your Website
            </h3>
            <p className="text-xs text-slate-500">
              Free, responsive tool widget for blogs and websites
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Copy and paste this HTML snippet into any WordPress, Webflow, Shopify, or custom HTML page to offer free live currency conversions to your visitors.
        </p>

        <div className="relative mb-6">
          <pre className="bg-slate-900 text-slate-200 p-4 rounded-2xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
            {embedCode}
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-4">
          <span className="flex items-center gap-1">
            <ExternalLink size={13} /> Fully responsive on mobile & desktop
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
