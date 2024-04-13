"use client";
import React, { useEffect } from 'react';
import { useProductos } from '@/app/context/ProductosContext';

function Page() {
  const { products, getProducts } = useProductos();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div>
      <h1>Productos Disponibles</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id_producto          }>
            {/* <img src={product.image} alt={product.name} /> */}
            <div>{product.descripcion}</div>
            <div>${product.precio_venta_maximo}</div>
            <div>{product.observacion}</div>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;

