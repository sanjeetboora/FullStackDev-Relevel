import UsersTable from "../UsersTable/UsersTable";
import TicketsModal from "../TicketsModal/TicketsModal";
import TicketCardsRow from "../TicketCardsRow/TicketCardsRow";

function Dashboard (props){
    return <div>
                <TicketCardsRow cardsDetails = {props.cardsDetails} showTicketsModal ={props.showTicketsModalFn}/>
                <hr style={{margin: 2+"rem"}}/>
                {
                    props.allUserData && <UsersTable allUserData={props.allUserData} setSelectedUserDetails={props.setSelectedUserDetails} showUserModalFn={props.showUserModalFn}/>
                }
                <TicketsModal  showTicketsModal = {props.showTicketsModal} closeTicketsModal={props.closeTicketsModal} currentTicketsModalInfo={props.currentTicketsModalInfo} /> 
            </div>
}

export default Dashboard;