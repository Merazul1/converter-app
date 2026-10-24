import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, FileText, Mail, Coins } from 'lucide-react';
import type { LegalTab } from './LegalModal';
import { ContactForm } from './ContactForm';

interface LegalPageProps {
  type: LegalTab;
  onBackToHome: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBackToHome }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const metaDesc = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');

    if (type === 'privacy') {
      document.title = 'Privacy Policy - CurrenFlow';
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Learn how CurrenFlow protects your privacy and personal data. Detailed policy on cookies, Google AdSense advertising, and user data rights.');
      }
      if (canonical) {
        canonical.setAttribute('href', 'https://www.currenflow.com/privacy-policy.html');
      }
    } else if (type === 'terms') {
      document.title = 'Terms of Service - CurrenFlow';
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Review CurrenFlow terms of service, conditions of use, and exchange rate information disclaimers for using our free live currency converter.');
      }
      if (canonical) {
        canonical.setAttribute('href', 'https://www.currenflow.com/terms-of-service.html');
      }
    } else {
      document.title = 'Contact & Support - CurrenFlow';
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Contact CurrenFlow support for inquiries, currency rate questions, and API partnerships. Fast and dedicated support for our currency calculator.');
      }
      if (canonical) {
        canonical.setAttribute('href', 'https://www.currenflow.com/contact.html');
      }
    }
  }, [type]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Coins size={22} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Curren<span className="text-blue-600">Flow</span>
            </span>
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Converter
          </button>
        </div>
      </header>

      {/* Main Legal Content Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-sm space-y-8 text-slate-600 leading-relaxed">
          {type === 'privacy' && (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-4">
                <ShieldCheck size={14} /> Legal Documentation
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-400 mb-8">Effective Date: October 2026</p>

              <div className="space-y-6 text-sm sm:text-base">
                <p>
                  At <strong>CurrenFlow</strong> (accessible at <a href="https://currenflow.com" className="text-blue-600 font-semibold underline">https://currenflow.com</a>), your privacy is one of our primary priorities. This Privacy Policy document details the types of information recorded and collected by CurrenFlow and how we use it.
                </p>

                <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                  1. Information We Collect
                </h2>
                <p>
                  CurrenFlow is a free utility tool that does not require user registration or accounts. We do not collect names, phone numbers, home addresses, or banking details. All currency conversions occur client-side in your web browser.
                </p>

                <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                  2. Cookies and Local Storage
                </h2>
                <p>
                  Like most modern web applications, CurrenFlow uses cookies and local browser storage (localStorage) solely to remember your preferences (such as your recently selected currencies) and provide a faster experience on return visits.
                </p>

                <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                  3. Google DoubleClick DART Cookies & Third-Party Advertising
                </h2>
                <p>
                  Google is a third-party vendor on our website. It uses cookies (such as DART cookies) to serve targeted advertisements based on user visits to currenflow.com and other websites across the internet. Visitors can choose to opt out of personalized DART cookies by visiting the Google Ads Privacy Policy at: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://policies.google.com/technologies/ads</a>.
                </p>

                <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                  4. GDPR & CCPA Compliance
                </h2>
                <p>
                  Users located within the European Economic Area (EEA) and California (CCPA) retain full rights to request data access, correction, or opt out of non-essential tracking cookies.
                </p>

                <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                  5. Contact Us
                </h2>
                <p>
                  If you have questions regarding this Privacy Policy, contact us by email at: <strong className="text-slate-900">support@currenflow.com</strong>.
                </p>
              </div>
            </div>
          )}

          {type === 'terms' && (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-4">
                <FileText size={14} /> Terms & Conditions
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                Terms of Service
              </h1>
              <p className="text-xs text-slate-400 mb-8">Effective Date: October 2026</p>

              <div className="space-y-6 text-sm sm:text-base">
                <p>
                  By accessing or using <strong>CurrenFlow</strong> (<a href="https://currenflow.com" className="text-blue-600 font-semibold underline">https://currenflow.com</a>), you agree to comply with and be bound by the following Terms of Service.
                </p>

                <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                  1. Informational & Calculator Purpose Only
                </h2>
                <p>
                  Exchange rates, calculator outputs, and currency comparisons on CurrenFlow are provided for informational, personal reference, and educational purposes only. They do not constitute financial advice, investment counsel, or banking guarantees.
                </p>

                <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                  2. Disclaimer of Financial Liability
                </h2>
                <p>
                  Foreign exchange rates fluctuate continuously. While CurrenFlow strives to deliver reliable mid-market rates, we do not guarantee the completeness or absolute accuracy of third-party interbank rate feeds. Users should verify live transaction rates with their financial institution before executing international wire transfers.
                </p>

                <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                  3. External & Affiliate Partnerships
                </h2>
                <p>
                  CurrenFlow may display links to partner financial services (such as international money transfer providers). We may earn an affiliate commission if you register through partner links, at zero additional cost to you.
                </p>

                <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
                  4. Governing Inquiries
                </h2>
                <p>
                  For questions or legal notifications regarding these terms, email: <strong className="text-slate-900">support@currenflow.com</strong>.
                </p>
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-4">
                <Mail size={14} /> Get in Touch
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                Contact &amp; Support
              </h1>
              <p className="text-xs text-slate-400 mb-8">We respond within 24-48 business hours</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-1 space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">Direct Email</div>
                        <a
                          href="mailto:support@currenflow.com"
                          className="text-base font-bold text-blue-600 hover:underline"
                        >
                          support@currenflow.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs text-slate-600 space-y-2 leading-relaxed">
                    <p className="font-bold text-slate-800">Support Hours:</p>
                    <p>Monday – Friday: 9:00 AM – 6:00 PM UTC</p>
                    <p>Average response time: &lt; 24 business hours.</p>
                  </div>
                </div>

                <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Send Us a Direct Message</h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Fill out the form below and our technical support team will get right back to you.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <ArrowLeft size={16} /> Return to Live Currency Converter
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs">
        <p>© {new Date().getFullYear()} CurrenFlow (currenflow.com). All rights reserved.</p>
      </footer>
    </div>
  );
};
