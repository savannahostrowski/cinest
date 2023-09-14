import { Loader } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { Movie } from "./types";
import { useState } from "react";

declare const API_BASE_URL: string | undefined;

function getApiUrl(): string {
  return typeof(API_BASE_URL) !== 'undefined' ? API_BASE_URL : 'http://localhost:8000'
}

const MoviePage = () => {
    const location = useLocation();
    const movie = location.state?.movie;
    const genre = location.state?.genre;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const fetchMovie = async () => {
        setLoading(true)

        try {
            const response = await fetch(`${getApiUrl()}/api/random_movie/${genre}`)
            const data = await response.json()
            const m: Movie = {
                id: data.movie.imdbID,
                title: data.movie.Title,
                plot: data.movie.Plot,
                genre: data.movie.Genre,
                poster: data.movie.Poster,
                year: data.movie.Year,
                runtime: data.movie.Runtime,
                rating: data.movie.Ratings,
                cast: data.movie.Actors
            }
            setLoading(false);
            navigate('/movie/' + m!.id, { state: { movie: m, genre: genre } })
        }
        catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return (
          <div>
            <h2>Lights, camera, action! 🎥</h2>
            <Loader color="violet" />
          </div>
        )
      }

    return (
        <div style={{ position: 'relative' }}>
            <div>
                <MovieCard poster={movie.poster} title={movie.title} plot={movie.plot} ratings={movie.rating} />
                <button onClick={fetchMovie} style={{ marginRight: '10px' }}>Roll again!</button>

                <button
                    onClick={() => navigate('/')}
                >
                    Different genre, please!
                </button>
            </div>
        </div>
    )
}




export default MoviePage;