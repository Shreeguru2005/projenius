# ProJenius Admin Blog Web Handoff

## Purpose
This package contains the separate admin blog web app.

## What It Supports
- Create blogs
- Edit blogs
- Delete blogs
- Upload multiple blog images
- Select thumbnail image
- Save draft
- Publish now
- Schedule later

## Deploy As Separate Vercel App
Use the `admin-panel` folder as the Vercel project root.

## Required Environment Variables
Set these in the admin app deployment:

```env
BACKEND_API_URL=https://your-backend-api-url.com
ADMIN_API_TOKEN=your-secret-admin-token
```

## Notes
- `ADMIN_API_TOKEN` must match the backend `ADMIN_API_TOKEN`.
- Do not deploy or share `admin-panel/.env`.
- Use `admin-panel/.env.example` as the template.
