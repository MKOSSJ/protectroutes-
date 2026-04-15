import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const autoFill = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div className="page-container">
      <div className="login-card">
        <h1>🔐 Iniciar Sesión</h1>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">❌ {error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '⏳ Cargando...' : '🚀 Acceder'}
          </button>
        </form>

        <div className="info-box">
          <h3>📋 Credenciales de Prueba</h3>
          
          <div className="credential">
            <strong>👨‍💼 Administrador</strong>
            admin@test.com
            <br />
            <span style={{ fontSize: '0.85rem', color: '#666' }}>Contraseña: 123456</span>
            <button
              type="button"
              onClick={() => autoFill('admin@test.com', '123456')}
              style={{
                display: 'block',
                marginTop: '0.5rem',
                background: '#0066cc',
                color: 'white',
                border: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Autocompletar
            </button>
          </div>

          <div className="credential">
            <strong>👤 Usuario Regular</strong>
            user@test.com
            <br />
            <span style={{ fontSize: '0.85rem', color: '#666' }}>Contraseña: 123456</span>
            <button
              type="button"
              onClick={() => autoFill('user@test.com', '123456')}
              style={{
                display: 'block',
                marginTop: '0.5rem',
                background: '#0084ff',
                color: 'white',
                border: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Autocompletar
            </button>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#f0f8ff',
          borderRadius: '10px',
          border: '1px solid #bbdefb',
          fontSize: '0.9rem',
          color: '#0066cc',
          lineHeight: '1.6'
        }}>
          <strong>ℹ️ Sobre esta aplicación:</strong><br/>
          Este es un demo de un sistema de autenticación completo con protección de rutas y control de roles usando JWT.
        </div>
      </div>
    </div>
  );
};
