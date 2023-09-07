import { useState } from 'react';
import GenreSelector from './GenreSelector';
import { Movie } from './types';
import { Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const SubmitPage = () => {
  const [genre, setGenre] = useState('Action');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const fetchMovie = async () => {
    setLoading(true)

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/random_movie/' + genre)
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
      navigate('/movie/' + m!.id, { state: { movie: m } })
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleGenreChange = (value: string) => {
    setGenre(value)
  }

  if (loading) {
    return (
      <Loader color="violet" />
    )
  }

  return (
    <>
      <h1>Meet Cinest</h1>
      <h2>Your movie recommendation engine</h2>
      <h3>Select a genre!</h3>
      <GenreSelector setGenreOnPage={handleGenreChange} />

      <div>
        <button onClick={fetchMovie}>Roll the clip!</button>
      </div>
    </>
  )
}



export default SubmitPage;
