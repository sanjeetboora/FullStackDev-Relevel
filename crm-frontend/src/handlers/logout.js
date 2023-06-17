export const logout = () =>{
    localStorage.clear();
    localStorage.setItem("appLoggedIn", true);
    window.location.href = '/';
}