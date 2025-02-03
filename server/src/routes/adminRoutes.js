import express from 'express';

// Importar los controladores
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} from '../controllers/admin/ProductosController.js';
// Importar los controladores de categorías
import {
  getCategorias,
  getCategoriaById,
  addCategoria,
  updateCategoria,
  deleteCategoria
} from '../controllers/admin/CategoriasController.js';

// Crear una instancia del router
const router = express.Router();

// Rutas para productos
router.get('/productos', getProductos);             // Obtener todos los productos
router.get('/productos/:id', getProductoById);      // Obtener un producto por ID
router.post('/productos', createProducto);          // Crear un nuevo producto
router.put('/productos/:id', updateProducto);       // Actualizar un producto existente
router.delete('/productos/:id', deleteProducto);    // Eliminar un producto

// Rutas para categorías
router.get('/categorias', getCategorias);           // Obtener todas las categorías
router.get('/categorias/:id', getCategoriaById);    // Obtener una categoría por ID
router.post('/categorias', addCategoria);           // Agregar una nueva categoría
router.put('/categorias/:id', updateCategoria);     // Editar una categoría existente
router.delete('/categorias/:id', deleteCategoria);  // Eliminar una categoría



export default router;





