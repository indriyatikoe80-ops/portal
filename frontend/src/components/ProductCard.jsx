import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="glass-card product-card premium-glass fade-in-up">
      <div className="product-image-container">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="product-image" loading="lazy" />
        ) : (
          <div className="product-image-placeholder">
            <span className="icon">🌐</span>
          </div>
        )}
        {product.category_name && (
          <div className="product-category-tag">{product.category_name}</div>
        )}
      </div>
      
      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <a 
            href={product.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary premium-btn w-full"
          >
            <span className="btn-content">Kunjungi Situs →</span>
            <span className="btn-glow"></span>
          </a>
        </div>
      </div>
    </div>
  );
}
