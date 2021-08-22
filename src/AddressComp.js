import React from 'react';
import './AddressComp.css';

function AddressComp({id,name,line1,line2,city,state,pincode,country,phone}) {



    return (
        <div className="addressComp">
            <div className="addressComp__container">
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
            <div className="addressComp__edit">
                    <p><a href="#">Edit</a>  &nbsp; |  &nbsp; <a href="#">Remove</a></p>
            </div>
            
        </div>
    )
}

export default AddressComp
