import axios from 'axios';

const BASE_URL = process.env.REACT_APP_MBA_BACKEND_BASE_URL;


export const createBooking = async(data) => {
    try{
        const result = await axios.post(BASE_URL + 'book', 
        data, {headers:{
            'x-access-token': localStorage.getItem('token')
        }});
        return result.data.result;
    }
    catch(err){
        return {error: err.response.data.message};
    }
}

export const getBookingByBookingId = async(bookingId) => {
    try{
        const result = await axios.get(BASE_URL + `book/${bookingId}`, 
         {headers:{
            'x-access-token': localStorage.getItem('token')
        }});
        return result.data.result;
    }
    catch(err){
        return {error: err.response.data.message};
    }
}

