import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';


function Checkout() {
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-eu.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg" alt="amazon Ad" />
            

                <div>
                    <h2 className="checkout__title">
                        Your Cart
                        {/* {BasketItem} */}
                    </h2>
                </div>
            </div>
            
           <div className="checkout__right">
               <Subtotal/>
               {/* <h2>Subtotal</h2> */}
           </div>
            
        </div>

    )
}

export default Checkout
