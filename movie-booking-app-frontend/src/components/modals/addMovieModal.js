import { Modal, Button } from "react-bootstrap";

function AddMovieModal(props){
    const data = props.data;
    return(
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Add Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="input-group">
                        <input 
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Movie Name"
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
                            placeholder="Movie description"
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
                            placeholder="Movie rating"
                            value = {data ? data.rating : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="casts"
                            type="text"
                            className="form-control"
                            placeholder="casts"
                            value = {data ? data.casts : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="genre"
                            type="text"
                            className="form-control"
                            placeholder="genre"
                            value = {data ? data.genre : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="posterUrl"
                            type="text"
                            className="form-control"
                            placeholder="posterUrl"
                            value = {data ? data.posterUrl : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="trailerUrl"
                            type="text"
                            className="form-control"
                            placeholder="trailerUrl"
                            value = {data ? data.trailerUrl : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="language"
                            type="text"
                            className="form-control"
                            placeholder="language"
                            value = {data ? data.language : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="releaseDate"
                            type="text"
                            className="form-control"
                            placeholder="releaseDate"
                            value = {data ? data.releaseDate : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="releaseStatus"
                            type="text"
                            className="form-control"
                            placeholder="releaseStatus"
                            value = {data ? data.releaseStatus : ""}
                            onChange={props.onChangeData}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            id="director"
                            type="text"
                            className="form-control"
                            placeholder="director"
                            value = {data ? data.director : ""}
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
                    Add Movie
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddMovieModal;