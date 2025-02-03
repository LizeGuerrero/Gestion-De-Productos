import { useState } from "react";
import Swal from "sweetalert2";


// Definir el tipo del estado del formulario
type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  // Estado para manejar los campos del formulario
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica (puedes expandirla si es necesario)
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: 'error',
        title: 'Faltan datos',
        text: 'Por favor, completa todos los campos antes de enviar.',
      });
      return;
    }

    // Simulación de envío exitoso (puedes reemplazarla con una llamada a tu backend)
    Swal.fire({
      icon: 'success',
      title: '¡Formulario enviado!',
      text: 'Gracias por contactarnos, te responderemos pronto.',
    });

    // Limpia los campos del formulario después de enviarlo
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="formulario-container">
      <div className="form">
        <h1>Contáctanos</h1>
        <form onSubmit={handleSubmit}>
          {/* Campo de Nombre */}
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo de Correo Electrónico */}
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo de Mensaje */}
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              rows={4} // Aquí debe ser un número
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Botón de Enviar */}
          <button type="submit" className="btn-submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
