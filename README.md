# 🌌 Aura Study — AI-Powered Study Companion

Aura Study is a full-stack web app that helps students turn a topic or an uploaded document into **exam-ready notes, presentation slides, assignments, and study plans**. It routes requests across multiple LLM providers (Groq, Google Gemini, xAI Grok) with automatic health checks and fallbacks, so generation keeps working when one provider fails.

**🔗 Live demo:** https://studyai-ronitraj.vercel.app/
**📦 Repository:** https://github.com/Ronitraj07/aura-study

---

## ✨ Features

- **AI Notes Generator**: structured, exam-oriented or technical notes from a topic or subtopics, with AI-suggested subtopics and follow-up questions.
- **AI Presentation Builder**: slide decks with a live canvas, thumbnails, preview grid and charts, exported to PowerPoint (.pptx) and PDF.
- **Assignments**: create and edit assignments in a block-based editor.
- **Smart Checklist**: task tracker with drag-and-drop reordering.
- **Timetable**: plan your study schedule.
- **Document parsing**: upload PDF and DOCX files and use their content as context.
- **Authentication and profiles**: Supabase Auth with OAuth callback flow, protected routes, profile page.
- **AI Health Dashboard**: live status, latency and errors for each AI provider and model.
- **Polished UX**: dark/light theme, animations, responsive layout, error boundaries.

---

## 🧠 Architecture Highlights

### Multi-provider AI router with validation and fallback
Content types are routed to the model best suited for them. Each provider is health-checked before use, and requests fall through a three-tier chain on failure.

| Content type | Primary | Fallback chain |
|---|---|---|
| Exam notes | Gemini Flash | Groq Llama 70B → Groq fast model |
| Creative PPT | Grok | Groq Llama 70B → Groq fast model |
| Technical notes | Groq Llama 70B | Gemini Flash → Groq fast model |

- `GET /api/health` returns overall status (healthy / degraded / critical), per-model response times and recommendations.
- The `AIHealthDashboard` component surfaces this in the UI.

### Secure by design
- All LLM API keys live **server-side** in Vercel serverless/edge functions under `/api` and never reach the browser bundle.
- Supabase handles auth and data (see `SUPABASE_SETUP_GUIDE.md`).

### Engineering fixes
- Resolved HTTP 413 payload-too-large errors on large document uploads (see `FIX_413_PAYLOAD_ERROR.md`).

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, TypeScript, Vite, React Router |
| UI | Tailwind CSS, shadcn/ui (Radix UI), Framer Motion, Recharts, Lucide |
| State and data | TanStack React Query, React Hook Form, Zod |
| Backend | Vercel Serverless/Edge Functions (TypeScript) |
| AI providers | Groq, Google Gemini, xAI Grok |
| Database and auth | Supabase |
| Document handling | pdf-parse, Mammoth (DOCX), formidable |
| Export | PptxGenJS, jsPDF, html2canvas |
| Other | Pexels API, dnd-kit |
| Testing and tooling | Vitest, Testing Library, Playwright, ESLint |
| Deployment | Vercel, Vercel Analytics |

---

## 📁 Project Structure

```
aura-study/
├── api/                # Serverless functions: AI router, health checks,
│                       # generate, parse, Groq/Gemini/Grok adapters, Pexels
├── src/
│   ├── components/     # UI, slide canvas, checklist, AI health dashboard
│   ├── pages/          # Dashboard, Notes, PPT, Assignments, Checklist,
│   │                   # Timetable, Profile, Login, AuthCallback
│   ├── context/        # Global providers
│   ├── hooks/          # Custom hooks
│   ├── lib/ utils/     # Helpers and clients
│   └── types/          # TypeScript types
├── supabase/           # Database setup and migrations
└── public/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or Bun)
- A Supabase project
- API keys for Groq, Gemini and/or xAI Grok

### Installation

```bash
git clone https://github.com/Ronitraj07/aura-study.git
cd aura-study
npm install
cp .env.example .env
```

### Environment variables

```env
# Client
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Server-side only (never prefix with VITE_)
GROQ_API_KEY=your_groq_key
GROK_API_KEY=your_xai_key
GEMINI_API_KEY=your_gemini_key
```

### Run locally

```bash
npx vercel dev   # runs the Vite app and /api functions together
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | Lint the codebase |
| `npm test` | Run unit tests (Vitest) |

---

## ☁️ Deployment

1. Push the repo to GitHub and import it into Vercel.
2. Add the environment variables above in **Project → Settings → Environment Variables**.
3. Deploy. `vercel.json` handles routing.

---

## 🗺️ Roadmap

- [ ] Flashcards and spaced repetition
- [ ] Shareable notes and decks
- [ ] More export formats

---

## 👤 Author

**Ronit Raj**: [GitHub](https://github.com/Ronitraj07)
