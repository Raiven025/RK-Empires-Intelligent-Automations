# RK Empires — Deployment Runbook

Quick-reference launch guide. For full project documentation see `README.md`.

**Current commit:** `6cb570b` · Branch: `main` · Repo: `Raiven025/RK-Empires-Intelligent-Automations`

---

## Repository State

```
git status          # should return: nothing to commit, working tree clean
git log --oneline -1
```

This is a **plain static site** — no build step, no framework, no dependencies to install.

---

## Deployment Platforms

### Netlify (Recommended)

| Setting | Value |
|---|---|
| Build command | *(leave empty)* |
| Publish directory | `.` *(repository root)* |
| Framework preset | Static site / None |
| Node version | Not required |

**Steps:**
1. Log in to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connect GitHub → select `Raiven025/RK-Empires-Intelligent-Automations`
3. Leave build command blank, publish directory `.`
4. Click **Deploy site**
5. (Optional) Add custom domain under **Domain settings**

---

### Vercel

| Setting | Value |
|---|---|
| Framework preset | **Other** |
| Root directory | `./` *(project root)* |
| Build command | *(leave empty)* |
| Output directory | `./` |

**Steps:**
1. Log in to [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import `Raiven025/RK-Empires-Intelligent-Automations` from GitHub
3. Set Framework Preset to **Other**, leave build command empty, output directory `./`
4. Click **Deploy**
5. (Optional) Add custom domain under **Domains**

---

### GitHub Pages

| Setting | Value |
|---|---|
| Source | Deploy from branch |
| Branch | `main` |
| Directory | `/ (root)` |
| Custom domain | Add in Settings → Pages (CNAME file already present) |

**Steps:**
1. Go to repo **Settings → Pages**
2. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)`
3. Save — site publishes at `https://Raiven025.github.io/RK-Empires-Intelligent-Automations/`
4. For a custom domain: enter it in the **Custom domain** field (the `CNAME` file in the repo already supports this)

> **Note:** GitHub Pages serves from the repo URL path by default. If using a custom domain, the `assets/` relative paths in `index.html` will work correctly.

---

## Live Domain — Confirmed

Domain replacement is **complete**. Detected from `CNAME` file: `rk-empires.com`

### Live values set in source files

| File | Line | Field | Live value |
|---|---|---|---|
| `index.html` | 12 | `<link rel="canonical">` `href` | `https://rk-empires.com/` |
| `index.html` | 18 | `<meta property="og:url">` `content` | `https://rk-empires.com/` |
| `index.html` | 21 | `<meta property="og:image">` `content` | `https://rk-empires.com/og-image.jpg` |
| `index.html` | 25 | `<meta name="twitter:url">` `content` | `https://rk-empires.com/` |
| `index.html` | 28 | `<meta name="twitter:image">` `content` | `https://rk-empires.com/og-image.jpg` |
| `index.html` | 36 | JSON-LD `"url"` | `https://rk-empires.com/` |
| `robots.txt` | 4 | `Sitemap:` directive | `https://rk-empires.com/sitemap.xml` |
| `sitemap.xml` | 4 | `<loc>` | `https://rk-empires.com/` |

> Update `<lastmod>` in `sitemap.xml` to today’s date when you deploy.

---

## Image Assets Required Before Final Launch

Three files must be created and placed in `assets/images/` before going live.

| File | Dimensions | Format | Used for |
|---|---|---|---|
| `favicon.ico` | 32×32 px | ICO | Browser tab icon |
| `apple-touch-icon.png` | 180×180 px | PNG | iOS/Android home screen icon |
| `og-image.jpg` | 1200×630 px | JPG | Social share preview (Facebook, LinkedIn, X/Twitter) |

### OG Image Brief

| Property | Value |
|---|---|
| **Headline text** | AI Automation Systems for Growing Businesses |
| **Brand name** | RK Empires Intelligent Automations |
| **Background** | Dark navy `#040810` — matching the site |
| **Accent colours** | Cyan `#00d4ff`, blue `#0066ff`, green `#00ff88` |
| **Style** | Cyber/AI — grid lines, particle dots, gradient glows |
| **Minimum readable size** | 600×315 px (social card thumbnail) |
| **Export** | `.jpg` at 80–90% quality |

**Free tools:** [Canva](https://canva.com) (custom 1200×630), [Figma](https://figma.com)

> Until these files exist, favicon and apple-touch-icon will return **404** in the Network tab — this is harmless and expected. The page loads and all functionality works. The OG image 404 is silent (only hit by social crawlers, not the browser).

---

## Post-Deploy QA Checklist

Run this after the site goes live at the real URL.

### Core
- [ ] Homepage loads at deployed URL with no browser errors
- [ ] `assets/css/styles.css` returns **200** (DevTools → Network)
- [ ] `assets/js/main.js` returns **200** (DevTools → Network)
- [ ] Browser console shows **zero errors**
- [ ] `https://yourdomain.com/robots.txt` loads correctly
- [ ] `https://yourdomain.com/sitemap.xml` loads correctly

### Navigation & CTAs
- [ ] All nav anchors scroll to correct sections: `#about` `#services` `#portfolio` `#audit` `#booking` `#contact`
- [ ] All footer anchors work
- [ ] All **Book a Free Call** buttons open `https://calendly.com/rk-empires01/30min` in a new tab
- [ ] Facebook / Messenger float button opens the Facebook page
- [ ] Facebook link in Booking card opens the Facebook page
- [ ] LinkedIn link opens the correct profile

### WhatsApp & Contact Form
- [ ] WhatsApp button on **mobile**: opens `wa.me/639485609968`
- [ ] WhatsApp button on **desktop**: shows mobile-only notice
- [ ] Contact form: fill Name + Email + Message → **Send** → success banner appears
- [ ] Contact form: submit without required fields → browser blocks it
- [ ] Web3Forms email received in your inbox after test submission
- [ ] After confirming, log in to [web3forms.com](https://web3forms.com) and delete the test submission

### Accessibility & Responsive
- [ ] Tab key navigates page — cyan focus ring visible on all interactive elements
- [ ] `Enter` / `Space` on the WhatsApp div button triggers the handler
- [ ] DevTools → Rendering → `prefers-reduced-motion: reduce` → no animations, cursor hidden, canvas hidden
- [ ] DevTools → 390px → nav collapses, cards stack, Messenger button becomes circle
- [ ] DevTools → 768px → two-column layouts transition correctly
- [ ] Desktop → custom cursor visible and tracking mouse

### SEO & Social (after real domain + OG image)
- [ ] [opengraph.xyz](https://www.opengraph.xyz) shows correct title, description, and OG image
- [ ] [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) shows Twitter card preview
- [ ] [search.google.com/test/rich-results](https://search.google.com/test/rich-results) validates JSON-LD ProfessionalService schema
- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`

---

## Deployment Platform Recommendation

**Use Netlify** for this project.

| Reason | Detail |
|---|---|
| Zero config | Detects static site automatically, no settings needed |
| Instant previews | Every push to `main` auto-deploys |
| Free tier | Covers this site with room to spare |
| Custom domain | Free SSL, easy DNS setup |
| Form handling | Not needed here (Web3Forms handles it) but available if needed later |
| GitHub Pages | Already connected — works as fallback or alternative |

---

## Remaining Actions Before Live Launch

| Priority | Action |
|---|---|
| **Required** | Replace 8 `rk-empires.com` placeholder values (see table above) |
| **Required** | Create `assets/images/favicon.ico` (32×32) |
| **Required** | Create `assets/images/apple-touch-icon.png` (180×180) |
| **Required** | Create `assets/images/og-image.jpg` (1200×630 — see OG brief above) |
| **Required** | Choose deployment platform and connect repo |
| **Required** | Run Post-Deploy QA Checklist after first deploy |
| **Recommended** | Submit sitemap to Google Search Console after domain is live |
| **Recommended** | Test OG preview with opengraph.xyz after OG image is uploaded |
| **Optional** | Set up Netlify / Vercel email notifications for deploy failures |
