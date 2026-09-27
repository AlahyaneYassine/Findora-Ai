import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={styles.faqItem}>
      <button 
        style={styles.faqQuestion}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question}`}
      >
        {question}
        <span style={styles.plusIcon}>{isOpen ? '−' : '+'}</span>
      </button>
      <div 
        id={`faq-answer-${question}`}
        style={{
          ...styles.faqAnswer,
          display: isOpen ? 'block' : 'none',
          animation: isOpen ? 'fadeIn 0.3s ease-in-out' : 'none'
        }}
      >
        {answer}
      </div>
    </div>
  );
};

const FAQCategory = ({ title, items }) => (
  <div style={styles.faqCategory}>
    <h3 style={styles.categoryTitle}>{title}</h3>
    {items.map((item, index) => (
      <FAQItem key={index} question={item.question} answer={item.answer} />
    ))}
  </div>
);

function FAQ() {
  const faqData = [
    {
      title: "Product Search",
      items: [
        {
          question: "How does the AI product search work?",
          answer: (
            <>
              Our AI agent scans the web to find exactly what you're looking for:
              <ul style={styles.featureList}>
                <li>Enter any product description or question</li>
                <li>Our AI analyzes thousands of sources</li>
                <li>Returns comprehensive product matches</li>
                <li>Provides price comparisons across retailers</li>
                <li>Shows ratings, specs, and availability</li>
              </ul>
            </>
          )
        },
        {
          question: "What kind of products can I search for?",
          answer: (
            <>
              You can search for virtually any consumer product:
              <ul style={styles.featureList}>
                <li>Electronics and gadgets</li>
                <li>Home and kitchen appliances</li>
                <li>Fashion and accessories</li>
                <li>Beauty and personal care</li>
                <li>And much more - try searching anything!</li>
              </ul>
            </>
          )
        }
      ]
    },
    {
      title: "AI Features",
      items: [
        {
          question: "What makes your AI search special?",
          answer: (
            <>
              Our AI goes beyond basic search with:
              <ul style={styles.featureList}>
                <li>Natural language understanding - ask in your own words</li>
                <li>Smart product comparisons side-by-side</li>
                <li>Personalized recommendations over time</li>
                <li>Visual search capability (coming soon)</li>
              </ul>
            </>
          )
        },
      
      ]
    },
    {
      title: "Account & Data",
      items: [
        {
          question: "Do I need an account to search?",
          answer: (
            <>
              Our service is flexible:
              <ul style={styles.featureList}>
                <li>Search without an account (limited features)</li>
                <li>Free account unlocks more capabilities</li>
                <li>Premium account for power users</li>
                <li>All account levels get full AI search access</li>
              </ul>
            </>
          )
        },
        {
          question: "How do you protect my data?",
          answer: (
            <>
              We prioritize your privacy with:
              <ol style={styles.featureList}>
                <li><strong>Encryption:</strong> All searches secured</li>
                <li><strong>No tracking:</strong> We don't sell your data</li>
                <li><strong>Transparency:</strong> Clear data policies</li>
                <li><strong>Control:</strong> Delete your history anytime</li>
              </ol>
            </>
          )
        }
      ]
    }
  ];

  return (
    <div style={styles.pageContainer}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      
      {/* Background elements */}
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logoLink}>
          <div style={styles.logo}>Findora</div>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/home" style={styles.navLink}>Home</Link>
          <Link to="/features" style={styles.navLink}>Features</Link>
          <Link to="/updates" style={styles.navLink}>Updates</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h1 style={styles.sectionTitle}>MOST ASKED QUESTIONS </h1>
            <p style={styles.sectionSubtitle}>
              Answers to your questions you may want to ask
            </p>
          </div>

          <div style={styles.faqContainer}>
            {faqData.map((category, index) => (
              <FAQCategory 
                key={index}
                title={category.title}
                items={category.items}
              />
            ))}
          </div>

          {/* Support CTA */}
          <div style={styles.supportCta}>
            <h2 style={styles.ctaTitle}>Need more help easy just contact us</h2>
            <p style={styles.ctaText}>Round-the-clock support for anything related to your product searches or results.</p>
            <div style={styles.ctaButtons}>
              <Link to="/contact" style={styles.secondaryButton}>Contact Support</Link>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <div style={styles.logo}>Findora</div>
            <p style={styles.footerTagline}>Smart product discovery through AI</p>
          </div>
           <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Product</h4>
              <Link to="/features" style={styles.footerLink}>Features</Link>
              <Link to="/demo" style={styles.footerLink}>Demo</Link>
            </div>

          <div style={styles.footerLinks}>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Company</h4>
              <Link to="/about" style={styles.footerLink}>About</Link>
              <Link to="/blog" style={styles.footerLink}>Blog</Link>
              <Link to="/press" style={styles.footerLink}>Press</Link>
            </div>




            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Legal</h4>
              <Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
              <Link to="/terms-of-service" style={styles.footerLink}>Terms of Service</Link>
              <Link to="/cookies-policy" style={styles.footerLink}>Cookie Policy</Link>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© {new Date().getFullYear()} Findora. All rights reserved.</p>
        </div>
      </footer>
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
    ':hover': {
      color: '#1F2937'
    }
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
  faqContainer: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  faqCategory: {
    marginBottom: '50px'
  },
  categoryTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #E5E7EB'
  },
  faqItem: {
    marginBottom: '15px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  },
  faqQuestion: {
    width: '100%',
    padding: '20px',
    backgroundColor: 'white',
    border: 'none',
    textAlign: 'left',
    fontSize: '18px',
    fontWeight: '500',
    color: '#1F2937',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#F9FAFB'
    },
    ':focus': {
      outline: '2px solid #f59e0b',
      outlineOffset: '2px'
    }
  },
  plusIcon: {
    fontSize: '24px',
    color: '#4B5563',
    transition: 'transform 0.3s ease'
  },
  faqAnswer: {
    padding: '20px',
    backgroundColor: '#F9FAFB',
    borderTop: '1px solid #E5E7EB',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#4B5563'
  },
  featureList: {
    marginTop: '10px',
    paddingLeft: '20px',
    li: {
      marginBottom: '8px'
    }
  },
  membershipTiers: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  tierCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  tierTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '1px solid #E5E7EB'
  },
  supportCta: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center',
    marginTop: '60px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
  },
  ctaTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: '16px'
  },
  ctaText: {
    fontSize: '16px',
    color: '#6B7280',
    marginBottom: '24px'
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap'
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
    textAlign: 'center',
    ':hover': {
      backgroundColor: '#F3F4F6'
    },
    ':focus': {
      outline: '2px solid #f59e0b',
      outlineOffset: '2px'
    }
  },
  premiumButton: {
    backgroundColor: '#f59e0b',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'inline-block',
    textAlign: 'center',
    ':hover': {
      backgroundColor: '#d97706'
    },
    ':focus': {
      outline: '2px solid #f59e0b',
      outlineOffset: '2px'
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
    ':hover': {
      color: '#4B5563'
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
  }
};

export default FAQ;