"use client";
import { Container, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ButtonDE from "./ButtonDE";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [valuee, setValue] = useState();

  const { user, getUser } = useUser();
  const handleChange = (event) => {
    setValue({
      ...valuee,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    getUser(valuee);
    console.log(valuee);
    console.log(user);

  };

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handleSubmit}>
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
              name="login"
              onChange={handleChange}
              // className="block  w-full "
            />
          </div>
          <div className="mb-4">
            {/* <label htmlFor="password">Contraseña:</label> */}
            <TextField
              type="password"
              name="password"
              label="Contraseña"
              onChange={handleChange}
              // className="block w-full "
            />
          </div>
          <Link href="/home">
            <ButtonDE>Iniciar sesión</ButtonDE>
          </Link>
          <ButtonDE type="submit">Mostrar consola</ButtonDE>
        </Container>
      </form>
    </div>
  );
};

export default Login;
