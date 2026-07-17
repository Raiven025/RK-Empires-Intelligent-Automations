# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Static marketing site for RK Empires Intelligent Automations, live at **https://rk-empires.com/** via GitHub Pages serving the `main` branch root (custom domain set in `CNAME`). There is no build step, framework, linter, or test suite — pushing to `main` deploys the live site directly.

## Repository Boundaries

Three nested directories are **separate git repositories**, excluded by the root `.gitignore` and managed independently. Never commit their files from this repo; run git commands inside those directories instead.

The `.gitignore` patterns for them are root-anchored (`/rk-empires-platform/`, `/rk-empires-api/`, `/rk-empires-site/`) on purpose — unanchored patterns would also ignore same-named site paths like `portfolio/rk-empires-platform/`. Keep the leading slash.

- `rk-empires-platform/` — platform frontend (React 18 + Vite, TailwindCSS, Zustand, React Router, Axios). Commands: `npm run dev`, `npm run build`, `npm run preview`.
- `rk-empires-api/` — platform backend (Express + Prisma + PostgreSQL, JWT auth). Commands: `npm run dev` (nodemon), `npm start`, `npm run migrate`, `npm run seed`, `npm run studio`, `npm run generate`.
- `rk-empires-site/` — **Next.js rebuild of the marketing site** (Next 15 App Router, plain JSX, ported black+gold design, blog + lead capture + login SSO + Stripe booking). Commands: `npm run dev`, `npm run build`, `npm start`. Intended to replace this repo's static site once deployed to Vercel and DNS is cut over; until then the static site in this repo stays live. See `rk-empires-site/README.md` for deploy steps.

`PLATFORM_PLAN.md` documents the platform architecture (marketing site stays untouched; frontend targets app.rk-empires.com, backend targets api.rk-empires.com).

## Local Preview (marketing site)

```bash
python -m http.server 8080
```

Or VS Code Live Server. **Do not open `index.html` as a `file:///` URL** — the Web3Forms contact form requires an HTTP origin and will fail.

## Site Structure

- `index.html` — the homepage (sections: `#about`, `#services`, `#pricing` (Packages), `#testimonials`, `#audit`, `#booking`, `#stack`, `#faq`, `#contact`). Semantic HTML only — all styles live in `assets/css/styles.css` and all scripts in `assets/js/main.js`; do not add inline `<style>` or `<script>` blocks (the two JSON-LD `application/ld+json` blocks in `<head>` — ProfessionalService and FAQPage — are data, not scripts, and are the allowed exception). Line 101 is a very long base64-embedded profile photo — never read/edit that line directly. Keep the FAQPage JSON-LD in sync with the visible `#faq` accordion content.
- The Packages section (`#pricing`) deliberately has **no dollar prices** — tiers describe scope ("Single Workflow" / "Automation System" / "Full Operations") and every CTA routes to the free audit, matching the "custom quote for every project" positioning. Don't add prices without the owner providing them.
- `portfolio/index.html` — dedicated portfolio page (`/portfolio/`), linked standalone from the nav. Features the brand identity project (logo + brand guidelines) first, then the automation case-study cards. Shares `assets/css/styles.css` and `assets/js/main.js` (use absolute `/assets/...` paths from subpages).
- `portfolio/rk-empires-platform/index.html` and `portfolio/subtrack/index.html` — full case-study detail pages linked from the portfolio cards ("Read the full case study"). Results/metrics on these pages come only from copy that already existed on the site (testimonials, card impact lines) — don't invent new numbers.
- `book/index.html` and `book/success/index.html` — priority-deposit checkout page (`/book/`) and its payment-confirmed page. Scripts: `assets/js/book.js` (calls the production API `POST /public/checkout-session` with provider `paymongo` or `paypal`, redirects to the hosted checkout URL; shows an inline notice while providers are unconfigured) and `assets/js/book-success.js` (PayPal return capture via `POST /public/paypal/capture`). The homepage booking card and footer link to `/book/` ("Reserve Your Build Slot"). No amounts appear on-site — deposit amounts live in API env vars. These pages are an interim bridge that mirrors `rk-empires-site/app/book/` until the DNS cutover to the Next.js site; keep the two in sync if either changes.
- `404.html` — branded not-found page, served automatically by GitHub Pages; `noindex`.
- `assets/js/main.js` — custom cursor, canvas particle background, scroll-reveal, contact form submission (Web3Forms), WhatsApp mobile/desktop handling (on desktop, clicking the WhatsApp booking option reveals the `#wa-qr` QR code panel).
- `login/index.html` and `admin/login/index.html` — standalone client/admin login pages styled to match the site theme.
- `assets/images/` — brand assets: `rk-empires-logo.jpeg` (primary logo, 1254×1254) + `rk-empires-logo.webp`, `rk-empires-brand-guidelines.png` (brand guidelines sheet — the design source of truth) + `rk-empires-brand-guidelines.webp`, `rk-empires-logo-192.png` (nav/login logo), `whatsapp-qr.png` (encodes the wa.me link — regenerate if the WhatsApp number changes), plus `favicon.ico`, `apple-touch-icon.png`, and `og-image.jpg` (1200×630 social card: circular logo + Playfair/Montserrat text, generated with Pillow). If the logo changes, regenerate the derived files at the same names/sizes (Python + Pillow and the `qrcode` package are available). The big images are served via `<picture>` with WebP first, PNG/JPEG fallback.
- `robots.txt`, `sitemap.xml` — update `<lastmod>` in `sitemap.xml` when deploying; `sitemap.xml` lists `/`, `/book/`, `/portfolio/`, and the two case-study pages.
- `index.html.bak` / `index.html.bak2` — historical backups, gitignored; do not edit.

## Conventions & Gotchas

- **Use `&mdash;` instead of literal em dash characters in HTML files.** Literal em dashes were previously corrupted by encoding issues and had to be mass-replaced (see commit `139b4eb`).
- All external links with `target="_blank"` must keep `rel="noopener noreferrer"`.
- Preserve the accessibility guards: `prefers-reduced-motion` disables animations, the custom cursor, and the canvas background; the WhatsApp div button must stay keyboard-operable (Enter/Space); form status messages use `role=alert` / `aria-live`.
- Site theme (from `assets/images/rk-empires-brand-guidelines.png`): black backgrounds (`#0d0d0d` / `#141414` / `#1a1a1a`) with gold accents — primary gold `#d4af37`, deep gold `#b8860b`, light gold `#f0d77b`. Headings/logo use Playfair Display; body text uses Montserrat (loaded from the jsDelivr fontsource CDN). Brand tagline: "Automate · Innovate · Elevate". The login pages follow the same scheme.
- Keep this CLAUDE.md updated whenever the site structure, branding, or conventions change — the owner expects it to always reflect the current state of the repo.
- The Web3Forms access key, Calendly URL, WhatsApp number, and social links embedded in `index.html` are public-facing by design (documented in `README.md`); never add private keys or credentials to any frontend file.
- Manual QA and deployment checklists live in `README.md` and `DEPLOYMENT.md` — the QA checklist there is the closest thing this repo has to a test suite.
