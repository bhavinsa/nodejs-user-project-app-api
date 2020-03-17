import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [auth, setAuth] = useState(false);

    const toggleAuth = value => {
        setAuth(!value);
    }

    return (
        <AuthContext.Provider value={{ auth, toggleAuth: toggleAuth }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;