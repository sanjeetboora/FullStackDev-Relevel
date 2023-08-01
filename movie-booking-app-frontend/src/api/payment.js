import axios from 'axios';

const BASE_URL = process.env.REACT_APP_MBA_BACKEND_BASE_URL;


export const createPayment = async(data) => {
    try{
        const result = await axios.post(BASE_URL + 'payments', 
        data, {headers:{
            'x-access-token': localStorage.getItem('token')
        }});
        return result.data.result;
    }
    catch(err){
        return {error: err.response.data.message};
    }
}
