import {createContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext({
    user:null,
    login: (user) => {},
    logout: () => {}
});

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = Cookies.get('user');
        if(user){
            setUser(user);
        }
    }, [])

 

    const login = (user) => {
        setUser(user);
        Cookies.set('user', user, {expires: 7})
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('user');
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}