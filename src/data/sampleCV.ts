import { CVData } from '../types/cv';

export const EMPTY_CV_DATA: CVData = {
  personal: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    address: '',
    permanentAddress: '',
    fatherName: '',
    motherName: '',
    bloodGroup: '',
    dateOfBirth: '',
    nationality: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    photo: '',
    photoShape: 'circle',
    showPhoto: true,
  },
  certificateStyle: 'modern_badge',
  experiences: [],
  education: [],
  certificates: [],
  languages: [],
  skills: [],
  projects: []
};

export const SAMPLE_CV_DATA: CVData = {
  personal: {
    fullName: 'Sayed Ahmed Tanvir',
    headline: 'Senior Full-Stack Engineer & Cloud Solutions Architect',
    email: 'sayed.tanvir@example.com',
    phone: '+880 1712-345678',
    address: 'Gulshan-2, Dhaka, Bangladesh',
    permanentAddress: 'Vill: Radhanagar, Upazila: Raipura, Dist: Narsingdi, Bangladesh',
    fatherName: 'Md. Shamsuddin Ahmed',
    motherName: 'Begum Laila Parveen',
    bloodGroup: 'B+',
    dateOfBirth: '14 October 1995',
    nationality: 'Bangladeshi',
    website: 'https://tanvir-dev.io',
    linkedin: 'linkedin.com/in/sayedtanvir',
    github: 'github.com/sayedtanvir',
    summary: 'Proactive Full-Stack Software Engineer with 6+ years of experience architecting high-performance cloud applications and distributed systems. Expert in React, TypeScript, Node.js, and AWS. Proven track record leading agile engineering teams and scaling fintech platforms serving 2M+ active users.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    photoShape: 'circle',
    showPhoto: true,
  },
  certificateStyle: 'modern_badge',
  experiences: [
    {
      id: 'exp-1',
      title: 'Lead Software Architect',
      company: 'Pathao Technologies Ltd.',
      location: 'Dhaka, Bangladesh',
      startDate: 'Jan 2023',
      endDate: 'Present',
      current: true,
      description: '• Architected real-time dispatching microservice handling 45,000+ requests per minute with sub-50ms latency using Node.js and Redis.\n• Led a cross-functional squad of 11 engineers through full SDLC from discovery to CI/CD automated deployment.\n• Spearheaded migration to containerized Kubernetes clusters on AWS, reducing server overhead costs by 28%.'
    },
    {
      id: 'exp-2',
      title: 'Senior Frontend Engineer',
      company: 'Brain Station 23',
      location: 'Dhaka, Bangladesh',
      startDate: 'Mar 2020',
      endDate: 'Dec 2022',
      current: false,
      description: '• Engineered core banking dashboard with React, TypeScript, and Tailwind CSS compliant with strict PCI-DSS security.\n• Optimized Core Web Vitals resulting in 40% faster initial page load and 99.9% uptime SLA.\n• Implemented automated Jest & Cypress testing suites, raising code coverage from 45% to 88%.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Sc. in Computer Science & Engineering',
      fieldOfStudy: 'Computer Science & Software Engineering',
      institution: 'Bangladesh University of Engineering and Technology (BUET)',
      location: 'Dhaka, Bangladesh',
      startDate: '2014',
      endDate: '2018',
      grade: 'CGPA: 3.84 / 4.00'
    }
  ],
  certificates: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services (AWS)',
      issueDate: '2024',
      expiryDate: '2027',
      credentialId: 'AWS-SAA-8392104',
      credentialUrl: 'https://aws.amazon.com/verification',
      description: 'Validation of expertise in designing resilient, high-performance, and cost-effective cloud architectures.'
    },
    {
      id: 'cert-2',
      name: 'Google Professional Cloud Developer',
      issuer: 'Google Cloud Platform',
      issueDate: '2023',
      credentialId: 'GCP-DEV-90241',
      credentialUrl: 'https://cloud.google.com/certification',
      description: 'Proficiency in deploying cloud-native applications and securing microservices on GCP.'
    }
  ],
  languages: [
    {
      id: 'lang-1',
      language: 'English',
      proficiency: 'Fluent',
      rating: 5
    },
    {
      id: 'lang-2',
      language: 'Bengali (বাংলা)',
      proficiency: 'Native',
      rating: 5
    }
  ],
  skills: [
    'React',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'PostgreSQL',
    'Docker',
    'AWS',
    'GraphQL'
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'CloudSync Enterprise',
      role: 'Creator & Lead Architect',
      link: 'https://github.com/example/cloudsync',
      technologies: 'React, Node.js, Redis, PostgreSQL',
      description: 'Collaborative real-time file synchronization platform supporting differential syncing and end-to-end encryption.'
    }
  ]
};
