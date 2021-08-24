import React from 'react';
import './AddAddress.css';
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';

function AddAddreess() {
    const [{user}]=useStateValue();
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
                        <input type="text" />

                        <h5>Mobile</h5>
                        <input type="number"/>

                        <h5>Address line 1</h5>
                        <input type="text" />

                        <h5>Address line 2</h5>
                        <input type="text" />

                        <h5>Town/City</h5>
                        <input type="text" />

                        <h5>State</h5>
                        <input type="text" />
                        
                        <h5>Country</h5>
                        <input type="text" />

                        <h5>Pincode</h5>
                        <input type="number" placeholder="6 digits [0-9] PIN code" />
                        
                        <h5></h5>
                        <button>Add address</button>
                    </form>
            
                </div>
            }
            
        </div>
        
    )
}

export default AddAddreess
