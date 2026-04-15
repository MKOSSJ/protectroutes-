import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    {
      icon: '📊',
      label: 'Estado',
      value: 'Activo',
      color: '#4caf50'
    },
    {
      icon: '🔐',
      label: 'Sesión',
      value: 'Segura',
      color: '#0066cc'
    },
    {
      icon: '⏰',
      label: 'Tiempo de Sesión',
      value: '24 horas',
      color: '#ff9800'
    }
  ];

  const features = [
    {
      icon: '🔒',
      title: 'JWT Token',
      description: 'Token seguro con expiración de 24 horas'
    },
    {
      icon: '🛡️',
      title: 'Rutas Protegidas',
      description: 'Acceso controlado basado en autenticación'
    },
    {
      icon: '👥',
      title: 'Control de Roles',
      description: `Tu rol actual: ${user?.role === 'admin' ? '👨‍💼 Administrador' : '👤 Usuario'}`
    },
    {
      icon: '💾',
      title: 'localStorage',
      description: 'Token persistente en tu navegador'
    }
  ];

  return (
    <div className="page-container">
      <div className="content-card">
        <div className="header">
          <h1>📊 Dashboard</h1>
        </div>

        {/* Tarjeta de bienvenida */}
        <div style={{
          background: `linear-gradient(135deg, ${user?.role === 'admin' ? '#003d99' : '#0084ff'} 0%, ${user?.role === 'admin' ? '#0066cc' : '#0066cc'} 100%)`,
          color: 'white',
          padding: '2rem',
          borderRadius: '14px',
          marginBottom: '2rem',
          boxShadow: '0 8px 24px rgba(0, 102, 204, 0.2)',
          animation: 'fadeIn 0.5s ease-in'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              fontSize: '3rem',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px'
            }}>
              {user?.name?.[0].toUpperCase()}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.8rem' }}>¡Bienvenido, {user?.name}!</h2>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', opacity: 0.9 }}>
                Has iniciado sesión correctamente
              </p>
            </div>
          </div>
        </div>

        {/* Información del usuario */}
        <div className="user-info">
          <h3 style={{ 
            color: '#0066cc', 
            marginBottom: '1.5rem',
            fontSize: '1.3rem',
            fontWeight: '700'
          }}>
            📋 Información de Sesión
          </h3>
          
          <div className="info-grid">
            <div className="info-item">
              <span className="label">📧 Email</span>
              <span className="value">{user?.email}</span>
            </div>
            
            <div className="info-item">
              <span className="label">👤 Nombre</span>
              <span className="value">{user?.name}</span>
            </div>
            
            <div className="info-item">
              <span className="label">🔑 Rol</span>
              <span className="value role" style={{
                backgroundColor: user?.role === 'admin' ? '#003d99' : '#0084ff'
              }}>
                {user?.role === 'admin' ? '👨‍💼 Administrador' : '👤 Usuario'}
              </span>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ 
            color: '#0066cc', 
            marginBottom: '1.5rem',
            fontSize: '1.3rem',
            fontWeight: '700'
          }}>
            📈 Tu Sesión
          </h3>
          <div className="info-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="info-item" style={{
                borderTopColor: stat.color
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <span className="label">{stat.label}</span>
                <span className="value" style={{ color: stat.color }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Características */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ 
            color: '#0066cc', 
            marginBottom: '1.5rem',
            fontSize: '1.3rem',
            fontWeight: '700'
          }}>
            ✨ Características de Seguridad
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {features.map((feature, idx) => (
              <div key={idx} style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #f0f8ff 0%, #e3f2fd 100%)',
                borderRadius: '12px',
                border: '2px solid #bbdefb',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 102, 204, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '0.8rem',
                  display: 'inline-block',
                  background: '#e3f2fd',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '8px'
                }}>
                  {feature.icon}
                </div>
                <h4 style={{
                  color: '#0066cc',
                  marginBottom: '0.5rem',
                  fontWeight: '700'
                }}>
                  {feature.title}
                </h4>
                <p style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="actions" style={{ marginTop: '3rem' }}>
          {user?.role === 'admin' && (
            <button 
              onClick={() => navigate('/admin')}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              ⚙️ Panel de Administración
            </button>
          )}
          <button 
            onClick={() => window.location.href = 'https://github.com/MKOSSJ/protectroutes-'}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            📚 Repositorio GitHub
          </button>
        </div>
      </div>
    </div>
  );
};
