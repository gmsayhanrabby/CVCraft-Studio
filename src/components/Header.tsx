import React, { useState } from 'react';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { 
  FileText, 
  Printer, 
  Languages, 
  Menu, 
  X, 
  Sparkles, 
  Heart,
  LayoutGrid,
  FileCheck,
  Send,
  Crown,
  Lock,
  LogOut,
  UserCheck
} from 'lucide-react';
import { AuthUser } from '../types/auth';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  lang: AppLanguage;
  onToggleLang: () => void;
  onPrint: () => void;
  currentUser: AuthUser | null;
  onOpenLogin: () => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  lang,
  onToggleLang,
  onPrint,
  currentUser,
  onOpenLogin,
  onOpenAdmin,
  onLogout
}) => {
  const t = TRANSLATIONS[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'templates', label: t.navTemplates },
    { id: 'editor', label: t.navEditor },
    { id: 'ats', label: t.navAts },
    { id: 'coverletter', label: t.navCoverLetter },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Dev Badge */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 shrink-0">
            <FileText className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                {t.appTitle}
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>{t.developerCredit}</span>
              <a
                href="https://wa.me/8801634092772"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-0.5 hover:underline"
              >
                <span>{t.developerName}</span>
              </a>
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === item.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls & Authentication Status */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* User Auth Status / Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 rounded-xl p-1">
              {currentUser.role === 'super_admin' ? (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all shadow-sm"
                  title="Super Admin Control Center"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline">Super Admin</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2 py-1 text-slate-300 text-xs">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline font-medium">{currentUser.name}</span>
                </div>
              )}

              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                title={t.logout}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
              title="Sign in with Credentials or Google"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.login}</span>
            </button>
          )}

          {/* UI Language Switcher (EN <-> BN) */}
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-bold text-slate-200 transition-colors"
            title={lang === 'bn' ? 'Switch to English' : 'বাংলা ভাষায় পরিবর্তন করুন'}
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* WhatsApp Direct Contact Button */}
          <a
            href="https://wa.me/8801634092772"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-600/40 rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.whatsappContact}</span>
          </a>

          {/* PDF Download / Print */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{t.downloadPdf}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === item.id
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Auth action in menu */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  {currentUser.role === 'super_admin' ? (
                    <Crown className="w-4 h-4 text-amber-400" />
                  ) : (
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-white">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-400">{currentUser.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {currentUser.role === 'super_admin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdmin();
                      }}
                      className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold"
                    >
                      Admin
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="p-1.5 text-rose-400 hover:bg-slate-800 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-amber-400 bg-amber-500/10 rounded-xl border border-amber-500/20"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t.login} (high-fidelity)</span>
              </button>
            )}

            <a
              href="https://wa.me/8801634092772"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 rounded-xl border border-emerald-800/50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.whatsappContact}: +8801634092772</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
