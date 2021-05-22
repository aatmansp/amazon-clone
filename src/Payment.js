import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from './reducer';
import {useHistory} from 'react-router-dom';
import axios from './axios';


function Payment() {

    const[{basket,user},dispatch]=useStateValue();

    const history=useHistory();

    const stripe=useStripe();
    const elements=useElements();

    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [succeedad,setSucceedad]=useState(false);
    const [processing,setProcessing]=useState("");
    const [clientSecret,setClientSecret]=useState(true);

    useEffect(() => {
        const getClientSecrect = async () =>{
            const response = await axios({
                method:'post',
                url:`/payements/create?total=${getBasketTotal(basket) * 100}`
            });

            setClientSecret(response.data.clientSecret);
        }

        getClientSecrect();
    }, [basket])

    console.log('Client secret: ',clientSecret);

    const handleSubmit=async (e)=>{
        //Stripe stuff
        e.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        })
        .then(({paymentIntent})=>{
            //payment conformation
            setSucceedad(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type:'EMPTY_BASKET'
            })

            history.replace('/orders');
        })
    }

    const handleChange=e=>{
        console.log(e);
        setDisabled(e.empty);
        setError(e.error ? e.error.message:"");

    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
                </h1>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Las Vegas</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>

                    <div className="payment__item">
                        {basket.map(item=>(
                            <CheckoutProduct title={item.title} price={item.price} image={item.image} id={item.id} rating={item.rating}/>
                        ))}
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe work*/}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payement__priceContainer">
                            <CurrencyFormat
                                renderText={(value)=>(
                                    <>
                                        <p>Subtotal ({basket.length} items): <strong>{value}</strong></p>
                                    </>
                                )}
                                decimalScal={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSepaator={true}
                                prefix={"$"}
                            />

                            <button disabled={processing || disabled || succeedad}>
                                <span>{processing ? <p>Processing...</p>:"Buy now"}</span>
                            </button>
                            </div>

                            {error && <div>{error}</div>}

                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
