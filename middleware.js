import { NextResponse } from "next/server";

export function middleware(request) {
  // Obtener los datos del usuario de la cookie
  const userData = request.cookies.get('userData');


  // Verificar si se recibieron datos del usuario en la cookie
  if (userData) {
    const userDataJson = JSON.parse(userData.value);
    console.log('Datos del usuario obtenidos de la cookie middleware:', userDataJson);
    // Puedes hacer lo que necesites con los datos del usuario obtenidos de la cookie
  } else {
    // Continuar con la respuesta predeterminada
    // return NextResponse.next();
    console.log('No se encontraron datos del usuario en la cookie middleware');
  }

  // Continuar con la respuesta predeterminada
  return NextResponse.next();
}

// Verifica si la ruta coincide con "/home" o "/"
export const config = {
  matcher: ["/home(.*)", "/"],
};
