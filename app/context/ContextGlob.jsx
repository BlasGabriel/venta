"use client";

import { createContext } from "react";
import { UserProvider } from "./UserContext";

export const ContextGlob = createContext();

export const use = () => {
    const context = use(ContextGlob);
    if (!context) {
      throw new Error("use must be used within a ContextProvider");
    }
    return context;
  };
  

export const ContextGlobProvider = ({ children }) => {
  return (
   
      <UserProvider>
        {children}
      </UserProvider>
  );
};
