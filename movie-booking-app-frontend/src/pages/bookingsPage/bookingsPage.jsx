import { Accordion } from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";
import { useState } from "react";
import { getBookingByBookingId } from "../../api/booking";

function BookingsPage(){
    const bookings = localStorage.getItem("bookings").split(",");
    const [currentBookingData, setCurrentBookingData] = useState("");
     const fetchCurrentBookingData = async(bookingId) =>{
        const data = await getBookingByBookingId(bookingId);
        setCurrentBookingData(data);
     }
    return (
        <>
        <Navbar />
        <Accordion defaultActiveKey="0">
        {  
            bookings.map((booking) => {
                return (
                <Accordion.Item eventKey={booking}>
                    <Accordion.Header onClick={()=> {fetchCurrentBookingData(booking)}}>Booking #{booking}</Accordion.Header>
                    <Accordion.Body>
                        {<>
                            <h3>Booking Details:</h3>
                            <div><span>Booking Id: </span>{currentBookingData._id}</div>
                            <div><span>Booking Date & Time: </span>{currentBookingData.createdAt}</div>
                            <div><span>Number of seats booked: </span>{currentBookingData.noOfSeatsToBook}</div>
                            <div><span>Booked Seats: </span>{currentBookingData.seatsToBook}</div>
                            <div><span>Booking Status: </span>{currentBookingData.status}</div>
                            <div><span>Total Amount: </span>{currentBookingData.totalCost}</div>
                            <div><span>Payment Id: </span>{currentBookingData.paymentId}</div>
                        </>
                        }
                    </Accordion.Body>
                </Accordion.Item>
                )
            })
        }
        </Accordion>
        </>
    );
}

export default BookingsPage;