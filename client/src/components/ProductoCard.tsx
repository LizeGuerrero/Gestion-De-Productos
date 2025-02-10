import React, { useState, useRef, useEffect } from "react";
import { Producto } from "../types/Producto";
import { useCart } from "../context/CartContext";
import "./styles/ProductCard.css";

interface ProductoCardProps {
  producto: Producto;
  onClick: () => void;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ producto, onClick }) => {
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [isOverflowing, setIsOverflowing] = useState(false); // Estado para detectar desbordamiento
  const [isHovered, setIsHovered] = useState(false); // Estado para manejar el hover
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Detectar si el texto se desborda
  useEffect(() => {
    if (headerRef.current && textRef.current) {
      const headerWidth = headerRef.current.clientWidth;
      const textWidth = textRef.current.scrollWidth;
      setIsOverflowing(textWidth > headerWidth);
    }
  }, [producto.nombre]);

  // Formatear el precio
  const formatPrice = (price: number) => {
    return price.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <article className="producto-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div
        className={`header-card ${isOverflowing ? "overflowing" : ""}`}
        ref={headerRef}
        onMouseEnter={() => setIsHovered(true)} // Activar hover
        onMouseLeave={() => setIsHovered(false)} // Desactivar hover
      >
        <h2
          ref={textRef}
          style={{
            transform:
              isHovered && isOverflowing
                ? `translateX(calc(${headerRef.current?.clientWidth}px - 100%))`
                : "translateX(0)",
            transition: "transform 5s linear", // Ajusta la velocidad aquí
            display: "inline-block", // Asegura que el texto se comporte como un bloque en línea
            whiteSpace: "nowrap", // Evita que el texto se divida en varias líneas
          }}
        >
          {producto.nombre}
        </h2>
        {isOverflowing && <div className="fade-overlay" />} {/* Oscurecimiento */}
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
        <input
          type="number"
          value={cantidad}
          min={1}
          max={producto.stock}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="cantidad-input"
        />
        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(producto._id!, cantidad);
          }}
        >
          🛒 Agregar al carrito
        </button>
      </section>
    </article>
  );
};

export default ProductoCard;