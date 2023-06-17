import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import { CSidebar, CSidebarBrand, CSidebarNav, CNavItem, CBadge } from '@coreui/react';
import { logout } from '../../handlers/logout';
import constants from '../../utils/constants';
import userInfo from '../../utils/currentUserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, updateShowTab } from '../../redux/slices/sidebarSlice';

function Sidebar(){
    const dispatch = useDispatch();
    const {sidebarTabs, userType} = constants;
    const showSidebar = useSelector((state) => state.sidebar.showSidebar);
    const showTickets = () =>{ dispatch(updateShowTab(sidebarTabs.Tickets));}
    const showDashboard = () =>{ dispatch(updateShowTab(sidebarTabs.Dashboard)); }
    const showUsers = () =>{ dispatch(updateShowTab(sidebarTabs.Users)); }
    const showUserProfile = () =>{ dispatch(updateShowTab(sidebarTabs.UserProfile));}
    const toggleSidebarfn = ()=>{dispatch(toggleSidebar())};
    return <div className={showSidebar ?"col-3":""}> {
            showSidebar ?
                <div>
                    <CSidebar className='vh-100 d-block d-sm-block d-md-block' style={{position:'relative', marginLeft: 0}} visible={false} >
                    <CSidebarBrand style={{height: '3rem'}} onClick={toggleSidebarfn}>CRM App</CSidebarBrand>
                        <CSidebarNav>
                            <div onClick={showDashboard}>
                                <CNavItem href="#">
                                    <i class="bi bi-speedometer2 m-2"></i>
                                    <div className="mx-3">{sidebarTabs.Dashboard}</div> 
                                </CNavItem>
                            </div>
                            <div onClick={showTickets}>
                                <CNavItem href="#">
                                    <i class="bi bi-ticket m-2"></i>
                                    <div className="mx-3">{sidebarTabs.Tickets}</div> 
                                    <CBadge color="primary ms-auto">Recommended</CBadge>
                                </CNavItem>
                            </div>
                            { userInfo.userType === userType.admin  &&
                                <div onClick={showUsers}>
                                    <CNavItem href="#">
                                        <i class="bi bi-people m-2"></i>
                                        <div className="mx-3">{sidebarTabs.Users}</div> 
                                    </CNavItem>
                                </div>
                            }
                            <div onClick={showUserProfile}>
                                    <CNavItem href="#">
                                        <i class="bi bi-person-circle m-2"></i>
                                        <div className="mx-3">{sidebarTabs.Profile}</div> 
                                    </CNavItem>
                                </div>
                            <div onClick={logout}>
                                <CNavItem href="#">
                                    <i class="bi bi-box-arrow-left m-2"></i>
                                    <div className="mx-3">{sidebarTabs.Logout}</div> 
                                </CNavItem>
                            </div>
                        </CSidebarNav>
                    </CSidebar>
                </div>
                        : 
                        <Button onClick={toggleSidebarfn} style={{backgroundColor:"#3c4b64", borderRadius:0}}>CRM App</Button>
        }</div>
}

export default Sidebar;