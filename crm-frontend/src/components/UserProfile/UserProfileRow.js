function UserProfileRow(props){
    return(
        <div class="row">
            <div class="col-sm-3">
                <p class="mb-0">{props.field}</p>
            </div>
            <div class="col-sm-9">
                <p class="text-muted mb-0">{props.value}</p>
            </div>
        </div>
    )
}

export default UserProfileRow;