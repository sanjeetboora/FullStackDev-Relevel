import { useState } from "react";
import clsx from 'clsx';
import PaymentModal from "../paymentModal/paymentModal";

function Cinema(props){
    const seats = Array.from({length:10*10}, (_, i) => i);

    const {totalSeats, bookedSeats, showroomId} = props;
    const [selectedSeats, setSelectedSeats] = useState(localStorage.getItem("selectedSeats").split(",").filter(x => x.trim().length && !isNaN(x)).map(Number) || []);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleShowPaymentModal = () =>{
        setShowPaymentModal(true);
    }

    const handleClosePaymentModal = ()=>{
        setShowPaymentModal(false);
    }

    const handleSelectedState = (seat) =>{
        const isSelected = selectedSeats.includes(seat);
        if(isSelected){
            const updatedSeats = selectedSeats.filter((selectedSeat) => selectedSeat!= seat);
            setSelectedSeats(updatedSeats);
        }else{
            setSelectedSeats([...selectedSeats, seat]);
        }
    }
    const totalBill = selectedSeats.length * (props.price || 100);

    return<div className="Cinema">
        <PaymentModal showroomId = {showroomId} selectedSeats = {selectedSeats} totalCost = {totalBill} show = {showPaymentModal} close = {handleClosePaymentModal}/>
        <div className="screen"/>
        <div className="seats">
            {
                seats.map((seat)=>{
                    const isSelected = selectedSeats.includes(seat);
                    const isOccupied = bookedSeats.includes(seat);

                    return(
                        <span
                            tabIndex="0"
                            key={seat}
                            className={clsx(
                                'seat',
                                isSelected && 'selected',
                                isOccupied && 'occupied'
                            )}
                            onClick={isOccupied ? null : () => handleSelectedState(seat)}
                            onKeyDown={
                                isOccupied ? null : e => {
                                    if(e.key === "Enter"){
                                        handleSelectedState(seat)
                                    }
                                } 
                            }
                        ><i className="bi bi-archive-fill"></i> </span>
                    )
                })
            }
        </div>
        <div>
            <button className="btn btn-danger text-white" onClick={handleShowPaymentModal}>Pay Rupees {totalBill}</button>
        </div>
    </div>
}

export default Cinema;