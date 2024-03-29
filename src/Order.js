import React,{useEffect} from 'react';
import './Order.css';
import moment from "moment";
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import {db} from './firebase';

function Order({order}) {

    console.log(order);
    return (
        <div className="order">
            {/* <h2>Order</h2> */}
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small><strong>Order id:</strong> {order.id}</small>
                <span>Dilivered?</span>
            </p>

            {order.data.basket?.map(item=>(
                <CheckoutProduct id={item.id} title={item.title} image={item.image} rating={item.rating} price={item.price} hide/>
            ))}

            <CurrencyFormat
                renderText={(value)=>(
                    <>
                        <p className="order__total">Order total:  <strong>{value}</strong></p>

                    </>
                )}
                decimalScal={2}
                value={order.data.amount/100}
                displayType={"text"}
                thousandSepaator={true}
                prefix={"$"}
            />      
        </div>
    )
}

export default Order
