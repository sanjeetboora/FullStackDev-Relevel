import { Button, Modal } from 'react-bootstrap';
import Tickets from '../Tickets/Tickets';
import constants from '../../utils/constants';
import { useSelector } from 'react-redux';

function TicketsModal(props){
    const { ticketsModalType} = constants;
    const showModal = useSelector((state) => state.tickets.ShowTicketsModal[ticketsModalType.ViewTicketsModal]);
    return <Modal size="lg" show={showModal} onHide={props.closeTicketsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Tickets Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tickets ticketsData = {props.currentTicketsModalInfo} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.closeTicketsModal()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
}

export default TicketsModal;