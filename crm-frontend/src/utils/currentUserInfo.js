const name = localStorage.getItem("name");
const userType = localStorage.getItem("userType");

const userInfo = {
    name,
    userType
}

export default userInfo;