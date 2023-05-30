import { Button, Modal } from 'react-bootstrap';
import Tickets from '../Tickets/Tickets';

function TicketsModal(props){
    return <Modal size="lg" show={props.showTicketsModal} onHide={props.closeTicketsModal}>
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