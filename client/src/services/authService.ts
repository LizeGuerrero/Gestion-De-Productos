import axios, { AxiosError } from 'axios';
import { RegisterData, AuthResponse, ErrorResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL + "/users";

// Función para registrar un nuevo usuario
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;  // Retornamos la respuesta que contiene el mensaje y el token
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Aquí controlamos los errores sin mostrar detalles en la consola
      const errorResponse = error.response?.data as ErrorResponse;
      const status = errorResponse?.status;
      const message = errorResponse?.mensaje;

      // Si el error es un 400 o cualquier otro código de error que no desees mostrar en consola
      if (status === 400 || status === 500) {
        // Lanzamos un error más general sin mostrar detalles internos
        throw new Error("Ocurrió un error durante la solicitud.");
      }

      // Si el error es desconocido, lanzamos un error genérico
      throw new Error(message || "Ocurrió un error desconocido durante el registro.");
    }

    // Si el error no es de tipo AxiosError, lanzamos un error desconocido
    throw new Error("Ocurrió un error desconocido.");
  }
};

// Función para iniciar sesión (con el mismo patrón de manejo de errores)
export const login = async (loginData: { email: string, password: string }): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;
      const status = errorResponse?.status;
      const message = errorResponse?.mensaje;

      if (status === 400) {
        throw new Error("Credenciales incorrectas.");
      }

      throw new Error(message || "Ocurrió un error desconocido durante el inicio de sesión.");
    }

    throw new Error("Ocurrió un error desconocido.");
  }
};
