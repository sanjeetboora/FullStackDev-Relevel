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
import { useSelector, useDispatch } from 'react-redux';
import { updateAllTickets, updateAssignedToMeTickets, updateCreatedByMeTickets, updateTicketsByStatus, updateTicketsCardsDetails, updateShowTicketsModal } from '../redux/slices/ticketsSlice';

function Admin(){
    const dispatch = useDispatch();
    const {ticketStatus, ticketCardColor, ticketsType, userType, userStatus, ticketsModalType} = constants;
    const [allUserData, setAllUserData] = useState([]);
    const componentMounted = useRef(true);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [showAllTickets, setShowAllTickets] = useState(false);
    const [currentTicketsViewModalInfo, setCurrentTicketsViewModalInfo] = useState([]);
    const [editTicketModalData, setEditTicketModalData] = useState({});
    const [newTicketModalData, setNewTicketModalData] = useState({});
    const [currentTicketsType, setCurrentTicketsType] = useState(ticketsType.AssignedToMe);
    const [showEditUserProfileModal, setShowEditUserProfileModal] = useState(false);
    const [userEditModalData, setUserEditModalData] = useState({selfUpdate:false});
   
    /* useSelector*/
    const selectedTicketsTypeData = useSelector((state) => state.tickets[currentTicketsType]);
    const ticketsData = useSelector((state) => state.tickets.TicketsByStatus);

    const fetchAllTickets = async() =>{
        const result = await TicketService.getAllTickets();
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
                dispatch(updateAssignedToMeTickets(response.data.result));
                break;
            case ticketsType.All:
                response = await fetchAllTickets();
                dispatch(updateAllTickets(response.data.result));
            break;
            case ticketsType.CreatedByMe:
                response = await fetchCreatedByMeTickets();
                dispatch(updateCreatedByMeTickets(response.data.result));
                break;
            default:
                response = await fetchAssignedToMeTickets();
                dispatch(updateAssignedToMeTickets(response.data.result));
        }
        return response.data.result;
    }
    const closeEditTicketModal = () =>{
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.EditTicketModal, show: false}));
    }
    const showEditTicketModalFn = () =>{
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.EditTicketModal, show: true}));
    }

    const showTicketsViewModalFn =(event)=>{
        console.log(event);
        const cardTicketStatus = event.target.firstChild.innerText;
        setCurrentTicketsViewModalInfo(ticketsData[cardTicketStatus]);
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.ViewTicketsModal, show: true}));
    }
    const closeTicketsViewModal =()=>{
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.ViewTicketsModal, show: false}));
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
        /** above loop will result into a ticketsData object as given below:
            ticketsData = {
                "open" : [],
                "closed" : [],
                "inProgress" : [],
                "cancelled":[],
                "onHold":{}
            }
        */
        
        for(let i=0; i<tickets.length; i++){
            const currentTicket = tickets[i];
            /** let's take an example of current ticket
                currentTicket = {
                    _id: "79873093u0",
                    status: "onHold"
                }
            */
            ticketsData[currentTicket.status].push(currentTicket);
            /** ticketsData, after pushing the current tickety according to it's status
                ticketsData = {
                    "open" : [],
                    "closed" : [],
                    "inProgress" : [],
                    "cancelled":[],
                    "onHold":[{
                            _id: "79873093u0",
                            status: "onHold"
                        }]
                }
            */
        }
        dispatch(updateTicketsByStatus(ticketsData));
        let totalTickets = tickets.length;
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
        dispatch(updateTicketsCardsDetails(cardsData));
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
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.NewTicketModal, show: true}));
    }
    const closeNewTicketModal = () =>{
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.NewTicketModal, show: false}));
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
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.EditTicketModal, show: event.target.value}));
    }

    const addTicketDetails= (event) =>{
        const {name, value} = event.target;
        newTicketModalData[name] = value;
        setNewTicketModalData(newTicketModalData);
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.NewTicketModal, show: event.target.value}));
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
                 <EditUserProfileModal 
                    show={showEditUserProfileModal}
                    close = {closeEditUserProfileModal}
                    changeUserDetails= {changeUserDetails}
                    data = {userEditModalData}
                    updateUserProfile={updateUserProfile}
                />
                <EditTicketModal
                        close = {closeEditTicketModal} 
                        data={editTicketModalData} 
                        changeTicketDetails = {changeTicketDetails}
                        updateTicket = {updateTicketData}
                />
                <CreateTicketModal 
                    close = {closeNewTicketModal} 
                    addTicketDetails={addTicketDetails} 
                    createTicket={createTicket} 
                    data = {newTicketModalData} 
                />
                <Welcome />
                {showAllTickets && 
                    <div>
                        <TicketsButton showNewTicketModalFn={showNewTicketModalFn} getTicketsAndUpdateCards={getTicketsAndUpdateCards} currentTicketsType={currentTicketsType}/> 
                        <Tickets ticketsData = {selectedTicketsTypeData} showEditTicketModalFn= {showEditTicketModalFn} setEditTicketModalData={setEditTicketModalData} />
                    </div>
}
                {showDashboard && 
                    <div>
                        <TicketsButton showNewTicketModalFn={showNewTicketModalFn} getTicketsAndUpdateCards={getTicketsAndUpdateCards} currentTicketsType={currentTicketsType}/>
                        <Dashboard
                            showTicketsModalFn={showTicketsViewModalFn}  
                            allUserData={allUserData} 
                            setSelectedUserDetails={setUserEditModalData} 
                            showUserModalFn={showEditUserProfileModalFn} 
                            closeTicketsModal={closeTicketsViewModal} 
                            currentTicketsModalInfo={currentTicketsViewModalInfo}/> 
                    </div>   
                } 
                {showAllUsers && <UsersTable allUserData={allUserData} setUserEditModalData={setUserEditModalData} showUserModalFn={showEditUserProfileModalFn}/> }
                {showUserProfile &&<UserProfile updateProfile = {showEditUserProfileModalFn} showInfo = {setUserEditModalData} />}
            </div>
        </div>    
    );
}

export default Admin;