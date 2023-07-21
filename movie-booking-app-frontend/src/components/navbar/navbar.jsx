function Navbar(){
    return(
        <nav class="navbar navbar-dark bg-dark justify-content-between">
            <a class="navbar-brand text-danger">MBA</a>
            <form class="form-inline" className="w-50 mr-sm-2">
                <input 
                    className="form-control"
                    type="search"
                    placeholder="Movie Name"
                    aria-label="Search"
                />
            </form>
            <button className="btn bg-danger my-2 my-sm-0 text-light" type="submit">Logout</button>
        </nav>
    );
}

export default Navbar;
