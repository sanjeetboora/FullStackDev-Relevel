const {userStatus, userTypes} =  require('./constants');

const isValidEmail = (email) =>{
    return String(email).toLocaleLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

const isValidUserType= (userType) =>{
    const types = Object.values(userTypes);
    if(!types.includes(userType)){
        throw new Error(`value for field 'userType' is not valid. Possible values are ${types}`);
    }
}

const isValidUserStatus= (userStatusInfo) =>{
    const status = Object.values(userStatus);
    if(!status.includes(userStatusInfo)){
        throw new Error(`value for field 'userStatus' is not valid. Possible values are ${status}`);
    }
}

module.exports = {isValidEmail, isValidUserType, isValidUserStatus};