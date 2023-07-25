import { Modal, Button } from "react-bootstrap";

function AddTheatreModal(props){
    const data = props.data;
    return(
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Add Theatre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="input-group">
                        <input 
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Theatre Name"
                            value = {data ? data.name : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="description"
                            type="text"
                            className="form-control"
                            placeholder="Theatre description"
                            value = {data ? data.description : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="rating"
                            type="text"
                            className="form-control"
                            placeholder="Theatre rating"
                            value = {data ? data.rating : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="street"
                            type="text"
                            className="form-control"
                            placeholder="street"
                            value = {data ? data.street : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="state"
                            type="text"
                            className="form-control"
                            placeholder="state"
                            value = {data ? data.state : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="city"
                            type="text"
                            className="form-control"
                            placeholder="city"
                            value = {data ? data.city : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="pincode"
                            type="text"
                            className="form-control"
                            placeholder="pincode"
                            value = {data ? data.pincode : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
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
                    Add Theatre
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddTheatreModal;