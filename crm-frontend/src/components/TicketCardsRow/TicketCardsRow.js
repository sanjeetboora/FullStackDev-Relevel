import TicketCard from "../../utils/ticketsCard";
import { useSelector } from 'react-redux';

function TicketCardsRow(props){
    const ticketsCardsDetails = useSelector((state) => state.tickets.TicketsCardsDetails);
    return(
        <div className="row text-center">
            {
                ticketsCardsDetails.map(card => {
                    return <div className="col" onClick={props.showTicketsModal}>
                        <TicketCard props ={{cardColor: card.cardColor, cardTitle: card.cardTitle, numberOfTickets : card.numberOfTickets, percentageOfTickets : card.percentageOfTickets}} />
                    </div>
                })
            }
        </div>
    )
}

export default TicketCardsRow;