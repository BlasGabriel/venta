"use client";

import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export const UserProvider = ({ children }) => {
    // Solo utiliza useState si estás seguro de que el componente se renderiza en el lado del cliente
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: false
    });
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
