import "./Navbar.css"
import SignOutButton from "./SignOutButton";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const NavBar = () => {
   const {user} = useContext(AuthContext);
    return (
        <nav>
            <a href="/">Home</a>
            <a href="/about">ABOUT</a>
            {console.log(user)}
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