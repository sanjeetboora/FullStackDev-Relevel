import UsersTable from "../UsersTable/UsersTable";
import TicketsModal from "../TicketsModal/TicketsModal";
import TicketCardsRow from "../TicketCardsRow/TicketCardsRow";

function Dashboard (props){
    return <div>
                <TicketCardsRow />
                <hr style={{margin: 2+"rem"}}/>
                {
                    props.allUserData && <UsersTable allUserData={props.allUserData} setSelectedUserDetails={props.setSelectedUserDetails} showUserModalFn={props.showUserModalFn}/>
                }
                <TicketsModal /> 
            </div>
}

export default Dashboard;