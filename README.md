# WorldScope — Country Information & History Hub

WorldScope is a full-stack educational country explorer built for a Semester III React final project. It combines current country data, multi-country comparison, local favourites, and source-linked history timelines in a responsive interface.

> The supplied Magic Patterns Vite/TypeScript/Tailwind export is integrated as the frontend design system. Its sample data layer was replaced with the real WorldScope API, MongoDB history endpoints, and persistent favourites.

## Feature checklist

- [x] React 19 + Vite + TypeScript + Tailwind application with six routed experiences
- [x] Home dashboard with live country and region statistics
- [x] Country search, region filtering, sorting, validation, and load-more behavior
- [x] Stable ISO-code country detail routes and graceful missing values
- [x] Two-country comparison with an accessible side-by-side table
- [x] Device-local favourites persistence
- [x] Curated, source-linked timelines for India, Japan, France, Germany, and the United States
- [x] Express REST API with consistent response envelopes
- [x] REST Countries v5 proxy, normalization, timeout handling, and in-memory caching
- [x] MongoDB/Mongoose history model and idempotent seed script
- [x] JSON history fallback when MongoDB is not available
- [x] Loading, error, empty, 404, and reduced-motion states
- [x] Responsive desktop, tablet, and mobile layouts
- [x] ESLint, Vitest, React Testing Library, and Supertest
- [x] Deployment configuration and documentation

## Architecture

```text
Browser (React + Router)
        │
        ▼
WorldScope Express API ─────► REST Countries v5
        │                      (authenticated, cached)
        ▼
MongoDB history collection
        │
        └──── JSON fallback for offline classroom demos
```

The frontend never receives the REST Countries key or MongoDB URI. Express validates requests, contacts the upstream service server-to-server, normalizes the provider schema, and returns this project’s stable internal country shape.

## Requirements

- Node.js 22 or newer (verified with Node 24.19.0)
- npm 11 or newer
- A [REST Countries API](https://restcountries.com/docs) v5 key
- MongoDB 7+ locally or MongoDB Atlas (optional for browsing; required to demonstrate database persistence)

REST Countries v5 now requires a bearer API key and paginates list responses. The backend requests three 100-record pages and caches the normalized result for one hour by default.

## Local setup

```bash
cd worldscope
npm install
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

Update `backend/.env`:

```dotenv
REST_COUNTRIES_API_KEY=your_v5_key
MONGODB_URI=mongodb://127.0.0.1:27017/worldscope
FRONTEND_URL=http://localhost:5173
```

Seed MongoDB, then start both applications:

```bash
npm run seed -w backend
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:5000/api`
- Health check: `http://localhost:5000/api/health`

If `MONGODB_URI` is empty or MongoDB is unavailable, the five bundled history records are served read-only. If `REST_COUNTRIES_API_KEY` is missing, country endpoints deliberately return a clear `503` response rather than fabricated data.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run frontend and backend together |
| `npm run build` | Create the frontend production build |
| `npm test` | Run backend and frontend test suites |
| `npm run lint` | Lint both workspaces with zero warnings |
| `npm run seed -w backend` | Upsert curated history into MongoDB |
| `npm start -w backend` | Start the production API |

## API

All successful responses use `{ success: true, data, message }`. Errors use `{ success: false, message, code }`.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Runtime health check |
| GET | `/api/countries` | Normalized country directory |
| GET | `/api/countries/:code` | Country by ISO alpha-2 or alpha-3 code |
| GET | `/api/countries/compare?first=IND&second=JPN` | Validated two-country response |
| GET | `/api/regions` | Sorted distinct regions |
| GET | `/api/history/:code` | Curated history by alpha-3 code |

## Testing and verified status

Verified on 1 November 2026:

- Backend: 2 files, 5 tests passed
- Frontend: 2 files, 3 tests passed
- ESLint: both workspaces passed with zero warnings
- Vite production build: passed with route-level code splitting

The automated coverage includes country normalization, search/filter/sort behavior, validation, API envelopes, seeded history, unsupported history, and the 404 route. Manual browser testing should be repeated after adding a real API key because upstream data is intentionally not mocked in production.

## Security and reliability

- Secrets are server-only and excluded from Git.
- Helmet, explicit CORS origins, JSON size limits, and API rate limiting are enabled.
- Country codes are strictly validated before use.
- Upstream requests have a nine-second timeout and never silently substitute invented data.
- History writes are not exposed publicly; the runtime API is read-only.
- External links use safe new-tab attributes.

## Vercel deployment

The repository includes a full-stack `vercel.json`: Vite builds into `frontend/dist`, while `api/index.js` exposes the Express backend as a Vercel Function. Add `REST_COUNTRIES_API_KEY` in the Vercel project environment before deploying. `MONGODB_URI` is optional because curated history has a read-only fallback.

## Known limitations

- Country browsing requires a user-provided REST Countries v5 API key; no secret is committed.
- The server cache is in-memory, so it resets when an instance restarts.
- History coverage is intentionally limited to five reviewed countries.
- Favourites are browser-local and do not sync across devices.
- Web fonts load from Google Fonts; replace them with self-hosted files for a fully offline deployment.
- `npm audit` currently reports seven moderate findings in the ESLint/minimatch development-only chain; there are no high or critical findings, and npm offers no non-breaking fix for the installed lint stack. Do not use `npm audit fix --force` without retesting the ESLint configuration.

## Folder structure

```text
worldscope/
  frontend/src/
    components/ context/ hooks/ pages/ services/ styles/ utils/
  backend/src/
    config/ controllers/ data/ middleware/ models/ routes/ services/ utils/
  package.json
```

## License and data attribution

Country metadata and flag assets are requested from REST Countries under its current service terms. Historical summaries are original educational paraphrases with source links stored beside every event.
