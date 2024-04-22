import React, { useEffect,useState } from 'react'
import { getAllPatients } from '../services/operations/authAPI';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    

    useEffect(() =>{
        const fetchdata = async () =>{
            const result = await getAllPatients();
            console.log(result);
            if(result){
                setPatients(result)
            }
        }
        fetchdata();
    },[])
     
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard