import React from 'react';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Hero() {
  const { settings } = useSiteSettings();

  const handleScrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pisah title menjadi dua baris jika mengandung koma
  const titleParts = settings.site_title.split(',');
  const titleLine1 = titleParts[0]?.trim();
  const titleLine2 = titleParts.slice(1).join(',').trim();

  return (
    <section id="home" className="hero fade-in">
      <div className="hero-content">
        <div className="hero-badge">🚀 Inovasi Tanpa Batas</div>
        <h1 className="glowing-text hero-title">
          {titleLine1}{titleLine2 && <>,<br/></>}
          {titleLine2 && <span className="text-accent">{titleLine2}</span>}
        </h1>
        <p className="hero-subtitle">
          {settings.site_description}
        </p>
        <div className="hero-actions">
          <button className="btn-primary premium-btn" onClick={handleScrollToProducts}>
            <span className="btn-content">Jelajahi Produk →</span>
            <span className="btn-glow"></span>
          </button>
        </div>
      </div>
    </section>
  );
}
