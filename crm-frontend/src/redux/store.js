import { configureStore } from '@reduxjs/toolkit'
import ticketsReducer from './slices/ticketsSlice';

const store = configureStore({
    /* root reducer */
    reducer:{
        tickets: ticketsReducer,
    }
 });

 export default store;