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
      <nav className="navbar navbar-expand-lg navbar-light flex flex-wrap">
        <div className="flex flex-wrap">
          <ul className="navbar-nav mr-auto flex flex-wrap">
            <li className="nav-item active">
              <Link className="nav-link flowing-gradient text-white" aria-current="page" to="/">
                <motion.button
                  className="nav-link flowing-gradient text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  All Posts
                </motion.button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link flowing-gradient text-white" to="/following">
                <motion.button
                  className="nav-link flowing-gradient text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Following
                </motion.button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link flowing-gradient text-white" to="/new-post">
                <motion.button
                  className="nav-link flowing-gradient text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  New post
                </motion.button>
              </Link>
            </li>
          </ul>

          {user ? (
            <li className="nav-item">
              <motion.button
                className="nav-link flowing-gradient m-2 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {user.username}
              </motion.button>
            </li>
          ) : null}

          <motion.button
            className="nav-link flowing-gradient m-2 text-white"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Log Out
          </motion.button>
        </div>
      </nav>
      <div id="component">
        <Outlet />
      </div>
    </>
  );
}

