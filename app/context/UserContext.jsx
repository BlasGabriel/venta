"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { getUsuario } from "../api/Usuario.api";
import Cookies from "js-cookie";
export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id_usuario: '',
        id_persona: '',
        id_perfil: '',
        login: '',
        password: '',
        estado: 0
    });

    
    const getUser = async (user) => {
        try {
            const response = await getUsuario(user);
            setUser(response.data);
            console.log("User:", response);
            Cookies.set("userData", JSON.stringify(response.data));
        } catch (error) {
            console.error("Error al obtener usuario:", error);
        }
    }

    useEffect(() => {
        // Cargar datos del usuario al montar el componente
        // getUser();
        Cookies.set("userData", JSON.stringify(user));

    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, getUser }}>
            {children}
        </UserContext.Provider>
    );
}
