import { useEffect, useState } from "react";
import { getShowroomById } from "../../api/showroom";
import {CSpinner} from "@coreui/react";
import { getTimeByTimeSlot } from "../../utils/showroomUtils";
import { useNavigate } from "react-router-dom";

function TheatreComponent(props){
    const navigate = useNavigate();
    const {theatre} = props;
    const [showrooms, setShowrooms] = useState(null);

    const renderShowrooms = (showrooms) => {
        return showrooms.map((showroom)=>{
            return <button className="btn btn-danger mx-2 my-2 text-white" onClick={()=>{ navigate(`/${showroom._id}/booking`)}}> 
                <span className="fw-bold"><i class="bi bi-calendar-fill"></i> </span> {showroom.date.slice(0, 10)} <br />
                <span className="fw-bold">  <i class="bi bi-clock-fill"></i> </span>{getTimeByTimeSlot(showroom.timeSlot)}</button>
        })
    }

    const fetchShowrooms = async(showroomIds) => {
        const data = [];
        for await (let showroomId of showroomIds) {
            const currshowroomData =  await getShowroomById(showroomId);
            data.push(currshowroomData);
        }
        setShowrooms(data);
    }

    useEffect(()=>{
        fetchShowrooms(theatre.showrooms);
    }, [])

    return(
        <div className="bg-dark text-white px-5 py-4">
            <div className="row fw-bold">
                <div className="col">{theatre.name}</div>
                <div className="col text-end">{theatre.rating} <i class="bi bi-star-fill"></i></div>
            </div>
            <div>{theatre.description}</div>
            <div>{theatre.street}</div>
            <div>{theatre.city}, {theatre.state}, {theatre.pincode}</div>
            <div>
                {(showrooms === null ? <CSpinner color="primary" variant="grow"/> : renderShowrooms(showrooms))}
            </div>
        </div>
    )
}

export default TheatreComponent;