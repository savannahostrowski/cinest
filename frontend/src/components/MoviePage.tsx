import { useLocation } from "react-router-dom";

const MoviePage = () => {
    const location = useLocation();
    const movie = location.state?.movie;
    console.log(location)

    return (
        <div>
            <h1>Movie Page</h1>
            <p>{movie.title}</p>
        </div>
    )
}
export default MoviePage;