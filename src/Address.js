import { Button } from '@material-ui/core';
import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import './Address.css';
import AddressComp from './AddressComp';
import { useStateValue } from './StateProvider';
import {db} from './firebase';

function Address() {
    
    const [{user}]=useStateValue();
    // console.log(user);
    const [address,setAddress]=useState([]);

    useEffect(()=>{
        
        if(user){

            var addressCollection=db.collection('users').doc(user?.uid).collection('addresses');

            addressCollection.get()
            .then((snapshot)=>{
                var arr=[];
                snapshot.forEach((snap)=>{
                    // console.log(snap.id +" => " + JSON.stringify(snap.data()));
                    arr.push({
                        id:snap.id,
                        name:snap.data().name,
                        addressLine1:snap.data().addressLine1,
                        addressLine2:snap.data().addressLine2,
                        number:snap.data().number,
                        city:snap.data().city,
                        state:snap.data().state,
                        country:snap.data().country,
                        pincode:snap.data().pincode,
                        default:snap.data().default 
                    })                   
                });
                setAddress(arr);
            });
            
            // addressCollection.onSnapshot(snapshot => {
            //     // console.log("here"+JSON.stringify(snapshot));
            //     setAddress(snapshot._delegate._snapshot.docChanges.map(ins =>({
            //         name:ins.doc.data.partialValue.mapValue.fields.name.stringValue,
            //         addressLine1:ins.doc.data.partialValue.mapValue.fields.addressLine1.stringValue,
            //         addressLine2:ins.doc.data.partialValue.mapValue.fields.addressLine2.stringValue,
            //         number:ins.doc.data.partialValue.mapValue.fields.number.stringValue,
            //         city:ins.doc.data.partialValue.mapValue.fields.city.stringValue,
            //         state:ins.doc.data.partialValue.mapValue.fields.state.stringValue,
            //         country:ins.doc.data.partialValue.mapValue.fields.country.stringValue,
            //         pincode:ins.doc.data.partialValue.mapValue.fields.pincode.stringValue,
            //         default:ins.doc.data.partialValue.mapValue.fields.default.booleanValue        
            //     })))
            // });
            
        }
        else{
            setAddress([]);
        }
    },[user])

    console.log(address);

    return (
        <div className="address">
            <h2>Your Addresses</h2>
            <Link to="/login" className="address__loginButton">{!user && 
                <p>Sign in to see your addresses</p>}
            </Link>
            {user && <div className="address__components">

                {address?.map(address=>(
                    <AddressComp id={address.id} name={address.name} line1={address.addressLine1} line2={address.addressLine2} city={address.city} state={address.state} country={address.country} pincode={address.pincode} phone={address.number} isDefault={address.default}/>
                ))}

                {/* <AddressComp id={123} name="Aatman Pradhan" line1="25, Tagorenagar Society, Opposite G.E.B. Colony," line2="Off J.P. Road," city="Vadodara" state="Gujarat" country="India" pincode="390007" phone="8320008702" isDefault={true}/>
                <AddressComp id={123} name="Bhavin Rathod" line1="201 Kunj Plaza, Chhani Jakatnaka"  city="Vadodara" state="Gujarat" country="India" pincode="390002" phone="8320008702" />
                <AddressComp id={123} name="Bhoomit Shah" line1="A-65 Ashok Society - 4," line2="Race course," city="Vadodara" state="Gujarat" country="India" pincode="390007" phone="7878155701‬" />
                <AddressComp id={123} name="Aatman Pradhan" line1="25, Tagorenagar Society, Opposite G.E.B. Colony," line2="Off J.P. Road," city="Vadodara" state="Gujarat" country="India" pincode="390007" phone="8320008702" />
                <AddressComp id={123} name="Bhavin Rathod" line1="201 Kunj Plaza, Chhani Jakatnaka"  city="Vadodara" state="Gujarat" country="India" pincode="390002" phone="8320008702" /> */}
                <AddressComp temp={true}/>
            </div>}
            
            

        </div>
    )
}

export default Address
