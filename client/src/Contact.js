import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isHovered, setIsHovered] = useState(false);

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

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setMessage({ text: 'Please fill in all required fields', isError: true });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      
      setMessage({ 
        text: 'Your message has been sent successfully! We will get back to you soon.', 
        isError: false 
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setMessage({
        text: err.response?.data?.msg || 'Failed to send message. Please try again later.',
        isError: true
      });
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Email Us",
      description: "We'll respond quickly",
      value: "support@findora.com",
      action: "mailto:support@findora.com"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 20.1046 19.1046 21 18 21C14.0993 21 10.34 19.4461 7.39278 16.8749C4.77349 14.5888 3 11.3056 3 7.99998C3 6.89541 3.89543 6 5 6Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Call Us",
      description: "Mon-Fri from 9am to 5pm",
      value: "+212 6 56 90 18 03",
      action: "tel:+15551234567"
    },
   {
  icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.657 16.657L13.414 20.9C13.039 21.2746 12.5306 21.4852 12.0005 21.4852C11.4704 21.4852 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5609C3.84504 11.009 4.00349 9.4005 4.60901 7.93871C5.21452 6.47693 6.2399 5.22769 7.55548 4.34846C8.87107 3.46923 10.4178 3.00024 12 3.00024C13.5822 3.00024 15.1289 3.46923 16.4445 4.34846C17.7601 5.22769 18.7855 6.47693 19.391 7.93871C19.9965 9.4005 20.155 11.009 19.8463 12.5609C19.5377 14.1127 18.7758 15.5382 17.657 16.657Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  title: "Visit Us",
  description: "Come say hello at our office",
  value: "Technopark, Sidi Maarouf, Casablanca, Morocco",
  action: "https://maps.google.com/?q=Technopark+Sidi+Maarouf+Casablanca"
}

  ];

  return (
    <div style={styles.pageContainer}>
      {/* Animated Background Elements */}
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      
      {/* Navigation */}
      <nav style={styles.navbar}>
        <Link to="/contact" style={styles.logoLink}>
          <div style={styles.logo}>Findora</div>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/home" style={styles.navLink}>Home</Link>
          <Link to="/how-it-works" style={styles.navLink}>How It Works</Link>
          <Link to="/features" style={styles.navLink}>Features</Link>
          <Link to="/about" style={styles.navLink}>About</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Get in Touch</h1>
          <p style={styles.heroSubtitle}>We'd love to hear from you. Reach out to our team for any questions or inquiries.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.section}>
        <div style={styles.contactContainer}>
          <div style={styles.contactMethods}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Contact Information</h2>
              <p style={styles.sectionSubtitle}>Choose your preferred method of communication</p>
            </div>
            
            <div style={styles.methodsGrid}>
              {contactMethods.map((method, index) => (
                <a 
                  key={index} 
                  href={method.action} 
                  style={styles.methodCard}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div style={styles.methodIcon}>
                    {method.icon}
                  </div>
                  <h3 style={styles.methodTitle}>{method.title}</h3>
                  <p style={styles.methodDescription}>{method.description}</p>
                  <p style={styles.methodValue}>{method.value}</p>
                </a>
              ))}
            </div>
          </div>
          
          <div style={styles.contactFormContainer}>
            <div style={styles.formHeader}>
              <h2 style={styles.sectionTitle}>Send Us a Message</h2>
              <p style={styles.sectionSubtitle}>Fill out the form below and we'll get back to you</p>
            </div>
            
            {/* Animated Message */}
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

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="name" style={styles.label}>Full Name *</label>
                <div style={styles.inputContainer}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    style={styles.input}
                    disabled={loading}
                    required
                  />
                  <svg style={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>Email Address *</label>
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
                    required
                  />
                  <svg style={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="subject" style={styles.label}>Subject</label>
                <div style={styles.inputContainer}>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    style={styles.input}
                    disabled={loading}
                  />
                  <svg style={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 16.5L21 21" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 16.5C19 17.8807 17.8807 19 16.5 19C15.1193 19 14 17.8807 14 16.5C14 15.1193 15.1193 14 16.5 14C17.8807 14 19 15.1193 19 16.5Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="message" style={styles.label}>Message *</label>
                <div style={styles.textareaContainer}>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    style={styles.textarea}
                    disabled={loading}
                    rows="5"
                    required
                  ></textarea>
                  <svg style={styles.textareaIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 10H8.01M12 10H12.01M16 10H16.01M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01M21 4H3C2.44772 4 2 4.44772 2 5V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V5C22 4.44772 21.5523 4 21 4Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.button,
                  background: isHovered ? 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)' : 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                }}
                disabled={!formData.name || !formData.email || !formData.message || loading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {loading ? (
                  <span style={styles.buttonContent}>
                    <span style={styles.spinner}></span>
                    <span>Sending...</span>
                  </span>
                ) : (
                  <span style={styles.buttonContent}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.buttonIcon}>
                      <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Send Message</span>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p style={styles.sectionSubtitle}>Find quick answers to common questions</p>
        </div>
        
        <div style={styles.faqGrid}>
          <div style={styles.faqCard}>
            <h3 style={styles.faqQuestion}>How quickly can I expect a response?</h3>
            <p style={styles.faqAnswer}>Our team typically responds within 24 hours during business days. For urgent matters, please call our support line.</p>
          </div>
          <div style={styles.faqCard}>
            <h3 style={styles.faqQuestion}>What information should I include in my message?</h3>
            <p style={styles.faqAnswer}>Please include details about your inquiry, any relevant account information, and how we can best assist you.</p>
          </div>

          <div style={styles.faqCard}>
            <h3 style={styles.faqQuestion}>Can I schedule a demo or consultation?</h3>
            <p style={styles.faqAnswer}>Absolutely! Use the contact form to request a demo and we'll schedule a time that works for you.</p>
          </div>
        </div>
      </section>

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
          @keyframes spin {
            to { transform: rotate(360deg); }
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

  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 40px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.9) 0%, rgba(249, 250, 251, 0.7) 100%)'
  },
  heroContent: {
    maxWidth: '800px'
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
  section: {
    padding: '80px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '40px',
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
  contactContainer: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap'
  },
  contactMethods: {
    flex: 1,
    minWidth: '300px'
  },
  methodsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '30px'
  },
  methodCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block'
  },
  methodIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  methodTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px'
  },
  methodDescription: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '12px'
  },
  methodValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#4B5563'
  },
  contactFormContainer: {
    flex: 1,
    minWidth: '300px',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
  },
  formHeader: {
    marginBottom: '30px'
  },
  message: {
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
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
  textareaContainer: {
    position: 'relative'
  },
  textarea: {
    padding: '14px 14px 14px 42px',
    borderRadius: '10px',
    border: '1px solid #E5E7EB',
    fontSize: '15px',
    width: '100%',
    backgroundColor: '#F9FAFB',
    transition: 'all 0.3s ease',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
    resize: 'vertical',
    minHeight: '120px'
  },
  textareaIcon: {
    position: 'absolute',
    left: '14px',
    top: '18px'
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
    marginTop: '8px'
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
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '40px'
  },
  faqCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease'
  },
  faqQuestion: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '12px'
  },
  faqAnswer: {
    fontSize: '15px',
    color: '#6B7280',
    lineHeight: '1.6'
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
  '@keyframes pulseOverlay': {
  '0%': { opacity: 0.7 },
  '100%': { opacity: 0.9 },
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

export default Contact;