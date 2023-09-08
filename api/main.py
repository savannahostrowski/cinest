import json
import os
import aiohttp
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import openai
from database import create_database, get_database

MODEL = "gpt-4"
OMDB_API_KEY = os.environ.get("OMDB_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await create_database()


@app.on_event("shutdown")
async def shutdown():
    await app.state._db.close()


# Get a random movie from the omdb database with a specific genre and store in the database
@app.get("/api/random_movie/{genre}")
async def random_movie(genre: str, conn=Depends(get_database)):
    ## Get last 10 movies from the database for this genre
    movies = await conn.fetch(
        "SELECT * FROM movies WHERE genre = $1 ORDER BY id DESC LIMIT 10", genre
    )
    movieTitles = [mov["title"] for mov in movies]

    response = openai.ChatCompletion.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are a movie suggestion engine. You are given a genre and you have to suggest a movie to the user. You will respond with a JSON object with a single field of 'movie' and the value of the movie you suggest.",
            },
            {
                "role": "system",
                "content": "Do not suggest a movie that has already been suggested. These movies have already been suggested: "
                + ", ".join(movieTitles),
            },
            {
                "role": "user",
                "content": "I want to watch a movie in the genre: " + genre,
            },
        ],
    )
        
    movie = json.loads(response.choices[0].message.content)["movie"]

    # Search omdb database for the movie
    async with aiohttp.ClientSession() as session:
        async with session.get(
            f"http://www.omdbapi.com/?apikey={OMDB_API_KEY}&type=movie&t={movie}"
        ) as resp:
            omdbData = await resp.json()

    print(omdbData)
    # Store the movie in the database
    await conn.execute(
        "INSERT INTO movies (id, title, genre, year, plot, poster) VALUES ($1, $2, $3, $4, $5, $6)",
        omdbData["imdbID"],
        omdbData["Title"],
        omdbData["Genre"],
        omdbData["Year"],
        omdbData["Plot"],
        omdbData["Poster"],
    )

    return {"movie": omdbData}


@app.get("/api/movie/{id}")
async def movie(id: str, conn=Depends(get_database)):
    movie = await conn.execute("SELECT * FROM movies WHERE id = $1", id)
    return {"movie": movie}
