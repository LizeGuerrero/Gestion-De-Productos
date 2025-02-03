import User from '../../models/user.model.js'; // Asegúrate de que la ruta sea correcta
import bcrypt from 'bcryptjs';
// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Verificar si el usuario o el email ya existen
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario o el correo ya existen" });
    }

    // Crear el nuevo usuario
    const newUser = new User({
      username,
      email,
      password,
      role
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error.message);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { username, email, password, role, isActive } = req.body;
    
    // Asegúrate de no modificar el campo `password` a menos que se pase uno nuevo
    if (password) {
      req.body.password = await bcrypt.hash(password, 10); // Encriptar nueva contraseña
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    res.json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
  } catch (error) {
    console.error("Error al actualizar usuario:", error.message);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar usuario:", error.message);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };
