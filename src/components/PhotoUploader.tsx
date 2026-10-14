import React, { useRef, useState, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Trash2, 
  Link as LinkIcon, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  Image as ImageIcon,
  X,
  Plus,
  Check,
  User,
  Users,
  BookmarkPlus,
  FolderHeart
} from 'lucide-react';
import { PersonalInfo } from '../types/cv';
import { TRANSLATIONS, AppLanguage } from '../i18n/translations';

interface PhotoUploaderProps {
  personal: PersonalInfo;
  onChange: (updated: Partial<PersonalInfo>) => void;
  lang: AppLanguage;
}

export interface SamplePhotoPreset {
  id: string;
  url: string;
  titleEn: string;
  titleBn: string;
  category: 'men' | 'women' | 'exec';
  roleEn: string;
  roleBn: string;
}

export const SAMPLE_PORTRAITS: SamplePhotoPreset[] = [
  // Men (Formal, Suits, Corporate)
  {
    id: 'm1',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Corporate Professional (Blue Shirt)',
    titleBn: 'কর্পোরেট ফরমাল (ব্লু শার্ট)',
    category: 'men',
    roleEn: 'Software Engineer / Architect',
    roleBn: 'সফটওয়্যার ইঞ্জিনিয়ার / আর্কিটেক্ট'
  },
  {
    id: 'm2',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Executive in Dark Suit & Tie',
    titleBn: 'ডার্ক স্যুট ও টাই পরিহিত এক্সিকিউটিভ',
    category: 'men',
    roleEn: 'General Manager / Lead',
    roleBn: 'জেনারেল ম্যানেজার / টিম লিডার'
  },
  {
    id: 'm3',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Senior Technical Lead',
    titleBn: 'সিনিয়র টেকনিক্যাল লিড',
    category: 'men',
    roleEn: 'Tech Director / Consultant',
    roleBn: 'টেক ডিরেক্টর / কনসালটেন্ট'
  },
  {
    id: 'm4',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Smart Young Professional',
    titleBn: 'স্মার্ট তরুণ পেশাজীবী',
    category: 'men',
    roleEn: 'Full-Stack Developer / Analyst',
    roleBn: 'ফুল-স্ট্যাক ডেভেলপার / অ্যানালিস্ট'
  },
  {
    id: 'm5',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Senior Executive Headshot',
    titleBn: 'সিনিয়র এক্সিকিউটিভ হেডশট',
    category: 'exec',
    roleEn: 'VP of Technology / Executive',
    roleBn: 'ভিপি অফ টেকনোলজি / এক্সিকিউটিভ'
  },
  {
    id: 'm6',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Corporate Business Professional',
    titleBn: 'কর্পোরেট বিজনেস প্রফেশনাল',
    category: 'men',
    roleEn: 'Operations / Project Manager',
    roleBn: 'অপারেশনস / প্রজেক্ট ম্যানেজার'
  },
  {
    id: 'm7',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Modern Creative Specialist',
    titleBn: 'মডার্ন ক্রিয়েটিভ স্পেশালিস্ট',
    category: 'men',
    roleEn: 'UI/UX Designer / Product Lead',
    roleBn: 'ইউআই/ইউএক্স ডিজাইনার / প্রোডাক্ট লিড'
  },
  {
    id: 'm8',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Doctor / Medical Professional',
    titleBn: 'চিকিৎসক / মেডিকেল প্রফেশনাল',
    category: 'men',
    roleEn: 'Doctor / Clinical Specialist',
    roleBn: 'ডাক্তার / মেডিকেল স্পেশালিস্ট'
  },
  {
    id: 'm9',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Modern Urban Professional',
    titleBn: 'মডার্ন প্রফেশনাল হেডশট',
    category: 'men',
    roleEn: 'Business Analyst / Marketer',
    roleBn: 'বিজনেস অ্যানালিস্ট / মার্কেটার'
  },

  // Women (Corporate, Formal, Executive)
  {
    id: 'w1',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Corporate Executive in Blazer',
    titleBn: 'ব্লেজার পরিহিত কর্পোরেট এক্সিকিউটিভ',
    category: 'women',
    roleEn: 'Managing Director / Corporate Lead',
    roleBn: 'ম্যানেজিং ডিরেক্টর / কর্পোরেট লিড'
  },
  {
    id: 'w2',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Professional Manager (Formal)',
    titleBn: 'প্রফেশনাল ম্যানেজার (ফরমাল)',
    category: 'women',
    roleEn: 'HR Manager / Consultant',
    roleBn: 'এইচ আর ম্যানেজার / কনসালটেন্ট'
  },
  {
    id: 'w3',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    titleEn: 'South Asian Professional Leader',
    titleBn: 'সাউথ এশিয়ান প্রফেশনাল লিডার',
    category: 'women',
    roleEn: 'Finance Lead / Senior Specialist',
    roleBn: 'ফিন্যান্স লিড / সিনিয়র স্পেশালিস্ট'
  },
  {
    id: 'w4',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Senior Executive Leader',
    titleBn: 'সিনিয়র এক্সিকিউটিভ লিডার',
    category: 'exec',
    roleEn: 'Chief Operations Officer',
    roleBn: 'চিফ অপারেশনস অফিসার (COO)'
  },
  {
    id: 'w5',
    url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Corporate Specialist in Suit',
    titleBn: 'স্যুট পরিহিত কর্পোরেট স্পেশালিস্ট',
    category: 'women',
    roleEn: 'Marketing Director / Lead',
    roleBn: 'মার্কেটিং ডিরেক্টর / লিড'
  },
  {
    id: 'w6',
    url: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Consulting Professional in Glasses',
    titleBn: 'চশমা পরিহিত কনসাল্টিং প্রফেশনাল',
    category: 'women',
    roleEn: 'Strategic Consultant / Advisor',
    roleBn: 'স্ট্র্যাটেজিক কনসালটেন্ট / উপদেষ্টা'
  },
  {
    id: 'w7',
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Technology & Engineering Lead',
    titleBn: 'টেকনোলজি ও ইঞ্জিনিয়ারিং লিড',
    category: 'women',
    roleEn: 'Software Architect / Data Scientist',
    roleBn: 'সফটওয়্যার আর্কিটেক্ট / ডেটা সায়েন্টিস্ট'
  },
  {
    id: 'w8',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    titleEn: 'Formal Corporate Portrait',
    titleBn: 'ফরমাল কর্পোরেট পোর্ট্রেট',
    category: 'women',
    roleEn: 'Project Lead / Coordinator',
    roleBn: 'প্রজেক্ট লিড / কো-অর্ডিনেটর'
  }
];

const STORAGE_KEY_CUSTOM_SAMPLES = 'cv_user_custom_photo_samples';

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ personal, onChange, lang }) => {
  const t = TRANSLATIONS[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Gallery modal state
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'men' | 'women' | 'exec' | 'custom'>('all');
  const [customPhotos, setCustomPhotos] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_SAMPLES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [savedToSampleToast, setSavedToSampleToast] = useState(false);

  // Sync custom photos with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_SAMPLES, JSON.stringify(customPhotos));
    } catch (e) {
      console.warn('Could not save custom sample photos to storage', e);
    }
  }, [customPhotos]);

  // Compress and optimize image to ensure instant rendering and localStorage safety
  const processImageFile = (file: File, addToCustom: boolean = false) => {
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
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
            
            // Apply photo to CV
            onChange({ 
              photo: compressedDataUrl, 
              showPhoto: true 
            });

            // Optionally add to user's custom photo sample bank
            if (addToCustom || !customPhotos.includes(compressedDataUrl)) {
              setCustomPhotos(prev => [compressedDataUrl, ...prev.filter(p => p !== compressedDataUrl).slice(0, 15)]);
            }

            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 3000);
          }
        } catch (err) {
          console.warn('Canvas resize issue, using direct file reader:', err);
          fallbackFileReader(file, addToCustom);
        } finally {
          URL.revokeObjectURL(objectUrl);
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        fallbackFileReader(file, addToCustom);
      };

      img.src = objectUrl;
    } catch (e) {
      fallbackFileReader(file, addToCustom);
    }
  };

  const fallbackFileReader = (file: File, addToCustom: boolean = false) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange({ photo: result, showPhoto: true });
        if (addToCustom || !customPhotos.includes(result)) {
          setCustomPhotos(prev => [result, ...prev.filter(p => p !== result).slice(0, 15)]);
        }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, addToCustom: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file, addToCustom);
    }
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
      processImageFile(file, true);
    }
  };

  const handleApplyUrl = () => {
    if (urlDraft.trim()) {
      const url = urlDraft.trim();
      onChange({ photo: url, showPhoto: true });
      if (!customPhotos.includes(url)) {
        setCustomPhotos(prev => [url, ...prev.slice(0, 15)]);
      }
      setUrlDraft('');
      setShowUrlInput(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  const saveCurrentToCustomSamples = () => {
    if (personal.photo && !customPhotos.includes(personal.photo)) {
      setCustomPhotos(prev => [personal.photo!, ...prev.slice(0, 15)]);
      setSavedToSampleToast(true);
      setTimeout(() => setSavedToSampleToast(false), 2500);
    }
  };

  const removeCustomPhoto = (photoUrl: string) => {
    setCustomPhotos(prev => prev.filter(p => p !== photoUrl));
  };

  const isPhotoActive = Boolean(personal.photo && personal.showPhoto !== false);

  // Filtered list for the modal
  const filteredPresets = SAMPLE_PORTRAITS.filter(p => {
    if (galleryFilter === 'all') return true;
    return p.category === galleryFilter;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3.5">
        <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Camera className="w-4 h-4 text-amber-400" />
          <span>{t.photoUpload}</span>
          {uploadSuccess && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 animate-fade-in">
              <CheckCircle2 className="w-3 h-3" />
              {lang === 'bn' ? 'ছবি যুক্ত হয়েছে!' : 'Photo Applied!'}
            </span>
          )}
          {savedToSampleToast && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40 animate-fade-in">
              <Check className="w-3 h-3" />
              {t.photoSavedToSamples}
            </span>
          )}
        </label>
        
        {/* Toggle Show / Hide in CV */}
        <button
          type="button"
          onClick={() => onChange({ showPhoto: !isPhotoActive })}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer ${
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
                <span className="text-[10px] leading-tight text-slate-400 group-hover:text-amber-300 font-semibold">
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
              className="absolute -top-1.5 -right-1.5 bg-rose-600 hover:bg-rose-500 text-white p-1 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer"
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
              onChange={(e) => handleFileChange(e, true)}
              accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.avif,.heic"
              className="hidden"
            />
            
            {/* 1. Upload from Device / Phone Gallery button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Upload className="w-4 h-4 stroke-[2.5]" />
              <span>
                {isProcessing 
                  ? (lang === 'bn' ? 'ছবি প্রসেস হচ্ছে...' : 'Processing...') 
                  : t.photoFromDevice}
              </span>
            </button>

            {/* 2. Browse Sample Gallery Modal Button */}
            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className="px-3 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold text-xs rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title={t.photoBrowseSamples}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'নমুনা ছবি গ্যালারি' : 'Photo Samples'}</span>
            </button>

            {/* 3. Direct Image URL Trigger */}
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Image URL link"
            >
              <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>URL</span>
            </button>

            {/* Save current photo to user's samples */}
            {personal.photo && !customPhotos.includes(personal.photo) && (
              <button
                type="button"
                onClick={saveCurrentToCustomSamples}
                className="px-2.5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-amber-300 font-semibold text-xs rounded-xl border border-amber-500/30 inline-flex items-center gap-1 transition-colors cursor-pointer"
                title={t.photoSaveCurrentAsSample}
              >
                <BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">{lang === 'bn' ? 'নমুনাতে সেভ' : 'Save'}</span>
              </button>
            )}
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
                className="px-3.5 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
              >
                {lang === 'bn' ? 'যুক্ত করুন' : 'Apply'}
              </button>
            </div>
          )}

          {/* Shape Selector & Sample Quick Presets */}
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
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                    personal.photoShape === shape
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {shape === 'circle' ? t.photoCircle : shape === 'rounded' ? t.photoRounded : t.photoSquare}
                </button>
              ))}
            </div>

            {/* Quick Sample Headshots Bar */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">{lang === 'bn' ? 'নমুনা:' : 'Samples:'}</span>
              </span>
              <div className="flex items-center -space-x-1.5">
                {SAMPLE_PORTRAITS.slice(0, 6).map((preset) => {
                  const isSelected = personal.photo === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        onChange({ photo: preset.url, showPhoto: true });
                        setUploadSuccess(true);
                        setTimeout(() => setUploadSuccess(false), 2500);
                      }}
                      className={`w-7 h-7 rounded-full border-2 overflow-hidden hover:scale-125 transition-transform z-0 hover:z-20 cursor-pointer focus:outline-none ${
                        isSelected ? 'border-amber-400 ring-2 ring-amber-400/50 z-10' : 'border-slate-700'
                      }`}
                      title={lang === 'bn' ? `${preset.titleBn} (${preset.roleBn})` : `${preset.titleEn} (${preset.roleEn})`}
                    >
                      <img src={preset.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>

              {/* Button to open all 18+ samples */}
              <button
                type="button"
                onClick={() => setIsGalleryOpen(true)}
                className="text-[10px] font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
              >
                +{SAMPLE_PORTRAITS.length - 6} {lang === 'bn' ? 'আরও' : 'More'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULL PHOTO SAMPLES MODAL */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {t.photoSamplesModalTitle}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {t.photoSamplesModalSubtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Tabs & Add Custom Photo */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:px-5 bg-slate-950/60 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
                <button
                  type="button"
                  onClick={() => setGalleryFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    galleryFilter === 'all'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {t.photoCategoryAll} ({SAMPLE_PORTRAITS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('men')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    galleryFilter === 'men'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {t.photoCategoryMen}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('women')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    galleryFilter === 'women'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {t.photoCategoryWomen}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('exec')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    galleryFilter === 'exec'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {t.photoCategoryExec}
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryFilter('custom')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    galleryFilter === 'custom'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <FolderHeart className="w-3.5 h-3.5 text-rose-400" />
                    {t.photoCategoryCustom} ({customPhotos.length})
                  </span>
                </button>
              </div>

              {/* Upload to Custom Samples inside Modal */}
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={galleryFileInputRef}
                  onChange={(e) => handleFileChange(e, true)}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => galleryFileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'আমার ছবি যুক্ত করুন' : 'Add My Photo'}</span>
                </button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] space-y-6">
              {galleryFilter === 'custom' ? (
                /* Custom Uploaded Samples */
                <div>
                  {customPhotos.length === 0 ? (
                    <div className="text-center py-12 px-4 border-2 border-dashed border-slate-800 rounded-2xl">
                      <FolderHeart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-slate-300 mb-1">
                        {lang === 'bn' ? 'এখনো কোনো ব্যক্তিগত নমুনা ছবি সেভ করা হয়নি' : 'No custom photos saved yet'}
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                        {t.photoCustomEmptyTip}
                      </p>
                      <button
                        type="button"
                        onClick={() => galleryFileInputRef.current?.click()}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer transition-all"
                      >
                        {lang === 'bn' ? 'ছবি আপলোড করুন' : 'Upload Photo'}
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {customPhotos.map((photoUrl, idx) => {
                        const isCurrent = personal.photo === photoUrl;
                        return (
                          <div
                            key={idx}
                            className={`group relative bg-slate-950 border-2 rounded-2xl p-2.5 transition-all flex flex-col items-center ${
                              isCurrent ? 'border-amber-400 bg-amber-950/20 ring-2 ring-amber-400/30' : 'border-slate-800 hover:border-slate-600'
                            }`}
                          >
                            <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-700 shadow-md mb-2 relative">
                              <img src={photoUrl} alt="Custom Sample" className="w-full h-full object-cover" />
                              {isCurrent && (
                                <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-[1px] flex items-center justify-center">
                                  <div className="bg-amber-500 text-slate-950 p-1 rounded-full shadow">
                                    <Check className="w-4 h-4 stroke-[3]" />
                                  </div>
                                </div>
                              )}
                            </div>
                            <span className="text-[11px] font-bold text-slate-300 text-center truncate max-w-full mb-2">
                              {lang === 'bn' ? `আমার ছবি ${idx + 1}` : `My Photo ${idx + 1}`}
                            </span>
                            <div className="w-full flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  onChange({ photo: photoUrl, showPhoto: true });
                                  setIsGalleryOpen(false);
                                }}
                                className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                                  isCurrent ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                                }`}
                              >
                                {isCurrent ? t.photoActiveInCv : t.photoSelectThis}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeCustomPhoto(photoUrl)}
                                className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 cursor-pointer"
                                title="Delete sample"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                /* Preset Headshots Grid */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredPresets.map((preset) => {
                    const isCurrent = personal.photo === preset.url;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => {
                          onChange({ photo: preset.url, showPhoto: true });
                          setIsGalleryOpen(false);
                        }}
                        className={`group relative bg-slate-950 border-2 rounded-2xl p-3 transition-all cursor-pointer flex flex-col items-center hover:scale-[1.02] ${
                          isCurrent 
                            ? 'border-amber-400 bg-amber-950/20 ring-2 ring-amber-400/40 shadow-lg' 
                            : 'border-slate-800 hover:border-amber-400/60 hover:bg-slate-900/60'
                        }`}
                      >
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-amber-400/80 transition-colors shadow-md mb-2.5 relative">
                          <img 
                            src={preset.url} 
                            alt={preset.titleEn} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                          {isCurrent && (
                            <div className="absolute inset-0 bg-amber-500/25 flex items-center justify-center">
                              <div className="bg-amber-500 text-slate-950 p-1 rounded-full shadow-lg">
                                <Check className="w-4 h-4 stroke-[3]" />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-center w-full">
                          <h5 className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors truncate">
                            {lang === 'bn' ? preset.titleBn : preset.titleEn}
                          </h5>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {lang === 'bn' ? preset.roleBn : preset.roleEn}
                          </p>
                        </div>

                        <div className="mt-2.5 w-full">
                          <button
                            type="button"
                            className={`w-full py-1 px-2 rounded-lg text-[11px] font-bold transition-colors ${
                              isCurrent 
                                ? 'bg-amber-500 text-slate-950 font-black' 
                                : 'bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-300'
                            }`}
                          >
                            {isCurrent ? t.photoActiveInCv : t.photoSelectThis}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'bn' 
                  ? 'যেকোনো ছবিতে ক্লিক করলেই তা সরাসরি আপনার সিভিতে যুক্ত হবে।' 
                  : 'Click any portrait to immediately apply it to your CV.'}
              </span>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold cursor-pointer"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
