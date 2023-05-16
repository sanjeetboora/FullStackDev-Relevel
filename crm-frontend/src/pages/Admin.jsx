import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MaterialTable from "@material-table/core";
import axios from 'axios';
import ExportCsv from '@material-table/exporters/csv';
import ExportPdf from '@material-table/exporters/pdf';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


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
    }

    return (
        <div>  
            <div className="row text-center" style={{marginTop: 1+'rem', marginBottom: 2+'rem'}}> <h1>Welcome {currUserName}!!!</h1></div>
            <p className="text-muted text-center" style={{marginBottom: 2+'rem'}}>Take a quick look at your admin stats.</p>
            {
                /* cards */
            }
            <div className="row text-center"> 
                <div className="col">
                    <div class="card bg-primary" style={{width: 16+"rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">Open</h5>
                            <hr />
                            <div className="row">
                                <div className="col">
                                    <h1>{openTickets.length}</h1>
                                </div>
                                <div className="col"> 
                                    <div style={{ width: 50, height: 50 }}>
                                        <CircularProgressbar 
                                            value={openTickets.length*100/totalTicketsCount} 
                                            text={`${openTickets.length*100/totalTicketsCount}%`} 
                                            styles={buildStyles({
                                                textColor: 'white',
                                                pathColor: 'white',
                                                trailColor: 'black',
                                            })} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-info" style={{width: 16+"rem"}}>    
                        <div class="card-body">
                            <h5 class="card-title">In Progress</h5>
                            <hr />
                            <div className="row">
                                <div className="col" >
                                    <h1>{inProgressTickets.length}</h1>
                                </div>
                                <div className="col">
                                    <div style={{ width: 50, height: 50 }}>
                                        <CircularProgressbar value={inProgressTickets.length/totalTicketsCount} text={`${inProgressTickets.length/totalTicketsCount}%`} styles={buildStyles({
                                                textColor: 'white',
                                                pathColor: 'white',
                                                trailColor: 'black',
                                            })}  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-warning" style={{width: 16+"rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">On Hold</h5>
                            <hr />
                            <div className="row">
                                <div className="col">
                                    <h1>{onHoldTickets.length}</h1>
                                </div>
                                <div className="col">
                                    <div style={{ width: 50, height: 50 }}>
                                        <CircularProgressbar value={onHoldTickets.length/totalTicketsCount} text={`${onHoldTickets.length/totalTicketsCount}%`} styles={buildStyles({
                                                textColor: 'white',
                                                pathColor: 'white',
                                                trailColor: 'black',
                                            })}  />
                                    </div>
                                </div>
                            </div>
                        </div>        
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-light" style={{width: 16+"rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">Cancelled</h5>
                            <hr />
                            <div className="row">
                                <div className="col">
                                    <h1>{cancelledTickets.length}</h1>
                                </div>
                                <div className="col">
                                    <div style={{ width: 50, height: 50 }}>
                                        <CircularProgressbar value={cancelledTickets.length/totalTicketsCount} text={`${cancelledTickets.length/totalTicketsCount}%`} styles={buildStyles({
                                                textColor: 'black',
                                                pathColor: 'white',
                                                trailColor: 'black',
                                            })} />
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-success" style={{width: 16+"rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">Resolved</h5>
                            <hr />
                            <div className="row">
                                <div className="col" >
                                    <h1>{resolvedTickets.length}</h1>
                                </div>
                                <div className="col">
                                    <div style={{ width: 50, height: 50 }}>
                                        <CircularProgressbar maxValue = {resolvedTickets.length} minValue = {0} value={resolvedTickets.length} text={`${resolvedTickets.length* 100/totalTicketsCount}%`} styles={buildStyles({
                                                textColor: 'white',
                                                pathColor: 'white',
                                                trailColor: 'black',
                                            })}  />
                                    </div>
                                </div>
                            </div>
                        </div>      
                    </div>
                </div>
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