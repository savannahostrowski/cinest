# cinest
A movie suggestion engine, build with love and Azure

## Local development
Dependencies:
- Docker
- Docker Compose
- Python 3.11+
- Node 18.16+

### Frontend
1. Run `npm install` in `frontend/`
1. Run `npm run dev` to start dev server

### API
1. Create venv or open in Dev Container
1. Install deps via `pip install -r requirements.txt`
1. In root of project (`/`), run `docker-compose up -d` to run the API and database in containers for local development


## Notes and Issues
- Port was auto configured to 8080 and had to switch to 5173 for vite
- Keep getting Connection Refused by asyncpg?
- Oryx workspace/ not found