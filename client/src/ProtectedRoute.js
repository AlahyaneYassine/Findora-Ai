import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <div className="spinner"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
console.log('ProtectedRoute: user.role =', user?.role, 'adminOnly =', adminOnly);
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default ProtectedRoute;
