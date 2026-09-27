import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      setMessage(null);
      try {
        const res = await axios.get('/api/purchases/my-purchases', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Dans ta réponse, les achats sont dans res.data.purchases
        if (Array.isArray(res.data.purchases)) {
          setPurchases(res.data.purchases);
        } else if (res.data.message) {
          setMessage(res.data.message);
          setPurchases([]);
        } else {
          setPurchases([]);
        }
      } catch (err) {
        setMessage('Erreur lors du chargement des achats.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPurchases();
    } else {
      setMessage('Vous devez être connecté pour voir vos achats.');
      setLoading(false);
    }
  }, [token]);

  if (loading) return <p>Chargement des achats...</p>;
  if (message) return <p>{message}</p>;

 return (
  <div>
    <h2>Mes Achats</h2>

    {message && <p style={{ color: 'gray' }}>{message}</p>}

    {purchases.length === 0 && !loading ? (
      <p>Vous n'avez aucun achat.</p>
    ) : (
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase._id}>
            {purchase.product ? (
              <>
                <p><strong>Produit:</strong> {purchase.product}</p>
                <p><strong>Fournisseur:</strong> {purchase.supplier || 'N/A'}</p>
                <p><strong>Quantité:</strong> {purchase.quantity}</p>
                <p><strong>Prix:</strong> ${purchase.price.toFixed(2)}</p>
                <p><strong>Date:</strong> {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
              </>
            ) : (
              <>
                <p><strong>Commande multiple :</strong></p>
                <ul>
  <li>
    Produit: {purchase.product} – Quantité: {purchase.quantity} – Prix: ${purchase.price?.toFixed(2)}
  </li>
</ul>

                <p><strong>Total:</strong> ${purchase.total?.toFixed(2)}</p>
                <p><strong>Date:</strong> {new Date(purchase.purchaseDate || purchase.date).toLocaleDateString()}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default PurchasesPage;
