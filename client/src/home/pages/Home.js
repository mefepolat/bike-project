import {AuthContext } from "../../shared/components/AuthContext";
import { useContext, useState } from "react";
import ReportButton from "../components/ReportButton";
import BeginTrip from "../components/BeginTrip";
import EndTrip from "../components/EndTrip";


const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [activeTrip, setActiveTrip] = useState(null);

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