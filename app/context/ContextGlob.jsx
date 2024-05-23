"use client";

import { createContext } from "react";
import { UserProvider } from "./UserContext";
import { ProductosProvider } from "./ProductosContext";
import { ClientesProvider } from "./ClientesContext";
import { VentasProvider } from "./VentasContext";
import { DeudasCobrarProvider } from "./DeudasCobrarContext";

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
      <ClientesProvider>
        <ProductosProvider>
          <VentasProvider>
            <DeudasCobrarProvider>
                {children}
            </DeudasCobrarProvider>
          </VentasProvider>
        </ProductosProvider>
      </ClientesProvider>
    </UserProvider>
  );
};
