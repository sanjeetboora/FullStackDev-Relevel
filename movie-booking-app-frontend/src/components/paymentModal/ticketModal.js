import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getBookingByBookingId } from '../../api/booking';
import { useEffect, useState } from 'react';
import { getTheatreById } from '../../api/theatres';
import { getShowroomById } from '../../api/showroom';
import { getMovieById } from '../../api/movie';
import { getTimeByTimeSlot } from '../../utils/showroomUtils';
   
function TicketModal(props) {
    const {show, close, bookingId} = props;
    const [bookingInfo, setBookingInfo] = useState(null);
    const [showroomData, setShowroomData] = useState(null);
    const [movieData, setMovieData] = useState(null);
    const [theatreData, setTheatreData] = useState(null);

    const fetchBookingDetails = async(bookingId)=>{
        const data = await getBookingByBookingId(bookingId);
        setBookingInfo(data);
        return data;
    }

    const fetchShowroomData = async(showroomId) => {
        const data =  await getShowroomById(showroomId);
        setShowroomData(data);
        return data;
    }
    const fetchMovieDetails = async(movieId) =>{
        const movieDetails = await getMovieById(movieId);
        setMovieData(movieDetails);
    }
    const fetchTheatreDetails = async(theatreId) =>{
        const theatre = await getTheatreById(theatreId);
        setTheatreData(theatre);
        return theatre;
    }

    const fetchData = async(bookingId) =>{
        const bookingData = await fetchBookingDetails(bookingId);
        const showroomData = await fetchShowroomData(bookingData.showroomId);
        const movieDetails = await fetchMovieDetails(showroomData.movieId);
        const theatreDetails = await fetchTheatreDetails(showroomData.theatreId);
    }

    useEffect(()=>{
         fetchData(bookingId);
    }, [bookingId])

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Ticket</Modal.Title>
        </Modal.Header>
        {bookingInfo && theatreData && movieData && showroomData &&
        <Modal.Body>
            <h3>Booking Details: </h3>
            <div><span>Booking Id: </span>{bookingInfo._id}</div>
            <div><span>Booking Date & Time: </span>{bookingInfo.createdAt}</div>
            <div><span>Number of seats booked: </span>{bookingInfo.noOfSeatsToBook}</div>
            <div><span>Booked Seats: </span>{bookingInfo.seatsToBook}</div>
            <div><span>Booking Status: </span>{bookingInfo.status}</div>
            <div><span>Total Amount: </span>{bookingInfo.totalCost}</div>
            <div><span>Payment Id: </span>{bookingInfo.paymentId}</div>
            <h3>Show Details: </h3>
            <div><span>Theatre: </span>{theatreData.name}</div>
            <div><span>Street: </span>{theatreData.street}</div>
            <div><span>City: </span>{theatreData.city}, {theatreData.state}</div>
            <div><span>Movie Name: </span>{movieData.name}</div>
            <div><span>Movie Release Date: </span>{movieData.releaseDate}</div>
            <div><span>Movie Cast: </span>{movieData.casts}</div>
            <div><span>Show Date: </span>{showroomData.date}</div>
            <div><span>Show time: </span>{getTimeByTimeSlot(showroomData.timeSlot)}</div>

        </Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TicketModal;