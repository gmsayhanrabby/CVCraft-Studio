import React, { useRef, useState } from 'react';
import { Camera, Upload, Trash2, Link as LinkIcon, Eye, EyeOff, Sparkles, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { PersonalInfo } from '../types/cv';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';

interface PhotoUploaderProps {
  personal: PersonalInfo;
  onChange: (updated: Partial<PersonalInfo>) => void;
  lang: AppLanguage;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80'
];

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ personal, onChange, lang }) => {
  const t = TRANSLATIONS[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Compress and optimize image to ensure instant rendering and localStorage safety
  const processImageFile = (file: File) => {
    if (!file) return;

    // Check if image format
    const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif|avif|heic|bmp|svg)$/i.test(file.name);
    if (!isImage) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে একটি ছবি ফাইল (.jpg, .png, .webp) নির্বাচন করুন' : 'Please select an image file (.jpg, .png, .webp)');
      return;
    }

    setIsProcessing(true);
    setUploadSuccess(false);

    try {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const MAX_DIM = 420;
          let width = img.naturalWidth || img.width || 400;
          let height = img.naturalHeight || img.height || 400;

          if (width > height) {
            if (width > MAX_DIM) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // White background for transparent PNGs
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.90);
            
            // Immediately apply photo and ensure showPhoto is true
            onChange({ 
              photo: compressedDataUrl, 
              showPhoto: true 
            });
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 3000);
          }
        } catch (err) {
          console.warn('Canvas resize issue, using direct file reader:', err);
          fallbackFileReader(file);
        } finally {
          URL.revokeObjectURL(objectUrl);
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        fallbackFileReader(file);
      };

      img.src = objectUrl;
    } catch (e) {
      fallbackFileReader(file);
    }
  };

  const fallbackFileReader = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange({ photo: result, showPhoto: true });
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
      setIsProcessing(false);
    };
    reader.onerror = () => {
      alert(lang === 'bn' ? 'ছবি পড়তে ব্যর্থ হয়েছে' : 'Failed to read image file');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
    // Reset input so same file can be re-selected if removed
    e.target.value = '';
  };

  // Drag and drop support
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlDraft.trim()) {
      onChange({ photo: urlDraft.trim(), showPhoto: true });
      setUrlDraft('');
      setShowUrlInput(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  const isPhotoActive = Boolean(personal.photo && personal.showPhoto !== false);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3.5">
        <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Camera className="w-4 h-4 text-amber-400" />
          <span>{t.photoUpload}</span>
          {uploadSuccess && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 animate-fade-in">
              <CheckCircle2 className="w-3 h-3" />
              {lang === 'bn' ? 'ছবি যুক্ত হয়েছে' : 'Photo added!'}
            </span>
          )}
        </label>
        
        {/* Toggle Show / Hide in CV */}
        <button
          type="button"
          onClick={() => onChange({ showPhoto: !isPhotoActive })}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-bold transition-all ${
            isPhotoActive
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/25' 
              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
          }`}
          title={t.showPhotoInCv}
        >
          {isPhotoActive ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>
            {isPhotoActive 
              ? (lang === 'bn' ? 'সিভিতে দৃশ্যমান' : 'Visible in CV') 
              : (lang === 'bn' ? 'সিভিতে লুকানো' : 'Hidden in CV')}
          </span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Photo Box with Drag & Drop & Direct File Select */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !personal.photo && fileInputRef.current?.click()}
          className={`relative group shrink-0 transition-all ${!personal.photo ? 'cursor-pointer' : ''}`}
        >
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 bg-slate-950 border-2 transition-all overflow-hidden shadow-inner flex items-center justify-center ${
              isDragging 
                ? 'border-amber-400 scale-105 bg-amber-950/20' 
                : personal.photo 
                ? 'border-amber-400/80' 
                : 'border-dashed border-slate-700 hover:border-amber-400/70'
            } ${
              personal.photoShape === 'circle' 
                ? 'rounded-full' 
                : personal.photoShape === 'rounded' 
                ? 'rounded-2xl' 
                : 'rounded-none'
            }`}
          >
            {personal.photo ? (
              <img
                src={personal.photo}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 p-2 text-center select-none">
                <Camera className="w-7 h-7 mb-1 text-slate-400 group-hover:text-amber-400 transition-colors" />
                <span className="text-[10px] leading-tight text-slate-400 group-hover:text-amber-300">
                  {lang === 'bn' ? 'ছবি যুক্ত করুন' : 'Add Photo'}
                </span>
                <span className="text-[8px] text-slate-600 mt-0.5">
                  {lang === 'bn' ? 'ক্লিক বা ড্রপ' : 'Click / Drop'}
                </span>
              </div>
            )}
          </div>

          {/* Delete Photo Button */}
          {personal.photo && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange({ photo: '', showPhoto: false });
              }}
              className="absolute -top-1.5 -right-1.5 bg-rose-600 hover:bg-rose-500 text-white p-1 rounded-full shadow-lg transition-transform hover:scale-110"
              title={t.photoRemove}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Buttons & Shape Options */}
        <div className="flex-1 w-full space-y-3">
          {/* Main Upload Triggers */}
          <div className="flex flex-wrap gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.avif,.heic"
              className="hidden"
            />
            
            {/* 1. Upload from Device / Phone Gallery button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="flex-1 min-w-[170px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Upload className="w-4 h-4 stroke-[2.5]" />
              <span>
                {isProcessing 
                  ? (lang === 'bn' ? 'ছবি প্রসেস হচ্ছে...' : 'Processing Photo...') 
                  : t.photoFromDevice}
              </span>
            </button>

            {/* 2. Direct Image URL Trigger */}
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Image URL link"
            >
              <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>URL</span>
            </button>
          </div>

          {/* Optional Direct URL Input Field */}
          {showUrlInput && (
            <div className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-700">
              <input
                type="text"
                placeholder="https://example.com/profile-photo.jpg"
                value={urlDraft}
                onChange={(e) => setUrlDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyUrl()}
                className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none px-2 py-1"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3.5 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors"
              >
                {lang === 'bn' ? 'যুক্ত করুন' : 'Apply'}
              </button>
            </div>
          )}

          {/* Shape Selector & Sample Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
            {/* Shape Options */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-slate-400 mr-0.5">
                {lang === 'bn' ? 'আকৃতি:' : 'Shape:'}
              </span>
              {(['circle', 'rounded', 'square'] as const).map((shape) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => onChange({ photoShape: shape })}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                    personal.photoShape === shape
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {shape === 'circle' ? t.photoCircle : shape === 'rounded' ? t.photoRounded : t.photoSquare}
                </button>
              ))}
            </div>

            {/* Presets Avatars */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400 hidden sm:inline flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {lang === 'bn' ? 'নমুনা:' : 'Samples:'}
              </span>
              <div className="flex items-center -space-x-1.5">
                {PRESET_AVATARS.map((presetUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChange({ photo: presetUrl, showPhoto: true });
                      setUploadSuccess(true);
                      setTimeout(() => setUploadSuccess(false), 3000);
                    }}
                    className="w-6 h-6 rounded-full border border-slate-700 overflow-hidden hover:scale-125 transition-transform z-0 hover:z-10 focus:outline-none"
                    title={`Sample Headshot ${idx + 1}`}
                  >
                    <img src={presetUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
