import  {useEffect, useState,} from "react";
import AuthContext from "./AuthContext";
import jwt_decode from "jwt-decode";




const AuthContextProvider = ({children})=>{
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    
    
    // for testing only 
    // useEffect(() => {
    //    if (user!=null){

    // }

    //   }, [authTokens,user]);// useEffect
        
      
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
            // console.log("###########################")
            // console.log(data)
            // console.log("###########################")
            // console.log("access : "+data.access);
            // console.log("pppppppppppppppppppppppppppppppppppppppp");
            // console.log("===========jwt_decode(data.access)============");
            // console.log(jwt_decode(data.access));
            // console.log("===========jwt_decode(data.access)============");
          } 
          else {
            // const data = await response.json(); // Parse the response even if it's not a success status
            // console.log("++++++  data: ++++++" );
            // console.log(data);
            // console.log("++++++  data: ++++++" );
            // console.error('Error decoding token11'); 
            alert('Something went wrong!');
          }
        } 
        catch (error) {
          console.error('Error--||--:', error.message);
          console.log(error);
        }// end of catch error
      } // end of loguserin

// Logout function
      let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async ()=> {

      let response = await fetch('https://social-network-monish.onrender.com/api/token/refresh/', {
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({'refresh':authTokens?.refresh})
      })

      let data = await response.json()
      // if  (authTokens){

      // }
     
      
      if (response.status === 200){
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
    }

    //change this 
    let thirtySixMinutes = 1000* 60 *24 ;

    let interval =  setInterval(()=> {
        if(authTokens.access){
            updateToken()
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
     "setAuthTokens":setAuthTokens,
     "setUser":setUser

 } // contextData

return(
    <AuthContext.Provider value={contextData}  >
        {loading ? (<>
        <h1 className=" text-6xl place-self-center mx-56 mt-56  " >Fetching data...</h1>
        </>) : children}
    </AuthContext.Provider>
)



}

export default AuthContextProvider