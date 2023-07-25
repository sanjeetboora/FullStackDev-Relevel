import {CWidgetStatsC} from "@coreui/react"

function CardList(props){
    return(
        <div className="row text-white text-left">
            {props.showAddUser && <div className="col">
                <CWidgetStatsC
                    className="d-flex"
                    progress={{ color: 'success', value: 75 }}
                    text="Users"
                    title="Users"
                    color="dark"
                    inverse
                    icon = {<i className="bi bi-people text-danger"/>}
                    value="Add Users" 
                    onClick={()=> props.showAddUser(true)}/>
            </div>}
            {props.showAddTheatre && <div className="col">
                <CWidgetStatsC
                    className="mb-3"
                    progress={{ color: 'success', value: 75 }}
                    text="Theatres"
                    title="Theatres"
                    color="dark"
                    inverse
                    icon = {<i className="bi bi-building text-danger"/>}
                    value="Add Theatres" 
                    onClick = {()=>props.showAddTheatre(true)}/>
            </div>}
            {props.showAddMovie && <div className="col">
                <CWidgetStatsC
                    className="mb-3"
                    progress={{ color: 'success', value: 75 }}
                    text="Movies"
                    title="Movies"
                    color="dark"
                    inverse
                    icon = {<i className="bi bi-film text-danger"/>}
                    value="Add Movies" 
                    onClick = {()=>props.showAddMovie(true)}/>
            </div>}
        </div> 
    )
}

export default CardList;