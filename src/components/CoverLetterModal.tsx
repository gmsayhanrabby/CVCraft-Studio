import React, { useState } from 'react';
import { CVData } from '../types/cv';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { FileText, Copy, Check, Sparkles, Building, Briefcase } from 'lucide-react';

interface CoverLetterModalProps {
  data: CVData;
  lang: AppLanguage;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({ data, lang }) => {
  const t = TRANSLATIONS[lang];
  const [company, setCompany] = useState('Tech Solutions Inc.');
  const [targetRole, setTargetRole] = useState(data.personal.headline || 'Software Engineer');
  const [hiringManager, setHiringManager] = useState('Hiring Manager');
  const [copied, setCopied] = useState(false);

  const generateLetter = () => {
    const skills = Array.isArray(data?.skills) ? data.skills : [];
    const experiences = Array.isArray(data?.experiences) ? data.experiences : [];
    const certificates = Array.isArray(data?.certificates) ? data.certificates : [];
    const personal = data?.personal || ({} as any);

    const skillsList = skills.slice(0, 5).join(', ');
    const topExp = experiences[0];
    const topExpStr = topExp
      ? `During my tenure as ${topExp.title} at ${topExp.company}, I spearheaded initiatives that enhanced operational throughput while maintaining top software quality.`
      : 'Throughout my career, I have consistently exceeded expectations and delivered measurable impact across projects.';

    const certStr = certificates.length > 0
      ? `Furthermore, my professional credentials, including ${certificates[0].name}, underscore my commitment to industry best practices.`
      : '';

    return `Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

To: ${hiringManager}
${company}

Subject: Application for ${targetRole} Position - ${personal.fullName || 'Applicant'}

Dear ${hiringManager},

I am writing to express my enthusiastic interest in the ${targetRole} opening at ${company}. Having followed ${company}'s forward-thinking milestones, I am eager to leverage my background in ${skillsList || 'scalable systems and strategic engineering'} to accelerate your mission.

${topExpStr} My skill set centers around delivering high-performance architecture, clean maintainable code, and fostering collaborative cross-functional synergy. ${certStr}

I am confident that my practical experience and passion for excellence will translate into tangible value for the team at ${company}.

Thank you for your time and consideration. I welcome the opportunity to discuss how my profile aligns with your strategic objectives in an interview.

Sincerely,

${data.personal.fullName}
${data.personal.phone || ''} | ${data.personal.email || ''}
${data.personal.linkedin ? `LinkedIn: ${data.personal.linkedin}` : ''}`;
  };

  const [letterText, setLetterText] = useState(generateLetter());

  const handleRegenerate = () => {
    setLetterText(generateLetter());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="pb-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-amber-400" />
              {t.clTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1">{t.clSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all"
          >
            {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copied : t.copyLetter}</span>
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              {t.targetCompany}
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              {t.targetRole}
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleRegenerate}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.generateLetter}</span>
            </button>
          </div>
        </div>

        {/* Letter Editor / Preview */}
        <textarea
          rows={14}
          value={letterText}
          onChange={(e) => setLetterText(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans focus:outline-none focus:border-amber-400"
        />
      </div>
    </div>
  );
};
