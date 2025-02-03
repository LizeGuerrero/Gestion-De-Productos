// Importaciones de dependencias usando ESM
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';


// Configuración de variables de entorno
dotenv.config();

// Rutas importadas
import routes from './routes/routes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import cartRoutes from './routes/cart.Routes.js';

// Configurar el servidor Express
const app = express();

// Middlewares
app.use(express.json()); // Análisis de solicitudes JSON
app.use(cors());         // Habilitar CORS
app.use(morgan('dev'));  // Logging de solicitudes HTTP





// Rutas de la aplicación
app.use(routes);            // Rutas generales
app.use('/admin', adminRoutes); // Rutas de administración
app.use('/users', authRoutes); // Rutas de autenticación
app.use('/superadmin', userRoutes);
app.use('/cart', cartRoutes);
// Conexión a MongoDB
// Conectar a MongoDB usando la URI del archivo .env
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.error("Error al conectar a la base de datos:", error));



// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal en el servidor.' });
});

// Configuración de puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

console.log("MONGODB_URI:", process.env.MONGODB_URI);

export default app;


