import Link from "next/link";
import ButtonDE from "./components/ButtonDE";
import { Container, Input, Stack, TextField, Typography } from "@mui/material";
// import 'global.css'
import "./globals.css";

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
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/* Módulo de Ventas */}
        <div className="w-1/2 p-8 bg-gray-100">
          <h1 className="text-3xl font-bold underline">Módulo de Ventas</h1>
          <ul>
            <li>Aldo Gustavo, Ortigoza Andino</li>
            <li>Shyrley Natalia, Flor Benítez </li>
            <li>Eduardo Ramón, Cuevas Martínez </li>
            <li>Blas Gabriel, Santacruz Ramirez </li>
          </ul>
        </div>
      </div>
      {/* Tarjeta de Inicio de Sesión */}
      <div style={{ width: "100%" }}>
        <Container className="custom-container">
          <Typography
            variant="h4"
            //  className="text-3xl font-bold underline"
          >
            Login
          </Typography>
          <div className="mb-4">
            {/* <label htmlFor="username">Nombre de usuario:</label> */}
            <TextField
              type="text"
              label="Nombre de usuario"
              id="username"
              // className="block  w-full "
            />
          </div>
          <div className="mb-4">
            {/* <label htmlFor="password">Contraseña:</label> */}
            <TextField
              type="password"
              id="password"
              label="Contraseña"
              // className="block w-full "
            />
          </div>
          <Link href="/home">
            <ButtonDE>Iniciar sesión</ButtonDE>
          </Link>
        </Container>
      </div>
    </Stack>
    /* </Stack> */
  );
}
