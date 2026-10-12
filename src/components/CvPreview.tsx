import React from 'react';
import { CVData, TemplateId, CertificateCardStyle, CertificateItem } from '../types/cv';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Award, 
  Languages as LangIcon, 
  ExternalLink,
  Calendar,
  Briefcase,
  GraduationCap,
  Heart,
  Droplet,
  Users,
  ShieldCheck,
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';

interface CvPreviewProps {
  data: CVData;
  templateId: TemplateId;
}

export const CvPreview: React.FC<CvPreviewProps> = ({ data, templateId }) => {
  const { 
    personal, 
    experiences, 
    education, 
    certificates, 
    languages, 
    skills, 
    projects,
    certificateStyle = 'modern_badge' 
  } = data;

  const photoBorderClass = 
    personal.photoShape === 'circle' 
      ? 'rounded-full' 
      : personal.photoShape === 'rounded' 
      ? 'rounded-2xl' 
      : 'rounded-none';

  // Reliable photo display: visible whenever photo is set unless explicitly toggled off
  const shouldShowPhoto = Boolean(personal.photo && personal.showPhoto !== false);

  // Helper to render certificates with selected card layout style
  const renderCertificatesBlock = (accent: 'emerald' | 'blue' | 'amber' | 'sky' | 'rose' | 'slate') => {
    if (!certificates || certificates.length === 0) return null;

    const accentBorder = 
      accent === 'emerald' ? 'border-emerald-500' :
      accent === 'blue' ? 'border-blue-600' :
      accent === 'amber' ? 'border-amber-500' :
      accent === 'sky' ? 'border-sky-500' :
      accent === 'rose' ? 'border-rose-800' : 'border-slate-800';

    const accentText = 
      accent === 'emerald' ? 'text-emerald-700' :
      accent === 'blue' ? 'text-blue-700' :
      accent === 'amber' ? 'text-amber-700' :
      accent === 'sky' ? 'text-sky-400' :
      accent === 'rose' ? 'text-rose-800' : 'text-slate-800';

    // 1. Classic Gold Ribbon / Seal Style
    if (certificateStyle === 'classic_seal') {
      return (
        <div className="space-y-2">
          {certificates.map((cert) => (
            <div 
              key={cert.id} 
              className="p-2.5 bg-amber-50/50 border border-amber-200/80 rounded-lg flex items-start gap-2.5 text-xs"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Award className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span className="font-serif">{cert.name}</span>
                  <span className="text-[11px] text-amber-800 font-sans">{cert.issueDate}</span>
                </div>
                <div className="text-[11px] text-slate-600 font-medium">
                  {cert.issuer} {cert.credentialId ? `• ID: ${cert.credentialId}` : ''}
                </div>
                {cert.description && (
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{cert.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // 2. Minimalist Clean Line
    if (certificateStyle === 'minimal_clean') {
      return (
        <div className="space-y-1.5 text-xs divide-y divide-slate-100">
          {certificates.map((cert) => (
            <div key={cert.id} className="pt-1.5 first:pt-0 flex justify-between items-start gap-2">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${accentText} shrink-0 mt-0.5`} />
                <div>
                  <div className="font-bold text-slate-900">{cert.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {cert.issuer} {cert.credentialId ? `(ID: ${cert.credentialId})` : ''}
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-mono whitespace-nowrap">{cert.issueDate}</span>
            </div>
          ))}
        </div>
      );
    }

    // 3. Compact Grid Chips
    if (certificateStyle === 'compact_chip') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {certificates.map((cert) => (
            <div 
              key={cert.id} 
              className="p-2 rounded-lg bg-slate-50 border border-slate-200/90 flex flex-col justify-between"
            >
              <div className="font-bold text-slate-900 text-xs truncate" title={cert.name}>
                {cert.name}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-600 mt-1 pt-1 border-t border-slate-200">
                <span className="font-medium truncate">{cert.issuer}</span>
                <span className="font-mono text-slate-500">{cert.issueDate}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Default: Modern Badge Card
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
        {certificates.map((cert) => (
          <div 
            key={cert.id} 
            className="p-2.5 bg-slate-50/80 border border-slate-200 rounded-xl relative group"
          >
            <div className="flex items-start justify-between gap-1.5">
              <div className="font-bold text-slate-900 leading-snug">
                {cert.name}
              </div>
              {cert.credentialUrl && (
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`${accentText} hover:opacity-80 p-0.5 shrink-0`}
                  title="Verify credential"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <div className="text-[11px] text-slate-600 font-medium mt-0.5">
              {cert.issuer} <span className="text-slate-400">•</span> {cert.issueDate}
            </div>
            {cert.credentialId && (
              <div className="text-[10px] font-mono text-slate-500 mt-1 px-1.5 py-0.5 rounded bg-white border border-slate-200/70 inline-block">
                ID: {cert.credentialId}
              </div>
            )}
            {cert.description && (
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">{cert.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  // ================= 0A. EUROPASS CV 2026 (OFFICIAL EU STANDARD) =================
  if (templateId === 'europass_official_2026') {
    return (
      <div className="w-full bg-white text-slate-900 p-8 sm:p-12 text-left font-sans leading-relaxed selection:bg-blue-100">
        {/* Official European Commission Header */}
        <div className="border-b-2 border-[#003399] pb-6 mb-6 flex flex-col sm:flex-row items-start justify-between gap-5">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#003399] flex items-center justify-center text-yellow-300 text-xs font-black shadow-sm">
                ★
              </div>
              <div>
                <span className="text-xs font-black tracking-widest text-[#003399] uppercase font-mono">
                  europass
                </span>
                <span className="text-[10px] text-slate-500 block -mt-0.5 font-medium">
                  Curriculum Vitae 2026 © Official Format
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003399] tracking-tight">
              {personal.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              {personal.headline || 'Professional Headline'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
              {personal.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#003399] shrink-0" />
                  <span>{personal.address}</span>
                </div>
              )}
              {personal.permanentAddress && (
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Permanent: {personal.permanentAddress}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#003399] shrink-0" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#003399] shrink-0" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#003399] shrink-0" />
                  <span>{personal.website}</span>
                </div>
              )}
              {personal.nationality && (
                <div className="text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700">Nationality: </span>
                  <span>{personal.nationality}</span>
                </div>
              )}
              {personal.dateOfBirth && (
                <div className="text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700">Date of birth: </span>
                  <span>{personal.dateOfBirth}</span>
                </div>
              )}
              {personal.bloodGroup && (
                <div className="text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700">Blood group: </span>
                  <span className="font-bold text-rose-700">{personal.bloodGroup}</span>
                </div>
              )}
            </div>

            {(personal.fatherName || personal.motherName) && (
              <div className="text-[11px] text-slate-500 pt-1">
                {personal.fatherName && <span>Father: {personal.fatherName}</span>}
                {personal.fatherName && personal.motherName && <span> • </span>}
                {personal.motherName && <span>Mother: {personal.motherName}</span>}
              </div>
            )}
          </div>

          {/* Photo (EU Passport Format on Top Right) */}
          {personal.photo && personal.showPhoto !== false && (
            <div className="shrink-0 self-center sm:self-start">
              <div className={`w-28 h-36 overflow-hidden border-2 border-[#003399] shadow-md bg-slate-100 ${photoBorderClass}`}>
                <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Empty state notice if completely blank */}
        {experiences.length === 0 && education.length === 0 && certificates.length === 0 && skills.length === 0 && !personal.summary && (
          <div className="p-6 border-2 border-dashed border-blue-200 rounded-2xl text-center text-slate-500 text-xs space-y-1.5 my-6 no-print bg-blue-50/40">
            <div className="font-bold text-[#003399] text-sm">Europass CV 2026 Blank Canvas</div>
            <p>বামের এডিটর থেকে আপনার তথ্য লিখুন। সরাসরি অফিসিয়াল ইউরোপাস ফরম্যাটে সিভি তৈরি হবে।</p>
            <p className="text-[11px] text-blue-700 font-semibold">অথবা ডেমো দেখতে উপরের &ldquo;Load Sample&rdquo; বাটনে ক্লিক করতে পারেন।</p>
          </div>
        )}

        {/* Summary */}
        {personal.summary && (
          <div className="grid grid-cols-12 gap-4 mb-6 pb-5 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#003399]">
                WORK EXPERIENCE PROFILE
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-8 text-xs text-slate-700 leading-relaxed">
              {personal.summary}
            </div>
          </div>
        )}

        {/* Work Experience with Left Date Columns */}
        {experiences.length > 0 && (
          <div className="grid grid-cols-12 gap-4 mb-6 pb-5 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#003399]">
                WORK EXPERIENCE
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-8 space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="font-mono text-[11px] font-bold text-slate-500">
                    {exp.startDate} – {exp.endDate || 'Current'}
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{exp.title}</div>
                  <div className="text-xs font-semibold text-[#003399]">
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  <p className="text-xs text-slate-700 mt-1.5 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Training */}
        {education.length > 0 && (
          <div className="grid grid-cols-12 gap-4 mb-6 pb-5 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#003399]">
                EDUCATION AND TRAINING
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-8 space-y-3.5">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-mono text-[11px] font-bold text-slate-500">
                    {edu.startDate} – {edu.endDate}
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{edu.degree}</div>
                  <div className="text-xs text-slate-700 font-semibold">{edu.institution}</div>
                  {edu.fieldOfStudy && (
                    <div className="text-[11px] text-slate-600">Field: {edu.fieldOfStudy}</div>
                  )}
                  {edu.grade && (
                    <div className="text-[11px] text-slate-500">Grade: {edu.grade}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Language Skills - CEFR Self-Assessment Table */}
        {languages.length > 0 && (
          <div className="grid grid-cols-12 gap-4 mb-6 pb-5 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#003399]">
                LANGUAGE SKILLS
              </h2>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                European CEFR Framework
              </span>
            </div>
            <div className="col-span-12 sm:col-span-8 space-y-2 text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200">
                  <thead className="bg-[#003399]/5 text-slate-800 font-bold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="p-2 border-r border-slate-200">Language</th>
                      <th className="p-2 border-r border-slate-200">Proficiency</th>
                      <th className="p-2">CEFR Level Equivalent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {languages.map((l) => (
                      <tr key={l.id}>
                        <td className="p-2 font-bold text-slate-900 border-r border-slate-200">
                          {l.language}
                        </td>
                        <td className="p-2 text-slate-700 border-r border-slate-200">
                          {l.proficiency}
                        </td>
                        <td className="p-2 font-mono text-[#003399] font-bold">
                          {l.proficiency === 'Native' ? 'C2 (Mastery / Native)' :
                           l.proficiency === 'Fluent' ? 'C1 (Effective Operational)' :
                           l.proficiency === 'Proficient' ? 'B2 (Vantage)' :
                           l.proficiency === 'Conversational' ? 'B1 (Threshold)' : 'A2 (Waystage)'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Digital & Technical Skills */}
        {skills.length > 0 && (
          <div className="grid grid-cols-12 gap-4 mb-6 pb-5 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#003399]">
                DIGITAL SKILLS
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-8">
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded bg-blue-50 text-[#003399] border border-blue-200 text-xs font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Additional Information / Certifications */}
        {certificates.length > 0 && (
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-12 sm:col-span-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#003399]">
                CERTIFICATIONS & ACCREDITATIONS
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-8">
              {renderCertificatesBlock('blue')}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= 0A2. EUROPASS CV 2026 (WORD & DOCS FORMAT) =================
  if (templateId === 'europass_word_2026') {
    return (
      <div className="w-full bg-white text-slate-900 p-8 sm:p-12 text-left font-sans leading-relaxed border-t-8 border-[#002f6c]">
        {/* Official Word Template Title Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 mb-6 border-b-2 border-[#002f6c]">
          <div className="space-y-1 flex-1">
            <div className="text-xs font-black uppercase tracking-wider text-[#002f6c] font-mono">
              Europass Curriculum Vitae 2026 © Word Format
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 uppercase tracking-tight">
              {personal.fullName || 'YOUR FULL NAME'}
            </h1>
            <p className="text-xs font-bold text-[#002f6c] uppercase">
              {personal.headline || 'Professional Curriculum Vitae'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700 pt-2 border-t border-slate-200">
              {personal.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#002f6c] shrink-0" />
                  <span>{personal.address}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#002f6c] shrink-0" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#002f6c] shrink-0" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.nationality && (
                <div className="text-[11px] text-slate-700">
                  <span className="font-bold text-slate-900">Nationality: </span>
                  <span>{personal.nationality}</span>
                </div>
              )}
              {personal.dateOfBirth && (
                <div className="text-[11px] text-slate-700">
                  <span className="font-bold text-slate-900">Date of birth: </span>
                  <span>{personal.dateOfBirth}</span>
                </div>
              )}
              {personal.bloodGroup && (
                <div className="text-[11px] text-slate-700">
                  <span className="font-bold text-slate-900">Blood group: </span>
                  <span className="font-bold text-rose-700">{personal.bloodGroup}</span>
                </div>
              )}
            </div>
            {(personal.fatherName || personal.motherName) && (
              <div className="text-[11px] text-slate-600 pt-1">
                {personal.fatherName && <span>Father: {personal.fatherName}</span>}
                {personal.fatherName && personal.motherName && <span> • </span>}
                {personal.motherName && <span>Mother: {personal.motherName}</span>}
              </div>
            )}
          </div>

          {/* Word Template Passport Photo */}
          {shouldShowPhoto && (
            <div className="shrink-0 self-center sm:self-start">
              <div className={`w-28 h-36 overflow-hidden border-2 border-[#002f6c] shadow bg-slate-100 ${photoBorderClass}`}>
                <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Word Template 2-Column Grid (Left: Category/Dates, Right: Details) */}
        {personal.summary && (
          <div className="grid grid-cols-12 gap-4 pb-4 mb-5 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-4 text-xs font-black uppercase text-[#002f6c]">
              Occupational Field / Summary
            </div>
            <div className="col-span-12 sm:col-span-8 text-xs text-slate-800 leading-relaxed">
              {personal.summary}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pb-4 mb-5 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-4 text-xs font-black uppercase text-[#002f6c]">
              Work Experience
            </div>
            <div className="col-span-12 sm:col-span-8 space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="font-bold text-slate-500 text-[11px]">
                    {exp.startDate} – {exp.endDate || 'Current'}
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{exp.title}</div>
                  <div className="font-semibold text-[#002f6c]">
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  <p className="text-xs text-slate-700 mt-1 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education and Training */}
        {education.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pb-4 mb-5 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-4 text-xs font-black uppercase text-[#002f6c]">
              Education and Training
            </div>
            <div className="col-span-12 sm:col-span-8 space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-500 text-[11px]">
                    {edu.startDate} – {edu.endDate}
                  </div>
                  <div className="font-bold text-slate-900 text-sm">{edu.degree}</div>
                  <div className="text-slate-700 font-semibold">{edu.institution}</div>
                  {edu.fieldOfStudy && (
                    <div className="text-[11px] text-slate-600">Field: {edu.fieldOfStudy}</div>
                  )}
                  {edu.grade && (
                    <div className="text-[11px] text-slate-500">Grade: {edu.grade}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Skills & Language CEFR Grid */}
        {languages.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pb-4 mb-5 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-4 text-xs font-black uppercase text-[#002f6c]">
              Language Skills (CEFR)
            </div>
            <div className="col-span-12 sm:col-span-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-300">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300 text-[11px]">
                    <tr>
                      <th className="p-2 border-r border-slate-300">Language</th>
                      <th className="p-2 border-r border-slate-300">Proficiency</th>
                      <th className="p-2">CEFR Framework Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {languages.map((l) => (
                      <tr key={l.id}>
                        <td className="p-2 font-bold text-slate-900 border-r border-slate-200">{l.language}</td>
                        <td className="p-2 text-slate-700 border-r border-slate-200">{l.proficiency}</td>
                        <td className="p-2 font-bold text-[#002f6c]">
                          {l.proficiency === 'Native' ? 'C2 (Mastery / Native)' :
                           l.proficiency === 'Fluent' ? 'C1 (Effective Operational)' :
                           l.proficiency === 'Proficient' ? 'B2 (Vantage)' :
                           l.proficiency === 'Conversational' ? 'B1 (Threshold)' : 'A2 (Waystage)'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Digital Skills */}
        {skills.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pb-4 mb-5 border-b border-slate-200">
            <div className="col-span-12 sm:col-span-4 text-xs font-black uppercase text-[#002f6c]">
              Digital & Technical Skills
            </div>
            <div className="col-span-12 sm:col-span-8">
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-blue-50 text-[#002f6c] border border-blue-200 rounded text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certifications */}
        {certificates.length > 0 && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-4 text-xs font-black uppercase text-[#002f6c]">
              Certificates & Licences
            </div>
            <div className="col-span-12 sm:col-span-8">
              {renderCertificatesBlock('blue')}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= 0A3. NOVORESUME EUROPEAN CV 2026 =================
  if (templateId === 'europass_novoresume_2026') {
    return (
      <div className="w-full bg-white text-slate-900 p-0 text-left font-sans leading-relaxed selection:bg-blue-100">
        {/* Top Header Banner */}
        <div className="bg-[#0f4c81] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left flex-1">
            <span className="inline-block px-2.5 py-0.5 bg-blue-500/30 text-blue-200 text-[10px] font-bold rounded uppercase tracking-wider mb-1">
              European Standard CV (Novoresume 2026)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{personal.fullName || 'YOUR NAME'}</h1>
            <p className="text-sm font-semibold text-blue-200">{personal.headline || 'Professional Headline'}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-blue-100 pt-2">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.address && <span>• {personal.address}</span>}
              {personal.bloodGroup && <span>• Blood: {personal.bloodGroup}</span>}
            </div>
          </div>
          {shouldShowPhoto && (
            <div className={`w-28 h-28 overflow-hidden border-4 border-white shadow-xl shrink-0 ${photoBorderClass}`}>
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* 2-Column Split: 38% Left Sidebar, 62% Main Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column */}
          <div className="md:col-span-5 space-y-5">
            {/* Personal Details */}
            {(personal.nationality || personal.dateOfBirth || personal.fatherName || personal.motherName || personal.permanentAddress) && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0f4c81] mb-1.5">Personal Details</h3>
                {personal.nationality && <div><span className="font-semibold text-slate-700">Nationality:</span> {personal.nationality}</div>}
                {personal.dateOfBirth && <div><span className="font-semibold text-slate-700">DOB:</span> {personal.dateOfBirth}</div>}
                {personal.fatherName && <div><span className="font-semibold text-slate-700">Father:</span> {personal.fatherName}</div>}
                {personal.motherName && <div><span className="font-semibold text-slate-700">Mother:</span> {personal.motherName}</div>}
                {personal.permanentAddress && <div><span className="font-semibold text-slate-700">Permanent:</span> {personal.permanentAddress}</div>}
              </div>
            )}

            {/* Languages with CEFR bars */}
            {languages.length > 0 && (
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/80">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0f4c81] mb-2.5">Languages (CEFR)</h3>
                <div className="space-y-2.5 text-xs">
                  {languages.map((l) => (
                    <div key={l.id}>
                      <div className="flex justify-between font-semibold text-slate-800 mb-0.5">
                        <span>{l.language}</span>
                        <span className="text-[#0f4c81] text-[11px]">{l.proficiency}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0f4c81] h-full rounded-full"
                          style={{
                            width:
                              l.proficiency === 'Native' ? '100%' :
                              l.proficiency === 'Fluent' ? '85%' :
                              l.proficiency === 'Proficient' ? '70%' :
                              l.proficiency === 'Conversational' ? '50%' : '30%'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0f4c81] mb-2">Key Competencies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-blue-100 text-[#0f4c81] rounded-md text-xs font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certificates.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0f4c81] mb-2 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Certificates
                </h3>
                {renderCertificatesBlock('blue')}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 space-y-6">
            {personal.summary && (
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-[#0f4c81] mb-2 border-b-2 border-[#0f4c81] pb-1">
                  Executive Profile
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">{personal.summary}</p>
              </div>
            )}

            {experiences.length > 0 && (
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-[#0f4c81] mb-3 border-b-2 border-[#0f4c81] pb-1">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-extrabold text-slate-900">{exp.title}</span>
                        <span className="text-[11px] text-slate-500 font-semibold">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <div className="text-xs font-semibold text-[#0f4c81]">{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
                      <p className="text-xs text-slate-600 mt-1.5 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-[#0f4c81] mb-3 border-b-2 border-[#0f4c81] pb-1">
                  Education & Training
                </h2>
                <div className="space-y-3 text-xs">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                      <div>
                        <div className="font-bold text-slate-900">{edu.degree}</div>
                        <div className="text-slate-600 text-[11px]">{edu.institution} {edu.grade ? `(${edu.grade})` : ''}</div>
                      </div>
                      <span className="text-slate-500 text-[11px] font-mono">{edu.startDate} – {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= 0A4. ENHANCV & KUDOSWALL EUROPEAN MAKER 2026 =================
  if (templateId === 'europass_enhancv_2026') {
    return (
      <div className="w-full bg-white text-slate-900 p-0 text-left font-sans leading-relaxed selection:bg-blue-100">
        <div className="h-3 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-400"></div>
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left flex-1">
            <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded uppercase tracking-wider mb-1">
              Enhancv & KudosWall 2026 Standard
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">{personal.fullName || 'YOUR NAME'}</h1>
            <p className="text-sm font-semibold text-blue-700">{personal.headline || 'Professional Headline'}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-600 pt-2">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.address && <span>• {personal.address}</span>}
              {personal.bloodGroup && <span>• Blood: {personal.bloodGroup}</span>}
            </div>
          </div>
          {shouldShowPhoto && (
            <div className={`w-28 h-28 overflow-hidden border-2 border-blue-600 shadow-md shrink-0 ${photoBorderClass}`}>
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {personal.summary && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-blue-800 mb-2 border-b border-blue-200 pb-1">
                Executive Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-blue-800 mb-3 border-b border-blue-200 pb-1">
                Work Experience
              </h2>
              <div className="space-y-3.5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-3.5 bg-blue-50/30 rounded-xl border border-blue-200/50">
                    <div className="flex justify-between items-baseline text-xs font-bold">
                      <span className="text-slate-900">{exp.title} • <span className="text-blue-700">{exp.company}</span></span>
                      <span className="text-slate-500 font-mono text-[11px]">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {education.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-800 mb-2 border-b border-blue-200 pb-1">
                  Education
                </h3>
                <div className="space-y-2 text-xs">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-slate-600 text-[11px]">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certificates.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-800 mb-2 border-b border-blue-200 pb-1">
                  Certifications
                </h3>
                {renderCertificatesBlock('blue')}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-200">
            {languages.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase mb-2">Languages (CEFR)</h3>
                <div className="space-y-1.5 text-xs">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between text-slate-700">
                      <span>{l.language}</span>
                      <span className="font-bold text-blue-800">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skills.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase mb-2">Key Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-blue-100 text-blue-900 rounded-lg text-xs font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= 0A5. ZETY EUROPEAN CURRICULUM VITAE 2026 =================
  if (templateId === 'europass_zety_2026') {
    return (
      <div className="w-full bg-white text-slate-900 p-8 sm:p-12 text-left font-sans leading-relaxed selection:bg-blue-100">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 mb-6 border-b-2 border-blue-900">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-950 uppercase tracking-tight">
              {personal.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mt-0.5">
              {personal.headline || 'Curriculum Vitae'}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 pt-2">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.address && <span>• {personal.address}</span>}
              {personal.bloodGroup && <span>• Blood: {personal.bloodGroup}</span>}
            </div>
          </div>
          {shouldShowPhoto && (
            <div className={`w-28 h-32 overflow-hidden border-2 border-blue-900 shadow shrink-0 ${photoBorderClass}`}>
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {personal.summary && (
          <div className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-blue-900 border-b border-blue-200 pb-1 mb-2">
              Profile Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-blue-900 border-b border-blue-200 pb-1 mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-blue-400">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-900"></div>
                  <div className="flex justify-between items-baseline text-xs font-bold">
                    <span className="text-slate-900">{exp.title} — <span className="text-blue-800">{exp.company}</span></span>
                    <span className="text-slate-500 font-mono text-[11px]">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-blue-900 border-b border-blue-200 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.institution} {edu.grade ? `(${edu.grade})` : ''}</div>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px]">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-blue-900 border-b border-blue-200 pb-1 mb-2">
                Languages (CEFR)
              </h2>
              <div className="space-y-1.5 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{l.language}</span>
                    <span className="font-bold text-blue-800">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-blue-900 border-b border-blue-200 pb-1 mb-2">
                Key Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {certificates.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-blue-900 border-b border-blue-200 pb-1 mb-2">
              Certifications
            </h2>
            {renderCertificatesBlock('blue')}
          </div>
        )}
      </div>
    );
  }

  // ================= 0B. EUROPASS MODERN 2026 (COBALT EDITION) =================
  if (templateId === 'europass_modern_2026') {
    return (
      <div className="w-full bg-white text-slate-900 p-0 text-left font-sans selection:bg-blue-100">
        {/* Top Modern European Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-block px-2 py-0.5 bg-blue-500/30 text-blue-200 text-[10px] font-bold rounded tracking-wider uppercase mb-1">
              Europass Modern 2026 Edition
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{personal.fullName || 'YOUR NAME'}</h1>
            <p className="text-sm font-semibold text-blue-200">{personal.headline || 'Professional Headline'}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-blue-100 pt-2">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.address && <span>• {personal.address}</span>}
              {personal.bloodGroup && <span>• Blood: {personal.bloodGroup}</span>}
            </div>
          </div>
          {personal.photo && personal.showPhoto !== false && (
            <div className={`w-24 h-24 sm:w-28 sm:h-28 overflow-hidden border-4 border-white shadow-xl shrink-0 ${photoBorderClass}`}>
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {personal.summary && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-blue-800 mb-2 border-b-2 border-blue-800 pb-1">
                Executive Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-blue-800 mb-3 border-b-2 border-blue-800 pb-1">
                Work Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-3 bg-blue-50/30 rounded-xl border border-blue-200/50">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-extrabold text-slate-900">{exp.title} • <span className="text-blue-800">{exp.company}</span></span>
                      <span className="text-[11px] text-slate-500 font-semibold">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {education.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-800 mb-2 border-b border-blue-200 pb-1">
                  Education & Training
                </h3>
                <div className="space-y-2 text-xs">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-slate-600 text-[11px]">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certificates.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-blue-800 mb-2 border-b border-blue-200 pb-1">
                  Accreditations
                </h3>
                {renderCertificatesBlock('blue')}
              </div>
            )}
          </div>

          {/* Languages & Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-200">
            {languages.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase mb-2">Languages (CEFR)</h3>
                <div className="space-y-1.5 text-xs">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between text-slate-700">
                      <span className="font-medium">{l.language}</span>
                      <span className="font-semibold text-blue-800">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skills.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase mb-2">Key Competencies</h3>
                <div className="flex flex-wrap gap-1">
                  {skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded text-[11px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= 0C. EUROPASS CLASSIC DOC =================
  if (templateId === 'europass_classic_doc') {
    return (
      <div className="w-full bg-white text-slate-900 p-8 sm:p-12 text-left font-serif leading-normal selection:bg-slate-200">
        <div className="flex justify-between items-start pb-4 mb-6 border-b-2 border-blue-900">
          <div>
            <div className="text-xs font-bold font-sans text-blue-900 tracking-wider">europass</div>
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-slate-950 font-sans mt-0.5">
              {personal.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs font-semibold text-slate-700 font-sans">{personal.headline || 'Curriculum Vitae'}</p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600 font-sans mt-2">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.address && <span>• {personal.address}</span>}
              {personal.bloodGroup && <span>• Blood: {personal.bloodGroup}</span>}
            </div>
          </div>
          {personal.photo && personal.showPhoto !== false && (
            <div className={`w-24 h-32 border-2 border-blue-900 overflow-hidden shadow shrink-0 ${photoBorderClass}`}>
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-900 border-b border-blue-300 pb-0.5 mb-3 font-sans">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4 font-sans text-xs">
              {experiences.map((exp) => (
                <div key={exp.id} className="grid grid-cols-12 gap-3">
                  <div className="col-span-4 text-slate-500 font-mono text-[11px]">{exp.startDate} – {exp.endDate}</div>
                  <div className="col-span-8">
                    <div className="font-bold text-slate-900">{exp.title}</div>
                    <div className="text-blue-800 font-semibold">{exp.company}</div>
                    <p className="text-slate-600 mt-1 whitespace-pre-line">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-900 border-b border-blue-300 pb-0.5 mb-3 font-sans">
              EDUCATION AND TRAINING
            </h2>
            <div className="space-y-3 font-sans text-xs">
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-12 gap-3">
                  <div className="col-span-4 text-slate-500 font-mono text-[11px]">{edu.startDate} – {edu.endDate}</div>
                  <div className="col-span-8">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-700">{edu.institution}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates & Languages */}
        {certificates.length > 0 && (
          <div className="mb-5 font-sans">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-900 border-b border-blue-300 pb-0.5 mb-2 font-sans">
              CERTIFICATES
            </h2>
            {renderCertificatesBlock('blue')}
          </div>
        )}
      </div>
    );
  }

  // ================= 0D. EUROPASS ACADEMIC =================
  if (templateId === 'europass_academic') {
    return (
      <div className="w-full bg-[#fafafa] text-slate-900 p-8 sm:p-12 text-left font-serif leading-normal selection:bg-blue-100">
        <div className="text-center pb-4 mb-6 border-b-2 border-slate-900 flex flex-col items-center">
          {personal.photo && personal.showPhoto !== false && (
            <div className={`w-24 h-28 overflow-hidden border-2 border-slate-900 shadow mb-3 ${photoBorderClass}`}>
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="text-3xl font-black text-slate-950 tracking-tight uppercase font-sans">
            {personal.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-sm font-bold text-blue-900 font-sans mt-0.5">
            {personal.headline || 'Academic Curriculum Vitae'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 font-sans mt-2">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.address && <span>• {personal.address}</span>}
            {personal.website && <span>• {personal.website}</span>}
          </div>
        </div>

        {/* Education first for Academic CV */}
        {education.length > 0 && (
          <div className="mb-6 font-sans">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-950 border-b-2 border-blue-900 pb-1 mb-3">
              Academic Degrees & Education
            </h2>
            <div className="space-y-3 text-xs">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{edu.degree}</span>
                    <span className="text-slate-700">, {edu.institution}</span>
                    {edu.grade && <span className="text-slate-500"> ({edu.grade})</span>}
                  </div>
                  <span className="text-slate-500 text-[11px] font-mono">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-6 font-sans">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-950 border-b-2 border-blue-900 pb-1 mb-3">
              Research & Professional Appointments
            </h2>
            <div className="space-y-3.5 text-xs">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{exp.title} — <span className="text-blue-900">{exp.company}</span></span>
                    <span className="text-slate-500 font-normal font-mono">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-slate-600 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates & Publications */}
        {certificates.length > 0 && (
          <div className="mb-6 font-sans">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-950 border-b-2 border-blue-900 pb-1 mb-2">
              Credentials & Fellowships
            </h2>
            {renderCertificatesBlock('blue')}
          </div>
        )}
      </div>
    );
  }

  // ================= 1. ATS CLEAN TEMPLATE =================
  if (templateId === 'ats_clean') {
    return (
      <div className="w-full bg-white text-slate-900 p-8 sm:p-12 text-left font-serif leading-normal selection:bg-slate-200">
        {/* Header - Centered ATS Format */}
        <div className="text-center pb-4 mb-4 border-b-2 border-slate-900">
          {personal.photo && personal.showPhoto !== false && (
            <div className="mb-3 flex justify-center">
              <div className={`w-24 h-24 overflow-hidden border-2 border-slate-800 shadow ${photoBorderClass}`}>
                <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-slate-950 font-sans">
            {personal.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-sm font-semibold text-slate-700 font-sans mt-0.5">
            {personal.headline || 'Professional Headline'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 font-sans mt-2">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.address && <span>• Present: {personal.address}</span>}
            {personal.permanentAddress && <span>• Permanent: {personal.permanentAddress}</span>}
            {personal.bloodGroup && <span>• Blood: {personal.bloodGroup}</span>}
            {personal.linkedin && <span>• {personal.linkedin}</span>}
            {personal.website && <span>• {personal.website}</span>}
          </div>
          {(personal.fatherName || personal.motherName) && (
            <div className="text-[11px] text-slate-600 font-sans mt-1">
              {personal.fatherName && <span>Father: {personal.fatherName}</span>}
              {personal.fatherName && personal.motherName && <span> | </span>}
              {personal.motherName && <span>Mother: {personal.motherName}</span>}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {personal.summary && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed font-sans">{personal.summary}</p>
          </div>
        )}

        {/* Empty state notice if CV is completely blank */}
        {experiences.length === 0 && education.length === 0 && certificates.length === 0 && skills.length === 0 && !personal.summary && (
          <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center text-slate-500 text-xs space-y-1.5 my-6 no-print bg-slate-50/60 font-sans">
            <div className="font-bold text-slate-800 text-sm">সিভি বর্তমানে খালি রয়েছে (CV is currently blank)</div>
            <p>বামের এডিটর থেকে আপনার নাম, যোগাযোগ, অভিজ্ঞতা, শিক্ষা ও সার্টিফিকেট লিখুন।</p>
            <p className="text-[11px] text-amber-600 font-semibold">অথবা নমুনা দেখতে চাইলে উপরের &ldquo;Load Sample&rdquo; বাটনে ক্লিক করতে পারেন।</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2.5 font-sans">
              Work Experience
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-sans text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{exp.title}</span>
                      {exp.company && <span className="text-slate-700">, {exp.company}</span>}
                      {exp.location && <span className="text-slate-500"> — {exp.location}</span>}
                    </div>
                    <span className="text-slate-600 text-[11px] whitespace-nowrap font-medium">
                      {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 font-sans mt-1 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2.5 font-sans">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline font-sans text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                    {edu.institution && <span className="text-slate-700"> — {edu.institution}</span>}
                    {edu.grade && <span className="text-slate-500 font-medium"> ({edu.grade})</span>}
                  </div>
                  <span className="text-slate-600 text-[11px] whitespace-nowrap">
                    {edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates & Licenses */}
        {certificates.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
              Certifications & Credentials
            </h2>
            <div className="font-sans">
              {renderCertificatesBlock('slate')}
            </div>
          </div>
        )}

        {/* Skills & Languages */}
        <div className="mb-4 font-sans text-xs">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-2 font-sans">
            Technical Skills & Languages
          </h2>
          {skills.length > 0 && (
            <p className="text-slate-800 mb-1">
              <span className="font-bold text-slate-900">Skills: </span>
              {skills.join(', ')}
            </p>
          )}
          {languages.length > 0 && (
            <p className="text-slate-800">
              <span className="font-bold text-slate-900">Languages: </span>
              {languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ================= 2. MODERN EMERALD TEMPLATE =================
  if (templateId === 'modern_emerald') {
    return (
      <div className="w-full bg-white text-slate-800 flex flex-col md:flex-row min-h-full">
        {/* Left Dark Slate / Emerald Sidebar */}
        <div className="w-full md:w-[35%] bg-slate-900 text-slate-100 p-6 sm:p-7 flex flex-col justify-between border-r-4 border-emerald-500">
          <div>
            {/* Photo */}
            {shouldShowPhoto && (
              <div className="mb-5 flex justify-center">
                <div className={`w-28 h-28 overflow-hidden border-2 border-emerald-400 shadow-lg ${photoBorderClass}`}>
                  <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* Name on sidebar */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-extrabold text-white tracking-tight">{personal.fullName || 'Your Name'}</h1>
              <p className="text-xs text-emerald-400 font-medium mt-1">{personal.headline || 'Professional Headline'}</p>
              {personal.bloodGroup && (
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-600/40 text-rose-300 text-[10px] font-bold">
                  <Droplet className="w-3 h-3 text-rose-400 fill-rose-400" />
                  <span>Blood: {personal.bloodGroup}</span>
                </div>
              )}
            </div>

            {/* Contact Details */}
            <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4 mb-5">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">Contact & Location</h3>
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight">{personal.address}</span>
                </div>
              )}
              {personal.permanentAddress && (
                <div className="flex items-start gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="text-[10px] leading-tight">Permanent: {personal.permanentAddress}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{personal.linkedin}</span>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{personal.website}</span>
                </div>
              )}
            </div>

            {/* Biodata / Family Information (if provided) */}
            {(personal.fatherName || personal.motherName || personal.dateOfBirth) && (
              <div className="border-t border-slate-800 pt-3.5 mb-5 text-[11px] text-slate-300">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>Personal Bio</span>
                </h3>
                {personal.fatherName && <div><span className="text-slate-400">Father:</span> {personal.fatherName}</div>}
                {personal.motherName && <div><span className="text-slate-400">Mother:</span> {personal.motherName}</div>}
                {personal.dateOfBirth && <div><span className="text-slate-400">DOB:</span> {personal.dateOfBirth}</div>}
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="border-t border-slate-800 pt-4 mb-5">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                  <LangIcon className="w-3.5 h-3.5" />
                  Languages
                </h3>
                <div className="space-y-2 text-xs">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between items-center">
                      <span className="text-slate-200 font-medium">{l.language}</span>
                      <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                        {l.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="border-t border-slate-800 pt-4 mb-5">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2.5">Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded bg-slate-800 text-slate-200 text-[10px] font-medium border border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Content Pane */}
        <div className="flex-1 p-6 sm:p-8 space-y-5 text-left">
          {/* Summary */}
          {personal.summary && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 border-b-2 border-emerald-500 pb-1 mb-2">
                Executive Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {/* Empty state notice if CV is completely blank */}
          {experiences.length === 0 && education.length === 0 && certificates.length === 0 && skills.length === 0 && !personal.summary && (
            <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center text-slate-500 text-xs space-y-1.5 my-6 no-print bg-slate-50/60">
              <div className="font-bold text-slate-800 text-sm">সিভি বর্তমানে সম্পূর্ণ খালি রয়েছে (CV is clean & blank)</div>
              <p>বামের এডিটর থেকে আপনার নাম, যোগাযোগ, অভিজ্ঞতা, শিক্ষা ও সার্টিফিকেট লিখুন।</p>
              <p className="text-[11px] text-amber-600 font-semibold">অথবা নমুনা দেখতে চাইলে উপরের &ldquo;Load Sample&rdquo; বাটনে ক্লিক করতে পারেন।</p>
            </div>
          )}

          {/* Work History */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 border-b-2 border-emerald-500 pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-3.5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2 border-slate-200">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div className="flex justify-between items-baseline text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{exp.title}</span>
                        {exp.company && <span className="text-emerald-700 font-semibold"> • {exp.company}</span>}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 border-b-2 border-emerald-500 pb-1 mb-2.5">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-slate-600 text-[11px]">{edu.institution} {edu.grade ? `(${edu.grade})` : ''}</div>
                    </div>
                    <span className="text-slate-500 text-[11px]">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates (Configured Style) */}
          {certificates.length > 0 && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 border-b-2 border-emerald-500 pb-1 mb-2.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Certificates & Credentials
              </h2>
              {renderCertificatesBlock('emerald')}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 border-b-2 border-emerald-500 pb-1 mb-2">
                Projects
              </h2>
              <div className="space-y-2 text-xs">
                {projects.map((p) => (
                  <div key={p.id}>
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{p.name} {p.role ? `(${p.role})` : ''}</span>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline text-[11px] font-normal flex items-center gap-0.5">
                          <span>Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    {p.technologies && <div className="text-[11px] text-emerald-700 font-medium">Stack: {p.technologies}</div>}
                    <p className="text-xs text-slate-600 mt-0.5">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= 3. EUROPASS NAVY TEMPLATE =================
  if (templateId === 'europass_navy') {
    return (
      <div className="w-full bg-white text-slate-900 p-6 sm:p-10 text-left font-sans">
        {/* Navy Top Banner */}
        <div className="bg-blue-800 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 mb-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{personal.fullName}</h1>
            <p className="text-sm text-blue-200 font-semibold">{personal.headline}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-blue-100 pt-2">
              {personal.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {personal.email}</span>}
              {personal.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {personal.phone}</span>}
              {personal.address && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {personal.address}</span>}
              {personal.bloodGroup && (
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <Droplet className="w-3 h-3 fill-amber-300" /> Blood: {personal.bloodGroup}
                </span>
              )}
            </div>
          </div>
          {shouldShowPhoto && (
            <div className={`w-24 h-24 overflow-hidden border-2 border-white shadow shrink-0 ${photoBorderClass}`}>
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 space-y-5">
            {/* Summary */}
            {personal.summary && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1.5">Profile</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{personal.summary}</p>
              </div>
            )}

            {/* Biodata / Personal details if provided */}
            {(personal.fatherName || personal.motherName || personal.permanentAddress) && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1.5">Personal Details</h3>
                {personal.fatherName && <div><span className="font-semibold text-slate-700">Father:</span> {personal.fatherName}</div>}
                {personal.motherName && <div><span className="font-semibold text-slate-700">Mother:</span> {personal.motherName}</div>}
                {personal.permanentAddress && <div><span className="font-semibold text-slate-700">Permanent Address:</span> {personal.permanentAddress}</div>}
              </div>
            )}

            {/* Languages with CEFR bars */}
            {languages.length > 0 && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-2.5 flex items-center gap-1.5">
                  <LangIcon className="w-3.5 h-3.5" />
                  Language Competence
                </h3>
                <div className="space-y-2 text-xs">
                  {languages.map((l) => (
                    <div key={l.id}>
                      <div className="flex justify-between items-center text-slate-800 mb-0.5">
                        <span className="font-semibold">{l.language}</span>
                        <span className="text-[11px] text-blue-700 font-medium">{l.proficiency}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{
                            width:
                              l.proficiency === 'Native' ? '100%' :
                              l.proficiency === 'Fluent' ? '85%' :
                              l.proficiency === 'Proficient' ? '70%' :
                              l.proficiency === 'Conversational' ? '50%' : '30%'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-2">Key Competencies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-md text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates */}
            {certificates.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-2 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Certifications
                </h3>
                {renderCertificatesBlock('blue')}
              </div>
            )}
          </div>

          {/* Right Column: Experience & Education */}
          <div className="md:col-span-7 space-y-6">
            {experiences.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-600 pb-1 mb-3">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-3.5 border-l-2 border-blue-500/40">
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-600"></div>
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-bold text-slate-900">{exp.title}</span>
                        <span className="text-[11px] text-slate-500">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <div className="text-[11px] text-blue-700 font-semibold">{exp.company} {exp.location ? `— ${exp.location}` : ''}</div>
                      <p className="text-xs text-slate-700 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-600 pb-1 mb-3">
                  Education & Training
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>{edu.degree}</span>
                        <span className="text-slate-500 text-[11px] font-normal">{edu.startDate} – {edu.endDate}</span>
                      </div>
                      <div className="text-slate-600 text-[11px]">{edu.institution} {edu.grade ? `(${edu.grade})` : ''}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= 4. BANGLADESH CORPORATE & GOVT / REGIONAL STANDARD =================
  if (templateId === 'bangladesh_standard') {
    return (
      <div className="w-full bg-white text-slate-900 p-8 sm:p-12 text-left font-sans">
        {/* Header with photo top right */}
        <div className="flex justify-between items-start pb-4 border-b-2 border-emerald-800 mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 uppercase tracking-tight">
              {personal.fullName}
            </h1>
            <p className="text-sm font-bold text-slate-700">{personal.headline}</p>
            <div className="text-xs text-slate-600 space-y-0.5 pt-1">
              {personal.phone && <div><span className="font-semibold">Mobile:</span> {personal.phone}</div>}
              {personal.email && <div><span className="font-semibold">Email:</span> {personal.email}</div>}
              {personal.address && <div><span className="font-semibold">Present Address:</span> {personal.address}</div>}
              {personal.permanentAddress && <div><span className="font-semibold">Permanent Address:</span> {personal.permanentAddress}</div>}
              {personal.bloodGroup && (
                <div className="font-bold text-rose-700 flex items-center gap-1">
                  <Droplet className="w-3 h-3 fill-rose-600 text-rose-600" />
                  <span>Blood Group: {personal.bloodGroup}</span>
                </div>
              )}
            </div>
          </div>
          {shouldShowPhoto && (
            <div className={`w-28 h-32 border-2 border-emerald-800 overflow-hidden shadow-sm shrink-0 ${photoBorderClass}`}>
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Career Objective */}
        {personal.summary && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-emerald-800 px-2.5 py-1 mb-2">
              Career Objective
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed pl-1">{personal.summary}</p>
          </div>
        )}

        {/* Empty state notice if CV is completely blank */}
        {experiences.length === 0 && education.length === 0 && certificates.length === 0 && skills.length === 0 && !personal.summary && (
          <div className="p-6 border-2 border-dashed border-emerald-300 rounded-2xl text-center text-slate-500 text-xs space-y-1.5 my-6 no-print bg-emerald-50/40">
            <div className="font-bold text-emerald-950 text-sm">সিভি বর্তমানে সম্পূর্ণ খালি রয়েছে (CV is clean & blank)</div>
            <p>বামের এডিটর থেকে আপনার নাম, যোগাযোগ, অভিজ্ঞতা, শিক্ষা ও সার্টিফিকেট লিখুন।</p>
            <p className="text-[11px] text-emerald-700 font-semibold">অথবা নমুনা দেখতে চাইলে উপরের &ldquo;Load Sample&rdquo; বাটনে ক্লিক করতে পারেন।</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-emerald-800 px-2.5 py-1 mb-2.5">
              Employment History
            </h2>
            <div className="space-y-3.5 pl-1">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-xs text-slate-900">
                    <span>{exp.title} — {exp.company}</span>
                    <span className="text-slate-600 font-normal">{exp.startDate} to {exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Academic Qualification Table */}
        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-emerald-800 px-2.5 py-1 mb-2.5">
              Academic Qualifications
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-300">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-300">Exam / Degree</th>
                    <th className="p-2 border-r border-slate-300">Major / Group</th>
                    <th className="p-2 border-r border-slate-300">Institute</th>
                    <th className="p-2 border-r border-slate-300">Passing Year</th>
                    <th className="p-2">Result / GPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {education.map((edu) => (
                    <tr key={edu.id}>
                      <td className="p-2 font-semibold border-r border-slate-200">{edu.degree}</td>
                      <td className="p-2 border-r border-slate-200">{edu.fieldOfStudy}</td>
                      <td className="p-2 border-r border-slate-200">{edu.institution}</td>
                      <td className="p-2 border-r border-slate-200">{edu.endDate}</td>
                      <td className="p-2 font-medium">{edu.grade || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Personal & Family Details Table (Requested Feature!) */}
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-emerald-800 px-2.5 py-1 mb-2.5">
            Personal & Family Information
          </h2>
          <div className="border border-slate-300 rounded overflow-hidden">
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2 font-bold text-slate-700 w-1/3 bg-slate-50 border-r border-slate-200">Father's Name</td>
                  <td className="p-2 text-slate-800">{personal.fatherName || 'Not Specified'}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-700 bg-slate-50 border-r border-slate-200">Mother's Name</td>
                  <td className="p-2 text-slate-800">{personal.motherName || 'Not Specified'}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-700 bg-slate-50 border-r border-slate-200">Blood Group</td>
                  <td className="p-2 font-bold text-rose-700">{personal.bloodGroup || 'Not Specified'}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-700 bg-slate-50 border-r border-slate-200">Present Address</td>
                  <td className="p-2 text-slate-800">{personal.address || 'Not Specified'}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-700 bg-slate-50 border-r border-slate-200">Permanent Address</td>
                  <td className="p-2 text-slate-800">{personal.permanentAddress || 'Not Specified'}</td>
                </tr>
                {personal.dateOfBirth && (
                  <tr>
                    <td className="p-2 font-bold text-slate-700 bg-slate-50 border-r border-slate-200">Date of Birth</td>
                    <td className="p-2 text-slate-800">{personal.dateOfBirth}</td>
                  </tr>
                )}
                {personal.nationality && (
                  <tr>
                    <td className="p-2 font-bold text-slate-700 bg-slate-50 border-r border-slate-200">Nationality</td>
                    <td className="p-2 text-slate-800">{personal.nationality}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Professional Training & Certifications */}
        {certificates.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-emerald-800 px-2.5 py-1 mb-2.5">
              Professional Training & Certifications
            </h2>
            <div className="pl-1">
              {renderCertificatesBlock('emerald')}
            </div>
          </div>
        )}

        {/* Language Proficiency & Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-emerald-800 px-2 py-1 mb-2">
                Language Proficiency
              </h2>
              <div className="space-y-1 text-xs pl-1">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-slate-700">
                    <span className="font-semibold">{l.language}</span>
                    <span>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-emerald-800 px-2 py-1 mb-2">
                Special Skills
              </h2>
              <div className="flex flex-wrap gap-1.5 pl-1">
                {skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-300 text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Signature Placeholder */}
        <div className="mt-8 pt-4 flex justify-end">
          <div className="text-center">
            <div className="w-36 border-t border-slate-800 mb-1"></div>
            <span className="text-xs font-semibold text-slate-700">{personal.fullName}</span>
          </div>
        </div>
      </div>
    );
  }

  // ================= 5. CREATIVE AMBER PRO TEMPLATE =================
  if (templateId === 'creative_amber') {
    return (
      <div className="w-full bg-white text-slate-900 p-0 text-left font-sans">
        {/* Top Amber Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 p-6 sm:p-8 text-slate-950 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">{personal.fullName}</h1>
            <p className="text-sm font-bold text-amber-950">{personal.headline}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-amber-950 font-medium pt-2">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.address && <span>• {personal.address}</span>}
              {personal.bloodGroup && <span>• Blood: {personal.bloodGroup}</span>}
              {personal.website && <span>• {personal.website}</span>}
            </div>
          </div>
          {shouldShowPhoto && (
            <div className={`w-24 h-24 sm:w-28 sm:h-28 overflow-hidden border-4 border-white shadow-xl shrink-0 ${photoBorderClass}`}>
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6">
          {personal.summary && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-amber-500"></span> About Me
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-amber-500"></span> Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-3 bg-amber-50/40 rounded-xl border border-amber-200/50">
                    <div className="flex justify-between items-baseline text-xs">
                      <div>
                        <span className="font-extrabold text-slate-900">{exp.title}</span>
                        {exp.company && <span className="text-amber-700 font-bold"> @ {exp.company}</span>}
                      </div>
                      <span className="text-[11px] text-slate-500 font-semibold">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 whitespace-pre-line leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" /> Certificates & Accreditations
              </h2>
              {renderCertificatesBlock('amber')}
            </div>
          )}

          {/* Education & Languages & Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase mb-2">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="text-xs mb-1.5">
                  <div className="font-bold text-slate-800">{edu.degree}</div>
                  <div className="text-[11px] text-slate-600">{edu.institution}</div>
                  <div className="text-[10px] text-slate-400">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase mb-2">Languages</h3>
              <div className="space-y-1 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-slate-700">
                    <span>{l.language}</span>
                    <span className="font-semibold text-amber-600">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase mb-2">Key Skills</h3>
              <div className="flex flex-wrap gap-1">
                {skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded text-[11px] font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= 6. TECH MATRIX =================
  if (templateId === 'tech_matrix') {
    return (
      <div className="w-full bg-slate-950 text-slate-200 p-6 sm:p-10 text-left font-mono leading-relaxed">
        {/* Terminal Header */}
        <div className="border border-sky-500/40 bg-slate-900/90 p-5 rounded-2xl mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-sky-400 pl-2">const developer = &quot;{personal.fullName}&quot;;</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans mt-2">{personal.fullName}</h1>
              <p className="text-xs text-emerald-400 font-bold">{personal.headline}</p>
              <div className="flex flex-wrap gap-3 text-xs text-slate-400 mt-3 font-sans">
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && <span>{personal.phone}</span>}
                {personal.address && <span>{personal.address}</span>}
                {personal.bloodGroup && <span className="text-rose-400">Blood: {personal.bloodGroup}</span>}
                {personal.github && <span className="text-sky-400">{personal.github}</span>}
                {personal.linkedin && <span className="text-sky-400">{personal.linkedin}</span>}
              </div>
            </div>
            {shouldShowPhoto && (
              <div className={`w-24 h-24 border-2 border-sky-400 overflow-hidden shadow shrink-0 ${photoBorderClass}`}>
                <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Stack Tags */}
        {skills.length > 0 && (
          <div className="mb-5">
            <span className="text-xs text-sky-400 font-bold">// TECH_STACK:</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {skills.map((s) => (
                <span key={s} className="px-2.5 py-0.5 rounded bg-sky-950/70 text-sky-300 text-xs border border-sky-500/30">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest border-b border-sky-500/30 pb-1 mb-3">
              $ cat work_history.log
            </h2>
            <div className="space-y-4 font-sans">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <span className="font-bold text-white">{exp.title} @ <span className="text-emerald-400">{exp.company}</span></span>
                    <span className="text-slate-400 text-[11px]">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates & Languages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 font-sans">
          {certificates.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-sky-400 font-mono uppercase border-b border-sky-500/30 pb-1 mb-2">
                $ verify --credentials
              </h2>
              {renderCertificatesBlock('sky')}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-sky-400 font-mono uppercase border-b border-sky-500/30 pb-1 mb-2">
                $ get --languages
              </h2>
              <div className="space-y-1.5 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-slate-300 p-1.5 bg-slate-900 rounded border border-slate-800">
                    <span>{l.language}</span>
                    <span className="text-emerald-400 font-semibold">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= 7. DEFAULT / EXECUTIVE BURGUNDY / SWISS =================
  return (
    <div className="w-full bg-[#fdfdfd] text-slate-900 p-8 sm:p-12 text-left font-serif">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-4 mb-6 border-b-2 border-rose-900">
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-3xl font-black text-rose-950 tracking-tight uppercase">{personal.fullName || 'YOUR NAME'}</h1>
          <p className="text-sm font-bold text-rose-800 font-sans mt-1">{personal.headline || 'Professional Headline'}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-stone-600 font-sans mt-2">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.address && <span>• {personal.address}</span>}
            {personal.permanentAddress && <span>• Permanent: {personal.permanentAddress}</span>}
            {personal.bloodGroup && <span className="font-bold text-rose-700">• Blood: {personal.bloodGroup}</span>}
            {personal.linkedin && <span>• {personal.linkedin}</span>}
          </div>
          {(personal.fatherName || personal.motherName) && (
            <div className="text-[11px] text-stone-600 font-sans mt-1">
              {personal.fatherName && <span>Father: {personal.fatherName}</span>}
              {personal.fatherName && personal.motherName && <span> | </span>}
              {personal.motherName && <span>Mother: {personal.motherName}</span>}
            </div>
          )}
        </div>
        {shouldShowPhoto && (
          <div className={`w-24 h-28 overflow-hidden border-2 border-rose-900 shadow shrink-0 ${photoBorderClass}`}>
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {personal.summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-900 border-b border-rose-300 pb-1 mb-2 font-sans">
            Executive Summary
          </h2>
          <p className="text-xs text-stone-800 leading-relaxed font-sans">{personal.summary}</p>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-900 border-b border-rose-300 pb-1 mb-3 font-sans">
            Career Experience
          </h2>
          <div className="space-y-3 font-sans text-xs">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-stone-900">
                  <span>{exp.title} — <span className="text-rose-900">{exp.company}</span></span>
                  <span className="text-stone-500 font-normal">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-stone-700 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {certificates.length > 0 && (
        <div className="mb-5 font-sans">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-900 border-b border-rose-300 pb-1 mb-2">
            Certifications
          </h2>
          {renderCertificatesBlock('rose')}
        </div>
      )}

      {languages.length > 0 && (
        <div className="font-sans text-xs">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-900 border-b border-rose-300 pb-1 mb-2">
            Languages
          </h2>
          <p className="text-stone-700">
            {languages.map((l) => `${l.language} (${l.proficiency})`).join(' • ')}
          </p>
        </div>
      )}
    </div>
  );
};
