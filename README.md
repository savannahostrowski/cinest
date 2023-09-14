# Cinest 🎥

A movie suggestion engine, built with love and Azure!

![](cinest.gif)

## Local development
Dependencies:
- Docker
- Docker Compose
- Python 3.11+
- Node 18.16+

### Frontend
1. Run `npm install` in `frontend/`
1. Run `npm run dev` to start dev server on `localhost:5173`

### API
You will need API keys for [OMDb API](https://ombdapi.com/) (free!) and [OpenAI](https://platform.openai.com/overview). Once you get these, store them in a `.env` file in the root of the project as `OMDB_API_KEY` and `OPENAI_API_KEY`.
1. Create venv or open in Dev Container
1. Install deps via `pip install -r requirements.txt`
1. In root of project (`/`), run `docker-compose up` to run the API and database in containers for local development

## Try out the new Azure Developer CLI easy `init` flow!
This project was made Azure Developer CLI-compatible using the new `azd init` flow, which detects your local app stack and generates the right configuration to get the application up and running on Azure.

To try it out, checkout the `not-azdified` branch and run `azd init` in the directory with the project and walk through the wizard. This feature is experimental and in alpha stage. Currently this project still requires these manual configurations:

After generation...
1. Port is configured to 8080 in the `frontend.bicep`, you will need to update to 80 for Caddy.
1. Need to reference the API keys for OMDb and OpenAI:
    - Copy the contents of your `.env` into the `.azure/<env name>/.env` file
    - Add them to `main.parameters.json` 
    - Add params for the keys in `main.bicep`
    - Pass params into `api.bicep` module
    - use in `api.bicep` secrets
