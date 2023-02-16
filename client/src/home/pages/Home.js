import {AuthContext } from "../../shared/components/AuthContext";
import { useContext, useState, useEffect } from "react";
import ReportButton from "../components/ReportButton";
import BeginTrip from "../components/BeginTrip";
import EndTrip from "../components/EndTrip";


const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [activeTrip, setActiveTrip] = useState(null);
  
    useEffect(() =>{  
      
      const interval = setInterval(() => {
        fetch('http://localhost:3000/api/status', {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({user})
        })
        .then(response => response.json())
        .then(data => {
        
          if(data.data !== null){
            setActiveTrip(data.data)
            console.log(data.data)
          } else{
            console.log(data.message)
          }
          
        })
        .catch(error => {
          console.error(error);
        });
      }, 5000);
      return () => {
        clearInterval(interval)
      };
    
    }, [user])
   
    function handleBeginTrip(tripId){
      setActiveTrip(tripId);
    }

    function handleEndTrip(){
      setActiveTrip(null);
    }
  
    return (
      <div className="home_section">
        <h1>HomePage</h1>
  
        {user ? (
           <div>
            {activeTrip ? 
             <>
             <EndTrip tripId={activeTrip} onEndTrip={handleEndTrip} />
             <ReportButton /> 
           </>
           : <BeginTrip onBeginTrip={handleBeginTrip} />
            }
           
          
          
        </div>
        ) : (
          <div>
            <a href="/login">Sign in</a>
            <a href="/register">Sign up</a>
          </div>
        )}
  
       
      </div>
    );
  };
  
  export default HomePage;