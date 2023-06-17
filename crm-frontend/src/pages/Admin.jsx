import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Tickets from '../components/Tickets/Tickets';
import UsersTable from '../components/UsersTable/UsersTable';
import Sidebar from '../components/Sidebar/sidebar';
import UserProfile from '../components/UserProfile/UserProfile';
import Dashboard from '../components/Dashboard/Dashboard';
import EditTicketModal from '../components/TicketsModal/EditTicketsModal';
import Welcome from '../components/Welcome/Welcome';
import TicketsButton from '../components/TicketsButton/TicketsButton';
import CreateTicketModal from '../components/TicketsModal/CreateTicketModal';
import EditUserProfileModal from '../components/EditUserProfileModal/EditUserProfileModal';
import { useCommonFn } from '../hooks/useCommonFn';
import { Button } from '@coreui/coreui';

function Admin(){
   const [changeUserDetails, updateUserProfile, changeTicketDetails, updateTicketData, changeNewTicketDetails, createTicket, getTicketsAndUpdateCards, showAllTickets, showDashboard, showAllUsers, showUserProfile, selectedTicketsTypeData ] = useCommonFn();
    return (
        <div className='row'>  
            <Sidebar />
            <div className="container col-9 vh-100" style={{overflow: "scroll"}}>
                <EditUserProfileModal 
                    changeUserDetails= {changeUserDetails}
                    updateUserProfile={updateUserProfile}
                />
                <EditTicketModal
                        changeTicketDetails = {changeTicketDetails}
                        updateTicket = {updateTicketData}
                />
                <CreateTicketModal 
                    changeNewTicketDetails={changeNewTicketDetails} 
                    createTicket={createTicket} 
                />
                <Welcome />
                {showAllTickets && 
                    <div>
                        <TicketsButton getTicketsAndUpdateCards={getTicketsAndUpdateCards}/> 
                        <Tickets ticketsData = {selectedTicketsTypeData} />
                    </div>
                }
                {showDashboard && 
                    <div>
                        <TicketsButton getTicketsAndUpdateCards={getTicketsAndUpdateCards} />
                        <Dashboard /> 
                    </div>   
                } 
                {showAllUsers && <UsersTable /> }
                {showUserProfile && <UserProfile />}
            </div>
        </div>    
    );
}

export default Admin;