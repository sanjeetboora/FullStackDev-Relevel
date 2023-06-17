import user from '../../utils/currentUserInfo';

function Welcome(){
    return  <div>
                <div className="row text-center" style={{marginTop: 1+'rem', marginBottom: 2+'rem'}}> <h1>Welcome {user.name}!!!</h1></div>
                <p className="text-muted text-center" style={{marginBottom: 2+'rem'}}>Take a quick look at your {user.userType} stats.</p>     
            </div>
}

export default Welcome;