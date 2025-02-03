import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    getProductos,
    addProducto,
    updateProducto,
    deleteProducto,
} from "../services/ProductoService";
import { getCategorias } from "../services/CategoriaService";
import "./styles/GestorDeProductos.css";
import { Producto, Categoria, FormularioProducto } from "../types/Producto";


function GestorDeProductos() {
    const [productos, setProductos] = useState<Producto[]>([]); // Estado tipado como array de Producto
    const [categorias, setCategorias] = useState<Categoria[]>([]); // Estado tipado como array de Categoria
    const [form, setForm] = useState<FormularioProducto>({
        nombre: "",
        descripcion: "",
        precio: 0,
        categoria: [],

        fecha_lanzamiento: new Date(),
        imagen: "",
        marca: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null); // Estado para manejar la edición

    useEffect(() => {
        // Cargar los productos y categorías al montar el componente
        loadProductos();
        loadCategorias();
    }, []);

    
    const loadProductos = async () => {
        const data = await getProductos();
        setProductos(data as unknown as Producto[]); // Type assertion
    };
    
    const loadCategorias = async () => {
        const data = await getCategorias(); // Función para obtener los géneros del backend
        setCategorias(data as Categoria[]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        if (name === "fecha_lanzamiento") {
            // Convertir la cadena de fecha (en formato YYYY-MM-DD) a un objeto Date en la hora local
            const fechaLocal = new Date(value);
            const fechaAjustada = new Date(fechaLocal.getTime() + (fechaLocal.getTimezoneOffset() * 60000));
    
            setForm({ ...form, [name]: fechaAjustada });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setForm((prevState) => {
            const updatedCategorias = checked
                ? [...prevState.categoria, value] // Si el checkbox está marcado, agregamos la categoría
                : prevState.categoria.filter((categoriaId) => categoriaId !== value); // Si no está marcado, la eliminamos
            return { ...prevState, categoria: updatedCategorias };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificación de campos obligatorios
        if (form.categoria.length === 0) {
            Swal.fire("Error", "Por favor, selecciona al menos una categoría.", "error");
            return;
        }

        try {
            const productoData = {
                ...form,
            };

            // Actualizar o agregar el producto según corresponda
            if (editingId) {
                await updateProducto(editingId, productoData);
                Swal.fire("Actualizado", "Producto actualizado con éxito", "success");
                setEditingId(null); // Limpiar estado de edición
            } else {
                await addProducto(productoData);
                Swal.fire("Agregado", "Producto agregado con éxito", "success");
            }
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            Swal.fire("Error", "Hubo un error al agregar el producto.", "error");
        }

        // Restablecer el formulario
        setForm({
            nombre: "",
            descripcion: "",
            precio: 0,
            categoria: [],

            fecha_lanzamiento: new Date(),
            imagen: "",
            marca: "",
        });

        loadProductos(); // Recargar la lista de productos
    };

    const handleEdit = (producto: Producto) => {
        if (!producto._id) {
            Swal.fire("Error", "ID de producto no encontrado", "error");
            return;
        }
    
        // Asegúrate de que la fecha se convierte a un objeto Date y se ajusta a la zona horaria local
        const fechaLanzamiento = new Date(producto.fecha_lanzamiento);
        if (isNaN(fechaLanzamiento.getTime())) {
            Swal.fire("Error", "Fecha de lanzamiento no válida", "error");
            return;
        }
    
        setForm({
            ...producto,
            categoria: producto.categoria.map((categoria) => categoria._id),
            fecha_lanzamiento: new Date(fechaLanzamiento.getTime() - (fechaLanzamiento.getTimezoneOffset() * 60000))
        });
        setEditingId(producto._id);
        Swal.fire("Modo de edición", `Editando: ${producto.nombre}`, "info");
    };
    

    const handleCancelEdit = () => {
        // Limpia el formulario y sale del modo edición
        setForm({
            nombre: "",
            descripcion: "",
            precio: 0,
            categoria: [],

            fecha_lanzamiento: new Date(),
            imagen: "",
            marca: "",
        });
        setEditingId(null);
        Swal.fire("Modo edición cancelado", "Has salido del modo edición", "info");
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            await deleteProducto(id);
            Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
            loadProductos();
        }
    };

    return (
        <div className="container">
            <h1>Gestión de Productos</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={form.nombre}
                    onChange={handleChange}
                />
                <input
                    name="descripcion"
                    placeholder="Descripción del producto"
                    value={form.descripcion}
                    onChange={handleChange}
                />
                <label className="precio-label">Precio</label>
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={form.precio}
                    onChange={handleChange}
                />
                {/* <label className="stock-label">Stock</label> */}
                {/* <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={handleChange}
                /> */}
                <input
                    name="imagen"
                    placeholder="URL de la imagen"
                    value={form.imagen}
                    onChange={handleChange}
                />
                <input
                    name="marca"
                    placeholder="Marca"
                    value={form.marca}
                    onChange={handleChange}
                />
                <input
    type="date"
    name="fecha_lanzamiento"
    placeholder="Fecha de Lanzamiento"
    value={
        form.fecha_lanzamiento
            ? new Date(form.fecha_lanzamiento.getTime() - (form.fecha_lanzamiento.getTimezoneOffset() * 60000)).toISOString().split('T')[0]
            : ''
    }
    onChange={handleChange}
/>
                <div>
                    <label className="categoria-label">Selecciona las categorías:</label>
                    <div className="checkbox-group">
                        {categorias.map((categoria) => (
                            <div key={categoria._id} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={categoria._id}
                                    value={categoria._id}
                                    checked={form.categoria.includes(categoria._id)}
                                    onChange={handleCategoriaChange}
                                />
                                <label htmlFor={categoria._id}>
                                    {categoria.nombre_categoria}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit">
                    {editingId ? "Actualizar" : "Agregar"}
                </button>
                {editingId && (
                    <button type="button" onClick={handleCancelEdit}>
                        Cancelar edición
                    </button>
                )}
            </form>

            <section className="seccionProducto">
                {productos.map((producto) => (
                    <article key={producto._id} className="producto-card">
                        <div className="header-card">
                            <h2>{producto.nombre}</h2>
                        </div>
                        <div className="main-card">
                            <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                className="producto-image"
                            />
                            <p><strong>Descripción:</strong> {producto.descripcion}</p>
                            <p><strong>Precio:</strong> ${producto.precio}</p>
                            {/* <p><strong>Stock:</strong> {producto.stock}</p> */}
                            <p><strong>Marca:</strong> {producto.marca}</p>
                            <p><strong>Fecha de Lanzamiento:</strong> {new Date(producto.fecha_lanzamiento).toLocaleDateString()}</p>
                            <p>
                                <strong>Categorías: </strong>
                                {producto.categoria
                                    .map((categoria) => categoria.nombre_categoria)
                                    .join(", ")}
                            </p>
                        </div>
                        <section className="footer-card">
                            <button
                                className="edit-btn"
                                onClick={() => handleEdit(producto)}
                            >
                                Editar
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => {
                                    if (producto._id) {
                                        handleDelete(producto._id);
                                    } else {
                                        Swal.fire("Error", "ID del producto no válido", "error");
                                    }
                                }}
                            >
                                Eliminar
                            </button>
                        </section>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default GestorDeProductos;