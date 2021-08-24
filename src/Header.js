import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from 'react-router-dom';
import { useStateValue } from './StateProvider';
import {auth} from './firebase';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

function Header() {

    const [{basket,user},dispatch]=useStateValue(); 

    const handleAuthentication=()=>{
        if(user){
            auth.signOut();
        }
    }
    // console.log(user);

    return (
        <div className="header">
            <Link to="/">
                <img 
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt=""
                />
            </Link>

            <div className="header__dilivery">
                <Link to="/address">
                    <LocationOnOutlinedIcon className="header__locationIcon"/>
                    <div className="header__diliveryInfo">
                        <span className="header__optionLineOne">{user ? 'Deliver to '+user.email.split("@",1):'Hello'}</span>
                        <span className="header__optionLineTwo">{user ? 'Vadodara 390007':'Select your address'}</span>
                    </div>
                </Link>
            </div>

            <div className="header__search">
                <input type="text" className="header__searchInput"/>
                <SearchIcon className="header__searchIcon"/>
            </div>

            <div className="header__nav">
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className="header__option">
                        <span className="header__optionLineOne">Hello, {user ? user.email.split("@",1):'Guest'}</span>
                        <span className="header__optionLineTwo">{user ? 'Sign Out':'Sign In'}</span>
                    </div>
                </Link>

                <Link to="/orders">
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>

                {/* <a href="https://www.amazon.in/amazonprime">
                    <div className="header__option">
                        <span className="header__optionLineOne">Your</span>
                        <span className="header__optionLineTwo">Prime</span>
                    </div>
                </a> */}

                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon/>
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>
                
            </div>

        </div>
    )
}

export default Header
