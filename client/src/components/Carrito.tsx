import React, { useState, useEffect } from "react";
import { ProductoCarrito } from "../types/Producto";

type CarritoState = {
  productos: ProductoCarrito[];
  total: number;
  cantidadTotal: number;
};

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<CarritoState>({ productos: [], total: 0, cantidadTotal: 0 });

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const calcularTotales = (productos: ProductoCarrito[]) => {
    const total = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    const cantidadTotal = productos.reduce((acc, producto) => acc + producto.cantidad, 0);
    return { total, cantidadTotal };
  };

  const actualizarCarrito = (productos: ProductoCarrito[]) => {
    const { total, cantidadTotal } = calcularTotales(productos);
    setCarrito({ productos, total, cantidadTotal });
  };



  const aumentarCantidad = (id: string) => {
    const nuevosProductos = carrito.productos.map(producto =>
      producto._id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
    );
    actualizarCarrito(nuevosProductos);
  };

  const disminuirCantidad = (id: string) => {
    const nuevosProductos = carrito.productos
      .map(producto =>
        producto._id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
      .filter(producto => producto.cantidad > 0);
    actualizarCarrito(nuevosProductos);
  };

  const eliminarDelCarrito = (id: string) => {
    const nuevosProductos = carrito.productos.filter(producto => producto._id !== id);
    actualizarCarrito(nuevosProductos);
  };

  const vaciarCarrito = () => {
    setCarrito({ productos: [], total: 0, cantidadTotal: 0 });
  };

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      {carrito.productos.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {carrito.productos.map((producto) => (
            <li key={producto._id} className="carrito-item">
              <img src={producto.imagen} alt={producto.nombre} className="carrito-image" />
              <div>
                <p><strong>{producto.nombre}</strong></p>
                <p>Precio: ${producto.precio.toFixed(2)}</p>
                <div className="cantidad-control">
                  <button onClick={() => disminuirCantidad(producto._id)}>-</button>
                  <span>{producto.cantidad}</span>
                  <button onClick={() => aumentarCantidad(producto._id)}>+</button>
                </div>
                <button onClick={() => eliminarDelCarrito(producto._id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p><strong>Total: ${carrito.total.toFixed(2)}</strong></p>
      <p><strong>Cantidad total de productos: {carrito.cantidadTotal}</strong></p>
      {carrito.productos.length > 0 && <button onClick={vaciarCarrito}>Vaciar Carrito</button>}
    </div>
  );
};

export default Carrito;
