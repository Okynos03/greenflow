import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TopNav({ companyName = "Empresa" }) {
  const location = useLocation();

  const tabClasses = (path) =>
    `px-3 py-2 rounded-md transition ${
      location.pathname === path
        ? "bg-green-100 text-green-700 font-semibold"
        : "hover:bg-gray-100"
    }`;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              GF
            </div>
            <div className="text-lg font-semibold">GREENFLOW</div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm text-gray-600">

            <Link to="/dashboard" className={tabClasses("/dashboard")}>
              📊 Resumen
            </Link>

            <Link to="/diagnostico" className={tabClasses("/diagnostico")}>
              📝 Diagnóstico
            </Link>

            <Link to="/oportunidades" className={tabClasses("/oportunidades")}>
              💡 Oportunidades
            </Link>

            <Link to="/recursos" className={tabClasses("/recursos")}>
              📘 Recursos
            </Link>

          </nav>

          {/* Perfil */}
          <div className="text-sm text-gray-600">
            {companyName} ·{" "}
            <button className="ml-3 text-blue-600">Salir</button>
          </div>

        </div>
      </div>
    </header>
  );
}
