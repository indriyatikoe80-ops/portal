import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('portal_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProducts();
    fetchCategories();
  }, [navigate]);

  const getToken = () => localStorage.getItem('portal_token');

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data || []);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products/all`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data || []);
      } else if (response.status === 401 || response.status === 403) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portal_token');
    navigate('/login');
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!response.ok) throw new Error('Gagal menghapus');
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <h1>Dashboard Admin</h1>
            <div className="admin-actions">
              <span>Welcome, Admin</span>
              <button className="btn-secondary" onClick={() => navigate('/')}>
                Lihat Web Publik
              </button>
              <button className="btn-primary" onClick={() => {
                setEditingId(null);
                setShowForm(!showForm);
              }}>
                + Tambah Produk
              </button>
              <button className="btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container admin-content">
        {showForm && (
          <ProductForm 
            onSubmit={fetchProducts}
            onCancel={() => setShowForm(false)}
            editingId={editingId}
            setEditingId={setEditingId}
            categories={categories}
          />
        )}

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="products-table glass-card">
            <table>
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Deskripsi</th>
                  <th>Status</th>
                  <th>URL</th>
                  <th style={{ width: '160px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                      Belum ada produk. Klik "+ Tambah Produk" untuk menambahkan.
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id}>
                      <td><strong>{product.title}</strong></td>
                      <td>
                        <span className="category-pill">{product.category_name || 'N/A'}</span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>
                        {product.description?.substring(0, 60)}
                        {product.description?.length > 60 ? '...' : ''}
                      </td>
                      <td>
                        <span className={`status-badge ${product.is_active ? 'active' : 'inactive'}`}>
                          {product.is_active ? 'Aktif' : 'Sembunyi'}
                        </span>
                      </td>
                      <td>
                        <a href={product.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', textDecoration: 'none' }}>
                          Buka Link ↗
                        </a>
                      </td>
                      <td>
                        <button 
                          className="btn-sm premium-btn-sm btn-edit"
                          onClick={() => {
                            setEditingId(product.id);
                            setShowForm(true);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn-sm premium-btn-sm btn-delete"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductForm({ onSubmit, onCancel, editingId, setEditingId, categories }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    image_url: '',
    category_id: '',
    is_active: true,
    display_order: 0
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');

  const getToken = () => localStorage.getItem('portal_token');

  const [focusedInput, setFocusedInput] = useState(null);

  // Load product data if editing
  useEffect(() => {
    if (editingId) {
      fetchProductData(editingId);
    } else {
      setFormData({
        title: '',
        description: '',
        url: '',
        image_url: '',
        category_id: '',
        is_active: true,
        display_order: 0
      });
    }
  }, [editingId]);

  const fetchProductData = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/all`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (response.ok) {
        const products = await response.json();
        const product = products.find(p => p.id === id);
        if (product) {
          setFormData({
            title: product.title || '',
            description: product.description || '',
            url: product.url || '',
            image_url: product.image_url || '',
            category_id: product.category_id || '',
            is_active: product.is_active ?? true,
            display_order: product.display_order || 0
          });
        }
      }
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) {
      setError('Masukkan judul terlebih dahulu untuk generate deskripsi');
      return;
    }
    setAiLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/ai/generate-description`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: formData.title })
      });
      const data = await res.json();
      if (res.ok) {
        setFormData({ ...formData, description: data.description });
      } else {
        throw new Error(data.error || 'Gagal generate AI');
      }
    } catch (err) {
      setError('AI Error: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSuggestCategory = async () => {
    if (!formData.title || !formData.description) {
      setError('Butuh judul & deskripsi untuk menyarankan kategori');
      return;
    }
    setAiLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/ai/classify-category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: formData.title, description: formData.description })
      });
      const data = await res.json();
      if (res.ok) {
        const cat = categories.find(c => c.name.toLowerCase().includes(data.category.toLowerCase()));
        if (cat) {
          setFormData({ ...formData, category_id: cat.id });
        } else {
          setError(`Saran AI: ${data.category} (Tidak ditemukan di DB)`);
        }
      }
    } catch (err) {
      setError('AI Error: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${API_URL}/products/${editingId}`
        : `${API_URL}/products`;

      const submissionData = {
        ...formData,
        category_id: formData.category_id === '' ? null : formData.category_id
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Gagal menyimpan');
      }

      onSubmit();
      onCancel();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container glass-card premium-glass fade-in-up">
      <div className="form-header">
        <h2>{editingId ? '✨ Edit Produk' : '✨ Tambah Produk Baru'}</h2>
        <p>{editingId ? 'Perbarui informasi produk di bawah ini.' : 'Isi detail produk baru yang akan ditampilkan di portal.'}</p>
      </div>
      
      {error && (
        <div className="error-message animated-error">
          <span className="error-icon">⚠️</span> {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="premium-form two-columns">
        <div className={`form-group floating-group full-width ${focusedInput === 'title' || formData.title ? 'active' : ''}`}>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onFocus={() => setFocusedInput('title')}
            onBlur={() => setFocusedInput(null)}
          />
          <label>Judul Produk *</label>
          <div className="input-glow"></div>
        </div>
        
        <div className={`form-group floating-group full-width ${focusedInput === 'description' || formData.description ? 'active' : ''}`}>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            onFocus={() => setFocusedInput('description')}
            onBlur={() => setFocusedInput(null)}
            rows="3"
          />
          <label>Deskripsi *</label>
          <div className="input-glow"></div>
          <button 
            type="button" 
            className="ai-suggest-btn" 
            onClick={handleGenerateDescription}
            disabled={aiLoading}
            title="Generate deskripsi dengan AI"
          >
            {aiLoading ? '⌛' : '🪄 AI'}
          </button>
        </div>
        
        <div className={`form-group floating-group ${focusedInput === 'url' || formData.url ? 'active' : ''}`}>
          <input
            type="url"
            required
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            onFocus={() => setFocusedInput('url')}
            onBlur={() => setFocusedInput(null)}
          />
          <label>URL Produk *</label>
          <div className="input-glow"></div>
        </div>

        <div className={`form-group floating-group ${focusedInput === 'category' || formData.category_id ? 'active' : ''}`}>
          <select
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            onFocus={() => setFocusedInput('category')}
            onBlur={() => setFocusedInput(null)}
            className="premium-select"
          >
            <option value="">Pilih Kategori</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <label>Kategori</label>
          <div className="input-glow"></div>
          <button 
            type="button" 
            className="ai-suggest-btn" 
            onClick={handleSuggestCategory}
            disabled={aiLoading}
            title="Saran kategori dari AI"
          >
            {aiLoading ? '⌛' : '🪄'}
          </button>
        </div>
        
        <div className={`form-group floating-group full-width ${focusedInput === 'image_url' || formData.image_url ? 'active' : ''}`}>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            onFocus={() => setFocusedInput('image_url')}
            onBlur={() => setFocusedInput(null)}
          />
          <label>Image URL (Opsional)</label>
          <div className="input-glow"></div>
        </div>
        
        <div className="form-group settings-group full-width">
          <div className="toggle-container">
            <span className="toggle-label">Status Tampil</span>
            <label className="premium-toggle">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className={`status-text ${formData.is_active ? 'active' : 'inactive'}`}>
              {formData.is_active ? 'Aktif' : 'Sembunyi'}
            </span>
          </div>
          
          <div className="order-input-container">
            <label>Urutan Tampil:</label>
            <div className="number-input-wrapper">
              <button type="button" onClick={() => setFormData({...formData, display_order: Math.max(0, formData.display_order - 1)})}>-</button>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                min="0"
              />
              <button type="button" onClick={() => setFormData({...formData, display_order: formData.display_order + 1})}>+</button>
            </div>
          </div>
        </div>
        
        <div className="form-actions full-width">
          <button type="submit" className="btn-primary premium-btn" disabled={loading}>
            <span className="btn-content">
              {loading ? <span className="spinner"></span> : (editingId ? 'Simpan Perubahan' : 'Tambah Produk')}
            </span>
            <span className="btn-glow"></span>
          </button>
          
          <button type="button" className="btn-secondary" onClick={() => {
            setEditingId(null);
            onCancel();
          }}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
