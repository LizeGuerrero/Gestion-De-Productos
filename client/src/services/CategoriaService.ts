// Define interface para el tipo Categoria
interface Categoria {
  id?: string;
  nombre_categoria: string;
  descripcion?: string;
  imagen?: string;
}

// Crear la URL base de la API
const API_URL = import.meta.env.VITE_API_URL + "/admin/categorias"; // URL base para la API de categorías

// Función para obtener todas las categorías
export const getCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener las categorías");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};

// Función para agregar una nueva categoría
export const addCategoria = async (categoria: Categoria): Promise<Categoria> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoria),
    });
    if (!response.ok) {
      throw new Error("Error al agregar la categoría");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al agregar categoría:", error);
    throw error;
  }
};

// Función para actualizar una categoría
export const updateCategoria = async (id: string, categoria: Categoria): Promise<Categoria> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoria),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la categoría");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    throw error;
  }
};

// Función para eliminar una categoría
export const deleteCategoria = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la categoría");
    }
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    throw error;
  }
};