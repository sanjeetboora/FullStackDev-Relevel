import * as TicketService from '../services/tickets';
import * as UserService from '../services/users';
import { useEffect, useRef, useState } from "react";
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Tickets from '../components/Tickets/Tickets';
import UsersTable from '../components/UsersTable/UsersTable';
import UserUpdateModal from '../components/UserUpdateModal/UserUpdateModal';
import Sidebar from '../components/Sidebar/sidebar';
import UserProfile from '../components/UserProfile/UserProfile';
import Dashboard from '../components/Dashboard/Dashboard';
import constants from '../utils/constants';
import EditTicketModal from '../components/TicketsModal/EditTicketsModal';
import Welcome from '../components/Welcome/Welcome';

function Admin(){
    const {ticketStatus, ticketCardColor} = constants;
    const [allUserData, setAllUserData] = useState([]);
    const [ticketsData, setTicketsData] = useState({});
    const [totalTicketsCount, setTotalTicketsCount] = useState(100);
    const [cardsDetails, setCardsDetails] = useState([]);
    const [selectedUserDetails, setSelectedUserDetails] = useState({});
    const componentMounted = useRef(true);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [showAllTickets, setShowAllTickets] = useState(false);
    const [showTicketsModal, setShowTicketsModal] = useState(false);
    const [currentTicketsModalInfo, setCurrentTicketsModalInfo] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showEditTicketModal, setShowEditTicketModal] = useState(false);
    const [editTicketModalData, setEditTicketModalData] = useState({});

    const closeEditTicketModal = () =>{
        setShowEditTicketModal(false);
    }
    const showEditTicketModalFn = () =>{
        setShowEditTicketModal(true);
    }

    const showUserModalFn= () =>{
        setShowUserModal(true);
    }
    const closeUserModal = () =>{
        setShowUserModal(false);
    }

    const showTicketsModalFn =(event)=>{
        console.log(event);
        const cardTicketStatus = event.target.firstChild.innerText;
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

    const updateTicketData = async() =>{
        const data = {
            title: editTicketModalData.title,
            description: editTicketModalData.description,
            ticketPriority: editTicketModalData.ticketPriority,
            status: editTicketModalData.status,
            assignedTo: editTicketModalData.assignedTo,
            clientName: editTicketModalData.clientName,
        }
        
        await TicketService.updateTicketById(editTicketModalData._id, data);
        closeEditTicketModal();
        await updateTicketCardsData();
    }

    const changeTicketDetails= (event) =>{
        const {name, value} = event.target;
        editTicketModalData[name] = value;
        setEditTicketModalData(editTicketModalData);
        setShowEditTicketModal(event.target.value);
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
        await updateTicketCardsData();
    }

    const showAllTicketsFn = () =>{
        setShowAllTickets(true);
        setShowDashboard(false);
        setShowAllUsers(false);
        setShowUserProfile(false);
    }

    const showShowDashboardFn = () =>{
        setShowAllTickets(false);
        setShowDashboard(true);
        setShowAllUsers(false);
        setShowUserProfile(false);
    }

    const showAllUsersFn = () =>{
        setShowAllTickets(false);
        setShowDashboard(false);
        setShowAllUsers(true);
        setShowUserProfile(false);
    }

    const showUserProfileFn = () =>{
        setShowUserProfile(true);
        setShowAllTickets(false);
        setShowDashboard(false);
        setShowAllUsers(false);
    }

    return (
        <div className='row'>  
            <div className="col-2 ">
                <Sidebar 
                    showDashboard = {showShowDashboardFn} 
                    showTickets={showAllTicketsFn} 
                    showUsers = {showAllUsersFn}
                    showUserProfile={showUserProfileFn}
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
                <EditTicketModal 
                    show = {showEditTicketModal} 
                    close = {closeEditTicketModal} 
                    data={editTicketModalData} 
                    changeTicketDetails = {changeTicketDetails}
                    updateTicket = {updateTicketData}
                />
                <Welcome />
                {showAllTickets &&  <Tickets ticketsData = {ticketsData.open} showEditTicketModalFn= {showEditTicketModalFn} setEditTicketModalData={setEditTicketModalData} />}
                {showDashboard && 
                    <Dashboard cardsDetails = {cardsDetails} 
                        showTicketsModalFn={showTicketsModalFn}  
                        allUserData={allUserData} 
                        setSelectedUserDetails={setSelectedUserDetails} 
                        showUserModalFn={showUserModalFn} 
                        showTicketsModal = {showTicketsModal} 
                        closeTicketsModal={closeTicketsModal} 
                        currentTicketsModalInfo={currentTicketsModalInfo}/>    
                } 
                {showAllUsers && <UsersTable allUserData={allUserData} setSelectedUserDetails={setSelectedUserDetails} showUserModalFn={showUserModalFn}/> }
                {showUserProfile && <UserProfile />}
            </div>
        </div>    
    );
}

export default Admin;