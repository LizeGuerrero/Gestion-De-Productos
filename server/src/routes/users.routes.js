import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/users/usersController.js'; // Ajusta la ruta según tu estructura

const router = express.Router();

router.post('/users', createUser); // Crear usuario
router.get('/users', getUsers); // Obtener todos los usuarios
router.get('/users/:id', getUserById); // Obtener un usuario por ID
router.put('/users/:id', updateUser); // Actualizar un usuario
router.delete('/users/:id', deleteUser); // Eliminar un usuario

export default router;
