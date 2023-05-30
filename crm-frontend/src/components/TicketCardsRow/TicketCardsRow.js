import TicketCard from "../../utils/ticketsCard";

function TicketCardsRow(props){
    return(
        <div className="row text-center">
            {
                props.cardsDetails.map(card => {
                    return <div className="col" onClick={props.showTicketsModal}>
                        <TicketCard props ={{cardColor: card.cardColor, cardTitle: card.cardTitle, numberOfTickets : card.numberOfTickets, percentageOfTickets : card.percentageOfTickets}} />
                    </div>
                })
            }
        </div>
    )
}

export default TicketCardsRow;