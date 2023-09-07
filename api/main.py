import json
import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import openai
from database import create_database, get_database
from requests import get

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MODEL = "gpt-4"
OMDB_API_KEY = os.environ.get("OMDB_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")


@app.on_event("startup")
async def startup():
   # Create db if it doesn't exist
   await create_database()
       

@app.on_event("shutdown")
async def shutdown():
    pass  # You could close database connections here.


# Get a random movie from the omdb database with a specific genre and store in the database
@app.get("/api/random_movie/{genre}")
async def random_movie(genre: str, conn=Depends(get_database)):
    response = openai.ChatCompletion.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are a movie suggestion engine. You are given a genre and you have to suggest a movie to the user. You will respond with a JSON object with a single field of 'movie' and the value of the movie you suggest.",
            },
            {
                "role": "user",
                "content": "I want to watch a movie in the genre: " + genre,
            },
        ],
    )
    movie = json.loads(response.choices[0].message.content)["movie"]
    # Search omdb database for the movie
    omdbData = get(
        f"http://www.omdbapi.com/?apikey={OMDB_API_KEY}&type=movie&t={movie}"
    ).json()

    print(omdbData)
    # Store the movie in the database
    await conn.execute(
        "INSERT INTO movies (title, genre, year, plot, poster) VALUES ($1, $2, $3, $4, $5)",
        omdbData["Title"],
        omdbData["Genre"],
        omdbData["Year"],
        omdbData["Plot"],
        omdbData["Poster"],
    )

    

    return {"movie": omdbData}
