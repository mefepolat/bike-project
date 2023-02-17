import "./Navbar.css"
import SignOutButton from "./SignOutButton";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const NavBar = () => {
   const {user, updateUser} = useContext(AuthContext);
  
    return (
        <nav>
            <a href="/">Home</a>
            {user && user.user.admin ? <a href="/admin">Admin</a>
            : ""}
            <a href="/about">About</a>
          
            {user ? (
                <SignOutButton />
            ) : (
                <div>
            <a href="/login">Sign in</a>
            <a href="/register">Sign up</a>
            </div>
            )}
            
        </nav>
    )
}

export default NavBar;