import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { CSidebar, CSidebarBrand, CSidebarNav, CNavItem, CNavTitle,CNavGroup, CBadge, CSidebarToggler } from '@coreui/react';

function Sidebar(props){
    return <CSidebar className='vh-100' style={{position:'relative'}} visible={true}>
                <CSidebarBrand>CRM App</CSidebarBrand>
                <CSidebarNav>
                    <div onClick={props.showShowDashboardFn}>
                        <CNavItem href="#">
                            <i class="bi bi-speedometer2 m-2"></i>
                            <div className="mx-3">Dashboard</div> 
                        </CNavItem>
                    </div>
                    <div onClick={props.showAllTicketsFn}>
                        <CNavItem href="#">
                            <i class="bi bi-ticket m-2"></i>
                            <div className="mx-3">Tickets</div> 
                            <CBadge color="primary ms-auto">Recommended</CBadge>
                        </CNavItem>
                    </div>
                    <div onClick={props.showAllUsersFn}>
                        <CNavItem href="#">
                            <i class="bi bi-people m-2"></i>
                            <div className="mx-3">Users</div> 
                        </CNavItem>
                    </div>
                    <div onClick={props.showUserProfileFn}>
                        <CNavItem href="#">
                            <i class="bi bi-person-circle m-2"></i>
                            <div className="mx-3">Profile</div> 
                        </CNavItem>
                    </div>
                    <div onClick={props.logout}>
                        <CNavItem href="#">
                            <i class="bi bi-box-arrow-left m-2"></i>
                            <div className="mx-3">Logout</div> 
                        </CNavItem>
                    </div>
                </CSidebarNav>
                <CSidebarToggler />
            </CSidebar>
}

export default Sidebar;