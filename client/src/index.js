import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

import { AuthProvider } from './AuthContext';
import { SelectionProvider } from './contexts/SelectionContext';

// Set axios base URL globally
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SelectionProvider>
        <App />
      </SelectionProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
