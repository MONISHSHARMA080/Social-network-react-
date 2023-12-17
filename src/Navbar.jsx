import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import './styles(post).css';
import { useNavigate } from "react-router-dom";
import {  motion } from 'framer-motion';

export default function NavBar() {

  const navigate = useNavigate();

  const {logoutUser , user} = useContext(AuthContext)
  function logout(){
    logoutUser();
    navigate("/login");
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-slate-950 text-white flex d-flex align-content-start flex-wrap   ">
       
            <ul className="navbar-nav" >
              <li className="nav-item text-2xl"  >
                <Link className="nav-link flowing-gradient  " to="/">
                  <motion.button
                    className="nav-link flowing-gradient"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <li className='text-white' > All Posts </li>
                  </motion.button>
                </Link>
              </li>
              <li className="nav-item text-2xl">
                <Link className="nav-link flowing-gradient" to="/following">
                  <motion.button
                    className="nav-link flowing-gradient"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <li className='text-white' > Following  </li>
                  </motion.button>
                </Link>
              </li>
              <li className="nav-item text-2xl ">
                <Link className="nav-link flowing-gradient" to="New-post">
                  <motion.button
                    className="nav-link flowing-gradient"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <li className='text-white' >New post</li>
                  </motion.button>
                </Link>
              </li>
              <li className="nav-item text-2xl mt-2 ">
                {user ? (
                  <motion.button
                    className="nav-link flowing-gradient"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <li className='text-white' >{user.username}</li>
                  </motion.button>
                ) : null}
              </li>
              <li className="nav-item text-2xl text-white">
                {user ? null : (
                  <Link className="nav-link flowing-gradient" to="/register">
                    <motion.button
                      className="nav-link flowing-gradient"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <li className=" text-white " >Register</li>
                    </motion.button>
                  </Link>
                )}
              </li>
              <li className="nav-item text-2xl ">
                {user ? null : (
                  <Link className="nav-link flowing-gradient" to="/login">
                    <motion.button
                      className="nav-link flowing-gradient"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                     <li className="text-white" >Login</li>
                    </motion.button>
                  </Link>
                )}
              </li>
              <li className="nav-item mt-2 text-2xl">
                <motion.button
                  className="nav-link flowing-gradient "
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <li className='text-white'> Log Out </li>
                </motion.button>
              </li>
            </ul>
          </nav>
          <div id="component">
            <Outlet />
          </div>
        </>
  );
}
