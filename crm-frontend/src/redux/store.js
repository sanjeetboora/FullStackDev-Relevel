import { configureStore } from '@reduxjs/toolkit'
import ticketsReducer from './slices/ticketsSlice';
import usersReducer from './slices/usersSlice';
import sidebarReducer from './slices/sidebarSlice'

const store = configureStore({
    /* root reducer */
    reducer:{
        tickets: ticketsReducer,
        users: usersReducer,
        sidebar: sidebarReducer,
    }
 });

 export default store;