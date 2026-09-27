import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Doit contenir le user complet avec son rôle !

  useEffect(() => {
    // Déclaration des variables avant usage
    const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

    console.log('AuthProvider init: token:', savedToken);
    console.log('AuthProvider init: user:', savedUser ? JSON.parse(savedUser) : null);

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setLoading(false);
    } else if (savedToken) {
      // fallback : fetch si user pas en cache
      setToken(savedToken);
      setIsAuthenticated(true);

      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load user');
          return res.json();
        })
        .then((userData) => {
          setUser(userData);
          setLoading(false);
        })
        .catch(() => {
          setToken(null);
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newToken, rememberMe = false, userData = null) => {
    if (rememberMe) {
      localStorage.setItem('token', newToken);
      if (userData) localStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('token', newToken);
      if (userData) sessionStorage.setItem('user', JSON.stringify(userData));
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    setToken(newToken);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
