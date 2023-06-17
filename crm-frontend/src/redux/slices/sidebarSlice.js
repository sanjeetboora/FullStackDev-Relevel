import { createSlice } from '@reduxjs/toolkit'

const initalSidebarState = {
    showSidebar: true,
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
        toggleSidebar:(state)=>{
            state.showSidebar = !state.showSidebar;
        }
    },
});

export const {updateShowTab, toggleSidebar} = sidebarSlice.actions;
export default sidebarSlice.reducer;


