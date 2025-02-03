import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ mensaje: "No se proporcionó token de autenticación" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = decoded;  // Guarda los datos del usuario decodificados (ej. userId, username, role)

        // Verificación de rol
        if (req.user.role && req.user.role !== 'admin') {
            return res.status(403).json({ mensaje: "Acceso denegado, permisos insuficientes" });
        }

        next();
    } catch (error) {
        res.status(401).json({ mensaje: "Token no válido" });
    }
};