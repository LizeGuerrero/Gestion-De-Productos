import { Producto } from './Producto';
import { User} from './user';
export interface ProductoCarrito {
    producto: Producto;
    cantidad: number;
}

export interface Carrito {
    usuario: User; // ID del usuario
    productos: ProductoCarrito[];
}
