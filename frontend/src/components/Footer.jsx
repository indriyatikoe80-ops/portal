import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Portal Inovasi Digital</h3>
            <p>Menciptakan solusi digital terdepan dan inklusif.</p>
          </div>
          <div className="footer-section">
            <h4>Tautan</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Produk</a></li>
              <li><Link to="/login">Admin</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Kontak</h4>
            <ul>
              <li><a href="mailto:info@example.com">info@example.com</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {year} Portal Inovasi Digital. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
