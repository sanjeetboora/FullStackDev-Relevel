import Navbar from '../../components/navbar/navbar'
import CardList from '../../components/cardList/cardList'
import CommonTable from '../../components/commonTable/commonTable'
import { createMovie, getAllMovies } from "../../api/movie";
import { useEffect, useState } from "react";
import { createTheatre, getAllTheatres } from '../../api/theatres';
import { getAllUsers } from '../../api/users';
import AddTheatreModal from '../../components/modals/addTheatreModal';
import AddMovieModal from '../../components/modals/addMovieModal';
import AddUserModal from '../../components/modals/addUserModal';
import { signUp } from "../../api/auth";
import { userType } from '../../constants/user';
import { useNavigate } from 'react-router-dom';

function Admin(){
    const navigate = useNavigate();
    const [moviesData, setMoviesData] = useState(null);
    const [theatresData, setTheatresData] = useState(null);
    const [usersData, setUsersData] = useState(null);
    const [showAddTheatreModal, setShowAddTheatreModal] = useState(false);
    const [addTheatreFormData, setAddTheatreFormData] = useState({});
    const [showAddMovieModal, setShowAddMovieModal] = useState(false);
    const [addMovieFormData, setAddMovieFormData] = useState({});
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [addUserFormData, setAddUserFormData] = useState({});
    const [selectedUserType, setSelectedUserType] = useState('');
    const isAdmin = localStorage.getItem('userType') === userType.admin;

    const onChangeAddTheatreFormData = (event) =>{
        const {id, value} = event.target;
        addTheatreFormData[id] = value;
        setAddTheatreFormData(addTheatreFormData);
    }

    const closeAddTheatreModal = () =>{
        setShowAddTheatreModal(false);
    }

    const addTheatre = async() =>{
        await createTheatre(addTheatreFormData);
        fetchTheatres();
    }

    const onChangeAddMovieFormData = (event) =>{
        const {id, value} = event.target;
        addMovieFormData[id] = value;
        setAddMovieFormData(addMovieFormData);
    }

    const closeAddMovieModal = () =>{
        setShowAddMovieModal(false);
    }

    const addMovie = async() =>{
        await createMovie(addMovieFormData);
        fetchMovies();
    }

    const onChangeAddUserFormData = (event) =>{
        const {id, value} = event.target;
        addUserFormData[id] = value;
        setAddUserFormData(addUserFormData);
    }

    const closeAddUserModal = () =>{
        setShowAddUserModal(false);
    }

    const handleSelectUserType = (e) =>{
        setSelectedUserType(e);
    }

    const addUser = async() =>{
        const data = {
           ...addUserFormData,
            userType: selectedUserType
        };
        await signUp(data);
        fetchUsers();
    }

    const fetchMovies = async() =>{
        const movies = await getAllMovies();
        setMoviesData(movies);
    }

    const fetchUsers = async() =>{
        const users = await getAllUsers();
        setUsersData(users);
    }

    const fetchTheatres = async() =>{
        const theatres = await getAllTheatres();
        setTheatresData(theatres);
    }

    useEffect(() =>{
        !isAdmin && navigate('/noAccessPage');
        fetchMovies();
        fetchTheatres();
        fetchUsers();
    }, [])



    return (
        isAdmin && 
        <div className='bg-light text-center'>
            <AddTheatreModal show={showAddTheatreModal} close = {closeAddTheatreModal} onChangeData = {onChangeAddTheatreFormData} data = {addTheatreFormData} onSubmit = {addTheatre} />
            <AddMovieModal show={showAddMovieModal} close = {closeAddMovieModal} onChangeData = {onChangeAddMovieFormData} data = {addMovieFormData} onSubmit = {addMovie} /> 
            <AddUserModal show={showAddUserModal} close = {closeAddUserModal} onChangeData = {onChangeAddUserFormData} data = {addUserFormData} onSubmit = {addUser} onChangeDataUserType = {handleSelectUserType}/> 
            
            <Navbar />
            <div className='container'>
                    <div>
                        <h3 className='text-center pt-3'>Welcome, {localStorage.getItem('name')}!</h3>
                        <p  className='text-center text-secondary'>Take a quick look at your stats below.</p>
                    </div>
                    <CardList showAddUser = {setShowAddUserModal} showAddTheatre = {setShowAddTheatreModal} showAddMovie = {setShowAddMovieModal} />
                    <CommonTable data={theatresData} tableName = {"THEATRES"}/>
                    <button className="btn btn-danger text-white mt-2 mb-4" onClick={() => setShowAddTheatreModal(true)}>
                        Add Theatre
                    </button>
                    <CommonTable data={moviesData} tableName = {"MOVIES"}/>
                    <button className="btn btn-danger text-white mt-2 mb-4" onClick={() => setShowAddMovieModal(true)}>
                        Add Movie
                    </button>
                    <CommonTable data={usersData} tableName = {"USER RECORD"}/>
            </div>
        </div>
    )
}

export default Admin;