
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../../utils/constants';
import { updateShowTicketsModal } from '../../redux/slices/ticketsSlice';

function CreateTicketModal(props){
    const dispatch = useDispatch();
    const {ticketStatus, ticketsModalType} = constants;
    const showModal = useSelector((state) => state.tickets.ShowTicketsModal[ticketsModalType.NewTicketModal]);
    const closeModal = () => dispatch(updateShowTicketsModal({modalType: ticketsModalType.NewTicketModal, show: false}));
    const data= useSelector((state) => state.tickets.CurrentModalData[ticketsModalType.NewTicketModal]);
    const disableUpdateClientName = localStorage.getItem('userType') === "customer";
    const clientName = disableUpdateClientName ? localStorage.getItem('clientName') :  props.clientName;
    
    return (
        <Modal size="lg" show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{"Create New Ticket"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit = {props.createTicket}>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Title</label>
                            <input type='text' className='form-control' name='title' value={data.title} onChange={props.changeNewTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Ticket Priority</label>
                            <select className='form-select' name="ticketPriority" value = {data.ticketPriority} onChange={props.changeNewTicketDetails}>
                                <option value = "0">0 highest</option>
                                <option value = "1">1</option>
                                <option value = "2">2</option>
                                <option value = "3">3</option>
                                <option value = "4">4 lowest</option>
                            </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Ticket Status</label>
                            <select className='form-select' name="status" value = {data.status} onChange={props.changeNewTicketDetails}>
                                <option value = {ticketStatus[0]}>{ticketStatus[0]}</option>
                                <option value = {ticketStatus[1]}>{ticketStatus[1]}</option>
                                <option value = {ticketStatus[2]}>{ticketStatus[2]}</option>
                                <option value = {ticketStatus[3]}>{ticketStatus[3]}</option>
                                <option value = {ticketStatus[4]}>{ticketStatus[4]}</option>
                            </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Description</label>
                            <input type='text' className='form-control' name='description' value={data.description} onChange={props.changeNewTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Client Name</label>
                            <input type='text' className='form-control' name='clientName' value={clientName} onChange={props.changeNewTicketDetails} disabled={disableUpdateClientName} />
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Assigned To</label>
                            <input type='text' className='form-control' name='assignedTo' value={data.assignedTo} onChange={props.changeNewTicketDetails}/>
                        </div>
                    </form>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={() =>{
                        props.createTicket();
                        closeModal();
                    }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateTicketModal;