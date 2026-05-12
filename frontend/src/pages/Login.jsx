import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('portal_token', data.token);
        navigate('/admin');
      } else {
        alert(data.error || 'Login gagal');
      }
    } catch (err) {
      alert('Gagal terhubung ke server');
    }
  };

  return (
    <div className="portal-container" style={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--primary-glow)' }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.1)', color: 'white' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.1)', color: 'white' }}
          />
          <button type="submit" className="btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
