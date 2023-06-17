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
const userModalType = {  
    EditUserProfileModal:"EditUserProfileModal",
};

const sidebarTabs = {
    Dashboard:"Dashboard",
    Tickets: "Tickets",
    Users: "Users",
    Profile: "Profile",
    Logout:"Logout"
}

const constants = {ticketCardColor, ticketStatus, ticketsType, userType, userStatus, ticketsModalType, userModalType, sidebarTabs}

export default constants;