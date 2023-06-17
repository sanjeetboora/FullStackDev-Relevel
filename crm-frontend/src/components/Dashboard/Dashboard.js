import UsersTable from "../UsersTable/UsersTable";
import TicketsModal from "../TicketsModal/TicketsModal";
import TicketCardsRow from "../TicketCardsRow/TicketCardsRow";
import userInfo  from '../../utils/currentUserInfo.js'
import constants  from '../../utils/constants.js'

function Dashboard (props){
    const {userType} = constants;
    return <div>
                <TicketCardsRow />
                <hr style={{margin: 2+"rem"}}/>
                {
                   userInfo.userType === userType.admin  && <UsersTable />
                }
                <TicketsModal /> 
            </div>
}

export default Dashboard;