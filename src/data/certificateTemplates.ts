import { PredefinedCertificateTemplate } from '../types/cv';

export const PREDEFINED_CERTIFICATES: PredefinedCertificateTemplate[] = [
  // Cloud & DevOps
  {
    id: 'aws-saa',
    name: 'AWS Certified Solutions Architect – Associate',
    nameBn: 'এডাব্লিউএস সার্টিফাইড সলিউশন আর্কিটেক্ট',
    issuer: 'Amazon Web Services (AWS)',
    category: 'cloud',
    level: 'Associate',
    description: 'Validates ability to architect and deploy secure and robust applications on AWS technologies.',
    iconType: 'cloud',
    badgeColor: '#f59e0b'
  },
  {
    id: 'gcp-pcd',
    name: 'Google Professional Cloud Developer',
    nameBn: 'গুগল প্রফেশনাল ক্লাউড ডেভেলপার',
    issuer: 'Google Cloud Platform',
    category: 'cloud',
    level: 'Professional',
    description: 'Expertise in building scalable, highly available and fault-tolerant cloud-native software on GCP.',
    iconType: 'cloud',
    badgeColor: '#3b82f6'
  },
  {
    id: 'azure-az104',
    name: 'Microsoft Certified: Azure Administrator (AZ-104)',
    nameBn: 'মাইক্রোসফট সার্টিফাইড অ্যাজিউর অ্যাডমিনিস্ট্রেটর',
    issuer: 'Microsoft',
    category: 'cloud',
    level: 'Associate',
    description: 'Implementing, managing, and monitoring identity, governance, storage, compute, and virtual networks in Azure.',
    iconType: 'cloud',
    badgeColor: '#0284c7'
  },
  {
    id: 'cka-k8s',
    name: 'Certified Kubernetes Administrator (CKA)',
    nameBn: 'সার্টিফাইড কুবারনেটিস অ্যাডমিনিস্ট্রেটর (CKA)',
    issuer: 'Cloud Native Computing Foundation (CNCF)',
    category: 'cloud',
    level: 'Professional',
    description: 'Validates skills in Kubernetes installation, configuration, cluster management, networking, and security.',
    iconType: 'cloud',
    badgeColor: '#2563eb'
  },

  // Software & Web Development
  {
    id: 'meta-fe',
    name: 'Meta Front-End Developer Professional Certificate',
    nameBn: 'মেটা ফ্রন্ট-এন্ড ডেভেলপার প্রফেশনাল সার্টিফিকেট',
    issuer: 'Meta / Coursera',
    category: 'software',
    level: 'Professional',
    description: 'Advanced responsive design, React development, client-side state, modern CSS, and UX best practices.',
    iconType: 'code',
    badgeColor: '#0ea5e9'
  },
  {
    id: 'oracle-java',
    name: 'Oracle Certified Professional: Java SE Developer',
    nameBn: 'ওরাকল সার্টিফাইড জাভা এসই ডেভেলপার',
    issuer: 'Oracle Corporation',
    category: 'software',
    level: 'Professional',
    description: 'Comprehensive mastery of Java object-oriented programming, concurrency, streams, and modular architectures.',
    iconType: 'code',
    badgeColor: '#dc2626'
  },
  {
    id: 'harvard-cs50',
    name: 'CS50x: Introduction to Computer Science',
    nameBn: 'সিএস৫০: ইন্ট্রোডাকশন টু কম্পিউটার সায়েন্স (হার্ভার্ড)',
    issuer: 'Harvard University (edX)',
    category: 'software',
    level: 'Fundamental',
    description: 'Foundational computer science, algorithmic thinking, data structures, C, Python, and SQL.',
    iconType: 'code',
    badgeColor: '#b91c1c'
  },

  // Management & Agile
  {
    id: 'pmi-pmp',
    name: 'Project Management Professional (PMP®)',
    nameBn: 'প্রজেক্ট ম্যানেজমেন্ট প্রফেশনাল (পিএমপি)',
    issuer: 'Project Management Institute (PMI)',
    category: 'management',
    level: 'Expert',
    description: 'Gold standard in predictive, agile, and hybrid project leadership, risk governance, and stakeholder value delivery.',
    iconType: 'award',
    badgeColor: '#d97706'
  },
  {
    id: 'csm-scrum',
    name: 'Certified ScrumMaster (CSM®)',
    nameBn: 'সার্টিফাইড স্ক্রামমাস্টার (সিএসএম)',
    issuer: 'Scrum Alliance',
    category: 'management',
    level: 'Associate',
    description: 'Mastery of Scrum principles, facilitation of sprint ceremonies, velocity improvement, and agile culture coaching.',
    iconType: 'award',
    badgeColor: '#10b981'
  },
  {
    id: 'itil-v4',
    name: 'ITIL® 4 Foundation in IT Service Management',
    nameBn: 'আইটি সার্ভিস ম্যানেজমেন্ট (ITIL v4)',
    issuer: 'AXELOS',
    category: 'management',
    level: 'Fundamental',
    description: 'End-to-end operating model for the creation, delivery and continuous improvement of tech-enabled products.',
    iconType: 'award',
    badgeColor: '#8b5cf6'
  },

  // Cybersecurity & Networking
  {
    id: 'comptia-sec',
    name: 'CompTIA Security+ (SY0-701)',
    nameBn: 'কম্পটিয়া সিকিউরিটি প্লাস',
    issuer: 'CompTIA',
    category: 'security',
    level: 'Associate',
    description: 'Baseline cybersecurity skills including threat analysis, cryptography, network security, and compliance.',
    iconType: 'shield',
    badgeColor: '#ef4444'
  },
  {
    id: 'cisco-ccna',
    name: 'Cisco Certified Network Associate (CCNA)',
    nameBn: 'সিসকো সার্টিফাইড নেটওয়ার্ক অ্যাসোসিয়েট (সিসিএনএ)',
    issuer: 'Cisco Systems',
    category: 'security',
    level: 'Associate',
    description: 'Network fundamentals, IP services, security fundamentals, automation, and router/switch programmability.',
    iconType: 'shield',
    badgeColor: '#0284c7'
  },
  {
    id: 'isc2-cissp',
    name: 'Certified Information Systems Security Professional (CISSP)',
    nameBn: 'সিআইএসএসপি ইনফরমেশন সিকিউরিটি প্রফেশনাল',
    issuer: '(ISC)²',
    category: 'security',
    level: 'Expert',
    description: 'Elite information security certification covering enterprise architecture, risk management, and cyber defense.',
    iconType: 'shield',
    badgeColor: '#1e293b'
  },

  // Data Science & AI
  {
    id: 'deeplearning-ai',
    name: 'Deep Learning Specialization',
    nameBn: 'ডিপ লার্নিং স্পেশালাইজেশন',
    issuer: 'DeepLearning.AI / Andrew Ng',
    category: 'data',
    level: 'Professional',
    description: 'Foundations of Deep Learning, CNNs, RNNs, transformers, LSTM, Adam optimization, and hyperparameter tuning.',
    iconType: 'cpu',
    badgeColor: '#6366f1'
  },
  {
    id: 'tensorflow-dev',
    name: 'TensorFlow Developer Certificate',
    nameBn: 'টেনসরফ্লো ডেভেলপার সার্টিফিকেট',
    issuer: 'Google TensorFlow',
    category: 'data',
    level: 'Associate',
    description: 'Building and training neural network models using TensorFlow for computer vision, NLP, and time series.',
    iconType: 'cpu',
    badgeColor: '#ea580c'
  },

  // Language & International Tests
  {
    id: 'ielts-academic',
    name: 'IELTS Academic - Band 8.0 (CEFR C1)',
    nameBn: 'আইইএলটিএস একাডেমিক (ব্যান্ড ৮.০)',
    issuer: 'British Council / IDP IELTS',
    category: 'language',
    level: 'Expert',
    description: 'Demonstrated high professional proficiency in English listening, reading, writing, and speaking.',
    iconType: 'globe',
    badgeColor: '#be123c'
  },
  {
    id: 'toefl-ibt',
    name: 'TOEFL iBT® Score 110/120',
    nameBn: 'টোফেল আইবিটি স্কোর ১১০/১২০',
    issuer: 'ETS (Educational Testing Service)',
    category: 'language',
    level: 'Expert',
    description: 'Advanced university-level English communication for academic, research, and corporate environments.',
    iconType: 'globe',
    badgeColor: '#0369a1'
  }
];

export const CERTIFICATE_LAYOUT_STYLES = [
  {
    id: 'modern_badge',
    title: 'Modern Badge & Card',
    titleBn: 'আধুনিক কার্ড ও ভেরিফাইড ব্যাজ',
    description: 'Clean rounded card with category color badge, credential ID pill, and verification hyperlink.'
  },
  {
    id: 'classic_seal',
    title: 'Classic Gold Ribbon',
    titleBn: 'ক্লাসিক সিল ও রিবন স্টাইল',
    description: 'Formal serif typography with golden medal seal icon and institutional styling.'
  },
  {
    id: 'minimal_clean',
    title: 'Minimalist Clean Line',
    titleBn: 'মিনিমালিস্ট পরিচ্ছন্ন তালিকা',
    description: 'Strict monochrome horizontal layout, optimal for ATS parsers and corporate CVs.'
  },
  {
    id: 'compact_chip',
    title: 'Compact Grid Chips',
    titleBn: 'কমপ্যাক্ট ট্যাগ গ্রিড',
    description: 'Space-saving grid tags with logos, perfect for candidates with 5+ credentials.'
  }
];
