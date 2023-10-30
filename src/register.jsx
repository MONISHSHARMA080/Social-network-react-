import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';
import jwt_decode from "jwt-decode";

export default function Register() {

const {setUser} = useContext(AuthContext)
const {setAuthTokens} = useContext(AuthContext)


function register(e) {
  e.preventDefault();
  const  username  = e.target.username.value
  const  email  = e.target.email.value
  const  password  = e.target.password.value

  fetch(`https://social-network-monish.onrender.com/api/register`, {
    
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: username,
    password: password,
    email: email,
  }),// end of  body

  })//fetch 
  .then((response) => {
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((json_response) => {
    

    //data returned by the api
    const data  = json_response
    setAuthTokens(data)
    setUser(jwt_decode(data.access))
    console.log("-------JWT DECODE-----------")
    console.log(jwt_decode(data.access))
    console.log("-------JWT DECODE-----------")
    // storing items in the 
    console.log("json_response--==>>");
    console.log(json_response);
    console.log("json_response--==>>");
    console.log("++++++access_token+++++++");
    console.log(json_response.access);
    console.log("++++++access_token+++++++");

    localStorage.setItem('authTokens', JSON.stringify(data))
  })
  .catch((err) => {
    alert(err.message);//remove it in production build
    alert("An error occured please try again")
    console.error(err.message);
  });


}// end of register function




  return (
    <div >
      <h2 className='m-4' >Register</h2>
      <form className='w-11/12' onSubmit={ (e)=>register(e)} >
        <div className="form-group">
          <input
            autoFocus
            className="form-control m-3"
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control m-3"
            type="email"
            name="email"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control m-3"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control m-3"
            type="password"
            name="confirmation"
            placeholder="Confirm Password"
          />
        </div>
        <button  className="btn btn-primary m-2" type="submit"  > Register </button>
      </form  >

      <h4 className='m-2'>
        Already have an account?<Link className="btn btn-danger m-3" to="/login">Log In here.</Link>
      </h4 >
    </div>
  );







}//register function

