import { Button, Modal } from 'react-bootstrap';
import {useDispatch, useSelector } from 'react-redux';
import constants from '../../utils/constants';
import { updateShowTicketsModal } from '../../redux/slices/ticketsSlice';

function EditTicketModal(props){
    const dispatch =useDispatch();
    const {ticketStatus, ticketsModalType} = constants;
    const showModal = useSelector((state) => state.tickets.ShowTicketsModal[ticketsModalType.EditTicketModal]);
    const closeModal = () => { dispatch(updateShowTicketsModal({modalType: ticketsModalType.EditTicketModal, show: false}))};
    const disableUpdateClientName = localStorage.getItem('userType') === "customer";
    const data= useSelector((state) => state.tickets.CurrentModalData[ticketsModalType.EditTicketModal]);
    
    return <Modal size="lg" show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Ticket Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit = {props.updateTicket}>
                        <h5 className='card-subtitle text-primary lead'>Ticket Id: {data._id}</h5>
                        <hr />
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Title</label>
                            <input type='text' className='form-control' name='title' value={data.title} onChange={props.changeTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Ticket Priority</label>
                            <select className='form-select' name="ticketPriority" value = {data.ticketPriority} onChange={props.changeTicketDetails}>
                                <option value = "0">0 highest</option>
                                <option value = "1">1</option>
                                <option value = "2">2</option>
                                <option value = "3">3</option>
                                <option value = "4">4 lowest</option>
                            </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Ticket Status</label>
                            <select className='form-select' name="status" value = {data.status} onChange={props.changeTicketDetails}>
                                <option value = {ticketStatus[0]}>{ticketStatus[0]}</option>
                                <option value = {ticketStatus[1]}>{ticketStatus[1]}</option>
                                <option value = {ticketStatus[2]}>{ticketStatus[2]}</option>
                                <option value = {ticketStatus[3]}>{ticketStatus[3]}</option>
                                <option value = {ticketStatus[4]}>{ticketStatus[4]}</option>
                            </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Description</label>
                            <input type='text' className='form-control' name='description' value={data.description} onChange={props.changeTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Created At</label>
                            <input type='text' className='form-control' name='createdAt' value={data.createdAt} onChange={props.changeTicketDetails} disabled/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Client Name</label>
                            <input type='text' className='form-control' name='clientName' value={data.clientName} onChange={props.changeTicketDetails} disabled={disableUpdateClientName}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Created By</label>
                            <input type='text' className='form-control' name='createdBy' value={data.createdBy} onChange={props.changeTicketDetails} disabled/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Assigned To</label>
                            <input type='text' className='form-control' name='assignedTo' value={data.assignedTo} onChange={props.changeTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Assignee</label>
                            <input type='text' className='form-control' name='assignee' value={data.assignee} onChange={props.changeTicketDetails} disabled/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Updated At</label>
                            <input type='text' className='form-control' name='updatedAt' value={data.updatedAt} onChange={props.changeTicketDetails} disabled/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() =>{
                         props.updateTicket();
                         closeModal();
                    }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
}

export default EditTicketModal;