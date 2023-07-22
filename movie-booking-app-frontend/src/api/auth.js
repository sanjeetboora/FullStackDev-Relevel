import axios from 'axios';

const BASE_URL = process.env.REACT_APP_MBA_BACKEND_BASE_URL;

export const signIn = async(data) => {
    try{
        const result = await axios.post(BASE_URL + 'auth/signin', data);
        return result.data.result;
    }
    catch(err){
        return {error: err.response.data.message};
    }
}

export const signUp = async(data) => {
    try{
        const result = await axios.post(BASE_URL + 'auth/signup', data);
        return result;
    }
    catch(err){
        const errorMessage = err.response.data.error || err.response.data.message;
        return {error: errorMessage};
    }
}



