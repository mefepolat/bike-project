
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { redirect } from "react-router";

const SignOutButton = () => {
    const {logout} = useContext(AuthContext);
    
    const handleSignOut = async () => {
        try {
        const response = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Policy": "application/json"
            },
            
        })
      
        logout();
        redirect('/');
        console.log(response)
        }
     catch (err) {
        return console.log(err)
    }
}
    return (
        <a href="/logout" onClick={handleSignOut}>Sign Out</a>
    )
}

export default SignOutButton;