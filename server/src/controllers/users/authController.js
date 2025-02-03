import User from "../../models/user.model.js";
import jwt from 'jsonwebtoken';

// Registro de usuario
export const register = async (req, res) => {
    try {
        console.log({
            action: "User registration attempt",
            email: req.body.email,
            username: req.body.username,
        });

        const { username, email, password, role } = req.body;

        // Verificar si el correo electrónico ya está registrado
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ mensaje: "El correo electrónico ya está registrado" });
        }

        // Verificar si el nombre de usuario ya está registrado
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ mensaje: "El nombre de usuario ya está ocupado" });
        }

        // Asegurarse de que el rol sea válido
        const userRole = "user"; // No aceptar rol del cliente

        // Crear nuevo usuario
        const newUser = new User({ username, email, password, role: userRole });
        await newUser.save();

        // Crear token JWT para el usuario recién registrado
        const payload = {
            userId: newUser._id,
            username: newUser.username,
            role: newUser.role // Incluir el rol en el token
        };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({
            mensaje: "Usuario registrado exitosamente",
            token
        });
    } catch (error) {
        console.error("Error en el registro de usuario:", error.message);
        res.status(500).json({ mensaje: "Error al registrar el usuario", error: error.message });
    }
};


// Inicio de sesión
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }

        // Verificar si la cuenta está activa (Aún no implementado, pauso esto)
        if (!user.isActive) {
            return res.status(400).json({ mensaje: "Cuenta desactivada, por favor contacta al administrador" });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        // Crear el token JWT
        const payload = {
            userId: user._id,
            username: user.username,
            role: user.role
        };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token,
            user: { username: user.username, role: user.role } // Devolver detalles básicos del usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el inicio de sesión", error: error.message });
    }
};

// Cerrar sesión
export const logout = (req, res) => {
    // El logout en JWT se maneja del lado del cliente (eliminando el token)
    res.status(200).json({ mensaje: "Cierre de sesión exitoso" });
};
