import React from "react";
import { Producto } from "../types/Producto";
import { useCart } from "../context/CartContext";

interface ProductoCardProps {
  producto: Producto;
  onClick: () => void;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ producto, onClick }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return price.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <article className="producto-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="header-card">
        <h2>{producto.nombre}</h2>
      </div>
      <div className="main-card">
        <img src={producto.imagen} alt={producto.nombre} className="producto-image" />
        <p><strong>Descripción:</strong> {producto.descripcion}</p>
        <p className="producto-precio">
          <strong>Precio:</strong> ${formatPrice(producto.precio)}
        </p>
        <p><strong>Marca:</strong> {producto.marca}</p>
        <p>
          <strong>Categorías: </strong>
          {producto.categoria.map((categoria) => categoria.nombre_categoria).join(", ")}
        </p>
      </div>
      <section className="footer-card">
        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation(); // Evitar que el evento burbujeé al contenedor principal
            addToCart(producto._id!); // Agregar el producto al carrito
          }}
        >
          🛒 Agregar al carrito
        </button>
      </section>
    </article>
  );
};

export default ProductoCard;