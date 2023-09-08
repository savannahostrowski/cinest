# Cinest 🎥

A movie suggestion engine, built with love and Azure! This is a demo application for showcasing the new `azd init` flow!



![](cinest.gif)

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
You will need API keys for [OMDb API](https://ombdapi.com/) (free!) and [OpenAI](https://platform.openai.com/overview). Once you get these, store them in a `.env` file in the root of the project as `OMDB_API_KEY` and `OPENAI_API_KEY`.
1. Create venv or open in Dev Container
1. Install deps via `pip install -r requirements.txt`
1. In root of project (`/`), run `docker-compose up` to run the API and database in containers for local development


## Azure Developer CLI
This project was made Azure Developer CLI-compatible using the new `azd init` flow, which detects your local app stack and generates the right configuration to get the application up and running on Azure.

To try it out, checkout the `not-azdified` branch and run `azd init` in the directory with the project and go through these steps:
1. Postgres DB is not automatically detected so you need to add it manually during the init flow
1. Port is configured to 8080 in the `frontend.bicep`, you will need to update to 5173 for Vite
1. Error on backend container in log stream (connection refused by asyncpg) --> update env variables in `api.bicep` to match what I'm looking for in my app for the DB
1. Error on fronend container in log stream (Oryx workspace/ not found in the container) --> add a start script in `package.json` to run `npm run dev -- --host` (this feels hacky and probably suboptimal??)
1. Need to reference the API keys for OMDb and OpenAI:
    - Copy the contents of your `.env` into the `.azure/<env name>/.env` file
    - Add them to `main.parameters.json` 
    - Add params for the keys in `main.bicep`
    - Pass params into `api.bicep` module
    - use in `api.bicep` secrets
