import axios from 'axios';

const BASE_URL = "http://localhost:8000/crmapp/api/v1/";
const access_token = localStorage.getItem("token");
axios.defaults.headers.common['x-access-token'] = access_token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const getAllTickets = async() =>{
    const res = await axios.get(BASE_URL+'ticket/');
    return res;
}

export const getTicketsByStatus = async(status) =>{
    const res = await axios.get(BASE_URL+'ticketbystatus/'+ status);
    return res;
}

export const updateTicketById = async(id, data) =>{
    const res = await axios.patch(BASE_URL+'ticket/'+ id, data);
    return res;
}

export const getTicketsCreatedByMe = async() =>{
    const res = await axios.get(BASE_URL+'getMyCreatedTickets/');
    return res;
}

export const getTicketsAssignedToMe = async() =>{
    const res = await axios.get(BASE_URL+'getMyAssignedTickets/');
    return res;
}
