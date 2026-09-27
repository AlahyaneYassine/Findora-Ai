import React from 'react';

const ProductCard = ({ product, onSelect, isSelected }) => {
  const {
    name,
    price,
    description,
    rating,
    supplier,
    image_url,
    product_url
  } = product;
  
  console.log("Product image URL:", image_url);  // <-- ici

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSelect = () => {
    if (!product || !product_url) {
      console.warn('[ProductCard] Produit invalide, URL manquante:', product);
      return;
    }
    onSelect(product);
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px',
      maxWidth: '280px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img 
        src={isValidUrl(image_url) ? image_url : 'https://via.placeholder.com/150'}
        alt={name}
        style={{ 
          width: '100%', 
          height: '150px', 
          objectFit: 'cover', 
          borderRadius: '6px'
        }}
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.target.src = 'https://dummyimage.com/150x150/cccccc/ffffff.png&text=Image+manquante';
          e.target.style.opacity = '0.5';
        }}
      />

      <h4 style={{ fontSize: '1.1rem', margin: '0 0 6px' }}>{name}</h4>
      <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '6px' }}>{description}</div>
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>💰 {price}</div>
      <div style={{ fontSize: '0.9rem', color: '#777', marginBottom: '4px' }}>📦 {supplier}</div>
      <div style={{ fontSize: '0.85rem', color: '#444', marginBottom: '8px' }}>
        ⭐ {parseFloat(rating) >= 4.5 ? '★★★★★' : '★★★★☆'} ({rating}/5)
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleSelect}
          disabled={isSelected}
          style={{
            padding: '6px 12px',
            backgroundColor: isSelected ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSelected ? 'default' : 'pointer',
            opacity: isSelected ? 0.6 : 1,
          }}
        >
          {isSelected ? 'Sélectionné' : 'Sélectionner'}
        </button>

        <a href={product_url} target="_blank" rel="noreferrer" style={{
          padding: '6px 12px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          textDecoration: 'none'
        }}>
          Voir le produit
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
