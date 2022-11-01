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
import { Select, MenuItem} from '@material-ui/core';

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

    const [selectedCatagory, setSelectedCatagory]= useState("search-alias=all");

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
                    <div className="header__catagoriesDropdownDiv">

                        <Select
                            className="header__catagoriesDropdown"
                            autoWidth
                            value={selectedCatagory}
                            onChange={(e)=> {setSelectedCatagory(e.target.value)}}>
                            <MenuItem value="search-alias=all">All</MenuItem>
                            <MenuItem value="search-alias=alexa-skills">Alexa Skills</MenuItem>
                            <MenuItem value="search-alias=amazon-devices">Amazon Devices</MenuItem>
                            <MenuItem value="search-alias=amazon-fashion">Amazon Fashion</MenuItem>
                            <MenuItem value="search-alias=amazon-pharmacy">Amazon Pharmacy</MenuItem>
                            <MenuItem value="search-alias=appliances">Appliances</MenuItem>
                            <MenuItem value="search-alias=mobile-apps">Apps &amp; Games</MenuItem>
                            <MenuItem value="search-alias=baby">Baby</MenuItem>
                            <MenuItem value="search-alias=beauty">Beauty</MenuItem>
                            <MenuItem value="search-alias=stripbooks">Books</MenuItem>
                            <MenuItem value="search-alias=automotive">Car &amp; Motorbike</MenuItem>
                            <MenuItem value="search-alias=apparel">Clothing &amp; Accessories</MenuItem>
                            <MenuItem value="search-alias=collectibles">Collectibles</MenuItem>
                            <MenuItem value="search-alias=computers">Computers &amp; Accessories</MenuItem>
                            <MenuItem value="search-alias=todays-deals">Deals</MenuItem>
                            <MenuItem value="search-alias=electronics">Electronics</MenuItem>
                            <MenuItem value="search-alias=furniture">Furniture</MenuItem>
                            <MenuItem value="search-alias=lawngarden">Garden &amp; Outdoors</MenuItem>
                            <MenuItem value="search-alias=gift-cards">Gift Cards</MenuItem>
                            <MenuItem value="search-alias=grocery">Grocery &amp; Gourmet Foods</MenuItem>
                            <MenuItem value="search-alias=hpc">Health &amp; Personal Care</MenuItem>
                            <MenuItem value="search-alias=kitchen">Home &amp; Kitchen</MenuItem>
                            <MenuItem value="search-alias=industrial">Industrial &amp; Scientific</MenuItem>
                            <MenuItem value="search-alias=jewelry">Jewellery</MenuItem>
                            <MenuItem value="search-alias=digital-text">Kindle Store</MenuItem>
                            <MenuItem value="search-alias=luggage">Luggage &amp; Bags</MenuItem>
                            <MenuItem value="search-alias=luxury-beauty">Luxury Beauty</MenuItem>
                            <MenuItem value="search-alias=dvd">Movies &amp; TV Shows</MenuItem>
                            <MenuItem value="search-alias=popular">Music</MenuItem>
                            <MenuItem value="search-alias=mi">Musical Instruments</MenuItem>
                            <MenuItem value="search-alias=office-products">Office Products</MenuItem>
                            <MenuItem value="search-alias=pets">Pet Supplies</MenuItem>
                            <MenuItem value="search-alias=instant-video">Prime Video</MenuItem>
                            <MenuItem value="search-alias=speed-store">Same-Day Delivery</MenuItem>
                            <MenuItem value="search-alias=shoes">Shoes &amp; Handbags</MenuItem>
                            <MenuItem value="search-alias=software">Software</MenuItem>
                            <MenuItem value="search-alias=sporting">Sports, Fitness &amp; Outdoors</MenuItem>
                            <MenuItem value="search-alias=specialty-aps-sns">Subscribe &amp; Save</MenuItem>
                            <MenuItem value="search-alias=home-improvement">Tools &amp; Home Improvement</MenuItem>
                            <MenuItem value="search-alias=toys">Toys &amp; Games</MenuItem>
                            <MenuItem value="search-alias=under-ten-dollars">Under ₹500</MenuItem>
                            <MenuItem value="search-alias=videogames">Video Games</MenuItem>
                            <MenuItem value="search-alias=watches">Watches</MenuItem>
                        </Select>
      
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
