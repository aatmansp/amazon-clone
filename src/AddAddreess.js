import React from 'react';
import './AddAddress.css';
import { useStateValue } from './StateProvider';
import { Link, useLocation } from 'react-router-dom';
import { useState} from "react";
import {db} from './firebase';
import {useHistory} from 'react-router-dom';

function AddAddreess() {

    const history=useHistory();
    const location=useLocation();
    const {id,n,num,adl1,adl2,ci,st,cou,pin}=location.state;

    const [{user}]=useStateValue();
    const [name,setName]=useState(n);
    const [number,setNumber]=useState(num);
    const [addressLine1,setAddressLine1]=useState(adl1);
    const [addressLine2,setAddressLine2]=useState(adl2);
    const [city,setCity]=useState(ci);
    const [state,setState]=useState(st);
    const [country,setCountry]=useState(cou);
    const [pincode,setPincode]=useState(pin);
    

    const addNewAddress=(e)=>{
        e.preventDefault();
        console.log(name+number);

        var addressCollection= db.collection('users')
        .doc(user?.uid)
        .collection('addresses');

       
        // .doc(name)
        if(!id){
            addressCollection.add({
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
        }
        else{
            addressCollection.doc(id).set({
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
        }
        

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
