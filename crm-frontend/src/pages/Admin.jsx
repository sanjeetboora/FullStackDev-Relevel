import * as TicketService from '../services/tickets';
import * as UserService from '../services/users';
import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MaterialTable from "@material-table/core";
import ExportCsv from '@material-table/exporters/csv';
import ExportPdf from '@material-table/exporters/pdf';
import TicketCard from "../utils/ticketsCard";

function Admin(){
    const currUserName = useState(localStorage.getItem("name"));
    const [allUserData, setAllUserData] = useState([]);
    const [ticketsData, setTicketsData] = useState({});
    const [totalTicketsCount, setTotalTicketsCount] = useState(100);
    const [cardsDetails, setCardsDetails] = useState([]);
    const componentMounted = useRef(true);
    const ticketStatus = ["open", "inProgress", "resolved", "cancelled", "onHold"];
    const ticketCardColor = ["primary", "info", "warning", "light", "success"];

    useEffect(()=>{
        (async()=>{
            if(componentMounted.current){
                fetchUsers();
                updateTicketCardsData();
                componentMounted.current=false;
            }
        })();
    },[]);

    const fetchUsers = async() =>{
        const response =  await UserService.getAllUsers();
        setAllUserData(response.data.result);
    }

    const fetchTickets = async() =>{
        const result = {};
        for (let index = 0; index < ticketStatus.length; index++) {
            const status = ticketStatus[index];
            const res = await TicketService.getTicketsByStatus(status);
            result[status] = res.data.result;
        }
       return result;
    }

    const updateTicketCardsData = async() => {
        const response = await fetchTickets();
        setTicketsData(response);
        let totalTickets = 0;
        for(const ele in response){
            totalTickets += response[ele].length;
        }
        setTotalTicketsCount(totalTickets);
        const cardsData = [];
        for(let i=0; i<ticketStatus.length; i++){
            const data = {
                cardColor: ticketCardColor[i], 
                cardTitle: ticketStatus[i], 
                numberOfTickets : response[ticketStatus[i]].length, 
                percentageOfTickets : response[ticketStatus[i]].length*100/totalTickets,
            }
            cardsData.push(data);
        }
        setCardsDetails(cardsData);
    }

    return (
        <div>  
            <div className="row text-center" style={{marginTop: 1+'rem', marginBottom: 2+'rem'}}> <h1>Welcome {currUserName}!!!</h1></div>
            <p className="text-muted text-center" style={{marginBottom: 2+'rem'}}>Take a quick look at your admin stats.</p>
            {
                /* cards */
            }
            <div className="row text-center">
                {
                    cardsDetails.map(card => {
                        return <div className="col">
                            <TicketCard props ={{cardColor: card.cardColor, cardTitle: card.cardTitle, numberOfTickets : card.numberOfTickets, percentageOfTickets : card.percentageOfTickets}} />
                        </div>
                    })
                }
            </div>
            <hr style={{margin: 2+"rem"}}/>
            {
                /*user data table*/
                <MaterialTable 
                title={"User Records"}
                options={{
                    // Allow user to hide/show
                    // columns from Columns Button
                    columnsButton: true,
                    filtering: true,
                    sorting: true,
                    exportMenu: [
                        {
                          label: "Export PDF",
                          //// You can do whatever you wish in this function. We provide the
                          //// raw table columns and table data for you to modify, if needed.
                          // exportFunc: (cols, datas) => console.log({ cols, datas })
                          exportFunc: (cols, datas) => ExportPdf(cols, datas, "userDataPdf"),
                        },
                        {
                          label: "Export CSV",
                          exportFunc: (cols, datas) => ExportCsv(cols, datas, "userDataCsv"),
                        },
                      ],
                      headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                      },
                      rowStyle: {
                        backgroundColor: "#d4d4d4",
                      },
                  }}
                data={allUserData}
                columns={[
                    {
                        field: "name",
                        title: "Name",
                    },
                    {
                        field: "email",
                        title: "Email",
                    },
                    {
                        field: "userType",
                        title: "User Type",
                        lookup:{
                            "admin":"admin",
                            "customer":"customer",
                            "engineer":"engineer"
                        }
                    },
                    {
                        field: "userStatus",
                        title: "User Status",
                        lookup:{
                            "approved":"approved",
                            "pending": "pending",
                            "rejected":"rejected"
                        }
                    },
                  ]}
                />
            }

        </div>
    );
}

export default Admin;