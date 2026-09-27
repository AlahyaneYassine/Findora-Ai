import React, { useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import { useSelection } from '../contexts/SelectionContext';

const SearchPage = ({ products, searchQuery }) => {
  const { selectedProducts, setSelectedProducts } = useSelection();

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '24px',
      position: 'relative',
    },
    header: {
      marginBottom: '32px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 8px 0',
    },
    resultsCount: {
      fontSize: '16px',
      color: '#6B7280',
    },
    cartButton: {
      position: 'fixed',
      top: '120px',
      right: '40px',
      backgroundColor: '#ffffff',
      border: '1px solid #E5E7EB',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s ease',
      zIndex: 100,
    },
    cartIcon: {
      fontSize: '24px',
      position: 'relative',
    },
    cartBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#EF4444',
      color: 'white',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    cartTooltip: {
      position: 'absolute',
      right: '70px',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: '#1F2937',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      whiteSpace: 'nowrap',
      opacity: 0,
      transition: 'opacity 0.2s ease',
      pointerEvents: 'none',
    },
  };

  // Enregistrer la recherche à chaque changement de searchQuery
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') return;

    const saveSearch = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) return;

        await axios.post('/api/search', { query: searchQuery }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Recherche sauvegardée:', searchQuery);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la recherche:', error);
      }
    };

    saveSearch();
  }, [searchQuery]);

  const handleSelect = (product) => {
    if (!product?.product_url) {
      console.error('Product is missing required product_url', product);
      return;
    }

    const isSelected = selectedProducts.some(p => p.product_url === product.product_url);

    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(p => p.product_url !== product.product_url));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const isProductSelected = (product) => {
    return selectedProducts.some(p => p.product_url === product.product_url);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {searchQuery ? `Résultats pour "${searchQuery}"` : 'Tous les produits'}
        </h2>
        <div style={styles.resultsCount}>
          {products?.length || 0} {products?.length > 1 ? 'produits trouvés' : 'produit trouvé'}
        </div>
      </div>

      <ProductList
        products={products}
        onSelect={handleSelect}
        isSelected={isProductSelected}
      />

      {selectedProducts.length > 0 && (
        <div
          style={styles.cartButton}
          onClick={() => console.log('Voir le panier')}
        >
          <div style={styles.cartIcon}>
            🛒
            <div style={styles.cartBadge}>{selectedProducts.length}</div>
          </div>
          <div style={styles.cartTooltip}>Voir votre sélection</div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
