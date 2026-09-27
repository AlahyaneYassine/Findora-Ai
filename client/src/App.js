import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contexts
import { AuthProvider } from './AuthContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { SelectionProvider } from './contexts/SelectionContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResetPassword from './pages/ResetPassword';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Auth Pages
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './forgot-password';

// Public Pages
import About from './About';
import Contact from './Contact';
import HowItWorks from './how-it-works';
import Features from './features';

import FAQ from './Faq';
import PrivacyPolicy from './Privacy-policy';
import Forbidden403 from './Forbidden403';
import RedirectToHomeOrDashboard from './RedirectToHomeOrDashboard';

// Categories
import Products from './Searching/products';



// Protected Pages
import Home from './Home';
import Profile from './Profile';
import PurchasesPage from './PurchasesPage';
import SearchPage from './components/SearchPage';
import SelectedProductsPage from './pages/SelectedProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import PurchaseFormPage from './pages/PurchaseFormPage';

// Admin Pages
import AdminDashboard from './admin/AdminDashboard';
import UserManagement from './admin/UserManagement';
import ContactMessages from './admin/ContactMessages';
import LoginAdmin from './admin/loginAdmin';  // <-- Import du Login Admin

// 🔐 Ton CLIENT_ID Google OAuth ici :
const GOOGLE_CLIENT_ID = '34414413926-qv1qk7k9r2mhb3otb5j5td4rchn7k4mr.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <SelectionProvider>
            <ProductsProvider>
              <Routes>
                <Route path="/" element={<RedirectToHomeOrDashboard />} />

                {/* Auth Routes */}
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                <Route path="/403" element={<Forbidden403 />} />
                
                {/* Admin Login Route */}
                <Route path="/admin/login" element={<PublicRoute><LoginAdmin /></PublicRoute>} />

                {/* Public Static Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/features" element={<Features />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                {/* Categories */}
                <Route path="/searching/products" element={<Products />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                
                {/* Product Selection Pages */}
                <Route path="/selected-products" element={<SelectedProductsPage />} />
                <Route path="/checkout/:productUrl" element={<CheckoutPage />} />
                <Route path="/checkout/:productUrl/form" element={<PurchaseFormPage />} />

                {/* Protected User Pages */}
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/purchases" element={<ProtectedRoute><PurchasesPage /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>} />
                <Route path="/admin/messages" element={<ProtectedRoute adminOnly><ContactMessages /></ProtectedRoute>} />
              </Routes>
            </ProductsProvider>
          </SelectionProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
