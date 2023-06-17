const _id = localStorage.getItem("_id");
const name = localStorage.getItem("name");
const userType = localStorage.getItem("userType");
const email = localStorage.getItem("email")
const userStatus = localStorage.getItem("userStatus")
const clientName = localStorage.getItem("clientName")
const createdAt = localStorage.getItem("createdAt")
const updatedAt = localStorage.getItem("updatedAt")
const userInfo = {
    name,
    userType,
    _id,
    email,
    userStatus,
    clientName,
    createdAt,
    updatedAt
}
export default userInfo;