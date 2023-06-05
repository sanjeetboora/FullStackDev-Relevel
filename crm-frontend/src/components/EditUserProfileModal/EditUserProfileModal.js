import { Button, Modal } from 'react-bootstrap';
import constants from '../../utils/constants';

function EditUserProfileModal(props){
    const {userType, userStatus} = constants;
    return <Modal size="lg" show={props.show} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit = {props.updateUserProfile}>
                        <h5 className='card-subtitle text-primary lead'>User Id: {props.data._id}</h5>
                        <hr />
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Name</label>
                            <input type='text' className='form-control' name='name' value={props.data.name} onChange={props.changeUserDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Email</label>
                            <input type='text' className='form-control' name='email' value={props.data.email} onChange={props.changeUserDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>User Type</label>
                            <select className='form-select' name="userType" value = {props.data.userType} onChange={props.changeUserDetails} disabled = {props.data.userType!==userType.admin}>
                                <option value = {userType.engineer}>{userType.engineer}</option>
                                <option value = {userType.customer}>{userType.customer}</option>
                                <option value = {userType.admin}>{userType.admin}</option>
                            </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>User Status</label>
                            <select className='form-select' name="userStatus" value = {props.data.userStatus} onChange={props.changeUserDetails} disabled = {props.data.userType!==userType.admin}>
                                <option value = {userStatus.approved}>{userStatus.approved}</option>
                                <option value = {userStatus.suspended}>{userStatus.suspended}</option>
                                <option value = {userStatus.rejected}>{userStatus.rejected}</option>
                            </select>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Created At</label>
                            <input type='text' className='form-control' name='createdAt' value={props.data.createdAt} onChange={props.changeUserDetails} disabled/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Organization</label>
                            <input type='text' className='form-control' name='clientName' value={props.data.clientName} onChange={props.changeUserDetails} disabled = {props.data.userType!==userType.admin}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Updated At</label>
                            <input type='text' className='form-control' name='updatedAt' value={props.data.updatedAt} onChange={props.changeUserDetails} disabled/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.close}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => props.updateUserProfile()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
}

export default EditUserProfileModal;