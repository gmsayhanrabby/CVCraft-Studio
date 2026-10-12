export type LanguageProficiency = 
  | 'Native'
  | 'Fluent'
  | 'Proficient'
  | 'Conversational'
  | 'Basic';

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: LanguageProficiency;
  rating?: number; // 1-5
}

export type CertificateCardStyle = 'modern_badge' | 'classic_seal' | 'minimal_clean' | 'compact_chip';

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  badgeStyle?: CertificateCardStyle;
}

export interface PredefinedCertificateTemplate {
  id: string;
  name: string;
  nameBn?: string;
  issuer: string;
  category: 'cloud' | 'software' | 'security' | 'management' | 'data' | 'language';
  level: 'Fundamental' | 'Associate' | 'Professional' | 'Expert';
  description: string;
  iconType: string;
  badgeColor: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  link?: string;
  technologies: string;
  description: string;
}

export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  address: string;
  permanentAddress?: string;
  fatherName?: string;
  motherName?: string;
  bloodGroup?: string;
  dateOfBirth?: string;
  nationality?: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photo: string; // base64 or URL
  photoShape: 'circle' | 'rounded' | 'square';
  showPhoto: boolean;
}

export interface CVData {
  personal: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  certificateStyle?: CertificateCardStyle;
  languages: LanguageItem[];
  skills: string[];
  projects: ProjectItem[];
}

export type TemplateId = 
  | 'europass_official_2026'
  | 'europass_word_2026'
  | 'europass_novoresume_2026'
  | 'europass_enhancv_2026'
  | 'europass_zety_2026'
  | 'europass_modern_2026'
  | 'europass_classic_doc'
  | 'europass_academic'
  | 'modern_emerald'
  | 'ats_clean'
  | 'europass_navy'
  | 'creative_amber'
  | 'minimalist_swiss'
  | 'tech_matrix'
  | 'executive_burgundy'
  | 'bangladesh_standard'
  | 'nordic_slate';

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  nameBn: string;
  category: 'ats' | 'modern' | 'corporate' | 'creative' | 'regional';
  description: string;
  descriptionBn: string;
  primaryColor: string;
  secondaryColor: string;
  layoutStyle: 'sidebar_left' | 'top_header' | 'single_column' | 'two_column' | 'timeline' | 'grid';
  hasPhotoSupport: boolean;
  isPopular?: boolean;
}
