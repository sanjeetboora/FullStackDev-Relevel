import { Button, Dropdown, Modal } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/DropdownItem'
import constants from '../../utils/constants';
import userInfo from '../../utils/currentUserInfo';
import { useSelector, useDispatch } from 'react-redux';
import {updateShowUserModals} from '../../redux/slices/usersSlice';

function EditUserProfileModal(props){
    const dispatch = useDispatch();
    const {userType, userStatus, userModalType} = constants;
    const showModal =  useSelector((state) => state.users.ShowUserModals[userModalType.EditUserProfileModal]);
    const closeModal = () => {dispatch(updateShowUserModals({modalType: userModalType.EditUserProfileModal, show:false}))};
    const data = useSelector((state) => state.users.CurrentUserModalData[userModalType.EditUserProfileModal]);
    return <Modal size="lg" show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit = {props.updateUserProfile}>
                        <h5 className='card-subtitle text-primary lead'>User Id: {data._id}</h5>
                        <hr />
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Name</label>
                            <input type='text' className='form-control' name='name' value={data.name} onChange={props.changeUserDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Email</label>
                            <input type='text' className='form-control' name='email' value={data.email} onChange={props.changeUserDetails}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>User Type</label>
                            <Dropdown onSelect = {props.changeUserDetails}>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    {data.userType}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <DropdownItem eventKey = {userType.engineer} disabled = {userInfo.userType!==userType.admin}>{userType.engineer}</DropdownItem >
                                    <DropdownItem eventKey = {userType.customer} disabled = {userInfo.userType!==userType.admin}>{userType.customer}</DropdownItem>
                                    <DropdownItem eventKey = {userType.admin} disabled = {userInfo.userType!==userType.admin}>{userType.admin}</DropdownItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>User Status</label>
                            <Dropdown onSelect = {props.changeUserDetails}>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    {data.userStatus}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <DropdownItem eventKey = {userStatus.approved} disabled = {userInfo.userType!==userType.admin}>{userStatus.approved}</DropdownItem >
                                    <DropdownItem eventKey = {userStatus.suspended} disabled = {userInfo.userType!==userType.admin}>{userStatus.suspended}</DropdownItem>
                                    <DropdownItem eventKey = {userStatus.rejected} disabled = {userInfo.userType!==userType.admin}>{userStatus.rejected}</DropdownItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Created At</label>
                            <input type='text' className='form-control' name='createdAt' value={data.createdAt} onChange={props.changeUserDetails} disabled/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Organization</label>
                            <input type='text' className='form-control' name='clientName' value={data.clientName} onChange={props.changeUserDetails} disabled = {userInfo.userType!==userType.admin}/>
                        </div>
                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md'>Updated At</label>
                            <input type='text' className='form-control' name='updatedAt' value={data.updatedAt} onChange={props.changeUserDetails} disabled/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { 
                        props.updateUserProfile(); 
                        closeModal();
                    }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
}

export default EditUserProfileModal;