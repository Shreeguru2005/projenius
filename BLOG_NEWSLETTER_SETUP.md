# Blog and Newsletter Setup

This project now has the foundation for the CEO-requested blog and newsletter flow.

## Architecture

- Public website fetches published blogs from `GET /api/blogs`.
- Newsletter form posts to `POST /api/newsletter/subscribe`.
- Separate admin Vercel portal publishes blogs through its own secure proxy.
- Admin proxy forwards to backend `POST /api/blogs`.
- Published blogs are saved to MongoDB.
- After publish, the API queues a background newsletter send.
- Resend is used for email delivery when `RESEND_API_KEY` is configured.

## Deployment Layout

Use three deployments:

1. Main website Vercel
   - Root folder: project root
   - Build command: `npm run build`
   - Output: `dist`
   - Env: `VITE_API_BASE_URL=https://your-render-api-url.onrender.com`

2. Backend API on Render
   - Start command: `npm run api`
   - Env:
     - `MONGODB_URI`
     - `ADMIN_API_TOKEN`
     - `CLIENT_ORIGIN=https://your-main-site.vercel.app,https://your-admin-site.vercel.app`
     - `RESEND_API_KEY` optional

3. Admin panel Vercel
   - Root folder: `admin-panel`
   - Build command: `npm run build`
   - Output: `dist`
   - Env:
     - `BACKEND_API_URL=https://your-render-api-url.onrender.com`
     - `ADMIN_API_TOKEN=same-token-as-backend`

The CEO uses the admin Vercel URL. When a blog is published there, it is saved
in MongoDB through the backend. The main website then shows it automatically
because the public Blog page fetches `GET /api/blogs`.

## Local Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI`.
3. Set `ADMIN_API_TOKEN`.
4. Optional: set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`.
5. Install dependencies:

```bash
npm install
```

6. Start the API:

```bash
npm run api
```

7. Start the website:

```bash
npm run dev
```

## Public API

### Get published blogs

```http
GET /api/blogs?limit=20&page=1
```

Optional tag filter:

```http
GET /api/blogs?tag=AI
```

### Subscribe to newsletter

```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "name": "Karthi",
  "email": "abc@gmail.com"
}
```

## Admin API

The separate admin panel calls `/api/admin/blogs` on its own Vercel deployment.
That serverless function securely forwards to the backend with `ADMIN_API_TOKEN`.

The backend API endpoint is:

```http
POST /api/blogs
Authorization: Bearer YOUR_ADMIN_API_TOKEN
Content-Type: application/json

{
  "title": "New Blog Title",
  "description": "Short article summary.",
  "content": "<p>Full blog content from React Quill or TinyMCE.</p>",
  "thumbnailUrl": "https://res.cloudinary.com/.../image.jpg",
  "author": {
    "name": "ProJenius Team",
    "role": "Technology Insights"
  },
  "tags": ["AI"],
  "status": "published"
}
```

## Next Upgrade

The current newsletter worker is a simple background job inside the API process.
That is fine for early use. When subscribers grow, move newsletter sending to
BullMQ + Redis Cloud so publishing stays fast and emails can retry safely.
