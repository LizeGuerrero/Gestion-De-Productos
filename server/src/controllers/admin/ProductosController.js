import Producto from '../../models/Producto.js'; // Asegúrate de importar el modelo de Producto

// Obtener todos los productos
export const getProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('categoria'); // Populate para obtener detalles de la categoría
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error: error.message });
    }
};

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('categoria'); // Populate para obtener detalles de la categoría
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error: error.message });
    }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json({ message: "Producto creado exitosamente", producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error: error.message });
    }
};

// Actualizar un producto por ID
export const updateProducto = async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('categoria');
        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto actualizado exitosamente", producto: productoActualizado });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
    }
};

// Eliminar un producto por ID
export const deleteProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado exitosamente", producto: productoEliminado });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
    }
};