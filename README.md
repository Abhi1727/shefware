# Shefware Website

Full-stack website boilerplate using React (Vite) for frontend and Node.js (Express) for backend.

## Project Structure

- `frontend/` - React application
- `backend/` - Express API

## Run Locally

1. Install dependencies (already done once during setup):
   - `npm install`
   - `npm install --prefix frontend`
   - `npm install --prefix backend`
2. Copy env examples:
   - `backend/.env.example` -> `backend/.env`
   - `frontend/.env.example` -> `frontend/.env` (optional)
3. Start frontend + backend together:
   - `npm run dev`

## Backend Endpoints

- `GET /api/health`
- `POST /api/contact`
