import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div style={styles.pageContainer}>
      {/* Animated Background Elements */}
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      
      {/* Navigation */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logoLink}>
          <div style={styles.logo}>Findora</div>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/home" style={styles.navLink}>Home</Link>
          <Link to="/how-it-works" style={styles.navLink}>How It Works</Link>
          <Link to="/features" style={styles.navLink}>Features</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Privacy Policy</h1>
          <p style={styles.heroSubtitle}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div style={styles.heroButtons}>
            <Link to="/contact" style={styles.primaryButton}>Contact Us</Link>
            <a href="#policy-details" style={styles.secondaryButton}>Read Policy</a>
          </div>
        </div>
        <div style={styles.heroIllustration}>
          <div style={styles.illustrationContainer}>
            <img 
              src="https://media.istockphoto.com/id/921720582/photo/privacy-access-login-performance-identification-password-passcode-and-privacy.jpg?s=612x612&w=0&k=20&c=oNNDtwzc3wjuWC0WRvGzPqn1P-dIUP17qhgPZw8rrsw=" 
              alt="Privacy Policy Illustration"
              style={styles.heroImage}
            />
            <div style={styles.animatedOverlay}></div>
          </div>
        </div>
      </section>

      {/* Policy Content Section */}
      <section id="policy-details" style={styles.section}>
        <div style={styles.policyContainer}>
          <div style={styles.policyContent}>
            <h2 style={styles.sectionTitle}>Our Commitment to Your Privacy</h2>
            <p style={styles.sectionSubtitle}>
              At Findora, we take your privacy seriously. This policy explains how we collect, use, 
              and protect your personal information.
            </p>

            <div style={styles.policySection}>
              <h3 style={styles.policyHeading}>1. Information We Collect</h3>
              <p style={styles.policyText}>
                We may collect personal information such as your name, email address, phone number, 
                and payment details when you use our services. We also collect non-personal information 
                like browser type, IP address, and usage data.
              </p>
            </div>

            <div style={styles.policySection}>
              <h3 style={styles.policyHeading}>2. How We Use Your Information</h3>
              <p style={styles.policyText}>
                We use your information to:
              </p>
              <ul style={styles.policyList}>
                <li>Provide and improve our services</li>
                <li>Process transactions and send notifications</li>
                <li>Respond to your inquiries and provide support</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Analyze usage patterns to enhance user experience</li>
              </ul>
            </div>

            <div style={styles.policySection}>
              <h3 style={styles.policyHeading}>3. Data Protection</h3>
              <p style={styles.policyText}>
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul style={styles.policyList}>
                <li>Encryption of sensitive data</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication protocols</li>
                <li>Secure data storage practices</li>
              </ul>
            </div>

            <div style={styles.policySection}>
              <h3 style={styles.policyHeading}>4. Cookies and Tracking Technologies</h3>
              <p style={styles.policyText}>
                We use cookies and similar technologies to:
              </p>
              <ul style={styles.policyList}>
                <li>Remember user preferences</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Deliver targeted advertisements (with consent)</li>
              </ul>
              <p style={styles.policyText}>
                You can control cookies through your browser settings.
              </p>
            </div>

            <div style={styles.policySection}>
              <h3 style={styles.policyHeading}>5. Third-Party Services</h3>
              <p style={styles.policyText}>
                We may use third-party services that collect information to help us:
              </p>
              <ul style={styles.policyList}>
                <li>Process payments (e.g., Stripe, PayPal)</li>
                <li>Analyze usage (e.g., Google Analytics)</li>
                <li>Provide customer support (e.g., Zendesk)</li>
                <li>Send communications (e.g., Mailchimp)</li>
              </ul>
              <p style={styles.policyText}>
                These services have their own privacy policies governing data use.
              </p>
            </div>

            <div style={styles.policySection}>
              <h3 style={styles.policyHeading}>6. Data Retention</h3>
              <p style={styles.policyText}>
                We retain personal information only as long as necessary to:
              </p>
              <ul style={styles.policyList}>
                <li>Provide services you requested</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
            </div>

            <div style={styles.policySection}>
              <h3 style={styles.policyHeading}>7. Your Rights</h3>
              <p style={styles.policyText}>
                You have the right to:
              </p>
              <ul style={styles.policyList}>
                <li>Access and request a copy of your data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
              <p style={styles.policyText}>
                To exercise these rights, please contact us using the information below.
              </p>
            </div>

            <div style={styles.policySection}>
              <h3 style={styles.policyHeading}>8. Changes to This Policy</h3>
              <p style={styles.policyText}>
                We may update this policy periodically. We'll notify you of significant changes 
                through email or prominent notices on our website. Your continued use of our 
                services after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            <div style={styles.policySection}>
              <h3 style={styles.policyHeading}>9. Contact Us</h3>
              <p style={styles.policyText}>
                If you have questions about this policy or your personal data:
              </p>
              <ul style={styles.policyList}>
                <li>Email: privacy@findora.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Mail: 123 Privacy Lane, Data City, DC 12345</li>
              </ul>
            </div>
          </div>

          <div style={styles.policySidebar}>
            <div style={styles.sidebarCard}>
              <h4 style={styles.sidebarTitle}>Quick Links</h4>
              <ul style={styles.sidebarList}>
                <li><a href="#policy-details" style={styles.sidebarLink}>Policy Details</a></li>
                <li><Link to="/terms" style={styles.sidebarLink}>Terms of Service</Link></li>
                <li><Link to="/cookies" style={styles.sidebarLink}>Cookie Policy</Link></li>
                <li><Link to="/data-request" style={styles.sidebarLink}>Data Request Form</Link></li>
              </ul>
            </div>
            <div style={styles.sidebarCard}>
              <h4 style={styles.sidebarTitle}>Key Points</h4>
              <ul style={styles.sidebarList}>
                <li>We never sell your personal data</li>
                <li>You control your marketing preferences</li>
                <li>Industry-standard security measures</li>
                <li>Transparent data practices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Have Privacy Concerns?</h2>
          <p style={styles.ctaText}>Our team is here to address any questions you may have about your data</p>
          <div style={styles.ctaButtons}>
            <Link to="/contact" style={styles.ctaPrimaryButton}>Contact Support</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <div style={styles.logo}>Findora</div>
            <p style={styles.footerTagline}>Do less. Achieve more.</p>
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
              <Link to="/faq" style={styles.footerLink}>FAQ</Link>
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
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
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

// Reuse styles from about.js and add privacy-policy specific styles
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
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '80px 40px',
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  },
  heroContent: {
    flex: 1,
    maxWidth: '600px'
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '20px',
    lineHeight: '1.2',
    background: 'linear-gradient(90deg, #1F2937, #4B5563)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#4B5563',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  heroButtons: {
    display: 'flex',
    gap: '16px'
  },
  primaryButton: {
    backgroundColor: '#4B5563',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    display: 'inline-block',
    '&:hover': {
      backgroundColor: '#374151',
      transform: 'translateY(-2px)'
    }
  },
  secondaryButton: {
    backgroundColor: 'white',
    color: '#4B5563',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #E5E7EB',
    display: 'inline-block',
    '&:hover': {
      backgroundColor: '#F9FAFB',
      borderColor: '#D1D5DB'
    }
  },
  heroIllustration: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  illustrationContainer: {
    width: '500px',
    height: '400px',
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'relative',
    zIndex: 1,
  },
  animatedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(75,85,99,0.3) 0%, rgba(31,41,55,0.2) 100%)',
    zIndex: 2,
    animation: 'pulseOverlay 6s ease-in-out infinite alternate',
  },
  section: {
    padding: '80px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px'
  },
  sectionSubtitle: {
    fontSize: '18px',
    color: '#6B7280',
    lineHeight: '1.6',
    marginBottom: '40px'
  },
  policyContainer: {
    display: 'flex',
    gap: '40px',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  },
  policyContent: {
    flex: 3,
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '50px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
  },
  policySection: {
    marginBottom: '40px'
  },
  policyHeading: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid #E5E7EB'
  },
  policyText: {
    fontSize: '16px',
    color: '#6B7280',
    lineHeight: '1.8',
    marginBottom: '16px'
  },
  policyList: {
    paddingLeft: '20px',
    marginBottom: '20px',
    listStyleType: 'disc',
    color: '#6B7280'
  },
  policySidebar: {
    flex: 1,
    position: 'sticky',
    top: '100px',
    height: 'fit-content',
    '@media (max-width: 768px)': {
      position: 'relative',
      top: 'auto'
    }
  },
  sidebarCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  },
  sidebarTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px'
  },
  sidebarList: {
    listStyleType: 'none',
    paddingLeft: '0'
  },
  sidebarLink: {
    color: '#4B5563',
    textDecoration: 'none',
    fontSize: '15px',
    lineHeight: '2',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#1F2937'
    }
  },
  ctaSection: {
    backgroundColor: '#4B5563',
    padding: '80px 40px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  ctaContent: {
    maxWidth: '700px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '16px'
  },
  ctaText: {
    fontSize: '18px',
    color: '#E5E7EB',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    '@media (max-width: 480px)': {
      flexDirection: 'column'
    }
  },
  ctaPrimaryButton: {
    backgroundColor: 'white',
    color: '#1F2937',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: '#F3F4F6',
      transform: 'translateY(-2px)'
    }
  },
  ctaSecondaryButton: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    border: '1px solid #9CA3AF',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderColor: '#E5E7EB'
    }
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
      color: '#1F2937'
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

export default PrivacyPolicy;