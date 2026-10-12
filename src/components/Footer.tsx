import React from 'react';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { Heart, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  lang: AppLanguage;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onSelectTab }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-10 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs no-print mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand info */}
        <div className="space-y-1 max-w-sm">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-extrabold text-white text-sm">{t.appTitle}</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-semibold border border-amber-500/20">
              Free & Open
            </span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            {lang === 'bn' 
              ? 'মোবাইল ও কম্পিউটারে আন্তর্জাতিক মানের প্রফেশনাল সিভি তৈরি ও প্রিন্ট করার সর্বাধুনিক প্ল্যাটফর্ম।' 
              : 'Create ATS-compliant, high-fidelity resume and CV documents for international career opportunities.'}
          </p>
        </div>

        {/* Quick navigation */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <button onClick={() => onSelectTab('templates')} className="hover:text-amber-400 transition-colors">
            {t.navTemplates}
          </button>
          <button onClick={() => onSelectTab('editor')} className="hover:text-amber-400 transition-colors">
            {t.navEditor}
          </button>
          <button onClick={() => onSelectTab('ats')} className="hover:text-amber-400 transition-colors">
            {t.navAts}
          </button>
          <button onClick={() => onSelectTab('coverletter')} className="hover:text-amber-400 transition-colors">
            {t.navCoverLetter}
          </button>
        </div>

        {/* Mandatory Developer Attribution */}
        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex flex-col items-center md:items-end gap-1 shadow-inner">
          <div className="flex items-center gap-1.5 text-slate-200 font-medium">
            <span>{t.developerCredit}</span>
            <a
              href="https://wa.me/8801634092772"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-extrabold underline decoration-amber-500/30 hover:decoration-amber-400 transition-colors"
            >
              {t.developerName}
            </a>
          </div>
          <a
            href="https://wa.me/8801634092772"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-[11px] font-semibold mt-0.5"
          >
            <Send className="w-3 h-3" />
            <span>WhatsApp: +8801634092772</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
