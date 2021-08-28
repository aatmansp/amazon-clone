import React from 'react';
import './AddAddress.css';
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';
import { useState} from "react";
import {db} from './firebase';
import {useHistory} from 'react-router-dom';

function AddAddreess() {

    const history=useHistory();

    const [{user}]=useStateValue();
    const [name,setName]=useState('');
    const [number,setNumber]=useState('');
    const [addressLine1,setAddressLine1]=useState('');
    const [addressLine2,setAddressLine2]=useState('');
    const [city,setCity]=useState('');
    const [state,setState]=useState('');
    const [country,setCountry]=useState('');
    const [pincode,setPincode]=useState('');
    

    const addNewAddress=(e)=>{
        e.preventDefault();
        console.log(name+number);

        db.collection('users')
        .doc(user?.uid)
        .collection('addresses')
        // .doc(name)
        .add({
            name:name,
            addressLine1:addressLine1,
            addressLine2:addressLine2,
            number:number,
            city:city,
            state:state,
            country:country,
            pincode:pincode,
            default:false
        })

        history.replace('/address');
    }

    return (
        
        <div className="addAddress">
            
             <h2>Add a new Address</h2>
             <Link to="/login" className="address__loginButton">{!user && 
                <p>Sign in to add address</p>}
            </Link>
             {user && 
                <div className="addAddress__form">
                    <form action="">
                        <h5>Full name</h5>
                        <input type="text" value={name} onChange={e=>setName(e.target.value)}/>

                        <h5>Mobile</h5>
                        <input type="number" value={number} onChange={e=>setNumber(e.target.value)}/>

                        <h5>Address line 1</h5>
                        <input type="text" value={addressLine1} onChange={e=>setAddressLine1(e.target.value)}/>

                        <h5>Address line 2</h5>
                        <input type="text" value={addressLine2} onChange={e=>setAddressLine2(e.target.value)}/>

                        <h5>Town/City</h5>
                        <input type="text"value={city} onChange={e=>setCity(e.target.value)}/>

                        <h5>State</h5>
                        <input type="text" value={state} onChange={e=>setState(e.target.value)}/>
                        
                        <h5>Country</h5>
                        <input type="text" value={country} onChange={e=>setCountry(e.target.value)}/>

                        <h5>Pincode</h5>
                        <input type="number" placeholder="6 digits [0-9] PIN code" value={pincode} onChange={e=>setPincode(e.target.value)}/>
                        
                        <h5></h5>
                        <button onClick={addNewAddress}>Add address</button>
                    </form>
            
                </div>
            }
            
        </div>
        
    )
}

export default AddAddreess
