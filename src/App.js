import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import React,{useEffect} from 'react';
import {auth} from './firebase';
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"
import Orders from "./Orders";
import Footer from "./Footer";
import Address from "./Address";
import AddAddreess from "./AddAddreess";


const promise=loadStripe("pk_test_51ItcTYSIk8sIBBS92NdF4NwrpNi4GDg5i4t4I2pOsNr0OuWfs5YMpp5vsmAmug2gZih4L9h6QdodVlLFJCr22TzT00H186xtTS");

function App() {

  const [{},dispatch]=useStateValue();

  useEffect(()=>{

    auth.onAuthStateChanged(authUser =>{
      console.log(authUser)

      if(authUser){
        //user is logged in
        dispatch({
          type:'SET_USER',
          user: authUser
        })
      } else{
        //user logged out
        dispatch({
          type:'SET_USER',
          user:null 
        })
      }
    })

    
  },[])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
            <Footer/>
          </Route>

          <Route exact path="/checkout">
            <Header />
            <Checkout />
            <Footer/>
          </Route>

          <Route exact path="/login">
           <Login/>
          </Route>

          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            <Footer/>
          </Route>

          <Route exact path="/orders">
            <Header />
            <Orders/>
            <Footer/>
          </Route>

          <Route exact path="/address">
            <Header/>
            <Address/>
            <Footer/>
          </Route>
          <Route exact path="/addAddress">
            <Header/>
            <AddAddreess/>
            <Footer/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
