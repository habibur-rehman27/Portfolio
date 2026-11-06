<<<<<<< HEAD
# Habib-ur-Rehman — Personal Portfolio & AI Systems Console

An editorial, high-performance personal portfolio website built with **React 19, Vite, TypeScript, Tailwind CSS, and Framer Motion**. 

Designed under the **"Signal in the Noise"** aesthetic — a calm, dark "AI systems console" control room engineered for an AI Engineer and Full-Stack Developer. It features a blueprint dot-grid background, cursor spotlight, vertical timeline, capability matrices, interactive RAG architecture diagrams, and high-contrast accessibility.

---

## 🛠️ Tech Stack & Architecture

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS with custom CSS variables (Dark mode default + accessible warm-paper Light mode)
- **Animation**: Framer Motion (purposeful, smooth, respects `prefers-reduced-motion`)
- **Icons**: `lucide-react` (clean line icons, zero emojis)
- **Content Architecture**: Single typed file (`src/data/content.ts`) — all text, projects, credentials, and telemetry live here for effortless maintenance.

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js (v18+ or v20+ recommended)
- npm, pnpm, or yarn

### 1. Installation
```bash
git clone https://github.com/habibur-rehman27/Portfolio.git
cd Portfolio
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```text
Portfolio/
├── index.html                       # Semantic HTML5, anti-flash theme script, SEO & JSON-LD
├── package.json
├── tailwind.config.js               # Design tokens (hairline, electric lime, soft cyan)
├── postcss.config.js
├── vercel.json                      # Vercel SPA rewrites & caching
├── netlify.toml                     # Netlify SPA redirects & caching
├── public/
│   ├── favicon.svg                  # Terminal "HR." favicon with lime accent
│   ├── og-image.svg                 # 1200x630 social sharing preview card
│   ├── robots.txt                   # Search crawler directives
│   ├── sitemap.xml                  # Search index sitemap
│   └── Habib-ur-Rehman_CV.pdf       # Verified PDF download link
└── src/
    ├── main.tsx                     # Entry point
    ├── index.css                    # Tailwind layers, blueprint grid, print styles
    ├── App.tsx                      # Root layout with lazy-loaded sections
    ├── context/
    │   └── ThemeContext.tsx         # Dark / Light mode with localStorage & system sync
    ├── data/
    │   └── content.ts               # SINGLE SOURCE OF TRUTH for all content
    └── components/
        ├── SpotlightBackground.tsx  # Blueprint dot-grid with cursor spotlight glow
        ├── CustomCursor.tsx         # Desktop-only smooth magnetic cursor ring
        ├── Icons.tsx                # Strict SVG line icons (GitHub, LinkedIn)
        ├── Navbar.tsx               # Minimal sticky header, mobile drawer menu
        ├── Hero.tsx                 # Headline, typing subtitle, stats strip, live status
        ├── RagPipelineDiagram.tsx   # Hero slot SVG animated RAG architecture flow
        ├── About.tsx                # Bio narrative, "Currently" telemetry, photo frame
        ├── Experience.tsx           # Vertical timeline with 3 expandable internship phases
        ├── Skills.tsx               # Capability panels (primary AI/NLP + 5 domains)
        ├── Education.tsx            # BS CS record (CGPA 3.64), coursework & certifications
        ├── Projects.tsx             # Animated category filter tabs, featured 2-col cards
        ├── ProjectCard.tsx          # 3D tilt cards (max 3.5°), screenshot/pattern support
        ├── ProjectModal.tsx         # Accessible focus-trapped dialog with Esc trigger
        ├── ProjectArchitectureDiagram.tsx # Inline SVG flow diagrams for AI projects
        ├── Contact.tsx              # Click-to-copy email, form UI (prefilled mailto), socials
        ├── CommandPalette.tsx       # System command console (? or Ctrl+K shortcut)
        └── Footer.tsx               # Attribution, profile meta, and back-to-top button
```

---

## ✏️ How to Edit Content & Personalize

Everything is organized inside [`src/data/content.ts`](src/data/content.ts). You never have to touch component code to change facts, add links, or update your role.

### 1. Replacing Your Profile Photo
In `src/data/content.ts`, locate the `profile` object:
```typescript
export const profile: Profile = {
  // ...
  photoPath: '/profile.jpg', // Place your picture in /public/profile.jpg
  // ...
};
```
*If left as an empty string `""`, the site automatically renders an elegant, high-contrast `"HR"` initials badge.*

### 2. Updating Your CV
1. Replace [`public/Habib-ur-Rehman_CV.pdf`](public/Habib-ur-Rehman_CV.pdf) with your latest PDF file.
2. If you change the filename, update `cvPath: '/Your_New_CV.pdf'` in `src/data/content.ts`. All CV download buttons throughout the site update automatically.

### 3. Adding Project Links & Screenshots
In `src/data/content.ts`, locate the `projects` array:
```typescript
{
  id: 'fullstack-rag-platform',
  title: 'Full-Stack RAG Platform',
  liveUrl: 'https://your-live-demo.com',   // Leave empty "" to hide button gracefully
  githubUrl: 'https://github.com/your-repo', // Leave empty "" to hide button gracefully
  image: '/projects/rag-platform.png',      // Optional screenshot in /public/
  // ...
}
```
*If `image` is omitted, the card automatically generates a dark-themed blueprint grid header.*

### 4. Updating the Social Sharing / OG Image
Replace [`public/og-image.svg`](public/og-image.svg) (or put an `og-image.png` in `/public/`) and update `index.html` meta tags accordingly.

---

## 🌐 Step-by-Step Deployment

### Option A: Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your `Portfolio` repository.
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.
*The included `vercel.json` automatically configures single-page routing and long-term static asset caching.*

### Option B: Deploy to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/).
2. Select **Add new site** → **Import an existing project**.
3. Choose your GitHub repository.
4. Build settings are auto-detected from [`netlify.toml`](netlify.toml):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**.

---

## ⌨️ Command Console Shortcuts

Recruiters and visitors can navigate the site via keyboard commands at any time:
- Press <kbd>?</kbd> or <kbd>Ctrl+K</kbd> / <kbd>Cmd+K</kbd>: Open Command Palette
- Press <kbd>1</kbd> – <kbd>6</kbd>: Jump directly to About, Experience, Skills, Education, Projects, or Contact
- Press <kbd>T</kbd>: Toggle Dark / Light Theme
- Press <kbd>C</kbd>: Download CV (PDF)
- Press <kbd>Esc</kbd>: Close open modals or menus

---

## ✅ Personalization Checklist

Before final public launch, ensure you've customized:
- [ ] **Photo**: Add image to `/public/` and update `photoPath` in `src/data/content.ts`.
- [ ] **CV**: Verify [`/public/Habib-ur-Rehman_CV.pdf`](public/Habib-ur-Rehman_CV.pdf).
- [ ] **Project Repositories**: Fill in `githubUrl` for open-source repositories in `src/data/content.ts`.
- [ ] **Live Demos**: Fill in `liveUrl` for deployed applications in `src/data/content.ts`.
- [ ] **Project Screenshots**: Add optional preview images to `/public/projects/` and reference in `image`.
- [ ] **OG Social Preview**: Customize [`/public/og-image.svg`](public/og-image.svg).
- [ ] **Canonical URL**: Update `https://habibur-rehman.dev/` in `index.html`, `sitemap.xml`, and `robots.txt` with your custom domain.
=======
# Portfolio
>>>>>>> 8aae668a403dbac6659f0800a6b6e30d54bd08b8
