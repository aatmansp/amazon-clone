import React from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';


function Checkout() {

    const [{basket,user},dispatch]=useStateValue();
    
    var isEmpty=false;

    if(basket.length==0){
        isEmpty=true;
    }

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-eu.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg" alt="amazon Ad" />
            

                <div>
                    {/* <h2>Hello, {user?.email.split("@",1)}</h2> */}
                    <h2 className="checkout__title">
                        Your Cart
                    </h2>

                    {isEmpty && <div>Your Cart is Empty</div>}
                    

                    {basket.map((item)=>(
                        <CheckoutProduct title={item.title} price={item.price} image={item.image} id={item.id} rating={item.rating}/>
                    ))}
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
