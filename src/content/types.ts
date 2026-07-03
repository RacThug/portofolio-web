export interface SiteContent {
  name: string;
  role: string;
  heroLine: string;
  oneLiner: string;
  statusLine: string;
  location: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  cvUrl: string;
  availability: string;
}

export interface Project {
  label: string;
  title: string;
  type: string;
  role: string;
  problem: string;
  built: string;
  highlights: string[];
  tech: string[];
  liveUrl?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
  featured?: boolean;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  employment: string;
  period: string;
  summary: string;
  stack?: string;
}

export interface Education {
  school: string;
  degree: string;
}
