import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import About from '../components/About';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="home">
      <div className="login-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <Header />
      <Hero />
      <ProductGrid />
      <About />
      <Footer />
    </div>
  );
}
