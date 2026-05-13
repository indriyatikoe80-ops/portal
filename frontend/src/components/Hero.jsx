import React from 'react';

export default function Hero() {
  const handleScrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero fade-in">
      <div className="hero-content">
        <div className="hero-badge">🚀 Inovasi Tanpa Batas</div>
        <h1 className="glowing-text hero-title">
          Satu Portal,<br/>
          <span className="text-accent">Beragam Solusi Digital</span>
        </h1>
        <p className="hero-subtitle">
          Pusat ekosistem produk web inovatif untuk edukasi, utilitas warga, dan masa depan digital Anda.
        </p>
        <div className="hero-actions">
          <button className="btn-primary premium-btn" onClick={handleScrollToProducts}>
            <span className="btn-content">Jelajahi Produk →</span>
            <span className="btn-glow"></span>
          </button>
          <button className="btn-secondary" onClick={() => window.open('https://github.com', '_blank')}>
            GitHub Repo
          </button>
        </div>
      </div>
    </section>
  );
}
