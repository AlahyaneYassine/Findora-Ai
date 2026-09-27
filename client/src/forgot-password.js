import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', isError: false });

    try {
      // Replace with your actual API endpoint
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      
      setMessage({ 
        text: 'Password reset link has been sent to your email!', 
        isError: false 
      });
      
      // Clear form
      setEmail('');
    } catch (err) {
      setMessage({
        text: err.response?.data?.msg || 'Failed to send reset link. Please try again later.',
        isError: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Animated Background Elements */}
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      
      {/* Navigation */}
      <nav style={styles.navbar}>
        <Link to="/forgot-password" style={styles.logoLink}>
          <div style={styles.logo}>Findora</div>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/home" style={styles.navLink}>Home</Link>
          <Link to="/how-it-works" style={styles.navLink}>How It Works</Link>
          <Link to="/features" style={styles.navLink}>Features</Link>
          <Link to="/about" style={styles.navLink}>About</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.forgotPasswordContainer}>
        <div 
          style={styles.forgotPasswordCard}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Header */}
          <div style={styles.forgotPasswordHeader}>
            <div style={styles.passwordIcon}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" 
                      stroke="#4e73df" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={styles.forgotPasswordHeaderH2}>Forgot Your Password?</h2>
            <p style={styles.forgotPasswordHeaderP}>
              Enter your email address below and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div style={{
              ...styles.messageAlert,
              backgroundColor: message.isError ? '#fff5f5' : '#f0fff4',
              color: message.isError ? '#c53030' : '#2f855a',
              border: message.isError ? '1px solid #fed7d7' : '1px solid #c6f6d5'
            }}>
              {message.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.forgotPasswordForm}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.inputGroupLabel}>Email Address</label>
              <div style={styles.inputWithIcon}>
                <svg style={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={styles.inputWithIconInput}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                ...styles.submitButton,
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 7px 14px rgba(78, 115, 223, 0.2)' : '0 4px 6px rgba(78, 115, 223, 0.1)'
              }}
              disabled={!email || loading}
            >
              {loading ? (
                <div style={styles.buttonContent}>
                  <div style={styles.buttonSpinner}></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <div style={styles.buttonContent}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.buttonIcon}>
                    <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Send Reset Link</span>
                </div>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div style={styles.backToLogin}>
            <Link to="/login" style={styles.backToLoginA}>
              <svg style={styles.arrowIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <div style={styles.logo}>Findora</div>
            <p style={styles.footerTagline}>The future of work, today</p>
          </div>
          
          <div style={styles.footerLinks}>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Product</h4>
              <Link to="/features" style={styles.footerLink}>Features</Link>
              <Link to="/demo" style={styles.footerLink}>Demo</Link>
            </div>
            
            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Company</h4>
              <Link to="/about" style={styles.footerLink}>About</Link>
              <Link to="/contact" style={styles.footerLink}>Contact</Link>
              <Link to="/faq" style={styles.footerLink}>Faq</Link>
            </div>
            
            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Legal</h4>
              <Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
              <Link to="/terms-of-service" style={styles.footerLink}>Terms of Service</Link>
              <Link to="/cookies-policy" style={styles.footerLink}>Cookies Policy</Link>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© {new Date().getFullYear()} Findora. All rights reserved.</p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink} aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4H20L14 10L21 20H15.5L11 13.5L6 20H2L8.5 12.5L2 4H8L12 10L16 4ZM15 18H16.5L5.5 6H4L15 18Z" 
                      stroke="#4B5563" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" style={styles.socialLink} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" style={styles.socialLink} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulseOverlay {
            0% { opacity: 0.7; }
            100% { opacity: 0.9; }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', sans-serif"
  },
  backgroundCircle1: {
    position: 'absolute',
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(156,163,175,0.1) 0%, rgba(156,163,175,0) 70%)',
    top: '-400px',
    right: '-400px',
    zIndex: 0
  },
  backgroundCircle2: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(156,163,175,0.1) 0%, rgba(156,163,175,0) 70%)',
    bottom: '-300px',
    left: '-300px',
    zIndex: 0
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
  },
  logoLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1F2937',
    background: 'linear-gradient(90deg, #4B5563, #1F2937)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  navLink: {
    color: '#4B5563',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#1F2937'
    }
  },
  forgotPasswordContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 80px)',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  forgotPasswordCard: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
    transform: 'translateY(0)',
    transition: 'all 0.3s ease'
  },
  forgotPasswordHeader: {
    marginBottom: '2rem'
  },
  passwordIcon: {
    width: '60px',
    height: '60px',
    color: '#4e73df',
    marginBottom: '1rem'
  },
  forgotPasswordHeaderH2: {
    fontSize: '1.8rem',
    color: '#2d3748',
    marginBottom: '0.5rem'
  },
  forgotPasswordHeaderP: {
    color: '#718096',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  },
  forgotPasswordForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    textAlign: 'left'
  },
  inputGroupLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#4a5568',
    fontWeight: '500',
    fontSize: '0.95rem'
  },
  inputWithIcon: {
    position: 'relative'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    color: '#a0aec0'
  },
  inputWithIconInput: {
    width: '100%',
    padding: '0.85rem 1rem 0.85rem 40px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8fafc',
    '&:focus': {
      outline: 'none',
      borderColor: '#4e73df',
      boxShadow: '0 0 0 3px rgba(78, 115, 223, 0.2)',
      backgroundColor: 'white'
    }
  },
  submitButton: {
    backgroundColor: '#4e73df',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '48px',
    '&:disabled': {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed',
      transform: 'none'
    }
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  buttonSpinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: 'white',
    animation: 'spin 1s ease-in-out infinite'
  },
  buttonIcon: {
    transition: 'transform 0.3s ease'
  },
  messageAlert: {
    padding: '1rem',
    borderRadius: '8px',
    marginTop: '1.5rem',
    fontSize: '0.95rem',
    textAlign: 'center'
  },
  backToLogin: {
    marginTop: '1.5rem'
  },
  backToLoginA: {
    color: '#4a5568',
    textDecoration: 'none',
    fontSize: '0.95rem',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#4e73df'
    }
  },
  arrowIcon: {
    width: '18px',
    height: '18px',
    marginRight: '0.5rem',
    transition: 'transform 0.3s ease'
  },
  footer: {
    backgroundColor: 'white',
    padding: '60px 40px 0',
    borderTop: '1px solid #E5E7EB'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
    paddingBottom: '60px'
  },
  footerLogo: {
    flex: 1,
    minWidth: '200px'
  },
  footerTagline: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '12px'
  },
  footerLinks: {
    display: 'flex',
    gap: '60px',
    flexWrap: 'wrap'
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: '150px'
  },
  footerHeading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px'
  },
  footerLink: {
    fontSize: '14px',
    color: '#6B7280',
    textDecoration: 'none',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#4e73df'
    }
  },
  footerBottom: {
    borderTop: '1px solid #E5E7EB',
    padding: '24px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  copyright: {
    fontSize: '14px',
    color: '#6B7280'
  },
  socialLinks: {
    display: 'flex',
    gap: '16px'
  },
  socialLink: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#E5E7EB'
    }
  }
};

export default ForgotPassword;