import { useRouter } from "next/router";
import { NextResponse } from "next/server";

export function middleware(request) {
  // Obtener los datos del usuario de la cookie
  const userData = request.cookies.get("userData");

  // const

  // Verificar si se recibieron datos del usuario en la cookie
  if (userData) {
    const userDataJson = JSON.parse(userData.value);
    console.log(
      "Datos del usuario obtenidos de la cookie middleware:",
      userDataJson
    );
    // Verificar si el id_usuario no está vacío
    if (userDataJson.id_usuario != "" && userDataJson != '') {
      // Permitir el acceso a las páginas después de "/" si id_usuario no está vacío
      console.log("permitido");
    } else {
      if (request.nextUrl.pathname !== "/") {
        console.log("denegado");
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } else {
    // Continuar con la respuesta predeterminada si no se encuentran datos del usuario en la cookie
    console.log("No se encontraron datos del usuario en la cookie middleware");
    return NextResponse.next();
  }
}

// Verifica si la ruta coincide con "/home" o "/"
export const config = {
  matcher: ["/home(.*)", "/"],
};
