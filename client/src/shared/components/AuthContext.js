import {createContext, useEffect, useState} from 'react';
import { fetchSession } from './FetchSession';
import Cookies from 'js-cookie';

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
           
            setUser(session|| null);
        };
        checkLoginStatus();
    },[])

    useEffect(() => {
        if (!user) {
            Cookies.remove('session');
            console.log(user)
        }
    }, [user])


    const login = (user) => {
        setUser(user);
        Cookies.set('session', user, {expires: 7})
    };

    const logout = () => {
        setUser(null);
        console.log(user)
        Cookies.remove('session');
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}