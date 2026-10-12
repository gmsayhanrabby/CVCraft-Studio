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
  Send
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  lang: AppLanguage;
  onToggleLang: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  lang,
  onToggleLang,
  onPrint
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

        {/* Action Controls & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
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
          <div className="pt-2 border-t border-slate-800/80">
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
