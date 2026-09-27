import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isHovered, setIsHovered] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      let strength = 0;
      if (value.length > 0) strength += 1;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', isError: false });

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ text: 'Please fill in all fields', isError: true });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match', isError: true });
      setLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      setMessage({ text: 'Password is too weak', isError: true });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email: formData.email,
        password: formData.password
      });
      
      setMessage({ 
        text: 'Account created successfully! Redirecting to login...', 
        isError: false 
      });
      
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage({
        text: err.response?.data?.msg || 'Registration failed. Please try again.',
        isError: true
      });
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setMessage({ text: '', isError: false });

    try {
      const tokenGoogle = credentialResponse.credential;

      const res = await axios.post('http://localhost:5000/api/auth/google-signup', { token: tokenGoogle });
      const { token, user } = res.data;

      // Assuming you have a login function in your auth context
      // login(token, true, user);
      
      setMessage({ text: 'Google signup successful! Redirecting...', isError: false });
      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.msg || 'Google signup failed. Please try again.',
        isError: true 
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 0: return '#E5E7EB'; // gray-200
      case 1: return '#EF4444'; // red-500
      case 2: return '#F59E0B'; // yellow-500
      case 3: return '#3B82F6'; // blue-500
      case 4: return '#10B981'; // green-500
      case 5: return '#059669'; // green-600
      default: return '#E5E7EB';
    }
  };

  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 0: return '';
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Moderate';
      case 4: return 'Strong';
      case 5: return 'Very Strong';
      default: return '';
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>

      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.logoContainer}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.logo}>
              <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 style={styles.brandName}>Findora</h1>
          </div>

          <h2 style={styles.title}>Create Your Account</h2>
          <p style={styles.subtitle}>Join us to start your journey</p>

          {message.text && (
            <div style={{
              ...styles.message,
              backgroundColor: message.isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              borderLeft: `4px solid ${message.isError ? '#EF4444' : '#10B981'}`,
              transform: message.text ? 'translateY(0)' : 'translateY(-20px)',
              opacity: message.text ? 1 : 0
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSignup} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <div style={styles.inputContainer}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
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
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={styles.input}
                  disabled={loading}
                  autoComplete="new-password"
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a17.33 17.33 0 0 1 2.4-3.06"/>
                      <path d="M1 1l22 22"/>
                      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24"/>
                      <path d="M14.12 14.12L12 12"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Password Strength Meter */}
              {formData.password && (
                <div style={styles.passwordStrengthContainer}>
                  <div style={styles.passwordStrengthMeter}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        style={{
                          ...styles.passwordStrengthBar,
                          backgroundColor: i <= passwordStrength ? getPasswordStrengthColor() : '#E5E7EB'
                        }}
                      />
                    ))}
                  </div>
                  <span style={{
                    ...styles.passwordStrengthText,
                    color: getPasswordStrengthColor()
                  }}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
              <div style={{ ...styles.inputContainer, position: 'relative' }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={styles.input}
                  disabled={loading}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a17.33 17.33 0 0 1 2.4-3.06"/>
                      <path d="M1 1l22 22"/>
                      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24"/>
                      <path d="M14.12 14.12L12 12"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                background: isHovered ? 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)' : 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
              }}
              disabled={!formData.email || !formData.password || !formData.confirmPassword || loading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? (
                <span style={styles.buttonContent}>
                  <span style={styles.spinner}></span>
                  <span>Creating Account...</span>
                </span>
              ) : (
                <span style={styles.buttonContent}>
                  <span>Create Account</span>
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
                setMessage({ text: 'Google signup failed', isError: true });
              }}
              shape="pill"
              size="large"
              width="100%"
              theme="filled_blue"
              text="signup_with"
            />
          </div>

          <p style={styles.loginText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.loginLink}>
              Login now
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
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  passwordStrengthContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '4px'
  },
  passwordStrengthMeter: {
    display: 'flex',
    gap: '4px',
    flex: 1
  },
  passwordStrengthBar: {
    height: '4px',
    borderRadius: '2px',
    flex: 1,
    transition: 'all 0.3s ease'
  },
  passwordStrengthText: {
    fontSize: '12px',
    fontWeight: '600',
    minWidth: '60px',
    textAlign: 'right'
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
    overflow: 'hidden'
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
  loginText: {
    fontSize: '14px',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: '24px'
  },
  loginLink: {
    color: '#4B5563',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  },
  loginIcon: {
    transition: 'transform 0.2s ease'
  }
};

export default Signup;