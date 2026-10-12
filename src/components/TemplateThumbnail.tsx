import React from 'react';
import { TemplateMeta } from '../types/cv';

interface TemplateThumbnailProps {
  template: TemplateMeta;
  isSelected?: boolean;
}

export const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({ template, isSelected }) => {
  // Render miniature realistic CV preview based on template.id
  const renderMiniLayout = () => {
    switch (template.id) {
      case 'europass_official_2026':
        return (
          <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-lg">
            {/* Official EU Blue header with stars & logo hint */}
            <div className="bg-[#003399] text-white p-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded-full border border-yellow-400 flex items-center justify-center text-[7px] text-yellow-300 font-bold">★</div>
                <div className="space-y-0.5">
                  <div className="w-14 h-1.5 bg-white font-bold rounded"></div>
                  <div className="w-16 h-0.5 bg-blue-200 rounded"></div>
                </div>
              </div>
              <div className="w-5 h-5 rounded bg-white/90 border border-white"></div>
            </div>
            {/* European standard left date / right title layout */}
            <div className="flex-1 p-2 grid grid-cols-12 gap-1.5 bg-slate-50/50">
              <div className="col-span-4 p-1 space-y-1.5 border-r border-blue-200">
                <div className="w-10 h-1 bg-[#003399] rounded"></div>
                <div className="w-full h-0.5 bg-slate-400 rounded"></div>
                <div className="w-7 h-0.5 bg-slate-400 rounded"></div>
                {/* Language CEFR matrix hint */}
                <div className="mt-2 space-y-0.5">
                  <div className="w-8 h-0.5 bg-blue-800 rounded"></div>
                  <div className="w-full h-1 bg-blue-200 rounded overflow-hidden">
                    <div className="w-4/5 h-full bg-[#003399]"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-8 p-1 space-y-1.5">
                <div className="w-14 h-1 bg-[#003399] rounded"></div>
                <div className="space-y-0.5 border-l-2 border-[#003399] pl-1">
                  <div className="w-16 h-0.5 bg-slate-900 font-bold"></div>
                  <div className="w-full h-0.5 bg-slate-400"></div>
                  <div className="w-4/5 h-0.5 bg-slate-400"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'europass_word_2026':
        return (
          <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-lg border-t-2 border-[#002f6c]">
            <div className="p-2 border-b border-slate-200 flex justify-between items-start">
              <div>
                <div className="text-[6px] font-sans text-[#002f6c] font-black uppercase tracking-wider">Europass .DOC</div>
                <div className="w-16 h-1.5 bg-slate-900 rounded font-bold mt-0.5"></div>
                <div className="w-20 h-0.5 bg-slate-500 rounded mt-0.5"></div>
              </div>
              <div className="w-5 h-6 bg-slate-100 border border-[#002f6c] rounded-xs shadow-xs"></div>
            </div>
            <div className="flex-1 p-2 grid grid-cols-12 gap-1.5 bg-white">
              <div className="col-span-4 border-r border-slate-200 pr-1 space-y-1">
                <div className="w-9 h-0.5 bg-[#002f6c] font-bold"></div>
                <div className="w-full h-0.5 bg-slate-400"></div>
                <div className="w-7 h-0.5 bg-slate-400"></div>
              </div>
              <div className="col-span-8 space-y-1 pl-0.5">
                <div className="w-14 h-0.5 bg-slate-800 font-bold"></div>
                <div className="w-full h-0.5 bg-slate-400"></div>
                <div className="w-5/6 h-0.5 bg-slate-400"></div>
              </div>
            </div>
          </div>
        );

      case 'europass_novoresume_2026':
        return (
          <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-lg">
            <div className="bg-[#0f4c81] text-white p-2 flex justify-between items-center">
              <div className="space-y-0.5">
                <div className="w-16 h-1.5 bg-white rounded font-bold"></div>
                <div className="w-20 h-0.5 bg-blue-200 rounded"></div>
              </div>
              <div className="w-5 h-5 rounded-full bg-blue-100 border border-white"></div>
            </div>
            <div className="flex-1 p-2 grid grid-cols-2 gap-1.5">
              <div className="space-y-1">
                <div className="w-10 h-1 bg-[#0f4c81] rounded"></div>
                <div className="w-full h-0.5 bg-slate-300 rounded"></div>
                <div className="w-3/4 h-0.5 bg-slate-300 rounded"></div>
              </div>
              <div className="space-y-1">
                <div className="w-10 h-1 bg-[#0f4c81] rounded"></div>
                <div className="w-full h-1 bg-blue-100 rounded overflow-hidden">
                  <div className="w-4/5 h-full bg-[#0f4c81]"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'europass_enhancv_2026':
        return (
          <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-lg">
            <div className="h-2.5 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-400"></div>
            <div className="p-2 flex items-center justify-between border-b border-slate-200">
              <div className="space-y-0.5">
                <div className="w-16 h-1.5 bg-slate-900 rounded font-bold"></div>
                <div className="w-20 h-0.5 bg-blue-600 rounded"></div>
              </div>
              <div className="w-5 h-5 rounded-lg bg-blue-50 border border-blue-400"></div>
            </div>
            <div className="flex-1 p-2 grid grid-cols-2 gap-1.5">
              <div className="space-y-1">
                <div className="w-12 h-1 bg-blue-700 rounded"></div>
                <div className="w-full h-0.5 bg-slate-300 rounded"></div>
                <div className="w-4/5 h-0.5 bg-slate-300 rounded"></div>
              </div>
              <div className="space-y-1">
                <div className="w-12 h-1 bg-blue-700 rounded"></div>
                <div className="flex gap-1 flex-wrap">
                  <div className="w-5 h-1 bg-blue-200 rounded"></div>
                  <div className="w-6 h-1 bg-blue-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'europass_zety_2026':
        return (
          <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-lg">
            <div className="p-2 border-b-2 border-blue-900 flex justify-between items-center bg-slate-50">
              <div className="space-y-0.5">
                <div className="w-18 h-1.5 bg-blue-950 font-bold rounded"></div>
                <div className="w-14 h-0.5 bg-blue-700 rounded"></div>
              </div>
              <div className="w-5 h-5 rounded-full bg-white border border-blue-900"></div>
            </div>
            <div className="flex-1 p-2 space-y-1.5">
              <div className="w-12 h-1 bg-blue-900 rounded"></div>
              <div className="pl-2 border-l-2 border-blue-400 space-y-0.5">
                <div className="w-14 h-0.5 bg-slate-800 font-bold"></div>
                <div className="w-full h-0.5 bg-slate-400"></div>
                <div className="w-3/4 h-0.5 bg-slate-400"></div>
              </div>
            </div>
          </div>
        );

      case 'europass_modern_2026':
        return (
          <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-lg">
            <div className="h-2 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500"></div>
            <div className="p-2 flex items-center justify-between border-b border-slate-200">
              <div className="space-y-0.5">
                <div className="w-16 h-1.5 bg-blue-900 rounded font-bold"></div>
                <div className="w-20 h-0.5 bg-blue-600 rounded"></div>
              </div>
              <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-400"></div>
            </div>
            <div className="flex-1 p-2 grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <div className="w-10 h-1 bg-blue-800"></div>
                <div className="w-full h-0.5 bg-slate-300"></div>
                <div className="w-4/5 h-0.5 bg-slate-300"></div>
              </div>
              <div className="space-y-1">
                <div className="w-10 h-1 bg-blue-800"></div>
                <div className="w-full h-0.5 bg-slate-300"></div>
                <div className="w-3/4 h-0.5 bg-slate-300"></div>
              </div>
            </div>
          </div>
        );

      case 'europass_classic_doc':
        return (
          <div className="w-full h-full bg-white p-2.5 flex flex-col gap-1.5 overflow-hidden rounded-t-lg font-serif">
            <div className="flex justify-between items-start pb-1 border-b border-blue-900">
              <div>
                <div className="text-[6px] font-sans text-blue-900 font-bold">europass</div>
                <div className="w-16 h-1 bg-slate-900 mt-0.5"></div>
              </div>
              <div className="w-5 h-5 border border-slate-300 bg-slate-100"></div>
            </div>
            <div className="grid grid-cols-12 gap-1 mt-1 text-[5px]">
              <div className="col-span-4 text-blue-900 font-bold border-r border-slate-300 pr-1">
                <div className="w-8 h-0.5 bg-blue-800 mb-1"></div>
                <div className="w-6 h-0.5 bg-slate-500"></div>
              </div>
              <div className="col-span-8 pl-1 space-y-1">
                <div className="w-12 h-0.5 bg-slate-800"></div>
                <div className="w-full h-0.5 bg-slate-300"></div>
              </div>
            </div>
          </div>
        );

      case 'europass_academic':
        return (
          <div className="w-full h-full bg-white p-2.5 flex flex-col gap-1 overflow-hidden rounded-t-lg">
            <div className="text-center pb-1 border-b-2 border-slate-900 flex flex-col items-center">
              <div className="w-20 h-1.5 bg-slate-950 font-serif"></div>
              <div className="w-16 h-0.5 bg-blue-700 mt-0.5"></div>
            </div>
            <div className="space-y-1 mt-1">
              <div className="w-14 h-1 bg-blue-900 border-b border-blue-300 pb-0.5"></div>
              <div className="w-full h-0.5 bg-slate-400"></div>
              <div className="w-4/5 h-0.5 bg-slate-400"></div>
            </div>
          </div>
        );

      case 'modern_emerald':
        return (
          <div className="w-full h-full bg-slate-50 flex overflow-hidden rounded-t-lg">
            {/* Left dark emerald sidebar */}
            <div className="w-[34%] bg-slate-900 text-white p-1.5 flex flex-col gap-1 border-r border-emerald-600/30">
              <div className="w-5 h-5 rounded-full bg-emerald-500 mx-auto mt-0.5 border border-white/60"></div>
              <div className="w-10 h-1 bg-white/80 rounded mx-auto mt-0.5"></div>
              <div className="w-7 h-0.5 bg-emerald-400 rounded mx-auto"></div>
              <div className="mt-2 space-y-1">
                <div className="w-9 h-0.5 bg-emerald-400/80 rounded"></div>
                <div className="w-full h-0.5 bg-slate-500 rounded"></div>
                <div className="w-8 h-0.5 bg-slate-500 rounded"></div>
              </div>
              <div className="mt-auto space-y-1 pb-1">
                <div className="w-8 h-0.5 bg-emerald-400 rounded"></div>
                <div className="flex gap-0.5 flex-wrap">
                  <div className="w-3 h-1 bg-emerald-700 rounded-sm"></div>
                  <div className="w-4 h-1 bg-emerald-700 rounded-sm"></div>
                  <div className="w-3 h-1 bg-emerald-700 rounded-sm"></div>
                </div>
              </div>
            </div>
            {/* Right main body */}
            <div className="flex-1 p-2 flex flex-col gap-1.5 bg-white">
              <div className="w-16 h-1.5 bg-slate-900 rounded"></div>
              <div className="w-20 h-0.5 bg-emerald-600 rounded"></div>
              <div className="w-full h-0.5 bg-slate-200 rounded mt-1"></div>
              {/* Experience blocks */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-1 bg-slate-800 rounded"></div>
                  <div className="w-5 h-0.5 bg-slate-400 rounded"></div>
                </div>
                <div className="w-full h-0.5 bg-slate-300 rounded"></div>
                <div className="w-4/5 h-0.5 bg-slate-300 rounded"></div>
              </div>
              <div className="space-y-1 mt-1">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-1 bg-slate-800 rounded"></div>
                  <div className="w-5 h-0.5 bg-slate-400 rounded"></div>
                </div>
                <div className="w-full h-0.5 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        );

      case 'ats_clean':
        return (
          <div className="w-full h-full bg-white p-2.5 flex flex-col gap-1.5 overflow-hidden rounded-t-lg">
            {/* ATS Centered clean header */}
            <div className="text-center flex flex-col items-center gap-0.5 pb-1 border-b border-slate-900">
              <div className="w-20 h-2 bg-slate-900 rounded-none"></div>
              <div className="w-24 h-0.5 bg-slate-600 rounded-none"></div>
              <div className="w-28 h-0.5 bg-slate-400 rounded-none"></div>
            </div>
            {/* Pure single column standard sections */}
            <div className="mt-0.5 space-y-1">
              <div className="w-14 h-1 bg-slate-900 border-b border-slate-400 pb-0.5"></div>
              <div className="flex justify-between">
                <div className="w-12 h-0.5 bg-slate-800 font-bold"></div>
                <div className="w-6 h-0.5 bg-slate-500"></div>
              </div>
              <div className="w-full h-0.5 bg-slate-400"></div>
              <div className="w-5/6 h-0.5 bg-slate-400"></div>
            </div>
            <div className="mt-0.5 space-y-1">
              <div className="w-12 h-1 bg-slate-900 border-b border-slate-400 pb-0.5"></div>
              <div className="w-full h-0.5 bg-slate-400"></div>
              <div className="w-4/5 h-0.5 bg-slate-400"></div>
            </div>
          </div>
        );

      case 'europass_navy':
        return (
          <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-lg">
            {/* Top Navy Banner */}
            <div className="bg-blue-700 text-white p-2 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="w-16 h-1.5 bg-white rounded"></div>
                <div className="w-20 h-0.5 bg-blue-200 rounded"></div>
              </div>
              <div className="w-5 h-5 rounded bg-white/90 border border-white"></div>
            </div>
            {/* European two-column timeline */}
            <div className="flex-1 p-2 grid grid-cols-12 gap-1.5">
              <div className="col-span-4 bg-slate-50 p-1 space-y-1 border-r border-slate-200">
                <div className="w-8 h-1 bg-blue-700 rounded"></div>
                <div className="w-full h-0.5 bg-slate-400 rounded"></div>
                <div className="w-7 h-0.5 bg-slate-400 rounded"></div>
                {/* Language bars */}
                <div className="mt-2 space-y-0.5">
                  <div className="w-6 h-0.5 bg-slate-600 rounded"></div>
                  <div className="w-full h-1 bg-blue-200 rounded overflow-hidden">
                    <div className="w-3/4 h-full bg-blue-600"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-8 p-0.5 space-y-1.5">
                <div className="w-12 h-1 bg-blue-700 rounded"></div>
                <div className="space-y-0.5 border-l-2 border-blue-600 pl-1">
                  <div className="w-14 h-0.5 bg-slate-800"></div>
                  <div className="w-full h-0.5 bg-slate-300"></div>
                  <div className="w-4/5 h-0.5 bg-slate-300"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'creative_amber':
        return (
          <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-lg">
            {/* Vibrant Amber top card with avatar overlap */}
            <div className="h-9 bg-gradient-to-r from-amber-500 to-amber-600 p-1.5 flex items-center justify-between relative">
              <div className="space-y-0.5">
                <div className="w-14 h-1.5 bg-slate-950 font-bold rounded"></div>
                <div className="w-16 h-0.5 bg-amber-100 rounded"></div>
              </div>
              <div className="w-6 h-6 rounded-xl bg-white shadow-md border-2 border-amber-300 absolute -bottom-2 right-2"></div>
            </div>
            {/* Creative content */}
            <div className="flex-1 p-2 pt-3 flex flex-col gap-1.5">
              <div className="flex gap-1">
                <div className="w-4 h-1 bg-amber-500 rounded-sm"></div>
                <div className="w-4 h-1 bg-slate-800 rounded-sm"></div>
                <div className="w-4 h-1 bg-amber-500 rounded-sm"></div>
              </div>
              <div className="w-full h-0.5 bg-slate-200 rounded"></div>
              <div className="space-y-1">
                <div className="w-12 h-1 bg-amber-600 rounded"></div>
                <div className="w-full h-0.5 bg-slate-300 rounded"></div>
                <div className="w-3/4 h-0.5 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        );

      case 'tech_matrix':
        return (
          <div className="w-full h-full bg-slate-900 text-slate-100 p-2 flex flex-col gap-1.5 overflow-hidden rounded-t-lg font-mono">
            {/* Modern dark IT header */}
            <div className="flex justify-between items-center pb-1 border-b border-sky-500/40">
              <div>
                <div className="w-16 h-1.5 bg-sky-400 rounded"></div>
                <div className="w-12 h-0.5 bg-emerald-400 mt-0.5 rounded"></div>
              </div>
              <div className="text-[7px] text-sky-400">&lt;/&gt;</div>
            </div>
            {/* Tech chips & terminal feel */}
            <div className="flex gap-1">
              <div className="w-5 h-1 bg-sky-500/30 text-[6px] rounded border border-sky-400/40"></div>
              <div className="w-6 h-1 bg-emerald-500/30 text-[6px] rounded border border-emerald-400/40"></div>
              <div className="w-5 h-1 bg-sky-500/30 text-[6px] rounded border border-sky-400/40"></div>
            </div>
            <div className="space-y-1 bg-slate-800/80 p-1 rounded border border-slate-700/60">
              <div className="w-14 h-0.5 bg-sky-300"></div>
              <div className="w-full h-0.5 bg-slate-500"></div>
              <div className="w-4/5 h-0.5 bg-slate-500"></div>
            </div>
            <div className="w-full h-0.5 bg-emerald-400/50 mt-auto"></div>
          </div>
        );

      case 'executive_burgundy':
        return (
          <div className="w-full h-full bg-[#fdfbf7] p-2 flex flex-col gap-1 overflow-hidden rounded-t-lg border border-amber-900/10">
            {/* Executive luxury burgundy header */}
            <div className="text-center pb-1 border-b-2 border-rose-900 flex flex-col items-center gap-0.5">
              <div className="w-20 h-1.5 bg-rose-950 font-serif rounded"></div>
              <div className="w-16 h-0.5 bg-rose-800 rounded"></div>
              <div className="w-24 h-0.5 bg-stone-500 rounded"></div>
            </div>
            <div className="space-y-1 mt-1">
              <div className="w-14 h-1 bg-rose-900 border-b border-rose-300 pb-0.5"></div>
              <div className="w-full h-0.5 bg-stone-600"></div>
              <div className="w-4/5 h-0.5 bg-stone-600"></div>
            </div>
            <div className="space-y-1 mt-1">
              <div className="w-12 h-1 bg-rose-900 border-b border-rose-300 pb-0.5"></div>
              <div className="w-full h-0.5 bg-stone-600"></div>
            </div>
          </div>
        );

      case 'bangladesh_standard':
        return (
          <div className="w-full h-full bg-white p-2 flex flex-col gap-1 overflow-hidden rounded-t-lg">
            {/* Header with photo on top right */}
            <div className="flex justify-between items-start pb-1 border-b border-emerald-700">
              <div className="space-y-0.5">
                <div className="w-16 h-1.5 bg-emerald-900 font-bold"></div>
                <div className="w-14 h-0.5 bg-slate-600"></div>
                <div className="w-18 h-0.5 bg-slate-500"></div>
              </div>
              <div className="w-5 h-6 bg-slate-200 border border-emerald-700/60 rounded-sm"></div>
            </div>
            {/* Structured tabular view */}
            <div className="space-y-1 mt-0.5">
              <div className="w-14 h-1 bg-emerald-800 text-[6px] pl-0.5 text-white"></div>
              {/* Table preview */}
              <div className="border border-slate-300 grid grid-cols-3 divide-x divide-slate-300 p-0.5 text-[5px]">
                <div className="h-1 bg-slate-200"></div>
                <div className="h-1 bg-slate-200"></div>
                <div className="h-1 bg-slate-200"></div>
              </div>
              <div className="w-full h-0.5 bg-slate-400"></div>
            </div>
            <div className="mt-auto flex justify-end pr-1">
              <div className="w-8 h-0.5 bg-slate-700 border-t border-dashed border-slate-400"></div>
            </div>
          </div>
        );

      case 'minimalist_swiss':
        return (
          <div className="w-full h-full bg-white p-2 flex flex-col gap-1.5 overflow-hidden rounded-t-lg font-sans">
            <div className="w-20 h-2 bg-black font-black"></div>
            <div className="w-14 h-0.5 bg-neutral-600"></div>
            <div className="w-full h-[1px] bg-black my-0.5"></div>
            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-4 space-y-1">
                <div className="w-8 h-1 bg-black"></div>
                <div className="w-full h-0.5 bg-neutral-400"></div>
              </div>
              <div className="col-span-8 space-y-1">
                <div className="w-12 h-1 bg-black"></div>
                <div className="w-full h-0.5 bg-neutral-500"></div>
                <div className="w-3/4 h-0.5 bg-neutral-500"></div>
              </div>
            </div>
          </div>
        );

      case 'nordic_slate':
      default:
        return (
          <div className="w-full h-full bg-slate-100 flex overflow-hidden rounded-t-lg">
            <div className="w-[32%] bg-slate-700 p-1 flex flex-col gap-1 text-white">
              <div className="w-5 h-5 rounded-full bg-slate-500 mx-auto mt-0.5"></div>
              <div className="w-8 h-1 bg-slate-200 mx-auto"></div>
              <div className="w-full h-0.5 bg-slate-400 mt-2"></div>
              <div className="w-6 h-0.5 bg-slate-400"></div>
            </div>
            <div className="flex-1 p-2 bg-white flex flex-col gap-1">
              <div className="w-16 h-1.5 bg-slate-800"></div>
              <div className="w-10 h-0.5 bg-sky-500"></div>
              <div className="w-full h-0.5 bg-slate-300 mt-1"></div>
              <div className="w-4/5 h-0.5 bg-slate-300"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-t-xl overflow-hidden shadow-inner transition-all duration-300 ${
        isSelected ? 'ring-2 ring-amber-400' : ''
      }`}
    >
      {renderMiniLayout()}
    </div>
  );
};
