import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductoById, getProductos } from "../services/ProductoService";
import { Producto } from "../types/Producto";
import ProductoCard from "../components/ProductoCard";
import Loader from "../components/Loading";
import "./styles/ProductoPage.css";
import { useCart } from "../context/CartContext"; // Importar el contexto del carrito

const ProductoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [productosRelacionados, setProductosRelacionados] = useState<Producto[]>([]);
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad
  const { addToCart } = useCart(); // Usar el contexto del carrito

  useEffect(() => {
    const fetchProducto = async (id: string) => {
      try {
        const data = await getProductoById(id);
        setProducto(data as unknown as Producto);
        fetchProductosRelacionados();
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };

    const fetchProductosRelacionados = async () => {
      try {
        const data = await getProductos();
        setProductosRelacionados(data as unknown as Producto[]);
      } catch (error) {
        console.error("Error al cargar productos relacionados:", error);
      }
    };

    if (id) {
      fetchProducto(id);
    }
  }, [id]);

  if (!producto) {
    return <Loader />;
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Función para manejar el evento de agregar al carrito
  const handleAgregarAlCarrito = () => {
    if (producto) {
      addToCart(producto._id!, cantidad); // Agregar el producto al carrito con la cantidad seleccionada
    }
  };

  return (
    <section className="producto-page">
      <div className="producto-contenido">
        <div className="producto-imagen">
          <img className="producto-img" src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="producto-detalles">
          <h1>{producto.nombre}</h1>
          <p className="producto-precio">${formatPrice(producto.precio)}</p>
          <p>{producto.descripcion}</p>
          <p><strong>Marca:</strong> {producto.marca}</p>
          <p><strong>Categorías:</strong> {producto.categoria.map(cat => cat.nombre_categoria).join(", ")}</p>
          <div className="producto-acciones">
            <input
              type="number"
              value={cantidad}
              min={1}
              max={producto.stock}
              className="producto-cantidad"
              onChange={(e) => setCantidad(Number(e.target.value))} // Actualizar la cantidad
            />
            <button className="producto-agregar" onClick={handleAgregarAlCarrito}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      
      <section className="productos-relacionados">
        <h2>Productos Relacionados</h2>
        <div className="productos-grid">
          {productosRelacionados.length === 0 ? (
            <p>No hay productos relacionados disponibles.</p>
          ) : (
            productosRelacionados.map((prod) => (
              <ProductoCard
                key={prod._id}
                producto={prod}
                onClick={() => navigate(`/producto/${prod._id}`)}
              />
            ))
          )}
        </div>
      </section>
    </section>
  );
};

export default ProductoPage;