import axios from 'axios';
import { User, CreateUser } from '../types/superuseradmin'; // Asegúrate de que los tipos estén correctamente importados

// Obtener la URL base desde el archivo .env
const API_URL = import.meta.env.VITE_API_URL + "/superadmin/users";

// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // `response.data` debe ser un array de usuarios
  } catch (error) {
    console.error('Error al obtener usuarios', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData: CreateUser): Promise<User> => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;  // `response.data` debe ser un objeto de tipo User
  } catch (error) {
    console.error('Error al crear usuario', error);
    throw error;
  }
};

// Actualizar un usuario
export const updateUser = async (id: string, userData: CreateUser): Promise<User> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;  // `response.data` debe ser un objeto de tipo User
  } catch (error) {
    console.error('Error al actualizar usuario', error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;  // Suponiendo que la respuesta indique un estado de éxito
  } catch (error) {
    console.error('Error al eliminar usuario', error);
    throw error;
  }
};
// Obtener un usuario por ID
export const getUserById = async (id: string): Promise<User> => {
  try {
      const response = await axios.get<User>(`${API_URL}/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
      throw error;
  }
};