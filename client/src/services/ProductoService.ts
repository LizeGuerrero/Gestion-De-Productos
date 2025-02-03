import axios from 'axios';

// Define interfaces para type safety
interface Producto {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string[]; // IDs de categorías
  stock?: number;
  fecha_lanzamiento: Date;
  imagen: string;
  marca: string;
  rating?: number;
  reviews?: {
    usuario: string; // ID del usuario
    comentario: string;
    rating: number;
    fecha: Date;
  }[];
}

interface Categoria {
  id: string;
  nombre_categoria: string;
  descripcion?: string;
  imagen?: string;
}

// Crear la URL base de la API
const API_URL = import.meta.env.VITE_API_URL + "/admin/productos";

// Función para obtener todos los productos
export const getProductos = async (): Promise<Producto[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// Función para obtener un producto por ID
export const getProductoById = async (id: string): Promise<Producto> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el producto");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};

// Función para agregar un nuevo producto
export const addProducto = async (producto: Producto): Promise<Producto> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error("Error al agregar el producto");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    throw error;
  }
};

// Función para actualizar un producto existente
export const updateProducto = async (id: string, producto: Producto): Promise<Producto> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

// Función para eliminar un producto
export const deleteProducto = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }

    // Código 204 indica que la eliminación fue exitosa, pero no hay contenido
    if (response.status === 204) {
      return;
    }

    // Si hay contenido, entonces procesar el JSON
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

// Función para obtener categorías
export const getCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = await axios.get<Categoria[]>('/admin/categorias'); // Especifica el tipo de retorno
    return response.data; // response.data ya será de tipo Categoria[]
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw error;
  }
};