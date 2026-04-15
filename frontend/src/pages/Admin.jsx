import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages.css';

export const Admin = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('/api/admin', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar los datos de admin');
        }

        const data = await response.json();
        setAdminData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [token]);

  return (
    <div className="page-container">
      <div className="content-card">
        <div className="header">
          <h1>⚙️ Panel de Administración</h1>
        </div>

        {/* Tarjeta de bienvenida admin */}
        <div style={{
          background: 'linear-gradient(135deg, #003d99 0%, #0066cc 100%)',
          color: 'white',
          padding: '2rem',
          borderRadius: '14px',
          marginBottom: '2rem',
          boxShadow: '0 8px 24px rgba(0, 102, 204, 0.2)',
          animation: 'fadeIn 0.5s ease-in'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              fontSize: '2.5rem',
              display: 'flex'
            }}>
              ⚙️
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Panel Administrativo</h2>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', opacity: 0.9 }}>
                Administrador: {user?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Estado de carga o error */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#0066cc'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p>Cargando datos del sistema...</p>
          </div>
        )}
        
        {error && <div className="error-message">❌ {error}</div>}

        {adminData && (
          <>
            {/* Estadísticas principales */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ 
                color: '#0066cc', 
                marginBottom: '1.5rem',
                fontSize: '1.3rem',
                fontWeight: '700'
              }}>
                📈 Estadísticas del Sistema
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
                  <span className="label">Total de Usuarios</span>
                  <span className="value" style={{ fontSize: '2.5rem', color: '#0066cc' }}>
                    {adminData.data.totalUsers}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem', display: 'block' }}>
                    Usuarios registrados
                  </span>
                </div>

                <div className="info-item">
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👨‍💼</div>
                  <span className="label">Administradores</span>
                  <span className="value" style={{ fontSize: '2.5rem', color: '#003d99' }}>
                    {adminData.data.usersList.filter(u => u.role === 'admin').length}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem', display: 'block' }}>
                    Con permisos totales
                  </span>
                </div>

                <div className="info-item">
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👤</div>
                  <span className="label">Usuarios Regulares</span>
                  <span className="value" style={{ fontSize: '2.5rem', color: '#0084ff' }}>
                    {adminData.data.usersList.filter(u => u.role === 'user').length}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem', display: 'block' }}>
                    Acceso limitado
                  </span>
                </div>
              </div>
            </div>

            {/* Tabla de usuarios */}
            <div className="users-table" style={{ marginTop: '3rem' }}>
              <h3>👥 Lista de Usuarios Registrados</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.data.usersList.map(u => (
                    <tr key={u.id}>
                      <td>
                        <span style={{
                          background: '#e3f2fd',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontWeight: '600',
                          color: '#0066cc'
                        }}>
                          #{u.id}
                        </span>
                      </td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>📧</span>
                          {u.email}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          backgroundColor: u.role === 'admin' ? '#003d99' : '#0084ff',
                          color: 'white',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          display: 'inline-block'
                        }}>
                          {u.role === 'admin' ? '👨‍💼 Admin' : '👤 User'}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          backgroundColor: '#e8f5e9',
                          color: '#2e7d32',
                          fontSize: '0.9rem',
                          fontWeight: '600'
                        }}>
                          ✅ Activo
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Información adicional */}
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #f0f8ff 100%)',
              borderRadius: '12px',
              border: '2px solid #bbdefb'
            }}>
              <h3 style={{ color: '#0066cc', marginBottom: '1rem' }}>🔐 Información de Seguridad</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                <div>
                  <strong style={{ color: '#0066cc' }}>🛡️ Autenticación</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                    JWT (JSON Web Token) con expiración
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#0066cc' }}>🔒 Contraseñas</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                    Encriptadas con bcryptjs
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#0066cc' }}>⏰ Sesión</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                    Válida por 24 horas
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#0066cc' }}>👥 Control de Roles</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                    Basado en permisos del usuario
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Botones de acción */}
        <div className="actions" style={{ marginTop: '3rem' }}>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-secondary"
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
