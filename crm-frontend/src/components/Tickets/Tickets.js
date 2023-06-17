import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MaterialTable from "@material-table/core";
import ExportCsv from '@material-table/exporters/csv';
import ExportPdf from '@material-table/exporters/pdf';
import {useDispatch } from 'react-redux';
import constants from '../../utils/constants';
import { updateCurrentModalData, updateShowTicketsModal } from '../../redux/slices/ticketsSlice';

const Tickets = (props)=>{
   const dispatch = useDispatch();
   const {ticketsModalType} = constants;
    return(
        <div>
            <MaterialTable 
                    onRowClick={(event, rowData)=>{
                        dispatch(updateCurrentModalData({modalType: ticketsModalType.EditTicketModal, data: rowData}));
                        dispatch(updateShowTicketsModal({modalType: ticketsModalType.EditTicketModal, show: true}));
                    }}
                    title={"Tickets"}
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
                                exportFunc: (cols, datas) => ExportPdf(cols, datas, "ticketsDataPdf"),
                            },
                            {
                                label: "Export CSV",
                                exportFunc: (cols, datas) => ExportCsv(cols, datas, "ticketsDataCsv"),
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
                    data={props.ticketsData}
                    columns={[
                        {
                            field: "ticketPriority",
                            title: "Ticket Priority",
                        },
                        {
                            field: "title",
                            title: "Title",
                        },
                        {
                            field: "description",
                            title: "Description",
                        },
                        {
                            field: "clientName",
                            title: "ClientName",
                        },
                        {
                            field: "createdAt",
                            title: "Created At",
                        },
                        {
                            field: "createdBy",
                            title: "Created By",
                        },
                        {
                            field: "assignedTo",
                            title: "Assigned To",
                        },
                        {
                            field: "assignee",
                            title: "Assignee",
                        },
                        {
                            field: "updatedAt",
                            title: "Updated At",
                        },  
                    ]}
                />
        </div>
    );
}

export default Tickets;