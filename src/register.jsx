import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';

export default function Register() {



function register(e) {
  e.preventDefault();
  const  username  = e.target.username.value
  const  email  = e.target.email.value
  const  password  = e.target.password.value
}





  return (
    <div >
      <h2 className='m-4' >Register</h2>
      <form className='w-11/12' onSubmit={ (e)=>register(e)    } >
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

