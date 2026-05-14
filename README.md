# RK Empires Intelligent Automations

AI-powered automation services landing page for Raiven Kaizer Moreno. Custom workflows, chatbots, and system integrations — delivered remotely, worldwide.

---

## File Structure

```
/
├── index.html                   # Main HTML page (semantic, no inline styles or scripts)
├── assets/
│   ├── css/
│   │   └── styles.css           # All page styles (extracted from inline <style>)
│   ├── js/
│   │   └── main.js              # All page scripts (cursor, canvas, reveal, form, WhatsApp)
│   └── images/
│       ├── favicon.ico          # TODO: browser tab icon (32×32 .ico)
│       ├── apple-touch-icon.png # TODO: iOS home screen icon (180×180 px PNG)
│       └── og-image.jpg         # TODO: social share image (1200×630 px JPG)
├── robots.txt                   # Search engine crawl rules
├── sitemap.xml                  # XML sitemap for search engines
├── index.html.bak               # Phase 1 original backup
├── index.html.bak2              # Phase 2 pre-refactor backup
└── README.md
```

---

## Local Preview

### Option 1 — VS Code Live Server (recommended)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

### Option 2 — Python (no install needed)
```bash
python -m http.server 8080
```
Then open `http://localhost:8080`

> **Note:** Do not open `index.html` directly as a `file:///` URL — the Web3Forms contact form requires an HTTP request and will fail without a server.

---

## Third-Party Integrations

| Integration | Value | Notes |
|---|---|---|
| Web3Forms | `6c6bdc98-c07e-4ae8-a7b9-b59d2b7dfc0d` | Contact form submissions |
| Calendly | `https://calendly.com/rk-empires01/30min` | All booking CTAs |
| WhatsApp | `639485609968` | Mobile: opens chat; Desktop: shows notice |
| Facebook / Messenger | `https://www.facebook.com/rkempiresintelligentautomations` | Booking card + float button |
| LinkedIn | `https://linkedin.com/in/raiven-moreno-7543821b0` | Social links |

---

## Live Domain

Domain replacement is **complete**. Detected from `CNAME`: `rk-empires.com`

| File | Line | Field | Live value |
|---|---|---|---|
| `index.html` | 12 | `<link rel="canonical">` `href` | `https://rk-empires.com/` |
| `index.html` | 18 | `<meta property="og:url">` `content` | `https://rk-empires.com/` |
| `index.html` | 21 | `<meta property="og:image">` `content` | `https://rk-empires.com/assets/images/og-image.jpg` |
| `index.html` | 25 | `<meta name="twitter:url">` `content` | `https://rk-empires.com/` |
| `index.html` | 28 | `<meta name="twitter:image">` `content` | `https://rk-empires.com/assets/images/og-image.jpg` |
| `index.html` | 36 | JSON-LD `"url"` | `https://rk-empires.com/` |
| `robots.txt` | 4 | `Sitemap:` directive | `https://rk-empires.com/sitemap.xml` |
| `sitemap.xml` | 4 | `<loc>` | `https://rk-empires.com/` |

> Update `<lastmod>` in `sitemap.xml` to today’s date when you deploy.

### Image files
- [x] `assets/images/favicon.ico` — generated (32×32 PNG-in-ICO)
- [x] `assets/images/apple-touch-icon.png` — generated (180×180 PNG)
- [x] `assets/images/og-image.jpg` — generated (1200×630 JPEG)

---

## Required Image Assets

Three image files are referenced in `index.html`. All have been generated and committed. Replace with custom branded versions any time before or after launch.

| File | Size | Format | Purpose |
|---|---|---|---|
| `assets/images/favicon.ico` | 32×32 px | ICO | Browser tab icon |
| `assets/images/apple-touch-icon.png` | 180×180 px | PNG | iOS/Android home screen icon |
| `assets/images/og-image.jpg` | 1200×630 px | JPG | Social share preview (Facebook, LinkedIn, X) |

### OG Image Design Brief

| Property | Value |
|---|---|
| **Text line 1** | RK Empires Intelligent Automations |
| **Text line 2** | AI Automation Systems for Growing Businesses |
| **Background** | Dark navy/black (`#040810`) matching site theme |
| **Accent colour** | Cyan `#00d4ff` for text highlights or borders |
| **Style** | Cyber / AI tech — grid lines, particle dots, or gradient glows |
| **Readable at** | 600×315 px thumbnail (Facebook/LinkedIn preview size) |

Free tools to create this: [Canva](https://canva.com) (custom size 1200×630), [Figma](https://figma.com), or any image editor. Export as `.jpg` at 80–90% quality.

### Expected 404s Until Images Are Created

Until the three image files are placed in `assets/images/`, the browser will log these **expected and harmless** 404 errors in the Network tab:

```
GET /assets/images/favicon.ico       404
GET /assets/images/apple-touch-icon.png  404
```

The `og-image.jpg` 404 is silent (not fetched by the browser at page load — only by social crawlers). **The page renders and all functionality works normally without these files.**

---

## Manual QA Checklist

### Functionality
- [ ] Page loads with no browser console errors
- [ ] All navigation anchors scroll to correct sections (#about, #services, #portfolio, #audit, #booking, #contact)
- [ ] Contact form: fill Name + Email + Message → submit → success message appears
- [ ] Contact form: submit with empty Message → browser validation blocks it
- [ ] All "Book a Free Call" buttons open Calendly in a new tab
- [ ] Facebook / Messenger links open the correct Facebook page
- [ ] WhatsApp button on **mobile**: opens `wa.me/639485609968`
- [ ] WhatsApp button on **desktop**: shows "📱 WhatsApp works on mobile" notice

### Accessibility
- [ ] Tab through page — cyan focus ring visible on links, buttons, and the WhatsApp div button
- [ ] Press Enter or Space on the WhatsApp button — triggers WhatsApp handler
- [ ] Screen reader announces form success/error messages (role=alert, aria-live)

### Responsive Layout
- [ ] 390px — nav links hidden, audit cards stack 1-col, Messenger button collapses to circle
- [ ] 768px — two-column layouts transition correctly
- [ ] Desktop — full layout, custom cursor appears

### Reduced Motion
- [ ] Chrome DevTools → Rendering → Emulate CSS media → `prefers-reduced-motion: reduce`
- [ ] No CSS animations or transitions
- [ ] All `.reveal` elements visible immediately
- [ ] Custom cursor hidden
- [ ] Canvas particle background hidden

---

## Final Pre-Deploy Checklist

Run through this list once before making the site public. Use a local server (`Live Server` or `python -m http.server 8080`) — not `file:///`.

### Files & Network
- [ ] Local server is running
- [ ] `assets/css/styles.css` returns **200** in DevTools → Network tab
- [ ] `assets/js/main.js` returns **200** in DevTools → Network tab
- [ ] `robots.txt` is accessible at `http://localhost:8080/robots.txt`
- [ ] `sitemap.xml` is accessible at `http://localhost:8080/sitemap.xml`
- [ ] Browser console shows **zero errors** on page load

### Navigation & Links
- [ ] All nav anchors scroll to correct sections: `#about` `#services` `#portfolio` `#audit` `#booking` `#contact`
- [ ] All footer anchors scroll to correct sections
- [ ] All `target="_blank"` external links have `rel="noopener noreferrer"` *(already verified in QA pass)*
- [ ] All Calendly links open `https://calendly.com/rk-empires01/30min` in a new tab
- [ ] Facebook / Messenger links open the correct Facebook page
- [ ] LinkedIn link opens the correct profile

### Forms & Integrations
- [ ] Contact form: fill Name + Email + Message → **Send Message** → success banner appears
- [ ] Contact form: submit without Message → browser blocks it (required field)
- [ ] Web3Forms email received in inbox after test submission
- [ ] WhatsApp button on **mobile**: opens `wa.me/639485609968`
- [ ] WhatsApp button on **desktop**: shows mobile-only notice

### Accessibility & Responsive
- [ ] Tab key navigates through page — cyan focus ring visible on all interactive elements
- [ ] Press `Enter` or `Space` on the WhatsApp button — triggers handler
- [ ] DevTools → Rendering → `prefers-reduced-motion: reduce` → no animations, cursor hidden, canvas hidden, all `.reveal` content visible
- [ ] DevTools → device toolbar → **390px** — nav collapses, audit cards stack, Messenger button is circle
- [ ] DevTools → device toolbar → **768px** — two-column layouts transition correctly
- [ ] Desktop — custom cursor visible and tracking

### Domain & Metadata (pre-launch only)
- [x] Domain set to `rk-empires.com` — all 8 metadata fields updated
- [x] `assets/images/favicon.ico` — generated and committed
- [x] `assets/images/apple-touch-icon.png` — generated and committed
- [x] `assets/images/og-image.jpg` — generated and committed
- [ ] OG/Twitter preview tested via [opengraph.xyz](https://www.opengraph.xyz) or [cards-dev.twitter.com](https://cards-dev.twitter.com/validator)

---

## Deployment Notes

This is a plain static site — no build step required.

### Pre-deployment checklist
- [x] Domain replacement complete — live domain `rk-empires.com` set in all files
- [x] Image assets generated and committed (`favicon.ico`, `apple-touch-icon.png`, `og-image.jpg`)
- [x] `og:image` and `twitter:image` updated to `https://rk-empires.com/assets/images/og-image.jpg`
- [ ] Verify Web3Forms access key is active at [web3forms.com](https://web3forms.com)
- [ ] Test the contact form from the **deployed URL** (not `localhost`) after going live

### GitHub Pages (Active — CNAME set to `rk-empires.com`)
1. Go to repo **Settings → Pages**
2. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)`
3. Confirm custom domain field shows `rk-empires.com` (CNAME file already in repo)
4. Wait for DNS propagation — site goes live at `https://rk-empires.com/`

### Netlify (alternative)
1. Connect `Raiven025/RK-Empires-Intelligent-Automations` repo in Netlify dashboard
2. **Publish directory:** `/` — **Build command:** *(leave empty)*
3. Add custom domain `rk-empires.com` under Domain Settings

### Vercel
1. Push project root to GitHub
2. Import project in Vercel dashboard
3. **Framework Preset:** Other
4. **Root Directory:** `./` (project root)
5. **Build command:** *(leave empty)*
6. **Output directory:** `./`
7. Deploy.

### GitHub Pages
1. Go to repo **Settings → Pages**
2. **Source:** Deploy from branch
3. **Branch:** `main` / `(root)`
4. Save — site publishes at `https://Raiven025.github.io/RK-Empires-Intelligent-Automations/`
5. For a custom domain: add a `CNAME` file with your domain (already present in this repo)

> **Web3Forms note:** After deploying, submit the contact form once from the live URL to confirm it routes to your inbox. Web3Forms free tier allows up to 250 submissions/month.

---

## Security & Privacy

- **No secrets in this repo.** All values in `index.html` are public-facing by design.
- **Web3Forms access key** (`access_key`) is intentionally embedded in the HTML form — Web3Forms is designed this way. Monitor your dashboard at [web3forms.com](https://web3forms.com) for unexpected submissions. Rotate the key if abuse is detected.
- **Never place private API keys, database credentials, or service account tokens** in any frontend file (`index.html`, `assets/js/main.js`, etc.). Anything in these files is readable by any visitor.
- **All external links** with `target="_blank"` must keep `rel="noopener noreferrer"` to prevent reverse tabnapping. This has been applied to all 10 external links.
- **`robots.txt`** is public and tells search engines what to crawl. Do not list private paths here — listing them reveals their existence. This site has no private paths.

---

## Phase History

| Phase | Description |
|---|---|
| Phase 1 | SEO meta tags, Open Graph, Twitter/X card, JSON-LD, cursor/canvas accessibility guards, prefers-reduced-motion, Automation Audit section, contact form hardening, keyboard accessibility |
| QA Pass | Added `rel="noopener noreferrer"` to all 10 external `target="_blank"` links |
| Phase 2 | Refactored into `/assets/css/styles.css` + `/assets/js/main.js` structure |
| Phase 2 QA | Regression pass — zero issues found, all checks passed |
| Phase 3 | Added favicon/apple-touch-icon refs, created `robots.txt` + `sitemap.xml`, fixed JSON-LD URL trailing slash, expanded README with deployment checklists and security notes |
| Phase 4 | Domain replacement checklist (8 fields across 3 files), OG image design brief, 404 explanation for missing assets, Final Pre-Deploy Checklist with all launch criteria |
