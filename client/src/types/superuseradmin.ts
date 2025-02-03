export interface User {
    _id: string;          // ID único del usuario generado por MongoDB
    username: string;     // El nombre de usuario
    email: string;        // El correo electrónico
    password: string;     // La contraseña encriptada (nunca se debe enviar al cliente)
    role: 'user' | 'admin' | 'superadmin';  // El rol del usuario
    isActive: boolean;    // Si la cuenta está activa o no
    createdAt: string;    // Fecha de creación
    updatedAt: string;    // Fecha de la última actualización
  }

  export interface CreateUser {
    id?: string;
    username: string;  // El nombre de usuario, obligatorio, mínimo 3 caracteres
    email: string;     // El correo electrónico, obligatorio
    password: string;  // La contraseña, obligatoria, mínimo 6 caracteres
    role?: 'user' | 'admin'| 'superadmin';  // El rol del usuario, opcional (por defecto es 'user')
    isActive?: boolean; // Si el usuario está activo o no, opcional (por defecto es true)
  }