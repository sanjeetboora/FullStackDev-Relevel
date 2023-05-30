import { Button, Modal } from 'react-bootstrap';

function EditTicketModal(props){
    return <Modal size="lg" show={props.show} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Ticket Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit = {props.updateTicket}>
                        <h5 className='card-subtitle text-primary lead'>Ticket Id: {props.data._id}</h5>
                        <hr />
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Title</label>
                            <input type='text' className='form-control' name='title' value={props.data.title} onChange={props.changeTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Ticket Priority</label>
                            <select className='form-select' name="ticketPriority" value = {props.data.ticketPriority} onChange={props.changeTicketDetails}>
                                <option value = "0">0 highest</option>
                                <option value = "1">1</option>
                                <option value = "2">2</option>
                                <option value = "3">3</option>
                                <option value = "4">4 lowest</option>
                        </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Description</label>
                            <input type='text' className='form-control' name='description' value={props.data.description} onChange={props.changeTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Created At</label>
                            <input type='text' className='form-control' name='createdAt' value={props.data.createdAt} onChange={props.changeTicketDetails} disabled/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Client Name</label>
                            <input type='text' className='form-control' name='clientName' value={props.data.clientName} onChange={props.changeTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Created By</label>
                            <input type='text' className='form-control' name='createdBy' value={props.data.createdBy} onChange={props.changeTicketDetails} disabled/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Assigned To</label>
                            <input type='text' className='form-control' name='assignedTo' value={props.data.assignedTo} onChange={props.changeTicketDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Assignee</label>
                            <input type='text' className='form-control' name='assignee' value={props.data.assignee} onChange={props.changeTicketDetails} disabled/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Updated At</label>
                            <input type='text' className='form-control' name='updatedAt' value={props.data.updatedAt} onChange={props.changeTicketDetails} disabled/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.close}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => props.updateTicket()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
}

export default EditTicketModal;