# GOBINDA.AD — Portfolio Design System

> **Project:** Digital Portfolio for Gobinda Adhikari — Full Stack Architect & Security Researcher
> **Domain:** https://gobindaadhikari.com.np
> **Host:** Cloudflare Pages

---

## 1. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | React | 19.2.3 |
| **Language** | TypeScript | 5.9.3 |
| **Build Tool** | Vite | 7.3.2 |
| **CSS Framework** | Tailwind CSS | 4.1.17 |
| **Icons** | @iconify/react (Iconify) | 6.0.2 |
| **Fonts** | Google Fonts (Manrope, Inter, Space Grotesk) | — |
| **Class Utility** | clsx + tailwind-merge | 2.1.1 / 3.4.0 |
| **Plugins** | @vitejs/plugin-react, @tailwindcss/vite, vite-plugin-singlefile | — |
| **Deployment** | Cloudflare Pages + gh-pages | — |
| **Security** | security.txt, CNAME, custom robots.txt | — |

### Core Dependencies

```json
{
  "@iconify/react": "^6.0.2",
  "clsx": "2.1.1",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "tailwind-merge": "3.4.0"
}
```

### Dev Dependencies

```json
{
  "@tailwindcss/vite": "4.1.17",
  "@types/react": "19.2.7",
  "@types/react-dom": "19.2.3",
  "@vitejs/plugin-react": "5.1.1",
  "tailwindcss": "4.1.17",
  "typescript": "5.9.3",
  "vite": "^7.3.2",
  "vite-plugin-singlefile": "2.3.0",
  "gh-pages": "^6.3.0"
}
```

---

## 2. Project Architecture

### File Structure

```
/
├── design/
│   └── design.md                  ← This file
├── public/
│   ├── _headers                    # Cloudflare headers (noindex)
│   ├── CNAME                       # Custom domain
│   ├── favicon.ico / .png / .svg   # Brand favicons
│   ├── robots.txt                  # AI crawler blocking
│   └── .well-known/
│       └── security.txt            # Security disclosure policy
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # SPA — all components inline (~1395 lines)
│   ├── index.css                   # Tailwind v4 imports + custom CSS
│   ├── types/
│   │   └── index.ts                # Project, Skill, Toast interfaces
│   ├── utils/
│   │   └── cn.ts                   # clsx + tailwind-merge utility
├── index.html                      # HTML shell with font preconnect
├── vite.config.ts                  # Vite config (React + Tailwind + alias)
├── tsconfig.json                   # Strict TypeScript config
└── package.json
```

### Component Tree

```
App
├── Toast (notification system)
├── Navbar
│   ├── Desktop nav links
│   ├── Resume button
│   └── Mobile toggle button + mobile menu panel
├── Sidebar (desktop only: lg breakpoint)
├── main
│   ├── HeroSection
│   │   ├── Typing effect role text
│   │   ├── Avatar with decorative elements
│   │   ├── CTA buttons (View Projects, Contact Me, Resume)
│   │   └── Social strip (GitHub, LinkedIn, Facebook)
│   ├── StatsSection
│   │   └── StatCard × 4 (auto-count-up animation)
│   ├── WorkSection
│   │   ├── Filter buttons
│   │   ├── Project cards (masonry-like grid)
│   │   └── ProjectModal (full detail overlay)
│   ├── TechSection
│   │   ├── Category tabs (Frontend, Backend, Database, DevOps)
│   │   ├── SkillBar × 4 per category
│   │   └── Tag cloud
│   ├── AboutSection
│   │   ├── Story + Timeline
│   │   └── Trait cards (6x)
│   ├── GitHubSection
│   │   ├── ContributionGraph (32-week heatmap)
│   │   └── GitHub stats
│   ├── PhilosophySection
│   │   ├── Quote block
│   │   └── Principle cards (3x)
│   ├── ContactSection
│   │   ├── Contact links (email, GitHub, LinkedIn, Facebook, location)
│   │   ├── Availability card
│   │   └── Contact form with email fallback
│   └── Footer
├── Back to top button
```

---

## 3. Design System

### 3.1 Color Palette

The theme is defined in `src/index.css` via Tailwind v4's `@theme` directive.

#### Surfaces & Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-background` | `#1e293b` | Main page background (slate-800) |
| `--color-surface` | `#1e293b` | Default surface |
| `--color-surface-container-lowest` | `#0f172a` | Darkest surface (slate-900) |
| `--color-surface-container-low` | `#263548` | Section alternate background |
| `--color-surface-container` | `#2d3f55` | Cards, containers, form backgrounds |
| `--color-surface-container-high` | `#354a62` | Elevated surfaces |
| `--color-surface-container-highest` | `#3d5470` | Highest elevated surfaces |
| `--color-surface-variant` | `#3d5470` | Variant surface |

#### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-on-surface` | `#f1f5f9` | Primary text (slate-100) |
| `--color-on-surface-variant` | `#cbd5e1` | Secondary text (slate-300) |
| `--color-primary` | `#e2e8f0` | Primary text (slate-200) |
| `--color-secondary` | `#94a3b8` | Muted text (slate-400) |

#### Accent (Tertiary)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-tertiary` | `#47c4ff` | Primary accent — links, highlights, buttons |
| `--color-tertiary-dim` | `#05a9e3` | Darker accent |
| `--color-tertiary-container` | `#2db7f2` | Container accent |
| `--color-on-tertiary` | `#003b52` | Text on accent (dark) |

#### Other

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-outline` | `#6073ad` | Borders, dividers |
| `--color-error` | `#ee7d77` | Error states |
| `--color-inverse-surface` | `#faf8ff` | Inverse surface |

#### Semantic Colors (from `index.css`)

- **Green (status):** `#22c55e` — Live badge, "Open to Work", "Available"
- **Amber (status):** `#fbbf24` — "In Dev" badge
- **Red:** `#ef4444` — Error toasts
- **Gradient text:** `linear-gradient(135deg, #47c4ff, #2db7f2, #47c4ff)`

### 3.2 Typography

| Font | Weight Used | CSS Variable | Usage |
|------|-------------|-------------|-------|
| **Manrope** | 200, 400, 700, 800 | `--font-headline` | Headings, hero text |
| **Inter** | 300, 400, 600 | `--font-body` | Body paragraphs, descriptions |
| **Space Grotesk** | 300, 500, 700 | `--font-label` | Labels, badges, buttons, stats |

#### Type Scale

| Element | Class | Size (Mobile) | Size (Desktop) |
|---------|-------|---------------|----------------|
| Hero name | `text-6xl md:text-8xl font-extrabold` | 3.75rem (60px) | 6rem (96px) |
| Section heading | `text-5xl font-extrabold` | 3rem (48px) | 3rem (48px) |
| Subheading | `text-4xl font-extrabold` | 2.25rem (36px) | 2.25rem (36px) |
| Section subtitle | `text-xs uppercase tracking-[0.3em]` | 0.75rem (12px) | 0.75rem (12px) |
| Body text | `text-lg font-body` | 1.125rem (18px) | 1.125rem (18px) |
| Body small | `text-sm font-body` | 0.875rem (14px) | 0.875rem (14px) |
| Labels | `text-xs font-label` | 0.75rem (12px) | 0.75rem (12px) |
| Blockquote | `text-4xl md:text-6xl` | 2.25rem (36px) | 3.75rem (60px) |
| Icon default | `text-base` or `text-lg` | 1rem / 1.125rem | — |

### 3.3 Spacing & Layout

- **Section padding:** `py-32 px-8 md:px-24` (vertical: 8rem / 128px; horizontal: 2rem / 32px mobile → 6rem / 96px desktop)
- **Section gap (between sections):** Natural flow via `py-32`
- **Max content width:** `max-w-7xl` (80rem / 1280px) for most sections, `max-w-6xl` (72rem / 1152px) for hero, `max-w-5xl` (64rem / 1024px) for stats, `max-w-4xl` (56rem / 896px) for philosophy
- **Content centering:** `mx-auto` on all container divs
- **Grid gaps:** `gap-12` (3rem) for 2-column grids, `gap-4` to `gap-6` for card grids
- **Card padding:** `p-6` to `p-8` (1.5–2rem)
- **Sidebar width:** `w-40` (10rem / 160px), expands to `w-56` (14rem / 224px) on hover
- **Main offset (desktop):** `lg:ml-40` to accommodate sidebar

### 3.4 Borders & Radius

| Token | Value | Usage |
|-------|-------|-------|
| Border color default | `#475569/30` or `#475569/20` | Cards, containers |
| Border color accent | `#47c4ff` / `#47c4ff/40` | Active states, focus |
| Border radius | `rounded-xl` (0.75rem) | Cards, containers |
| Border radius | `rounded-lg` (0.5rem) | Buttons, inputs |
| Border radius | `rounded-2xl` (1rem) | Modal, avatar |
| Border radius | `rounded-full` | Badges, tabs, avatars |

### 3.5 Shadows & Glass

- **Glass panel:** `background: rgba(11, 29, 72, 0.75); backdrop-filter: blur(24px)`
- **Glow border:** `box-shadow: 0 0 0 1px rgba(71, 196, 255, 0.3), inset 0 0 40px rgba(71, 196, 255, 0.03)`
- **Glow border hover:** Enhanced to `0.6` alpha + `0 10px 40px` outer glow
- **Button shadow:** `shadow-lg shadow-[#47c4ff]/20` (CTA buttons)
- **Navbar backdrop:** `backdrop-blur-3xl` when scrolled
- **Modal backdrop:** `backdrop-filter: blur(12px)`

---

## 4. Component Details

### 4.1 Navbar (`src/App.tsx:1201-1285`)

- **Position:** Fixed top, full width, z-50
- **States:** Transparent when at top, `bg-[#1e293b]/90 backdrop-blur-3xl` with bottom border when scrolled (>50px)
- **Desktop (≥768px):** Horizontal nav links with active section underline indicator + Resume button
- **Mobile (<768px):** Hamburger menu icon (md:hidden). Toggle reveals full-screen menu panel with animate-fade-in-up. Icon toggles between `mdi:menu` and `mdi:close`
- **Logo:** "GOBINDA.AD" in Manrope black, links to top

### 4.2 Sidebar (`src/App.tsx:1287-1324`)

- **Visibility:** `hidden lg:flex` — only on desktop (≥1024px)
- **Position:** Fixed left, full height, z-40
- **Width:** `w-40` default, expands to `w-56` on hover (group hover)
- **Labels:** Hidden by default (`opacity-0`), fade in on sidebar hover (`group-hover:opacity-100`)
- **Active section:** Highlighted with `bg-[#47c4ff]/10` + border accent
- **Icon:** Gradient badge "G" in top center

### 4.3 HeroSection (`src/App.tsx:436-552`)

- **Background:** Decorative blobs (`w-[600px] h-[600px]`, blur-[120px], animate-float), dot-grid pattern
- **Layout:** 12-column grid — 7 cols text + 5 cols avatar
- **Typing effect:** Cycles through roles with typewriter animation (80ms speed, 2000ms pause)
- **Avatar:** Rounded-2xl, grayscale → full color on hover, scale on hover. Glass badge overlays ("Open to Work" pulse, "48-day streak")
- **Orbit decoration:** Rotating circle with dot on desktop
- **Scroll indicator:** Bottom-center, animate-bounce with chevron

### 4.4 StatsSection (`src/App.tsx:555-566`)

- **Data:** Projects Shipped (10+), GitHub Contributions (2482+), Highest Streak (48 days), Open Source PRs (137+)
- **Animation:** Count-up on scroll visibility (cubic ease-out, 2000ms duration)
- **Grid:** 2 cols mobile, 4 cols desktop
- **Cards:** `bg-[#2d3f55]` with `glow-border`

### 4.5 WorkSection (`src/App.tsx:630-737`)

- **Filter:** 5 options (All, Cybersecurity, E-Commerce, Open Source, Analytics) — pill buttons
- **Grid:** 1 col mobile, 12-col responsive grid desktop
- **Cards:** Use `colSpan` and `rowHeight` from project data for masonry-like layout
- **Hover:** Accent gradient overlay, slight lift (`translateY(-6px)`), enhanced glow shadow
- **Modal:** Full-screen overlay with detailed project info (long description, tech stack, links)
- **Empty state:** "Load More Projects" button shows toast notification

### 4.6 TechSection (`src/App.tsx:568-627`)

- **Category tabs:** Frontend, Backend, Database, DevOps & Security — pill buttons with active state highlight
- **Skill bars:** Animated width fill on scroll visibility (1s duration, 200ms delay). Gradient bar `from-[#47c4ff] to-[#2db7f2]`
- **Tag cloud:** 17 tech tags with scale hover effect

### 4.7 AboutSection (`src/App.tsx:740-808`)

- **Layout:** 2-column grid — story + timeline (left), trait cards (right)
- **Timeline:** Vertical line with dots, gradient line `from-[#47c4ff] to-transparent`
- **Trait cards:** 2x3 grid, each with icon + title + description. Hover glow effect
- **Scroll animations:** Fade + slide (left for left column, right for right column) on intersection

### 4.8 GitHubSection (`src/App.tsx:811-885`)

- **Contribution graph:** 32×7 randomized heatmap grid. 4 color levels: `bg-[#3d5470]`, `bg-[#47c4ff]/20`, `bg-[#47c4ff]/55`, `bg-[#47c4ff]`
- **Stats list:** Total Contributions, Highest Streak, Repositories, Stars Earned — bordered list
- **Bottom stats row:** "Most Used: TypeScript", "137 PRs Merged", "89 Issues Closed" — with icons
- **Container:** `bg-[#2d3f55] p-8 rounded-2xl` with glow border

### 4.9 PhilosophySection (`src/App.tsx:887-932`)

- **Background:** Large "INNOVATION" watermark text (15vw), dot pattern overlay
- **Quote:** Opening quote icon, then blockquote with gradient underline on "blueprint"
- **Attribution:** "Core Philosophy" with decorative horizontal rules
- **Principles:** 3 cards (Security First, Performance Obsessed, Human-Centered)

### 4.10 ContactSection (`src/App.tsx:935-1139`)

- **Layout:** 2-column — contact links + availability (left), form (right)
- **Social links:** 5 items with icon circles (w-12 h-12) + label text. Hover: icon circle fills with accent
- **Availability card:** Green pulse dot + "Currently Available" + subtext
- **Form:** Name, Email (required), Subject (dropdown), Message (required textarea). Gradient submit button
- **Email fallback:** When mailto fails (detected in web environments), shows pre-formatted email text with copy button
- **Fallback UI:** Dark code-block style container with copy + close buttons

### 4.11 Footer (`src/App.tsx:1142-1197`)

- **Content:** Logo "GOBINDA.AD", tagline, nav links, social icon circles (GitHub, LinkedIn, Facebook, Email), decorative gradient divider, copyright + "Built with" credit
- **Layout:** Full width, centered content, max-w-7xl container

### 4.12 Toast (`src/App.tsx:270-296`)

- **Position:** Fixed top-right (top-6 right-6), z-[200], pointer-events-none (container)
- **Types:** success (green), error (red), info (default)
- **Animation:** Slide-in-right on enter (0.4s ease-out), slide-out-right on exit
- **Auto-dismiss:** 5 seconds
- **Manual dismiss:** Close button per toast

### 4.13 Back to Top (`src/App.tsx:1386-1392`)

- **Position:** Fixed bottom-right (bottom-8 right-8), z-50
- **Hover:** Fills with accent color
- **Icon:** `mdi:arrow-up`

### 4.14 ProjectModal (`src/App.tsx:361-433`)

- **Overlay:** Fixed inset, z-[100], flex centered, blurred backdrop
- **Content:** Max-w-2xl, max-h-[85vh], scrollable, rounded-2xl
- **Accent header:** 2px colored bar at top matching project accent
- **Sections:** Status badge + year, title, subtitle, long description, tech stack tags, action buttons
- **Escape key:** Closes modal
- **Body overflow:** Hidden while modal is open

---

## 5. Animation & Interaction System

### 5.1 CSS Animations (defined in `index.css`)

| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| `fadeInUp` | 0.7s | ease-out | Modal content, mobile menu, section entries |
| `fadeInLeft` | 0.7s | ease-out | AboutSection left column |
| `fadeInRight` | 0.7s | ease-out | AboutSection right column |
| `pulse-glow` | 2s | ease-in-out | Avatar ring glow |
| `typing-cursor` | 1s | ease-in-out | Blinking cursor on typed text |
| `float` | 4s | ease-in-out | Decorative blobs, floating badges |
| `gradient-shift` | 3s | ease | Gradient text animation |
| `spin-slow` | 20s | linear | Orbit decoration in hero |
| `progress-fill` | 1.5s | ease-out | Skill bar fill |
| `slide-in-right` | 0.4s | ease-out | Toast enter |
| `slide-out-right` | 0.4s | ease-in | Toast exit |

### 5.2 Scroll-triggered Animations

- Using `IntersectionObserver` with `threshold: 0.15` for skill bars, stat counts, about section columns
- Elements start invisible (`opacity-0`) with translate offset, then transition to visible on intersection
- Timeline items have staggered delays via `style={{ transitionDelay: `${i * 100}ms` }}`

### 5.3 Hover Interactions

| Element | Effect |
|---------|--------|
| Project cards | Lift -6px, accent overlay, enhanced shadow, arrow icon animates |
| Nav links | Active: underline + accent color. Inactive: subtle color shift |
| Buttons | `active:scale-95` (press), `hover:brightness-110` |
| Social links | Icon circle fills with accent, text shifts to accent |
| Avatar | Grayscale → full color, scale 1→1.05 |
| Sidebar | Width expands from 160px to 224px, labels fade in |
| Glow border cards | Border glow intensifies on hover |
| Tech tags | Scale 1.05, background highlight |
| Contribution cells | Scale 1.5 on hover |

---

## 6. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|-----------|-------|----------|
| **Default (mobile)** | <640px | Single column, hamburger nav, full-width sections |
| **sm** | ≥640px | Minor adjustments (contribution cell size) |
| **md** | ≥768px | Desktop nav visible, 2-column layouts start |
| **lg** | ≥1024px | Sidebar visible, main content offset by ml-40 |
| **Max-width** | 1280px | Content containers capped at max-w-7xl |

### Mobile-specific Design Decisions

- **Nav:** Fixed top, hamburger toggle, full-height menu overlay with animated items
- **Sidebar:** Hidden entirely (display: none) below lg
- **Hero:** Single column stack (text on top, avatar below). CTA buttons stack vertically. Avatar reduced to w-72 h-72
- **Content sections:** Single column. Section padding via `px-8` (2rem). Headings left-aligned
- **Stats:** 2-column grid
- **Project cards:** Single column, full width
- **About:** Story on top, trait cards below in 2-column grid
- **GitHub:** Contribution graph horizontally scrollable (`overflow-x-auto`)
- **Contact:** Links on top, form below
- **Footer:** Single column, centered

---

## 7. Custom Hooks

### `useIntersectionObserver(threshold = 0.15)`
- Returns `{ ref, isVisible }` — observes element once, disconnects after first intersection
- Used by: StatsSection, TechSection, AboutSection, GitHubSection

### `useTypingEffect(words, speed = 80, pause = 2000)`
- Cycles through array of strings with typewriter effect
- Types character by character, pauses, then deletes and moves to next word
- Used by: HeroSection for role rotation

### `useCountUp(target, isVisible, duration = 2000)`
- Animates number from 0 to target when element becomes visible
- Uses cubic ease-out easing (`1 - pow(1 - progress, 3)`)
- Runs at ~60fps (16ms interval)
- Used by: StatCard

---

## 8. Data Models

```typescript
interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  stack: string[];
  colSpan: string;         // Tailwind grid column span (e.g. "md:col-span-6")
  rowHeight: string;       // Tailwind height (e.g. "h-[380px]")
  accent: string;          // Gradient class (e.g. "from-pink-500/20 to-rose-600/10")
  status: "Live" | "In Dev" | "Open Source";
  year: string;
  links: { live?: string; github?: string };
}

interface Skill {
  name: string;
  level: number;    // 0–100
  icon: string;     // Iconify icon name
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "error";
}
```

---

## 9. SEO & Performance

### Meta & SEO
- Title: "GOBINDA.AD | Full Stack Architect"
- Favicons in 3 formats (svg, ico, png)
- Custom robots.txt blocking AI crawlers (GPTBot, Claude, etc.) while allowing Google/Bing
- `X-Robots-Tag: noindex` on Cloudflare Pages
- security.txt for responsible disclosure

### Performance
- **Single-file build:** `vite-plugin-singlefile` bundles everything into one HTML file
- **Font optimization:** Google Fonts preconnect + preload in `<head>`
- **CSS:** Tailwind v4 with JIT — only used classes in output
- **Images:** External CDN (ibb.co) with grayscale filter reduced paint cost
- **Animations:** CSS-only animations where possible, GPU-composited properties (transform, opacity)
- **No runtime deps:** Minimal JS bundle — only React + Iconify

### Security
- No backend, no data storage
- Form uses mailto: links (no server-side processing)
- Contact form falls back to copy-to-clipboard when mailto is blocked

---

## 10. Accessibility & UX

- **Semantic HTML:** `nav`, `main`, `section`, `footer`, `blockquote`, `cite`, `aside`
- **Labels:** Hidden sr-only labels on icon-only buttons (though not currently implemented for mobile menu toggle)
- **Focus states:** Visible outline on interactive elements (input fields have `outline-none` with focus border color)
- **Color contrast:** Dark background (#1e293b) with light text (#f1f5f9) — high contrast ratio
- **Reduced motion:** No `prefers-reduced-motion` media queries currently implemented
- **Touch targets:** Buttons are min 40×40px (w-10 h-10), links have adequate spacing
- **Keyboard:** Escape closes modal, smooth scroll for anchor links

---

## 11. Deployment

| Detail | Value |
|--------|-------|
| Host | Cloudflare Pages |
| Custom domain | gobindaadhikari.com.np |
| Build command | `npm run build` |
| Output directory | `dist/` |
| Fallback | `gh-pages -d dist --dotfiles` |
| Headers | X-Robots-Tag: noindex (in `_headers`) |

---

## 12. Future Considerations

- Add `prefers-reduced-motion` support for accessibility
- Implement `sr-only` labels for all icon buttons
- Add actual GitHub contribution data via API instead of random mock
- Consider `loading="lazy"` for hero image
- Add dark/light mode toggle (already uses class="dark" on html)
- Implement proper form backend (e.g., Cloudflare Workers, Resend, EmailJS)
- Add analytics (e.g., Cloudflare Web Analytics)
- Consider multi-language support
