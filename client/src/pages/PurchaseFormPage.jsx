import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelection } from '../contexts/SelectionContext';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Roboto, sans-serif;
  color: #2d3748;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const FormCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h3`
  color: #4a5568;
  border-bottom: 2px solid #edf2f7;
  padding-bottom: 0.5rem;
  margin: 1.5rem 0 1rem;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const InputGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9375rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const ErrorText = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const PrimaryButton = styled(Button)`
  background: #4299e1;
  color: white;
  
  &:hover {
    background: #3182ce;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(Button)`
  background: #edf2f7;
  color: #4a5568;
  
  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    max-height: 200px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  margin: 0;
  color: #2d3748;
  font-size: 1.125rem;
  font-weight: 600;
`;

const ProductSupplier = styled.p`
  margin: 0.25rem 0;
  color: #718096;
  font-size: 0.9375rem;
`;

const ProductPrice = styled.p`
  margin: 0;
  font-weight: 700;
  color: #2b6cb0;
  font-size: 1.125rem;
`;

const SuccessCard = styled(motion.div)`
  background: #f0fff4;
  border: 1px solid #c6f6d5;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const SuccessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h3`
  margin: 0;
  color: #2f855a;
  font-size: 1.5rem;
  font-weight: 600;
`;

const SuccessMessage = styled.p`
  margin-bottom: 1.5rem;
  color: #4a5568;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PageTitle = styled(motion.h2)`
  color: #2d3748;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.75rem;
  font-weight: 600;
`;

const PurchaseFormPage = () => {
  const { productUrl } = useParams();
  const { selectedProducts, removeProduct } = useSelection();
  const navigate = useNavigate();

  const product = selectedProducts.find(p => p.product_url === decodeURIComponent(productUrl));

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  if (!product) {
    return (
      <Container>
        <div style={{ padding: '1.5rem', background: '#fff5f5', borderRadius: '12px', color: '#e53e3e' }}>
          ❌ Produit introuvable ou déjà acheté.
        </div>
      </Container>
    );
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setForm({ ...form, expiry: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Nom complet requis';
    if (!form.address.trim()) newErrors.address = 'Adresse requise';
    if (!form.city.trim()) newErrors.city = 'Ville requise';
    if (!form.phone.match(/^0[1-9]\d{8}$/)) newErrors.phone = 'Téléphone invalide (ex: 0612345678)';

    if (!form.cardName.trim()) newErrors.cardName = 'Nom sur la carte requis';
    if (!form.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = 'Numéro invalide (16 chiffres requis)';

    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = 'Format MM/YY requis';
    } else {
      const [monthStr, yearStr] = form.expiry.split('/');
      const month = parseInt(monthStr, 10);
      const year = parseInt(yearStr, 10);
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear() % 100;

      if (month < 1 || month > 12) {
        newErrors.expiry = 'Mois invalide';
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = 'Date expirée';
      }
    }

    if (!form.cvv.match(/^\d{3}$/)) newErrors.cvv = 'CVV invalide (3 chiffres requis)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // En-tête avec logo
    doc.setFillColor(66, 153, 225);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text('Confirmation de Commande', 105, 20, { align: 'center' });
    
    // Contenu
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    doc.setFont(undefined, 'bold');
    doc.text('Informations Client :', 20, 50);
    doc.setFont(undefined, 'normal');
    doc.text(`Nom complet : ${form.fullName}`, 20, 60);
    doc.text(`Adresse : ${form.address}`, 20, 70);
    doc.text(`Ville : ${form.city}`, 20, 80);
    doc.text(`Téléphone : ${form.phone}`, 20, 90);
    
    doc.setFont(undefined, 'bold');
    doc.text('Détails de la Commande :', 20, 110);
    doc.setFont(undefined, 'normal');
    doc.text(`Produit : ${product.name}`, 20, 120);
    doc.text(`Fournisseur : ${product.supplier}`, 20, 130);
    doc.text(`Prix : ${product.price} €`, 20, 140);
    
    // Pied de page
    doc.setFont(undefined, 'bold');
    doc.text('Informations Importantes :', 20, 160);
    doc.setFont(undefined, 'normal');
    doc.text('📦 Votre commande a été transmise au fournisseur.', 20, 170);
    doc.text('🚚 Livraison prévue sous 4 à 5 jours ouvrables.', 20, 180);
    doc.text('❗ En cas de non livraison, la commande sera annulée et vous serez remboursé sous 48h.', 20, 190);
    
    // Numéro de commande
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Numéro de commande : ${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 20, 280);

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  const handleConfirm = async () => {
  if (!validate()) return;

  try {
    // Envoi POST vers API backend pour enregistrer l'achat
    const response = await fetch('http://localhost:5000/api/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // ou d’où tu stockes ton token
      },
      body: JSON.stringify({
        product: product.name,     // selon ce que ton backend attend, ici nom produit
        supplier: product.supplier,
        quantity: 1,
        price: product.price
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la création de l\'achat');
    }

    const data = await response.json();

    // Suppression produit, génération PDF, succès comme avant
    removeProduct(product.product_url);
    generatePDF();
    setIsSuccess(true);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 300);

  } catch (error) {
    alert('Erreur : ' + error.message);
  }
};


  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container>
      <PageTitle 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z" stroke="#4299e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Finalisation de votre commande
      </PageTitle>

      <ProductCard>
        {product.image && <ProductImage src={product.image} alt={product.name} />}
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductSupplier>{product.supplier}</ProductSupplier>
          <ProductPrice>{product.price} €</ProductPrice>
        </ProductInfo>
      </ProductCard>

      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <SectionTitle>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#4a5568" strokeWidth="2"/>
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#4a5568" strokeWidth="2"/>
          </svg>
          Informations personnelles
        </SectionTitle>

        <InputGroup>
          <Label>Nom complet</Label>
          <Input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Jean Dupont" />
          {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Adresse</Label>
          <Input type="text" name="address" value={form.address} onChange={handleChange} placeholder="123 Rue de la République" />
          {errors.address && <ErrorText>{errors.address}</ErrorText>}
        </InputGroup>

        <FormGrid>
          <InputGroup>
            <Label>Ville</Label>
            <Input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Paris" />
            {errors.city && <ErrorText>{errors.city}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Téléphone</Label>
            <Input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="0612345678" />
            {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
          </InputGroup>
        </FormGrid>

        <SectionTitle>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 10H21M7 15H8M12 15H13M6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19Z" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Paiement sécurisé
        </SectionTitle>

        <InputGroup>
          <Label>Nom sur la carte</Label>
          <Input type="text" name="cardName" value={form.cardName} onChange={handleChange} placeholder="JEAN DUPONT" />
          {errors.cardName && <ErrorText>{errors.cardName}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Numéro de carte</Label>
          <Input 
            type="text" 
            name="cardNumber" 
            value={form.cardNumber} 
            onChange={handleChange} 
            placeholder="1234 5678 9012 3456" 
            maxLength={16}
          />
          {errors.cardNumber && <ErrorText>{errors.cardNumber}</ErrorText>}
        </InputGroup>

        <FormGrid>
          <InputGroup>
            <Label>Date d'expiration (MM/AA)</Label>
            <Input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleExpiryChange}
              placeholder="MM/AA"
              maxLength={5}
            />
            {errors.expiry && <ErrorText>{errors.expiry}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>CVV</Label>
            <Input 
              type="text" 
              name="cvv" 
              value={form.cvv} 
              onChange={handleChange} 
              placeholder="123" 
              maxLength={3}
            />
            {errors.cvv && <ErrorText>{errors.cvv}</ErrorText>}
          </InputGroup>
        </FormGrid>

        <ButtonGroup style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
          <SecondaryButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCancel}
          >
            Annuler
          </SecondaryButton>
          <PrimaryButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm}
          >
            Confirmer l'achat
          </PrimaryButton>
        </ButtonGroup>
      </FormCard>

      {isSuccess && (
        <SuccessCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <SuccessHeader>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.86" stroke="#38a169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 4L12 14.01L9 11.01" stroke="#38a169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <SuccessTitle>Commande confirmée !</SuccessTitle>
          </SuccessHeader>
          
          <SuccessMessage>
            Merci pour votre achat ! Votre commande a été enregistrée avec succès.
          </SuccessMessage>
          
          <ButtonGroup>
            <PrimaryButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(pdfUrl, '_blank')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15V3M12 15L8 11M12 15L16 11M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voir le reçu
            </PrimaryButton>
            
            <SecondaryButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </SecondaryButton>
          </ButtonGroup>
        </SuccessCard>
      )}
    </Container>
  );
};

export default PurchaseFormPage;