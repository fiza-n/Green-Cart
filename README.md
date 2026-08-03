# Green Cart (MERN)

Simple grocery e‑commerce template built with the MERN stack (MongoDB, Express, React, Node).

**Project Structure**
- `backend/` — Express API and server code
- `frontend/` — Vite + React application

**Features**
- Product listing, categories and dummy product data
- Responsive navbar and basic cart UI
- Example assets and sample data for rapid prototyping

**Tech Stack**
- Frontend: React, Vite, Tailwind CSS (optional)
- Backend: Node.js, Express
- Database: MongoDB (Atlas or local)

**Prerequisites**
- Node.js >= 16
- npm or yarn
- MongoDB (Atlas connection string or local instance)

**Setup & Run (Backend)**
1. Install dependencies

```bash
cd backend
npm install
```

2. Create a `.env` file (example):

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/green-cart
JWT_SECRET=your_jwt_secret
```

3. Start the server (example script):

```bash
npm run dev
```

**Setup & Run (Frontend)**
1. Install dependencies

```bash
cd frontend
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

**Environment variables (frontend)**
- If the frontend expects API base url, create `.env` or `.env.local` in `frontend/`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

**Folder overview**
- `backend/` — API routes, models, controllers, `package.json`
- `frontend/` — React source in `src/`, assets in `public/`, `package.json`

**Notes & Tips**
- Adjust ports or script names if your `package.json` uses different commands (e.g., `start`, `dev`, or `serve`).
- Use `npm run dev` (or `nodemon`) in the backend for automatic restarts.
- Replace dummy product data in `frontend/public/assets.js` or move seed data to the backend as needed.

**Contributing**
- Fork, create a branch, add a feature/fix, then open a PR.

**License**
- MIT

**Contact**
- Maintainer
