// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, PrivateRoute } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // Importar el CartProvider
import Home from "./pages/Home";
import GestorProductos from "./pages/GestorProductos";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProductoPage from "./pages/ProductoPage";
import CartPage from "./pages/CartPage"; // Importar CartPage

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/producto/:id" element={<ProductoPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} /> {/* Ruta para el carrito */}
            {/* Ruta protegida para todos los usuarios autenticados */}
            <Route
              path="/gestorproductos"
              element={
                <PrivateRoute requiredRole="admin">
                  <GestorProductos />
                </PrivateRoute>
              }
            />
            {/* Ruta protegida solo para administradores */}
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRoles={["admin", "superadmin"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;