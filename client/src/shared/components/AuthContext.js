import {createContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import { fetchSession } from './FetchSession';


export const AuthContext = createContext({
    user:null,
    login: (user) => {},
    logout: () => {},
    
});

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async() =>{
            const session = await fetchSession();
            console.log(session)
            setUser(session|| null);
        };
        checkLoginStatus();
    },[])



    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}