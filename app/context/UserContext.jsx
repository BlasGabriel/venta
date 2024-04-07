"use client";
import { createContext, useState, useContext } from "react";
import { getUsuario } from "../api/usuario.api";

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

    const getUser = async (user) => {
        try {
            const response = await getUsuario(user);
            setUser(response.data);
        } catch (error) {
            console.error("Error al obtener usuario:", error);
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, getUser }}>
            {children}
        </UserContext.Provider>
    );
}
