import os
import asyncpg

# create a database  where i acn make queries like   # Store the movie in the database
    # await conn.execute(
    #     "INSERT INTO movies (title, genre, year, plot, poster) VALUES ($1, $2, $3, $4, $5)",
    #     omdbData["Title"],
    #     omdbData["Genre"],
    #     omdbData["Year"],
    #     omdbData["Plot"],
    #     omdbData["Poster"],
    # )

async def create_database():
    conn = await asyncpg.connect(
        user=os.environ.get('POSTGRES_USER'),
        password=os.environ.get('POSTGRES_PASSWORD'),
        database=os.environ.get('POSTGRES_DB'),
        host=os.environ.get('POSTGRES_HOST'),
    )
    await conn.execute(
        "CREATE TABLE IF NOT EXISTS movies (title TEXT, genre TEXT, year TEXT, plot TEXT, poster TEXT)"
    )
    await conn.close()

async def get_database():
    conn = await asyncpg.connect(
        user=os.environ.get('POSTGRES_USER'),
        password=os.environ.get('POSTGRES_PASSWORD'),
        database=os.environ.get('POSTGRES_DB'),
        host=os.environ.get('POSTGRES_HOST'),
    )
    try:
        yield conn
    finally:
        await conn.close()

async def fetch_one(query, conn, *params):
    return await conn.fetchrow(query, *params)

async def fetch_all(query, conn, *params):
    return await conn.fetch(query, *params)

async def execute(query, conn, *params):
    return await conn.execute(query, *params)
