import Cart from '../../models/Carrito.js';
import Producto from '../../models/Producto.js';

// Obtener carrito del usuario
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.productId');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito", error: error.message });
  }
};

// Añadir producto al carrito
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Verificar si el producto existe
    const product = await Producto.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    let cart = await Cart.findOne({ user: req.user.userId });

    // Si no existe carrito, crear uno nuevo
    if (!cart) {
      cart = new Cart({
        user: req.user.userId,
        items: []
      });
    }

    // Verificar si el producto ya está en el carrito
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      // Actualizar cantidad si ya existe
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Agregar nuevo item
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar al carrito", error: error.message });
  }
};

// Actualizar cantidad de un producto
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.userId });
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el carrito", error: error.message });
  }
};

// Eliminar producto del carrito
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.userId });
    
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar del carrito", error: error.message });
  }
};

// Vaciar carrito
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Carrito vaciado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al vaciar el carrito", error: error.message });
  }
};