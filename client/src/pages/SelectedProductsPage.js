import React from 'react';
import { useSelection } from '../contexts/SelectionContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', Roboto, sans-serif;
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6c757d;
  font-size: 1.1rem;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background-color: #3498db;
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const RemoveButton = styled(ActionButton)`
  background-color: #e74c3c;
  color: white;
  margin-right: 0.5rem;

  &:hover {
    background-color: #c0392b;
  }
`;

const BuyButton = styled(ActionButton)`
  background-color: #2ecc71;
  color: white;

  &:hover {
    background-color: #27ae60;
  }
`;

const SelectedProductsPage = () => {
  const { selectedProducts, setSelectedProducts } = useSelection();
  const navigate = useNavigate();

  const handleRemove = (productUrl) => {
    setSelectedProducts(prev => prev.filter(p => p.product_url !== productUrl));
  };

  const handleBuy = (productUrl) => {
    navigate(`/checkout/${encodeURIComponent(productUrl)}`);
  };

  if (selectedProducts.length === 0) {
    return (
      <EmptyState>
        Aucun produit sélectionné.
      </EmptyState>
    );
  }

  return (
    <PageContainer>
      <Title>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Produits sélectionnés
      </Title>
      
      <ProductsTable>
        <TableHeader>
          <tr>
            <TableHeaderCell>Image</TableHeaderCell>
            <TableHeaderCell>Nom</TableHeaderCell>
            <TableHeaderCell>Prix</TableHeaderCell>
            <TableHeaderCell>Fournisseur</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {selectedProducts.map(product => (
            <TableRow key={product.product_url}>
              <TableCell>
                <ProductImage
                  src={product.image_url}
                  alt={product.name}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price} €</TableCell>
              <TableCell>{product.supplier}</TableCell>
              <TableCell>
                <RemoveButton onClick={() => handleRemove(product.product_url)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Désélectionner
                </RemoveButton>
                <BuyButton onClick={() => handleBuy(product.product_url)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Acheter
                </BuyButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </ProductsTable>
    </PageContainer>
  );
};

export default SelectedProductsPage;