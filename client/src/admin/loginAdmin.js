import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        if (data.user?.role === 'admin') {
          login(data.token, data.user);
          navigate('/admin/dashboard');
        } else {
          setMessage({
            text: "Accès refusé : ce compte n'est pas un administrateur.",
            type: 'error'
          });
        }
      } else {
        setMessage({
          text: data.message || 'Erreur de connexion',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Erreur de requête', error);
      setMessage({
        text: 'Erreur de connexion au serveur',
        type: 'error'
      });
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
              style={styles.logo}
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <h1 style={styles.brandName}>AdminPanel</h1>
          </div>

          <h2 style={styles.title}>Administrator Login</h2>
          <p style={styles.subtitle}>Please enter your credentials to access the dashboard</p>

          {message.text && (
            <div style={{
              ...styles.message,
              backgroundColor: message.type === 'error' ? '#FEE2E2' : '#D1FAE5',
              color: message.type === 'error' ? '#B91C1C' : '#065F46'
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
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
                  name="email"
                  placeholder="admin@example.com"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputContainer}>
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
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.optionsContainer}>
              <div style={styles.rememberMe}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={credentials.rememberMe}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                <label htmlFor="rememberMe" style={styles.rememberLabel}>
                  Remember Me
                </label>
              </div>
              <a href="/forgot-password" style={styles.forgotPassword}>
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                backgroundColor: loading ? '#9CA3AF' : '#1F2937',
                backgroundImage: loading ? 'none' : 'linear-gradient(to right, #4B5563, #1F2937)'
              }}
            >
              <div style={styles.buttonContent}>
                {loading ? (
                  <div style={styles.spinner}></div>
                ) : (
                  <>
                    <span>Log In</span>
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
                  </>
                )}
              </div>
            </button>
          </form>

          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            
            <div style={styles.dividerLine}></div>
          </div>

          <div style={styles.googleButtonContainer}>
          
          </div>

          <p style={styles.signupText}>
            You are a standard user?{' '}
            <a
              href="/login"
              style={styles.signupLink}
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
            >
              Sign In Now
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
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

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
    transform: 'translateY(-50%)'
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
    '&:hover:not(:disabled)': {
      transform: 'translateY(-1px)',
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
  signupText: {
    fontSize: '14px',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: '24px'
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

export default LoginAdmin;