import constants from "./constants";

const {ticketStatus, ticketCardColor, ticketsType, userType, userStatus, ticketsModalType, userModalType, sidebarTabs} = constants;
    
export const changeUserDetailsUtils = (event, userEditModalData) =>{
    if(typeof event === 'string' || event instanceof String){
        if(event in userType){
            event = {target:{name:"userType", value: event}};
        }else if(event in userStatus){
            event = {target:{name:"userStatus", value: event}};
        }
    }
    const {name, value} = event.target;
    const data = {...userEditModalData};
    data[name] = value;
    return {data, value:event.target.value}
}