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



  return ( <>
    <nav className=" bg-slate-950 p-4">
      <div className="flex flex-wrap justify-between">
        <ul className="flex flex-wrap">
          <li className="nav-item">
            <Link to="/" className="nav-link flowing-gradient">
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
            <Link to="/following" className="nav-link flowing-gradient">
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
            <Link to="New-post" className="nav-link flowing-gradient">
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

        <ul className="flex flex-wrap">
          <li className="nav-item">
            <motion.button
              className="nav-link flowing-gradient m-2"
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
              <li className="nav-item">
                <motion.button
                  className="nav-link flowing-gradient m-2"
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