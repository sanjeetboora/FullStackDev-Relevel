
import constants from "../../utils/constants"
import { createSlice } from '@reduxjs/toolkit'
import userInfo from '../../utils/currentUserInfo'

const initalSidebarState = {
    currentOpenTab: "",
    ShowTab:{
        Dashboard: false,
        Tickets: false,
        Users: false,
        Profile: false,
        Logout: false,
    }
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initalSidebarState,
    reducers:{
        updateShowTab: (state, action) =>{
            state.ShowTab[state.currentOpenTab] = false;
            state.ShowTab[action.payload] = true;
            state.currentOpenTab = action.payload;
        },
    },
});

export const {updateShowTab} = sidebarSlice.actions;
export default sidebarSlice.reducer;


