import { Stack } from "@mui/material";
import Titulo from "../components/Titulo";
import ItemButtonNav from "../components/ItemButtonNav";

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
      // {/* <body> */}
        // {/* Layout UI */}
        <>
        <Titulo titulo="Titulo" />
        <Stack direction="row" spacing={2}>
          <ItemButtonNav linkTo="/home/DeudasPagar">Deudas a pagar</ItemButtonNav>

          <ItemButtonNav linkTo="/home/DeudasPagadas">Deudas pagadas</ItemButtonNav>

          <ItemButtonNav linkTo="/home/NuevaVenta">Nueva Venta </ItemButtonNav>
          <ItemButtonNav >Salir </ItemButtonNav>
        </Stack>
        <main>{children}</main>
        </>
      // {/* </body> */}
    // {/* </html> */}
  );
}
