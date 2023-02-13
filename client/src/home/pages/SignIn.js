import { useState, useEffect, useContext} from "react";
import './SignIn.css'
import { AuthContext } from "../../shared/components/AuthContext";
import { Navigate } from "react-router";
import {useNavigate} from "react-router-dom";


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 const {login} = useContext(AuthContext);
 const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
    
     login(data._doc);
     console.log(data._doc)
     navigate("/")
      // Add logic to handle successful sign in
    } catch (error) {
      console.error(error);
      setError('Could not sign in. Please try again.')
      // Add logic to handle sign in failure
    } finally {
      setIsLoading(false);
    }
  };

    
    return (
      
       <>
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
            <button type="submit">{isLoading ? 'Signing in...' : 'Sign In'}</button>
            
        </form>
        </>
    );
}

export default SignIn;