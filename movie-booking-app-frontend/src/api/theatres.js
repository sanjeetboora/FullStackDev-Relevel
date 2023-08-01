import axios from 'axios';

const BASE_URL = process.env.REACT_APP_MBA_BACKEND_BASE_URL;

export const getAllTheatres = async() => {
    try{
        const result = await axios.get(BASE_URL + 'theatres', 
        {headers:{
            'x-access-token': localStorage.getItem('token')
        }});
        return result.data.result;
    }
    catch(err){
        return {error: err.response.data.message};
    }
}

export const getTheatreById = async(theatreId) => {
    try{
        const result = await axios.get(BASE_URL + `theatres/${theatreId}`, 
        {headers:{
            'x-access-token': localStorage.getItem('token')
        }});
        return result.data.result;
    }
    catch(err){
        return {error: err.response.data.message};
    }
}

export const createTheatre = async(data) => {
    try{
        const result = await axios.post(BASE_URL + 'theatres', 
        data, {headers:{
            'x-access-token': localStorage.getItem('token')
        }});
        return result.data.result;
    }
    catch(err){
        return {error: err.response.data.message};
    }
}

