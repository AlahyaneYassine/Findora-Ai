import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { ProductsContext } from '../contexts/ProductsContext';
import { useSelection } from '../contexts/SelectionContext';
import Loading from '../components/Loading';

const styles = {
  // Styles de base
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
    position: 'relative'
  },

  // Navbar
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
  },
  logoLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1F2937',
    background: 'linear-gradient(90deg, #4B5563, #1F2937)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  navLink: {
    color: '#4B5563',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'color 0.2s',
    ':hover': {
      color: '#1F2937'
    }
  },

  // Contenu principal
  content: {
    flex: 1,
    padding: '40px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%'
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px'
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '32px',
    gap: '12px',
    width: '100%'
  },
  searchInput: {
    padding: '12px 16px',
    width: '60%',
    maxWidth: '600px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '16px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s',
    ':focus': {
      outline: 'none',
      borderColor: '#6366f1',
      boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.2)'
    }
  },
  searchButton: {
    padding: '12px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#4f46e5'
    }
  },

  // Section sélection
  selectedProductsContainer: {
    marginTop: '48px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  selectedHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  selectedTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  selectedCount: {
    backgroundColor: '#6366f1',
    color: 'white',
    borderRadius: '9999px',
    padding: '2px 10px',
    fontSize: '14px'
  },
  clearAllButton: {
    padding: '8px 16px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#fecaca'
    }
  },
  emptySelection: {
    textAlign: 'center',
    padding: '20px',
    color: '#6b7280'
  },
  productCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    marginBottom: '12px',
    borderRadius: '8px',
    backgroundColor: '#f9fafb',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f3f4f6'
    }
  },
  productImage: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    borderRadius: '4px',
    border: '1px solid #e5e7eb'
  },
  productInfo: {
    flex: 1
  },
  productName: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px'
  },
  productMeta: {
    display: 'flex',
    gap: '12px',
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px'
  },
  productActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px'
  },
  viewButton: {
    padding: '6px 12px',
    backgroundColor: '#e0e7ff',
    color: '#4f46e5',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#c7d2fe'
    }
  },
  removeButton: {
    padding: '6px 12px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#fecaca'
    }
  },

  // Panier flottant
  floatingCart: {
    position: 'fixed',
    top: '120px',
    right: '40px',
    backgroundColor: '#6366f1',
    color: 'white',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    zIndex: 999,
    transition: 'all 0.3s',
    ':hover': {
      transform: 'scale(1.1)',
      backgroundColor: '#4f46e5'
    }
  },
  cartBadge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  cartPreview: {
    position: 'fixed',
    top: '200px',
    right: '40px',
    width: '350px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    zIndex: 998,
    maxHeight: '60vh',
    overflowY: 'auto'
  },
  cartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e5e7eb'
  },
  cartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827'
  },
  closeCart: {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '20px',
    ':hover': {
      color: '#111827'
    }
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6'
  },
  cartItemImage: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    borderRadius: '4px',
    border: '1px solid #e5e7eb'
  },
  cartItemInfo: {
    flex: 1
  },
  cartItemName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '4px'
  },
  cartItemPrice: {
    fontSize: '14px',
    color: '#6b7280'
  },
  cartFooter: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb'
  },

 

  // Footer
  footer: {
    backgroundColor: 'white',
    padding: '60px 40px 0',
    borderTop: '1px solid #E5E7EB'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
    paddingBottom: '60px'
  },
  footerLogo: {
    flex: 1,
    minWidth: '200px'
  },
  footerTagline: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '12px'
  },
  footerLinks: {
    display: 'flex',
    gap: '60px',
    flexWrap: 'wrap'
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: '150px'
  },
  footerHeading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px'
  },
  footerLink: {
    fontSize: '14px',
    color: '#6B7280',
    textDecoration: 'none',
    transition: 'color 0.2s',
    ':hover': {
      color: '#111827'
    }
  },
  footerBottom: {
    borderTop: '1px solid #E5E7EB',
    padding: '24px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  copyright: {
    fontSize: '14px',
    color: '#6B7280'
  },
  socialLinks: {
    display: 'flex',
    gap: '16px'
  },
  socialLink: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#E5E7EB'
    }
  },

  // États
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minHeight: '300px'
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: '300px',
    textAlign: 'center'
  },
  errorText: {
    color: '#ef4444',
    marginBottom: '16px',
    fontSize: '18px'
  },
  retryButton: {
    padding: '10px 20px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#4f46e5'
    }
  }
};

const Products = () => {
  const { products, keyword, setKeyword, fetchProducts, loading, error } = useContext(ProductsContext);
  const { selectedProducts, setSelectedProducts } = useSelection();
  const [showCartPreview, setShowCartPreview] = useState(false);

  const isSelected = (product) => 
    selectedProducts.some(p => p.product_url === product.product_url);

  const handleSelect = (product) => {
    if (!product?.product_url) {
      console.warn('Produit invalide :', product);
      return;
    }
    setSelectedProducts(prev => [...prev, product]);
  };

  const handleRemove = (productUrl) => {
    setSelectedProducts(prev => prev.filter(p => p.product_url !== productUrl));
  };

  const handleRemoveAll = () => {
    setSelectedProducts([]);
    setShowCartPreview(false);
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      const price = parseFloat(product.price?.toString().replace(',', '.')) || 0;
      return total + price;
    }, 0).toFixed(2);
  };

  if (loading) return (
    <div style={styles.pageContainer}>
      
      <Loading fullPage />
    </div>
  );

  if (error) return (
    <div style={styles.pageContainer}>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logoLink}>
          <div style={styles.logo}>Findora</div>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/home" style={styles.navLink}>Home</Link>
          <Link to="/how-it-works" style={styles.navLink}>How It Works</Link>
          <Link to="/features" style={styles.navLink}>Features</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </div>
      </nav>
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>Erreur : {error}</p>
        <button onClick={() => fetchProducts(keyword)} style={styles.retryButton}>
          Réessayer
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.pageContainer}>
       {/* Navigation */}
           <nav style={styles.navbar}>
             <Link to="/categories/electronics" style={styles.logoLink}>
               <div style={styles.logo}>Findora</div>
             </Link>
             <div style={styles.navLinks}>
               <Link to="/home" style={styles.navLink}>Home</Link>
               <Link to="/how-it-works" style={styles.navLink}>How It Works</Link>
               <Link to="/features" style={styles.navLink}>Features</Link>
               <Link to="/contact" style={styles.navLink}>Contact</Link>
             </div>
           </nav>

      {/* Contenu principal */}
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>Find What You're Looking For!</h1>
          <div style={styles.searchContainer}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Rechercher des produits..."
              style={styles.searchInput}
            />
            <button onClick={() => fetchProducts(keyword)} style={styles.searchButton}>
              Rechercher
            </button>
          </div>
        </header>

        <ProductList 
          products={products} 
          onSelect={handleSelect} 
          isSelected={isSelected} 
        />

        {/* Section sélection */}
      
      </div>

      {/* Panier flottant */}
      {selectedProducts.length > 0 && (
        <>
          <div 
            style={styles.floatingCart}
            onClick={() => setShowCartPreview(!showCartPreview)}
            aria-label="Voir le panier"
          >
            🛒
            <div style={styles.cartBadge}>{selectedProducts.length}</div>
          </div>
          
          {showCartPreview && (
            <div style={styles.cartPreview}>
              <div style={styles.cartHeader}>
                <h4 style={styles.cartTitle}>Votre panier</h4>
                <button 
                  onClick={() => setShowCartPreview(false)}
                  style={styles.closeCart}
                  aria-label="Fermer le panier"
                >
                  x
                </button>
              </div>
              
              {selectedProducts.map(product => (
                <div key={`cart-${product.product_url}`} style={styles.cartItem}>
                  <img
                    src={product.image_url || 'https://via.placeholder.com/50'}
                    alt={product.name}
                    style={styles.cartItemImage}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                  />
                  <div style={styles.cartItemInfo}>
                    <div style={styles.cartItemName}>{product.name}</div>
                    <div style={styles.cartItemPrice}>{product.price} €</div>
                    <div style={styles.productActions}>
                      <a
                        href={product.product_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.viewButton}
                      >
                        Voir
                      </a>
                      <button
                        onClick={() => handleRemove(product.product_url)}
                        style={styles.removeButton}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
            
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <div style={styles.logo}>Findora</div>
            <p style={styles.footerTagline}>Do less. Achieve more.</p>
          </div>
          
          <div style={styles.footerLinks}>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Product</h4>
              <Link to="/features" style={styles.footerLink}>Features</Link>
              <Link to="/demo" style={styles.footerLink}>Demo</Link>
            </div>
            
            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Company</h4>
              <Link to="/about" style={styles.footerLink}>About</Link>
              <Link to="/contact" style={styles.footerLink}>Contact</Link>
              <Link to="/faq" style={styles.footerLink}>FAQ</Link>
            </div>
    
            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Legal</h4>
              <Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
              <Link to="/terms-of-service" style={styles.footerLink}>Terms of Service</Link>
              <Link to="/cookies-policy" style={styles.footerLink}>Cookies Policy</Link>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© {new Date().getFullYear()} Findora. All rights reserved.</p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink} aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4H20L14 10L21 20H15.5L11 13.5L6 20H2L8.5 12.5L2 4H8L12 10L16 4ZM15 18H16.5L5.5 6H4L15 18Z" 
                      stroke="#4B5563" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" style={styles.socialLink} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" style={styles.socialLink} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;