'use client'

import { Stack } from "@mui/material";
import Titulo from "../components/Titulo";
import ItemButtonNav from "../components/ItemButtonNav";
import { useUser } from "../context/UserContext";

export default function RootLayout({ children }) {
  const { setUser } = useUser();
  const Salir = async () => {
    await setUser({
      id_usuario: "",
      id_persona: "",
      id_perfil: "",
      login: "",
      password: "",
      estado: 0,
    });

  };
  return (
    // <html lang="en">
      // {/* <body> */}
        // {/* Layout UI */}
        <>
        <Titulo titulo="Venta" />
        <Stack direction="row" spacing={2}>
          <ItemButtonNav linkTo="/home/DeudasPagar">Deudas a pagar</ItemButtonNav>

          <ItemButtonNav linkTo="/home/DeudasPagadas">Deudas pagadas</ItemButtonNav>

          <ItemButtonNav linkTo="/home/NuevaVenta">Nueva Venta </ItemButtonNav>

          <ItemButtonNav linkTo="/home/DeudasCobrar">Deudas A Cobrar</ItemButtonNav>

          <ItemButtonNav >Salir </ItemButtonNav>
        </Stack>
        <main>{children}</main>
        </>
      // {/* </body> */}
    // {/* </html> */}
  );
}
