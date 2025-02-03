import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'], // Por ahora solo 2, pero podríamos agregar otros roles, pero la posibilidad será mínima en el futuro.
        default: 'user' // Asignar 'user' por defecto
    },
    isActive: {
        type: Boolean,
        default: true // Por defecto, las cuentas estarán activas
    }
}, { timestamps: true });

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10); //bcrypt genera una "sal" (salt) aleatoria con un factor de trabajo de 10, lo cual ayuda a asegurar que las contraseñas sean únicas y seguras.
        this.password = await bcrypt.hash(this.password, salt); //Después de generar el salt, la contraseña del usuario se encripta usando bcrypt.hash, que combina la contraseña y el salt para obtener una cadena encriptada.
    }
    next(); //Esto asegura que el proceso continúe y que el documento se guarde en la base de datos después de que la contraseña haya sido encriptada.
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("users", userSchema);

export default User;
