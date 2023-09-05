import { useEffect, useState } from 'react';
import GenreSelector from './GenreSelector';
import { Movie } from './types';
import { useNavigate } from 'react-router-dom';
import { assert } from 'console';

const SubmitPage = () => {
  const [genre, setGenre] = useState('Action')
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchMovie = async () => {
    setLoading(true)
    
    fetch(process.env.REACT_APP_API_URL + '/movie?genre=' + genre)
      .then(response => response.json())
      .then(data => {
        const movie: Movie = {
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
        setMovie(movie)
        setLoading(false)
      })
      .then(() => navigate('/movie/' + movie!.id))
  }


  return (
    <>
      <h1>Meet Cinest</h1>
      <h2>Your movie recommendation engine</h2>
      <GenreSelector />

      <button onClick={fetchMovie}>Roll the clip!</button>
    </>
  )
}



export default SubmitPage
