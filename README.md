# Vaishnavi Shrivastava — Portfolio (monorepo)

```
vaishnavi/
├── web/        # Next.js 16 (App Router, TypeScript) frontend
├── studio/     # Sanity Studio (standalone CMS)
└── _archive/   # the previous Vite build, kept for reference
```

## Run the site (works right now)

```bash
cd web
npm install        # if not already installed
npm run dev        # http://localhost:3000
```

The frontend renders from **built-in default content** until Sanity is
connected, so it works immediately. All content lives in
`web/src/lib/content.ts` as `defaultContent` and is overridden by Sanity
when available.

### What's in the frontend
- Glassmorphism navbar (no "VS" logo), **scroll progress bar**, **Lenis** smooth scroll
- **Lazy loading**: the WebGL orb, dome/accordion galleries and canvas
  backgrounds are `next/dynamic` client-only chunks; images use `next/image`
- WhatsApp button → `https://wa.me/919981783744`
- All the PDF revisions (new tagline, red "Visual Stories.", single tools strip,
  About moved below AI section, "Ready to create?" contact, etc.)

---

## Connect Sanity (two things to finish)

### 1. Fix project access  ⚠️ blocker
The CLI is logged in as **sonianshul96032@gmail.com**, and that account
reports: `project ID (jtaypzbk) not found, or you do not have access to it`.

Do one of these:
- **If the project is under a different account** → `npx sanity login` with the
  account that owns `jtaypzbk`.
- **If the ID is wrong** → put the correct ID in `web/.env.local`
  (`NEXT_PUBLIC_SANITY_PROJECT_ID`) and in `studio/sanity.config.ts` +
  `studio/sanity.cli.ts`.
- **If it doesn't exist yet** → create it: `cd studio && npx sanity init`
  (reuse this folder) or create one at https://www.sanity.io/manage, then set
  the new ID in the three places above.

### 2. Install + run the Studio
```bash
cd studio
npm install
npm run dev        # http://localhost:3333
```

> **Note — npm bug on this machine:** `npm@11.9.0` crashes with
> `TypeError: Invalid Version:` while resolving Sanity's dependency tree
> (hoisted/default strategy). If `npm install` fails, try, in order:
> 1. `npm install --omit=optional`
> 2. `npm install --install-strategy=nested` (then enable Windows long paths if
>    you hit `ENOENT`/path-too-long: set registry `LongPathsEnabled=1`)
> 3. use `pnpm install` or `yarn` for `studio/` only.

### 3. Add content
Open the Studio → **Site Settings** (hero, about, tools, contact) and
**Projects** (your Work items). The frontend picks them up automatically
(60s revalidate). The content model mirrors the current site exactly.

### 4. CORS + types
```bash
# allow the frontend to read drafts / live content
npx sanity cors add http://localhost:3000 --credentials   # run in studio/
# generate typed queries for the web app
cd studio && npm run typegen
```

## Content model
- **siteSettings** (singleton): hero, about, tools[], contact
- **project**: title, category, `section` (motion/short/long/ai), ratio,
  thumbnail, videoUrl, color, order
