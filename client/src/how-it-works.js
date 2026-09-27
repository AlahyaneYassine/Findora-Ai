import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';


function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Create Your Account",
      description: "Sign up in just 30 seconds to get started. All you need is your email address and a secure password.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 11L19 13L23 9" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Set Up Your Profile",
      description: "Customize your profile in few minutes",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 7L19 9L17 7" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Explore Features",
      description: "Discover all the powerful tools we offer to help you achieve your goals faster and more efficiently.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 18H18" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Get Results",
      description: "Start discovering your searched and loved products by using our platform.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const features = [
    {
      title: "Intuitive Dashboard",
      description: "Our clean interface puts all the tools you need right at your fingertips.",
      icon: "📊"
    },
    {
      title: "Real-time Analytics",
      description: "Get instant insights with our powerful data visualization tools.",
      icon: "📈"
    },
    {
      title: "Collaboration Tools",
      description: "Work seamlessly with your team no matter where they are located.",
      icon: "👥"
    },
    {
      title: "Secure Storage",
      description: "Your data is protected with enterprise-grade security measures.",
      icon: "🔒"
    },
    {
      title: "Custom Notifications",
      description: "Stay informed with alerts tailored to your preferences.",
      icon: "🔔"
    },
    {
      title: "24/7 Support",
      description: "Our team is always ready to help you with any questions.",
      icon: "🛟"
    }
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Animated Background Elements */}
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      


 {/* Navigation */}
      <nav style={styles.navbar}>
        <Link to="/how-it-works" style={styles.logoLink}>
          <div style={styles.logo}>Findora</div>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/home" style={styles.navLink}>Home</Link>
          <Link to="/features" style={styles.navLink}>Features</Link>
          <Link to="/about" style={styles.navLink}>About</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </div>
      </nav>



      

  {/* Hero Section */}
<section style={styles.hero}>
  <div style={styles.heroContent}>
    <h1 style={styles.heroTitle}>How Findora Works</h1>
    <p style={styles.heroSubtitle}>Discover how our platform can transform your workflow in just a few simple steps</p>
    <div style={styles.heroButtons}>
      <Link to="/" style={styles.primaryButton}>Join Our Journey</Link>
      <Link to="/features" style={styles.secondaryButton}>View Features</Link>
      
    </div>
  </div>
  <div style={styles.heroIllustration}>
    <div style={styles.illustrationContainer}>
      {/* Animated bouncing image */}
      <img 
        src="https://aaagnostica.org/wp-content/uploads/2021/12/How-It-Works.jpg" 
        alt="How Findora Works illustration"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '20px',
          animation: 'bounce 3s infinite ease-in-out',
          transformOrigin: 'center bottom'
        }}
      />
    </div>
  </div>
</section>

      {/* Steps Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Simple Steps to Success</h2>
          <p style={styles.sectionSubtitle}>Get started in minutes and see results immediately</p>
        </div>
        
        <div style={styles.stepsContainer}>
          <div style={styles.stepsNavigation}>
            {steps.map((step, index) => (
              <button
                key={index}
                style={{
                  ...styles.stepNavButton,
                  borderBottom: activeStep === index ? '3px solid #4B5563' : '3px solid transparent'
                }}
                onClick={() => setActiveStep(index)}
              >
                <span style={styles.stepNavNumber}>0{index + 1}</span>
                <span style={styles.stepNavTitle}>{step.title}</span>
              </button>
            ))}
          </div>
          
          <div style={styles.stepContent}>
            <div style={styles.stepIcon}>
              {steps[activeStep].icon}
            </div>
            <h3 style={styles.stepTitle}>{steps[activeStep].title}</h3>
            <p style={styles.stepDescription}>{steps[activeStep].description}</p>
            
            <div style={styles.stepControls}>
              <button 
                style={styles.controlButton}
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
              >
                Previous
              </button>
              <div style={styles.stepIndicators}>
                {steps.map((_, index) => (
                  <button
                    key={index}
                    style={{
                      ...styles.stepIndicator,
                      backgroundColor: activeStep === index ? '#4B5563' : '#E5E7EB'
                    }}
                    onClick={() => setActiveStep(index)}
                  />
                ))}
              </div>
              <button 
                style={styles.controlButton}
                onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Powerful Features</h2>
          <p style={styles.sectionSubtitle}>Everything you are looking for!</p>
        </div>
        
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to start your journey with us?</h2>
          <p style={styles.ctaText}>Join Findora members and be one of us! </p>
        
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <div style={styles.logo}>Findora</div>
            <p style={styles.footerTagline}>Search Anything You Need</p>
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
              <Link to="/help" style={styles.footerLink}>Help Center</Link>
              <Link to="/contact" style={styles.footerLink}>Contact</Link>
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
           <a href="#" style={styles.socialLink} aria-label="Twitter (X)">
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
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
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
    transition: 'color 0.2s'
  },
  navButton: {
    backgroundColor: '#4B5563',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
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
    display: 'inline-block'
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
    display: 'inline-block'
  },
  heroIllustration: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  illustrationContainer: {
    width: '500px',
    height: '400px',
    position: 'relative'
  },
  animatedIllustration: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(229, 231, 235, 0.5)',
    borderRadius: '20px',
    border: '1px dashed #D1D5DB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#9CA3AF',
    fontSize: '18px',
    animation: 'pulse 3s ease-in-out infinite'
  },
  section: {
    padding: '80px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto'
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
    lineHeight: '1.6'
  },
  stepsContainer: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    minHeight: '400px'
  },
  stepsNavigation: {
    width: '300px',
    backgroundColor: '#F9FAFB',
    borderRight: '1px solid #E5E7EB',
    padding: '30px 0'
  },
  stepNavButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left'
  },
  stepNavNumber: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#9CA3AF',
    marginRight: '12px',
    minWidth: '24px'
  },
  stepNavTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#4B5563',
    transition: 'color 0.2s'
  },
  stepContent: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  stepIcon: {
    marginBottom: '24px'
  },
  stepTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px'
  },
  stepDescription: {
    fontSize: '16px',
    color: '#6B7280',
    lineHeight: '1.6',
    maxWidth: '500px',
    marginBottom: '40px'
  },
  stepControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginTop: 'auto'
  },
  controlButton: {
    backgroundColor: 'white',
    color: '#4B5563',
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  stepIndicators: {
    display: 'flex',
    gap: '8px'
  },
  stepIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '40px'
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  },
  featureIcon: {
    fontSize: '36px',
    marginBottom: '20px'
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '12px'
  },
  featureDescription: {
    fontSize: '15px',
    color: '#6B7280',
    lineHeight: '1.6'
  },
  ctaSection: {
    backgroundColor: '#1F2937',
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
    color: '#D1D5DB',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
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
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
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
    border: '1px solid #4B5563'
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
    transition: 'color 0.2s'
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
    transition: 'all 0.2s'
  }
};

export default HowItWorks;

