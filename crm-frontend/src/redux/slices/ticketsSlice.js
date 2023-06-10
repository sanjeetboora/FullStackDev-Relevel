
import constants from "../../utils/constants"
import { createSlice } from '@reduxjs/toolkit'

const {ticketsType} = constants;
const initalTicketsState = {
    AssignedToMe : [],
    CreatedByMe: [],
    All:[]
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
        }
    },
});

export const {updateAllTickets, updateAssignedToMeTickets, updateCreatedByMeTickets} = ticketsSlice.actions;
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


