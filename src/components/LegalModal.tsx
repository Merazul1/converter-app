import React from 'react';
import { X, ShieldCheck, FileText, Mail } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'contact';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onClose: () => void;
  onSelectTab: (tab: LegalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onSelectTab
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Tab Header */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">
          <button
            type="button"
            onClick={() => onSelectTab('privacy')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck size={15} /> Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('terms')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText size={15} /> Terms of Service
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('contact')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Mail size={15} /> Contact Us
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto pr-2 text-slate-600 text-sm leading-relaxed space-y-4">
          {activeTab === 'privacy' && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Privacy Policy</h3>
              <p className="text-xs text-slate-400 mb-4">Last updated: October 2026</p>

              <h4 className="font-bold text-slate-800 text-sm mt-3">1. Information We Collect</h4>
              <p>
                CurrenFlow (accessible at <strong className="text-slate-900">https://www.currenflow.com/</strong>) respects your privacy. We do not require visitors to register an account, and we never collect sensitive financial credentials, banking logins, or credit card numbers.
              </p>

              <h4 className="font-bold text-slate-800 text-sm mt-3">2. Cookies and Web Beacons</h4>
              <p>
                Like any other website, CurrenFlow uses 'cookies'. These cookies are used to store information including visitors' preferences, such as previously selected currencies and conversion amounts, to optimize user experience.
              </p>

              <h4 className="font-bold text-slate-800 text-sm mt-3">3. Google DoubleClick DART Cookie & Third-Party Advertising</h4>
              <p>
                Google is one of our third-party vendors. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to currenflow.com and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://policies.google.com/technologies/ads</a>.
              </p>

              <h4 className="font-bold text-slate-800 text-sm mt-3">4. GDPR & CCPA Rights</h4>
              <p>
                If you reside in the European Economic Area (EEA) or California (CCPA), you possess standard data protection rights, including the right to request erasure, data restriction, or opt out of non-essential tracking cookies.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Terms of Service</h3>
              <p className="text-xs text-slate-400 mb-4">Last updated: October 2026</p>

              <h4 className="font-bold text-slate-800 text-sm mt-3">1. Acceptance of Terms</h4>
              <p>
                By accessing or using CurrenFlow (<strong className="text-slate-900">https://www.currenflow.com/</strong>), you agree to be bound by these Terms of Service. If you do not agree to all terms, please refrain from using the site.
              </p>

              <h4 className="font-bold text-slate-800 text-sm mt-3">2. Informational Purpose Only</h4>
              <p>
                All exchange rate figures, financial ratios, and calculations provided on CurrenFlow are intended solely for educational, comparison, and informational purposes. Foreign exchange rates fluctuate constantly. CurrenFlow is not a bank, broker, or financial advisor. You should always verify final rates with your designated payment service before executing transactions.
              </p>

              <h4 className="font-bold text-slate-800 text-sm mt-3">3. Limitation of Liability</h4>
              <p>
                Under no circumstances shall CurrenFlow or its administrators be liable for any direct, indirect, or incidental loss arising from reliance on rates or content published on this website.
              </p>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Contact & Webmaster Info</h3>
              <p className="mb-4">
                Have a question, feedback, or a partnership inquiry regarding CurrenFlow? We'd love to hear from you.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail size={16} className="text-blue-600" />
                  <span>General Support: <strong className="text-slate-900">support@currenflow.com</strong></span>
                </div>
                <div className="text-xs text-slate-500">
                  For website issues, API queries, or sponsorship inquiries, email our technical team.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-100 pt-4 mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
