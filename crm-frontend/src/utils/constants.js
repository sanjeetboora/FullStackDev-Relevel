const ticketStatus = ["open", "inProgress", "resolved", "cancelled", "onHold"];
const ticketCardColor = ["primary", "info", "warning", "light", "success"];
const ticketsModalType = {  
    ViewTicketsModal:"ViewTicketsModal",
    EditTicketModal: "EditTicketModal",
    NewTicketModal: "NewTicketModal"
};
const ticketsType = {
    AssignedToMe:"AssignedToMe",
    CreatedByMe:"CreatedByMe",
    All:"All"
}
const userType = {
    customer:"customer",
    engineer:"engineer",
    admin:"admin"
}
const userStatus = {
    approved:"approved", 
    suspended:"suspended", 
    rejected:"rejected"
}
const constants = {ticketCardColor, ticketStatus, ticketsType, userType, userStatus, ticketsModalType}

export default constants;