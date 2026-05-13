import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-section fade-in">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-card premium-glass">
            <div className="floating-elements">
              <div className="element e1"></div>
              <div className="element e2"></div>
              <div className="element e3"></div>
            </div>
            <div className="card-content">
              <h2>Masa Depan Digital</h2>
              <p>Membangun solusi yang menginspirasi dan memberdayakan setiap individu.</p>
            </div>
          </div>
          
          <div className="about-content">
            <div className="section-badge">Tentang Kami</div>
            <h2 className="section-title text-left">Visi & Misi Kami</h2>
            <p className="about-description">
              Kami berdedikasi untuk menciptakan ekosistem digital yang inklusif, edukatif, dan solutif. Melalui inovasi teknologi, kami menjawab tantangan sehari-hari dengan cara yang estetik dan efisien.
            </p>
            
            <div className="visi-misi-cards">
              <div className="mini-card premium-glass">
                <h3>Visi</h3>
                <p>Menjadi pusat ekosistem digital terdepan yang menghasilkan produk inklusif dan profesional.</p>
              </div>
              <div className="mini-card premium-glass">
                <h3>Misi</h3>
                <p>Mengembangkan aplikasi tepat guna, memberikan pengalaman premium, dan terus berinovasi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
