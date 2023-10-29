import React, { useState, useEffect , useContext } from 'react';
import Post from './allPosts_home';
import AuthContext from './context/AuthContext';
import { motion, useAnimation } from 'framer-motion'; 

export default function Home() {
  const [data, setData] = useState([]); 
  let {authTokens} = useContext(AuthContext)

// here using this to get all post on home page
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (authTokens) {
      headers.Authorization = `Bearer ${authTokens.access}`;
    }

    // console.log("headers from Home ???@@%@*%@%*!(%!(!^(_____--------")
    // console.log(headers)
    fetch('https://social-network-monish.onrender.com/api/post', {

    method: 'GET',
    headers,

    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json_response) => {
        setData(json_response);
      })
      .catch((err) => {
        console.error(err.message);
      });
      
  }, [authTokens]);

//animation
 // Using Framer Motion's useAnimation hook to control animation
 const controls = useAnimation();
 const postAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};



  return (
    <>
     <h1 className="text-5xl font-bold m-6 p-4 flex-shrink  text-amber-500 ">All Posts:</h1>

      <div className='post-container'> 
            {data.map((post) => (
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
                          ))}
      </div>
    </>
  );
}
