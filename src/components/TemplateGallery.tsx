import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import { TemplateId } from '../types/cv';
import { TemplateThumbnail } from './TemplateThumbnail';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { Check, Search, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';

interface TemplateGalleryProps {
  currentTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  lang: AppLanguage;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  currentTemplateId,
  onSelectTemplate,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'ats', label: t.filterAts },
    { id: 'modern', label: t.filterModern },
    { id: 'corporate', label: t.filterCorporate },
    { id: 'creative', label: t.filterCreative },
    { id: 'regional', label: t.filterRegional }
  ];

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-4">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Horizontal Category Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'টেমপ্লেট খুঁজুন...' : 'Search templates...'}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Grid of Templates with Miniature Previews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map((template) => {
          const isSelected = template.id === currentTemplateId;

          return (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`group bg-slate-900/80 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col ${
                isSelected
                  ? 'border-amber-400 shadow-lg shadow-amber-500/10 scale-[1.01]'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {/* Distinctive Thumbnail Container */}
              <div className="relative p-2.5 bg-slate-950/60 pb-0">
                <TemplateThumbnail template={template} isSelected={isSelected} />

                {/* Popularity or ATS badge */}
                <div className="absolute top-4 left-4 flex gap-1 z-10">
                  {template.isPopular && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 text-[10px] font-bold shadow">
                      <Sparkles className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                  {template.category === 'ats' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold shadow">
                      <ShieldCheck className="w-3 h-3" />
                      100% ATS
                    </span>
                  )}
                </div>

                {isSelected && (
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg font-bold">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Card Meta & Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      {lang === 'bn' ? template.nameBn : template.name}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {template.category.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {lang === 'bn' ? template.descriptionBn : template.description}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: template.primaryColor }}
                    />
                    <span>{template.layoutStyle.replace('_', ' ')}</span>
                  </span>

                  <button
                    type="button"
                    className={`font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                      isSelected
                        ? 'text-amber-400 bg-amber-500/10'
                        : 'text-slate-300 group-hover:text-white group-hover:bg-slate-700/60'
                    }`}
                  >
                    {isSelected ? (lang === 'bn' ? 'নির্বাচিত' : 'Active') : (lang === 'bn' ? 'ব্যবহার করুন' : 'Use Template')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
