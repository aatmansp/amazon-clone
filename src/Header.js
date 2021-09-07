import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from 'react-router-dom';
import { useStateValue } from './StateProvider';
import {auth} from './firebase';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import {db} from './firebase';
import { useEffect } from 'react';
import { useState } from 'react';

function Header() {

    const [{basket,user},dispatch]=useStateValue(); 
    const [name,setName]=useState('');
    const [city,setCity]=useState('');
    const [pincode,setPincode]=useState('');
    const handleAuthentication=()=>{
        if(user){
            auth.signOut();
        }
    }

    useEffect(()=>{
        var addressCollection=db.collection('users').doc(user?.uid).collection('addresses');

        var query=addressCollection.where("default","==",true)
        .limit(1);

        query.get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((snapshot) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(snapshot.id, " => ", snapshot.data());
                // addressCollection.doc(snapshot.id).update();
                setName(snapshot.data().name);
                setCity(snapshot.data().city);
                setPincode(snapshot.data().pincode);
                // console.log(name+city+pincode);
            });
        })

    });

    // console.log(user);

    return (
        <div className="header">
            <Link to="/">
                <img 
                    className="header__logo"
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt=""
                />
            </Link>

            <div className="header__dilivery">
                <Link to="/address">
                    <LocationOnOutlinedIcon className="header__locationIcon"/>
                    <div className="header__diliveryInfo">
                        <span className="header__optionLineOne">{user ? 'Deliver to '+name.split(" ",1):'Hello'}</span>
                        <span className="header__optionLineTwo">{user ?  city +' '+pincode:'Select your address'}</span>
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
                        <div className="header__optionBasketContainer">
                            <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                            
                            
                        </div>
                        
                    </div>
                </Link>
                
            </div>

        </div>
    )
}

export default Header
