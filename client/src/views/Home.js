import React, {useEffect, useState} from 'react';
import Dashboard from '../components/dashboard';
import {Routes, Route} from "react-router-dom";
import NewOrderForm from '../components/NewOrderForm';
import axios from "axios";

const Home = (props) => {
    const [allOrders, setAllOrders] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/pizzaorders")
            .then( res => setAllOrders(res.data))
            .catch( err => console.log(err));
    }, [])

    return(

        <Routes>
            <Route path="/" element={<Dashboard allOrders={allOrders} setAllOrders={setAllOrders} />} />
            <Route path="/new" element={<NewOrderForm allOrders={allOrders} setAllOrders={setAllOrders}/>} />
        </Routes>
    );
}

export default Home;