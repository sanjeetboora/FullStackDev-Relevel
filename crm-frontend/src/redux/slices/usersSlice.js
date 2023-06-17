
import constants from "../../utils/constants"
import { createSlice } from '@reduxjs/toolkit'
import userInfo from '../../utils/currentUserInfo'

const initalUsersState = {
    AllUserData:[],
    ShowUserModals:{
        EditUserProfileModal:false,
    },
    CurrentUserModalData:{
        EditUserProfileModal:{selfUpdate:false},
    },
    CurrentUserInfo: userInfo
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: initalUsersState,
    reducers:{
        updateAllUserData:(state, action) =>{
            state.AllUserData = action.payload;
        },
        updateShowUserModals:(state, action) =>{
            state.ShowUserModals[action.payload.modalType] = action.payload.show;
        },
        updateCurrentUserModalData:(state, action) => {
            state.CurrentUserModalData[action.payload.modalType] = action.payload.data
        },
        updateCurrentUserInfo:(state, action) => {
            state.CurrentUserInfo= action.payload;
        },
    },
});

export const {updateAllUserData, updateShowUserModals, updateCurrentUserModalData, updateCurrentUserInfo} = usersSlice.actions;
export default usersSlice.reducer;


