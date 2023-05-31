
function UserProfile(props){
    return <div>
            <div><span>Name: </span> <span>{localStorage.getItem("name")}</span></div>
            <div><span>Email: </span> <span>{localStorage.getItem("email")}</span></div>
            <div><span>User Type: </span> <span>{localStorage.getItem("userType")}</span></div>
            <div><span>User Status: </span> <span>{localStorage.getItem("userStatus")}</span></div>
            <div><span>Organization: </span> <span>{localStorage.getItem("clientName")}</span></div>
        </div>
}

export default UserProfile;