import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';
import jwt_decode from 'jwt-decode';

export default function Register() {
  const { setUser, setAuthTokens } = useContext(AuthContext);

  const register = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmation = e.target.confirmation.value;

    if (password !== confirmation) {
      alert('Password and confirmation do not match');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setAuthTokens(data=>data);//for testing setAuthTokens(data) would have worked just fine
        setUser(jwt_decode(data.access_token));
        localStorage.setItem('authTokens', JSON.stringify(data));
      } else {
        const data = await response.json();
        console.error('Error registering user:', data);
        alert('Something went wrong while registering.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while registering.');
    }
  };

  return (
    <div>
      <h2 className="m-4">Register</h2>
      <form className="w-11/12" onSubmit={(e) => register(e)}>
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
        <button className="btn btn-primary m-2" type="submit">
          Register
        </button>
      </form>

      <h4 className="m-2">
        Already have an account?
        <Link className="btn btn-danger m-3" to="/login">
          Log In here.
        </Link>
      </h4>
    </div>
  );
}
