import axios from 'axios';

const BASE_URL = process.env.REACT_APP_MBA_BACKEND_BASE_URL;

export const getShowroomById = async(showroomId) => {
    try{
        const result = await axios.get(BASE_URL + `showrooms/${showroomId}`, 
        {headers:{
            'x-access-token': localStorage.getItem('token')
        }});
        return result.data.result;
    }
    catch(err){
        return {error: err.response.data.message};
    }
}
