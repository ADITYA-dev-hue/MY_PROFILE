export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  category: 'data-analytics' | 'ai' | 'fullstack' | 'systems';
  technologies: string[];
  metrics: string[];
  keyFeatures: string[];
  architectureSummary: string;
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  stars?: number;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: 'Advanced' | 'Proficient' | 'Familiar';
  yearsOrProjects?: string;
  tags?: string[];
  iconCode?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Internship' | 'Full-Time' | 'Open-Source' | 'Academic Project';
  highlights: string[];
  technologies: string[];
}

export interface EducationEntry {
  degree: string;
  major?: string;
  institution: string;
  period: string;
  grade?: string;
  location: string;
  highlights?: string[];
}

export interface CodingProfile {
  platform: string;
  username: string;
  url: string;
  stats: string;
  badge: string;
  color: string;
}

export interface Certification {
  id?: string;
  title: string;
  subTitle?: string;
  issuer: string;
  date: string;
  duration?: string;
  badge?: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  signatory?: string;
  recipient?: string;
  overview?: string;
  modules?: string[];
  skills?: string[];
  accentColor?: string;
  type?: 'coursera-google' | 'coursera-meta' | 'iamneo' | 'infosys' | 'bgtechvista';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  company?: string;
  message: string;
}
