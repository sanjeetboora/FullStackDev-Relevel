import Navbar from "../../components/navbar/navbar";
import Slider from "../../components/slider/slider";
import { getAllMovies } from "../../api/movie";
import { useEffect, useState } from "react";
import MovieList from "../../components/movieList/movieList";
import {CSpinner} from "@coreui/react";
import Footer from "../../components/footer/footer";

function LandingPage(){
    const [moviesData, setMoviesData] = useState(null);

    const fetchMovies = async() =>{
        const movies = await getAllMovies();
        setMoviesData(movies);
    }

    useEffect(() =>{
        fetchMovies();
    }, [])

    return(
        <div>
            <Navbar />
            <Slider />
            <div className="text-center">  
            {
                (moviesData === null ? <CSpinner color="primary" variant="grow"/> : <MovieList moviesData = {moviesData}/>)
            }
            </div>
            <Footer />
        </div>
    )
}


export default LandingPage;