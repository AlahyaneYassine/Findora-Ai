// PublicRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // If authenticated, redirect to /home (or any protected page)
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
