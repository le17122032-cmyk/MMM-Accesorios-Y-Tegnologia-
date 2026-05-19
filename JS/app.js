// Datos iniciales
function inicializarDatos() {
  if (!localStorage.getItem('usuarios')) {
    const usuarios = [
      {
        id: 1,
        nombre: "Juan Pérez",
        email: "juan@email.com",
        password: "123456", // En producción usa hash (no hagas esto en real)
        tipo: "cliente"
      },
      {
        id: 2,
        nombre: "Admin",
        email: "admin@techaccess.com",
        password: "admin123",
        tipo: "admin"
      }
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  // Productos iniciales
  if (!localStorage.getItem('productos')) {
    const productos = [
      { id: 1, nombre: "AirPods Pro", precio: 4999, categoria: "Audio", img: "https://via.placeholder.com/300" },
      { id: 2, nombre: "Cargador 65W", precio: 899, categoria: "Carga", img: "https://via.placeholder.com/300" },
      { id: 3, nombre: "Mouse Logitech MX", precio: 1899, categoria: "Periféricos", img: "https://via.placeholder.com/300" },
    ];
    localStorage.setItem('productos', JSON.stringify(productos));
  }
}

// Registro de cliente
function registrarCliente(nombre, email, password) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  if (usuarios.some(u => u.email === email)) {
    alert("Este correo ya está registrado");
    return false;
  }

  usuarios.push({
    id: Date.now(),
    nombre,
    email,
    password, // ⚠️ Solo para demo local
    tipo: "cliente"
  });

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert("¡Registro exitoso!");
  return true;
}

// Login
function login(email, password, esAdmin = false) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (!usuario) {
    alert("Correo o contraseña incorrectos");
    return false;
  }

  if (esAdmin && usuario.tipo !== "admin") {
    alert("No tienes permisos de administrador");
    return false;
  }

  localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  return true;
}