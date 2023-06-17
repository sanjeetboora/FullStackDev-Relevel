import { Button, Modal } from 'react-bootstrap';

function UserUpdateModal(props){
    return  <Modal show={props.showUserModal} onHide={props.closeUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit = {props.updateUserDetails}>
                        <h5 className='card-subtitle text-primary lead'>User Id: {props.selectedUserDetails._id}</h5>
                        <hr />
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Name</label>
                            <input type='text' className='form-control' name='name' value={props.selectedUserDetails.name} onChange={props.changeUserDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Email</label>
                            <input type='email' className='form-control' name='email' value={props.selectedUserDetails.email} onChange={props.changeUserDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>User Type</label>
                            <select className='form-select' name="userType" value = {props.selectedUserDetails.userType} onChange={props.changeUserDetails}>
                                <option value = "customer">Customer</option>
                                <option value = "engineer">Engineer</option>
                                <option value = "admin">Admin</option>
                        </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>User Status</label>
                            <select className='form-select' name="userStatus" value = {props.selectedUserDetails.userStatus} onChange={props.changeUserDetails}>
                                <option value = "pending">Pending</option>
                                <option value = "approved">Approved</option>
                                <option value = "suspended">Suspended</option>
                                <option value = "rejected">Rejected</option>
                        </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Tickets Created</label>
                            <input type='text' className='form-control' name='ticketsCreated' value={props.selectedUserDetails.ticketsCreated} disabled/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Tickets Assigned</label>
                            <input type='text' className='form-control' name='ticketsAssigned' value={props.selectedUserDetails.ticketsAssigned} disabled/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.closeUserModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => props.updateUserDetails()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
}

export default UserUpdateModal;