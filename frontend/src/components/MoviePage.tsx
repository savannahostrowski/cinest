import { Chip } from "@mantine/core";
import { useLocation } from "react-router-dom";

const MoviePage = () => {
    const location = useLocation();
    const movie = location.state?.movie;
    console.log(location)

    return (
        // Add a back button to the page
        // Add a chip for each rating
        // place in the top left
        <div style={{ position: 'relative' }}>
            <button 
            style={{ position: 'absolute', top: '0', left: '0' }}
            onClick={() => window.history.back()}
            >
                Back
            </button>
            <div>
                <h1>Movie Page</h1>
                <p>{movie.title}</p>
                <img src={movie.poster} alt={movie.title} />
                <p>{movie.plot}</p>
                {/* <div>
                <Chip color="blue">imdbRating{movie.Ratings.imdbRating.Val}</Chip>
            </div> */}
            </div>
        </div>
    )
}
export default MoviePage;