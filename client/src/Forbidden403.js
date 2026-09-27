import React from 'react';

const Forbidden403 = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🚫 403 - Accès refusé</h1>
      <p>Tu n’as pas les droits pour accéder à cette page.</p>
      <a href="/home" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Retour à l'accueil
      </a>
    </div>
  );
};

export default Forbidden403;
