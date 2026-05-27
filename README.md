# FPS

A fully-responsive Next.js 14 media production house website.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **Data:** JSON files in `/data` (easy to swap for SQLite later)

## Project Structure

```
.
├── app/
│   ├── layout.tsx          Root layout (Header + Footer)
│   ├── page.tsx            Homepage (all sections)
│   ├── globals.css         Global styles + Tailwind
│   └── api/contact/        Contact form endpoint (writes to data/messages.json)
├── components/
│   ├── Header.tsx          Sticky nav with mobile drawer
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── Clients.tsx         Trusted-by strip
│   ├── About.tsx           "Who We Are" + 3 pillars
│   ├── Services.tsx        5 services from JSON
│   ├── Studio.tsx          Two-pillar split (Studio / Originals)
│   ├── Portfolio.tsx       Filterable gallery
│   ├── Stats.tsx           Animated count-up
│   ├── BehindTheScene.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx         Form posts to /api/contact
│   └── Reveal.tsx          Scroll-reveal animation wrapper
├── data/
│   ├── site.json           Brand info, contact, social
│   ├── services.json
│   ├── portfolio.json
│   ├── testimonials.json
│   ├── stats.json
│   ├── bts.json
│   └── clients.json
└── lib/
    └── data.ts             Typed loaders for JSON
```

## Run Locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000 (or 3001 if 3000 is busy)

## Build

```bash
npm run build
npm start
```

> Tip: don't run `next build` while `next dev` is also running — it overwrites the dev server's chunks and breaks hot reload. Stop dev first, then build.

## Editing Content

All site content lives in `/data/*.json`. Edit any file and refresh — no code changes needed.

- **Add a service:** append an entry to `data/services.json` (use one of these icons: `Palette`, `Video`, `Mic`, `Camera`, `Film`)
- **Add a portfolio item:** append to `data/portfolio.json`
- **Update contact details / brand name:** edit `data/site.json`

## Switching to SQLite later

Data is read through `lib/data.ts`. Replace the JSON imports with Prisma/Drizzle queries and the components keep working — they only depend on the exported `services`, `portfolio`, `testimonials`, `stats`, `bts`, `clients`, and `site` constants.

## Responsive Breakpoints

- Mobile-first design (default)
- `sm` (640px), `md` (768px), `lg` (1024px) — fully tested layouts
- Mobile drawer menu in the header on screens < `md`
