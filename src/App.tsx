import { useState, useEffect, useRef, useCallback } from "react";
import { Icon } from "@iconify/react"; 

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
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

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Work", "Tech", "About", "Philosophy", "Contact"];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Third Eye Platform",
    subtitle: "Advanced Vulnerability Assessment Suite",
    description: "Real-time threat intelligence and automated network scanning.",
    longDescription:
      "A comprehensive cybersecurity platform featuring real-time threat intelligence feeds, automated vulnerability scanning, CVE database integration, network topology mapping, and a beautiful terminal-style dashboard. Built with Next.js, WebSockets for live updates, and integrates with Shodan/VirusTotal APIs.",
    tags: ["Cybersecurity", "Next.js", "WebSocket"],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Redis"],
    colSpan: "md:col-span-8",
    rowHeight: "h-[500px]",
    accent: "from-cyan-500/20 to-blue-600/10",
    status: "Live",
    year: "2024",
    links: { live: "#", github: "#" },
  },
  {
    id: 2,
    title: "ShopStream",
    subtitle: "High-Velocity E-Commerce Engine",
    description: "Sub-second page loads with a cutting-edge shopping experience.",
    longDescription:
      "A performance-first e-commerce platform achieving sub-100ms page loads via edge caching and incremental static regeneration. Features real-time inventory, AI-powered recommendations, Stripe integration, and an admin analytics dashboard with live revenue tracking.",
    tags: ["E-Commerce", "Node.js"],
    stack: ["Next.js", "Node.js", "MongoDB", "Redis", "Stripe", "AWS"],
    colSpan: "md:col-span-4",
    rowHeight: "h-[500px]",
    accent: "from-purple-500/20 to-violet-600/10",
    status: "Live",
    year: "2024",
    links: { live: "#", github: "#" },
  },
  {
    id: 3,
    title: "DevConnect",
    subtitle: "Real-time OSS Collaboration Hub",
    description: "Real-time collaboration for open-source development teams.",
    longDescription:
      "A GitHub-integrated platform designed for async open-source collaboration. Features real-time code discussion threads, PR review workflows, contributor leaderboards, issue triage automation, and integrated CI/CD status widgets. Built with Socket.io for live presence.",
    tags: ["Open Source", "React", "Socket.io"],
    stack: ["React", "Express", "Socket.io", "PostgreSQL", "GitHub API"],
    colSpan: "md:col-span-6",
    rowHeight: "h-[380px]",
    accent: "from-emerald-500/20 to-teal-600/10",
    status: "Open Source",
    year: "2023",
    links: { live: "#", github: "#" },
  },
  {
    id: 4,
    title: "InsightBoard",
    subtitle: "Enterprise Analytics Platform",
    description: "Enterprise-grade analytics with AI predictive modeling.",
    longDescription:
      "An enterprise business intelligence suite featuring customizable KPI dashboards, drag-and-drop report builder, AI anomaly detection, scheduled report delivery, multi-tenant support, and role-based access control. Processes millions of events per day.",
    tags: ["Analytics", "AI/ML", "Python"],
    stack: ["React", "Python", "FastAPI", "ClickHouse", "TensorFlow", "Grafana"],
    colSpan: "md:col-span-6",
    rowHeight: "h-[380px]",
    accent: "from-amber-500/20 to-orange-600/10",
    status: "In Dev",
    year: "2024",
    links: { github: "#" },
  },
];

const SKILLS: Record<string, Skill[]> = {
  Frontend: [
    { name: "React / Next.js", level: 90, icon: "code" },
    { name: "TypeScript", level: 85, icon: "terminal" },
    { name: "Tailwind CSS", level: 92, icon: "palette" },
    { name: "HTML / CSS", level: 95, icon: "html" },
  ],
  Backend: [
    { name: "Node.js / Express", level: 88, icon: "dns" },
    { name: "Python / FastAPI", level: 78, icon: "science" },
    { name: "Go", level: 60, icon: "bolt" },
    { name: "PHP / Laravel", level: 70, icon: "php" },
  ],
  Database: [
    { name: "PostgreSQL", level: 82, icon: "storage" },
    { name: "MongoDB", level: 80, icon: "dataset" },
    { name: "Redis", level: 72, icon: "speed" },
    { name: "Firebase", level: 75, icon: "local_fire_department" },
  ],
  "DevOps & Security": [
    { name: "Docker / K8s", level: 70, icon: "package_2" },
    { name: "Linux / Bash", level: 85, icon: "terminal" },
    { name: "Penetration Testing", level: 75, icon: "security" },
    { name: "CI/CD Pipelines", level: 68, icon: "sync" },
  ],
};

const STATS = [
  { label: "Projects Shipped", value: 24, suffix: "+" },
  { label: "GitHub Contributions", value: 2482, suffix: "+" },
  { label: "Current Streak", value: 48, suffix: " days" },
  { label: "Open Source PRs", value: 137, suffix: "+" },
];

const TIMELINE = [
  {
    year: "2024",
    title: "Full Stack Architect",
    company: "Freelance & Open Source",
    desc: "Architecting cloud-native applications, contributing to major OSS projects, and leading security audits.",
  },
  {
    year: "2023",
    title: "Security Researcher",
    company: "Self-Directed",
    desc: "Deep-dived into penetration testing, CTF competitions, and built the Third Eye security suite.",
  },
  {
    year: "2022",
    title: "Backend Engineer",
    company: "Startup Environment",
    desc: "Built scalable APIs handling millions of requests, designed microservice architectures.",
  },
  {
    year: "2021",
    title: "Frontend Developer",
    company: "Agency Work",
    desc: "Crafted pixel-perfect React applications, mastered performance optimization and accessibility.",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function useTypingEffect(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
// Icon component removed - using @iconify/react instead

function StatusBadge({ status }: { status: Project["status"] }) {
  const colors: Record<Project["status"], string> = {
    Live: "bg-green-500/15 text-green-400 border-green-500/30",
    "In Dev": "bg-amber-500/15 text-amber-400 border-amber-500/30",
    "Open Source": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  };
  const dots: Record<Project["status"], string> = {
    Live: "bg-green-400",
    "In Dev": "bg-amber-400",
    "Open Source": "bg-blue-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-label font-bold ${colors[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]} ${status === "Live" ? "animate-pulse" : ""}`} />
      {status}
    </span>
  );
}

function Toast({ toasts, remove }: { toasts: Toast[]; remove: (id: number) => void }) {
  return (
    <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-enter pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl border shadow-2xl glass-panel min-w-[280px] ${
            t.type === "success"
              ? "border-green-500/30 text-green-300"
              : t.type === "error"
              ? "border-red-500/30 text-red-300"
              : "border-[#32457c] text-[#dfe4ff]"
          }`}
        >
          <Icon
            icon={t.type === "success" ? "mdi:check-circle" : t.type === "error" ? "mdi:alert-circle" : "mdi:information"}
            className="text-lg"
          />
          <span className="font-label text-sm flex-1">{t.message}</span>
          <button onClick={() => remove(t.id)} className="opacity-50 hover:opacity-100 transition-opacity">
            <Icon icon="mdi:close" className="text-sm" />
          </button>
        </div>
      ))}
    </div>
  );
}

function ContributionGraph() {
  const weeks = 32;
  const days = 7;
  const cells = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.floor(Math.random() * 4))
  );
  const levelColors = [
    "bg-[#0a2257]",
    "bg-[#47c4ff]/20",
    "bg-[#47c4ff]/55",
    "bg-[#47c4ff]",
  ];

  return (
    <div className="flex gap-1 overflow-x-auto pb-2">
      {cells.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {week.map((level, di) => (
            <div
              key={di}
              className={`contrib-cell w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ${levelColors[level]}`}
              title={`Level ${level}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function SkillBar({ skill, isVisible }: { skill: Skill; isVisible: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon icon={skill.icon} className="text-[#47c4ff] text-sm" />
          <span className="font-label text-sm text-[#c4c7c9]">{skill.name}</span>
        </div>
        <span className="font-label text-xs text-[#47c4ff]">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-[#0a2257] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#47c4ff] to-[#2db7f2] transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${skill.level}%` : "0%", transitionDelay: "200ms" }}
        />
      </div>
    </div>
  );
}

function StatCard({ stat, isVisible }: { stat: typeof STATS[0]; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible);
  return (
    <div className="bg-[#0a1839] border border-[#32457c]/30 rounded-xl p-6 text-center glow-border transition-all duration-300">
      <div className="font-headline text-4xl font-black text-[#47c4ff] mb-1">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="font-label text-xs text-[#96a9e6] uppercase tracking-widest">{stat.label}</div>
    </div>
  );
}

// ─── Project Modal ─────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop bg-[#070d1f]/80"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#0a1839] border border-[#32457c]/40 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in-up glow-border">
        <div className={`h-2 rounded-t-2xl bg-gradient-to-r ${project.accent.replace("/20", "").replace("/10", "")} from-[#47c4ff] to-[#2db7f2]`} />
        <div className="p-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <StatusBadge status={project.status} />
                <span className="font-label text-xs text-[#96a9e6]">{project.year}</span>
              </div>
              <h3 className="font-headline text-3xl font-bold text-[#dfe4ff]">{project.title}</h3>
              <p className="text-[#8f9fb7] font-body mt-1">{project.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#0a2257] flex items-center justify-center hover:bg-[#32457c] transition-colors shrink-0"
            >
              <Icon icon="mdi:close" className="text-[#dfe4ff] text-lg" />
            </button>
          </div>

          <p className="font-body text-[#c4c7c9] leading-relaxed">{project.longDescription}</p>

          <div>
            <h4 className="font-label text-xs text-[#47c4ff] uppercase tracking-widest mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span key={t} className="tech-tag bg-[#0a2257] border border-[#32457c]/40 px-3 py-1.5 rounded-lg text-xs font-label text-[#c4c7c9]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {project.links.live && (
              <a
                href={project.links.live}
                className="flex items-center gap-2 bg-[#47c4ff] text-[#003b52] px-5 py-2.5 rounded-lg font-label font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
              >
                <Icon icon="mdi:open-in-new" className="text-sm" /> Live Demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                className="flex items-center gap-2 bg-[#0a2257] border border-[#32457c]/40 text-[#dfe4ff] px-5 py-2.5 rounded-lg font-label font-bold text-sm hover:bg-[#32457c]/30 active:scale-95 transition-all"
              >
                <Icon icon="mdi:code" className="text-sm" /> Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────
function HeroSection({ onCTA }: { onCTA: () => void }) {
  const roles = ["Full Stack Developer", "Security Researcher", "Cloud Architect", "OSS Contributor", "Systems Thinker"];
  const typedRole = useTypingEffect(roles);

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 pt-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#47c4ff]/8 blur-[120px] rounded-full -z-10 animate-float" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2db7f2]/5 blur-[100px] rounded-full -z-10" />
      {/* Dot grid */}
      <div className="absolute inset-0 dot-pattern opacity-30 -z-10" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#47c4ff]" />
              <span className="font-label text-[#47c4ff] tracking-[0.3em] uppercase text-xs">
                Architecting Digital Futures
              </span>
            </div>
            <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter text-[#dfe4ff] leading-none">
              Gobinda <br />
              <span className="gradient-text">Adhikari</span>
            </h1>
            <div className="h-10 flex items-center">
              <p className="font-body text-xl text-[#8f9fb7] typing-cursor">{typedRole}</p>
            </div>
          </div>

          <p className="font-body text-lg text-[#c4c7c9] max-w-lg leading-relaxed">
            Building resilient, scalable architectures that solve real-world complexities — from pixel-perfect UIs to battle-hardened security systems.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onCTA}
              className="group bg-gradient-to-br from-[#47c4ff] to-[#05a9e3] text-[#003b52] px-8 py-4 rounded-xl font-label font-bold flex items-center gap-2 hover:scale-[1.03] transition-transform shadow-lg shadow-[#47c4ff]/20"
            >
              View Projects{" "}
              <Icon icon="mdi:arrow-forward" className="text-lg group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#contact"
              className="bg-[#0b1d48] border border-[#32457c]/40 text-[#dfe4ff] px-8 py-4 rounded-xl font-label font-bold hover:bg-[#0a2257] hover:border-[#47c4ff]/30 transition-all"
            >
              Contact Me
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-[#8f9fb7] px-4 py-4 font-label font-bold hover:text-[#47c4ff] transition-colors"
            >
              <Icon icon="mdi:download" className="text-lg" /> Resume
            </a>
          </div>

          {/* Social strip */}
          <div className="flex items-center gap-5 pt-2">
            {[
              { icon: "mdi:github", label: "GitHub", href: "https://github.com/gobinda3113" },
              { icon: "mdi:linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/gobinda-adhikari-33bbb2213" },
              { icon: "mdi:facebook", label: "Facebook", href: "https://www.facebook.com/gobinda.adhikari.9634340" },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-1.5 text-[#6073ad] hover:text-[#47c4ff] transition-colors font-label text-xs"
              >
                <Icon icon={icon} className="text-base" /> {label}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center relative">
          {/* Avatar ring */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#47c4ff]/20 to-transparent blur-md animate-pulse-glow" />
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-[#32457c]/40 relative group glow-border">
              <img
                 src="https://i.ibb.co/d47mWy7h/Chat-GPT-Image-Apr-2-2026-08-33-06-AM.jpg"
                alt="Gobinda Adhikari"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070d1f]/60 to-transparent" />
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-4 -left-4 glass-panel px-4 py-3 rounded-xl border border-[#32457c]/30 animate-float">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                <span className="font-label text-xs text-[#dfe4ff]">Open to Work</span>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 glass-panel px-4 py-3 rounded-xl border border-[#32457c]/30">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:lightning-bolt" className="text-[#47c4ff] text-sm" />
                <span className="font-label text-xs text-[#dfe4ff]">48-day streak</span>
              </div>
            </div>

            {/* Orbit decoration */}
            <div className="absolute inset-0 -m-12 rounded-full border border-[#47c4ff]/10 pointer-events-none hidden md:block">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#47c4ff] rounded-full animate-spin-slow" style={{ transformOrigin: "50% calc(50% + 80px)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6073ad] animate-bounce">
        <span className="font-label text-[10px] uppercase tracking-widest">Scroll</span>
        <Icon icon="mdi:chevron-down" className="text-xl" />
      </div>
    </section>
  );
}

function StatsSection() {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 px-8 md:px-24 bg-[#09122b] border-y border-[#0a2257]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}

function TechSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const categories = Object.keys(SKILLS);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 px-8 md:px-24"
      id="tech"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-label text-[#47c4ff] tracking-[0.3em] uppercase text-xs">Arsenal</span>
          <h2 className="font-headline text-5xl font-extrabold mt-2 mb-4">
            Mastering the <span className="gradient-text">Stack</span>
          </h2>
          <p className="font-body text-[#8f9fb7]">From hardware logic to pixel-perfect interfaces</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-label text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#47c4ff] text-[#003b52] font-bold shadow-lg shadow-[#47c4ff]/20"
                  : "bg-[#0a1839] border border-[#32457c]/30 text-[#8f9fb7] hover:border-[#47c4ff]/40 hover:text-[#dfe4ff]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {SKILLS[activeCategory].map((skill) => (
            <div key={skill.name} className="bg-[#0a1839] border border-[#32457c]/20 rounded-xl p-6 glow-border">
              <SkillBar skill={skill} isVisible={isVisible} />
            </div>
          ))}
        </div>

        {/* Tag cloud */}
        <div className="mt-16 text-center">
          <p className="font-label text-xs text-[#47c4ff] uppercase tracking-widest mb-6">Also Proficient With</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Figma", "GraphQL", "Prisma", "Jest", "Webpack", "Nginx", "AWS", "Vercel", "Supabase", "Electron", "React Native", "Vim/Neovim", "Kali Linux", "Metasploit", "Wireshark"].map((tag) => (
              <span key={tag} className="tech-tag bg-[#0a2257] border border-[#32457c]/30 px-3 py-1.5 rounded-lg text-xs font-label text-[#8f9fb7]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSection({ addToast }: { addToast: (msg: string, type: Toast["type"]) => void }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Cybersecurity", "E-Commerce", "Open Source", "Analytics"];

  return (
    <section className="py-32 px-8 md:px-24 bg-[#070d1f]" id="work">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-label text-[#47c4ff] tracking-[0.3em] uppercase text-xs">Portfolio</span>
            <h2 className="font-headline text-5xl font-extrabold text-[#dfe4ff] mt-1">Selected Works</h2>
            <p className="text-[#8f9fb7] mt-2 font-body">Engineering solutions across the full stack spectrum.</p>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-[#47c4ff] font-label text-sm border-b border-[#47c4ff]/50 pb-1 hover:border-[#47c4ff] transition-colors whitespace-nowrap"
          >
            All Repositories <Icon icon="mdi:arrow-forward" className="text-base" />
          </a>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full font-label text-xs transition-all ${
                filter === f
                  ? "bg-[#47c4ff]/15 text-[#47c4ff] border border-[#47c4ff]/40"
                  : "bg-transparent border border-[#32457c]/30 text-[#6073ad] hover:text-[#dfe4ff]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {PROJECTS.filter((p) => filter === "All" || p.tags.some((t) => t.includes(filter) || filter.includes(t))).map((project) => (
            <div
              key={project.id}
              className={`${project.colSpan} project-card group relative overflow-hidden rounded-2xl bg-[#09122b] border border-[#32457c]/20 cursor-pointer`}
              onClick={() => setActiveProject(project)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className={`${project.rowHeight} relative flex flex-col justify-between p-8`}>
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-[#0a2257] text-[#47c4ff] border border-[#47c4ff]/20 px-3 py-1 rounded-full text-[10px] font-label">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <StatusBadge status={project.status} />
                </div>

                {/* Bottom content */}
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-label text-[#47c4ff] text-xs mb-1">{project.year}</p>
                      <h3 className="font-headline text-2xl md:text-3xl font-bold text-[#dfe4ff] group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[#8f9fb7] font-body text-sm mt-1 max-w-sm">{project.description}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#0a2257] border border-[#32457c]/30 flex items-center justify-center text-[#47c4ff] group-hover:bg-[#47c4ff] group-hover:text-[#003b52] transition-all duration-300 shrink-0">
                      <Icon icon="mdi:arrow-top-right" className="text-lg" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#32457c]/20">
                    {project.stack.slice(0, 4).map((t) => (
                      <span key={t} className="font-label text-[10px] text-[#6073ad]">{t}</span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="font-label text-[10px] text-[#6073ad]">+{project.stack.length - 4} more</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => addToast("More projects coming soon! Check GitHub for the latest.", "info")}
            className="bg-[#0a1839] border border-[#32457c]/30 text-[#dfe4ff] px-8 py-3 rounded-xl font-label font-bold hover:border-[#47c4ff]/40 hover:text-[#47c4ff] transition-all"
          >
            Load More Projects
          </button>
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}

function AboutSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 px-8 md:px-24 bg-[#09122b]"
      id="about"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-start">
        {/* Left: Story + Timeline */}
        <div className={`space-y-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          <div>
            <span className="font-label text-[#47c4ff] tracking-[0.3em] uppercase text-xs">The Story</span>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-[#dfe4ff] mt-2 flex items-center gap-4">
              <span className="w-12 h-px bg-[#47c4ff]" /> The Journey
            </h2>
          </div>
          <div className="space-y-6 font-body text-lg text-[#c4c7c9] leading-relaxed">
            <p>
              I'm a passionate Full Stack Developer specializing in high-performance, scalable web applications. My work is fueled by deep curiosity about Cloud Architecture, DevOps pipelines, and the human problems they solve.
            </p>
            <p>
              Beyond standard development, I immerse myself in Cybersecurity and Ethical Hacking — ensuring every line of code is as secure as it is functional. I believe great software is invisible; it just works.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-1 relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#47c4ff] to-transparent" />
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className="pl-10 pb-8 relative"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-[#47c4ff] border-2 border-[#09122b] shadow-lg shadow-[#47c4ff]/40" />
                <span className="font-label text-[#47c4ff] text-xs">{item.year}</span>
                <h4 className="font-headline font-bold text-[#dfe4ff] mt-0.5">{item.title}</h4>
                <p className="font-label text-xs text-[#8f9fb7] mb-1">{item.company}</p>
                <p className="font-body text-sm text-[#c4c7c9]/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Trait Cards */}
        <div className={`grid grid-cols-2 gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          {[
            { icon: "mdi:aws", label: "Cloud Native", desc: "AWS, Docker, Kubernetes, CI/CD pipelines" },
            { icon: "mdi:shield-account", label: "Ethical Hacking", desc: "Penetration Testing, Network Security, CTF" },
            { icon: "mdi:github", label: "Open Source", desc: "Active contributor to dev tools and libraries" },
            { icon: "mdi:brain", label: "Systems Thinking", desc: "Designing for scale, resilience, and impact" },
            { icon: "mdi:robot", label: "AI Integration", desc: "LLM APIs, vector search, ML pipelines" },
            { icon: "mdi:account-group", label: "Collaboration", desc: "Mentoring, code reviews, team leadership" },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-[#0a1839] border border-[#32457c]/20 p-6 rounded-xl glow-border transition-all duration-300"
            >
              <Icon icon={card.icon} className="text-[#47c4ff] text-2xl mb-3 block" />
              <h4 className="font-label font-bold text-[#dfe4ff] mb-1.5">{card.label}</h4>
              <p className="text-[10px] text-[#8f9fb7] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitHubSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 px-8 md:px-24 border-y border-[#0a2257]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className={`md:col-span-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <span className="font-label text-[#47c4ff] tracking-[0.3em] uppercase text-xs">GitHub Activity</span>
            <h2 className="font-headline text-4xl font-extrabold mb-6 mt-2">
              Coding <span className="gradient-text">Consistency</span>
            </h2>
            <p className="text-[#8f9fb7] leading-relaxed font-body mb-8">
              My GitHub is a living map of growth. I believe in the power of continuous iteration — shipping small, thinking big.
            </p>
            <div className="space-y-4">
              {[
                { label: "Total Contributions", value: "2,482+" },
                { label: "Current Streak", value: "48 Days" },
                { label: "Repositories", value: "47" },
                { label: "Stars Earned", value: "312+" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-end border-b border-[#32457c]/20 pb-2">
                  <span className="font-label text-xs uppercase text-[#6073ad]">{label}</span>
                  <span className="font-headline text-xl font-bold text-[#dfe4ff]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`md:col-span-8 bg-[#0a1839] p-8 rounded-2xl border border-[#32457c]/20 glow-border transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="flex justify-between items-center mb-6">
              <span className="font-label text-sm text-[#47c4ff]">github.com/gobinda3113</span>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {["bg-[#0a2257]", "bg-[#47c4ff]/20", "bg-[#47c4ff]/55", "bg-[#47c4ff]"].map((c, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                  ))}
                </div>
                <span className="font-label text-[10px] text-[#6073ad]">Less → More</span>
              </div>
            </div>

            <ContributionGraph />

            <div className="mt-6 pt-6 border-t border-[#32457c]/10 flex flex-wrap gap-6">
              {[
                { icon: "star", label: "Most Used: TypeScript" },
                { icon: "merge", label: "137 PRs Merged" },
                { icon: "bug_report", label: "89 Issues Closed" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-[#6073ad]">
                  <Icon icon={icon} className="text-sm" />
                  <span className="font-label text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="py-48 px-8 md:px-24 bg-[#070d1f] overflow-hidden relative" id="philosophy">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-headline text-[15vw] font-black text-[#dfe4ff]/3 whitespace-nowrap">
          INNOVATION
        </span>
      </div>
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="max-w-4xl mx-auto relative text-center">
        <Icon icon="mdi:format-quote-open" className="text-[#47c4ff] text-6xl mb-12 block" />

        <blockquote className="font-headline text-4xl md:text-6xl font-light italic text-[#dfe4ff] leading-tight">
          "Code is not just syntax — it's the{" "}
          <span className="font-extrabold not-italic gradient-text underline decoration-2 underline-offset-8">
            blueprint
          </span>{" "}
          of innovation."
        </blockquote>

        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-[#32457c]" />
          <cite className="font-label text-[#8f9fb7] tracking-widest uppercase text-sm not-italic">
            Core Philosophy
          </cite>
          <div className="h-px w-12 bg-[#32457c]" />
        </div>

        {/* Principles */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 text-left">
          {[
            { icon: "shield", title: "Security First", desc: "Every system I build is designed with threat modeling and defense-in-depth from day zero." },
            { icon: "speed", title: "Performance Obsessed", desc: "Milliseconds matter. I optimize for real users on real devices, not just benchmarks." },
            { icon: "diversity_3", title: "Human-Centered", desc: "The best technology disappears. I build tools that empower people, not intimidate them." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-[#09122b] border border-[#32457c]/20 rounded-xl p-6 glow-border transition-all">
              <Icon icon={icon} className="text-[#47c4ff] text-2xl mb-3 block" />
              <h4 className="font-label font-bold text-[#dfe4ff] mb-2">{title}</h4>
              <p className="font-body text-sm text-[#8f9fb7] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ addToast }: { addToast: (msg: string, type: Toast["type"]) => void }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [showEmailFallback, setShowEmailFallback] = useState(false);
  const [emailContent, setEmailContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast("Please fill in all required fields.", "error");
      return;
    }
    
    // Create mailto link that opens user's email client
    const subject = form.subject ? form.subject : `Contact from ${form.name}`;
    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0A%0D%0A${form.message.replace(/\n/g, '%0D%0A')}`;
    
    const mailtoLink = `mailto:gobinda3113@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Open user's default email client - use a more reliable method
    try {
      // Method 1: Try opening in new tab/window first (more reliable for web)
      const mailtoWindow = window.open(mailtoLink, '_blank');
      
      // If that fails or is blocked, fall back to location.href
      if (!mailtoWindow || mailtoWindow.closed || typeof mailtoWindow.closed === 'undefined') {
        window.location.href = mailtoLink;
      }
      
      // Show success message
      addToast("Opening your email client to send message... ✉️", "success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      // If both methods fail, show the email content as fallback
      const emailText = `To: gobinda3113@gmail.com\nSubject: ${subject}\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
      setEmailContent(emailText);
      setShowEmailFallback(true);
      addToast("Email client not available. Your message is ready to copy.", "info");
      console.error("Failed to open email client:", error);
    }
  };

  return (
    <section className="py-32 px-8 md:px-24 bg-[#09122b]" id="contact">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        {/* Left */}
        <div className="space-y-8">
          <div>
            <span className="font-label text-[#47c4ff] tracking-[0.3em] uppercase text-xs">Get In Touch</span>
            <h2 className="font-headline text-5xl font-extrabold mt-2">
              Let's build <br />
              <span className="gradient-text">Together.</span>
            </h2>
          </div>
          <p className="font-body text-xl text-[#c4c7c9] leading-relaxed max-w-md">
            Have a project in mind? Want to discuss systems architecture or just connect? My door is always open for innovators.
          </p>

          <div className="space-y-5 pt-4">
            {[
              { icon: "mdi:email", label: "gobinda3113@gmail.com", href: "mailto:gobinda3113@gmail.com" },
              { icon: "mdi:github", label: "github.com/gobinda3113", href: "https://github.com/gobinda3113" },
              { icon: "mdi:linkedin", label: "linkedin.com/in/gobinda-adhikari-33bbb2213", href: "https://www.linkedin.com/in/gobinda-adhikari-33bbb2213" },
              { icon: "mdi:facebook", label: "facebook.com/gobinda.adhikari.9634340", href: "https://www.facebook.com/gobinda.adhikari.9634340" },
              { icon: "mdi:map-marker", label: "Nepal", href: "#" },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#0a1839] border border-[#32457c]/30 flex items-center justify-center text-[#47c4ff] group-hover:bg-[#47c4ff] group-hover:text-[#003b52] transition-all duration-300">
                  <Icon icon={icon} />
                </div>
                <span className="font-label text-[#c4c7c9] group-hover:text-[#47c4ff] transition-colors">{label}</span>
              </a>
            ))}
          </div>

          {/* Availability card */}
          <div className="bg-[#0a1839] border border-[#32457c]/20 rounded-xl p-6 glow-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
              <span className="font-label font-bold text-[#dfe4ff]">Currently Available</span>
            </div>
            <p className="font-body text-sm text-[#8f9fb7]">
              Open to full-time roles, freelance projects, and open-source collaborations. Typical response time: &lt;24 hours.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-[#0a1839] p-8 md:p-10 rounded-2xl border border-[#32457c]/20 shadow-2xl glow-border">
          <h3 className="font-headline text-2xl font-bold text-[#dfe4ff] mb-8">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-label text-xs text-[#6073ad] uppercase tracking-wider">
                  Full Name <span className="text-[#47c4ff]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Gobinda Adhikari"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#070d1f] border border-[#32457c]/30 focus:border-[#47c4ff] rounded-lg px-4 py-3 text-[#dfe4ff] placeholder:text-[#32457c] font-body text-sm outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-label text-xs text-[#6073ad] uppercase tracking-wider">
                  Email <span className="text-[#47c4ff]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="gobinda3113@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#070d1f] border border-[#32457c]/30 focus:border-[#47c4ff] rounded-lg px-4 py-3 text-[#dfe4ff] placeholder:text-[#32457c] font-body text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-label text-xs text-[#6073ad] uppercase tracking-wider">Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-[#070d1f] border border-[#32457c]/30 focus:border-[#47c4ff] rounded-lg px-4 py-3 text-[#dfe4ff] font-body text-sm outline-none transition-colors"
              >
                <option value="" className="bg-[#070d1f]">Select a topic…</option>
                <option value="project" className="bg-[#070d1f]">New Project Inquiry</option>
                <option value="collab" className="bg-[#070d1f]">Collaboration / Partnership</option>
                <option value="job" className="bg-[#070d1f]">Job Opportunity</option>
                <option value="security" className="bg-[#070d1f]">Security Consultation</option>
                <option value="other" className="bg-[#070d1f]">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-label text-xs text-[#6073ad] uppercase tracking-wider">
                Message <span className="text-[#47c4ff]">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Tell me about your project or idea…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#070d1f] border border-[#32457c]/30 focus:border-[#47c4ff] rounded-lg px-4 py-3 text-[#dfe4ff] placeholder:text-[#32457c] font-body text-sm outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#47c4ff] to-[#05a9e3] text-[#003b52] font-label font-bold py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Icon icon="mdi:send" className="text-lg" />
              Send Transmission
            </button>
          </form>

          {/* Email Fallback for when mailto links don't work */}
          {showEmailFallback && (
            <div className="mt-8 p-6 bg-[#0a1839] border border-[#32457c]/40 rounded-xl">
              <h3 className="font-label text-[#47c4ff] text-sm uppercase tracking-wider mb-4">
                Email Client Not Available
              </h3>
              <p className="font-body text-[#c4c7c9] text-sm mb-4">
                Please copy the message below and send it to gobinda3113@gmail.com
              </p>
              <div className="bg-[#070d1f] border border-[#32457c]/30 rounded-lg p-4">
                <pre className="text-[#dfe4ff] text-sm whitespace-pre-wrap font-mono">
                  {emailContent}
                </pre>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(emailContent);
                  addToast("Message copied to clipboard!", "success");
                }}
                className="mt-4 bg-[#47c4ff] text-[#003b52] font-label font-bold py-2 px-4 rounded-lg hover:brightness-110 transition-all"
              >
                Copy Message
              </button>
              <button
                onClick={() => setShowEmailFallback(false)}
                className="mt-2 ml-2 bg-[#32457c] text-[#dfe4ff] font-label py-2 px-4 rounded-lg hover:bg-[#40528a] transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full py-16 border-t border-[#0a2257]/30 bg-[#070d1f]">
      <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="text-center">
          <div className="font-headline font-black text-2xl tracking-tighter text-[#dfe4ff]">GOBINDA.AD</div>
          <p className="font-label text-xs text-[#6073ad] mt-1">Full Stack Architect & Security Researcher</p>
        </div>

        {/* Nav */}
        <div className="flex flex-wrap justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-label text-xs uppercase tracking-[0.2em] text-[#6073ad] hover:text-[#47c4ff] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          {[
            { icon: "mdi:github", label: "GitHub", href: "https://github.com/gobinda3113" },
            { icon: "mdi:linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/gobinda-adhikari-33bbb2213" },
            { icon: "mdi:facebook", label: "Facebook", href: "https://www.facebook.com/gobinda.adhikari.9634340" },
            { icon: "mdi:email", label: "Email", href: "mailto:gobinda3113@gmail.com" },
          ].map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              title={label}
              className="w-10 h-10 rounded-full bg-[#09122b] border border-[#32457c]/30 flex items-center justify-center text-[#6073ad] hover:text-[#47c4ff] hover:border-[#47c4ff]/40 transition-all"
            >
              <Icon icon={icon} className="text-base" />
            </a>
          ))}
        </div>

        <div className="h-px w-full max-w-sm bg-gradient-to-r from-transparent via-[#32457c]/40 to-transparent" />

        <div className="text-center space-y-1">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#32457c]">
            © 2024 Gobinda Adhikari. All rights reserved.
          </p>
          <p className="font-label text-[10px] text-[#47c4ff] flex items-center justify-center gap-1.5">
            Built with React, Vite & Tailwind CSS{" "}
            <Icon icon="mdi:heart" className="text-[10px] text-red-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────────
function Navbar({
  activeSection,
  mobileOpen,
  setMobileOpen,
}: {
  activeSection: string;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#070d1f]/90 backdrop-blur-3xl border-b border-[#0a2257]/40 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
        <a href="#" className="text-xl font-black tracking-tighter text-[#dfe4ff] font-headline hover:text-[#47c4ff] transition-colors">
          GOBINDA.AD
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {NAV_LINKS.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                className={`font-body text-sm transition-all duration-200 pb-1 ${
                  isActive
                    ? "text-[#47c4ff] border-b-2 border-[#47c4ff]"
                    : "text-[#c4c7c9] hover:text-[#dfe4ff] border-b-2 border-transparent"
                }`}
              >
                {link}
              </a>
            );
          })}
          <a
            href="#"
            className="font-label bg-gradient-to-br from-[#47c4ff] to-[#05a9e3] text-[#003b52] px-6 py-2 rounded-lg hover:brightness-110 active:scale-95 transition-all font-bold text-sm"
          >
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#dfe4ff] w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#0a1839] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon icon={mobileOpen ? "mdi:close" : "mdi:menu"} className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#070d1f]/95 backdrop-blur-3xl border-b border-[#0a2257]/40 px-8 py-6 flex flex-col gap-4 animate-fade-in-up">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="font-body text-[#c4c7c9] hover:text-[#47c4ff] py-2 border-b border-[#0a2257]/30 transition-colors"
            >
              {link}
            </a>
          ))}
          <a href="#" className="font-label bg-[#47c4ff] text-[#003b52] px-6 py-3 rounded-lg font-bold text-center mt-2">
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}

function Sidebar({ activeSection }: { activeSection: string }) {
  const items = [
    { icon: "dashboard", label: "Overview", href: "#" },
    { icon: "work", label: "Work", href: "#work" },
    { icon: "analytics", label: "Tech", href: "#tech" },
    { icon: "person", label: "About", href: "#about" },
    { icon: "mail", label: "Contact", href: "#contact" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-16 hover:w-56 transition-all duration-500 z-40 border-r border-[#0a2257]/20 bg-[#09122b]/80 backdrop-blur-xl hidden lg:flex flex-col py-24 gap-8 px-3 overflow-hidden group">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#47c4ff] to-[#2db7f2] flex items-center justify-center shrink-0 mx-auto">
        <span className="font-headline font-black text-[#003b52] text-sm">G</span>
      </div>
      <nav className="flex flex-col gap-2 mt-4">
        {items.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
              activeSection === label.toLowerCase()
                ? "bg-[#47c4ff]/10 text-[#47c4ff] border border-[#47c4ff]/20"
                : "text-[#6073ad] hover:bg-[#0a1839] hover:text-[#dfe4ff]"
            }`}
          >
            <Icon icon={icon} className="text-xl shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 font-label text-sm whitespace-nowrap transition-opacity duration-300">
              {label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const addToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Active section tracker
  useEffect(() => {
    const sections = ["work", "tech", "about", "philosophy", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#070d1f] text-[#dfe4ff] min-h-screen">
      <Navbar activeSection={activeSection} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Sidebar activeSection={activeSection} />

      <main className="lg:ml-16">
        <HeroSection onCTA={scrollToWork} />
        <StatsSection />
        <WorkSection addToast={addToast} />
        <TechSection />
        <AboutSection />
        <GitHubSection />
        <PhilosophySection />
        <ContactSection addToast={addToast} />
        <Footer />
      </main>

      <Toast toasts={toasts} remove={removeToast} />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#0a1839] border border-[#32457c]/40 flex items-center justify-center text-[#47c4ff] hover:bg-[#47c4ff] hover:text-[#003b52] transition-all shadow-lg z-50"
        title="Back to top"
      >
        <Icon icon="mdi:arrow-up" className="text-lg" />
      </button>
    </div>
  );
}
