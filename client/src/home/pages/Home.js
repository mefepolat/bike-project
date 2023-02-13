import CheckOutButton from "../components/CheckOutButton";
import SelectStation from "../components/SelectStation";
import {AuthContext } from "../../shared/components/AuthContext";
import { useContext } from "react";
import ReportButton from "../components/ReportButton";




const HomePage = () => {
    const { user } = useContext(AuthContext);
  
    return (
      <div className="home_section">
        <h1>HomePage</h1>
  
        {user ? (
           <div>
           <SelectStation />
          <CheckOutButton />
          <ReportButton />
            
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