import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductos } from "../services/ProductoService";
import "./styles/Home.css";
import { Producto } from "../types/Producto";
import ProductoCard from "../components/ProductoCard";
import Loader from "../components/Loading";

const Home = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data as unknown as Producto[]);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const handleProductClick = (producto: Producto) => {
    navigate(`/producto/${producto._id}`);
  };

  return (
    <section className="container-productos">
      <h1>Productos Disponibles</h1>
      <div className="productos-grid">
        {productos.length === 0 ? (
          <div className="loader-container">
            <Loader /> {/* Solo el Loader se centra */}
          </div>
        ) : (
          productos.map((producto) => (
            <ProductoCard
              key={producto._id}
              producto={producto}
              /* onBuyNow={() => {}} */
              onClick={() => handleProductClick(producto)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
