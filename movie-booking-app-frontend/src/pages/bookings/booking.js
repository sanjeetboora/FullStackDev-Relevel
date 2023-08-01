import "./booking.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {CSpinner} from "@coreui/react";
import { getShowroomById } from "../../api/showroom";
import Navbar from "../../components/navbar/navbar";
import Cinema from "../../components/cinema/cinema";

function Booking(){

    const params = useParams();
    const [showroomData, setShowroomData] = useState(null);
    const [userSelectedSeats, setUserSelectedSeats] = useState([]);

    const fetchShowroomData = async(showroomId) => {
        const data =  await getShowroomById(showroomId);
        setShowroomData(data);
    }

    useEffect(()=>{
        fetchShowroomData(params.showroomId);
    },[]);


    return <div className="bg-dark" style={{height:"100vh"}}>
        <Navbar />
        {
            (showroomData === null ? 
                <div className="text-center"><CSpinner color="primary" variant="grow"/></div>
                : 
                <>
                    <Cinema showroomId = {params.showroomId} totalSeats = {showroomData.totalSeats} bookedSeats={showroomData.bookedSeats} />
                </>
            )
        }
    </div>
}

export default Booking;


