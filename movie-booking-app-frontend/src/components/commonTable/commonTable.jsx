import MaterialTable from '@material-table/core'

function CommonTable(props){
    const arr = props.data && props.data.length>0 && Object.keys(props.data[0]);
    const colArr = arr && arr.map(ele =>{
        return {title: ele, field: ele};
    })

    return(
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={colArr || []}
                data={props.data || []}
                title={props.tableName}
                options={{
                    headerStyle: {
                        backgroundColor: '#212631',
                        color: '#FFF'
                    }
                }}
            />
        </div>
    )
}


export default CommonTable;