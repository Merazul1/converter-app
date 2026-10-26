import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <HelpCircle size={18} />
        </div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Got Questions?
        </span>
      </div>

      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Frequently Asked Questions
      </h3>
      <p className="text-sm text-slate-500 mb-8">
        Everything you need to know about live foreign exchange rates, accuracy, and conversions.
      </p>

      <div className="divide-y divide-slate-100">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left gap-4 py-2 text-slate-900 font-bold text-base md:text-lg hover:text-blue-600 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed pr-6 animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
