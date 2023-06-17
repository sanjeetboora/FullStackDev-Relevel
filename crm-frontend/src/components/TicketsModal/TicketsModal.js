import { Button, Modal } from 'react-bootstrap';
import Tickets from '../Tickets/Tickets';
import constants from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowTicketsModal } from '../../redux/slices/ticketsSlice';

function TicketsModal(props){
    const dispatch = useDispatch();
    const { ticketsModalType} = constants;
    const closeModal = () => { dispatch(updateShowTicketsModal({modalType: ticketsModalType.ViewTicketsModal, show: false}));}
    const showModal = useSelector((state) => state.tickets.ShowTicketsModal[ticketsModalType.ViewTicketsModal]);
    const data = useSelector((state) => state.tickets.CurrentModalData[ticketsModalType.ViewTicketsModal]);
    return <Modal size="lg" show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Tickets Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tickets ticketsData = {data} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => closeModal()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
}

export default TicketsModal;