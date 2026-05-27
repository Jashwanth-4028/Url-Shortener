# SmartLink Architecture

## High-level overview

```
┌─────────────┐     HTTPS/JSON      ┌─────────────┐     Mongoose     ┌─────────────┐
│   React     │ ◄──────────────────► │   Express   │ ◄──────────────► │   MongoDB   │
│   (Vite)    │      JWT Bearer      │   API       │                  │   Atlas     │
└─────────────┘                      └──────┬──────┘                  └─────────────┘
                                            │
                                            │ GET /:shortCode
                                            ▼
                                     Browser redirect
                                     + Visit log
```

## Frontend architecture

- **Routing:** React Router v6 with public routes and a nested `/dashboard` layout protected by `ProtectedRoute`.
- **State:** Context API only — `AuthContext` for user/session, `ToastContext` for notifications. No Redux (keeps hackathon scope realistic).
- **API layer:** Thin `services/*.js` files on top of a shared Axios instance with auth interceptor.
- **Pages own layout decisions:** Analytics page uses a 5-column grid; dashboard cards span different column widths on purpose.

## Backend architecture

| Layer | Responsibility |
|-------|----------------|
| `routes/` | HTTP path mapping, middleware chain |
| `controllers/` | Request/response handling |
| `services/` | Analytics aggregation, QR generation |
| `models/` | Mongoose schemas |
| `middleware/` | Auth, validation, errors |

### Error handling

All async controllers wrap with `asyncHandler` → errors flow to `errorMiddleware` which normalizes Mongoose validation, duplicate key, and cast errors.

## Data models

### User
- Stores hashed password (bcrypt pre-save hook)
- Referenced by `Url.userId`

### Url
- `shortCode` unique index
- `clicks` denormalized counter
- `qrCode` base64 data URL
- Optional `expiryDate`

### Visit
- One document per redirect
- Powers analytics charts and history

## Redirect flow

```
User clicks short link
        │
        ▼
GET /:shortCode
        │
        ├─► Find Url by shortCode
        ├─► Check expiry
        ├─► Parse User-Agent → browser, device
        ├─► Increment clicks, set lastVisited
        ├─► Insert Visit
        └─► 302 redirect to originalUrl
```

## Analytics flow

```
Dashboard → GET /api/analytics/:id (JWT)
        │
        ▼
analyticsService.getAnalyticsForUrl()
        │
        ├─► Aggregate visits by browser/device
        ├─► Build 14-day daily buckets
        └─► Return click history (latest 50)
```

## Security notes

- Passwords never returned from API (`select: false`)
- Protected routes use `protect` middleware
- URL mutations scoped to `req.user._id`
- Validation on register, login, create/update URL

## Deployment topology

```
Vercel (static SPA)  →  Render (Node API)  →  MongoDB Atlas
     │                        │
     └──── CORS FRONTEND_URL ─┘
```

Short links use `BASE_URL` on the API host so redirects work even when the SPA is on another domain.
