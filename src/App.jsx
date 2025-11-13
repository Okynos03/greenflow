// src/App.jsx
import React from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import "./styles/landing.css";

// Chequeo simple de sesión (localStorage)
function isLoggedIn() {
  return !!localStorage.getItem("greenflow_logged_in");
}

export default function App() {
  return isLoggedIn() ? <Dashboard /> : <LandingPage />;
}
