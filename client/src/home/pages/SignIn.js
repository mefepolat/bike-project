import { useState } from "react";
import './SignIn.css'

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" 
                name="username" 
                id="usermame"
                value={username}
                onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <button type="submit">Sign In</button>
        </form>
    )
}

export default SignIn;