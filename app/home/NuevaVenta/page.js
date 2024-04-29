"use client";
import React, { useEffect, useState } from "react";
import { useProductos } from "@/app/context/ProductosContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Stack,
  TablePagination,
  InputAdornment,
  Box,
} from "@mui/material";
import ButtonDE from "@/app/components/ButtonDE";
import { useClientes } from "@/app/context/ClientesContext";
import BoxTable from "@/app/components/containers/BoxTable";
import SearchIcon from "@mui/icons-material/Search";
import Carrito from "./Carrito";

function Page() {
  const { products, getProducts } = useProductos();
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({}); // Estado para almacenar la cantidad de cada producto
  const { getClientes, getClienteRuc, getClienteId } = useClientes();

  // function addToCart(product) {
  //   // Verificar si el producto ya está en el carrito
  //   const existingProductIndex = cart.findIndex(
  //     (item) => item.id_producto == product.id_producto
  //   );
  //   console.log(quantity);
  //   console.log(product);

  // // Obtener la cantidad del producto del objeto quantity o establecerla en 1 si no existe
  // const qty = quantity[product.id_producto] || 1;

  //   if (existingProductIndex !== -1) {
  //     // Si el producto ya está en el carrito, actualizar su cantidad
  //     const updatedCart = [...cart];
  //     updatedCart[existingProductIndex].quantity++;
  //     setCart(updatedCart);
  //   } else {
  //     // Si el producto no está en el carrito, agregarlo con cantidad 1
  //     setCart([...cart, { ...product, quantity: 1 }]);
  //   }
  //   console.log(cart);

  // }
  function addToCart(product) {
    // Copiar el estado actual del carrito
    const updatedCart = [...cart];
  
    // Obtener la cantidad del producto del objeto quantity
    const qty = parseInt(quantity[product.id_producto]) || 0;
  
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = updatedCart.findIndex(item => item.id_producto == product.id_producto);
  
    if (qty > 0) {
      // Si la cantidad es mayor que cero, actualizar la cantidad en el carrito
      if (existingProductIndex !== -1) {
        updatedCart[existingProductIndex].quantity = qty;
      } else {
        updatedCart.push({ ...product, quantity: qty });
      }
    } else {
      // Si la cantidad es cero o no es un número válido, eliminar el producto del carrito si ya está presente
      if (existingProductIndex !== -1) {
        updatedCart.splice(existingProductIndex, 1);
      }
    }
  
    // Actualizar el estado del carrito y el objeto quantity
    setCart(updatedCart);
    setQuantity({ ...quantity, [product.id_producto]: qty });
  }
  

  function removeFromCart(productId) {
    // Filtrar el carrito para excluir el producto que se va a quitar
    const updatedCart = cart.filter((item) => item.id_producto !== productId);
    setCart(updatedCart);
  }

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
      console.log(await getClientes());
      console.log("RUC	", await getClienteRuc(1234567));
      console.log("ID	", await getClienteId(7));
    };

    fetchData();
  }, []);

  //Contro de cantidad de intem moviles
  //--------------------------------------------------------------------------
  // rows
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // filtros
  const filteredItem = products.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase();
    const descripcionIncludes = item.descripcion
      .toLowerCase()
      .includes(searchTermLower);
    const codigo_barraIncludes = item.codigo_barra
      .toLowerCase()
      .includes(searchTermLower);
    // const apellidoIncludes = item.apellido.toLowerCase().includes(searchTermLower);
    // const nombreApellidoCombined = `${item.nombre} ${item.apellido}`.toLowerCase().includes(searchTermLower);

    return descripcionIncludes || codigo_barraIncludes;
  });
  // --------------------------------------------------------------------------
  const paginatedItem = filteredItem.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  if (!paginatedItem) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div>
      <h1>Productos Disponibles</h1>
      {/* <TableContainer component={Paper}> */}
      <Box display="flex" flexDirection="row">
        <BoxTable>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell>Observación</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItem.map((product) => (
                <TableRow key={product.id_producto}>
                  <TableCell component="th" scope="row">
                    {product.descripcion}
                  </TableCell>
                  <TableCell align="right">
                    ${product.precio_venta_maximo}
                  </TableCell>
                  <TableCell>{product.observacion}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={quantity[product.id_producto] || ""}
                      onChange={(e) =>
                        setQuantity((prev) => ({
                          ...prev,
                          [product.id_producto]: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <ButtonDE onClick={() => addToCart(product)}>
                      Agregar al carrito
                    </ButtonDE>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredItem.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Stack
            // direction="row"
            // justifyContent="center"
            // alignItems="center"
            sx={{ m: 2 }}
            spacing={1}
          >
            <TextField
              autoFocus
              label="Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              // sx={{ m: 2,  }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </BoxTable>
        <BoxTable>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Precio</TableCell>
            {/* <TableCell>Observación</TableCell> */}
            {/* <TableCell>Cantidad</TableCell> */}
            <TableCell>
              <Carrito cart={cart} />
            </TableCell>
          </TableRow>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id_producto}>
                <TableCell>
                  {item.descripcion} - Cantidad: {item.quantity}
                </TableCell>
                <TableCell>
                  <ButtonDE onClick={() => removeFromCart(item.id_producto)}>
                    Quitar
                  </ButtonDE>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </BoxTable>
      </Box>
      {/* </TableContainer> */}
    </div>
  );
}

export default Page;
