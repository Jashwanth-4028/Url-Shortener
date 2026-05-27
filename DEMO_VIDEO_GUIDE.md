# SmartLink — Demo Video & Interview Guide

Use this document to record a **8–12 minute** walkthrough that sounds natural, confident, and student-authentic.

---

## 1. Full Demo Video Script

> Read this loosely — don’t sound like you’re reading a teleprompter. Pause between sections.

### [0:00 – 0:45] Introduction

“Hey, I’m [your name]. This is **SmartLink** — a URL shortener with an analytics dashboard I built for the Katomaran hackathon.

The idea is pretty simple: you shorten a link, share it, and actually see who clicked it — browser, device, daily trends — without paying for a premium analytics tier.

I’ll walk through the app, the database, and how the API fits together.”

---

### [0:45 – 1:30] Project overview

“On the landing page you can see it’s a clean SaaS-style layout — nothing too flashy. I kept the design practical: slate colors, one blue accent, mixed card sizes on the dashboard so it doesn’t look like a generic template.

Tech-wise it’s **React + Vite** on the front, **Node + Express + MongoDB** on the back, with **JWT auth** and **Chart.js** for analytics.”

*[Show landing page, scroll features + mock chart section]*

---

### [1:30 – 2:30] Authentication demo

“Let me log in. I seeded a demo account during setup — `demo@smartlink.dev` — so I don’t have to sign up live.

Login uses JWT. The token goes in localStorage, and Axios attaches it on every request. Protected routes like the dashboard check auth before rendering.

I’ll also quickly show signup — name, email, password hashed with bcrypt on the server.”

*[Login → mention signup page if you want a 5-second flash]*

---

### [2:30 – 4:00] URL shortening demo

“Here’s the dashboard. I’ll create a new short link.

I’m pasting `https://react.dev` — you can add a **custom alias** like `react-docs` and an optional **expiry date**.

When it saves, you get the short URL, click count starts at zero, and a **QR code** is generated automatically.”

*[Create link → show table row]*

“Copy button uses the clipboard API. **Edit** lets me change the destination without changing the short code — useful if a docs URL moves. **Delete** removes the link and its visit history.”

---

### [4:00 – 5:30] QR code & custom alias demo

“QR opens in a modal — it’s stored as a data URL from the backend. **Download PNG** saves it for posters or slides.

The custom alias `react-docs` means my short link is `localhost:5000/react-docs` instead of a random nanoid string.”

*[Open QR modal → download]*

---

### [5:30 – 7:00] Analytics demo (live clicks)

“Analytics is per-link. Here’s the 14-day trend chart, browser donut, device bar chart, and a click history list.

To prove tracking works, I’ll open the short link in a **new incognito tab** — that hits `GET /:shortCode` on the server, logs a Visit, bumps clicks, then redirects.

Back in analytics — refresh — and you should see the new visit.”

*[Open short URL in incognito → refresh analytics]*

---

### [7:00 – 7:45] Dashboard explanation

“The dashboard overview shows total clicks and active links. Recent activity is just the latest `lastVisited` times — quick glance, not over-engineered.

The table has original URL, short code, clicks, dates, and action buttons. Spacing is intentionally a bit uneven between cards — felt more natural than a perfect grid.”

---

### [7:45 – 8:30] Public stats page

“There’s also a **public stats** page at `/stats/short-code` — no login required. Good for sharing basic click counts without exposing full analytics.”

*[Navigate to /stats/gh-demo or your alias]*

---

### [8:30 – 9:30] Database explanation

“In MongoDB I have three collections:

- **User** — name, email, hashed password  
- **Url** — original URL, short code, clicks, QR, expiry  
- **Visit** — one row per redirect with browser, device, timestamp  

Clicks on the Url document are denormalized for fast dashboard loads; Visit powers the charts.”

*[Show MongoDB Compass or `mongosh` with sample documents]*

---

### [9:30 – 10:30] API explanation

“Auth: `POST /api/auth/register` and `login`. URLs: `create`, `myurls`, update, delete. Analytics: `GET /api/analytics/:id`. Public stats: `GET /api/url/public/:shortCode`.

The redirect route is `GET /:shortCode` — that’s separate from the SPA and runs on the API host in production.”

*[Optional: show Postman or Network tab for one request]*

---

### [10:30 – 11:15] Tech stack & architecture

“Frontend: React Router, Context API for auth and toasts, Tailwind for styling. Backend: Express with controllers, validation middleware, centralized error handler, and an analytics service that aggregates visits.

I used **nanoid** for random codes, **qrcode** for QR generation, and **validator** for URL/email checks.”

---

### [11:15 – 12:00] Challenges & future improvements

“Main challenges: making sure the catch-all redirect route didn’t break `/api` routes, and keeping analytics accurate with both a click counter and visit logs.

Next I’d add rate limiting on redirects, geo data, and maybe custom domains.

Thanks for watching — repo link is in the README. Happy to walk through any part in an interview.”

---

## 2. Professional Walkthrough Flow

| Order | What to show | Why |
|-------|----------------|-----|
| 1 | Landing | First impression |
| 2 | Login | Auth story |
| 3 | Create URL | Core feature |
| 4 | Table actions | Copy, edit, QR |
| 5 | Live click | Proves backend |
| 6 | Analytics | Differentiator |
| 7 | Public stats | Bonus feature |
| 8 | MongoDB | Data credibility |
| 9 | Code peek (30s) | Engineering depth |

---

## 3. Interview-Style Explanation (short version)

“If they only give me 2 minutes:

SmartLink shortens URLs and tracks every click with browser and device info. React dashboard, Express API, MongoDB. JWT protects user routes; public redirect route logs visits then 302s. I denormalized click counts for speed but store Visit documents for charts. Built for a hackathon — deployable on Vercel + Render + Atlas.”

---

## 4. Screen Recording Guide

### Best free screen recorders (Windows)
- **OBS Studio** — best quality, free
- **Xbox Game Bar** (`Win + G`) — quick clips
- **ShareX** — good for short demos

### Browser zoom
- Set browser zoom to **110%** so text is readable on mobile reviewers’ screens
- Hide bookmarks bar (Ctrl+Shift+B)

### Microphone tips
- Quiet room, mic 6–8 inches away
- Test 10 seconds of audio before full take
- Speak slightly slower than normal conversation

### Terminal visibility
- Increase font size (`Ctrl + +` in terminal)
- Use dark theme with high contrast
- Only show terminals when demonstrating seed/start — don’t leave blank terminals on screen

### Recording flow
1. Start recording → 2s silence → intro
2. Browser only for UI sections
3. Switch to MongoDB for ~60 seconds
4. Optional 30s code: `server.js` redirect + `Visit` model
5. Closing → stop recording

### Avoid awkward pauses
- Pre-type demo URLs in a notes file
- Run `npm run dev` for both apps **before** recording
- If something breaks: “Let me refresh — this is the fallback I’d use in a live demo” and continue

### Show MongoDB
- MongoDB Compass → `smartlink` database → `urls`, `visits` collections
- Point at one Visit document after incognito click

### Show analytics live
- Incognito window side-by-side or alt-tab
- Say out loud: “opening the short link now” before clicking

### Ideal duration
- **8–12 minutes** (sweet spot for hackathon submissions)
- Under 15 min hard cap

### Fallback if demo breaks
- Use seeded `gh-demo` link (already has visits)
- Say: “I’ve got seed data so the charts aren’t empty — live click is optional”
- Show Network tab 302 on redirect as proof

---

## 5. Demo Checklist

Before you hit record:

- [ ] MongoDB running (local or Atlas)
- [ ] `backend/.env` configured
- [ ] `npm run seed` completed
- [ ] Backend on port 5000 — `/api/health` OK
- [ ] Frontend on port 5173
- [ ] Logged out (fresh login on camera)
- [ ] Incognito window ready
- [ ] Demo URLs written down:
  - `https://react.dev`
  - Custom alias: `react-docs`
  - Public stats: `/stats/gh-demo`
- [ ] Compass / mongosh open
- [ ] Notifications silenced (phone + desktop)

---

## 6. Commands to Run Before Recording

```bash
# Terminal 1 — backend
cd backend
npm install
cp .env.example .env
# set MONGODB_URI and JWT_SECRET
npm run seed
npm run dev

# Terminal 2 — frontend
cd frontend
npm install
cp .env.example .env
npm run dev
```

Verify:
```bash
curl http://localhost:5000/api/health
```

---

## 7. Demo URLs to Use

| Purpose | URL |
|---------|-----|
| Create destination | `https://react.dev` |
| Custom alias | `react-docs` |
| Seeded public stats | `http://localhost:5173/stats/gh-demo` |
| Short redirect test | `http://localhost:5000/react-docs` (after create) |

---

## 8. Common Interview Questions

### “Why MongoDB?”
Flexible schema for visits, easy to aggregate in JS for a hackathon timeline. Postgres would work too for production.

### “How does auth work?”
JWT issued on login/register, stored client-side, verified in `protect` middleware, user attached to `req.user`.

### “How do you prevent alias collisions?”
Unique index on `shortCode` + check before insert; Mongo duplicate key error handled in error middleware.

### “What if someone spams clicks?”
Right now every hit logs a visit. I’d add rate limiting by IP on the redirect route next.

### “Why Context API instead of Redux?”
Scope fits the app — auth + toasts only. Less boilerplate for a 1-week project.

### “How would you scale redirects?”
Cache popular short codes in Redis, separate redirect service, CDN for static frontend.

### “What was hardest?”
Route ordering for `/:shortCode` vs `/api`, and keeping dashboard clicks in sync with visit analytics.

---

## 9. Simple Interview Answers (one-liners)

- **JWT?** Stateless auth — server signs, client stores, middleware verifies.  
- **bcrypt?** One-way password hashing with salt rounds.  
- **nanoid?** Short unique IDs without UUID length.  
- **Chart.js?** Familiar, quick line/doughnut/bar charts for demo.  
- **QR?** Generated server-side with `qrcode`, stored as data URL.  

---

## 10. Recording Setup Guide

| Setting | Recommendation |
|---------|------------------|
| Resolution | 1920×1080 |
| Frame rate | 30 fps |
| Audio | 48 kHz, noise suppression on |
| Cursor | Enable highlight in OBS if available |
| Edits | One intro title card max — avoid over-editing |

**Export:** MP4 (H.264), upload to YouTube (unlisted) or Loom, paste link in README.

---

## 11. Upload Placeholder

After recording, add your link to `README.md`:

```markdown
**Demo video:** https://www.loom.com/share/your-id-here
```

---

Good luck — speak like you’re showing a friend something you built, not pitching a corporation.
