# 🔐 Protect - Full Stack Auth Demo

Proyecto fullstack simple con **React + Express** que demuestra **protección de rutas y control de roles** con JWT.

## 📋 Descripción del Proyecto

Esta aplicación implementa un sistema completo de autenticación y autorización con:

- ✅ Login con JWT
- ✅ Protección de rutas
- ✅ Control de roles (admin vs user)
- ✅ Context API para gestión de estado
- ✅ Interfaz minimalista en gama azul
- ✅ Gestión de sesiones con localStorage

---

## 📁 Estructura del Proyecto

```
protect/
├── backend/                  # Servidor Express
│   ├── package.json
│   ├── server.js            # Archivo principal
│   └── .gitignore
│
├── frontend/                # Aplicación React + Vite
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .gitignore
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── context/
│       │   └── AuthContext.jsx         # Context para autenticación
│       ├── components/
│       │   ├── ProtectedRoute.jsx      # Componente para proteger rutas
│       │   ├── Navbar.jsx              # Barra de navegación
│       │   └── DebugSidebar.jsx        # Console de debug (Nuevo!)
│       ├── pages/
│       │   ├── Login.jsx               # Página de login
│       │   ├── Dashboard.jsx           # Dashboard protegido
│       │   ├── Admin.jsx               # Panel admin (solo admins)
│       │   └── Unauthorized.jsx        # Página de acceso denegado
│       └── styles/
│           ├── pages.css               # Estilos de páginas
│           ├── navbar.css              # Estilos navbar
│           └── debugSidebar.css        # Estilos debug (Nuevo!)
│
└── README.md
```

---

## 🚀 Configuración e Instalación

### Backend (Express)

1. **Navega a la carpeta del backend:**
   ```bash
   cd backend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Los paquetes instalados serán:**
   - `express` - Framework web
   - `jsonwebtoken` - Generación y verificación de JWT
   - `bcryptjs` - Hash de contraseñas
   - `cors` - Control de acceso entre dominios

4. **Inicia el servidor:**
   ```bash
   npm start
   ```
   o
   ```bash
   node server.js
   ```

   El servidor correrá en `http://localhost:5000`

---

### Frontend (React + Vite)

1. **En otra terminal, navega a la carpeta del frontend:**
   ```bash
   cd frontend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Los paquetes instalados serán:**
   - `react` - Librería UI
   - `react-dom` - Renderización DOM
   - `react-router-dom` - Routing

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

---

## 👤 Usuarios de Prueba

Usa estas credenciales para probar la aplicación:

### Administrador
- **Email:** `admin@test.com`
- **Contraseña:** `123456`
- **Rol:** admin
- **Acceso:** Login, Dashboard, Panel Admin

### Usuario Regular
- **Email:** `user@test.com`
- **Contraseña:** `123456`
- **Rol:** user
- **Acceso:** Login, Dashboard (sin acceso a Admin)

---

## 🔐 Flujo de Autenticación

### 1. **Login**
   - El usuario ingresa credenciales en `/login`
   - Se envían al backend via `POST /api/login`
   - El backend valida y devuelve JWT + datos del usuario
   - El token se almacena en `localStorage`

### 2. **Protección de Rutas**
   - `ProtectedRoute` verifica si el usuario está autenticado
   - Si NO está logueado → Redirecciona a `/login`
   - Si está logueado pero sin rol requerido → Redirecciona a `/unauthorized`
   - Si tiene permisos → Renderiza la página

### 3. **Verificación de Token**
   - Cada request protegido envía el JWT en el header: `Authorization: Bearer <token>`
   - El backend verifica el token antes de devolver datos
   - Si el token es inválido → Error 403

### 4. **Logout**
   - El botón logout elimina el token de `localStorage`
   - Limpia el estado de `AuthContext`
   - Redirecciona a `/login`

---

## 📍 Rutas de la Aplicación

### Públicas
| Ruta | Descripción |
|------|-------------|
| `/login` | Página de inicio de sesión |

### Protegidas
| Ruta | Descripción | Requiere |
|------|-------------|----------|
| `/dashboard` | Dashboard principal | Login |
| `/admin` | Panel de administración | Login + Rol: admin |
| `/unauthorized` | Página de acceso denegado | N/A |

---

## 🔌 Endpoints del Backend

### Autenticación
```
POST /api/login
Body: { email: string, password: string }
Response: { token: string, user: { id, email, role, name } }
```

### Dashboard (Protegido)
```
GET /api/dashboard
Headers: { Authorization: "Bearer <token>" }
Response: { user: { ...userData }, data: { stats, lastLogin } }
```

### Admin (Protegido + Rol Admin)
```
GET /api/admin
Headers: { Authorization: "Bearer <token>" }
Response: { user: { ...userData }, data: { totalUsers, usersList } }
```

### Usuario Actual (Protegido)
```
GET /api/user
Headers: { Authorization: "Bearer <token>" }
Response: { user: { id, email, role, name } }
```

---

## 🛡️ Middlewares del Backend

### `verifyToken`
Valida que el token JWT sea válido y no esté expirado.
- Si no hay token → Error 401
- Si token es inválido → Error 403
- Si es válido → Continúa y agrega `req.user`

### `verifyAdmin`
Verifica que el usuario tenga rol admin.
- Si rol ≠ admin → Error 403
- Si es admin → Continúa

---

## 🎨 Diseño UI

### Paleta de Colores
- **Primario:** Azul (#0066cc)
- **Secundario:** Azul claro (#bbdefb)
- **Fondo:** Gradiente azul (#e3f2fd → #bbdefb)
- **Texto:** Gris oscuro (#333)
- **Error:** Rojo (#ff4444)

### Componentes UI
- **Botones:** Con gradientes y sombras
- **Inputs:** Con bordes azules y estado focus
- **Tarjetas:** Con sombras sutiles
- **Responsive:** Funciona en móviles

---

## 🐛 Debug Sidebar (Consola de Depuración)

### ¿Qué es?

Una **barra lateral flotante** que muestra en tiempo real toda la información sobre autenticación, autorización y estado de seguridad.

**Ubicación:** Botón🐛 flotante en la esquina inferior derecha

### Funcionalidades

#### 1. **👤 Usuario Actual**
   - Estado de autenticación (Logueado / No logueado)
   - Email del usuario
   - Nombre del usuario
   - ID del usuario

#### 2. **🔐 Control de Rol**
   - Rol actual (Admin / Usuario)
   - Permisos disponibles
   - Acceso a rutas protegidas

#### 3. **🔑 JWT Token**
   - Token encoded (primeros 30 caracteres)
   - Token completo decodificado en JSON
   - Fecha de expiración
   - Botón para copiar token completo

#### 4. **📡 Eventos de Autenticación**
   - Login exitoso
   - Logout
   - Cambios de estado
   - Últimos 10 eventos

#### 5. **💾 LocalStorage**
   - Verifica si token está guardado
   - Muestra tamaño del token en KB
   - Información del almacenamiento

#### 6. **⚡ Atajos Útiles**
   - Botón para borrar localStorage y recargar
   - Botón para loguear datos en consola

### Cómo Usarla

**Abrir/Cerrar:**
- Haz click en el botón 🐛 de la esquina inferior derecha
- Se desliza suavemente desde la derecha

**Ver JWT Decodificado:**
- Abre la Debug Sidebar
- Baja hasta "🔑 JWT Token"
- Verás el token decodificado en formato JSON

**Copiar Token:**
- En la sección JWT, haz click en 📋
- El token completo se copia al portapapeles
- Verás un ✓ de confirmación

**Ver Eventos:**
- Los eventos se registran automáticamente
- Cada login, logout, cambio de estado aparece aquí
- Máximo 10 eventos visibles

**Limpiar Todo:**
- En "⚡ Atajos Útiles"
- Botón "🗑️ Borrar localStorage"
- Recarga automática

---

## 📝 Características Principales

### AuthContext
Gestiona todo lo relacionado con autenticación:
- `user` - Datos del usuario logueado
- `token` - JWT almacenado
- `loading` - Estado de carga
- `login()` - Función para iniciar sesión
- `logout()` - Función para cerrar sesión
- `isAuthenticated` - Booleano de autenticación
- `hasRole()` - Verifica rol del usuario

### ProtectedRoute
Componente para proteger rutas:
```jsx
<ProtectedRoute requiredRole="admin">
  <Admin />
</ProtectedRoute>
```

### Navbar
Barra de navegación moderna con:
- Logo animado
- Menú responsivo
- Badge de usuario
- Botón Logout
- Indicador de rol

### DebugSidebar (Nuevo!)
Consola flotante de depuración que muestra:
- Estado de autenticación en tiempo real
- Usuario logueado y su información
- JWT decodificado y encoded
- Control de roles disponibles
- Eventos de autenticación
- Estado del localStorage
- Atajos útiles

---

## 🐛 Troubleshooting

### Backend no conecta
- Verifica que el puerto 5000 esté disponible
- Revisa que los paquetes estén instalados: `npm install`
- Intenta reiniciar el servidor

### Frontend no ve el backend
- Asegúrate que el backend esté corriendo en `http://localhost:5000`
- Revisa la consola del navegador (F12) para errores CORS
- El proxy está configurado en `vite.config.js`

### Token expirado
- El token expira en 24 horas
- Vuelve a hacer login para obtener uno nuevo
- Los tokens se validan en cada petición al backend

### CSS no se ve correctamente
- Limpia el caché del navegador (Ctrl+Shift+Delete)
- Recarga la página (F5)

---

## 📚 Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcryptjs
- CORS

### Frontend
- React 18
- React Router DOM 6
- Vite
- CSS3 (Vanilla)
- Context API

---

## 💡 Conceptos Educativos

Este proyecto enseña:

1. **Autenticación JWT:** Cómo generar y validar tokens
2. **Control de Acceso:** Middlewares para proteger endpoints
3. **Context API:** Gestión global de estado
4. **Protected Routes:** Componentes para rutas privadas
5. **localStorage:** Persistencia de tokens
6. **CORS:** Comunicación entre dominios
7. **Hash de Contraseñas:** Seguridad con bcryptjs
8. **API RESTful:** Endpoints estándar

---

## ⚠️ Notas Importantes

- **Usuarios en memoria:** Los datos se pierden al reiniciar el servidor
- **Secret key:** En producción, usar variables de entorno
- **Sin base de datos:** Solo para propósitos educativos
- **HTTPS:** En producción usar HTTPS (no HTTP)
- **HttpOnly Cookies:** Considerar para máxima seguridad en producción

---

## ✅ Checklist de Prueba

Prueba estas funcionalidades:

- [ ] Acceder a `/login`
- [ ] Hacer login con admin@test.com / 123456
- [ ] Ver el dashboard con datos del admin
- [ ] Acceder al panel admin desde el dashboard
- [ ] Ver lista de usuarios en el panel admin
- [ ] Hacer logout y volver a login
- [ ] Intentar acceder a `/admin` como usuario regular
- [ ] Ver página de acceso denegado
- [ ] Revisar que el token se guarde en localStorage
- [ ] **[NUEVO]** Abrir Debug Sidebar (botón 🐛 inferior derecho)
- [ ] **[NUEVO]** Ver usuario actual en Debug Sidebar
- [ ] **[NUEVO]** Ver JWT decodificado en JSON
- [ ] **[NUEVO]** Copiar JWT y verificar en portapapeles
- [ ] **[NUEVO]** Ver eventos de autenticación en tiempo real
- [ ] **[NUEVO]** Verificar control de roles en Debug Sidebar
- [ ] **[NUEVO]** Hacer logout y ver eventos actualizados
- [ ] **[NUEVO]** Verificar estado del localStorage en Debug

---

## 📞 Soporte

Si tienes dudas o encuentras problemas:
1. Revisa la consola del navegador (F12)
2. Revisa la terminal del servidor
3. Verifica que puertos 3000 y 5000 estén disponibles
4. Intenta borrar `node_modules` e instalar de nuevo

---

**¡Listo para aprender sobre autenticación y seguridad! 🚀**
