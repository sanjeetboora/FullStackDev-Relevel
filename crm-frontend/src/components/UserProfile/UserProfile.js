import { Button } from "react-bootstrap";
import userInfo from '../../utils/currentUserInfo'
import UserProfileRow from "./UserProfileRow";

function UserProfile(props){
    return (
        <section style={{"background-color": "#eee"}}>
            <div class="container py-5">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card mb-4">
                        <div class="card-body">
                            <UserProfileRow field = "Name" value = {userInfo.name}/>
                            <hr />
                            <UserProfileRow field = "Email" value = {userInfo.email}/>
                            <hr />
                            <UserProfileRow field = "Type" value = {userInfo.userType}/> 
                            <hr />
                            <UserProfileRow field = "Status" value = {userInfo.userStatus}/>
                            <hr />
                            <UserProfileRow field = "Organization" value = {userInfo.clientName}/>
                            <hr />
                            <UserProfileRow field = "Joined on" value = {userInfo.createdAt}/>
                            <hr />
                            <UserProfileRow field = "Updated on" value = {userInfo.updatedAt}/>
                            <hr />
                            <Button variant="primary" onClick={() => {
                                const data = {...userInfo, selfUpdate:true};
                                props.showInfo(data);
                                props.updateProfile();
                            }}>
                                Edit Profile
                            </Button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserProfile;