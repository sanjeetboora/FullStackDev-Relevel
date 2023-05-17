import * as TicketService from '../services/tickets';
import * as UserService from '../services/users';
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MaterialTable from "@material-table/core";
import ExportCsv from '@material-table/exporters/csv';
import ExportPdf from '@material-table/exporters/pdf';
import TicketCard from "../utils/ticketsCard";

function Admin(){
    const currUserName = useState(localStorage.getItem("name"));
    const [allUserData, setAllUserData] = useState([]);
    const [ticketsData, setTicketsData] = useState({});
    const [totalTicketsCount, setTotalTicketsCount] = useState(100);
    const [cardsDetails, setCardsDetails] = useState([]);
    const [selectedUserDetails, setSelectedUserDetails] = useState({});
    const componentMounted = useRef(true);
    const ticketStatus = ["open", "inProgress", "resolved", "cancelled", "onHold"];
    const ticketCardColor = ["primary", "info", "warning", "light", "success"];

    const [showModal, setShowModal] = useState(false);
    const showTheModal= () =>{
        setShowModal(true);
    }
    const closeModal = () =>{
        setShowModal(false);
    }

    useEffect(()=>{
        (async()=>{
            if(componentMounted.current){
                fetchUsers();
                updateTicketCardsData();
                componentMounted.current=false;
            }
        })();
    },[]);

    const fetchUsers = async() =>{
        const response =  await UserService.getAllUsers();
        setAllUserData(response.data.result);
    }

    const fetchTickets = async() =>{
        const result = {};
        for (let index = 0; index < ticketStatus.length; index++) {
            const status = ticketStatus[index];
            const res = await TicketService.getTicketsByStatus(status);
            result[status] = res.data.result;
        }
       return result;
    }

    const updateTicketCardsData = async() => {
        const response = await fetchTickets();
        setTicketsData(response);
        let totalTickets = 0;
        for(const ele in response){
            totalTickets += response[ele].length;
        }
        setTotalTicketsCount(totalTickets);
        const cardsData = [];
        for(let i=0; i<ticketStatus.length; i++){
            const data = {
                cardColor: ticketCardColor[i], 
                cardTitle: ticketStatus[i], 
                numberOfTickets : response[ticketStatus[i]].length, 
                percentageOfTickets : response[ticketStatus[i]].length*100/totalTickets,
            }
            cardsData.push(data);
        }
        setCardsDetails(cardsData);
    }

    const changeUserDetails = (event) =>{
        const {name, value} = event.target;
        selectedUserDetails[name]=value;
        setSelectedUserDetails(selectedUserDetails);
        setShowModal(event.target.value);
    }

    return (
        <div>  
            <div className="row text-center" style={{marginTop: 1+'rem', marginBottom: 2+'rem'}}> <h1>Welcome {currUserName}!!!</h1></div>
            <p className="text-muted text-center" style={{marginBottom: 2+'rem'}}>Take a quick look at your admin stats.</p>
            {
                /* cards */
            }
            <div className="row text-center">
                {
                    cardsDetails.map(card => {
                        return <div className="col">
                            <TicketCard props ={{cardColor: card.cardColor, cardTitle: card.cardTitle, numberOfTickets : card.numberOfTickets, percentageOfTickets : card.percentageOfTickets}} />
                        </div>
                    })
                }
            </div>
            <hr style={{margin: 2+"rem"}}/>
            {
                /*user data table*/
                <MaterialTable 
                    onRowClick={(event, rowData) => {
                        setSelectedUserDetails(rowData);
                        showTheModal();
                    }}
                    title={"User Records"}
                    options={{
                        // Allow user to hide/show
                        // columns from Columns Button
                        columnsButton: true,
                        filtering: true,
                        sorting: true,
                        exportMenu: [
                            {
                                label: "Export PDF",
                                //// You can do whatever you wish in this function. We provide the
                                //// raw table columns and table data for you to modify, if needed.
                                // exportFunc: (cols, datas) => console.log({ cols, datas })
                                exportFunc: (cols, datas) => ExportPdf(cols, datas, "userDataPdf"),
                            },
                            {
                                label: "Export CSV",
                                exportFunc: (cols, datas) => ExportCsv(cols, datas, "userDataCsv"),
                            },
                        ],
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        rowStyle: {
                            backgroundColor: "#d4d4d4",
                        },
                    }}
                    data={allUserData}
                    columns={[
                        {
                            field: "name",
                            title: "Name",
                        },
                        {
                            field: "email",
                            title: "Email",
                        },
                        {
                            field: "userType",
                            title: "User Type",
                            lookup:{
                                "admin":"admin",
                                "customer":"customer",
                                "engineer":"engineer"
                            }
                        },
                        {
                            field: "userStatus",
                            title: "User Status",
                            lookup:{
                                "approved":"approved",
                                "pending": "pending",
                                "rejected":"rejected"
                            }
                        },
                    ]}
                />
            }

        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit user details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit = {closeModal}>
                    <h5 className='card-subtitle text-primary lead'>User Id: {selectedUserDetails._id}</h5>
                    <hr />
                    <div className='input-group mb-3'>
                        <label className='label input-group-text label-md'>Name</label>
                        <input type='text' className='form-control' name='name' value={selectedUserDetails.name} onChange={changeUserDetails}/>
                    </div>
                    <div className='input-group mb-3'>
                        <label className='label input-group-text label-md'>Email</label>
                        <input type='email' className='form-control' name='email' value={selectedUserDetails.email} onChange={changeUserDetails}/>
                    </div>
                    <div className='input-group mb-3'>
                        <label className='label input-group-text label-md'>User Type</label>
                        <select className='form-select' name="userType" value = {selectedUserDetails.userType} onChange={changeUserDetails}>
                            <option value = "customer">Customer</option>
                            <option value = "engineer">Engineer</option>
                            <option value = "admin">Admin</option>
                       </select>
                    </div>
                    <div className='input-group mb-3'>
                        <label className='label input-group-text label-md'>User Status</label>
                        <select className='form-select' name="userStatus" value = {selectedUserDetails.userStatus} onChange={changeUserDetails}>
                            <option value = "pending">Pending</option>
                            <option value = "approved">Approved</option>
                            <option value = "suspended">Suspended</option>
                            <option value = "rejected">Rejected</option>
                       </select>
                    </div>
                    <div className='input-group mb-3'>
                        <label className='label input-group-text label-md'>Tickets Created</label>
                        <input type='text' className='form-control' name='ticketsCreated' value={selectedUserDetails.ticketsCreated} disabled/>
                    </div>
                    <div className='input-group mb-3'>
                        <label className='label input-group-text label-md'>Tickets Assigned</label>
                        <input type='text' className='form-control' name='ticketsAssigned' value={selectedUserDetails.ticketsAssigned} disabled/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={closeModal}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

        </div>    
    );
}

export default Admin;