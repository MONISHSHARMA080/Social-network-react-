import React, { useState, useEffect } from 'react';
import Post from './allPosts_home';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from 'framer-motion'; 


export default function Following() {

    const [data, setData] = useState([]);
    const {user , authTokens} = useContext(AuthContext)
    const navigate = useNavigate();

    // const headers = {
    //   'Content-Type': 'application/json',
    // };
    




    useEffect(() => {
      // client side routing as unauth. users don't  have following
      if (user === null){
        navigate("/");
     }
    else{ 
    fetch(`https://social-network-monish.onrender.com/api/network/${user.user_id}`, {
        
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${authTokens.access}`
      }
      
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })

        .then((json_response) => {
          setData(json_response);
          // console.log(json_response)
        })
        .catch((err) => {
          console.error(err.message);
        });}
    }, []);

//animation
const controls = useAnimation();
const postAnimation = {
 hidden: { opacity: 0, y: 50 },
 visible: { opacity: 1, y: 0 },
};



    return (
      <>
        <h1 className='text-5xl font-bold m-6 p-4 flex-shrink  text-amber-500' > Following:</h1>
        <div className='post-container'> 
        {data ? ( data.map((post) => (
                <motion.div
                key={post.id}
                initial="hidden" // Set initial animation state
                animate="visible" // Set animation state for when the component mounts
                variants={postAnimation} // Use the animation properties
              >
                          <Post
                          id={post.id}
                          text={post.text}
                          owner={post.owner_id}
                          owner_name={post.owner_name}
                          date={post.date}
                          likes={post.likes}
                          key={post.id}
                        />
                        </motion.div>         
                          ))): (<h2>jbhdchdcbcbhd</h2>) }
           
      </div>
      </>
    );
  }
  