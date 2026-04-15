const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Inicializar la aplicación
const app = express();
const PORT = 5000;
const SECRET_KEY = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Usuarios en memoria (en producción usarías una DB)
const users = [
  {
    id: 1,
    email: 'admin@test.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
    name: 'Administrador'
  },
  {
    id: 2,
    email: 'user@test.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'user',
    name: 'Usuario Regular'
  }
];

// ========== MIDDLEWARE DE AUTENTICACIÓN ==========

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

// Middleware para verificar que el usuario tenga rol admin
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado. Se requiere rol admin' });
  }
  next();
};

// ========== RUTAS DE AUTENTICACIÓN ==========

// POST /api/login - Iniciar sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validar que los campos no estén vacíos
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  // Buscar el usuario
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Verificar la contraseña
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Generar JWT (válido por 24 horas)
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    SECRET_KEY,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login exitoso',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    }
  });
});

// ========== RUTAS PROTEGIDAS ==========

// GET /api/dashboard - Ruta protegida (requiere token)
app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({
    message: 'Bienvenido al dashboard',
    user: req.user,
    data: {
      stats: 'Stats del usuario',
      lastLogin: new Date().toISOString()
    }
  });
});

// GET /api/admin - Ruta protegida solo para admins
app.get('/api/admin', verifyToken, verifyAdmin, (req, res) => {
  res.json({
    message: 'Panel de administración',
    user: req.user,
    data: {
      totalUsers: users.length,
      usersList: users.map(u => ({ id: u.id, email: u.email, role: u.role }))
    }
  });
});

// GET /api/user - Obtener datos del usuario actual
app.get('/api/user', verifyToken, (req, res) => {
  res.json({
    message: 'Datos del usuario',
    user: req.user
  });
});

// ========== RUTAS PÚBLICAS ==========

// GET / - Health check
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log('📝 Usuarios disponibles:');
  console.log('   - admin@test.com / 123456 (rol: admin)');
  console.log('   - user@test.com / 123456 (rol: user)');
});
