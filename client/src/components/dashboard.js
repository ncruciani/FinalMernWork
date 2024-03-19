import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Dashboard = ({allOrders, setAllOrders}) => {
    const [checked, setChecked] = useState(false)
    const deliveryToggleHandler = e => {
    setChecked(!e.target.checked)
    axios.put("http://localhost:8000/api/pizzaorders/" + e.target.id, {isDelivered: checked})
            .then( res => {
                console.log(res.data)
                const updatedOrders = allOrders.map( order => {
                    if (order._id === res.data._id){
                        return res.data;
                    } else { return order }
                })
                setAllOrders(updatedOrders);
            }
            )
    }

    const deleteOrderHandler = e => {
        const id = e.target.id;
        axios.delete("http://localhost:8000/api/pizzaorders/" + id)
            .then( res => {
                const filteredOrders = allOrders.filter( order => order._id !== id);
                setAllOrders(filteredOrders);
            })

    }
    return(
        <>
            <h1>Pizza Order</h1>
            <Link to="/order/new"><button>Create Order</button></Link>
            <p>Find stores in your area!</p>
            <button>Hide delivered pizzas</button>
            <button>Show delivered pizzas</button>
            <table>
                <thead>
                    <tr>
                        <th>Delivery Time</th>
                        <th>Pizza</th>
                        <th>Size</th>
                        <th>Delivered?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            allOrders.map( order => {
                                return (
                                    <tr key={order._id}>
                                        <td>{order.deliveryTime}</td>
                                        <td>{order.pizza}</td>
                                        <td>{order.size}</td>
                                        <td><input type="checkbox" checked={order.isDelivered} /> {order.isDelivered ? "True" : "False"}</td>
                                        <td><button onClick={deleteOrderHandler} id={order._id}>Remove</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
            </table>

        </>
    );
}

export default Dashboard;