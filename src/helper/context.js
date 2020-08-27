import React, { createContext, useState, useEffect } from 'react';
import { User } from './api';

const AppContext = createContext({});
export default AppContext;

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    user: new User(),
  });

  const setContext = (newContext) => {
    setState(...newContext);
  };

  //   const setContext = () => {};

  return (
    <AppContext.Provider
      value={{
        ...state,
        setContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
