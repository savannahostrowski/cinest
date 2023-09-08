import os
import asyncpg


async def create_database():
    conn = await asyncpg.connect(
        user=os.environ.get('POSTGRES_USER'),
        password=os.environ.get('POSTGRES_PASSWORD'),
        database=os.environ.get('POSTGRES_DB'),
        host=os.environ.get('POSTGRES_HOST'),
    )
    await conn.execute(
        "CREATE TABLE IF NOT EXISTS movies (id TEXT, title TEXT, genre TEXT, year TEXT, plot TEXT, poster TEXT)"
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
