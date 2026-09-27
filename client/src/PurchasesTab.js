import React, { useState, useEffect } from 'react';

function PurchasesTab({ activeTab }) {
  const [purchases, setPurchases] = useState([]);
  const [purchasesLoading, setPurchasesLoading] = useState(false);
  const [purchasesError, setPurchasesError] = useState(null);

  useEffect(() => {
  const fetchPurchases = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/purchases/my-purchases', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(res.data.purchases)) {
        setPurchases(res.data.purchases);
      } else if (res.data.message) {
        setMessage(res.data.message);
        setPurchases([]);
      } else {
        setPurchases([]);
      }
    } catch (err) {
      // <-- Remplace ce bloc par le nouveau code ici :
      console.error('Erreur fetch achats:', err.response || err.message);
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

  return (
    <>
      {activeTab === 'purchases' && (
        <div className="formSection">
          <h3>Mes Achats</h3>

          {purchasesLoading && <p>Chargement des achats...</p>}

          {purchasesError && <p style={{ color: 'red' }}>Erreur : {purchasesError}</p>}

          {!purchasesLoading && !purchasesError && purchases.length === 0 && (
            <p>Vous n'avez aucun achat pour le moment.</p>
          )}

          {!purchasesLoading && !purchasesError && purchases.length > 0 && (
            <ul className="purchaseList">
              {purchases.map((purchase) => (
                <li key={purchase._id} className="purchaseItem">
                  {purchase.product ? (
                    <>
                      <p><strong>Produit :</strong> {purchase.product}</p>
                      <p><strong>Fournisseur :</strong> {purchase.supplier || 'Inconnu'}</p>
                      <p><strong>Quantité :</strong> {purchase.quantity}</p>
                      <p><strong>Prix :</strong> ${purchase.price?.toFixed(2)}</p>
                      <p><strong>Date :</strong> {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Commande multiple :</strong></p>
                      <ul>
  <li>
    Produit: {purchase.product} – Quantité: {purchase.quantity} – Prix: ${purchase.price?.toFixed(2)}
  </li>
</ul>

                      <p><strong>Total :</strong> ${purchase.total?.toFixed(2)}</p>
                      <p><strong>Date :</strong> {new Date(purchase.purchaseDate || purchase.date).toLocaleDateString()}</p>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default PurchasesTab;
