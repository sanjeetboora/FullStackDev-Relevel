
import constants from "../../utils/constants"
import { createSlice } from '@reduxjs/toolkit'

const {ticketsType} = constants;
const initalTicketsState = {
    AssignedToMe : [],
    CreatedByMe: [],
    All:[],
    CurrentTicketsType:ticketsType.AssignedToMe,
    TicketsByStatus:{
        open:[],
        inProgress: [], 
        resolved: [],
        cancelled: [],
        onHold: [],
    },
    TicketsCardsDetails: [],
    ShowTicketsModal:{
        ViewTicketsModal: false,
        EditTicketModal:false,
        NewTicketModal: false,
    },
    CurrentModalData:{
        ViewTicketsModal: {},
        EditTicketModal:{},
        NewTicketModal: {},
    }
}

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: initalTicketsState,
    reducers:{
        updateCreatedByMeTickets: (state, action) =>{
            state[ticketsType.CreatedByMe] = action.payload;
        },
        updateAssignedToMeTickets: (state, action) =>{
            state[ticketsType.AssignedToMe] = action.payload;
        },
        updateAllTickets: (state, action) =>{
            state[ticketsType.All] = action.payload;
        },
        updateTicketsByStatus:(state, action)=>{
            state.TicketsByStatus = action.payload;
        },
        updateTicketsCardsDetails:(state, action)=>{
            state.TicketsCardsDetails = action.payload;
        },
        updateShowTicketsModal:(state, action)=>{
            /** 
                Expected type of payload here
                payload = {
                    modalType: "ViewTicketsModal",
                    show: false
                }
            */
            state.ShowTicketsModal[action.payload.modalType] = action.payload.show;
        },
        updateCurrentModalData:(state, action)=>{
            /** 
                Expected type of payload here
                payload = {
                    modalType: "ViewTicketsModal",
                    data: {} 
                }
            */
            state.CurrentModalData[action.payload.modalType] = action.payload.data;
        },
        updateCurrentTicketsType:(state, action)=>{
            state.CurrentTicketsType = action.payload;
        } 
    },
});

export const {updateAllTickets, updateAssignedToMeTickets, updateCreatedByMeTickets, updateTicketsByStatus, updateTicketsCardsDetails, updateShowTicketsModal, updateCurrentModalData, updateCurrentTicketsType} = ticketsSlice.actions;
export default ticketsSlice.reducer;




/**
function ticketsReducer(state=initalState, action){
    if(action.type == ticketsType.CreatedByMe){
        state[ticketsType.CreatedByMe] = action.payload;
    }
    else if(action.type == ticketsType.All){
        state[ticketsType.All] = action.payload;
    }
    else if(action.type == ticketsType.AssignedToMe){
        state[ticketsType.AssignedToMe] = action.payload;
    }
    return state;
}
*/


