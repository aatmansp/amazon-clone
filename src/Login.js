import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState} from "react";

function Login() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const signIn=(e)=>{
        e.preventDefault();

        // firebase login


    }

    const register=(e)=>{
        e.preventDefault();

        //firebase register
    }


  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png"
          alt=""
          className="login__logo"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-In</h1>

        <form action="">
          <h5>E-mail</h5>
          <input type="text" value ={email} className="login__emailInput" onChange={e=>setEmail(e.target.value)}/>

          <h5>Password</h5>
          <input type="password" value={password} className="login__passwordInput" onChange={e=>setPassword(e.target.value)}/>

          <button onClick={signIn} type="submit" className="login__signInButton">Sign In</button>

          <p>
            By continuing, you agree to Amazon's{" "}
            <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380">
              Privacy Notice
            </a>
            .
          </p>
          <div className="login__newToAmazon">
            <h5>New to Amazon?</h5>
          </div>

          <button onclick={register} className="login__registerButton">
            Create your Amazon account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
