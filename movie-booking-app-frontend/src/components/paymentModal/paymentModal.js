import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createBooking } from '../../api/booking';
import { useNavigate } from 'react-router-dom';
import { createPayment } from '../../api/payment';
import TicketModal from './ticketModal';
import { useState } from 'react';
   
function PaymentModal(props) {
  const navigate = useNavigate();
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const {showroomId, selectedSeats, totalCost} = props;
  const seatsToBook = new Array(...selectedSeats);
  const tax = totalCost*0.18;
  const total = totalCost + tax;

  const bookTickets = async() =>{
    if(!localStorage.getItem('token')){
      localStorage.setItem("selectedSeats", selectedSeats);
      navigate('/login');
      return;
    }
    const data = {
      showroomId,
      seatsToBook,
      noOfSeatsToBook: seatsToBook.length,
      totalCost: total,
    }
    const res = await createBooking(data);
    return res;
  } 

  const makePayment = async(bookingId, status, amount) =>{
    const data = {
      bookingId, status, amount
    }
    const res = await createPayment(data);
    return res;
  }

  return (
    <>
      <TicketModal show = {showTicketModal} close = {()=>setShowTicketModal(false)} bookingId = {bookingId} />
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Booking summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>{seatsToBook.join(", ")} <span> ({selectedSeats.length} Tickets)</span></div>
            <div>Sub Total: {totalCost}</div>
            <div>Tax: {tax}</div>
            <div>Total: {total}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
          <Button variant="primary" onClick={
              async()=>{
                const res = await bookTickets();
                res && setBookingId(res._id);
                const paymentResponse = await makePayment(res._id, "IN_PROGRESS", total);
                //const razorResponse = await make_api_call_toRazorPay_api
                //await updatePayment({status: razorResponse.status})

                setShowTicketModal(true);
                props.close();
              }
          }> Proceed to Pay {total}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PaymentModal;