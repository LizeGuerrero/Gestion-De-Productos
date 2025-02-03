import React from "react";
import { useCart } from "../context/CartContext";
import { getProductoById } from "../services/ProductoService";
import styles from "./styles/CartPage.module.css"; // Importar los estilos

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [productos, setProductos] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log("Estado del carrito:", cart);
    if (!Array.isArray(cart.items)) {
      console.error("El carrito no tiene una estructura válida:", cart.items);
      return;
    }
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await Promise.all(
          cart.items.map(async (item) => {
            try {
              const product = await getProductoById(item.productId);
              return { ...product, quantity: item.quantity };
            } catch (error) {
              console.error(`Error al obtener el producto con ID ${item.productId}:`, error);
              return null; // Ignorar este producto si hay un error
            }
          })
        );
        // Filtrar los productos nulos (errores)
        setProductos(fetchedProducts.filter((product) => product !== null));
      } catch (error) {
        console.error("Error al cargar los productos del carrito:", error);
      }
    };
    fetchProducts();
  }, [cart]);

  const total = productos.reduce((acc, product) => acc + product.precio * product.quantity, 0);

  // Función para formatear los números con separadores de miles
  const formatPrice = (price: number): string => {
    return price.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Carrito de Compras</h2>
      {productos.length === 0 ? (
        <p className={styles.emptyMessage}>El carrito está vacío.</p>
      ) : (
        <>
          {productos.map((product) => {
            const productTotal = product.precio * product.quantity; // Total por producto
            return (
              <div key={product._id} className={styles.productItem}>
                {/* Imagen del producto */}
                <div className={styles.productImageContainer}>
                  <img
                    src={product.imagen || "https://via.placeholder.com/150"} // Usar placeholder si no hay imagen
                    alt={product.nombre}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{product.nombre}</h3>
                  <p className={styles.productPrice}>
                    Precio unitario: ${formatPrice(product.precio)}
                  </p>
                  <p className={styles.productPrice}>
                    Total por producto: ${formatPrice(productTotal)}
                  </p>
                  <div className={styles.productQuantity}>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product._id, parseInt(e.target.value))}
                      min="1"
                      className={styles.quantityInput}
                    />
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className={styles.deleteButton}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className={styles.totalContainer}>
            <h3>Total general: ${formatPrice(total)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;