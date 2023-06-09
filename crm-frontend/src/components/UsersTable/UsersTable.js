import MaterialTable from "@material-table/core";
import ExportCsv from '@material-table/exporters/csv';
import ExportPdf from '@material-table/exporters/pdf';
import constants from '../../utils/constants';

function UsersTable(props){
    const {userType, userStatus} = constants;
    return <MaterialTable 
                onRowClick={(event, rowData) => {
                    const data = {...rowData, selfUpdate:false};
                    props.setUserEditModalData(data);
                    props.showUserModalFn();
                }}
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
                data={props.allUserData}
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
                        lookup: userType
                    },
                    {
                        field: "userStatus",
                        title: "User Status",
                        lookup: userStatus
                    },
                ]}
            />
}

export default UsersTable;