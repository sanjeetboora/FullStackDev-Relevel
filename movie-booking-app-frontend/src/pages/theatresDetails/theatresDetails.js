import { useParams } from "react-router-dom";
import {getTheatresByMovieId} from '../../api/movie';
import {getTheatreById} from '../../api/theatres';
import { useEffect, useState } from "react";
import {CSpinner} from "@coreui/react";
import TheatreComponent from "../../components/theatreComponent/theatreComponent";
import Navbar from "../../components/navbar/navbar";

function TheatresDetails(){
    const params = useParams();
    const [theatresData, setTheatresData]=useState(null);
    
    const renderTheatresComponent = (theatres) =>{
        return theatres.map((theatreData) => {
            return <TheatreComponent theatre = {theatreData}/>
        })
    }

    const renderTheatres = async(theatresIds)=>{
        const data = [];
        for await (let theatreId of theatresIds) {
            const currTheatreData =  await getTheatreById(theatreId);
            data.push(currTheatreData);
        }
        return data;
    }
    
    const fetchTheatres = async(movieId) =>{
        const theatres = await getTheatresByMovieId(movieId);
        return theatres;
    }

    const getData = async() =>{
        const data = await fetchTheatres(params.movieId);
        const theatreData = await renderTheatres(data);
        setTheatresData(theatreData);
    };

    useEffect(()=>{
        getData();
    }, [])

    return (
       <> 
       <Navbar />
        <h1 className="text-center">Theaters List</h1>
        <div className="container">
            {
                (theatresData === null ? <CSpinner color="primary" variant="grow"/> :  renderTheatresComponent(theatresData))
            } 
        </div>
        </>
    )

}
export default TheatresDetails;