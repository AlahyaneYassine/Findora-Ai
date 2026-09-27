import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../AuthContext';

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const { isAuthenticated, token, user } = useContext(AuthContext);

  const isAdmin = user?.role === 'admin';

  // Hooks toujours appelés, peu importe isAdmin
  const [selectedProducts, setSelectedProducts] = useState(() => {
    if (typeof window !== 'undefined' && !isAuthenticated) {
      const local = localStorage.getItem('selectedProducts');
      try {
        return local ? JSON.parse(local) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [loadingSelection, setLoadingSelection] = useState(true);
  const saveTimeoutRef = useRef(null);

  // Si admin, on ne charge rien (on peut aussi mettre loading à false directement)
  useEffect(() => {
    if (isAdmin) {
      setLoadingSelection(false);
      return;
    }

    if (!isAuthenticated || !token) {
      setLoadingSelection(false);
      return;
    }

    setLoadingSelection(true);

    fetch('http://localhost:5000/api/selections', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Erreur chargement sélection API');
        return res.json();
      })
      .then(data => {
        console.log('[SelectionContext] Données chargées depuis API:', data);
        setSelectedProducts(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('[SelectionContext] Échec API, fallback localStorage:', err);
        const local = localStorage.getItem('selectedProducts');
        try {
          setSelectedProducts(local ? JSON.parse(local) : []);
        } catch {
          setSelectedProducts([]);
        }
      })
      .finally(() => setLoadingSelection(false));
  }, [isAuthenticated, token, isAdmin]);

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    if (isAdmin) return; // Pas besoin de sauvegarder

    saveTimeoutRef.current = setTimeout(() => {
      if (isAuthenticated && token) {
        fetch('http://localhost:5000/api/selections', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ products: selectedProducts }),
        })
          .then(() => console.log('[SelectionContext] Sauvegardé via API'))
          .catch(err => console.error('[SelectionContext] Erreur sauvegarde API:', err));
      } else {
        try {
          localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
          console.log('[SelectionContext] Sauvegarde localStorage:', selectedProducts);
        } catch (err) {
          console.error('[SelectionContext] Erreur sauvegarde localStorage:', err);
        }
      }
    }, 500);

    return () => clearTimeout(saveTimeoutRef.current);
  }, [selectedProducts, isAuthenticated, token, isAdmin]);

  const removeProduct = (productUrl) => {
    setSelectedProducts(prev =>
      prev.filter(product => product.product_url !== productUrl)
    );
  };

  // Si admin, on retourne un contexte "vide" pour ne pas casser le reste
  if (isAdmin) {
    return (
      <SelectionContext.Provider
        value={{
          selectedProducts: [],
          setSelectedProducts: () => {},
          removeProduct: () => {},
          loadingSelection: false,
        }}
      >
        {children}
      </SelectionContext.Provider>
    );
  }

  // Sinon, contexte normal pour utilisateur classique
  return (
    <SelectionContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
        removeProduct,
        loadingSelection,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);
