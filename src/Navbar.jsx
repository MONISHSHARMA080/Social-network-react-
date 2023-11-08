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
        {/* <div className="flex flex-wrap "> */}
          <div className="flex d-flex align-content-start flex-wrap">
            <ul className="navbar-nav ">
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
          </div>
          <div className="flex">
            <ul className="navbar-nav">
              <li className="nav-item">
                {user ? (
                  <motion.button
                    className="nav-link flowing-gradient"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {user.username}
                  </motion.button>
                ) : null}
              </li>
              <li className="nav-item">
                {user ? (
                  <motion.button
                    className="nav-link flowing-gradient"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Register
                  </motion.button>
                ) : (
                  <Link className="nav-link flowing-gradient" to="/register">
                    <motion.button
                      className="nav-link flowing-gradient"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Register
                    </motion.button>
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {user ? (
                  <motion.button
                    className="nav-link flowing-gradient"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Log in
                  </motion.button>
                ) : (
                  <Link className="nav-link flowing-gradient" to="/login">
                    <motion.button
                      className="nav-link flowing-gradient"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Log in
                    </motion.button>
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <motion.button
                  className="nav-link flowing-gradient "
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
            </ul>
          </div>
        {/* </div> */}
      </nav>
      <div id="component">
        <Outlet />
      </div>
    </>
  );
}