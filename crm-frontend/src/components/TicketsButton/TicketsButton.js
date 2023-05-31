import { Button } from 'react-bootstrap';
import TicketsTypeButton from '../TicketsTypeButton/TicketsTypeButton';

function TicketsButton(props){
    return (
        <div className='row' style = {{margin: "1rem", justifyContent: "end"}}>
            <Button onClick = {props.showNewTicketModalFn} style = {{"width": "10rem"}}>New Ticket</Button>
            <TicketsTypeButton getTicketsAndUpdateCards={props.getTicketsAndUpdateCards} currentTicketsType={props.currentTicketsType} />
        </div>
    )
}

export default TicketsButton;