import * as TicketService from '../services/tickets';
import * as UserService from '../services/users';
import { useEffect, useRef, useState } from "react";
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TicketCard from "../utils/ticketsCard";
import Tickets from '../components/Tickets/Tickets';
import TicketsModal from '../components/TicketsModal/TicketsModal';
import UsersTable from '../components/UsersTable/UsersTable.js';
import UserUpdateModal from '../components/UserUpdateModal/UserUpdateModal';
import Sidebar from '../components/Sidebar/sidebar';

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
    const [showDashboard, setShowDashboard] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [showUserProfle, setShowUserProfle] = useState(false);
    const [showAllTickets, setShowAllTickets] = useState(false);
    const [showTicketsModal, setShowTicketsModal] = useState(false);
    const [currentTicketsModalInfo, setCurrentTicketsModalInfo] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const showUserModalFn= () =>{
        setShowUserModal(true);
    }
    const closeUserModal = () =>{
        setShowUserModal(false);
    }

    const showTicketsModalFn =(event)=>{
        console.log(event);
        const cardTicketStatus = event.target.firstChild.innerText;
        console.log("cardTicketStatus: ", cardTicketStatus);
        console.log("ticketsData: ", ticketsData);
        console.log("ticketsData[cardTicketStatus]: ", ticketsData[cardTicketStatus]);
        setCurrentTicketsModalInfo(ticketsData[cardTicketStatus]);
        setShowTicketsModal(true);
    }
    const closeTicketsModal =()=>{
        setShowTicketsModal(false);
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
        setShowUserModal(event.target.value);
    }

    const updateUserDetails = async() =>{
        const data = {
            userId: selectedUserDetails._id,
            updates:{
                name: selectedUserDetails.name,
                email: selectedUserDetails.email,
                userType: selectedUserDetails.userType,
                userStatus: selectedUserDetails.userStatus
            }
            
        }
        await UserService.updateUserData(data);
        closeUserModal();
        await fetchUsers();
    }

    const showAllTicketsFn = () =>{
        setShowAllTickets(true);
        setShowDashboard(false);
        setShowAllUsers(false);
        setShowUserProfle(false);
    }

    const showShowDashboardFn = () =>{
        setShowAllTickets(false);
        setShowDashboard(true);
        setShowAllUsers(false);
        setShowUserProfle(false);
    }

    const showAllUsersFn = () =>{
        setShowAllTickets(false);
        setShowDashboard(false);
        setShowAllUsers(true);
        setShowUserProfle(false);
    }

    const showUserProfileFn = () =>{
        setShowUserProfle(true);
        setShowAllTickets(false);
        setShowDashboard(false);
        setShowAllUsers(false);
    }
    const logout = () =>{
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div className='row'>  
            <div className="col-2 ">
                <Sidebar 
                    showShowDashboardFn = {showShowDashboardFn} 
                    showAllTicketsFn={showAllTicketsFn} 
                    showAllUsersFn = {showAllUsersFn}
                    showUserProfileFn={showUserProfileFn}
                    logout = {logout}
                />
            </div>
            <div className="container col vh-100" style={{overflow: "scroll"}}>
                <UserUpdateModal 
                    showUserModal={showUserModal} 
                    closeUserModal={closeUserModal} 
                    updateUserDetails={updateUserDetails} 
                    selectedUserDetails={selectedUserDetails} 
                    changeUserDetails = {changeUserDetails}
                />
                <div className="row text-center" style={{marginTop: 1+'rem', marginBottom: 2+'rem'}}> <h1>Welcome {currUserName}!!!</h1></div>
                <p className="text-muted text-center" style={{marginBottom: 2+'rem'}}>Take a quick look at your admin stats.</p>
                {showAllTickets ? <Tickets ticketsData = {ticketsData.open} /> : ""}
                {showDashboard ?
                    <div>
                        <div className="row text-center">
                            {
                                cardsDetails.map(card => {
                                    return <div className="col" onClick={showTicketsModalFn}>
                                        <TicketCard props ={{cardColor: card.cardColor, cardTitle: card.cardTitle, numberOfTickets : card.numberOfTickets, percentageOfTickets : card.percentageOfTickets}} />
                                    </div>
                                })
                            }
                        </div>
                        <hr style={{margin: 2+"rem"}}/>
                        {
                            <UsersTable allUserData={allUserData} setSelectedUserDetails={setSelectedUserDetails} showUserModalFn={showUserModalFn}/>
                        }
                        <TicketsModal  showTicketsModal = {showTicketsModal} closeTicketsModal={closeTicketsModal} currentTicketsModalInfo={currentTicketsModalInfo} />
                    </div> : <div></div> } 
                {showAllUsers ?
                    <UsersTable allUserData={allUserData} setSelectedUserDetails={setSelectedUserDetails} showUserModalFn={showUserModalFn}/>
                    :
                    <div></div>
                }
                {showUserProfle ?
                    <div>
                        <div><span>Name: </span> <span>{localStorage.getItem("name")}</span></div>
                        <div><span>Email: </span> <span>{localStorage.getItem("email")}</span></div>
                        <div><span>User Type: </span> <span>{localStorage.getItem("userType")}</span></div>
                        <div><span>User Status: </span> <span>{localStorage.getItem("userStatus")}</span></div>
                    </div>
                    :
                    <div></div>
                }
            </div>
        </div>    
    );
}

export default Admin;