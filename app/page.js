
import {  Stack } from "@mui/material";
// import 'global.css'
import "./globals.css";
import Integrantes from "./components/Integrantes";
import Login from "./components/Login";

export default function Home() {
  return (
    // <Stack>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      style={{ minHeight: "90vh" }} // Asegura que Stack ocupe al menos toda la altura de la ventana
    >
      {/* Módulo de Ventas */}
      <Integrantes />

      {/* Tarjeta de Inicio de Sesión */}
      <Login />
    </Stack>
    /* </Stack> */
  );
}
