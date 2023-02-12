import { useState } from "react";
import './SignIn.css'

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
          });
          const data = await response.json();
          console.log(data);
          // Add logic to handle successful sign in
        } catch (error) {
          console.error(error);
          // Add logic to handle sign in failure
        }
      };
    
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