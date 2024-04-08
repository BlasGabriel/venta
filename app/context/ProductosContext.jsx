"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { getProductos } from "../api/Productos.api";

export const ProductosContext = createContext();

export const useProductos = () => {
    const context = useContext(ProductosContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export const ProductosProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        try {
            const response = await getProductos();
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    // useEffect(() => {
    //     getProducts();
    // }, []);

    return (
        <ProductosContext.Provider value={{ products, loading }}>
            {children}
        </ProductosContext.Provider>
    );
}