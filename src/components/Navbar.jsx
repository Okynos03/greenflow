import { useState } from "react";
import "./../styles/landing.css";
import logo from "../assets/logo.png";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

export default function Navbar() {
  // Estado para cada modal
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="GREENFLOW" className="navbar-logo" />
          <span className="navbar-title black-text">GREENFLOW</span>
        </div>

        <div className="navbar-right">
          <button className="navbar-link" onClick={() => setShowRegister(true)}>
            Registrarse
          </button>
          <button className="navbar-btn" onClick={() => setShowLogin(true)}>
            Iniciar sesión
          </button>
        </div>
      </nav>

      {/* Modales */}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
