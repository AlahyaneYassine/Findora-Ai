import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useSelection } from '../contexts/SelectionContext';
import { Link } from 'react-router-dom'; // 🔥 Assure-toi d'importer Link

const ProductList = ({ products }) => {
  const { selectedProducts, setSelectedProducts } = useSelection();
  const [filter, setFilter] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const styles = {
    container: { margin: '24px 0' },
    controlsContainer: {
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px'
    },
    filterGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
    label: { fontSize: '14px', fontWeight: '500', color: '#4B5563' },
    select: {
      padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB',
      backgroundColor: 'white', fontSize: '14px', color: '#374151', cursor: 'pointer'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
    },
    pagination: {
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: '8px', flexWrap: 'wrap'
    },
    paginationButton: {
      padding: '8px 12px', backgroundColor: 'white',
      border: '1px solid #D1D5DB', borderRadius: '6px',
      color: '#4B5563', cursor: 'pointer'
    },
    activePage: { backgroundColor: '#6366F1', color: 'white', borderColor: '#6366F1' },
    pageInfo: { fontSize: '14px', color: '#6B7280', margin: '0 12px' },
  };

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    const parsed = parseFloat(price.toString().replace(/[^\d.,]/g, '').replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (filter) {
      case 'price-asc': return parsePrice(a.price) - parsePrice(b.price);
      case 'price-desc': return parsePrice(b.price) - parsePrice(a.price);
      case 'rating': return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
      case 'alpha-asc': return a.name.localeCompare(b.name);
      case 'alpha-desc': return b.name.localeCompare(a.name);
      default: return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleSelect = (product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.product_url === product.product_url);
      if (!exists) return [...prev, product];
      return prev;
    });
  };

  const isSelected = (product) => {
    return selectedProducts.some(p => p.product_url === product.product_url);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);
    if (endPage - startPage + 1 < visiblePages) startPage = Math.max(1, endPage - visiblePages + 1);

    return (
      <div style={styles.pagination}>
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} style={styles.paginationButton}>«</button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={styles.paginationButton}>‹</button>

        {startPage > 1 && <span style={styles.pageInfo}>...</span>}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                ...styles.paginationButton,
                ...(page === currentPage ? styles.activePage : {}),
              }}
            >
              {page}
            </button>
          );
        })}

        {endPage < totalPages && <span style={styles.pageInfo}>...</span>}

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={styles.paginationButton}>›</button>
        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} style={styles.paginationButton}>»</button>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Controls */}
      <div style={styles.controlsContainer}>
        <div style={styles.filterGroup}>
          <label htmlFor="filter" style={styles.label}>Trier par :</label>
          <select id="filter" value={filter} onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }} style={styles.select}>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rating">Meilleure note</option>
            <option value="alpha-asc">Nom A-Z</option>
            <option value="alpha-desc">Nom Z-A</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label htmlFor="itemsPerPage" style={styles.label}>Produits par page :</label>
          <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} style={styles.select}>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {paginatedProducts.map((product, index) => (
          <ProductCard
            key={`${product.product_url}-${index}`}
            product={product}
            onSelect={() => handleSelect(product)}
            isSelected={isSelected(product)}
          />
        ))}
      </div>

      {renderPagination()}

      <div style={{ textAlign: 'center', marginTop: '16px', color: '#6B7280', fontSize: '14px' }}>
        Affichage des produits {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedProducts.length)} sur {sortedProducts.length}
      </div>

      {/* ✅ Bouton vers produits sélectionnés */}
      {selectedProducts.length > 0 && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Link to="/selected-products">
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              Voir les produits sélectionnés ({selectedProducts.length})
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductList;

