import React from 'react';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Footer() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Portal Inovasi Digital</h3>
            <p>{settings.footer_text}</p>
          </div>
          <div className="footer-section">
            <h4>Tautan</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Produk</a></li>
              <li><a href="#about">Tentang</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Kontak</h4>
            <ul>
              {settings.contact_email && (
                <li><a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a></li>
              )}
              {settings.contact_phone && settings.contact_phone !== '-' && (
                <li><a href={`tel:${settings.contact_phone}`}>{settings.contact_phone}</a></li>
              )}
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
