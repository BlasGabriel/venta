"use client";
import React, { useEffect, useState } from 'react';
import { useProductos } from '@/app/context/ProductosContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import ButtonDE from '@/app/components/ButtonDE';

function Page() {
  const { products, getProducts } = useProductos();
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({}); // Estado para almacenar la cantidad de cada producto

  function addToCart(product) {
    // Obtener la cantidad del producto o establecerla como 1 si no se proporciona
    const qty = quantity[product.id_producto] || 1;
    console.log({ ...product, quantity: qty });
    setCart([...cart, { ...product, quantity: qty }]);
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (!products) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div>
      <h1>Productos Disponibles</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell>Observación</TableCell>
              <TableCell>Cantidad</TableCell> {/* Celda para la cantidad */}
              <TableCell></TableCell> {/* Espacio para el botón */}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id_producto}>
                <TableCell component="th" scope="row">
                  {product.descripcion}
                </TableCell>
                <TableCell align="right">${product.precio_venta_maximo}</TableCell>
                <TableCell>{product.observacion}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={quantity[product.id_producto] || ''}
                    onChange={(e) =>
                      setQuantity((prev) => ({
                        ...prev,
                        [product.id_producto]: parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                </TableCell>
                <TableCell>
                  <ButtonDE onClick={() => addToCart(product)}>Agregar al carrito</ButtonDE>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Page;
