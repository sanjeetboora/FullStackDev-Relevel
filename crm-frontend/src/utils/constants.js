const ticketStatus = ["open", "inProgress", "resolved", "cancelled", "onHold"];
const ticketCardColor = ["primary", "info", "warning", "light", "success"];
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
const constants = {ticketCardColor, ticketStatus, ticketsType, userType, userStatus}

export default constants;