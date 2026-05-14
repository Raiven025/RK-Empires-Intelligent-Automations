# RK Empires Intelligent Automations

AI-powered automation services landing page for Raiven Kaizer Moreno. Custom workflows, chatbots, and system integrations — delivered remotely, worldwide.

---

## File Structure

```
/
├── index.html                  # Main HTML page (semantic, no inline styles or scripts)
├── assets/
│   ├── css/
│   │   └── styles.css          # All page styles (extracted from inline <style>)
│   ├── js/
│   │   └── main.js             # All page scripts (cursor, canvas, reveal, form, WhatsApp)
│   └── images/                 # Static image assets (currently using inline base64 photo)
├── index.html.bak              # Phase 1 original backup
├── index.html.bak2             # Phase 2 pre-refactor backup
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

- [ ] `https://your-domain.com/` — canonical URL, Open Graph `og:url`, Twitter `twitter:url`, JSON-LD `url`
- [ ] `https://your-domain.com/og-image.jpg` — Open Graph `og:image` and Twitter `twitter:image` (recommended: 1200×630 px)
- [ ] Replace `https://your-domain.com` in JSON-LD structured data block in `<head>`

Search for `your-domain.com` in `index.html` to find all occurrences.

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

**Netlify / Vercel / GitHub Pages:**
1. Push the project root to a repository
2. Set publish directory to `/` (root)
3. No build command needed

**Before deploying:**
- Replace all `https://your-domain.com/` placeholders (see above)
- Upload an OG image and update the `og:image` / `twitter:image` URLs
- Verify the Web3Forms access key is still active

---

## Phase History

| Phase | Description |
|---|---|
| Phase 1 | SEO meta tags, Open Graph, Twitter/X card, JSON-LD, cursor/canvas accessibility guards, prefers-reduced-motion, Automation Audit section, contact form hardening, keyboard accessibility |
| QA Pass | Added `rel="noopener noreferrer"` to all 10 external `target="_blank"` links |
| Phase 2 | Refactored into `/assets/css/styles.css` + `/assets/js/main.js` structure |
