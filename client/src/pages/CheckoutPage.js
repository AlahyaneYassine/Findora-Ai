import React, { useState, useContext } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useSelection } from '../contexts/SelectionContext';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { AuthContext } from '../AuthContext';

const CheckoutPage = () => {
  const { token } = useContext(AuthContext);
  const { productUrl } = useParams();
  const navigate = useNavigate();
  const { selectedProducts, setSelectedProducts } = useSelection();


 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const product = selectedProducts.find(p => p.product_url === decodeURIComponent(productUrl));

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const price = Number(product.price);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Formatage automatique pour les champs spécifiques
    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      if (value.length === 2 && !value.includes('/')) {
        formattedValue = value + '/';
      } else {
        formattedValue = value;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateInputs = () => {
    const newErrors = {};
    const { firstName, lastName, address, city, phone, email, cardName, cardNumber, expiry, cvv } = formData;

    if (!firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!lastName.trim()) newErrors.lastName = "Nom requis";
    if (!address.trim()) newErrors.address = "Adresse requise";
    if (!city.trim()) newErrors.city = "Ville requise";
    
    if (!phone.trim()) {
      newErrors.phone = "Téléphone requis";
    } else if (!/^[\d\s+-]{10,15}$/.test(phone)) {
      newErrors.phone = "Téléphone invalide";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email invalide";
    }

    if (!cardName.trim()) newErrors.cardName = "Nom sur carte requis";
    
    const cleanedCardNumber = cardNumber.replace(/\s+/g, '');
    if (!cleanedCardNumber) {
      newErrors.cardNumber = "Numéro de carte requis";
    } else if (!/^\d{16}$/.test(cleanedCardNumber)) {
      newErrors.cardNumber = "16 chiffres requis";
    }

    if (!expiry) {
      newErrors.expiry = "Date requise";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Format MM/YY";
    } else {
      const [monthStr, yearStr] = expiry.split('/');
      const month = parseInt(monthStr, 10);
      const year = 2000 + parseInt(yearStr, 10);
      const now = new Date();
      const expiryDate = new Date(year, month, 1);

      if (expiryDate < now) {
        newErrors.expiry = "Carte expirée";
      }
    }

    if (!cvv) {
      newErrors.cvv = "CVV requis";
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "3 ou 4 chiffres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const generatePDF = () => {
  const doc = new jsPDF();
  
  // En-tête
  doc.setFontSize(20);
  doc.setTextColor(40, 53, 147);
  doc.setFont('helvetica', 'bold');
  doc.text('Confirmation de commande', 105, 20, { align: 'center' });
  
  // Informations client
  doc.setFontSize(12);
  doc.setTextColor(33, 33, 33);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 15, 40);
  doc.text(`Référence: CMD-${Date.now().toString().slice(-6)}`, 15, 48);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Informations client', 15, 65);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nom: ${formData.firstName} ${formData.lastName}`, 15, 75);
  doc.text(`Adresse: ${formData.address}, ${formData.city}`, 15, 83);
  doc.text(`Contact: ${formData.phone} | ${formData.email}`, 15, 91);
  
  // Détails commande
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Détails de la commande', 15, 105);
  
  const productData = [
    ['Produit', product.name],
    ['Référence', product.id || 'N/A'],
    ['Fournisseur', product.supplier],
    ['Prix', product.price],
    ['Date livraison estimée', new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')]
  ];
  
  doc.autoTable({
    startY: 110,
    headStyles: { 
      fillColor: [40, 53, 147], 
      textColor: 255,
      fontStyle: 'bold'
    },
    body: productData,
    margin: { left: 15 },
    styles: { 
      cellPadding: 5, 
      fontSize: 10,
      valign: 'middle'
    },
    columnStyles: {
      0: { fontStyle: 'bold' }
    }
  });

  // Position dynamique après le tableau
  const finalY = doc.lastAutoTable.finalY + 15;

  // Informations de livraison
  doc.setFontSize(11);
  doc.setTextColor(40, 53, 147);
  doc.setFont('helvetica', 'bold');
  doc.text('Informations de livraison:', 15, finalY);
  
  doc.setFontSize(10);
  doc.setTextColor(33, 33, 33);
  doc.setFont('helvetica', 'normal');
  doc.text('- Livraison prévue sous 4 à 5 jours ouvrables', 20, finalY + 8);
  doc.text('- En cas de non-livraison, remboursement sous 48h', 20, finalY + 16);
  
  // Pied de page
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Merci pour votre confiance !', 105, finalY + 30, { align: 'center' });
  doc.text('Pour toute question, contactez notre service client au 01 23 45 67 89', 105, finalY + 38, { align: 'center' });
  
  doc.save(`Facture_${formData.lastName}_${product.name.substring(0, 15)}.pdf`);
};

  const handleConfirm = async (e) => {
  e.preventDefault();

  if (!validateInputs()) return;

  setLoading(true);

  try {
    // 1. Envoi de l'achat au backend
    const purchaseData = {
      product: product.name,
      supplier: product.supplier,
      purchaseDate: new Date().toISOString(),
      quantity: 1,
      price: Number(product.price), // ici la conversion est importante
      customer: formData,
    };
console.log('💸 Données envoyées à l’API:', purchaseData);

    await fetch('/api/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // si tu utilises un token
      },
      body: JSON.stringify(purchaseData),
    });

    // 2. Pause pour simuler délai (optionnel)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. Génération PDF
    generatePDF();

    // 4. Nettoyage et navigation
    setTimeout(() => {
      setSelectedProducts(prev => prev.filter(p => p.product_url !== product.product_url));

      navigate('/selected-products', {
        state: {
          orderId: `CMD-${Date.now().toString().slice(-6)}`,
          product,
          customer: formData,
        },
      });
    }, 1000);

  } catch (error) {
    console.error("Erreur lors du traitement", error);
    alert('Erreur lors de l\'enregistrement de l\'achat, veuillez réessayer.');
  } finally {
    setLoading(false);
  }
};


  // Styles CSS
  const styles = `
    .checkout-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .checkout-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .checkout-back-button {
      margin-right: 1rem;
      color: #2563eb;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .checkout-back-button:hover {
      color: #1e40af;
      text-decoration: underline;
    }

    .checkout-title {
      font-size: 1.875rem;
      font-weight: 700;
      color: #1f2937;
    }

    .checkout-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 1024px) {
      .checkout-grid {
        grid-template-columns: 2fr 1fr;
      }
    }

    .product-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .product-card {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .product-card-content {
      padding: 1.5rem;
    }

    .product-card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .product-display {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    @media (min-width: 640px) {
      .product-display {
        flex-direction: row;
      }
    }

    .product-image {
      width: 100%;
      height: 8rem;
      object-fit: cover;
      border-radius: 0.5rem;
    }

    @media (min-width: 640px) {
      .product-image {
        width: 8rem;
      }
    }

    .product-info {
      flex: 1;
    }

    .product-name {
      font-size: 1.125rem;
      font-weight: 500;
      color: #111827;
    }

    .product-supplier {
      color: #4b5563;
    }

    .product-price {
      color: #111827;
      font-weight: 600;
      margin-top: 0.5rem;
    }

    .checkout-form {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media (min-width: 768px) {
      .form-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .required-field {
      color: #ef4444;
    }

    .form-input {
      width: 100%;
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      outline: none;
      transition: all 0.2s ease;
    }

    .form-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }

    .form-input-error {
      border-color: #ef4444;
    }

    .error-message {
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: #ef4444;
    }

    .payment-section {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
    }

    .payment-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    .payment-icons {
      display: flex;
      gap: 0.5rem;
      margin-right: 1rem;
    }

    .payment-icon {
      width: 2rem;
      height: 1.25rem;
      background: #e5e7eb;
      border-radius: 0.125rem;
    }

    .payment-secure-text {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .summary-section {
      position: relative;
    }

    .summary-card {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    @media (min-width: 1024px) {
      .summary-card {
        position: sticky;
        top: 1.5rem;
      }
    }

    .summary-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .summary-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }

    .summary-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
    }

    .summary-label {
      color: #6b7280;
    }

    .summary-value {
      font-weight: 500;
    }

    .summary-total-label {
      font-size: 1.125rem;
      font-weight: 600;
    }

    .summary-total-value {
      font-size: 1.125rem;
      font-weight: 700;
      color: #2563eb;
    }

    .summary-footer {
      padding: 1.5rem;
      background: #f9fafb;
    }

    .pay-button {
      width: 100%;
      padding: 0.75rem 1rem;
      background: #2563eb;
      color: white;
      font-weight: 500;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pay-button:hover {
      background: #1d4ed8;
    }

    .pay-button-disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .spinner {
      animation: spin 1s linear infinite;
      margin-right: 0.75rem;
      width: 1.25rem;
      height: 1.25rem;
      color: white;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .terms-text {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      color: #6b7280;
      text-align: center;
    }

    .security-info {
      margin-top: 1.5rem;
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      padding: 1.5rem;
    }

    .security-title {
      font-weight: 500;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .security-text {
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 1rem;
    }

    .security-icons {
      display: flex;
      gap: 1rem;
    }

    .security-icon {
      width: 2.5rem;
      height: 1.5rem;
      background: #e5e7eb;
      border-radius: 0.25rem;
    }

    .not-found-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .not-found-card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      text-align: center;
      max-width: 28rem;
      margin: 0 auto;
    }

    .not-found-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .not-found-text {
      color: #6b7280;
    }

    .not-found-button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: #2563eb;
      color: white;
      font-weight: 500;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .not-found-button:hover {
      background: #1d4ed8;
    }
  `;

  if (!product) {
    return (
      <>
        <style>{styles}</style>
        <div className="not-found-container">
          <div className="not-found-card">
            <h2 className="not-found-title">Produit introuvable</h2>
            <p className="not-found-text">Le produit que vous essayez d'acheter n'est pas disponible.</p>
            <button 
              onClick={() => navigate('/selected-products')}
              className="not-found-button"
            >
              Retour aux produits
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="checkout-container">
        <div className="checkout-header">
          <button 
            onClick={() => navigate(-1)}
            className="checkout-back-button"
          >
            &larr; Retour
          </button>
          <h1 className="checkout-title">Finalisation de la commande</h1>
        </div>

        <div className="checkout-grid">
          {/* Section produit */}
          <div className="product-section">
            <div className="product-card">
              <div className="product-card-content">
                <h2 className="product-card-title">Votre commande</h2>
                <div className="product-display">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-supplier">{product.supplier}</p>
                    <p className="product-price">{product.price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleConfirm} className="checkout-form">
              <h2 className="section-title">Informations personnelles</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    Prénom <span className="required-field">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
                    placeholder="Votre prénom"
                  />
                  {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Nom <span className="required-field">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
                    placeholder="Votre nom"
                  />
                  {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Adresse <span className="required-field">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`form-input ${errors.address ? 'form-input-error' : ''}`}
                  placeholder="Adresse postale"
                />
                {errors.address && <p className="error-message">{errors.address}</p>}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    Ville <span className="required-field">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`form-input ${errors.city ? 'form-input-error' : ''}`}
                    placeholder="Votre ville"
                  />
                  {errors.city && <p className="error-message">{errors.city}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Téléphone <span className="required-field">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                    placeholder="06 12 34 56 78"
                  />
                  {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="required-field">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder="votre@email.com"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <h2 className="section-title" style={{ paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>Paiement sécurisé</h2>
              <div className="payment-section">
                <div className="payment-header">
                  <div className="payment-icons">
                    <div className="payment-icon"></div>
                    <div className="payment-icon"></div>
                  </div>
                  <span className="payment-secure-text">Paiement 100% sécurisé</span>
                </div>

                <div className="form-group">
                  <label htmlFor="cardName" className="form-label">
                    Nom sur la carte <span className="required-field">*</span>
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={`form-input ${errors.cardName ? 'form-input-error' : ''}`}
                    placeholder="Nom tel qu'affiché sur la carte"
                  />
                  {errors.cardName && <p className="error-message">{errors.cardName}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber" className="form-label">
                    Numéro de carte <span className="required-field">*</span>
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    maxLength="19"
                    className={`form-input ${errors.cardNumber ? 'form-input-error' : ''}`}
                    placeholder="0000 0000 0000 0000"
                  />
                  {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="expiry" className="form-label">
                      Date d'expiration <span className="required-field">*</span>
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      maxLength="5"
                      className={`form-input ${errors.expiry ? 'form-input-error' : ''}`}
                      placeholder="MM/AA"
                    />
                    {errors.expiry && <p className="error-message">{errors.expiry}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cvv" className="form-label">
                      CVV <span className="required-field">*</span>
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      maxLength="4"
                      className={`form-input ${errors.cvv ? 'form-input-error' : ''}`}
                      placeholder="123"
                    />
                    {errors.cvv && <p className="error-message">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Récapitulatif */}
          <div className="summary-section">
            <div className="summary-card">
              <div className="summary-header">
                <h2 className="summary-title">Récapitulatif</h2>
              </div>
              
              <div className="summary-content">
                <div className="summary-row">
                  <span className="summary-label">Produit</span>
                  <span className="summary-value">{product.name}</span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">Prix</span>
                  <span className="summary-value">{product.price}</span>
                </div>
                
                <div className="summary-row" style={{ paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                  <span className="summary-label">Livraison</span>
                  <span className="summary-value">Gratuite</span>
                </div>
                
                <div className="summary-row" style={{ paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                  <span className="summary-total-label">Total</span>
                  <span className="summary-total-value">{product.price}</span>
                </div>
              </div>
              
              <div className="summary-footer">
                <button
                  type="submit"
                  onClick={handleConfirm}
                  disabled={loading}
                  className={`pay-button ${loading ? 'pay-button-disabled' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }}></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style={{ opacity: 0.75 }}></path>
                      </svg>
                      Traitement en cours...
                    </>
                  ) : (
                    `Payer ${product.price}`
                  )}
                </button>
                
                <p className="terms-text">
                  En cliquant sur "Payer", vous acceptez nos conditions générales de vente.
                </p>
              </div>
            </div>
            
            <div className="security-info">
              <h3 className="security-title">Paiement sécurisé</h3>
              <p className="security-text">
                Toutes vos informations sont cryptées et transmises de manière sécurisée via un protocole SSL.
              </p>
              <div className="security-icons">
                <div className="security-icon"></div>
                <div className="security-icon"></div>
                <div className="security-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;