// Obtener usuarios
export function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

// Guardar usuario nuevo
export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

// Validar login
export function validateLogin(email, password) {
  const users = getUsers();

  const foundUser = users.find(
    (u) => u.email === email.trim() && u.password === password
  );

  if (!foundUser) {
    const existsEmail = users.some((u) => u.email === email.trim());
    if (!existsEmail) return "El correo no está registrado.";
    return "Contraseña incorrecta.";
  }

  return true;
}
