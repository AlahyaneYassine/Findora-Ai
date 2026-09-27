import React, { useState, useContext } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', isError: false });

    if (!formData.email || !formData.password) {
      setMessage({ text: 'Veuillez remplir tous les champs', isError: true });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      setMessage({ text: 'Connexion réussie ! Redirection en cours...', isError: false });

      const { token, user } = res.data;
      login(token, rememberMe, user);

      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.msg || 'Échec de la connexion. Veuillez réessayer.',
        isError: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setMessage({ text: '', isError: false });

    try {
      const tokenGoogle = credentialResponse.credential;

      if (!tokenGoogle) {
        setMessage({ text: 'Token Google manquant', isError: true });
        setLoading(false);
        return;
      }

      const res = await axios.post('http://localhost:5000/api/auth/google-login', { token: tokenGoogle });
      const { token, user } = res.data;

      login(token, true, user);
      setMessage({ text: 'Connexion Google réussie ! Redirection en cours...', isError: false });

      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.msg || 'Échec de la connexion Google. Veuillez réessayer.',
        isError: true 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>

      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.logoContainer}>
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              style={styles.logo}
            >
              <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 style={styles.brandName}>Findora</h1>
          </div>

          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Log in to continue</p>

          {message.text && (
            <div style={{
              ...styles.message,
              backgroundColor: message.isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              borderLeft: `4px solid ${message.isError ? '#EF4444' : '#10B981'}`,
              color: message.isError ? '#B91C1C' : '#065F46'
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <div style={styles.inputContainer}>
                <svg
                  style={styles.inputIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B7280"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your@email.com"
                  style={styles.input}
                  disabled={loading}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={{ ...styles.inputContainer, position: 'relative' }}>
                <svg
                  style={styles.inputIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B7280"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={styles.input}
                  disabled={loading}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a17.33 17.33 0 0 1 2.4-3.06"/>
                      <path d="M1 1l22 22"/>
                      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24"/>
                      <path d="M14.12 14.12L12 12"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div style={styles.optionsContainer}>
              <div style={styles.rememberMe}>
                <input 
                  type="checkbox" 
                  id="remember" 
                  style={styles.checkbox} 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                />
                <label htmlFor="remember" style={styles.rememberLabel}>Remember Me</label>
              </div>
              <Link to="/forgot-password" style={styles.forgotPassword}>Forgot your password?</Link>
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                backgroundColor: loading ? '#9CA3AF' : '#4B5563',
                backgroundImage: loading ? 'none' : 'linear-gradient(to right, #4B5563, #1F2937)',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              disabled={!formData.email || !formData.password || loading}
            >
              {loading ? (
                <span style={styles.buttonContent}>
                  <span style={styles.spinner}></span>
                  <span>Connexion...</span>
                </span>
              ) : (
                <span style={styles.buttonContent}>
                  <span>Log in</span>
                  <svg
                    style={styles.buttonIcon}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              )}
            </button>
          </form>

          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>OR</span>
            <div style={styles.dividerLine}></div>
          </div>

          <div style={styles.googleButtonContainer}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setMessage({ text: 'Google login failed', isError: true });
              }}
              shape="pill"
              size="large"
              width="300px"
              theme="filled_blue"
              text="continue_with"
              locale="fr"
            />
          </div>

          <div style={styles.adminSection}>
            <p style={styles.adminText}>Are you an administrator?</p>
            <button
              type="button"
              onClick={() => navigate('/admin/login')}
              style={styles.adminButton}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
               Access the admin portal
            </button>
          </div>

          <p style={styles.signupText}>
            You don’t have an account? {' '}
            <Link to="/signup" style={styles.signupLink}>
             Sign Up Now
              <svg
                style={styles.signupIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
    position: 'relative',
    overflow: 'hidden'
  },
  backgroundCircle1: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(156,163,175,0.1) 0%, rgba(156,163,175,0) 70%)',
    top: '-300px',
    right: '-300px',
    zIndex: 0
  },
  backgroundCircle2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(156,163,175,0.1) 0%, rgba(156,163,175,0) 70%)',
    bottom: '-200px',
    left: '-200px',
    zIndex: 0
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    position: 'relative',
    zIndex: 1
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    gap: '12px'
  },
  logo: {
    color: '#4B5563',
    animation: 'float 3s ease-in-out infinite'
  },
  brandName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1F2937',
    margin: 0
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#111827',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #4B5563, #1F2937)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '32px',
    textAlign: 'center',
    fontWeight: '500'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginLeft: '4px'
  },
  inputContainer: {
    position: 'relative'
  },
  input: {
    padding: '14px 14px 14px 42px',
    borderRadius: '10px',
    border: '1px solid #E5E7EB',
    fontSize: '15px',
    width: '100%',
    backgroundColor: '#F9FAFB',
    transition: 'all 0.3s ease',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
    '&:focus': {
      borderColor: '#4B5563',
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(75, 85, 99, 0.1)'
    }
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6B7280'
  },
  optionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-8px'
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    accentColor: '#6B7280',
    cursor: 'pointer'
  },
  rememberLabel: {
    fontSize: '13px',
    color: '#6B7280',
    cursor: 'pointer'
  },
  forgotPassword: {
    fontSize: '13px',
    color: '#6B7280',
    textDecoration: 'none',
    transition: 'color 0.2s',
    fontWeight: '500',
    '&:hover': {
      color: '#1F2937'
    }
  },
  button: {
    padding: '16px',
    borderRadius: '10px',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    marginTop: '8px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    '&:hover:not(:disabled)': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.1)'
    },
    '&:active:not(:disabled)': {
      transform: 'translateY(0)'
    }
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  buttonIcon: {
    transition: 'transform 0.3s ease'
  },
  spinner: {
    display: 'inline-block',
    width: '18px',
    height: '18px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTopColor: 'white',
    animation: 'spin 1s ease-in-out infinite'
  },
  message: {
    padding: '14px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '20px 0'
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#E5E7EB'
  },
  dividerText: {
    fontSize: '12px',
    color: '#9CA3AF',
    fontWeight: '500'
  },
  googleButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  adminSection: {
    margin: '24px 0',
    textAlign: 'center',
    padding: '16px',
    backgroundColor: 'rgba(30, 64, 175, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(30, 64, 175, 0.1)'
  },
  adminText: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '8px'
  },
  adminButton: {
    padding: '12px 16px',
    borderRadius: '8px',
    backgroundColor: '#1E40AF',
    backgroundImage: 'linear-gradient(to right, #1E40AF, #1E3A8A)',
    color: 'white',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    '&:active': {
      transform: 'translateY(0)'
    }
  },
  signupText: {
    fontSize: '14px',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: '16px'
  },
  signupLink: {
    color: '#4B5563',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    '&:hover': {
      color: '#1F2937',
      '& svg': {
        transform: 'translateX(3px)'
      }
    }
  },
  signupIcon: {
    transition: 'transform 0.2s ease'
  }
};

// Ajout des animations globales
const styleElement = document.createElement('style');
styleElement.innerHTML = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleElement);

export default Login;