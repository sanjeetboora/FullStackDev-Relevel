const ticketStatus = ["open", "inProgress", "resolved", "cancelled", "onHold"];
const ticketCardColor = ["primary", "info", "warning", "light", "success"];
const ticketsType = {
    AssignedToMe:"AssignedToMe",
    CreatedByMe:"CreatedByMe",
    All:"All"
}
const constants = {ticketCardColor, ticketStatus, ticketsType}

export default constants;