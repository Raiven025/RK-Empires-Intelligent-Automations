# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Static marketing site for RK Empires Intelligent Automations, live at **https://rk-empires.com/** via GitHub Pages serving the `main` branch root (custom domain set in `CNAME`). There is no build step, framework, linter, or test suite — pushing to `main` deploys the live site directly.

## Repository Boundaries

Two nested directories are **separate git repositories**, excluded by the root `.gitignore` and managed independently. Never commit their files from this repo; run git commands inside those directories instead.

- `rk-empires-platform/` — platform frontend (React 18 + Vite, TailwindCSS, Zustand, React Router, Axios). Commands: `npm run dev`, `npm run build`, `npm run preview`.
- `rk-empires-api/` — platform backend (Express + Prisma + PostgreSQL, JWT auth). Commands: `npm run dev` (nodemon), `npm start`, `npm run migrate`, `npm run seed`, `npm run studio`, `npm run generate`.

`PLATFORM_PLAN.md` documents the platform architecture (marketing site stays untouched; frontend targets app.rk-empires.com, backend targets api.rk-empires.com).

## Local Preview (marketing site)

```bash
python -m http.server 8080
```

Or VS Code Live Server. **Do not open `index.html` as a `file:///` URL** — the Web3Forms contact form requires an HTTP origin and will fail.

## Site Structure

- `index.html` — the homepage (sections: `#about`, `#services`, `#testimonials`, `#audit`, `#booking`, `#stack`, `#contact`). Semantic HTML only — all styles live in `assets/css/styles.css` and all scripts in `assets/js/main.js`; do not add inline `<style>` or `<script>` blocks. Line 101 is a very long base64-embedded profile photo — never read/edit that line directly.
- `portfolio/index.html` — dedicated portfolio page (`/portfolio/`), linked standalone from the nav. Features the brand identity project (logo + brand guidelines) first, then the automation case studies (RK Empires Platform, SubTrack) that used to live on the homepage. Shares `assets/css/styles.css` and `assets/js/main.js` (use absolute `/assets/...` paths from subpages).
- `assets/js/main.js` — custom cursor, canvas particle background, scroll-reveal, contact form submission (Web3Forms), WhatsApp mobile/desktop handling.
- `login/index.html` and `admin/login/index.html` — standalone client/admin login pages styled to match the site theme.
- `assets/images/` — brand assets: `rk-empires-logo.jpeg` (primary logo, 1254×1254), `rk-empires-brand-guidelines.png` (brand guidelines sheet — the design source of truth), `rk-empires-logo-192.png` (nav/login logo), plus `favicon.ico`, `apple-touch-icon.png`, and `og-image.jpg` all derived from the logo. If the logo changes, regenerate the derived files at the same names/sizes (Python + Pillow is available).
- `robots.txt`, `sitemap.xml` — update `<lastmod>` in `sitemap.xml` when deploying; `sitemap.xml` lists `/` and `/portfolio/`.
- `index.html.bak` / `index.html.bak2` — historical backups, gitignored; do not edit.

## Conventions & Gotchas

- **Use `&mdash;` instead of literal em dash characters in HTML files.** Literal em dashes were previously corrupted by encoding issues and had to be mass-replaced (see commit `139b4eb`).
- All external links with `target="_blank"` must keep `rel="noopener noreferrer"`.
- Preserve the accessibility guards: `prefers-reduced-motion` disables animations, the custom cursor, and the canvas background; the WhatsApp div button must stay keyboard-operable (Enter/Space); form status messages use `role=alert` / `aria-live`.
- Site theme (from `assets/images/rk-empires-brand-guidelines.png`): black backgrounds (`#0d0d0d` / `#141414` / `#1a1a1a`) with gold accents — primary gold `#d4af37`, deep gold `#b8860b`, light gold `#f0d77b`. Headings/logo use Playfair Display; body text uses Montserrat (loaded from the jsDelivr fontsource CDN). Brand tagline: "Automate · Innovate · Elevate". The login pages follow the same scheme.
- Keep this CLAUDE.md updated whenever the site structure, branding, or conventions change — the owner expects it to always reflect the current state of the repo.
- The Web3Forms access key, Calendly URL, WhatsApp number, and social links embedded in `index.html` are public-facing by design (documented in `README.md`); never add private keys or credentials to any frontend file.
- Manual QA and deployment checklists live in `README.md` and `DEPLOYMENT.md` — the QA checklist there is the closest thing this repo has to a test suite.
