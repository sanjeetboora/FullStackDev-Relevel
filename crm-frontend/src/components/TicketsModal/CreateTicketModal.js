
import { Button, Modal } from 'react-bootstrap';
import constants from '../../utils/constants';

function CreateTicketModal(props){
    const {ticketStatus} = constants;
    const disableUpdateClientName = localStorage.getItem('userType') === "customer";
    const clientName = disableUpdateClientName ? localStorage.getItem('clientName') :  props.clientName;
    return (
        <Modal size="lg" show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{"Create New Ticket"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit = {props.createTicket}>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Title</label>
                            <input type='text' className='form-control' name='title' value={props.data.title} onChange={props.addTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Ticket Priority</label>
                            <select className='form-select' name="ticketPriority" value = {props.data.ticketPriority} onChange={props.addTicketDetails}>
                                <option value = "0">0 highest</option>
                                <option value = "1">1</option>
                                <option value = "2">2</option>
                                <option value = "3">3</option>
                                <option value = "4">4 lowest</option>
                            </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Ticket Status</label>
                            <select className='form-select' name="status" value = {props.data.status} onChange={props.addTicketDetails}>
                                <option value = {ticketStatus[0]}>{ticketStatus[0]}</option>
                                <option value = {ticketStatus[1]}>{ticketStatus[1]}</option>
                                <option value = {ticketStatus[2]}>{ticketStatus[2]}</option>
                                <option value = {ticketStatus[3]}>{ticketStatus[3]}</option>
                                <option value = {ticketStatus[4]}>{ticketStatus[4]}</option>
                            </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Description</label>
                            <input type='text' className='form-control' name='description' value={props.data.description} onChange={props.addTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Client Name</label>
                            <input type='text' className='form-control' name='clientName' value={clientName} onChange={props.addTicketDetails} disabled={disableUpdateClientName} />
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Assigned To</label>
                            <input type='text' className='form-control' name='assignedTo' value={props.data.assignedTo} onChange={props.addTicketDetails}/>
                        </div>
                    </form>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                    Close
                </Button>
                <Button variant="primary" onClick={() =>props.createTicket()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateTicketModal;