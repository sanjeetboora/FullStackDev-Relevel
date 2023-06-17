import Welcome from '../components/Welcome/Welcome';
import Sidebar from '../components/Sidebar/sidebar';
import Dashboard from '../components/Dashboard/Dashboard';
import Tickets from '../components/Tickets/Tickets';
import EditTicketModal from '../components/TicketsModal/EditTicketsModal';
import UserProfile from '../components/UserProfile/UserProfile';
import CreateTicketModal from '../components/TicketsModal/CreateTicketModal'
import TicketsButton from '../components/TicketsButton/TicketsButton';
import EditUserProfileModal from '../components/EditUserProfileModal/EditUserProfileModal'
import { useCommonFn } from '../hooks/useCommonFn';

function Engineer(){
   
    const [changeUserDetails, updateUserProfile, changeTicketDetails, updateTicketData, changeNewTicketDetails, createTicket, getTicketsAndUpdateCards, showAllTickets, showDashboard, showAllUsers, showUserProfile, selectedTicketsTypeData ] = useCommonFn();

    return (
        <div className='row'>  
            <Sidebar />
            <div className="container col-sm-6 col-md-8 col-lg-9 col-xl-9 vh-100" style={{overflow: "scroll"}}>
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
                {showUserProfile && <UserProfile />}
            </div>
        </div>    
    );
}

export default Engineer;