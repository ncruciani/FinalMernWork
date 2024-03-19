import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const NewOrderForm = ({allOrders, setAllOrders}) => {
    const [size, setSize] = useState("");
    const [pizza, setPizza] = useState("");
    const [notes, setNotes] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");
    const [pizzaOptions] = useState(["Pepperoni", "Cheese", "Combination", "Veggie", "Philly Cheese Steak", "Hawaiian", "Double Bacon Deluxe"]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const newOrderHandler = e => {
        e.preventDefault();
        const newOrder = {
            pizza, 
            size,
            notes,
            deliveryTime,
            isDelivered: false
        }
        axios.post("http://localhost:8000/api/pizzaorders", newOrder)
            .then( res => {
                setAllOrders([...allOrders, res.data]);
                navigate("/order/")
            })
            .catch( err => {
                console.log(err.response.data);
                const errArray = []
                for ( const key of Object.keys(err.response.data.errors)) { // ["pizza", "size", "deliveryTime"]
                    errArray.push(err.response.data.errors[key].message)
                }
                setErrors(errArray);
            });

    }
    return(
        <form onSubmit={newOrderHandler}>

            <h2>{size} {pizza}</h2>
            <p><Link to="/order/">Home</Link></p>
            <div style={{color:"red"}}>
                {
                    errors.map( (err, idx) => {
                        return (
                            <p key={idx}>{err}</p>
                        )
                    })
                }
            </div>
            <select onChange={ e => setPizza(e.target.value)}>
                <option  selected disabled value="">Please Choose a Pizza Type</option>
                {
                    pizzaOptions.map( pizza => {
                        return (
                            <option key={pizza} value={pizza}>{pizza}</option>
                        )
                    })
                }
            </select>
            <select onChange={ e => setSize(e.target.value)}>
                <option disabled selected value="">Please Choose a Size</option>
                <option value="Single">Single</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
            </select>
            <div>
                <label>Notes:</label>
                <input type="text" value={notes} onChange={ e => setNotes(e.target.value)}/>
                <label>Delivery Time</label>
                <input type="datetime-local" value={deliveryTime} onChange={ e => setDeliveryTime(e.target.value)}/>
            </div>
            <button>Submit</button>
        </form>
    );
}

export default NewOrderForm;