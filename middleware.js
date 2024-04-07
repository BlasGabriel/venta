"use client";

import { NextResponse } from "next/server";
import { useUser } from "./app/context/UserContext";

// Supongamos que tienes una función para obtener los datos del usuario
// Esta función puede variar dependiendo de cómo manejes la autenticación en tu aplicación
function getUserData(request) {
    // Aquí obtienes los datos del usuario, por ejemplo, desde la sesión, token, base de datos, etc.
    // Supongamos que los datos del usuario están disponibles en request.user
    const user = request.user;
    return user;
}

export function middleware(request) {
  // const user = getUserData(request);
  const { user } = useUser();


//   // Ahora puedes usar los datos del usuario en tu middleware
//   if (request.nextUrl.pathname.startsWith("/home") && (!user || !user.password)) {
//     console.log("No autenticado");
//     const response = NextResponse.redirect(new URL("/", request.url));
//     return response;
//   }

//   if ((user?.password) && request.nextUrl.pathname.startsWith("/")) {
//     console.log("Autenticado");
//     const response = NextResponse.redirect(new URL("/home", request.url));
//     return response;
//   }
}

// Verifica si la ruta coincide con "/admin" o "/login"
export const config = {
  matcher: ["/home(.*)", "/"],
};
