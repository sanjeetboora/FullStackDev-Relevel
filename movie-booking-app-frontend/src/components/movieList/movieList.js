import MovieCard from "../movieCard/movieCard";


function MovieList(props){
    const renderMovies = (movies)=>{
        return movies && movies.length>0 && movies.map((movie) => <MovieCard movieDetail = {movie}/>)
    }

    const {moviesData} = props;
    return(
        <div className="bg-light py-3">
            <h3>Recommended Movies</h3>
            <div style={{flexFlow: "wrap"}} className="bg-light d-flex justify-content-center">
                {renderMovies(moviesData)}
            </div>
        </div>
    )
}

export default MovieList;


