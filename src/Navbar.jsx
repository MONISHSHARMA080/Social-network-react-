import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import './styles(post).css';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

export default function NavBar() {

  const navigate = useNavigate();

  const {logoutUser , user} = useContext(AuthContext)
  function logout(){
    // console.log("logout-----");
    logoutUser();
    // Redirect to login.
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            <motion.span
              style={{
                backgroundImage: 'linear-gradient(to right, #ffd700, #ff0000)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Network
            </motion.span>
          </Link>

          <ul className="lg:flex lg:space-x-4">
            <li>
              <Link to="/" className="text-white hover:underline">
                <motion.button
                  className="flowing-gradient"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  All Posts
                </motion.button>
              </Link>
            </li>
            <li>
              <Link to="/following" className="text-white hover:underline">
                <motion.button
                  className="flowing-gradient"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Following
                </motion.button>
              </Link>
            </li>
            <li>
              <Link to="New-post" className="text-white hover:underline">
                <motion.button
                  className="flowing-gradient"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  New post
                </motion.button>
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-white hover:underline">
                <motion.button
                  className="flowing-gradient"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Log in
                </motion.button>
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white hover:underline">
                <motion.button
                  className="flowing-gradient"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Register
                </motion.button>
              </Link>
            </li>
            <li>
              <motion.button
                className="flowing-gradient m-2 text-white hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Log Out
              </motion.button>
            </li>
            {user ? (
              <li>
                <motion.button
                  className="flowing-gradient m-2 text-white hover:underline"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {user.username}
                </motion.button>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
      <div id="component">
        <Outlet />
      </div>
    </>
  );
}