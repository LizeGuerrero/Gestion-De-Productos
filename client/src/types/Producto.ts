// types/Producto.ts
export interface Producto {
    _id?: string; // ID opcional, ya que MongoDB lo genera automáticamente
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: Categoria[] ; // Array de objetos de tipo Categoria
    stock: number;
    fecha_lanzamiento: Date;
    imagen: string;
    marca: string;
    rating?: number; // Opcional, para la calificación del producto
    reviews?: Review[]; // Opcional, para las reseñas del producto
}


export interface NewCategoria {
    nombre_categoria: string;
    descripcion?: string; // Opcional
    imagen?: string; // Opcional
}
export interface Categoria {
    _id: string;
    nombre_categoria: string;
    descripcion?: string; // Opcional
    imagen?: string; // Opcional
}

export interface Review {
    usuario: string; // ID del usuario
    comentario: string;
    rating: number;
    fecha: Date;
}

export interface FormularioProducto {
    _id?: string; // ID opcional para edición
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string[]; // Array de IDs de categorías
    stock?: number;
    fecha_lanzamiento: Date;
    imagen: string;
    marca: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
  }
  
  export interface Cart {
    _id?: string;
    user?: string;
    items: CartItem[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface CartProduct extends Producto {
    quantity: number;
  }
  export interface ProductoCarrito extends Producto {
    cantidad: number;
    _id: string;
  }