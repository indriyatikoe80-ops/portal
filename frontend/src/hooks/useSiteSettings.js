import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Default values jika API belum tersedia atau setting belum diisi
const DEFAULTS = {
  site_title: 'Satu Portal, Beragam Solusi Digital',
  site_description: 'Pusat ekosistem produk web inovatif untuk edukasi, utilitas warga, dan masa depan digital Anda.',
  profile_text: 'Membangun solusi yang menginspirasi dan memberdayakan setiap individu.',
  visi_text: 'Menjadi pusat ekosistem digital terdepan yang menghasilkan produk inklusif dan profesional.',
  misi_text: 'Mengembangkan aplikasi tepat guna, memberikan pengalaman premium, dan terus berinovasi.',
  contact_email: 'info@example.com',
  contact_phone: '-',
  footer_text: 'Portal Inovasi Digital. Dibangun dengan ❤️ menggunakan React & Node.js.',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Coba ambil dari sessionStorage dulu untuk performa
    const cached = sessionStorage.getItem('site_settings');
    if (cached) {
      setSettings({ ...DEFAULTS, ...JSON.parse(cached) });
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/settings`)
      .then(r => r.json())
      .then(data => {
        const merged = { ...DEFAULTS, ...data };
        setSettings(merged);
        sessionStorage.setItem('site_settings', JSON.stringify(data));
      })
      .catch(() => {
        // Gunakan default jika API tidak tersedia
        setSettings(DEFAULTS);
      })
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
}
