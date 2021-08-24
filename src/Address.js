import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './Address.css';
import AddressComp from './AddressComp';
import { useStateValue } from './StateProvider';

function Address() {
    
    const [{user}]=useStateValue();
    // console.log(user);

    return (
        <div className="address">
            <h2>Your Addresses</h2>
            <Link to="/login" className="address__loginButton">{!user && 
                <p>Sign in to see your addresses</p>}
            </Link>
            {user && <div className="address__components">
                <AddressComp id={123} name="Aatman Pradhan" line1="25, Tagorenagar Society, Opposite G.E.B. Colony," line2="Off J.P. Road," city="Vadodara" state="Gujarat" country="India" pincode="390007" phone="8320008702" isDefault={true}/>
                <AddressComp id={123} name="Bhavin Rathod" line1="201 Kunj Plaza, Chhani Jakatnaka"  city="Vadodara" state="Gujarat" country="India" pincode="390002" phone="8320008702" />
                <AddressComp id={123} name="Bhoomit Shah" line1="A-65 Ashok Society - 4," line2="Race course," city="Vadodara" state="Gujarat" country="India" pincode="390007" phone="7878155701‬" />
                <AddressComp id={123} name="Aatman Pradhan" line1="25, Tagorenagar Society, Opposite G.E.B. Colony," line2="Off J.P. Road," city="Vadodara" state="Gujarat" country="India" pincode="390007" phone="8320008702" />
                <AddressComp id={123} name="Bhavin Rathod" line1="201 Kunj Plaza, Chhani Jakatnaka"  city="Vadodara" state="Gujarat" country="India" pincode="390002" phone="8320008702" />
                <AddressComp temp={true}/>
            </div>}
            
            

        </div>
    )
}

export default Address
