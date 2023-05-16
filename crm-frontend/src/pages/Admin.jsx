import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MaterialTable from "@material-table/core";
import axios from 'axios';
import ExportCsv from '@material-table/exporters/csv';
import ExportPdf from '@material-table/exporters/pdf';
import TicketCard from "../utils/ticketsCard";


function Admin(){
    const BASE_URL = "http://localhost:8000/crmapp/api/v1/";
    const currUserName = useState(localStorage.getItem("name"));
    const [allUserData, setAllUserData] = useState([]);
    const [openTickets, setopenTickets] = useState([]);
    const [inProgressTickets, setInProgressTickets] = useState([]);
    const [resolvedTickets, setResolvedTickets] = useState([]);
    const [onHoldTickets, setOnHoldTickets] = useState([]);
    const [cancelledTickets, setCancelledTickets] = useState([]);
    const [totalTicketsCount, setTotalTicketsCount] = useState(100);
    const [cardsDetails, setCardsDetails] = useState([]);
    const componentMounted = useRef(true);
    const access_token = localStorage.getItem("token");
    axios.defaults.headers.common['x-access-token'] = access_token;
    
    useEffect(()=>{
        (async()=>{
            if(componentMounted.current){
                fetchUsers();
                updateTotalTickets();
                componentMounted.current=false;
            }
        })();
    },[]);

    const fetchUsers = () =>{
        axios.get(BASE_URL+'users/').then((response)=>{
            console.log(response);
            setAllUserData(response.data.result);
        }).catch(err =>{
            console.log(err);
        })
    }

    const fetchTickets = async() =>{  
        const open = await axios.get(BASE_URL+'ticketbystatus/open');
        const inprogress = await axios.get(BASE_URL+'ticketbystatus/inProgress');
        const resolved = await axios.get(BASE_URL+'ticketbystatus/resolved');
        const onhold = await axios.get(BASE_URL+'ticketbystatus/onHold');
        const cancelled = await axios.get(BASE_URL+'ticketbystatus/cancelled');
        return {open, inprogress, resolved, cancelled, onhold};
    }

    const updateTotalTickets = async() => {
        const response = await fetchTickets();
        setopenTickets(response.open.data.result);
        setCancelledTickets(response.cancelled.data.result);
        setOnHoldTickets(response.onhold.data.result);
        setInProgressTickets(response.inprogress.data.result);
        setResolvedTickets(response.resolved.data.result);
        setTotalTicketsCount(response.open.data.result.length+response.cancelled.data.result.length+response.resolved.data.result.length+response.inprogress.data.result.length+response.onhold.data.result.length);
        const cardsData = [
            {cardColor: "primary", cardTitle: "Open", numberOfTickets : openTickets.length, percentageOfTickets : openTickets.length*100/totalTicketsCount},
            {cardColor: "info", cardTitle: "In Progress", numberOfTickets : inProgressTickets.length, percentageOfTickets : inProgressTickets.length*100/totalTicketsCount},
            {cardColor: "warning", cardTitle: "On Hold", numberOfTickets : onHoldTickets.length, percentageOfTickets : onHoldTickets.length*100/totalTicketsCount},
            {cardColor: "light", cardTitle: "Cancelled", numberOfTickets : cancelledTickets.length, percentageOfTickets : cancelledTickets.length*100/totalTicketsCount},
            {cardColor: "success", cardTitle: "Resolved", numberOfTickets : resolvedTickets.length, percentageOfTickets : resolvedTickets.length*100/totalTicketsCount}
        ]
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