import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Admin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('portal_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProducts(token);
  }, [navigate]);

  const fetchProducts = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/products/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        if(res.status === 401 || res.status === 403) navigate('/login');
      }
    } catch (err) {
      console.log('Error fetching products', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portal_token');
    navigate('/login');
  };

  return (
    <div className="portal-container" style={{ padding: '40px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--primary-glow)' }}>Admin Dashboard</h1>
        <div>
           <button onClick={() => navigate('/')} className="btn-primary" style={{ marginRight: '10px' }}>Lihat Web Publik</button>
           <button onClick={handleLogout} className="btn-primary" style={{ borderColor: 'red', color: 'red', boxShadow: 'none' }}>Logout</button>
        </div>
      </header>

      <div className="glass-card">
        <h2>Daftar Produk</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Manajemen tautan produk web Anda di sini.</p>
        
        <button className="btn-primary" style={{ marginBottom: '20px' }}>+ Tambah Produk Baru</button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {products.length === 0 ? <p style={{ color: '#fff' }}>Belum ada produk. (Atau backend belum berjalan)</p> : products.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>{p.title}</h3>
                <a href={p.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-glow)', fontSize: '0.9rem' }}>{p.url}</a>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button className="btn-primary" style={{ padding: '5px 15px', fontSize: '0.9rem' }}>Edit</button>
                <button className="btn-primary" style={{ padding: '5px 15px', fontSize: '0.9rem', borderColor: 'red', color: 'red', boxShadow:'none' }}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
