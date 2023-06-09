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
import TicketsButton from '../components/TicketsButton/TicketsButton';
import userInfo from '../utils/currentUserInfo';
import CreateTicketModal from '../components/TicketsModal/CreateTicketModal';
import EditUserProfileModal from '../components/EditUserProfileModal/EditUserProfileModal';

function Admin(){
    const {ticketStatus, ticketCardColor, ticketsType, userType, userStatus} = constants;
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
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);
    const [editTicketModalData, setEditTicketModalData] = useState({});
    const [newTicketModalData, setNewTicketModalData] = useState({});
    const [currentTicketsType, setCurrentTicketsType] = useState(ticketsType.AssignedToMe);
    const [showEditUserProfileModal, setShowEditUserProfileModal] = useState(false);
    const [userEditModalData, setUserEditModalData] = useState({selfUpdate:false});
    const fetchAllTickets = async() =>{
        const result = await TicketService.getAllTickets();
        console.log(result);
       return result;
    }

    const fetchCreatedByMeTickets = async() =>{
        const result = await TicketService.getTicketsCreatedByMe();
       return result;
    }

    const fetchAssignedToMeTickets = async() =>{
        const result = await TicketService.getTicketsAssignedToMe();
        return result;
    }
    const getTickets = async(type) =>{
        let response = [];
        const currTicketType = type ? type: currentTicketsType;
        switch(currTicketType){
            case ticketsType.AssignedToMe:
                response = await fetchAssignedToMeTickets();
                break;
            case ticketsType.All:
                response = await fetchAllTickets();
            break;
            case ticketsType.CreatedByMe:
                response = await fetchCreatedByMeTickets();
                break;
            default:
                response = await fetchAssignedToMeTickets();
        }
        return response.data.result;
    }
    const closeEditTicketModal = () =>{
        setShowEditTicketModal(false);
    }
    const showEditTicketModalFn = () =>{
        setShowEditTicketModal(true);
    }

    // const showUserModalFn= () =>{
    //     setShowUserModal(true);
    // }
    // const closeUserModal = () =>{
    //     setShowUserModal(false);
    // }

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
                await fetchUsers();
                const tickets = await getTickets();
                updateTicketCardsData(tickets);
                componentMounted.current=false;
            }
        })();
    },[]);

    const fetchUsers = async() =>{
        const response =  await UserService.getAllUsers();
        setAllUserData(response.data.result);
    }

    const updateTicketCardsData = async(tickets) => {
        const ticketsData = {};   
        for(let i=0; i<ticketStatus.length; i++){
            ticketsData[ticketStatus[i]] = [];
        }
        
        for(let i=0; i<tickets.length; i++){
            const currentTicket = tickets[i];
            ticketsData[currentTicket.status].push(currentTicket);
        }
        
        setTicketsData(ticketsData);
        let totalTickets = tickets.length;
        setTotalTicketsCount(totalTickets);
        const cardsData = [];
        for(let i=0; i<ticketStatus.length; i++){
            const data = {
                cardColor: ticketCardColor[i], 
                cardTitle: ticketStatus[i], 
                numberOfTickets : ticketsData[ticketStatus[i]].length, 
                percentageOfTickets : parseInt(ticketsData[ticketStatus[i]].length*100/totalTickets),
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
        const tickets = await getTickets();
        await updateTicketCardsData(tickets);

    }

    const changeUserDetails = (event) =>{
        if(typeof event === 'string' || event instanceof String){
            if(event in userType){
                event = {target:{name:"userType", value: event}};
            }else if(event in userStatus){
                event = {target:{name:"userStatus", value: event}};
            }
        }
        const {name, value} = event.target;
        userEditModalData[name]=value;
        setUserEditModalData(userEditModalData);
        setShowEditUserProfileModal(event.target.value);
    }
    const createTicket = async() => {
        const data = {
            title: newTicketModalData.title,
            description: newTicketModalData.description,
            ticketPriority: newTicketModalData.ticketPriority,
            status: newTicketModalData.status,
            assignedTo: newTicketModalData.assignedTo,
            clientName: newTicketModalData.clientName,
        }
        await TicketService.createTicket(data);
        closeNewTicketModal();
        const tickets = await getTickets();
        await updateTicketCardsData(tickets);
    }

    // const updateUserDetails = async() =>{
    //     const data = {
    //         userId: selectedUserDetails._id,
    //         updates:{
    //             name: selectedUserDetails.name,
    //             email: selectedUserDetails.email,
    //             userType: selectedUserDetails.userType,
    //             userStatus: selectedUserDetails.userStatus
    //         }
            
    //     }
    //     await UserService.updateUserData(data);
    //     closeUserModal();
    // }

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
    const showNewTicketModalFn = () =>{
        setShowNewTicketModal(true);
    }
    const closeNewTicketModal = () =>{
        setShowNewTicketModal(false);
    }

    const getTicketsAndUpdateCards = async(eventKey) =>{
        console.log("eventKey", eventKey);
        setCurrentTicketsType(eventKey);
        const response = await getTickets(eventKey);
        updateTicketCardsData(response);
    }
    const updateUserProfile = async() =>{
        const data = {
            userId:userEditModalData._id,
            updates:{
                _id: userEditModalData._id,
                userType: userEditModalData.userType, 
                userStatus: userEditModalData.userStatus,
                name: userEditModalData.name,
                email: userEditModalData.email,
                clientName: userEditModalData.clientName
            }
        }
        const updatedUserData = await UserService.updateUserData(data);
        const updatedData = updatedUserData.data.result;
       if(userEditModalData.selfUpdate){
            console.log("======updatedData=====", updatedData);
            localStorage.setItem("email",updatedData.email);
            localStorage.setItem("name",updatedData.name);
            localStorage.setItem("userType",updatedData.userType);
            localStorage.setItem("userStatus",updatedData.userStatus);
            localStorage.setItem("clientName",updatedData.clientName);
            localStorage.setItem("_id",updatedData._id);
            localStorage.setItem("createdAt",updatedData.createdAt);
            localStorage.setItem("updatedAt",updatedData.updatedAt);
            localStorage.setItem("token",updatedData.token);
       }
       setShowEditUserProfileModal(updatedData);
        await fetchUsers()
        closeEditUserProfileModal();
    }

    const showEditUserProfileModalFn = () =>{
        setShowEditUserProfileModal(true);
    }

    const closeEditUserProfileModal = () =>{
        setShowEditUserProfileModal(false);
    }

    const changeTicketDetails= (event) =>{
        const {name, value} = event.target;
        editTicketModalData[name] = value;
        setEditTicketModalData(editTicketModalData);
        setShowEditTicketModal(event.target.value);
    }

    const addTicketDetails= (event) =>{
        const {name, value} = event.target;
        newTicketModalData[name] = value;
        setNewTicketModalData(newTicketModalData);
        setShowNewTicketModal(event.target.value);
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
                {/* <UserUpdateModal 
                    showUserModal={showUserModal} 
                    closeUserModal={closeUserModal} 
                    updateUserDetails={updateUserDetails} 
                    selectedUserDetails={selectedUserDetails} 
                    changeUserDetails = {changeUserDetails}
                /> */}
                 <EditUserProfileModal 
                    show={showEditUserProfileModal}
                    close = {closeEditUserProfileModal}
                    changeUserDetails= {changeUserDetails}
                    data = {userEditModalData}
                    updateUserProfile={updateUserProfile}
                />
                <EditTicketModal 
                        show = {showEditTicketModal} 
                        close = {closeEditTicketModal} 
                        data={editTicketModalData} 
                        changeTicketDetails = {changeTicketDetails}
                        updateTicket = {updateTicketData}
                />
                <CreateTicketModal 
                    show = {showNewTicketModal} 
                    close = {closeNewTicketModal} 
                    addTicketDetails={addTicketDetails} 
                    createTicket={createTicket} 
                    data = {newTicketModalData} 
                />
                <Welcome />
                {showAllTickets && 
                    <div>
                        <TicketsButton showNewTicketModalFn={showNewTicketModalFn} getTicketsAndUpdateCards={getTicketsAndUpdateCards} currentTicketsType={currentTicketsType}/> 
                        <Tickets ticketsData = {[].concat(...Object.values(ticketsData))} showEditTicketModalFn= {showEditTicketModalFn} setEditTicketModalData={setEditTicketModalData} />
                    </div>
}
                {showDashboard && 
                    <div>
                        <TicketsButton showNewTicketModalFn={showNewTicketModalFn} getTicketsAndUpdateCards={getTicketsAndUpdateCards} currentTicketsType={currentTicketsType}/>
                        <Dashboard cardsDetails = {cardsDetails} 
                            showTicketsModalFn={showTicketsModalFn}  
                            allUserData={allUserData} 
                            setSelectedUserDetails={setUserEditModalData} 
                            showUserModalFn={showEditUserProfileModalFn} 
                            showTicketsModal = {showTicketsModal} 
                            closeTicketsModal={closeTicketsModal} 
                            currentTicketsModalInfo={currentTicketsModalInfo}/> 
                    </div>   
                } 
                {showAllUsers && <UsersTable allUserData={allUserData} setUserEditModalData={setUserEditModalData} showUserModalFn={showEditUserProfileModalFn}/> }
                {showUserProfile &&<UserProfile updateProfile = {showEditUserProfileModalFn} showInfo = {setUserEditModalData} />}
            </div>
        </div>    
    );
}

export default Admin;