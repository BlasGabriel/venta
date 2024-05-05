"use client";
import { createContext, useState, useContext, useEffect } from "react";
import {insertarVentaApi} from "../api/Venta.api";
export const VentasContext = createContext();

export const useVentas = () => {
    const context = useContext(VentasContext);
    if (!context) {
        throw new Error("useVentas must be used within a VentasProvider");
    }
    return context;
};

export const VentasProvider = ({ children }) => {

    const insertarVenta = async (venta) => {
        try {
            const response = await insertarVentaApi(venta);
            return response.data;
        } catch (error) {
            console.error("Error al insertar venta:", error);
        }
    };
    return (
        <VentasContext.Provider value={{ insertarVenta }}>
            {children}
        </VentasContext.Provider>
    );
};
