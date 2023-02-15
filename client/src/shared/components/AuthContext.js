import {createContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext({
    user:null,
    login: (user) => {},
    logout: () => {},
    
});

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);

    // const checkUser = async () =>{
    
    //         const response = await fetch("http://localhost:3000/api/checkUser", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({userId})
    //         })
    //         const data = await response.json();
            
    //         return data;
    //    }

    useEffect(() => {
        
        const user = Cookies.get("user");
       
       
        if(user){
            setUser(JSON.parse(user));
        }
    },[])



    const login = (user) => {
        setUser(user);
        Cookies.set('user', JSON.stringify(user), {expires: 7})
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