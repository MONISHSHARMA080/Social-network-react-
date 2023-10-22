import React , {useEffect, useState,} from "react";
import AuthContext from "./AuthContext";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";




const AuthContextProvider = ({children})=>{
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    
    
    // for testing only 
    useEffect(() => {
       if (user!=null){
      //  console.log("here comes the user---");
      //  console.log(  user.username)
    }

      }, [authTokens,user]);// useEffect
        
      
      async function loguserin(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        
        var username = e.target.username.value;
        var password = e.target.password.value;
    
        try {
          const response = await fetch('https://social-network-monish.onrender.com/api/token/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),// end of  body
          });// end of  fetch
    
          if (response.status === 200) {
            const data = await response.json();
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            //   redirecting the users
            // return redirect("New-post");
            //for testing
            // console.log("access : "+data.access);
            console.log("Refresh : "+data.refresh);
          } 
          else {
            const data = await response.json(); // Parse the response even if it's not a success status
            console.log("data.access: " + data.access);
            console.error('Error decoding token11'); 
            alert('Something went wrong!');
          }
        } 
        catch (error) {
          console.error('Error:', error.message);
        }// end of catch error
      } // end of loguserin

// Logout function
      let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        // history.push('/login') implemnented  in Navbar
    }

    // update the refresh token
    let updateToken = async ()=> {
      // console.log("__||REFRESH TOKEN Fn|__")

      let response = await fetch('https://social-network-monish.onrender.com/api/token/refresh/', {
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({'refresh':authTokens?.refresh})
      })

      let data = await response.json()
      // console.log("++++++data from api/token/refresh/+++++++++")
      // console.log(data)
      // console.log("++++++data from api/token/refresh/+++++++++")
      // console.log("|||||||||authTokens|||||||||")
      //  console.log(authTokens)
      // console.log("|||||||||authTokens|||||||||")
      if  (authTokens){

        // console.log("authTokens.refresh{{{{{{{-||}}}}}");
        // console.log(authTokens.refresh);
      }
     
      
      if (response.status === 200){
        // console.log("____----____")
          setAuthTokens(data)
          setUser(jwt_decode(data.access))
          localStorage.setItem('authTokens', JSON.stringify(data))
      }else{
          logoutUser()
      }

      if(loading){
          setLoading(false)
      }
      
  }



  useEffect(()=> {

    if(loading){
        updateToken()
        // console.log("updateToken()--from loading----->>");
    }

    //change this 
    let thirtySixMinutes = 1000* 60 *24 ;

    let interval =  setInterval(()=> {
        if(authTokens){
            updateToken()
            // console.log("updateToken() -from interval----->>");
        }
    }, thirtySixMinutes)
    return ()=> clearInterval(interval)

}, [authTokens, loading])



    


//context/value same thing used to pass the in different object 
 var contextData={
     "loguserin":loguserin,
     "user":user,
     "authTokens":authTokens,
     "logoutUser":logoutUser,

 } // contextData

return(
    <AuthContext.Provider value={contextData}  >
        {loading ? null : children}
    </AuthContext.Provider>
)



}

export default AuthContextProvider