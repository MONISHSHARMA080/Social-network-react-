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

  return (<>
    <nav className="flex items-center justify-between flex-wrap">
      <span
        className="navbar-brand  flex items-center "
        style={{
          backgroundImage: 'linear-gradient(to right, #ffd700, #ff0000)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Network
      </span>

      <div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item flex items-center ">
            <Link className="nav-link flowing-gradient" to="/"  >
              <motion.button className="nav-link flowing-gradient"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}  >
                All Posts
              </motion.button>
            </Link>  
          </li>
          <li className="nav-item flex items-center ">
            <Link className="nav-link flowing-gradient" to="/following">
              <motion.button className="nav-link flowing-gradient"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}  >
                  Following
              </motion.button>
            </Link>
          </li>
          <li className="nav-item flex items-center ">
            <Link className="nav-link flowing-gradient" to="New-post">
              <motion.button className="nav-link flowing-gradient"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}  >
                New post
              </motion.button>
            </Link>
          </li>
          <li className="nav-item flex items-center ">
            <Link className="nav-link flowing-gradient" to="/login">
              <motion.button className="nav-link flowing-gradient"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}  >
                Log in
              </motion.button>
            </Link>
          </li>
          <li className="nav-item flex items-center ">
            <Link className="nav-link flowing-gradient" to="/register">
              <motion.button className="nav-link flowing-gradient"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}  >
                Register
              </motion.button>
            </Link>
          </li>
          <li className="nav-item flex items-center ">
            <motion.button className="nav-link flowing-gradient m-2 " onClick={(e)=>{e.preventDefault;logout()}} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} >
              Log Out
            </motion.button>
          </li>
          
          {/* if the user is signed in then only print their name  */}
          {user ? (
          <li className="nav-item flex items-center ">
            <motion.button className="nav-link flowing-gradient m-2 "  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} >
              {user.username}
            </motion.button>
          </li> ): null}




        </ul>
      </div>
    </nav>
    <div id="component" ><Outlet /></div>
  </>);
}

