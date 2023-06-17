import { Button } from 'react-bootstrap';
import constants from '../../utils/constants';
import TicketsTypeButton from '../TicketsTypeButton/TicketsTypeButton';
import { useDispatch } from 'react-redux';
import { updateShowTicketsModal } from '../../redux/slices/ticketsSlice';

function TicketsButton(props){
    const dispatch = useDispatch();
    const { ticketsModalType} = constants;
    const showNewTicketModal = () => { 
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.NewTicketModal, show: true}));
    }
    return (
        <div className='row' style = {{margin: "1rem", justifyContent: "end"}}>
            <Button onClick = {showNewTicketModal} style = {{"width": "10rem"}}>New Ticket</Button>
            <TicketsTypeButton getTicketsAndUpdateCards={props.getTicketsAndUpdateCards} />
        </div>
    )
}

export default TicketsButton;