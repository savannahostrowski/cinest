import { useState } from 'react';
import GenreSelector from './GenreSelector';
import { Movie } from './types';
import { Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const SubmitPage = () => {
  const [genre, setGenre] = useState('Action');
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const fetchMovie = async () => {
    // setLoading(true)

    try {
      console.log(process.env.REACT_APP_API_URL + '/random_movie/' + genre)
      const response = await fetch(process.env.REACT_APP_API_URL + '/movie?genre=' + genre)
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
      setMovie(m);
      setLoading(false);
      console.log(movie);
      // navigate('/movie/' + movie!.id, { state: { movie: movie } })
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
