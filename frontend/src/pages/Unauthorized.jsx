import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="content-card" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div style={{
          fontSize: '5rem',
          marginBottom: '1.5rem',
          animation: 'bounce 1s infinite'
        }}>
          🚫
        </div>
        
        <h1 style={{
          fontSize: '2.5rem',
          color: '#cc0000',
          marginBottom: '0.5rem'
        }}>
          Acceso Denegado
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          marginBottom: '1.5rem',
          lineHeight: '1.6'
        }}>
          No tienes los permisos necesarios para acceder a esta sección.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
          border: '2px solid #ff5252',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          color: '#c62828'
        }}>
          <strong>ℹ️ Información:</strong><br/>
          <span style={{ fontSize: '0.95rem' }}>
            Solo los administradores tienen acceso a esta área. Si crees que debería tener acceso, contacta con tu administrador.
          </span>
        </div>

        {/* Información de rol */}
        <div style={{
          background: '#f0f8ff',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '2px solid #bbdefb',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#0066cc', marginBottom: '1rem' }}>📋 Roles Disponibles</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <div style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #bbdefb'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👨‍💼</div>
              <strong style={{ color: '#003d99' }}>Administrador</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
                Acceso total al sistema
              </p>
            </div>
            <div style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #bbdefb'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👤</div>
              <strong style={{ color: '#0084ff' }}>Usuario</strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
                Acceso limitado al dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary"
            style={{ minWidth: '150px' }}
          >
            📊 Ir al Dashboard
          </button>
          
          <button 
            onClick={() => navigate('/login')}
            className="btn btn-secondary"
            style={{ minWidth: '150px' }}
          >
            🔓 Volver al Login
          </button>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    </div>
  );
};
