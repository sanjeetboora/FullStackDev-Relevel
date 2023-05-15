import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MaterialTable from "@material-table/core";
import axios from 'axios';
import ExportCsv from '@material-table/exporters/csv';
import ExportPdf from '@material-table/exporters/pdf';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Admin(){
    const BASE_URL = "http://localhost:8000/crmapp/api/v1/";
    const currUserName = useState(localStorage.getItem("name"));
    const [allUserData, setAllUserData] = useState([]);
    const access_token = localStorage.getItem("token");
    axios.defaults.headers.common['x-access-token'] = access_token;
    
    useEffect(()=>{
        (async()=>{
            fetchUsers();
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

    return (
        <div>  
            <div> Welcome {currUserName}!!!</div>

            {
                /* cards */
            }
            <div className="row text-center"> 
                <div className="col">
                    <div class="card bg-primary" style={{width: 16+"rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">Open</h5>
                            <hr />
                            <div style={{ width: 150, height: 150 }}>
                                <CircularProgressbar value={60} text={`${60}%`} />;
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-info" style={{width: 16+"rem"}}>    
                        <div class="card-body">
                            <h5 class="card-title">In Progress</h5>
                            <hr />
                            <div style={{ width: 150, height: 150 }}>
                                <CircularProgressbar value={60} text={`${60}%`} />;
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-warning" style={{width: 16+"rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">On Hold</h5>
                            <hr />
                            <div style={{ width: 150, height: 150 }}>
                                <CircularProgressbar value={60} text={`${60}%`} />;
                            </div>
                        </div>        
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-light" style={{width: 16+"rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">Cancelled</h5>
                            <hr />
                            <div style={{ width: 150, height: 150 }}>
                                <CircularProgressbar value={60} text={`${60}%`} />;
                            </div>
                        </div>   
                    </div>
                </div>
                <div className="col">
                    <div className="card bg-success" style={{width: 16+"rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">Resolved</h5>
                            <hr />
                            <div style={{ width: 150, height: 150 }}>
                                <CircularProgressbar value={60} text={`${60}%`} />;
                            </div>
                        </div>      
                    </div>
                </div>
            </div>

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