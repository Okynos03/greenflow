import React from "react";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <img src={logo} alt="GREENFLOW" className="logo" />
          <span className="brand-text"></span>
        </div>
        <nav className="nav">
          <a className="link" href="#register">Registrarse</a>
          <button className="btn btn-ghost">Iniciar sesión</button>
        </nav>
      </div>
    </header>
  );
}
