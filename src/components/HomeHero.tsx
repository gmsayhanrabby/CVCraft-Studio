import React from 'react';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { 
  Sparkles, 
  ArrowRight, 
  Layout, 
  Upload, 
  Award, 
  Languages, 
  Smartphone, 
  ShieldCheck, 
  Send 
} from 'lucide-react';

interface HomeHeroProps {
  lang: AppLanguage;
  onStart: () => void;
  onExploreTemplates: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ lang, onStart, onExploreTemplates }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-14 text-center shadow-2xl">
        {/* Glow gradients */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Feature badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {lang === 'bn' 
              ? 'মোবাইল ফ্রেন্ডলি • ডিভাইস ফটো আপলোড • সার্টিফিকেট ও মাল্টিপল ল্যাঙ্গুয়েজ' 
              : 'Mobile Friendly • Device Photo Upload • Certificates & Multi-Language'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          {lang === 'bn' ? (
            <>
              মিনিটের মধ্যে তৈরি করুন <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                আন্তর্জাতিক মানের প্রফেশনাল সিভি
              </span>
            </>
          ) : (
            <>
              Craft Your Professional CV in <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                Minutes, Ready for Global Jobs
              </span>
            </>
          )}
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
          {lang === 'bn'
            ? 'ডিভাইস থেকে সরাসরি ছবি যোগ করুন, ভিন্ন ভিন্ন প্রিভিউ থাম্বনেইল থেকে পছন্দের স্টাইল বেছে নিন, সার্টিফিকেট ও বহুভাষিক তথ্য যুক্ত করুন। মোবাইল ও কম্পিউটারে স্বাচ্ছন্দ্যে এডিট ও প্রিন্ট করুন।'
            : 'Select from distinctive template styles with realistic visual previews, upload photos directly from your phone gallery, add certified credentials, and export high-res vector PDFs seamlessly on mobile & desktop.'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <button
            type="button"
            onClick={onStart}
            className="px-6 sm:px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-2xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-95"
          >
            <span>{t.createMyCv}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            type="button"
            onClick={onExploreTemplates}
            className="px-6 sm:px-8 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold rounded-2xl text-sm border border-slate-700/80 transition-all flex items-center gap-2"
          >
            <Layout className="w-4 h-4 text-amber-400" />
            <span>{t.selectTemplate}</span>
          </button>
        </div>

        {/* Developer Attribution Card */}
        <div className="inline-flex items-center gap-2.5 bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-2xl text-xs text-slate-400">
          <span>{t.developerCredit}</span>
          <a
            href="https://wa.me/8801634092772"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 font-extrabold flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.developerName}</span>
          </a>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Layout className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {lang === 'bn' ? 'ভিন্ন ভিন্ন প্রিভিউ থাম্বনেইল' : 'Visual Miniature Thumbnails'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'bn'
              ? 'ইউরোপাস, এটিএস ক্লিন, টেক ম্যাট্রিক্স ও রিজিওনাল ডিজাইনের বাস্তবিক লেআউট থাম্বনেইল।'
              : 'Realistic miniature layout cards showing sidebar, single-column, header banners and typography.'}
          </p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {lang === 'bn' ? 'ডিভাইস থেকে ফটো আপলোড' : 'Local Device Photo Upload'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'bn'
              ? 'মোবাইল গ্যালারি বা পিসি থেকে ফটো আপলোড করুন, স্বয়ংক্রিয় রিসাইজ ও গোল/বর্গাকার শেপ নির্বাচন।'
              : 'Pick photos directly from your phone gallery or files with automatic local optimization.'}
          </p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {lang === 'bn' ? 'সার্টিফিকেট ও প্রশিক্ষণ' : 'Certificates & Credentials'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'bn'
              ? 'AWS, Google, Coursera বা প্রফেশনাল লাইসেন্স ও ভেরিফিকেশন লিংক সুন্দরভাবে যুক্ত করুন।'
              : 'Add vendor certifications, issue dates, credential IDs, and direct verification URLs.'}
          </p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {lang === 'bn' ? '১০০% মোবাইল রেসপনসিভ' : '100% Mobile Responsive'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'bn'
              ? 'মোবাইল ডিভাইসে সহজে এডিট ও জুম-ফিট লাইভ প্রিভিউ দেখুন যেকোনো স্মার্টফোনে।'
              : 'Seamless mobile layout with instant Form / Preview toggle and fit-to-screen A4 view.'}
          </p>
        </div>
      </div>
    </div>
  );
};
