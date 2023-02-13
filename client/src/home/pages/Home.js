// import CheckOutButton from "../components/CheckOutButton";

<<<<<<< HEAD
import CheckOutButton from "../components/CheckOutButton";
import SelectStation from "../components/SelectStation"
=======
import SelectStation from "../components/SelectStation";
import {AuthContext } from "../../shared/components/AuthContext";
import { useContext } from "react";

>>>>>>> 970cac71b2dd3a29c98c0f1626a93419121d2571


const HomePage = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        
        <div className="home_section">
            <h1>HomePage</h1>
            
            
            <SelectStation />
            <CheckOutButton/>

          
            
        </div>
        
    )
};

export default HomePage;