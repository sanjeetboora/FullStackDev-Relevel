import axios from 'axios';

const BASE_URL = "https://crmapp-aola.onrender.com/crmapp/api/v1/";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const getAllUsers = async () => {
    const access_token = localStorage.getItem("token");
    axios.defaults.headers.common['x-access-token'] = access_token;
    const response = await axios.get(BASE_URL + 'users/');
    return response;
}

export const updateUserData = async (data) => {
    const access_token = localStorage.getItem("token");
    axios.defaults.headers.common['x-access-token'] = access_token;
    const response = await axios.patch(BASE_URL + 'user/updateUser', data);
    return response;
}