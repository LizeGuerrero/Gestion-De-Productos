import React, { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from '../services/userService';
import { User, CreateUser } from '../types/superuseradmin'; // Importando los tipos
import Swal from 'sweetalert2';
import './styles/Dashboard.css';
const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Almacenar los usuarios
  const [newUser, setNewUser] = useState<CreateUser>({
    username: '',
    email: '',
    password: '',
    role: 'user', // Valor por defecto
    isActive: true,
  }); // Estado para el formulario de crear usuario

  const [editingUserId, setEditingUserId] = useState<string | null>(null); // Para determinar si estamos editando un usuario

  useEffect(() => {
    fetchUsers(); // Cargar usuarios cuando el componente se monte
  }, []);

  // Función para obtener los usuarios
  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error('Error al cargar usuarios', error);
      Swal.fire('Error', 'Hubo un error al cargar los usuarios.', 'error');
    }
  };

  // Función para manejar el cambio de los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para crear un nuevo usuario
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        // Si estamos editando, actualizamos el usuario
        await updateUser(editingUserId, newUser);
        Swal.fire('Éxito', 'Usuario actualizado correctamente.', 'success');
      } else {
        // Si no estamos editando, creamos un nuevo usuario
        await createUser(newUser);
        Swal.fire('Éxito', 'Usuario creado correctamente.', 'success');
      }
      fetchUsers(); // Volver a cargar los usuarios después de la acción
      setNewUser({ username: '', email: '', password: '', role: 'user', isActive: true }); // Limpiar el formulario
      setEditingUserId(null); // Restablecer el estado de edición
    } catch (error) {
      console.error('Error al crear o actualizar usuario', error);
      Swal.fire('Error', 'Hubo un error al crear o actualizar el usuario.', 'error');
    }
  };

  // Función para eliminar un usuario
  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      Swal.fire('Eliminado', 'Usuario eliminado correctamente.', 'success');
      fetchUsers(); // Volver a cargar la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar usuario', error);
      Swal.fire('Error', 'Hubo un error al eliminar el usuario.', 'error');
    }
  };

  // Función para editar un usuario
  const handleEditUser = (id: string) => {
    const userToEdit = users.find((user) => user._id === id);
    if (userToEdit) {
      setNewUser({
        username: userToEdit.username,
        email: userToEdit.email,
        password: '', // La contraseña no la actualizamos por defecto
        role: userToEdit.role,
        isActive: userToEdit.isActive,
      });
      setEditingUserId(id); // Establecer el ID del usuario que estamos editando
    }
  };

  return (
    <div>
      <h1>Dashboard de Usuarios</h1>

      {/* Formulario para crear o editar un usuario */}
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <select name="role" value={newUser.role} onChange={handleChange}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
          <option value="superadmin">Superadministrador</option>
        </select>
        <button type="submit">{editingUserId ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
      </form>

      {/* Lista de usuarios */}
      <table>
        <thead>
          <tr>
            <th>Nombre de usuario</th>
            <th>Correo electrónico</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => handleEditUser(user._id)}>Editar</button>
                <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
