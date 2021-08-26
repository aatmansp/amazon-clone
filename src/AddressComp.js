import React from 'react';
import './AddressComp.css';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import {db} from './firebase';
import { useStateValue } from './StateProvider';
import {useHistory} from 'react-router-dom';

function AddressComp({id,name,line1,line2,city,state,pincode,country,phone,isDefault,temp}) {

    const [{user}]=useStateValue();
    const history=useHistory();

    const removeAddress=(e)=>{
        e.preventDefault();
        
        db.collection('users')
        .doc(user?.uid)
        .collection('addresses')
        .doc(name)
        .delete()
        .then(()=>{
            console.log('address delete');
            window.location.reload();
        })
    }

    const setDefault=async(e)=>{
        e.preventDefault();

        var addressCollection=db.collection('users')
        .doc(user?.uid)
        .collection('addresses');
      
        var query=addressCollection.where("default","==",true)
        .limit(1);

        await query.get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((snapshot) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(snapshot.id, " => ", snapshot.data());
                addressCollection.doc(snapshot.id).update({default:false});
            });
        })
        
        
        

        
        query=addressCollection.where("name","==",name)
        .limit(1);
        await query.get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((snapshot) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(snapshot.id, " => ", snapshot.data());
                addressCollection.doc(snapshot.id).update({default:true});
                
            });
        })
        
        // window.location.reload();
        history.push('/');
    }

    return (
        <div className="addressComp">
             
            {!temp &&<div className="addressComp__container">
                
                    {isDefault && <div className="addressComp__default">
                        <p>Default</p>
                        </div>
                    }   
                   
                <div className="addressComp__name">
                    <h5>{name}</h5>
                </div>
                <div className="addressComp__address">
                    <div className="addressComp__line1">
                        <p>{line1}</p>
                    </div>
                    <div className="addressComp__line2">
                        <p>{line2}</p>
                    </div>
                    <div className="addressComp__city">
                        <p>{city}, {state}-{pincode}</p>
                    </div>
                    <div className="addressComp__country">
                        <p>{country}</p>
                    </div>
                    <div className="addressComp__phone">
                        <p>Phone number: ‪{phone}</p>
                    </div>
                </div>
    
            </div>
            }
            {!temp && <div className="addressComp__edit">
                    <p><a href="#">Edit</a>  &nbsp; |  &nbsp; <a href="" onClick={removeAddress}>Remove</a> &nbsp; |  &nbsp;{!isDefault && <a href="#" onClick={setDefault}>Set as Default</a>}</p>
            </div>
            }

            {temp && 
                <Link to="/addAddress">
                    <div className="addressComp__addAddress">
                        <h4>+</h4>
                        {/* <AddIcon/> */}
                        <p>Add a address</p>
                    </div>
                </Link>
            }
            
        </div>
                
    )
}

export default AddressComp
