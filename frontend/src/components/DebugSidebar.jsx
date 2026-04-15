import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/debugSidebar.css';

// Función para decodificar JWT sin librerías
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const DebugSidebar = () => {
  const { user, token, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const [events, setEvents] = useState([]);
  const [copied, setCopied] = useState(false);

  // Decodificar JWT cuando cambia
  useEffect(() => {
    if (token) {
      setDecodedToken(decodeJWT(token));
    }
  }, [token]);

  // Agregar evento
  const addEvent = (message, type = 'info') => {
    const newEvent = {
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleTimeString()
    };
    setEvents((prev) => [newEvent, ...prev].slice(0, 10)); // Máximo 10 eventos
  };

  // Monitorear cambios de autenticación
  useEffect(() => {
    if (isAuthenticated && user) {
      addEvent(`✅ Usuario logueado: ${user.email}`, 'success');
    } else {
      addEvent('🚪 Sesión cerrada', 'info');
    }
  }, [isAuthenticated]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addEvent('📋 JWT copiado al portapapeles', 'info');
  };

  return (
    <>
      {/* Botón flotante para abrir/cerrar */}
      <button
        className="debug-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Cerrar Debug' : 'Abrir Debug'}
      >
        🐛
      </button>

      {/* Sidebar */}
      <div className={`debug-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="debug-header">
          <h3>🔍 Debug Console</h3>
          <button
            className="debug-close"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="debug-content">
          {/* Sección de Usuario */}
          <section className="debug-section">
            <h4>👤 Usuario Actual</h4>
            {isAuthenticated && user ? (
              <div className="debug-info">
                <div className="info-row">
                  <span className="label">Estado:</span>
                  <span className="value status-active">✅ Logueado</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Nombre:</span>
                  <span className="value">{user.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">ID Usuario:</span>
                  <span className="value">{user.id}</span>
                </div>
              </div>
            ) : (
              <div className="debug-info">
                <div className="info-row">
                  <span className="label">Estado:</span>
                  <span className="value status-inactive">❌ No logueado</span>
                </div>
              </div>
            )}
          </section>

          {/* Sección de Rol */}
          <section className="debug-section">
            <h4>🔐 Control de Rol</h4>
            {isAuthenticated && user ? (
              <div className="debug-info">
                <div className="info-row">
                  <span className="label">Rol Actual:</span>
                  <span
                    className={`role-badge ${user.role}`}
                  >
                    {user.role === 'admin' ? '👨‍💼 Administrador' : '👤 Usuario'}
                  </span>
                </div>
                <div className="role-permissions">
                  <strong>Permisos:</strong>
                  <ul>
                    <li>✅ Dashboard</li>
                    {user.role === 'admin' && <li>✅ Panel Admin</li>}
                    {user.role !== 'admin' && <li>❌ Panel Admin (bloqueado)</li>}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="debug-info">
                <p style={{ color: '#999', fontSize: '0.9rem' }}>
                  Inicia sesión para ver rol
                </p>
              </div>
            )}
          </section>

          {/* Sección JWT */}
          <section className="debug-section">
            <h4>🔑 JWT Token</h4>
            {token ? (
              <div className="debug-info">
                <div className="token-section">
                  <div className="token-label">Encoded:</div>
                  <div className="token-value">
                    <code className="token-code">
                      {token.substring(0, 30)}...
                    </code>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(token)}
                      title="Copiar JWT completo"
                    >
                      {copied ? '✓' : '📋'}
                    </button>
                  </div>
                </div>

                {decodedToken && (
                  <div className="token-decoded">
                    <div className="token-label">Decoded:</div>
                    <pre className="token-data">
                      {JSON.stringify(decodedToken, null, 2)}
                    </pre>
                  </div>
                )}

                <div className="token-info">
                  <strong>Expires:</strong> {decodedToken?.exp ? (
                    <span>
                      {new Date(decodedToken.exp * 1000).toLocaleString()}
                    </span>
                  ) : (
                    <span>Desconocido</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="debug-info">
                <p style={{ color: '#999', fontSize: '0.9rem' }}>
                  No hay token. Inicia sesión primero.
                </p>
              </div>
            )}
          </section>

          {/* Sección de Eventos */}
          <section className="debug-section">
            <h4>📡 Eventos de Autenticación</h4>
            <div className="debug-events">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className={`event event-${event.type}`}>
                    <span className="event-time">{event.time}</span>
                    <span className="event-message">{event.message}</span>
                  </div>
                ))
              ) : (
                <p style={{ color: '#999', fontSize: '0.9rem' }}>
                  Sin eventos aún
                </p>
              )}
            </div>
          </section>

          {/* Sección de Local Storage */}
          <section className="debug-section">
            <h4>💾 LocalStorage</h4>
            <div className="debug-info">
              <div className="storage-item">
                <span className="label">Token guardado:</span>
                {localStorage.getItem('token') ? (
                  <span className="value status-active">✅ Sí</span>
                ) : (
                  <span className="value status-inactive">❌ No</span>
                )}
              </div>
              <div className="storage-item">
                <span className="label">Tamaño:</span>
                <span className="value">
                  {localStorage.getItem('token')
                    ? Math.round(localStorage.getItem('token').length / 1024)
                    : 0}
                  KB
                </span>
              </div>
            </div>
          </section>

          {/* Atajos */}
          <section className="debug-section">
            <h4>⚡ Atajos Útiles</h4>
            <div className="debug-shortcuts">
              <button
                className="shortcut-btn"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                🗑️ Borrar localStorage
              </button>
              <button
                className="shortcut-btn"
                onClick={() => {
                  console.log('User:', user);
                  console.log('Token:', token);
                  console.log('Decoded:', decodedToken);
                  addEvent('📋 Datos logueados en consola', 'info');
                }}
              >
                🖥️ Log en consola
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
