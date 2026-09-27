import React, { createContext, useState, useCallback, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });

  const [keyword, setKeyword] = useState(() => {
    return localStorage.getItem('keyword') || 'keyboard';
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:5000/api/ai-search/electronics?keyword=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

      const data = await response.json();
      if (!data.products || data.products.length === 0) {
        throw new Error("Aucun produit trouvé pour cette recherche");
      }

      setProducts(data.products);
      localStorage.setItem('products', JSON.stringify(data.products));
      localStorage.setItem('keyword', searchTerm);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Optionnel : mettre à jour le mot-clé dans localStorage quand il change
  useEffect(() => {
    localStorage.setItem('keyword', keyword);
  }, [keyword]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        keyword,
        setKeyword,
        fetchProducts,
        loading,
        error
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
