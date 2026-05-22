'use client';

import React, { useState, useTransition } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AestheticSlider from '../components/AestheticSlider';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import CartDrawer from '../components/CartDrawer';
import ShopNearMe from '../components/ShopNearMe';
import Footer from '../components/Footer';
import VibeStories from '../components/VibeStories';
import { PRODUCTS, Product } from '../data/products';
import { CartProvider } from '../context/CartContext';
import styles from './page.module.css';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  
  // Catalog filter/search states
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [gender, setGender] = useState<string>('All');
  const [sort, setSort] = useState<string>('default');

  const [isPending, startTransition] = useTransition();

  // Handle filter state changes in transitions to optimize Interaction to Next Paint (INP)
  const handleCategoryChange = (cat: string) => {
    startTransition(() => {
      setCategory(cat);
    });
  };

  const handleGenderChange = (gen: string) => {
    startTransition(() => {
      setGender(gen);
    });
  };

  // Filtered and sorted products
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.description.toLowerCase().includes(search.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = category === 'All' || product.category === category;
    
    const matchesGender = gender === 'All' || 
                          product.gender === gender || 
                          product.gender === 'Unisex';

    return matchesSearch && matchesCategory && matchesGender;
  }).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    return 0; // Default sorting (catalog order)
  });

  return (
    <CartProvider>
      <div className={styles.appWrapper}>
        {/* Sticky Header Nav */}
        <Navbar onCartToggle={() => setCartOpen(!cartOpen)} />

        {/* Hero Section */}
        <main className={styles.main}>
          <Hero />

          {/* Interactive Vibe Stories */}
          <VibeStories onSelectCategory={handleCategoryChange} />

          {/* Premium Shopify-Style Featured Slider */}
          <AestheticSlider 
            products={PRODUCTS.filter(p => ['prod_06', 'prod_01', 'prod_02', 'prod_07'].includes(p.id))} 
            onOpenDetails={(p) => setDetailsProduct(p)} 
          />

          {/* Shop Near Me Section */}
          <ShopNearMe />

          {/* Catalog grid & Filter section */}
          <section id="catalog" className={styles.catalogSection}>
            <div className={styles.catalogHeader}>
              <h2 className="text-gradient">CAPSULE CATALOG</h2>
              <p>Explore Gen Z aesthetics curated specifically for university vibes.</p>
            </div>

            {/* Filter and Search Panel */}
            <div className={`${styles.filterPanel} glass`}>
              <div className={styles.searchRow}>
                <div className={styles.searchInputWrapper}>
                  <svg className={styles.searchIcon} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search aesthetic (e.g., Y2K, oversized, techwear...)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>

                <div className={styles.sortWrapper}>
                  <label htmlFor="sort-select">Sort fits:</label>
                  <select
                    id="sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={styles.sortSelect}
                  >
                    <option value="default">Release Date</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Category Slider Tabs */}
              <div className={styles.filterRow}>
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>Type:</span>
                  <div className={styles.tabs}>
                    {['All', 'Tees', 'Hoodies', 'Cargoes', 'Shirts', 'Knitwear', 'Accessories'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`${styles.tabBtn} ${category === cat ? styles.activeTab : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>Vibe:</span>
                  <div className={styles.tabs}>
                    {['All', 'Boys', 'Girls', 'Unisex'].map((gen) => (
                      <button
                        key={gen}
                        onClick={() => handleGenderChange(gen)}
                        className={`${styles.tabBtn} ${gender === gen ? styles.activeTab : ''}`}
                      >
                        {gen}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="product-grid-container">
              {isPending ? (
                <div className={styles.loaderContainer}>
                  <span className={styles.catalogLoader}></span>
                  <p>Refiltering vibes...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className={styles.emptyResults}>
                  <h3>No fits found matching that vibe.</h3>
                  <p>Try resetting filters or searching for keywords like &quot;oversized&quot;, &quot;Y2K&quot;, or &quot;acid&quot;.</p>
                  <button 
                    onClick={() => {
                      setSearch('');
                      setCategory('All');
                      setGender('All');
                      setSort('default');
                    }}
                    className={styles.resetBtn}
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className={styles.grid}>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={(p) => setDetailsProduct(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Slide-out Cart Drawer */}
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

        {/* Product Details Modal */}
        <ProductModal 
          key={detailsProduct?.id || 'empty'}
          product={detailsProduct} 
          onClose={() => setDetailsProduct(null)} 
        />
      </div>
    </CartProvider>
  );
}
