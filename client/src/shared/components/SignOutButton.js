import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { redirect } from "react-router";

const SignOutButton = () => {
    const {logout} = useContext(AuthContext);
    
    const handleSignOut = async () => {
        try {
        axios
        .post('http://localhost:3000/logout');
        logout();
        return redirect('/');
        }
     catch (err) {
        console.log(err)
    }
}
    return (
        <a href="/logout" onClick={handleSignOut}>Sign Out</a>
    )
}

export default SignOutButton;