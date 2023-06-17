import { Dropdown } from 'react-bootstrap';
import constants from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTicketsType } from '../../redux/slices/ticketsSlice';

function TicketsTypeButton(props){
    const { ticketsType} = constants;
    const dispatch = useDispatch();
    const currentTicketsType = useSelector((state) => state.tickets.CurrentTicketsType);
    const updateTicketstype = (eventKey) => {
        dispatch(updateCurrentTicketsType(eventKey));
        props.getTicketsAndUpdateCards(eventKey);
    };
    return(
        <Dropdown onSelect = {updateTicketstype} style = {{
            "text-align": "end",
            "width": "10rem",
        }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {currentTicketsType}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey = {ticketsType.AssignedToMe}>Assigned To Me</Dropdown.Item>
                <Dropdown.Item eventKey = {ticketsType.CreatedByMe}>Created By Me</Dropdown.Item>
                <Dropdown.Item eventKey = {ticketsType.All}>All Tickets</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default TicketsTypeButton;