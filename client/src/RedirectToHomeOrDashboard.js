import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const RedirectToHomeOrDashboard = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) return <p>Chargement...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si admin, vers dashboard, sinon home
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/home" replace />;
};

export default RedirectToHomeOrDashboard;
