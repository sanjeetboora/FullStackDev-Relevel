import TicketCard from "../../utils/ticketsCard";
import { useDispatch, useSelector } from 'react-redux';
import constants from '../../utils/constants';
import { updateCurrentModalData, updateShowTicketsModal } from '../../redux/slices/ticketsSlice';

function TicketCardsRow(props){
    const dispatch = useDispatch();
    const {ticketsModalType} = constants;
    const ticketsCardsDetails = useSelector((state) => state.tickets.TicketsCardsDetails);
    const ticketsData = useSelector((state) => state.tickets.TicketsByStatus);
    const showTicketsModal =(ticketsCardStatus)=>{
        dispatch(updateCurrentModalData({modalType: ticketsModalType.ViewTicketsModal, data: ticketsData[ticketsCardStatus]}));
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.ViewTicketsModal, show: true}));
    }
    return(
        <div className="row">
            {
                ticketsCardsDetails.map(card => {
                    return <div className="col text-center" style={{display:'block', width:'18rem', flexGrow:0}} onClick={() => showTicketsModal(card.cardTitle)}>
                        <TicketCard props ={{cardColor: card.cardColor, cardTitle: card.cardTitle, numberOfTickets : card.numberOfTickets, percentageOfTickets : card.percentageOfTickets}} />
                    </div>
                })
            }
        </div>
    )
}

export default TicketCardsRow;