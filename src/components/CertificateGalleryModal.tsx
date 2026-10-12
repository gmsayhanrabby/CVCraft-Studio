import React, { useState } from 'react';
import { 
  PREDEFINED_CERTIFICATES, 
  CERTIFICATE_LAYOUT_STYLES 
} from '../data/certificateTemplates';
import { 
  CertificateItem, 
  CertificateCardStyle, 
  PredefinedCertificateTemplate 
} from '../types/cv';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { 
  X, 
  Search, 
  Award, 
  Check, 
  Plus, 
  ShieldCheck, 
  Cloud, 
  Code, 
  Cpu, 
  Globe, 
  Sparkles,
  Layers
} from 'lucide-react';

interface CertificateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCertificate: (cert: CertificateItem) => void;
  currentStyle?: CertificateCardStyle;
  onSelectStyle?: (style: CertificateCardStyle) => void;
  existingCertNames: string[];
  lang: AppLanguage;
}

export const CertificateGalleryModal: React.FC<CertificateGalleryModalProps> = ({
  isOpen,
  onClose,
  onAddCertificate,
  currentStyle = 'modern_badge',
  onSelectStyle,
  existingCertNames,
  lang
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', label: lang === 'bn' ? 'সব সার্টিফিকেট' : 'All Certifications' },
    { id: 'cloud', label: lang === 'bn' ? 'ক্লাউড ও ডেভঅপস' : 'Cloud & DevOps' },
    { id: 'software', label: lang === 'bn' ? 'সফটওয়্যার ডেভেলপমেন্ট' : 'Software & Web' },
    { id: 'management', label: lang === 'bn' ? 'ম্যানেজমেন্ট ও স্ক্রাম' : 'Project & Agile' },
    { id: 'security', label: lang === 'bn' ? 'সাইবার সিকিউরিটি' : 'Security & Network' },
    { id: 'data', label: lang === 'bn' ? 'ডাটা ও এআই' : 'Data Science & AI' },
    { id: 'language', label: lang === 'bn' ? 'ভাষা ও আইইএলটিএস' : 'Languages & IELTS' }
  ];

  const filteredCerts = PREDEFINED_CERTIFICATES.filter((cert) => {
    const matchesCat = activeCategory === 'all' || cert.category === activeCategory;
    const matchesSearch =
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.nameBn && cert.nameBn.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAdd = (preset: PredefinedCertificateTemplate) => {
    const newCert: CertificateItem = {
      id: 'cert-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      name: preset.name,
      issuer: preset.issuer,
      issueDate: new Date().getFullYear().toString(),
      expiryDate: (new Date().getFullYear() + 3).toString(),
      credentialId: `${preset.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      credentialUrl: `https://verify.credentials.org/${preset.id}`,
      description: preset.description,
      badgeStyle: currentStyle
    };

    onAddCertificate(newCert);
    setAddedIds((prev) => new Set(prev).add(preset.id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'cloud': return <Cloud className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      case 'cpu': return <Cpu className="w-4 h-4" />;
      case 'globe': return <Globe className="w-4 h-4" />;
      case 'shield': return <ShieldCheck className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Award className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {t.certGalleryModalTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 pl-11">
              {t.certGalleryModalSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Layout Style Selector */}
        {onSelectStyle && (
          <div className="px-5 sm:px-6 py-3 bg-slate-950/70 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 shrink-0">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.certCardStyle}:</span>
            </span>

            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {CERTIFICATE_LAYOUT_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => onSelectStyle(style.id as CertificateCardStyle)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    currentStyle === style.id
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                  }`}
                  title={style.description}
                >
                  {lang === 'bn' ? style.titleBn : style.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter Tabs & Search Bar */}
        <div className="p-4 sm:p-5 pb-3 border-b border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Horizontal Category Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'সার্টিফিকেট বা সংস্থা খুঁজুন...' : 'Search certificates...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Grid of Predefined Certificate Templates */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredCerts.map((preset) => {
              const isAlreadyAdded = existingCertNames.some(
                (n) => n.toLowerCase().trim() === preset.name.toLowerCase().trim()
              ) || addedIds.has(preset.id);

              return (
                <div
                  key={preset.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isAlreadyAdded
                      ? 'bg-emerald-950/20 border-emerald-700/40'
                      : 'bg-slate-950/60 hover:bg-slate-800/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm"
                          style={{ backgroundColor: preset.badgeColor }}
                        >
                          {getIcon(preset.iconType)}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {preset.issuer}
                          </span>
                          <span className="text-[10px] ml-2 px-1.5 py-0.2 rounded bg-slate-800 text-amber-400 font-medium">
                            {preset.level}
                          </span>
                        </div>
                      </div>

                      {isAlreadyAdded && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.certAdded}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-white mb-1 leading-snug">
                      {lang === 'bn' && preset.nameBn ? preset.nameBn : preset.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                      {preset.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">
                      Category: {preset.category}
                    </span>

                    <button
                      type="button"
                      disabled={isAlreadyAdded}
                      onClick={() => handleAdd(preset)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isAlreadyAdded
                          ? 'bg-emerald-900/40 text-emerald-300 opacity-60 cursor-not-allowed'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm active:scale-95'
                      }`}
                    >
                      {isAlreadyAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{lang === 'bn' ? 'যুক্ত আছে' : 'Added'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.addCertToCv}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCerts.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              {lang === 'bn' ? 'কোনো সার্টিফিকেট পাওয়া যায়নি।' : 'No certificate templates found matching your search.'}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {lang === 'bn' 
              ? 'গ্যালারি থেকে সিলেক্ট করার পর তথ্য এডিটরে ইচ্ছামত পরিবর্তন করতে পারবেন।' 
              : 'Credentials added from the gallery can be freely edited in the form editor.'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
          >
            {lang === 'bn' ? 'সম্পন্ন' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
