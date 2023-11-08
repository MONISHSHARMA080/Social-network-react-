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
      <nav className="navbar navbar-expand-lg navbar-light ">
        <span
          className="navbar-brand"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffd700, #ff0000)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Network
        </span>

        <div className="flex flex-wrap">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link flowing-gradient" to="/">
                <motion.button
                  className="nav-link flowing-gradient"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  All Posts
                </motion.button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link flowing-gradient" to="/following">
                <motion.button
                  className="nav-link flowing-gradient"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Following
                </motion.button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link flowing-gradient" to="New-post">
                <motion.button
                  className="nav-link flowing-gradient"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  New post
                </motion.button>
              </Link>
            </li>
          </ul>

          {user ? (
            <div className="flex flex-row justify-end">
              <motion.button
                className="nav-link flowing-gradient m-2"
                onClick={(e) => {
                  e.preventDefault;
                  logout();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Log Out
              </motion.button>
              <motion.button
                className="nav-link flowing-gradient m-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {user.username}
              </motion.button>
            </div>
          ) : (
            <>
              <Link className="nav-link flowing-gradient m-2" to="/login">
                <motion.button
                  className="nav-link flowing-gradient"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Log in
                </motion.button>
              </Link>
              <Link className="nav-link flowing-gradient m-2" to="/register">
                <motion.button
                  className="nav-link flowing-gradient"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Register
                </motion.button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <div id="component">
        <Outlet />
      </div>
    </>
  );
}