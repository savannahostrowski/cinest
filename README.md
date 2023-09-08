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
    - needed to update env variables in api.bicep to match what i'm looking for in my app
- Oryx workspace/ not found in the container for the frontend per the log stream
    - needed to add a start script in package.json to run `npm run dev -- --host`
- where do I put API keys needed in the containers?
    - .azure/ to store the keys keys
    - main.parameters.json for referencing the keys
    - add params for the keys in main.bicep
    - pass params into api bicep module
    - use in api bicep secrets