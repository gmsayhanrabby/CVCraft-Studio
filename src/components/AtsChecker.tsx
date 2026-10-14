import React from 'react';
import { CVData, TemplateId } from '../types/cv';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';
import { ShieldCheck, AlertTriangle, CheckCircle, Info, Sparkles } from 'lucide-react';

interface AtsCheckerProps {
  data: CVData;
  templateId: TemplateId;
  lang: AppLanguage;
}

export const AtsChecker: React.FC<AtsCheckerProps> = ({ data, templateId, lang }) => {
  const t = TRANSLATIONS[lang];

  const personal = data?.personal || ({} as any);
  const experiences = Array.isArray(data?.experiences) ? data.experiences : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const certificates = Array.isArray(data?.certificates) ? data.certificates : [];

  // Calculate ATS Score & Checklist
  const checks: { title: string; passed: boolean; tip: string; tipBn: string }[] = [];

  // 1. Contact info
  const hasEmail = Boolean(personal.email && personal.email.includes('@'));
  const hasPhone = Boolean(personal.phone && personal.phone.length > 5);
  checks.push({
    title: lang === 'bn' ? 'সঠিক যোগাযোগ তথ্য' : 'Complete Contact Details',
    passed: hasEmail && hasPhone,
    tip: 'Ensure your email and phone number are formatted cleanly without extra icons or symbols.',
    tipBn: 'ইমেইল এবং ফোন নম্বর পরিষ্কারভাবে উল্লেখ করা জরুরি।'
  });

  // 2. Summary
  const hasSummary = Boolean(personal.summary && personal.summary.length > 50);
  checks.push({
    title: lang === 'bn' ? 'পেশাগত সারাংশ (Summary)' : 'Executive Profile Summary',
    passed: hasSummary,
    tip: 'A strong 2-4 sentence summary with target keywords catches recruiter and ATS filters.',
    tipBn: 'পেশাগত সারাংশ ৫০ শব্দের বেশি হলে এটিএস ফিল্টারে সুবিধাজনক হয়।'
  });

  // 3. Work experiences & bullets
  const hasExp = experiences.length > 0;
  const hasActionBullets = experiences.some((e) =>
    /\d+%|\$\d+|\d+\+|\boptimized\b|\barchitected\b|\bled\b|\bmanaged\b|\bdeveloped\b/i.test(
      e.description || ''
    )
  );
  checks.push({
    title: lang === 'bn' ? 'কাজের অভিজ্ঞতা ও সংখ্যাসূচক ফলাফল' : 'Quantifiable Work Impact & Metrics',
    passed: hasExp && hasActionBullets,
    tip: 'Include measurable results (e.g., "reduced latency by 35%", "managed 10+ engineers").',
    tipBn: 'অভিজ্ঞতার বর্ণনায় সংখ্যা ও শতকরা হার (যেমন: ৩৫% দক্ষতা বৃদ্ধি) ব্যবহার করুন।'
  });

  // 4. Skills count
  const hasEnoughSkills = skills.length >= 6;
  checks.push({
    title: lang === 'bn' ? 'যথেষ্ট প্রাসঙ্গিক স্কিল (কমপক্ষে ৬টি)' : 'Technical Skills Keyword Count',
    passed: hasEnoughSkills,
    tip: 'ATS parsers look for exact keyword matches. Aim for at least 6-12 industry skills.',
    tipBn: 'কমপক্ষে ৬ থেকে ১২টি প্রাসঙ্গিক প্রযুক্তি ও দক্ষতা যুক্ত করুন।'
  });

  // 5. Education
  const hasEdu = education.length > 0;
  checks.push({
    title: lang === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Education Information',
    passed: hasEdu,
    tip: 'Standard degree name, graduation year, and institution name.',
    tipBn: 'ডিগ্রির নাম ও শিক্ষা প্রতিষ্ঠানের নাম পরিষ্কারভাবে থাকতে হবে।'
  });

  // 6. Template ATS compliance
  const isAtsTemplate = templateId === 'ats_clean';
  checks.push({
    title: lang === 'bn' ? 'সিঙ্গেল-কলাম নো-ফটো ফরম্যাট' : 'ATS Single-Column Format',
    passed: isAtsTemplate,
    tip: 'For US/Canada automated applicant tracking portals, single-column without tables or avatars yields the highest parse accuracy.',
    tipBn: 'ইউএস/কানাডা চাকুরির জন্য "US / Canada ATS Clean" টেমপ্লেট নির্বাচন করুন।'
  });

  // 7. Certificates (NEW)
  const hasCert = certificates.length > 0;
  checks.push({
    title: lang === 'bn' ? 'সার্টিফিকেট ও লাইসেন্স' : 'Professional Certifications',
    passed: hasCert,
    tip: 'Having vendor certifications (AWS, Google, PMI, Meta) gives strong algorithmic boost.',
    tipBn: 'আন্তর্জাতিক সার্টিফিকেট থাকলে তা অ্যালগরিদমে আপনার র‍্যাংক বৃদ্ধি করে।'
  });

  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              {t.atsTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1">{t.atsSubtitle}</p>
          </div>

          {/* Big Score Gauge */}
          <div className="flex items-center gap-3 bg-slate-950 px-5 py-3 rounded-2xl border border-slate-800/80 self-start sm:self-auto">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                {t.overallScore}
              </span>
              <span
                className={`text-2xl sm:text-3xl font-black ${
                  score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400'
                }`}
              >
                {score}%
              </span>
            </div>
            <div
              className={`w-3 h-10 rounded-full ${
                score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="mt-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {t.atsSuggestions}
          </h3>

          {checks.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 sm:p-4 rounded-xl border flex items-start gap-3.5 transition-colors ${
                item.passed
                  ? 'bg-slate-950/60 border-emerald-500/30 text-slate-300'
                  : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.passed ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.passed
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/15 text-amber-300'
                    }`}
                  >
                    {item.passed
                      ? lang === 'bn'
                        ? 'সফল'
                        : 'Passed'
                      : lang === 'bn'
                      ? 'উন্নতি প্রয়োজন'
                      : 'Needs Action'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {lang === 'bn' ? item.tipBn : item.tip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
