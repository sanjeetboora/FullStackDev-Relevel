import Navbar from '../../components/navbar/navbar'
import CardList from '../../components/cardList/cardList'
import CommonTable from '../../components/commonTable/commonTable'
import { getAllMovies } from "../../api/movie";
import { useEffect, useState } from "react";
import { createTheatre, getAllTheatres } from '../../api/theatres';
import AddTheatreModal from '../../components/modals/addTheatreModal';
import { userType } from '../../constants/user';
import { useNavigate } from 'react-router-dom';

function Client(){
    const navigate = useNavigate();
    const [moviesData, setMoviesData] = useState(null);
    const [theatresData, setTheatresData] = useState(null);
    const [showAddTheatreModal, setShowAddTheatreModal] = useState(false);
    const [addTheatreFormData, setAddTheatreFormData] = useState({});
    const isClient = localStorage.getItem('userType') === userType.client;
  
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

    const fetchMovies = async() =>{
        const movies = await getAllMovies();
        setMoviesData(movies);
    }

    const fetchTheatres = async() =>{
        const theatres = await getAllTheatres();
        setTheatresData(theatres);
    }

    useEffect(() =>{
        !isClient && navigate('/noAccessPage');
        fetchMovies();
        fetchTheatres();
    }, [])



    return (
        isClient && 
        <div className='bg-light text-center'>
            <AddTheatreModal show={showAddTheatreModal} close = {closeAddTheatreModal} onChangeData = {onChangeAddTheatreFormData} data = {addTheatreFormData} onSubmit = {addTheatre} />

            <Navbar />
           <div className='container'>
                <div>
                    <h3 className='text-center pt-3'>Welcome, {localStorage.getItem('name')}!</h3>
                    <p  className='text-center text-secondary'>Take a quick look at your stats below.</p>
                </div>
                <CardList showAddTheatre = {setShowAddTheatreModal} />
                <CommonTable data={theatresData} tableName = {"THEATRES"}/>
                <button className="btn btn-danger text-white mt-2 mb-4" onClick={() => setShowAddTheatreModal(true)}>
                    Add Theatre
                </button>
                <CommonTable data={moviesData} tableName = {"MOVIES"}/>
                
           </div>
        </div>
    )
}

export default Client;