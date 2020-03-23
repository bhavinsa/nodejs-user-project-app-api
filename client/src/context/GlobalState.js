import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  employees: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setEmployee(employees) {
    dispatch({
      type: 'SET_EMPLOYEE',
      payload: employees
    });
  }

  function removeEmployee(id) {
    dispatch({
      type: 'REMOVE_EMPLOYEE',
      payload: id
    });
  }

  function addEmployee(employees) {
    dispatch({
      type: 'ADD_EMPLOYEES',
      payload: employees
    });
  }

  function editEmployee(employees) {
    dispatch({
      type: 'EDIT_EMPLOYEE',
      payload: employees
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        employees: state.employees,
        setEmployee,
        removeEmployee,
        addEmployee,
        editEmployee
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
