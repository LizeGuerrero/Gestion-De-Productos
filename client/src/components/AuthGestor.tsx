import { useState } from "react";
import { login, register } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import { MdMarkEmailRead } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import video from "../LoginAssets/video.mp4";
import logo from "../LoginAssets/logo.png";
import "./styles/AuthGestor.css";

// Tipado de las propiedades del componente
interface AuthGestorProps {
  onClose: () => void; // onClose es una función que no devuelve nada
}

const AuthGestor: React.FC<AuthGestorProps> = ({ onClose }) => {
  const { login: loginContext } = useAuth(); // Accede a la función login del contexto
  const [formType, setFormType] = useState<"login" | "register">("login"); // 'login' o 'register'
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let response;
      if (formType === "login") {
        response = await login({ email, password });
      } else {
        const userData = { username, email, password };
        response = await register(userData);
      }

      alert(response.mensaje);
      if (response.token) {
        // Guarda el token en localStorage
        localStorage.setItem("token", response.token);
        // Actualiza el estado de autenticación global a través del contexto
        loginContext(response.token);
      }

      onClose(); // Cierra el modal tras éxito
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchForm = () => {
    setFormType(formType === "login" ? "register" : "login");
    setEmail("");
    setPassword("");
    setUsername("");
    setError(null);
  };

  return (
    <div className="auth-modal-overlay">
      <div className={`auth-${formType === "login" ? "login" : "register"}-page auth-flex`}>
        <div className="auth-container auth-flex">
          <div className="auth-video-div">
            <video src={video} autoPlay muted loop className="auth-video"></video>

            <div className="auth-text-div">
              <h2 className="auth-title">!Fortaleza donde encuentras lo que necesitas¡ </h2>
              <p className="auth-description">Fortaleza !</p>
            </div>

            <div className="auth-footer-div auth-flex">
              <span className="auth-footer-text">
                {formType === "login" ? "¿No tienes una cuenta?" : "¿Ya estas registrado?"}
              </span>
              <button className="auth-footer-btn" onClick={handleSwitchForm}>
                {formType === "login" ? "Registrarse" : "Login"}
              </button>
            </div>
          </div>

          <div className="auth-form-div auth-flex">
            <div className="auth-header-div">
              <img src={logo} alt="Logo Image" className="auth-logo" />
              <h3 className="auth-header-title">
                {formType === "login" ? "Iniciar sesion" : "Registrarse"}
              </h3>
            </div>

            <form className="auth-form auth-grid" onSubmit={handleSubmit}>
              {error && <span className="auth-message">{error}</span>}
              {formType === "register" && (
                <div className="auth-input-div">
                  <label htmlFor="username" className="auth-input-label">Username</label>
                  <div className="auth-input-group auth-flex">
                    <FaUserShield className="auth-input-icon" />
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="auth-input"
                      required
                    />
                  </div>
                </div>
              )}
              <div className="auth-input-div">
                <label htmlFor="email" className="auth-input-label">Email</label>
                <div className="auth-input-group auth-flex">
                  <MdMarkEmailRead className="auth-input-icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>
              </div>
              <div className="auth-input-div">
                <label htmlFor="password" className="auth-input-label">Contraseña</label>
                <div className="auth-input-group auth-flex">
                  <BsFillShieldLockFill className="auth-input-icon" />
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn auth-flex" disabled={loading}>
                <span className="auth-btn-text">
                  {loading ? "Cargando..." : formType === "login" ? "Login" : "Register"}
                </span>
                <AiOutlineSwapRight className="auth-btn-icon" />
              </button>

              {formType === "login" && (
                <span className="auth-forgot-password">
                  ¿Olvidaste tu contraseña? <a href="" className="auth-forgot-link">Click aquí</a>
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthGestor;