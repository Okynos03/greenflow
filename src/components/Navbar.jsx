import { useState, useEffect } from "react";
import "./../styles/landing.css";
import logo from "../assets/logo.png";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import PlansModal from "./PlansModal";

export default function Navbar() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [showPlans, setShowPlans] = useState(false);

  useEffect(() => {
    const flag = !!localStorage.getItem("greenflow_logged_in");
    setLogged(flag);
    const u = localStorage.getItem("greenflow_user");
    if (u) {
      try {
        const parsed = JSON.parse(u);
        setUserName(parsed.name || parsed.email || "");
      } catch (e) {}
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("greenflow_logged_in");
    localStorage.removeItem("greenflow_user");
    window.location.reload();
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="GREENFLOW" className="navbar-logo" />
          <div className="navbar-title">GREENFLOW</div>
        </div>

        <div className="navbar-right">
          {!logged ? (
            <>
            {/* --- BOTÓN NUEVO --- */}
              <button className="navbar-btn-secondary" onClick={() => setShowPlans(true)}>
                Ver Planes
              </button>
              {/* ------------------- */}
              <button className="navbar-link" onClick={() => setShowRegister(true)}>
                Registrarse
              </button>
              <button className="navbar-btn" onClick={() => setShowLogin(true)}>
                Iniciar sesión
              </button>
            </>
          ) : (
            <>
            {/* --- BOTÓN NUEVO --- */}
              <button className="navbar-btn-secondary" onClick={() => setShowPlans(true)}>
                Ver Planes
              </button>
              {/* ------------------- */}
              <div className="navbar-user"> {userName || "Empresa Demo"} </div>
              <button className="navbar-btn" onClick={handleLogout}>
                Salir
              </button>
            </>
          )}
        </div>
      </nav>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showPlans && <PlansModal onClose={() => setShowPlans(false)} />}
    </>
  );
}
