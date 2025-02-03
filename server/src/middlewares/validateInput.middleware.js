export const validateRegisterInput = (req, res, next) => {
    const { username, email, password } = req.body;

    // Validación de campos requeridos
    if (!username || !email || !password) {
        return res.status(400).json({ mensaje: "Faltan campos requeridos" });
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ mensaje: "Formato de correo electrónico inválido" });
    }

    // Validación de la longitud mínima de la contraseña
    if (password.length < 6) {
        return res.status(400).json({ mensaje: "La contraseña debe tener al menos 6 caracteres" });
    }

    // Validación de fortaleza de la contraseña (una letra mayúscula, un número y un carácter especial)
    const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordStrengthRegex.test(password)) {
        return res.status(400).json({
            mensaje: "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial"
        });
    }

    next();
};
//Se me está llendo de las manos la validación xd