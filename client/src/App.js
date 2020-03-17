import React, { Fragment } from 'react';
import './App.css';
import User from "./containers/User";
import Project from './containers/Project';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <User></User>
      <Project></Project>
    </AuthContextProvider>
  );
}

export default App;
