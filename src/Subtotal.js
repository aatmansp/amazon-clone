import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import {getBasketTotal} from './reducer';
import {useHistory} from 'react-router-dom';

function Subtotal() {

    const history = useHistory();
    const [{basket},dispatch]=useStateValue();

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value)=>(
                    <>
                        <p>Subtotal ({basket.length} items): <strong>{value}</strong></p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order Contains a gift
                        </small>

                    </>
                )}
                decimalScal={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSepaator={true}
                prefix={"$"}
            />

            <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
