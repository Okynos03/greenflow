import { useEffect } from "react";
import "../styles/alert.css";

export default function AlertToast({ type = "success", message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500); // 2.5 segundos de duración
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert-toast ${type}`}>
      <span>{message}</span>
    </div>
  );
}
