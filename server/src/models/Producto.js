import mongoose from 'mongoose';

// Se crea un const para definir el esquema, por si en el futuro hay que cambiarlo o agregarle algo
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    categoria: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorias",
    }],
    stock: {
        type: Number,
        required: false,
    },
    fecha_lanzamiento: {
        type: Date,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v); // Expresión regular para URLs de imágenes
            },
            message: "La URL de la imagen no es válida.",
        },
    },
    marca: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    reviews: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usuarios",
        },
        comentario: String,
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        fecha: {
            type: Date,
            default: Date.now,
        },
    }],
});

const Producto = mongoose.model('productos', productoSchema);

export default Producto;