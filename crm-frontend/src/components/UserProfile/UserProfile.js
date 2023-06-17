import { Button } from "react-bootstrap";
import constants from '../../utils/constants';
import UserProfileRow from "./UserProfileRow";
import { useDispatch, useSelector } from "react-redux";
import { updateShowUserModals, updateCurrentUserModalData} from '../../redux/slices/usersSlice';

function UserProfile(){
    const dispatch = useDispatch();
    const {userModalType} = constants;
    const userInfo =  useSelector((state) => state.users.CurrentUserInfo);
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
                                dispatch(updateCurrentUserModalData({modalType: userModalType.EditUserProfileModal, data: data}));
                                dispatch(updateShowUserModals({modalType: userModalType.EditUserProfileModal, show:true}));
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