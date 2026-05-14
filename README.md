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

## Placeholders to Replace Before Going Live

### In `index.html`
- [ ] `https://your-domain.com/` — canonical URL, `og:url`, `twitter:url`, JSON-LD `url` (6 occurrences — search `your-domain.com`)
- [ ] `https://your-domain.com/og-image.jpg` — `og:image` and `twitter:image` (2 occurrences)

### In `robots.txt`
- [ ] `https://your-domain.com/sitemap.xml` — replace with your real domain

### In `sitemap.xml`
- [ ] `https://your-domain.com/` — replace with your real domain
- [ ] `<lastmod>2026-05-14</lastmod>` — update when content changes

### Image files to create (see Required Image Assets below)
- [ ] `assets/images/favicon.ico`
- [ ] `assets/images/apple-touch-icon.png`
- [ ] `assets/images/og-image.jpg`

---

## Required Image Assets

Three image files are referenced in `index.html` but not yet created. Generate or design these before deploying:

| File | Size | Format | Purpose |
|---|---|---|---|
| `assets/images/favicon.ico` | 32×32 px | ICO | Browser tab icon |
| `assets/images/apple-touch-icon.png` | 180×180 px | PNG | iOS/Android home screen icon |
| `assets/images/og-image.jpg` | 1200×630 px | JPG | Social share preview (Facebook, LinkedIn, X) |

**Recommended OG image content:** Brand name + tagline on the dark cyber background (matching site theme). Text: *"RK Empires Intelligent Automations — AI-Powered Business Automation"*.

> Until these files exist, the browser tab will show a default icon and social shares will show no preview image. The page itself will render and function normally.

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

## Deployment Notes

This is a plain static site — no build step required.

### Pre-deployment checklist
- [ ] Replace all `https://your-domain.com/` placeholders in `index.html`, `robots.txt`, `sitemap.xml`
- [ ] Create and upload `assets/images/favicon.ico`, `apple-touch-icon.png`, `og-image.jpg`
- [ ] Update `og:image` and `twitter:image` URLs to point to the deployed OG image
- [ ] Verify Web3Forms access key is active at [web3forms.com](https://web3forms.com)
- [ ] Test the contact form from the **deployed URL** (not `localhost`) after going live

### Netlify
1. Push project root to GitHub
2. Connect repo in Netlify dashboard
3. **Publish directory:** `/` (or leave blank — root is default)
4. **Build command:** *(leave empty — no build step)*
5. Deploy. Custom domain can be configured under Domain Settings.

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
