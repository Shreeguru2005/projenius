# ProJenius Admin Panel

This is the standalone admin website for creating, editing, deleting, drafting, and scheduling ProJenius blog posts.

## Deploy Separately On Vercel

Create a new Vercel project and set the project root directory to this folder:

```txt
admin-panel
```

Use these Vercel settings:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Add these environment variables in the Vercel project:

```env
BACKEND_API_URL=https://your-backend-api-url.com
ADMIN_API_TOKEN=use-the-same-token-as-the-backend
```

`BACKEND_API_URL` must point to the deployed ProJenius backend API. `ADMIN_API_TOKEN` must match the backend `ADMIN_API_TOKEN`.

## Local Development

Create `admin-panel/.env` from `.env.example`, then run:

```bash
npm install
npm run dev
```

The admin app calls `/api/admin/blogs`, which is proxied to the backend with the admin token so the token is not exposed in browser JavaScript.
