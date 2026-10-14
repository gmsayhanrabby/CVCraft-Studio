import React from 'react';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { Heart, Send, Sparkles, CheckCircle2, Lock, Crown, LogIn, UserCheck } from 'lucide-react';
import { AuthUser } from '../types/auth';

interface FooterProps {
  lang: AppLanguage;
  onSelectTab: (tab: string) => void;
  onOpenLogin: () => void;
  currentUser: AuthUser | null;
  onOpenAdmin?: () => void;
  onLogout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  lang, 
  onSelectTab,
  onOpenLogin,
  currentUser,
  onOpenAdmin,
  onLogout
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-10 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs no-print mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand info */}
          <div className="space-y-1.5 max-w-sm">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-white text-sm">{t.appTitle}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-semibold border border-amber-500/20">
                PRO 2026
              </span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              {lang === 'bn' ? (
                <>
                  মোবাইল ও কম্পিউটারে আন্তর্জাতিক মানের প্রফেশনাল সিভি তৈরি ও প্রিন্ট করার সর্বাধুনিক{' '}
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="text-slate-400 hover:text-amber-400 font-semibold underline decoration-dotted decoration-amber-500/40 hover:decoration-amber-400 transition-colors cursor-pointer inline-flex items-center gap-0.5"
                    title="Click 'high-fidelity' to open login"
                  >
                    <span>high-fidelity</span>
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  </button>{' '}
                  প্ল্যাটফর্ম।
                </>
              ) : (
                <>
                  Create ATS-compliant,{' '}
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="text-slate-400 hover:text-amber-400 font-semibold underline decoration-dotted decoration-amber-500/40 hover:decoration-amber-400 transition-colors cursor-pointer inline-flex items-center gap-0.5"
                    title="Click 'high-fidelity' to open login"
                  >
                    <span>high-fidelity</span>
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  </button>{' '}
                  resume and CV documents for international career opportunities.
                </>
              )}
            </p>
          </div>

          {/* Quick navigation */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button onClick={() => onSelectTab('home')} className="hover:text-amber-400 transition-colors">
              {t.navHome}
            </button>
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

        {/* Sub-footer bottom bar: explicitly with clickable 'high-fidelity' trigger */}
        <div className="mt-8 pt-5 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>© 2026 CVCraft Studio.</span>
            <span className="hidden xs:inline">•</span>
            <span>Architecture:</span>
            {/* The user-requested "high-fidelity" clickable trigger */}
            <button
              type="button"
              onClick={onOpenLogin}
              className="text-amber-400 hover:text-amber-300 font-extrabold underline decoration-amber-500/40 hover:decoration-amber-400 transition-colors cursor-pointer inline-flex items-center gap-1 group"
              title="Click 'high-fidelity' to Login"
            >
              <span>high-fidelity</span>
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            </button>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-400">ATS v3.0 Compliance</span>
          </div>

          {/* User authentication status display at the bottom of footer */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'super_admin' ? (
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all font-mono font-bold text-[11px] cursor-pointer"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'bn' ? 'সুপার অ্যাডমিন ড্যাশবোর্ড' : 'Super Admin Panel'}</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentUser.name || currentUser.username || (lang === 'bn' ? 'সদস্য' : 'Member')}</span>
                  </span>
                )}
                {onLogout && (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="text-slate-500 hover:text-rose-400 text-[11px] underline ml-1 cursor-pointer"
                  >
                    {t.logout}
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors text-[11px] cursor-pointer"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>{lang === 'bn' ? 'লগইন' : 'Login'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
