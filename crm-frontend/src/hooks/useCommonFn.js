import * as TicketService from '../services/tickets';
import * as UserService from '../services/users';
import { useEffect, useRef, useState } from "react";
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import constants from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { updateAllTickets, updateAssignedToMeTickets, 
    updateCreatedByMeTickets, updateTicketsByStatus, updateTicketsCardsDetails, 
    updateShowTicketsModal, updateCurrentModalData } from '../redux/slices/ticketsSlice';
import {updateAllUserData, updateShowUserModals, updateCurrentUserModalData, updateCurrentUserInfo} from '../redux/slices/usersSlice';
import {changeUserDetailsUtils} from '../utils/userUtils';

export const useCommonFn = () =>{
    const dispatch = useDispatch();
    const {ticketStatus, ticketCardColor, ticketsType, userType, userStatus, ticketsModalType, userModalType, sidebarTabs} = constants;
    const componentMounted = useRef(true);

    /* useSelector*/
    const currentTicketsType = useSelector((state) => state.tickets.CurrentTicketsType);
    const selectedTicketsTypeData = useSelector((state) => state.tickets[currentTicketsType]);
    const editTicketModalData= useSelector((state) => state.tickets.CurrentModalData[ticketsModalType.EditTicketModal]);
    const newTicketModalData= useSelector((state) => state.tickets.CurrentModalData[ticketsModalType.NewTicketModal]);
    const userEditModalData = useSelector((state) => state.users.CurrentUserModalData[userModalType.EditUserProfileModal]);
    const showDashboard = useSelector((state) => state.sidebar.ShowTab[sidebarTabs.Dashboard]);
    const showAllUsers = useSelector((state) => state.sidebar.ShowTab[sidebarTabs.Users]);
    const showUserProfile = useSelector((state) => state.sidebar.ShowTab[sidebarTabs.UserProfile]);
    const showAllTickets = useSelector((state) => state.sidebar.ShowTab[sidebarTabs.Tickets]);
    const currentUserInfo = useSelector((state) => state.users.CurrentUserInfo);

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

    useEffect(()=>{
        (async()=>{
            if(componentMounted.current){
                currentUserInfo.userType==userType.admin && await fetchUsers();
                const tickets = await getTickets();
                updateTicketCardsData(tickets);
                componentMounted.current=false;
            }
        })();
    },[]);

    const fetchUsers = async() =>{
        const response =  await UserService.getAllUsers();
        dispatch(updateAllUserData(response.data.result));
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
                percentageOfTickets : parseInt(ticketsData[ticketStatus[i]].length*100/(totalTickets===0?1:totalTickets)),
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
        const {data, value} = changeUserDetailsUtils(event, userEditModalData)
        dispatch(updateCurrentUserModalData({modalType: userModalType.EditUserProfileModal, data: data}));
        dispatch(updateShowUserModals({modalType: userModalType.EditUserProfileModal, show: value}));
    }

    const createTicket = async() => {
        const data = {
            title: newTicketModalData.title,
            description: newTicketModalData.description,
            ticketPriority: newTicketModalData.ticketPriority,
            status: newTicketModalData.status,
            assignedTo: newTicketModalData.assignedTo,
            clientName: newTicketModalData.clientName ? newTicketModalData.clientName : currentUserInfo.clientName,
        }
        await TicketService.createTicket(data);
        const tickets = await getTickets();
        await updateTicketCardsData(tickets);
    }

    const getTicketsAndUpdateCards = async(eventKey) =>{
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
            localStorage.setItem("email",updatedData.email);
            localStorage.setItem("name",updatedData.name);
            localStorage.setItem("userType",updatedData.userType);
            localStorage.setItem("userStatus",updatedData.userStatus);
            localStorage.setItem("clientName",updatedData.clientName);
            localStorage.setItem("_id",updatedData._id);
            localStorage.setItem("createdAt",updatedData.createdAt);
            localStorage.setItem("updatedAt",updatedData.updatedAt);
            localStorage.setItem("token",updatedData.token);
            dispatch(updateCurrentUserInfo(updatedData));
        }
        currentUserInfo.userType==userType.admin && await fetchUsers();
    }

    const changeTicketDetails= (event) =>{
        const {name, value} = event.target;
        const data = {...editTicketModalData};
        data[name] = value;
        dispatch(updateCurrentModalData({modalType: ticketsModalType.EditTicketModal, data: data}));
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.EditTicketModal, show: event.target.value}));
    }

    const changeNewTicketDetails= (event) =>{
        const {name, value} = event.target;
        const data = {...newTicketModalData};
        data[name] = value;
        dispatch(updateCurrentModalData({modalType: ticketsModalType.NewTicketModal, data: data}));
        dispatch(updateShowTicketsModal({modalType: ticketsModalType.NewTicketModal, show: event.target.value}));
    }

    return [changeUserDetails, updateUserProfile, changeTicketDetails, 
        updateTicketData, changeNewTicketDetails, createTicket, getTicketsAndUpdateCards, 
        showAllTickets, showDashboard, showAllUsers, showUserProfile, 
        selectedTicketsTypeData];
}