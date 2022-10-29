import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingCartOutlined';
import {Link} from 'react-router-dom';
import { useStateValue } from './StateProvider';
import {auth} from './firebase';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import {db} from './firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
                        <span className="header__optionLineOne">{user ? 'Deliver to '+name.split(" ",1):'Hello,'}</span>
                        <span className="header__optionLineTwo">{user ?  city +' '+pincode:'Select your address'}</span>
                    </div>
                </Link>
            </div>

            <div className="header__search">
                <div className="header__catagoriesDropdownContainer">
                    {/* <div className="header__catagoriesText">
                        <span>All</span>
                        <ArrowDropDownIcon/>
                    </div> */}
                    <div className="header__catagoriesDropdown">
                        <select name="Product Catagories" id="catagories">
                            <option selected="selected" value="all">All </option>
                            <option value="search-alias=alexa-skills">Alexa Skills</option>
                            <option value="search-alias=amazon-devices">Amazon Devices</option>
                            <option value="search-alias=fashion">Amazon Fashion</option>
                            <option value="search-alias=amazon-pharmacy">Amazon Pharmacy</option>
                            <option value="search-alias=appliances">Appliances</option>
                            <option value="search-alias=mobile-apps">Apps &amp; Games</option>
                            <option value="search-alias=baby">Baby</option>
                            <option value="search-alias=beauty">Beauty</option>
                            <option value="search-alias=stripbooks">Books</option>
                            <option value="search-alias=automotive">Car &amp; Motorbike</option>
                            <option value="search-alias=apparel">Clothing &amp; Accessories</option>
                            <option value="search-alias=collectibles">Collectibles</option>
                            <option value="search-alias=computers">Computers &amp; Accessories</option>
                            <option value="search-alias=todays-deals">Deals</option>
                            <option value="search-alias=electronics">Electronics</option>
                            <option value="search-alias=furniture">Furniture</option>
                            <option value="search-alias=lawngarden">Garden &amp; Outdoors</option>
                            <option value="search-alias=gift-cards">Gift Cards</option>
                            <option value="search-alias=grocery">Grocery &amp; Gourmet Foods</option>
                            <option value="search-alias=hpc">Health &amp; Personal Care</option>
                            <option value="search-alias=kitchen">Home &amp; Kitchen</option>
                            <option value="search-alias=industrial">Industrial &amp; Scientific</option>
                            <option value="search-alias=jewelry">Jewellery</option>
                            <option value="search-alias=digital-text">Kindle Store</option>
                            <option value="search-alias=luggage">Luggage &amp; Bags</option>
                            <option value="search-alias=luxury-beauty">Luxury Beauty</option>
                            <option value="search-alias=dvd">Movies &amp; TV Shows</option>
                            <option value="search-alias=popular">Music</option>
                            <option value="search-alias=mi">Musical Instruments</option>
                            <option value="search-alias=office-products">Office Products</option>
                            <option value="search-alias=pets">Pet Supplies</option>
                            <option value="search-alias=instant-video">Prime Video</option>
                            <option value="search-alias=speed-store">Same-Day Delivery</option>
                            <option value="search-alias=shoes">Shoes &amp; Handbags</option>
                            <option value="search-alias=software">Software</option>
                            <option value="search-alias=sporting">Sports, Fitness &amp; Outdoors</option>
                            <option value="search-alias=specialty-aps-sns">Subscribe &amp; Save</option>
                            <option value="search-alias=home-improvement">Tools &amp; Home Improvement</option>
                            <option value="search-alias=toys">Toys &amp; Games</option>
                            <option value="search-alias=under-ten-dollars">Under ₹500</option>
                            <option value="search-alias=videogames">Video Games</option>
                            <option value="search-alias=watches">Watches</option>
                            
                        </select>
                        <ArrowDropDownIcon />
                    </div>
                </div>

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
