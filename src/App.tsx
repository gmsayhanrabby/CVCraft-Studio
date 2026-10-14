import React, { useState, useEffect } from 'react';
import { CVData, TemplateId } from './types/cv';
import { EMPTY_CV_DATA, SAMPLE_CV_DATA } from './data/sampleCV';
import { TEMPLATES } from './data/templates';
import { TRANSLATIONS, AppLanguage } from './i18n/translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';
import { TemplateGallery } from './components/TemplateGallery';
import { CvEditor } from './components/CvEditor';
import { CvPreview } from './components/CvPreview';
import { AtsChecker } from './components/AtsChecker';
import { CoverLetterModal } from './components/CoverLetterModal';
import { 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Eye, 
  PenTool, 
  Palette, 
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const STORAGE_KEY_DATA = 'cvcraft_user_clean_v3';
const STORAGE_KEY_TEMPLATE = 'cvcraft_studio_template_v3';
const STORAGE_KEY_LANG = 'cvcraft_studio_lang_v3';

const sanitizeCVData = (raw: any): CVData => {
  if (!raw || typeof raw !== 'object') return EMPTY_CV_DATA;
  return {
    personal: {
      fullName: raw.personal?.fullName || '',
      headline: raw.personal?.headline || '',
      email: raw.personal?.email || '',
      phone: raw.personal?.phone || '',
      address: raw.personal?.address || '',
      permanentAddress: raw.personal?.permanentAddress || '',
      fatherName: raw.personal?.fatherName || '',
      motherName: raw.personal?.motherName || '',
      bloodGroup: raw.personal?.bloodGroup || '',
      dateOfBirth: raw.personal?.dateOfBirth || '',
      nationality: raw.personal?.nationality || '',
      website: raw.personal?.website || '',
      linkedin: raw.personal?.linkedin || '',
      github: raw.personal?.github || '',
      summary: raw.personal?.summary || '',
      photo: raw.personal?.photo || '',
      photoShape: raw.personal?.photoShape || 'circle',
      showPhoto: raw.personal?.showPhoto !== false,
    },
    certificateStyle: raw.certificateStyle || 'modern_badge',
    experiences: Array.isArray(raw.experiences) ? raw.experiences : [],
    education: Array.isArray(raw.education) ? raw.education : [],
    certificates: Array.isArray(raw.certificates) ? raw.certificates : [],
    languages: Array.isArray(raw.languages) ? raw.languages : [],
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    projects: Array.isArray(raw.projects) ? raw.projects : [],
  };
};

export default function App() {
  // Load saved state or start completely blank
  const [data, setData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure no old dummy/mock name is restored automatically
        if (
          parsed &&
          parsed.personal &&
          parsed.personal.fullName !== 'Sayed Ahmed Tanvir' &&
          parsed.personal.fullName !== 'Alex Morgan'
        ) {
          return sanitizeCVData(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved CV data:', e);
    }
    // Clean, empty slate by default as requested!
    return EMPTY_CV_DATA;
  });

  const [currentTemplateId, setCurrentTemplateId] = useState<TemplateId>(() => {
    try {
      const savedTpl = localStorage.getItem(STORAGE_KEY_TEMPLATE);
      if (savedTpl) return savedTpl as TemplateId;
    } catch (e) {
      console.warn('Failed to parse saved template ID:', e);
    }
    return 'europass_official_2026';
  });

  const [lang, setLang] = useState<AppLanguage>(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY_LANG);
      if (savedLang === 'bn' || savedLang === 'en') return savedLang;
    } catch (e) {
      console.warn('Failed to parse saved language:', e);
    }
    return 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  // Mobile editor view mode: 'edit' or 'preview'
  const [mobileEditorMode, setMobileEditorMode] = useState<'edit' | 'preview'>('edit');
  // Preview zoom scale on mobile/desktop
  const [previewZoom, setPreviewZoom] = useState<number>(0.75);

  const t = TRANSLATIONS[lang];

  // Auto-save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEMPLATE, currentTemplateId);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [currentTemplateId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [lang]);

  // Handle screen resize to set comfortable default preview zoom
  useEffect(() => {
    const updateZoom = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPreviewZoom(0.42); // Perfect fit for smartphone portrait
      } else if (width < 1024) {
        setPreviewZoom(0.58); // Tablets
      } else if (width < 1440) {
        setPreviewZoom(0.68); // Laptops
      } else {
        setPreviewZoom(0.85); // Big desktops
      }
    };
    updateZoom();
    window.addEventListener('resize', updateZoom);
    return () => window.removeEventListener('resize', updateZoom);
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetSample = () => {
    if (confirm(lang === 'bn' ? 'নমুনা তথ্য লোড করতে চান? আপনার বর্তমান পরিবর্তন প্রতিস্থাপিত হবে।' : 'Load sample data? Your current edits will be replaced.')) {
      setData(SAMPLE_CV_DATA);
    }
  };

  const handleClearAll = () => {
    if (confirm(lang === 'bn' ? 'সব তথ্য খালি করতে চান?' : 'Clear all fields?')) {
      setData(EMPTY_CV_DATA);
    }
  };

  const currentTemplate = TEMPLATES.find((t) => t.id === currentTemplateId) || TEMPLATES[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        lang={lang}
        onToggleLang={handleToggleLang}
        onPrint={handlePrint}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* ================= 1. HOME TAB ================= */}
        {activeTab === 'home' && (
          <HomeHero
            lang={lang}
            onStart={() => setActiveTab('editor')}
            onExploreTemplates={() => setActiveTab('templates')}
          />
        )}

        {/* ================= 2. TEMPLATES GALLERY TAB ================= */}
        {activeTab === 'templates' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                  <Palette className="w-6 h-6 text-amber-400" />
                  <span>{t.templatesTab}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'bn' 
                    ? 'বাস্তবিক লেআউট প্রিভিউ থাম্বনেইল সহ আন্তর্জাতিক ও আঞ্চলিক ফরম্যাট নির্বাচন করুন।' 
                    : 'Choose tailored templates with high-fidelity visual layout previews.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <span>{t.navEditor}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <TemplateGallery
              currentTemplateId={currentTemplateId}
              onSelectTemplate={(id) => {
                setCurrentTemplateId(id);
                setActiveTab('editor');
              }}
              lang={lang}
            />
          </div>
        )}

        {/* ================= 3. CV EDITOR TAB ================= */}
        {activeTab === 'editor' && (
          <div className="max-w-[1700px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
            {/* Mobile View Toggle Bar (Only visible on small devices) */}
            <div className="lg:hidden flex items-center justify-center p-1.5 bg-slate-900 border border-slate-800 rounded-2xl mb-4 gap-1 no-print">
              <button
                type="button"
                onClick={() => setMobileEditorMode('edit')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  mobileEditorMode === 'edit'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <PenTool className="w-4 h-4" />
                <span>{t.editorTab}</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileEditorMode('preview')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  mobileEditorMode === 'preview'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>{t.preview}</span>
              </button>
            </div>

            {/* Split Screen Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form Editor (Visible always on desktop; conditionally on mobile) */}
              <div
                className={`lg:col-span-6 xl:col-span-6 no-print ${
                  mobileEditorMode === 'edit' ? 'block' : 'hidden lg:block'
                }`}
              >
                <CvEditor
                  data={data}
                  onChange={setData}
                  lang={lang}
                  onResetSample={handleResetSample}
                  onClearAll={handleClearAll}
                />
              </div>

              {/* Right Column: Live A4 Preview (Visible always on desktop; conditionally on mobile) */}
              <div
                className={`lg:col-span-6 xl:col-span-6 flex flex-col items-center w-full ${
                  mobileEditorMode === 'preview' ? 'block' : 'hidden lg:block'
                }`}
              >
                {/* Preview Toolbar */}
                <div className="w-full max-w-[210mm] bg-slate-900/95 border border-slate-800 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2.5 mb-4 shadow-md no-print">
                  {/* Current Template selector button */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('templates')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700/80 transition-colors"
                      title="Change template style"
                    >
                      <Palette className="w-3.5 h-3.5 text-amber-400" />
                      <span>{lang === 'bn' ? currentTemplate.nameBn : currentTemplate.name}</span>
                    </button>
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setPreviewZoom((z) => Math.max(0.35, z - 0.1))}
                      className="p-1 text-slate-400 hover:text-white"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono text-slate-300 w-11 text-center font-bold">
                      {Math.round(previewZoom * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setPreviewZoom((z) => Math.min(1.2, z + 0.1))}
                      className="p-1 text-slate-400 hover:text-white"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewZoom(window.innerWidth < 640 ? 0.42 : 0.75)}
                      className="p-1 text-amber-400 hover:text-amber-300 ml-0.5"
                      title={t.zoomFit}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Print / Save as PDF Button */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition-all active:scale-95"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t.downloadPdf}</span>
                  </button>
                </div>

                {/* Scaled A4 Container */}
                <div className="w-full flex justify-center overflow-x-auto pb-10 pt-2 no-scrollbar">
                  <div
                    style={{
                      transform: `scale(${previewZoom})`,
                      transformOrigin: 'top center',
                      width: '210mm',
                      minHeight: '297mm',
                      // Reserve container height after transform scaling
                      marginBottom: `calc((297mm * ${previewZoom}) - 297mm)`
                    }}
                    className="cv-sheet bg-white shadow-2xl rounded-sm transition-transform duration-150 border border-slate-300/40 relative"
                  >
                    <CvPreview data={data} templateId={currentTemplateId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. ATS AUDIT TAB ================= */}
        {activeTab === 'ats' && (
          <AtsChecker data={data} templateId={currentTemplateId} lang={lang} />
        )}

        {/* ================= 5. COVER LETTER TAB ================= */}
        {activeTab === 'coverletter' && (
          <CoverLetterModal data={data} lang={lang} />
        )}
      </main>

      {/* Global Footer */}
      <Footer lang={lang} onSelectTab={setActiveTab} />
    </div>
  );
}
