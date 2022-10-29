import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import React,{useEffect,useState} from 'react';
import {auth} from './firebase';
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"
import Orders from "./Orders";
import Footer from "./Footer";
import Address from "./Address";
import AddAddreess from "./AddAddreess";
import AddProduct from "./AddProduct";
import AllProducts from "./AllProducts";

import {Circle} from 'react-spinners-css';

const promise=loadStripe("pk_test_51ItcTYSIk8sIBBS92NdF4NwrpNi4GDg5i4t4I2pOsNr0OuWfs5YMpp5vsmAmug2gZih4L9h6QdodVlLFJCr22TzT00H186xtTS");

function App() {

  const [{},dispatch]=useStateValue();
  const [isLoading,setLoading]=useState(true);
  const [display,setDisplay]=useState("none");


  useEffect(()=>{

    auth.onAuthStateChanged(authUser =>{
      // console.log(authUser)

      if(authUser){
        //user is logged in
        dispatch({
          type:'SET_USER',
          user: authUser
        });
        // setLoading(false);
      } else{
        //user logged out
        dispatch({
          type:'SET_USER',
          user:null 
        });
        // setLoading(false);
      }
    })
    const timeoutID = window.setTimeout(() => {
      setLoading(false);
      setDisplay("");
    }, 2000);

    return () => window.clearTimeout(timeoutID );
    
  },[])

  // console.log(isLoading);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            {isLoading && <div className="app__loader">
              <Circle color="#f0c14b"/>
            </div>}

            <div display={display}>
              <Header/>
              <Home/>
              <Footer/>
            </div>   
          </Route>

          <Route exact path="/checkout">
          {isLoading && <div className="app__loader">
              <Circle color="#f0c14b"/>
            </div>}
            <div display={display}>
              <Header />
              <Checkout />
              <Footer/>
            </div>
          </Route>

          <Route exact path="/login">
          {isLoading && <div className="app__loader">
              <Circle color="#f0c14b"/>
            </div>}
            <div display={display}>
              <Login/>
              </div>
          </Route>

          <Route exact path="/payment">
          {isLoading && <div className="app__loader">
              <Circle color="#f0c14b"/>
            </div>}
            <div display={display}>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
              <Footer/>
            </div>
          </Route>

          <Route exact path="/orders">
          {isLoading && <div className="app__loader">
              <Circle color="#f0c14b"/>
            </div>}
            <div display={display}>
              <Header />
              <Orders/>
              <Footer/>
            </div>
          </Route>

          <Route exact path="/address">
          {isLoading && <div className="app__loader">
              <Circle color="#f0c14b"/>
            </div>}
            <div display={display}>
              <Header/>
              <Address/>
              <Footer/>
            </div>
          </Route>
          <Route exact path="/addAddress">
          {isLoading && <div className="app__loader">
              <Circle color="#f0c14b"/>
            </div>}
            <div display={display}>
              <Header/>
              <AddAddreess/>
              <Footer/>
            </div>
          </Route>
          <Route exact path="/addProduct">
          {isLoading && <div className="app__loader">
              <Circle color="#f0c14b"/>
            </div>}
            <div display={display}>
              <Header/>
              <AddProduct/>
              <Footer/>
            </div>
          </Route>
          <Route exact path="/allProducts">
          {isLoading && <div className="app__loader">
              <Circle color="#f0c14b"/>
            </div>}
            <div display={display}>
              <Header/>
              <AllProducts/>
              <Footer/>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
