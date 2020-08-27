import React, { createContext, useState, useEffect } from "react";
import { User } from "./api";

const Context = createContext();

export const AppContext = ({ children }) => {
  const [state, setState] = useState();

  const user = new User();

  //   const setContext = () => {};

  return (
    <Context.Provider
      value={{
        ...state,
        user,
        // setContext,
      }}
    >
      {children}
    </Context.Provider>
  );
};
