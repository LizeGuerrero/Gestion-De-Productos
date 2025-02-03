import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
    nombre_categoria: {
        type: String,
        required: true,
        unique: true, // Para evitar categorías duplicadas
    },
    descripcion: {
        type: String,
        required: false, // Opcional, para agregar una descripción a la categoría
    },
    imagen: {
        type: String,
        required: false, // Opcional, para agregar una imagen representativa de la categoría
        validate: {
            validator: function (v) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v); // Validación de URL de imagen
            },
            message: "La URL de la imagen no es válida.",
        },
    },
});

const Categoria = mongoose.model('categorias', categoriaSchema);

export default Categoria;