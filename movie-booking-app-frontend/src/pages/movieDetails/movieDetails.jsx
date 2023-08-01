
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Navbar from "../../components/navbar/navbar";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { getMovieById } from "../../api/movie";


function MovieDetails(){
    const navigate = useNavigate();
    const {movieId} = useParams();
    const [movieData, setMovieData] = useState({});

    const fetchMovieDetails = async() =>{
        const movieDetails = await getMovieById(movieId);
        setMovieData(movieDetails);
    }
    useEffect(()=>{
        fetchMovieDetails();
    })

    return (
        movieData && 
        <>
            <Navbar />
            <div className="bg-light">
                <div className="bg-dark">
                    <ReactPlayer url = {movieData.trailerUrl} controls = {true} height="50vh" width = "100%" />
                </div>
                <div className="row my-4 py-10" style = {{padding:"40px"}}>
                    <div className="col-lg-3 col-md-12">
                        <img src={movieData.posterUrl}  width={300} height={500}/>
                    </div>
                    <div className="col-lg-9 col-md-12">
                        <div className="d-flex justify-content-between">
                            <span className="h1 fw-bold">{movieData.name}</span>
                            <Button className="text-white" variant="danger" style={{marginBottom:"1.5rem"}} onClick={() => {navigate(`theatres`)}}> {/** localhost:3000/movieDetails/:movieId/theatres */}
                                Book Tickets
                            </Button>
                        </div>
                        
                        <h4 className="fw-bolder">About the movie</h4>
                        <div> 
                            <h4 className="fw-bold">Description</h4>
                            {movieData.description}
                        </div>
                        <hr />
                        <div>
                            <h4 className="fw-bold">Ratings</h4>
                            {movieData.rating}
                        </div>
                        <hr />
                        <div>
                            <h4 className="fw-bold">Cast</h4>
                            {movieData.casts}
                        </div>
                        <hr />
                        <div>
                            <h4 className="fw-bold">Director</h4>
                            {movieData.director}
                        </div>
                        <hr />
                        <div>
                            <h4 className="fw-bold">Language</h4>
                            {movieData.language}
                        </div>
                        <hr />
                        <div>
                            <h4 className="fw-bold">Genre</h4>
                            {movieData.genre}
                        </div>
                        <hr />
                        <div>
                            <h4 className="fw-bold">Release Date</h4>
                            {movieData.releaseDate}
                        </div>
                        <hr />
                        <div>
                            <h4 className="fw-bold">Release Status</h4>
                            {movieData.releaseStatus}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default MovieDetails;