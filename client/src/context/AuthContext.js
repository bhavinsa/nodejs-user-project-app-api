import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = props => {
  const [auth, setAuth] = useState(false);

  const authToggle = value => {
    setAuth(value);
  };

  return (
    <AuthContext.Provider value={{ auth, authToggle: authToggle }}>
      {props.children}
    </AuthContext.Provider>
  );
};
