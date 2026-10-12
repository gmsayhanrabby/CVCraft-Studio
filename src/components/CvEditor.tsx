import React, { useState } from 'react';
import { 
  CVData, 
  ExperienceItem, 
  EducationItem, 
  CertificateItem, 
  LanguageItem, 
  ProjectItem,
  LanguageProficiency,
  CertificateCardStyle 
} from '../types/cv';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { PhotoUploader } from './PhotoUploader';
import { CertificateGalleryModal } from './CertificateGalleryModal';
import { CERTIFICATE_LAYOUT_STYLES } from '../data/certificateTemplates';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Languages, 
  Wrench, 
  FolderGit2, 
  Plus, 
  Trash2, 
  ChevronDown, 
  Sparkles, 
  FileDown, 
  FileUp, 
  RotateCcw,
  ExternalLink,
  Check,
  Grid,
  Heart,
  Home,
  Users
} from 'lucide-react';

interface CvEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
  lang: AppLanguage;
  onResetSample: () => void;
  onClearAll: () => void;
}

export const CvEditor: React.FC<CvEditorProps> = ({
  data,
  onChange,
  lang,
  onResetSample,
  onClearAll
}) => {
  const t = TRANSLATIONS[lang];
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [skillInput, setSkillInput] = useState<string>('');
  const [showCertGallery, setShowCertGallery] = useState<boolean>(false);

  // Personal Info update
  const handlePersonalChange = (fields: Partial<CVData['personal']>) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        ...fields
      }
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: 'exp-' + Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange({
      ...data,
      experiences: [newExp, ...data.experiences]
    });
  };

  const updateExperience = (id: string, fields: Partial<ExperienceItem>) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...fields } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter((exp) => exp.id !== id)
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: 'edu-' + Date.now(),
      degree: '',
      fieldOfStudy: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      grade: ''
    };
    onChange({
      ...data,
      education: [newEdu, ...data.education]
    });
  };

  const updateEducation = (id: string, fields: Partial<EducationItem>) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, ...fields } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id)
    });
  };

  // Certificate handlers (NEW)
  const addCertificate = () => {
    const newCert: CertificateItem = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      description: ''
    };
    onChange({
      ...data,
      certificates: [newCert, ...data.certificates]
    });
  };

  const updateCertificate = (id: string, fields: Partial<CertificateItem>) => {
    onChange({
      ...data,
      certificates: data.certificates.map((cert) =>
        cert.id === id ? { ...cert, ...fields } : cert
      )
    });
  };

  const removeCertificate = (id: string) => {
    onChange({
      ...data,
      certificates: data.certificates.filter((cert) => cert.id !== id)
    });
  };

  // Language handlers (NEW)
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: 'lang-' + Date.now(),
      language: '',
      proficiency: 'Fluent',
      rating: 4
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang]
    });
  };

  const updateLanguage = (id: string, fields: Partial<LanguageItem>) => {
    onChange({
      ...data,
      languages: data.languages.map((l) =>
        l.id === id ? { ...l, ...fields } : l
      )
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((l) => l.id !== id)
    });
  };

  // Skills handlers
  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!data.skills.includes(skillInput.trim())) {
        onChange({
          ...data,
          skills: [...data.skills, skillInput.trim()]
        });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((s) => s !== skillToRemove)
    });
  };

  const addPresetSkill = (preset: string) => {
    if (!data.skills.includes(preset)) {
      onChange({
        ...data,
        skills: [...data.skills, preset]
      });
    }
  };

  // Project handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: 'proj-' + Date.now(),
      name: '',
      role: '',
      link: '',
      technologies: '',
      description: ''
    };
    onChange({
      ...data,
      projects: [...data.projects, newProj]
    });
  };

  const updateProject = (id: string, fields: Partial<ProjectItem>) => {
    onChange({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, ...fields } : p
      )
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((p) => p.id !== id)
    });
  };

  // AI Summary generator helper
  const handleGenerateSummary = () => {
    const title = data.personal.headline || 'experienced professional';
    const topSkills = data.skills.slice(0, 4).join(', ');
    const autoSummary = `${title} with proven track record delivering high-impact solutions in dynamic fast-paced environments. Adept in ${topSkills || 'strategic execution, project delivery, and cross-functional leadership'}. Passionate about building robust systems and driving business growth.`;
    handlePersonalChange({ summary: autoSummary });
  };

  // Backup & Import
  const handleExportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `${data.personal.fullName.replace(/\s+/g, '_') || 'cv'}_resume_craft.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personal) {
          onChange(parsed);
          alert(lang === 'bn' ? 'তথ্য সফলভাবে লোড হয়েছে!' : 'Data loaded successfully!');
        }
      } catch (err) {
        alert(lang === 'bn' ? 'ভুল JSON ফাইল' : 'Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Top action bar: Sample data / Clear / Save JSON */}
      <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onResetSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.resetSample}</span>
          </button>
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 rounded-xl text-xs font-medium transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearAll}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
            title="Download JSON backup"
          >
            <FileDown className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">{t.saveJson}</span>
          </button>

          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors cursor-pointer">
            <FileUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{t.loadJson}</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Accordion Form Sections */}
      <div className="space-y-3">
        {/* ================= 1. PERSONAL INFORMATION ================= */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'personal' ? '' : 'personal')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2.5 font-bold text-sm text-slate-200">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <User className="w-4 h-4" />
              </span>
              {t.personalInfo}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                activeSection === 'personal' ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeSection === 'personal' && (
            <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-slate-800/60">
              {/* Photo Upload Component (Internal file + URL + Presets) */}
              <PhotoUploader
                personal={data.personal}
                onChange={handlePersonalChange}
                lang={lang}
              />

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    value={data.personal.fullName}
                    onChange={(e) => handlePersonalChange({ fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.headline}
                  </label>
                  <input
                    type="text"
                    value={data.personal.headline}
                    onChange={(e) => handlePersonalChange({ headline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={data.personal.email}
                    onChange={(e) => handlePersonalChange({ email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.phone}
                  </label>
                  <input
                    type="text"
                    value={data.personal.phone}
                    onChange={(e) => handlePersonalChange({ phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.location}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. House #12, Road #5, Dhanmondi, Dhaka"
                    value={data.personal.address}
                    onChange={(e) => handlePersonalChange({ address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.permanentAddress}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vill: Monohardi, Dist: Narsingdi"
                    value={data.personal.permanentAddress || ''}
                    onChange={(e) => handlePersonalChange({ permanentAddress: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.fatherName}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Md. Rafiqul Islam"
                    value={data.personal.fatherName || ''}
                    onChange={(e) => handlePersonalChange({ fatherName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.motherName}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nasreen Begum"
                    value={data.personal.motherName || ''}
                    onChange={(e) => handlePersonalChange({ motherName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.bloodGroup}
                  </label>
                  <select
                    value={data.personal.bloodGroup || ''}
                    onChange={(e) => handlePersonalChange({ bloodGroup: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">{lang === 'bn' ? '-- রক্তের গ্রুপ নির্বাচন করুন --' : '-- Select Blood Group --'}</option>
                    <option value="A+">A+ (A Positive)</option>
                    <option value="A-">A- (A Negative)</option>
                    <option value="B+">B+ (B Positive)</option>
                    <option value="B-">B- (B Negative)</option>
                    <option value="O+">O+ (O Positive)</option>
                    <option value="O-">O- (O Negative)</option>
                    <option value="AB+">AB+ (AB Positive)</option>
                    <option value="AB-">AB- (AB Negative)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.dateOfBirth}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 15 March 1996"
                    value={data.personal.dateOfBirth || ''}
                    onChange={(e) => handlePersonalChange({ dateOfBirth: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.nationality}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bangladeshi"
                    value={data.personal.nationality || ''}
                    onChange={(e) => handlePersonalChange({ nationality: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.website}
                  </label>
                  <input
                    type="text"
                    value={data.personal.website}
                    onChange={(e) => handlePersonalChange({ website: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.linkedin}
                  </label>
                  <input
                    type="text"
                    value={data.personal.linkedin}
                    onChange={(e) => handlePersonalChange({ linkedin: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    {t.github}
                  </label>
                  <input
                    type="text"
                    value={data.personal.github}
                    onChange={(e) => handlePersonalChange({ github: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-400">
                    {t.summary}
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateSummary}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{lang === 'bn' ? 'সারাংশ তৈরি করুন' : 'AI Suggest'}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={data.personal.summary}
                  onChange={(e) => handlePersonalChange({ summary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>

        {/* ================= 2. WORK EXPERIENCE ================= */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'experience' ? '' : 'experience')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2.5 font-bold text-sm text-slate-200">
              <span className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </span>
              {t.workExperience} ({data.experiences.length})
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                activeSection === 'experience' ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeSection === 'experience' && (
            <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-slate-800/60">
              <button
                type="button"
                onClick={addExperience}
                className="w-full py-2.5 bg-slate-800/90 hover:bg-slate-700/80 text-amber-400 hover:text-amber-300 border border-slate-700 border-dashed rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addExperience}</span>
              </button>

              <div className="space-y-4">
                {data.experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-xs font-semibold text-slate-300">
                        #{idx + 1} {exp.title || (lang === 'bn' ? 'পদবী দিন' : 'Job Title')}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.jobTitle}</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.company}</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.startDate}</label>
                        <input
                          type="text"
                          placeholder="e.g. Jan 2021"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.endDate}</label>
                        <input
                          type="text"
                          placeholder="e.g. Present"
                          value={exp.endDate}
                          disabled={exp.current}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white disabled:opacity-40"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`curr-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) =>
                          updateExperience(exp.id, {
                            current: e.target.checked,
                            endDate: e.target.checked ? (lang === 'bn' ? 'বর্তমান' : 'Present') : ''
                          })
                        }
                        className="rounded accent-amber-500"
                      />
                      <label htmlFor={`curr-${exp.id}`} className="text-xs text-slate-300">
                        {t.currentlyWorking}
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        {lang === 'bn' ? 'দায়িত্ব ও অর্জন' : 'Responsibilities & Achievements'}
                      </label>
                      <textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                        placeholder={t.jobDescPlaceholder}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 leading-relaxed font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= 3. CERTIFICATES & LICENSES (NEW!) ================= */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'certificates' ? '' : 'certificates')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2.5 font-bold text-sm text-slate-200">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </span>
              {t.certificates} ({data.certificates.length})
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                activeSection === 'certificates' ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeSection === 'certificates' && (
            <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-slate-800/60">
              {/* Action Buttons: Add Custom or Browse Predefined Gallery */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCertGallery(true)}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent hover:from-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/40 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t.browseCertGallery}</span>
                </button>

                <button
                  type="button"
                  onClick={addCertificate}
                  className="py-2.5 px-4 bg-slate-800/90 hover:bg-slate-700/80 text-slate-200 border border-slate-700 border-dashed rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addCertificate}</span>
                </button>
              </div>

              {/* Certificate Visual Layout Style Selector */}
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.certCardStyle}:</span>
                </span>
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                  {CERTIFICATE_LAYOUT_STYLES.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => onChange({ ...data, certificateStyle: style.id as CertificateCardStyle })}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        (data.certificateStyle || 'modern_badge') === style.id
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {lang === 'bn' ? style.titleBn : style.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Certificate Gallery Modal Component */}
              <CertificateGalleryModal
                isOpen={showCertGallery}
                onClose={() => setShowCertGallery(false)}
                onAddCertificate={(cert) => {
                  onChange({
                    ...data,
                    certificates: [cert, ...data.certificates]
                  });
                }}
                currentStyle={data.certificateStyle || 'modern_badge'}
                onSelectStyle={(st) => onChange({ ...data, certificateStyle: st })}
                existingCertNames={data.certificates.map((c) => c.name)}
                lang={lang}
              />

              <div className="space-y-4">
                {data.certificates.map((cert, idx) => (
                  <div
                    key={cert.id}
                    className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        #{idx + 1} {cert.name || (lang === 'bn' ? 'সার্টিফিকেট নাম দিন' : 'New Certificate')}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCertificate(cert.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.certName}</label>
                        <input
                          type="text"
                          placeholder="e.g. AWS Certified Solutions Architect"
                          value={cert.name}
                          onChange={(e) => updateCertificate(cert.id, { name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.certIssuer}</label>
                        <input
                          type="text"
                          placeholder="e.g. Amazon Web Services, Google"
                          value={cert.issuer}
                          onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.certDate}</label>
                        <input
                          type="text"
                          placeholder="e.g. Aug 2024"
                          value={cert.issueDate}
                          onChange={(e) => updateCertificate(cert.id, { issueDate: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.certExpiry}</label>
                        <input
                          type="text"
                          placeholder="e.g. Aug 2027 or None"
                          value={cert.expiryDate || ''}
                          onChange={(e) => updateCertificate(cert.id, { expiryDate: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.certId}</label>
                        <input
                          type="text"
                          placeholder="e.g. AWS-SAA-839210"
                          value={cert.credentialId || ''}
                          onChange={(e) => updateCertificate(cert.id, { credentialId: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.certUrl}</label>
                        <input
                          type="text"
                          placeholder="https://coursera.org/verify/..."
                          value={cert.credentialUrl || ''}
                          onChange={(e) => updateCertificate(cert.id, { credentialUrl: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">{t.certDesc}</label>
                      <input
                        type="text"
                        placeholder="Optional short description or skill covered"
                        value={cert.description || ''}
                        onChange={(e) => updateCertificate(cert.id, { description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= 4. LANGUAGES SPOKEN (NEW!) ================= */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'languages' ? '' : 'languages')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2.5 font-bold text-sm text-slate-200">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Languages className="w-4 h-4" />
              </span>
              {t.languages} ({data.languages.length})
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                activeSection === 'languages' ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeSection === 'languages' && (
            <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-slate-800/60">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-slate-400">
                  {lang === 'bn' ? 'ভাষাগত দক্ষতা ও মাত্রা নির্বাচন করুন:' : 'Add languages with proficiency levels:'}
                </span>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-bold inline-flex items-center gap-1 border border-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addLanguage}</span>
                </button>
              </div>

              {/* Language List */}
              <div className="space-y-2.5">
                {data.languages.map((langItem) => (
                  <div
                    key={langItem.id}
                    className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                  >
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Language name (e.g. English, Bengali, Spanish)"
                        value={langItem.language}
                        onChange={(e) => updateLanguage(langItem.id, { language: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>

                    <div className="w-full sm:w-44">
                      <select
                        value={langItem.proficiency}
                        onChange={(e) =>
                          updateLanguage(langItem.id, {
                            proficiency: e.target.value as LanguageProficiency
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                      >
                        <option value="Native">{t.native}</option>
                        <option value="Fluent">{t.fluent}</option>
                        <option value="Proficient">{t.proficient}</option>
                        <option value="Conversational">{t.conversational}</option>
                        <option value="Basic">{t.basic}</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeLanguage(langItem.id)}
                      className="self-end sm:self-center text-slate-500 hover:text-rose-400 p-1.5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= 5. EDUCATION ================= */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'education' ? '' : 'education')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2.5 font-bold text-sm text-slate-200">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </span>
              {t.education} ({data.education.length})
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                activeSection === 'education' ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeSection === 'education' && (
            <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-slate-800/60">
              <button
                type="button"
                onClick={addEducation}
                className="w-full py-2.5 bg-slate-800/90 hover:bg-slate-700/80 text-amber-400 hover:text-amber-300 border border-slate-700 border-dashed rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addEducation}</span>
              </button>

              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-xs font-semibold text-slate-300">
                        #{idx + 1} {edu.degree || (lang === 'bn' ? 'ডিগ্রি দিন' : 'Degree')}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.degree}</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.fieldOfStudy}</label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.institution}</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.gpa}</label>
                        <input
                          type="text"
                          value={edu.grade || ''}
                          onChange={(e) => updateEducation(edu.id, { grade: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.startDate}</label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.endDate}</label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= 6. SKILLS ================= */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'skills' ? '' : 'skills')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2.5 font-bold text-sm text-slate-200">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </span>
              {t.skills} ({data.skills.length})
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                activeSection === 'skills' ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeSection === 'skills' && (
            <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-slate-800/60">
              {/* Skill Input with Enter key */}
              <div>
                <input
                  type="text"
                  placeholder={t.addSkillPlaceholder}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Quick skill chips suggestion */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 mr-1">{lang === 'bn' ? 'সুপারিশ:' : 'Suggestions:'}</span>
                {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'SQL', 'Git', 'Agile', 'Leadership'].map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => addPresetSkill(sug)}
                    className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700/60"
                  >
                    + {sug}
                  </button>
                ))}
              </div>

              {/* Active Skills List */}
              <div className="flex flex-wrap gap-2 pt-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-medium"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-amber-400 hover:text-rose-400"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= 7. PROJECTS ================= */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'projects' ? '' : 'projects')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2.5 font-bold text-sm text-slate-200">
              <span className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <FolderGit2 className="w-4 h-4" />
              </span>
              {t.projects} ({data.projects.length})
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                activeSection === 'projects' ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {activeSection === 'projects' && (
            <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-slate-800/60">
              <button
                type="button"
                onClick={addProject}
                className="w-full py-2.5 bg-slate-800/90 hover:bg-slate-700/80 text-amber-400 hover:text-amber-300 border border-slate-700 border-dashed rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addProject}</span>
              </button>

              <div className="space-y-4">
                {data.projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-xs font-semibold text-slate-300">
                        #{idx + 1} {proj.name || (lang === 'bn' ? 'প্রজেক্ট নাম দিন' : 'Project Name')}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeProject(proj.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.projectName}</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.projectRole}</label>
                        <input
                          type="text"
                          value={proj.role}
                          onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.projectLink}</label>
                        <input
                          type="text"
                          value={proj.link || ''}
                          onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{t.projectTech}</label>
                        <input
                          type="text"
                          value={proj.technologies}
                          onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">{t.projectDesc}</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
