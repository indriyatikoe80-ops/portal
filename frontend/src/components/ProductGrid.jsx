import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Gagal mengambil produk');
      const data = await response.json();
      setProducts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading text-center">Loading produk...</p>;
  if (error) return <p className="error text-center">Error: {error}</p>;

  return (
    <section id="products" className="products-section">
      <div className="container">
        <h2 className="section-title">Jelajahi Produk Kami</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
