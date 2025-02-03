import Categoria from '../../models/Categoria.js'; // Asegúrate de importar el modelo de Categoria

// Obtener todas las categorías
const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las categorías", error: error.message });
    }
};

// Obtener una categoría por ID
const getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) return res.status(404).json({ mensaje: "Categoría no encontrada" });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la categoría", error: error.message });
    }
};

// Agregar una nueva categoría
const addCategoria = async (req, res) => {
    try {
        const { nombre_categoria } = req.body;

        // Verifica si la categoría ya existe
        const categoriaExistente = await Categoria.findOne({ nombre_categoria });
        if (categoriaExistente) {
            return res.status(400).json({ mensaje: "La categoría ya existe" });
        }

        // Si no existe, crea una nueva categoría
        const nuevaCategoria = new Categoria(req.body);
        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        console.error("Error al agregar la categoría:", error);
        res.status(500).json({ mensaje: "Error al agregar la categoría", details: error.message });
    }
};

// Editar una categoría existente
const updateCategoria = async (req, res) => {
    try {
        const updatedCategoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategoria) return res.status(404).json({ mensaje: "Categoría no encontrada" });
        res.json(updatedCategoria);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al editar la categoría", error: error.message });
    }
};

// Eliminar una categoría
const deleteCategoria = async (req, res) => {
    try {
        const deletedCategoria = await Categoria.findByIdAndDelete(req.params.id);
        if (!deletedCategoria) return res.status(404).json({ mensaje: "Categoría no encontrada" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la categoría", error: error.message });
    }
};

export { getCategorias, getCategoriaById, addCategoria, updateCategoria, deleteCategoria };