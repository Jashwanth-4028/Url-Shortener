# SmartLink API Documentation

Base URL (local): `http://localhost:5000`

All JSON endpoints return:

```json
{ "success": true|false, "message": "...", "data": { } }
```

Protected routes require header:

```
Authorization: Bearer <jwt_token>
```

---

## Auth

### POST `/api/auth/register`

**Body:**
```json
{
  "name": "Alex",
  "email": "alex@example.com",
  "password": "secret12"
}
```

**201 Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Alex",
    "email": "alex@example.com",
    "token": "eyJ..."
  }
}
```

**Errors:** 400 validation, 400 email exists

---

### POST `/api/auth/login`

**Body:**
```json
{
  "email": "alex@example.com",
  "password": "secret12"
}
```

**200 Response:** Same shape as register.

**Errors:** 401 invalid credentials

---

### GET `/api/auth/me`

**Auth:** Required

**200 Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Alex",
    "email": "alex@example.com"
  }
}
```

---

## URLs

### POST `/api/url/create`

**Auth:** Required

**Body:**
```json
{
  "originalUrl": "https://github.com/myrepo",
  "customAlias": "my-repo",
  "expiryDate": "2026-12-31"
}
```

- `customAlias` optional (3–30 chars, alphanumeric, `-`, `_`)
- `expiryDate` optional ISO date string

**201 Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "originalUrl": "https://github.com/myrepo",
    "shortCode": "my-repo",
    "shortUrl": "http://localhost:5000/my-repo",
    "qrCode": "data:image/png;base64,...",
    "clicks": 0,
    "createdAt": "..."
  }
}
```

---

### GET `/api/url/myurls`

**Auth:** Required

**200 Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [ { "...url fields...", "shortUrl": "..." } ]
}
```

---

### PUT `/api/url/:id`

**Auth:** Required

**Body:** (at least one field)
```json
{
  "originalUrl": "https://new-destination.com",
  "expiryDate": null
}
```

---

### DELETE `/api/url/:id`

**Auth:** Required

**200 Response:**
```json
{ "success": true, "message": "URL deleted" }
```

Also deletes related `Visit` documents.

---

### GET `/api/url/public/:shortCode`

**Auth:** Not required

**200 Response:**
```json
{
  "success": true,
  "data": {
    "shortCode": "gh-demo",
    "originalUrl": "https://github.com",
    "clicks": 24,
    "createdAt": "...",
    "lastVisited": "...",
    "shortUrl": "http://localhost:5000/gh-demo"
  }
}
```

---

## Analytics

### GET `/api/analytics/:id`

**Auth:** Required (must own URL)

**200 Response:**
```json
{
  "success": true,
  "data": {
    "url": {
      "_id": "...",
      "originalUrl": "...",
      "shortCode": "...",
      "clicks": 24,
      "lastVisited": "...",
      "createdAt": "..."
    },
    "totalClicks": 24,
    "dailyTrends": [{ "date": "2026-05-20", "clicks": 3 }],
    "browsers": [{ "name": "Chrome", "count": 10 }],
    "devices": [{ "name": "Mobile", "count": 8 }],
    "clickHistory": [
      { "browser": "Chrome", "device": "Desktop", "timestamp": "..." }
    ]
  }
}
```

---

## Redirect

### GET `/:shortCode`

**Auth:** Not required

- Increments click count
- Logs visit
- Redirects `302` to `originalUrl`
- **410** if expired
- **404** if not found

---

## Health

### GET `/api/health`

```json
{ "success": true, "message": "SmartLink API running" }
```

---

## Status codes

| Code | Usage |
|------|--------|
| 200 | OK |
| 201 | Created |
| 400 | Validation / duplicate |
| 401 | Auth failure |
| 404 | Not found |
| 410 | Expired link |
| 500 | Server error |
