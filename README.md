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

## Production CI/CD (Auto Deploy)

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-production.yml`.

When code is pushed to `main`/`master`, it will:

1. Build the frontend (`frontend/dist`)
2. Package backend + deployment scripts
3. Upload bundle to your server over SSH
4. Deploy to `/var/www/shefware` (default)
5. Restart PM2 app (`shefware-api` by default)
6. Re-apply indexing mode + reload Nginx

### Required GitHub Secrets

Set these in your repository **Settings -> Secrets and variables -> Actions**:

- `SSH_HOST` - server IP/host
- `SSH_USER` - SSH user on server
- `SSH_PRIVATE_KEY` - private key for SSH auth
- `SSH_PRIVATE_KEY_B64` - optional base64-encoded private key (recommended if multiline formatting causes issues)
- `SSH_PORT` - optional, defaults to `22`
- `DEPLOY_PATH` - optional, defaults to `/var/www/shefware`
- `PM2_APP_NAME` - optional, defaults to `shefware-api`

You can also reuse common legacy names from another repo:

- `VPS_HOST` (alternative to `SSH_HOST`)
- `VPS_USER` (alternative to `SSH_USER`)
- `SSH_KEY` (alternative to `SSH_PRIVATE_KEY`)
- `SSH_KEY_B64` (alternative to `SSH_PRIVATE_KEY_B64`)
- `VPS_PORT` (alternative to `SSH_PORT`)
- `APP_PATH` (alternative to `DEPLOY_PATH`)
- `PM2_NAME` (alternative to `PM2_APP_NAME`)

### Server Requirements

Ensure the server already has:

- Node.js + npm
- PM2
- Nginx
- `rsync`, `curl`
- backend env file at `/var/www/shefware/backend/.env`

This is a production deployment flow (no dev server). It deploys built assets and restarts services.
