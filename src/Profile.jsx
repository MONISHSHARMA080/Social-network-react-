import React, { useState, useEffect } from 'react';
import Post from './allPosts_home';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

export default function Profile() {
  const [data, setData] = useState({ posts: [] }); // Initializing data with an empty array for posts
  const [number, setNumber] = useState(0)
  const { id } = useParams();  // from react router -- to fetch the user's data (in useEffect)
  const {user , authTokens} = useContext(AuthContext) // from react router -- provide the login user's id and authtokens

// header for api call
const headers = {
  'Content-Type': 'application/json',
};

console.log("id from usePram",id);

if (authTokens) {
  headers.Authorization = `Bearer ${authTokens.access}`;
} 




  useEffect(() => {
    fetch(`https://social-network-monish.onrender.com/api/user/${id}`, {
      
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
        console.log("----from profile----")
        console.log(json_response)
        console.log("----from profile----")

      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  function network(){

    var user_id = user.user_id ;
    console.log(user_id,"LLLLLLLLLL");
    fetch('https://social-network-monish.onrender.com/api/networks/', {

    method: 'POST',
    headers,
    body: JSON.stringify({

        "following":`${data.id}` ,
    //make this data.requesting_user_id after auth setup
        "follower": `${user_id}`
    //make this data.requesting_user_id after auth setup

    }) //bofdy of fetch
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((json_response) => {
      console.log(json_response); 
    })
    .catch((err) => {
      console.error(err.message);
    });
  }

  // for network/follow  api 
  useEffect(() => {
       if (number === 1){
        console.log(data.id)
        network();
       } 
  }, [number]);




  return (
    <>
      <h1 className='text-5xl font-bold m-6 p-4 flex-shrink  text-amber-500' >All posts by {data.username} :</h1>
      <button className='button-n' onClick={()=>{setNumber(number + 1)}} >Follow {data.username}</button>
      <div className="post-container">
        {data.posts.map((post) => (
          <Post
            id={post.id}
            text={post.text}
            owner={post.owner_id}
            owner_name={post.owner_name}
            date={post.date}
            likes={post.likes}
            requesting_user_id={data.requesting_user_id}
            key={post.id}
          />
        ))}
      </div>
    </>
  );
}


