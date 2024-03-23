import  { useState, useEffect } from 'react';
import Post from './allPosts_home';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion,  } from 'framer-motion';

export default function Following() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log(user);
    if (user != null){
      fetch(`https://social-network-monish.onrender.com/api/network/${user.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${authTokens.access}` // Include the access token in the headers
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json_response) => {
        setData(json_response);
        setLoading(false); // Set loading to false when data is fetched
        console.log(json_response);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false); // Set loading to false in case of an error
      });
    }
    else{
      navigate('/');
    }
  }, [user, authTokens]);
  
  // Animation
  // const controls = useAnimation();
  const postAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <h1 className="text-5xl font-bold m-6 p-4 flex-shrink text-amber-500"> Following:</h1>
      <div className="post-container">
        {loading ? (
          <h2>Loading...</h2>
        ) : data && data.length > 0 ? (
          data.map((post) => (
            <motion.div
              key={post.id}
              initial="hidden"
              animate="visible"
              variants={postAnimation}
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
          ))
        ) : (
          <h2  >Sorry, you do not have any posts here.</h2>
        )}
      </div>
    </>
  );
}
