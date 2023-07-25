import { userType } from "../../constants/user";
import { Button, DropdownButton, Dropdown, Modal } from "react-bootstrap";

function AddUserModal(props){
    const data = props.data;
    return(
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="input-group">
                        <input 
                            id="email"
                            name = "email"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={props.onChangeData}
                            value = {data? data.email : ""}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="password"
                            name = "password"
                            onChange={props.onChangeData}
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value = {data? data.password : ""}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value = {data? data.name : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="username"
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value = {data? data.username : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <span className="mx-1 my-1"> User Type</span>
                        </div>
                        <div className="col">
                            <DropdownButton id="dropdown-basic-button" title="User Type" onSelect={props.onChangeDataUserType}>
                                <Dropdown.Item eventKey={userType.customer}>{userType.customer}</Dropdown.Item>
                                <Dropdown.Item eventKey={userType.client}>{userType.client}</Dropdown.Item>
                                <Dropdown.Item eventKey={userType.admin}>{userType.admin}</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() =>{
                    props.onSubmit();
                    props.close();
                }}>
                    Add User
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddUserModal;