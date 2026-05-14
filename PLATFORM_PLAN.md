# RK Empires — Automation Intelligence Platform MVP Plan

**Status:** Planning · Live marketing site untouched at `https://rk-empires.com/`

---

## Recommended Architecture

```
Marketing site (live, unchanged)         Platform app (new, separate)
─────────────────────────────────        ────────────────────────────────────────
rk-empires.com                           app.rk-empires.com   (React frontend)
GitHub Pages                             Netlify / Vercel
Repo: RK-Empires-Intelligent-Automations  Repo: rk-empires-platform (NEW)

                                         api.rk-empires.com   (Express backend)
                                         Railway / Render
                                         Repo: rk-empires-api (NEW)  ← or monorepo
```

### Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | React 18 + Vite | Fast dev server, small bundles |
| Styling | TailwindCSS + shadcn/ui | Matches site accent palette |
| State | Zustand | Lightweight, no boilerplate |
| Forms | React Hook Form + Zod | Typed validation |
| HTTP client | Axios with interceptors | Auto-refresh access tokens |
| Backend | Node.js + Express | Familiar, fast to scaffold |
| ORM | Prisma | Type-safe, easy migrations |
| Database | PostgreSQL | Relational, audit-friendly |
| Auth | JWT access tokens + httpOnly refresh cookie | Stateless + secure |
| Hosting (FE) | Netlify or Vercel | Free tier, instant deploys |
| Hosting (BE) | Railway or Render | Managed Postgres + free tier |

---

## Development Structure Recommendation

**Use two separate repositories** in the same GitHub account.

```
github.com/Raiven025/rk-empires-platform   ← React frontend
github.com/Raiven025/rk-empires-api        ← Express + Prisma backend
```

**Why not a single repo or subfolder in the marketing repo?**

| Option | Risk | Verdict |
|---|---|---|
| Subfolder in marketing repo | `git push` deploys code changes next to live files | ❌ |
| Monorepo (separate folder, separate deploy) | Safe but complex to configure | ⚠️ Later |
| Two separate repos | Zero blast radius, independent CI/CD | ✅ Recommended |

---

## Folder Structure

### `rk-empires-api` (Backend)

```
rk-empires-api/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Auto-generated migration files
├── src/
│   ├── config/
│   │   ├── env.js             # Validated env vars (zod)
│   │   └── db.js              # Prisma client singleton
│   ├── middleware/
│   │   ├── auth.js            # JWT verify, role guard
│   │   ├── rateLimiter.js     # express-rate-limit config
│   │   ├── validate.js        # Zod request validation
│   │   └── audit.js           # Auto-write audit_logs on mutating routes
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── clients.routes.js
│   │   ├── automations.routes.js
│   │   ├── integrations.routes.js
│   │   ├── workflowRuns.routes.js
│   │   └── logs.routes.js
│   ├── controllers/           # One file per resource
│   ├── services/              # Business logic, separate from HTTP layer
│   ├── utils/
│   │   ├── hash.js            # bcrypt helpers
│   │   ├── jwt.js             # sign/verify access + refresh tokens
│   │   └── response.js        # Consistent { success, data, error } shape
│   └── app.js                 # Express setup, middleware, routes
├── .env.example               # Template — never commit .env
├── .gitignore
├── package.json
└── README.md
```

### `rk-empires-platform` (Frontend)

```
rk-empires-platform/
├── public/
├── src/
│   ├── api/
│   │   ├── axios.js           # Base instance with interceptors
│   │   ├── auth.api.js
│   │   ├── clients.api.js
│   │   ├── automations.api.js
│   │   ├── integrations.api.js
│   │   └── logs.api.js
│   ├── components/
│   │   ├── ui/                # shadcn/ui generated components
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TopBar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── shared/            # DataTable, StatusBadge, ConfirmDialog, etc.
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Clients/
│   │   │   ├── ClientsIndex.jsx
│   │   │   └── ClientDetail.jsx
│   │   ├── Automations/
│   │   │   ├── AutomationsIndex.jsx
│   │   │   └── AutomationDetail.jsx
│   │   ├── Integrations.jsx
│   │   ├── Logs/
│   │   │   ├── ActivityLogs.jsx
│   │   │   └── AuditLogs.jsx
│   │   └── Settings/
│   │       ├── Settings.jsx
│   │       └── UserManagement.jsx
│   ├── store/
│   │   ├── auth.store.js      # Zustand: user, role, token
│   │   └── ui.store.js        # Sidebar open/close, theme
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── usePermission.js   # Role-gated rendering
│   ├── lib/
│   │   └── utils.js           # cn(), formatDate(), etc.
│   ├── App.jsx                # Routes
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## Database Schema

```sql
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── users ────────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  NOT NULL DEFAULT 'VIEWER',  -- OWNER | ADMIN | VIEWER
  is_active     BOOLEAN      NOT NULL DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── clients ──────────────────────────────────────────────────────────────────
CREATE TABLE clients (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255),
  phone       VARCHAR(50),
  company     VARCHAR(255),
  status      VARCHAR(20)  NOT NULL DEFAULT 'active',  -- active | inactive | prospect
  notes       TEXT,
  created_by  UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── automations ──────────────────────────────────────────────────────────────
CREATE TABLE automations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID REFERENCES clients(id) ON DELETE SET NULL,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  type        VARCHAR(100),                            -- email_workflow | chatbot | api_integration | ...
  status      VARCHAR(20)  NOT NULL DEFAULT 'draft',  -- draft | active | paused | archived
  config      JSONB        NOT NULL DEFAULT '{}',     -- non-secret runtime config
  created_by  UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── integrations ─────────────────────────────────────────────────────────────
CREATE TABLE integrations (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id  UUID REFERENCES automations(id) ON DELETE CASCADE,
  name           VARCHAR(255) NOT NULL,
  provider       VARCHAR(100) NOT NULL,               -- n8n | mailchimp | openai | calendly | ...
  status         VARCHAR(20)  NOT NULL DEFAULT 'connected',  -- connected | disconnected | error
  config         JSONB        NOT NULL DEFAULT '{}',  -- public config only, NO secrets
  created_by     UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── workflow_runs ─────────────────────────────────────────────────────────────
CREATE TABLE workflow_runs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id  UUID REFERENCES automations(id) ON DELETE CASCADE,
  triggered_by   UUID REFERENCES users(id) ON DELETE SET NULL,
  status         VARCHAR(20)  NOT NULL DEFAULT 'running',  -- running | success | failed | cancelled
  started_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  completed_at   TIMESTAMPTZ,
  duration_ms    INTEGER,
  input          JSONB        NOT NULL DEFAULT '{}',
  output         JSONB        NOT NULL DEFAULT '{}',
  error_message  TEXT
);

-- ── activity_logs ─────────────────────────────────────────────────────────────
CREATE TABLE activity_logs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id    UUID REFERENCES automations(id) ON DELETE SET NULL,
  workflow_run_id  UUID REFERENCES workflow_runs(id) ON DELETE SET NULL,
  level            VARCHAR(20)  NOT NULL DEFAULT 'info',  -- info | warning | error
  message          TEXT         NOT NULL,
  metadata         JSONB        NOT NULL DEFAULT '{}',
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── audit_logs ────────────────────────────────────────────────────────────────
CREATE TABLE audit_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  action       VARCHAR(100) NOT NULL,   -- user.login | client.created | automation.deleted | ...
  entity_type  VARCHAR(50),             -- user | client | automation | integration
  entity_id    UUID,
  old_values   JSONB,
  new_values   JSONB,
  ip_address   VARCHAR(45),
  user_agent   TEXT,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── refresh_tokens ────────────────────────────────────────────────────────────
CREATE TABLE refresh_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash  VARCHAR(255) UNIQUE NOT NULL,  -- hashed, never store raw
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at  TIMESTAMPTZ                   -- NULL = still valid
);
```

---

## API Route List

All routes prefixed `/api/v1`. All protected routes require `Authorization: Bearer <access_token>`.

### Auth
```
POST  /auth/login          Public    — email + password → access token + set refresh cookie
POST  /auth/refresh        Cookie    — rotate refresh token → new access token
POST  /auth/logout         Auth      — revoke refresh token, clear cookie
GET   /auth/me             Auth      — return current user profile
```

### Users
```
GET    /users              OWNER     — list all users
POST   /users              OWNER     — create user
GET    /users/:id          OWNER     — get user
PUT    /users/:id          OWNER     — update user (name, role, is_active)
DELETE /users/:id          OWNER     — deactivate user (soft delete)
```

### Clients
```
GET    /clients            AUTH      — list clients (paginated, filterable)
POST   /clients            ADMIN+    — create client
GET    /clients/:id        AUTH      — get client + linked automations
PUT    /clients/:id        ADMIN+    — update client
DELETE /clients/:id        OWNER     — archive client
```

### Automations
```
GET    /automations           AUTH    — list (filter by client, status, type)
POST   /automations           ADMIN+  — create
GET    /automations/:id       AUTH    — get + linked integrations + last 10 runs
PUT    /automations/:id       ADMIN+  — update
DELETE /automations/:id       OWNER   — archive
POST   /automations/:id/run   ADMIN+  — trigger manual run
POST   /automations/:id/pause ADMIN+  — pause active automation
```

### Integrations
```
GET    /integrations         AUTH    — list
POST   /integrations         ADMIN+  — add integration
GET    /integrations/:id     AUTH    — get
PUT    /integrations/:id     ADMIN+  — update
DELETE /integrations/:id     ADMIN+  — remove
```

### Workflow Runs
```
GET    /workflow-runs           AUTH  — list all runs (paginated)
GET    /workflow-runs/:id       AUTH  — run detail + activity logs
GET    /automations/:id/runs    AUTH  — runs for a specific automation
```

### Logs
```
GET    /logs/activity           AUTH        — activity logs (filterable by level, automation, date)
GET    /logs/audit              ADMIN+      — audit trail (filterable by user, action, date)
```

---

## Frontend Route List

```
/login                          Public — redirect to /dashboard if already authed
/dashboard                      Auth   — KPI overview: clients, automations, recent runs
/clients                        Auth   — table of all clients
/clients/:id                    Auth   — client detail + linked automations
/automations                    Auth   — table of all automations
/automations/:id                Auth   — automation detail + runs history
/integrations                   Auth   — all integrations across automations
/logs/activity                  Auth   — filterable activity log feed
/logs/audit                     Admin+ — full audit trail
/settings                       Auth   — personal profile, password change
/settings/users                 Owner  — user management (create, role change, deactivate)
```

---

## Security Checklist

### Authentication
- [ ] Passwords hashed with `bcrypt` (rounds: 12)
- [ ] Access tokens: short-lived JWT (15 min), signed with `HS256`, secret in env
- [ ] Refresh tokens: long-lived (7 days), stored as `SHA-256(token)` in DB
- [ ] Refresh token delivered via `httpOnly; Secure; SameSite=Strict` cookie
- [ ] Refresh token rotation on every use — old token revoked immediately
- [ ] Refresh token revoked on logout

### Authorization
- [ ] Every protected route checks JWT validity before role check
- [ ] Role hierarchy enforced server-side: `OWNER > ADMIN > VIEWER`
- [ ] Viewers cannot mutate any resource
- [ ] Only OWNER can manage users

### Transport & Headers
- [ ] HTTPS enforced (handled by host — Render/Railway)
- [ ] `helmet` middleware for secure HTTP headers
- [ ] CORS restricted to `app.rk-empires.com` and `localhost:5173` (dev only)
- [ ] `express-rate-limit` on `/auth/login` — max 10 req/15 min per IP

### Input
- [ ] All request bodies validated with Zod schemas before hitting controllers
- [ ] UUIDs validated before DB queries (prevents injection via ID params)
- [ ] `config` and `metadata` JSONB fields stripped of any key containing `secret`, `key`, `token`, `password`

### Data
- [ ] No plaintext secrets stored in DB (integration secrets go to env or a secrets manager)
- [ ] `config` JSONB in integrations: public configuration only
- [ ] Audit log written automatically via middleware on all `POST`, `PUT`, `DELETE` routes

### Repository
- [ ] `.env` in `.gitignore`
- [ ] `.env.example` committed with all keys but no values
- [ ] No API keys, DB URLs, or JWT secrets in any committed file
- [ ] Dependabot enabled on GitHub

---

## Build Phases

### Phase 1 — Backend Foundation (Week 1)
1. Init `rk-empires-api` repo
2. Express app scaffold (`helmet`, `cors`, `cookie-parser`, `express-rate-limit`)
3. Prisma setup + PostgreSQL connection (Railway dev DB)
4. Database migrations for all 7 tables
5. `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `GET /auth/me`
6. JWT access token + httpOnly refresh cookie
7. Auth middleware + role guard middleware
8. Audit middleware (auto-log on mutating routes)
9. `.env.example` + README

**Deliverable:** Working auth API, testable in Postman / Thunder Client

### Phase 2 — Frontend Auth Shell (Week 1–2)
1. Init `rk-empires-platform` repo (Vite + React + TailwindCSS + shadcn/ui)
2. Axios instance with access token interceptor + silent refresh on 401
3. Zustand auth store (user, role, token)
4. Login page (email + password form, Zod validation)
5. Protected route wrapper + role guard component
6. Sidebar + TopBar layout shell (all nav links present, pages are stubs)
7. Deploy to Netlify (preview URL, not `app.rk-empires.com` yet)

**Deliverable:** Login works, protected route redirects, layout renders

### Phase 3 — Clients CRUD (Week 2)
1. Backend: clients routes + controller + service
2. Frontend: Clients index (DataTable with search/filter), Client detail, Create/Edit form, Delete confirm
3. Audit log entries for all client mutations

**Deliverable:** Full client management from the dashboard

### Phase 4 — Automations CRUD (Week 2–3)
1. Backend: automations routes + manual trigger + pause endpoint
2. Frontend: Automations index, Automation detail (+ integrations panel, runs history)
3. Status badge (draft / active / paused / archived)

**Deliverable:** Automations can be created, configured, and manually triggered

### Phase 5 — Integrations (Week 3)
1. Backend: integrations routes
2. Frontend: Integrations page (cards by provider), add/remove integration
3. Ensure no secrets enter the `config` JSONB column

**Deliverable:** Integrations linked to automations are visible and manageable

### Phase 6 — Logs & Activity Feed (Week 3–4)
1. Backend: activity_logs + audit_logs routes with pagination + filtering
2. Frontend: Activity log feed (level badges, metadata expand), Audit log table (ADMIN+ only)
3. Dashboard KPI cards wired to real data (active automations, total clients, last run status)

**Deliverable:** Full observability of automation runs and user actions

### Phase 7 — Settings, Users, Polish (Week 4)
1. Settings page: profile update, password change
2. User management page (OWNER only): invite user, change role, deactivate
3. Dashboard summary cards + recent activity widget
4. Mobile responsive check for all pages
5. Error boundaries + loading skeletons
6. Deploy backend to Railway (production), frontend to Netlify (production)
7. Point `app.rk-empires.com` → Netlify, `api.rk-empires.com` → Railway

**Deliverable:** MVP fully deployed, accessible at `app.rk-empires.com`

---

## Deployment Plan (Safe — Does Not Touch rk-empires.com)

```
DNS changes needed (add only — do not modify existing records):

Type    Name    Value
────    ────    ─────────────────────────────────────────
CNAME   app     [netlify-app-name].netlify.app
CNAME   api     [railway-service].up.railway.app
```

The existing `@` / `www` / root CNAME record for `rk-empires.com` → GitHub Pages is **untouched**.

**Staging before production:**
1. Dev: `localhost:5173` (FE) + `localhost:3000` (BE) + local PostgreSQL
2. Preview: Netlify preview URL + Railway dev service + Railway dev DB
3. Production: `app.rk-empires.com` + `api.rk-empires.com` + Railway production DB

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| JWT secret leaked to GitHub | Low | Critical | `.env` in `.gitignore`, `.env.example` only |
| Refresh token not rotated → session hijack | Medium | High | Rotate + revoke old token on every refresh |
| CORS misconfigured → marketing site can call API | Medium | Medium | Allowlist only `app.rk-empires.com` + `localhost` |
| DB credentials in frontend bundle | Low | Critical | API URL only in frontend — DB is never exposed |
| Marketing site broken by DNS change | Low | High | Only ADD new subdomain records, never modify existing |
| Prisma migration wipes prod data | Medium | Critical | Never run `prisma migrate reset` in production |
| Rate limit too loose → brute force login | Medium | High | 10 attempts / 15 min per IP on `/auth/login` |
| VIEWER role escalation via client-side check | Medium | High | **Always** enforce roles server-side, never trust frontend |

---

## Environment Variables Template

### Backend `.env.example`
```env
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@host:5432/rk_empires_platform

# JWT
JWT_ACCESS_SECRET=replace_with_64_char_random_string
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=replace_with_different_64_char_random_string
JWT_REFRESH_EXPIRES_IN=7d

# Cookie
COOKIE_SECRET=replace_with_32_char_random_string

# CORS
ALLOWED_ORIGIN=http://localhost:5173
```

### Frontend `.env.example`
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

---

## Next Prompt to Implement Phase 1

Copy and paste this to start Phase 1:

```
Phase 1 — Backend Foundation: rk-empires-api

Initialize a new Node.js + Express backend project in a new folder at:
C:\Users\Raiven\CascadeProjects\rk-empires-api

Stack:
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- cookie-parser (httpOnly refresh token)
- helmet, cors, express-rate-limit
- zod (request validation)

Tasks:
1. Create package.json with all required dependencies and scripts (dev, start, migrate, studio).
2. Create src/app.js with Express setup: helmet, cors, cookie-parser, JSON parser, rate limiter, routes.
3. Create prisma/schema.prisma with all 7 tables: users, clients, automations, integrations, workflow_runs, activity_logs, audit_logs, refresh_tokens.
4. Create src/config/env.js — validated env loader using zod.
5. Create src/utils/jwt.js — signAccessToken, signRefreshToken, verifyToken.
6. Create src/utils/hash.js — hashPassword, comparePassword.
7. Create src/middleware/auth.js — requireAuth (verify JWT), requireRole (role guard).
8. Create src/middleware/audit.js — write to audit_logs on POST/PUT/DELETE.
9. Create src/routes/auth.routes.js — POST /login, POST /refresh, POST /logout, GET /me.
10. Create src/controllers/auth.controller.js — full login/refresh/logout/me logic.
11. Create .env.example with all required keys.
12. Create .gitignore excluding node_modules, .env, dist.
13. Create README.md with setup instructions.

Do not create the database — I will provide the DATABASE_URL from Railway after setup.

Return:
- All files created.
- How to run locally.
- How to run the first migration.
- Environment variables needed before first run.
```
