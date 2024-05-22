"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { getDeudasCobrar } from "../api/DeudasCobrar.api";
import { cobrar } from "../api/ItemCobrar.api";


export const DeudasCobrarContext = createContext();

export const useDeudasCobrar = () => {
    const context = useContext(DeudasCobrarContext);
    if (!context) {
        throw new Error("useDeudasCobrar must be used within a UserProvider");
    }
    return context;
}


export const DeudasCobrarProvider = ({ children }) => {
    const [deudas, setDeudas] = useState([]);
    const [loading, setLoading] = useState(true);
    const getDeudas = async () => {
        try {
            const response = await getDeudasCobrar();
            setDeudas(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener deudas:", error);
        }
    };

    const cobrarDeuda = async (id) => {
        try {
            const response = await cobrar(id);
            return response.data;
        } catch (error) {
            console.error("Error al cobrar deuda:", error);
        }
    }
    // useEffect(() => {
    //     getDeudasCobrar();
    // }, []);
    return (
        <DeudasCobrarContext.Provider value={{ deudas, loading, getDeudas, cobrarDeuda }}>
            {children}
        </DeudasCobrarContext.Provider>
    );
}