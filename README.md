# VoyageAI

AI-powered travel itinerary generator. Upload flight confirmations, hotel bookings, and activity tickets — VoyageAI extracts the details with AI and builds a shareable day-by-day itinerary.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Express 5, Mongoose, JWT auth |
| Database | MongoDB (Atlas recommended) |
| AI | Google Gemini (primary) or OpenAI (fallback) |

## Quick start (local)

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas replica set URI)
- **At least one** of `GEMINI_API_KEY` or `OPENAI_API_KEY`

### Setup

```bash
# From repo root
cp .env.example .env
# Edit .env with your MongoDB URI, JWT_SECRET, and AI API key

npm install
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api
- Vite proxies `/api` → backend in development

### Demo flow

1. Register at `/auth/signup`
2. Go to **Upload** and drop a PDF or image (flight/hotel confirmation)
3. Wait for AI extraction, then click **Generate Itinerary**
4. View the shareable trip at `/share/:shareId`
5. Optional: open `/share/demo` for a static sample itinerary (no API required)

## Environment variables

Root `.env` (loaded by the server):

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes (prod) | Secret for signing auth tokens |
| `GEMINI_API_KEY` | One of AI keys | Google AI Studio key ([aistudio.google.com](https://aistudio.google.com)) |
| `OPENAI_API_KEY` | One of AI keys | OpenAI API key |
| `PORT` | No | API port (default `5000`) |
| `CLIENT_URL` | No | CORS origin (default `http://localhost:5173`) |

Client build (production):

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Full API base URL, e.g. `https://your-api.onrender.com/api` |

## Deployment

Vercel (`vercel.json`) deploys **only the frontend** (`client/dist`). The Express API must be hosted separately.

### Recommended layout

1. **Frontend** — Vercel (or Netlify)
   - Set `VITE_API_URL` to your deployed API base (including `/api`)
   - Build command: `npm run build --prefix client`

2. **Backend** — Railway, Render, Fly.io, or similar
   - Start command: `npm run start --prefix server`
   - Set all server env vars from `.env.example`
   - Enable persistent disk or object storage if you need uploaded files to survive restarts (local `server/uploads/` is ephemeral on serverless)

3. **MongoDB** — MongoDB Atlas

### Production checklist

- [ ] `JWT_SECRET` set to a strong random value
- [ ] `GEMINI_API_KEY` or `OPENAI_API_KEY` configured on the API host
- [ ] `CLIENT_URL` matches your frontend URL (CORS)
- [ ] `VITE_API_URL` points to the live API

## API overview

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Sign in |
| GET | `/api/auth/me` | JWT | Current user |
| POST | `/api/uploads` | JWT | Upload travel documents |
| POST | `/api/uploads/process` | JWT | AI extraction from uploads |
| POST | `/api/itineraries/generate` | JWT | AI itinerary generation |
| GET | `/api/share/:shareId` | — | Public shared itinerary |
| GET | `/api/explore` | — | Curated destinations |
| GET | `/api/dashboard/*` | JWT | Trips and uploads |

## Project structure

```
VoyageAI/
├── client/          # Vite React app
├── server/          # Express API
│   └── src/services/ai/   # Extraction & itinerary AI
├── .env.example
└── vercel.json      # Frontend-only SPA deploy
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run client + server concurrently |
| `npm run build` | Build client for production |
| `npm run start` | Start API only (production) |

## License

ISC
