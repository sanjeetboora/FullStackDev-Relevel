import axios from 'axios';

const BASE_URL = "http://localhost:8000/crmapp/api/v1/";
const access_token = localStorage.getItem("token");
axios.defaults.headers.common['x-access-token'] = access_token;

export const getAllUsers = async() =>{
    const response = await axios.get(BASE_URL+'users/');
    return response;
}