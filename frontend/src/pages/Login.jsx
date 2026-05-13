import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('portal_token', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Login gagal');
      }
    } catch (err) {
      setError('Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      
      <div className="login-container glass-card premium-glass">
        <div className="login-header">
          <div className="logo-icon">🔒</div>
          <h1>Admin Portal</h1>
          <p>Secure access to your content hub</p>
        </div>

        <form onSubmit={handleSubmit} className="premium-form">
          <div className={`form-group floating-group ${focusedInput === 'username' || username ? 'active' : ''}`}>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
              required
            />
            <label htmlFor="username">Username</label>
            <div className="input-glow"></div>
          </div>
          
          <div className={`form-group floating-group ${focusedInput === 'password' || password ? 'active' : ''}`}>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              required
            />
            <label htmlFor="password">Password</label>
            <div className="input-glow"></div>
          </div>

          {error && (
            <div className="error-message animated-error">
              <span className="error-icon">⚠️</span> {error}
            </div>
          )}

          <button type="submit" className="btn-primary premium-btn" disabled={loading}>
            <span className="btn-content">
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </span>
            <span className="btn-glow"></span>
          </button>
          
          <button type="button" className="btn-text back-link" onClick={() => navigate('/')}>
            &larr; Back to Portal
          </button>
        </form>
      </div>
    </div>
  );
}
