"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { getClientesApi, getClienteIdApi, getClienteRucApi } from "../api/Cliente.api";

export const ClientesContext = createContext();

export const useClientes = () => {
    const context = useContext(ClientesContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export const ClientesProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getClientes = async () => {
        try {
            const response = await getClientesApi();
            setClientes(response.data);
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        }
    }
    const getClienteId = async (id) => {
        try {
            const response = await getClienteIdApi(id);
            // setClientes(response.data);
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error("Error al obtener cliente:", error);
        }
    }
    const getClienteRuc = async (ruc) => {
        try {
            const response = await getClienteRucApi(ruc);
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error("Error al obtener cliente:", error);
        }
    }
    // useEffect(() => {
    //     getClientes();
    // }, []);
    return (
        <ClientesContext.Provider value={{ clientes, loading, getClientes, getClienteId, getClienteRuc }}>
            {children}
        </ClientesContext.Provider>
    );

}