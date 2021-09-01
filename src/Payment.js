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
import {db} from './firebase';


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

    const [address,setAddress]=useState([]);

    useEffect(() => {
        const getClientSecrect = async () =>{
            const response = await axios({
                method:'post',
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`
            });

            setClientSecret(response.data.clientSecret);
        }

        var addressCollection=db.collection('users')
        .doc(user?.uid)
        .collection('addresses');

        var query=addressCollection.where("default","==",true)
        .limit(1);

        query.get()
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


        getClientSecrect();
    }, [basket])

    // console.log('Client secret: ',clientSecret);
    // console.log(address);

    const handleSubmit=async (e)=>{
        //Stripe stuff
        e.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement),
                
            }
        })
        .then(({paymentIntent})=>{
            //payment conformation
            

            console.log(paymentIntent);
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })
        

            setSucceedad(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type:'EMPTY_BASKET'
            });




            history.replace('/orders');
        })
        .catch(e=>console.log(e));
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
                    {address?.map(address=>(
                        <div className="payment__address"> 
                            {/* <p>{user?.email}</p> */}
                            <p>{address.name}</p>
                            <p>{address.addressLine1}</p>
                            <p>{address.addressLine2}</p>
                            <p>{address.city} :- {address.pincode}</p>
                            <p>{address.state}, {address.country}</p>
                            <p>Phone Number: {address.number}</p>
                        </div>
                    ))}
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
                                        <h3 className="payment__orderTotal">Order Total : <strong>{value}</strong></h3>
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
