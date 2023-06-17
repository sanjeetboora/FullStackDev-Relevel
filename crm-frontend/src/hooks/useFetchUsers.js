import { useState, useEffect } from 'react';
import * as UserService from '../services/users';

const useFetchUserDetails = async() =>{
    const [result, setResult] = useState([]);
     useEffect(()=>{        
        (async()=>{
            const response =  await UserService.getAllUsers();
            if(response){
                setResult(response);
            }
        })();
    }, []);
    return result;
}

export default useFetchUserDetails