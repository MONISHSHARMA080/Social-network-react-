import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
import { useContext, useState } from 'react';
import AuthContext from './context/AuthContext';
import './styles(post).css';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const navigate = useNavigate();
  const { logoutUser, user } = useContext(AuthContext);

  function logout() {
    logoutUser();
    navigate("/login");
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 }
    },
    closed: {
      opacity: 0,
      y: -14,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const menuItemTransition = {
    type: 'spring',
    damping: 20,
    stiffness: 300
  };


  return (
    <>

<div className="">
        <motion.button
          className="flex m-2 rounded-3xl bg-amber-700 items-center px-3 py-2 border-2  h-12 w-24  text-black border-gray-300 "
          onClick={toggleMenu}
          title='Menu'
        >
          <svg
            className="fill-current h-4 w-4 pr-2 "
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>  Menu
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="w-full bg-white border-t border-gray-200"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuItemVariants}
              transition={menuItemTransition}
            >
        <nav className="navbar navbar-expand-lg navbar-light bg-slate-800 text-white flex d-flex align-content-start flex-wrap   ">
       
       <ul className="navbar-nav" >
         <li className="nav-item text-2xl pl-2"  >
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
         <li className="nav-item text-2xl pl-2">
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
         <li className="nav-item text-2xl pl-2 ">
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
         <li className="nav-item text-2xl mt-2 pl-2 ">
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
         <li className="nav-item text-2xl text-white pl-2 ">
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
         <li className="nav-item text-2xl pl-2 ">
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
         <li className="nav-item mt-2 text-2xl pl-2">
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
    </motion.div>
    )}
  </AnimatePresence>
</div>

          <div id="component">
            <Outlet />
          </div>
        </>
  );
}
