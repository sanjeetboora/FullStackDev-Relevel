import axios from 'axios';

const BASE_URL = "https://crmapp-aola.onrender.com/crmapp/api/v1/";
//"http://localhost:8000/crmapp/api/v1/";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const getAllTickets = async () => {
    const access_token = localStorage.getItem("token");
    axios.defaults.headers.common['x-access-token'] = access_token;
    const res = await axios.get(BASE_URL + 'ticket/');
    return res;
}

export const getTicketsByStatus = async (status) => {
    const access_token = localStorage.getItem("token");
    axios.defaults.headers.common['x-access-token'] = access_token;
    const res = await axios.get(BASE_URL + 'ticketbystatus/' + status);
    return res;
}

export const updateTicketById = async (id, data) => {
    const access_token = localStorage.getItem("token");
    axios.defaults.headers.common['x-access-token'] = access_token;
    const res = await axios.patch(BASE_URL + 'ticket/' + id, data);
    return res;
}

export const getTicketsCreatedByMe = async () => {
    const access_token = localStorage.getItem("token");
    axios.defaults.headers.common['x-access-token'] = access_token;
    const res = await axios.get(BASE_URL + 'getMyCreatedTickets/');
    return res;
}

export const getTicketsAssignedToMe = async () => {
    const access_token = localStorage.getItem("token");
    axios.defaults.headers.common['x-access-token'] = access_token;
    const res = await axios.get(BASE_URL + 'getMyAssignedTickets/');
    return res;
}

export const createTicket = async (data) => {
    const access_token = localStorage.getItem("token");
    axios.defaults.headers.common['x-access-token'] = access_token;
    const res = await axios.post(BASE_URL + 'ticket/', data);
    return res;
}