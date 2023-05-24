import TicketCard from "../../utils/ticketsCard";
import UsersTable from "../UsersTable/UsersTable";
import TicketsModal from "../TicketsModal/TicketsModal";

function Dashboard (props){
    return <div>
                <div className="row text-center">
                    {
                        props.cardsDetails.map(card => {
                            return <div className="col" onClick={props.showTicketsModalFn}>
                                <TicketCard props ={{cardColor: card.cardColor, cardTitle: card.cardTitle, numberOfTickets : card.numberOfTickets, percentageOfTickets : card.percentageOfTickets}} />
                            </div>
                        })
                    }
                </div>
                <hr style={{margin: 2+"rem"}}/>
                {
                    <UsersTable allUserData={props.allUserData} setSelectedUserDetails={props.setSelectedUserDetails} showUserModalFn={props.showUserModalFn}/>
                }
                <TicketsModal  showTicketsModal = {props.showTicketsModal} closeTicketsModal={props.closeTicketsModal} currentTicketsModalInfo={props.currentTicketsModalInfo} /> 
            </div>
}

export default Dashboard;