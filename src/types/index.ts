export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  stack: string[];
  colSpan: string;
  rowHeight: string;
  accent: string;
  status: "Live" | "In Dev" | "Open Source";
  year: string;
  links: { live?: string; github?: string };
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}