import * as TicketService from '../services/tickets';
import Welcome from '../components/Welcome/Welcome';
import Sidebar from '../components/Sidebar/sidebar';
import { useEffect,useRef, useState } from 'react';
import constants from '../utils/constants';
import Dashboard from '../components/Dashboard/Dashboard';
import Tickets from '../components/Tickets/Tickets';
import EditTicketModal from '../components/TicketsModal/EditTicketsModal';
import UserProfile from '../components/UserProfile/UserProfile';
import CreateTicketModal from '../components/TicketsModal/CreateTicketModal'
import TicketsButton from '../components/TicketsButton/TicketsButton';

function Engineer(){

    const [showDashboard, setShowDashboard] = useState(false);
    const [showAllTickets, setShowAllTickets] = useState(false);
    const [showUserProfile, setShowUserProfle] = useState(false);
    const [cardsDetails, setCardsDetails] = useState([]);
    const {ticketStatus, ticketCardColor, ticketsType} = constants;
    const [ticketsData, setTicketsData] = useState({});
    const [totalTicketsCount, setTotalTicketsCount] = useState(100);
    const componentMounted = useRef(true);
    const [showTicketsModal, setShowTicketsModal] = useState(false);
    const [currentTicketsModalInfo, setCurrentTicketsModalInfo] = useState([]);
    const [showEditTicketModal, setShowEditTicketModal] = useState(false);
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);
    const [editTicketModalData, setEditTicketModalData] = useState({});
    const [newTicketModalData, setNewTicketModalData] = useState({});
    const [currentTicketsType, setCurrentTicketsType] = useState(ticketsType.AssignedToMe);

    const closeEditTicketModal = () =>{
        setShowEditTicketModal(false);
    }
    const showEditTicketModalFn = () =>{
        setShowEditTicketModal(true);
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

    useEffect(()=>{
        (async()=>{
            if(componentMounted.current){
                const tickets = await getTickets();
                updateTicketCardsData(tickets);
                componentMounted.current=false;
            }
        })();
    },[]);
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

    const showTicketsModalFn =(event)=>{
        console.log(event);
        const cardTicketStatus = event.target.firstChild.innerText;
        setCurrentTicketsModalInfo(ticketsData[cardTicketStatus]);
        setShowTicketsModal(true);
    }
    const closeTicketsModal =()=>{
        setShowTicketsModal(false);
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
        closeEditTicketModal();
        const tickets = await getTickets();
        await updateTicketCardsData(tickets);
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

    const showDashboardFn = () =>{
        setShowDashboard(true);
        setShowAllTickets(false);
        setShowUserProfle(false);
    }
    const showAllTicketsFn = () =>{
        setShowDashboard(false);
        setShowAllTickets(true);
        setShowUserProfle(false);
    }
    const showUserProfileFn = () =>{
        setShowDashboard(false);
        setShowAllTickets(false);
        setShowUserProfle(true);
    }

    const getTicketsAndUpdateCards = async(eventKey) =>{
        console.log("eventKey", eventKey);
        setCurrentTicketsType(eventKey);
        const response = await getTickets(eventKey);
        updateTicketCardsData(response);
    }
    const showNewTicketModalFn = () =>{
        setShowNewTicketModal(true);
    }
    const closeNewTicketModal = () =>{
        setShowNewTicketModal(false);
    }

    return (
        <div className = "row">
            <div className = "col-2">
                <Sidebar 
                    showDashboard = {showDashboardFn} 
                    showTickets={showAllTicketsFn} 
                    showUserProfile={showUserProfileFn}
                />
            </div>
            <div className="container col vh-100" style={{overflow: "scroll"}}>
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
                {showDashboard && 
                    <div>
                        <TicketsButton showNewTicketModalFn={showNewTicketModalFn} getTicketsAndUpdateCards={getTicketsAndUpdateCards} currentTicketsType={currentTicketsType}/>
                        <Dashboard 
                            cardsDetails = {cardsDetails} 
                            showTicketsModalFn={showTicketsModalFn}  
                            showTicketsModal = {showTicketsModal} 
                            closeTicketsModal={closeTicketsModal} 
                            currentTicketsModalInfo={currentTicketsModalInfo}
                        />  
                    </div>  
                } 
                {showAllTickets &&  
                    <div>
                        <TicketsButton showNewTicketModalFn={showNewTicketModalFn} getTicketsAndUpdateCards={getTicketsAndUpdateCards} currentTicketsType={currentTicketsType}/>
                        <Tickets ticketsData = {[].concat(...Object.values(ticketsData))} showEditTicketModalFn= {showEditTicketModalFn} setEditTicketModalData={setEditTicketModalData} />
                    </div>
                }
                {showUserProfile && <UserProfile />}
            </div>  
        </div>
    );
}

/** 
    How [].concat(...Object.values(ticketsData)) works??
    * ticketsData = {
        open: [{1}, {2}, {3}]
        close: [{11}, {12}, {13}]
        resolved: [{21}, {22}, {23}]
      }
    * Object.values(ticketsData)=> [[{1}, {2}, {3}], [{11}, {12}, {13}], [{21}, {22}, {23}]] 
    * [].concat(...Object.values(ticketsData))
    * [].concat(...[[{1}, {2}, {3}], [{11}, {12}, {13}], [{21}, {22}, {23}]] )
    * [].concat([{1}, {2}, {3}], [{11}, {12}, {13}], [{21}, {22}, {23}])
    * [{1}, {2}, {3}, {11}, {12}, {13}, {21}, {22}, {23}]

*/
export default Engineer;