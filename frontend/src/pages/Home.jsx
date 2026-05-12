import React, { useState, useEffect } from 'react';
import './App.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({
    site_title: 'Portal Inovasi Digital',
    site_description: 'Pusat ekosistem produk web inovatif',
    profile_text: 'Kami mendedikasikan diri untuk membangun solusi digital inovatif yang bermanfaat bagi masyarakat, mulai dari pendidikan hingga utilitas.',
    visi_text: 'Menjadi pusat ekosistem digital terdepan yang profesional dan inklusif.',
    misi_text: '1. Mengembangkan aplikasi tepat guna.\n2. Memberikan UX premium.\n3. Terus berinovasi tiada henti.'
  });

  // Fetch dari Backend (API)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/settings');
        if (res.ok) {
           const data = await res.json();
           if(Object.keys(data).length > 0) setSettings(data);
        }
      } catch (err) {
        console.log('Menggunakan data dummy setting karena backend belum running.');
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/products');
        if (res.ok) {
           const data = await res.json();
           setProducts(data);
        }
      } catch (err) {
        console.log('Menggunakan data dummy products karena backend belum running.');
        setProducts([
            { id: 1, title: 'Taman Bermain & Belajar', description: 'Aplikasi edukatif interaktif dengan animasi untuk anak TK dan Paud.', url: 'https://example.com' },
            { id: 2, title: 'Dashboard RT Digital', description: 'Sistem manajemen informasi dan administrasi warga lingkungan perumahan.', url: 'https://example.com' }
        ]);
      }
    };

    fetchSettings();
    fetchProducts();
  }, []);

  return (
    <div className="portal-container">
      {/* Header */}
      <header className="header">
        <div className="logo">{settings.site_title}</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">Tentang</a>
          <a href="#products">Produk</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="glowing-text">Satu Portal,<br/>Beragam Solusi Digital</h1>
          <p>{settings.site_description}</p>
          <a href="#products" className="btn-primary mt-4">Jelajahi Produk Kami</a>
        </div>
        <div className="hero-glow-bg"></div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="glass-card about-card">
          <h2>Profil Kami</h2>
          <p>{settings.profile_text}</p>
        </div>
        <div className="glass-card about-card visi-misi">
          <h2>Visi & Misi</h2>
          <h3>Visi</h3>
          <p>{settings.visi_text}</p>
          <h3>Misi</h3>
          <p style={{whiteSpace: 'pre-wrap'}}>{settings.misi_text}</p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <h2 className="section-title">Katalog Produk</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="glass-card product-card">
              <div className="product-image-placeholder">
                  {product.image_url ? <img src={product.image_url} alt={product.title} /> : <span>Gambar Thumbnail</span>}
              </div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <a href={product.url} target="_blank" rel="noreferrer" className="btn-primary w-full mt-auto">Kunjungi Website</a>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 {settings.site_title}. Dibangun dengan antusiasme teknologi.</p>
      </footer>
    </div>
  );
}

export default Home;
