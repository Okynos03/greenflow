// Maneja los registros simulados en localStorage

export function getUsers() {
  return JSON.parse(localStorage.getItem("registros") || "[]");
}

export function validateLogin(email, password) {
  const users = getUsers();

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    const existsEmail = users.some((user) => user.email === email);
    if (!existsEmail) return "El correo no está registrado.";
    return "Contraseña incorrecta.";
  }

  return true; // éxito
}
