import Navbar from "../../components/navbar/navbar";
import Slider from "../../components/slider/slider";
import { getAllMovies } from "../../api/movie";
import { useEffect, useState } from "react";
import MovieList from "../../components/movieList/movieList";
import {CSpinner} from "@coreui/react";
import Footer from "../../components/footer/footer";

function LandingPage(){
    const [moviesData, setMoviesData] = useState(null);
    const [searchedMoviesData, setSearchedMoviesData] = useState(null);

    const filterMovies = (searchMovieName) =>{
        const filteredMovies = moviesData.filter((movie)=>{
            const movieName = movie.name.toLowerCase();
            return movieName.startsWith(searchMovieName.toLowerCase());
        })
        setSearchedMoviesData(filteredMovies);
    }

    const fetchMovies = async() =>{
        const movies = await getAllMovies();
        setMoviesData(movies);
    }

    useEffect(() =>{
        fetchMovies();
    }, [])

    return(
        <div>
            <Navbar filterMovies={filterMovies} />
            <Slider />
            <div className="text-center">  
            {
                (moviesData === null ? <CSpinner color="primary" variant="grow"/> : <MovieList moviesData = {searchedMoviesData!==null && searchedMoviesData.length>0 ? searchedMoviesData : moviesData}/>)
            }
            </div>
            <Footer />
        </div>
    )
}


export default LandingPage;