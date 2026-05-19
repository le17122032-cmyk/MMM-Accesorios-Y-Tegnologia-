// ======================== APP.JS COMPLETO ========================

function inicializarDatos() {
    // ==================== USUARIOS ====================
    if (!localStorage.getItem('usuarios')) {
        const usuarios = [
            { 
                id: 1, 
                nombre: "Juan Pérez", 
                email: "juan@email.com", 
                password: "123456", 
                tipo: "cliente" 
            },
            { 
                id: 2, 
                nombre: "Administrador", 
                email: "admin@techaccess.com", 
                password: "admin123", 
                tipo: "admin" 
            }
        ];
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // ==================== PRODUCTOS ====================
    if (!localStorage.getItem('productos')) {
        localStorage.setItem('productos', JSON.stringify([]));
    }
}

// ==================== REGISTRO DE CLIENTE ====================
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
        password,
        tipo: "cliente"
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert("¡Registro exitoso!");
    return true;
}

// ==================== LOGIN ====================
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

// ==================== PRODUCTOS ====================
function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
}

// ==================== CERRAR SESIÓN ====================
function logout() {
    if (confirm("¿Cerrar sesión?")) {
        localStorage.removeItem('usuarioActual');
        window.location.href = 'index.html';
    }
}

// ==================== INICIALIZAR ====================
document.addEventListener('DOMContentLoaded', inicializarDatos);