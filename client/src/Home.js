import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { AuthContext } from './AuthContext';
import thumbnail from './assets/1694493183661.png';

function Home() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    // Animation triggers
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(`.${styles.featureCard}, .${styles.testimonialCard}, .${styles.step}`);
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };

    // Set initial state
    const elements = document.querySelectorAll(`.${styles.featureCard}, .${styles.testimonialCard}, .${styles.step}`);
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger once on load

    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className={styles.homePage}>
      {/* Premium Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link to="/home" className={styles.logo}>
            <span className={styles.logoText}>Findora</span>
            <span className={styles.logoHighlight}>AI</span>
          </Link>

          <div className={styles.mobileMenuButton}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={styles.navLinks}>
            <li><Link to="/" className={styles.activeLink}>Home</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/features">Features</Link></li>
            {/* Categories with dropdown */}
  <li className={styles.dropdown}>
    <Link to="/searching/products">Search</Link>

  </li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            
            {isAuthenticated ? (
              <li className={styles.dropdown}>
                <span className={styles.profileBtn}>
                  <i className={`bi bi-person-circle ${styles.profileIcon}`}></i>
                  My Account <i className="bi bi-chevron-down"></i>
                </span>
                <div className={styles.dropdownContent}>
                  <Link to="/profile"><i className="bi bi-speedometer2"></i> Dashboard</Link>

            
                  <button onClick={logout}><i className="bi bi-box-arrow-right"></i> Logout</button>
                </div>
              </li>
            ) : (
              <>
                <li><Link to="/login" className={styles.authLink}>Login</Link></li>
                <li><Link to="/" className={`${styles.authLink} ${styles.signupBtn}`}>Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Luxury Hero Section with Gradient Mesh Background */}
      <header className={styles.hero}>
        <div className={styles.heroGradient}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>
              <span className={styles.heroTitleLine1}>Discover Products</span>
              <span className={styles.heroTitleLine2}>with <span className={styles.aiHighlight}>AI Precision</span></span>
            </h1>
            <p className={styles.heroSubtitle}>
              Our intelligent search engine helps you find exactly what you're looking for with detailed comparisons and personalized recommendations.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/contact" className={styles.primaryBtn}>
                <i className="bi bi-search"></i> Curios? Contact Us
              </Link>
            
            </div>
            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <i className="bi bi-shield-check"></i>
                <span>Secure & Private</span>
              </div>
              <div className={styles.trustItem}>
                <i className="bi bi-lightning-charge"></i>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <div className={styles.heroImageWrapper}>
              <img 
                src="https://www.bloomreach.com/wp-content/uploads/2024/05/ai-based-product-search_search-results-reorder.jpg" 
                alt="AI Product Search Interface" 
                className={styles.heroImage}
              />
              <div className={styles.heroImageOverlay}></div>
              <div className={styles.floatingBadge}>
                <span>FindoraAI</span>
                <div className={styles.pulseAnimation}></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Animated Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <h3 data-count="500">500K+</h3>
            <p>Products Indexed</p>
            <div className={styles.statBar}></div>
          </div>
          <div className={styles.statItem}>
            <h3 data-count="98">98%</h3>
            <p>Accuracy in Suggestions</p>
            <div className={styles.statBar}></div>
          </div>
          <div className={styles.statItem}>
            <h3 data-count="2">2 sec</h3>
            <p>Avg Search Time</p>
            <div className={styles.statBar}></div>
          </div>
          <div className={styles.statItem}>
            <h3 data-count="100">100%</h3>
            <p>User Privacy Protected</p>
            <div className={styles.statBar}></div>
          </div>
        </div>
      </section>

      {/* Premium Features Section with Hover Effects */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose FindoraAI?</h2>
          <p className={styles.sectionSubtitle}>Experience the future of product discovery</p>
        </div>
        
        <div className={styles.featuresGrid}>
  {/* AI-Powered Search Card */}
  <div className={styles.featureCard}>
    <div className={styles.featureIconContainer}>
      <div className={styles.featureIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
        </svg>
      </div>
      <div className={styles.iconGlow} style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0) 70%)' }}></div>
    </div>
    <h3>AI-Powered Search</h3>
    <p>Get accurate results fast with intelligent product matching that understands your needs.</p>
    <div className={styles.featureHoverEffect} style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0) 100%)' }}></div>
  </div>
  
  {/* Smart Comparisons Card */}
  <div className={styles.featureCard}>
    <div className={styles.featureIconContainer}>
      <div className={styles.featureIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
          <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"/>
        </svg>
      </div>
      <div className={styles.iconGlow} style={{ background: 'radial-gradient(circle, rgba(0,123,255,0.3) 0%, rgba(0,123,255,0) 70%)' }}></div>
    </div>
    <h3>Smart Comparisons</h3>
    <p>Detailed side-by-side comparisons with specs, prices, and reviews from multiple sources.</p>
    <div className={styles.featureHoverEffect} style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.1) 0%, rgba(0,123,255,0) 100%)' }}></div>
  </div>
  
  {/* Private & Secure Card */}
  <div className={styles.featureCard}>
    <div className={styles.featureIconContainer}>
      <div className={styles.featureIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
          <path d="M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
        </svg>
      </div>
      <div className={styles.iconGlow} style={{ background: 'radial-gradient(circle, rgba(40,167,69,0.3) 0%, rgba(40,167,69,0) 70%)' }}></div>
    </div>
    <h3>Private & Secure</h3>
    <p>End-to-end encryption ensures your searches and data remain completely confidential.</p>
    <div className={styles.featureHoverEffect} style={{ background: 'linear-gradient(135deg, rgba(40,167,69,0.1) 0%, rgba(40,167,69,0) 100%)' }}></div>
  </div>
  
  {/* Comprehensive Selection Card */}
  <div className={styles.featureCard}>
    <div className={styles.featureIconContainer}>
      <div className={styles.featureIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
          <path d="M6.94 7.44l1.06-1.06 1.06 1.06 1.06-1.06-2.12-2.12-1.06 1.06 1.06 1.06-1.06 1.06-1.06-1.06-1.06 1.06 2.12 2.12 1.06-1.06-1.06-1.06 1.06-1.06z"/>
        </svg>
      </div>
      <div className={styles.iconGlow} style={{ background: 'radial-gradient(circle, rgba(111,66,193,0.3) 0%, rgba(111,66,193,0) 70%)' }}></div>
    </div>
    <h3>Comprehensive Selection</h3>
    <p>Access products from thousands of trusted vendors and marketplaces worldwide.</p>
    <div className={styles.featureHoverEffect} style={{ background: 'linear-gradient(135deg, rgba(111,66,193,0.1) 0%, rgba(111,66,193,0) 100%)' }}></div>
  </div>
</div>
      </section>

      {/* Interactive How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <h2>How FindoraAI Works</h2>
          <p className={styles.sectionSubtitle}>Get results in just three simple steps</p>
        </div>
        
        <div className={styles.stepsContainer}>
  {/* Step 1 */}
  <div className={styles.step}>
    <div className={styles.stepVisual}>
      <div className={styles.stepNumber}>1</div>
      <div className={styles.stepIllustration}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16" className={styles.stepIcon}>
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
        </svg>
        <div className={styles.stepGlow} style={{ background: 'radial-gradient(circle, rgba(13,110,253,0.3) 0%, rgba(13,110,253,0) 70%)' }}></div>
      </div>
      <div className={styles.stepConnector}></div>
    </div>
    <h3>Describe What You Need</h3>
    <p>Type your query in natural language - our AI understands exactly what you're looking for.</p>
    <div className={styles.stepHoverEffect} style={{ background: 'linear-gradient(135deg, rgba(13,110,253,0.1) 0%, rgba(13,110,253,0) 100%)' }}></div>
  </div>
  
  {/* Step 2 */}
  <div className={styles.step}>
    <div className={styles.stepVisual}>
      <div className={styles.stepNumber}>2</div>
      <div className={styles.stepIllustration}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16" className={styles.stepIcon}>
          <path d="M5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
          <path d="M8.5 4.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H7.5a.5.5 0 0 1 0-1H8V5a.5.5 0 0 1 .5-.5z"/>
        </svg>
        <div className={styles.stepGlow} style={{ background: 'radial-gradient(circle, rgba(111,66,193,0.3) 0%, rgba(111,66,193,0) 70%)' }}></div>
      </div>
      <div className={styles.stepConnector}></div>
    </div>
    <h3>AI Analyzes Products</h3>
    <p>Our system scans thousands of products to find the best matches for your requirements.</p>
    <div className={styles.stepHoverEffect} style={{ background: 'linear-gradient(135deg, rgba(111,66,193,0.1) 0%, rgba(111,66,193,0) 100%)' }}></div>
  </div>
  
  {/* Step 3 */}
  <div className={styles.step}>
    <div className={styles.stepVisual}>
      <div className={styles.stepNumber}>3</div>
      <div className={styles.stepIllustration}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16" className={styles.stepIcon}>
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        <div className={styles.stepGlow} style={{ background: 'radial-gradient(circle, rgba(25,135,84,0.3) 0%, rgba(25,135,84,0) 70%)' }}></div>
      </div>
    </div>
    <h3>Compare & Decide</h3>
    <p>View comprehensive results with detailed comparisons to make the best choice.</p>
    <div className={styles.stepHoverEffect} style={{ background: 'linear-gradient(135deg, rgba(25,135,84,0.1) 0%, rgba(25,135,84,0) 100%)' }}></div>
  </div>
</div>
      </section>

      {/* Video Demo Section */}
<section className={styles.videoSection}>
  <div className={styles.videoContainer}>
    <div className={styles.videoPlaceholder}>
   <img 
  src={thumbnail} 
  alt="AI Shopping Experience" 
  className={styles.videoThumbnail}
/>

    </div>
    <div className={styles.videoContent}>
      <h2>See FindoraAI in Action</h2>
      <p>Start searching with FindoraAI and switch your shopping experience to the next level.</p>
    
    </div>
  </div>
</section>

      {/* Premium Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2>Trusted by Thousands</h2>
          <p className={styles.sectionSubtitle}>What our users say about FindoraAI</p>
        </div>
        
        <div className={styles.testimonialCards}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialRating}>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
            <p className={styles.testimonialText}>
              "I found the perfect gaming laptop in minutes. The price comparisons saved me $200 and the specs were exactly what I needed."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar} style={{ backgroundImage: 'url(https://randomuser.me/api/portraits/men/32.jpg)' }}></div>
              <div>
                <strong>Karim M.</strong>
                <span>Tech Enthusiast</span>
              </div>
            </div>
            <div className={styles.companyLogo}>
              <i className="bi bi-google"></i>
            </div>
          </div>
          
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialRating}>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
            </div>
            <p className={styles.testimonialText}>
              "No more endless searching across multiple sites. I just describe what I want and FindoraAI shows me the best options instantly."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar} style={{ backgroundImage: 'url(https://randomuser.me/api/portraits/women/44.jpg)' }}></div>
              <div>
                <strong>Amina R.</strong>
                <span>Small Business Owner</span>
              </div>
            </div>
            <div className={styles.companyLogo}>
              <i className="bi bi-apple"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
<section className={styles.ctaSection}>
  <div className={styles.ctaContainer}>
    <div className={styles.ctaContent}>
      <h2>Ready to Experience Smarter Shopping?</h2>
      <p>Join thousands of users who save time and money with FindoraAI</p>
      {!isAuthenticated ? (
        <div className={styles.ctaButtons}>
          <Link to="/signup" className={styles.primaryBtn}>
            <i className="bi bi-rocket"></i> Get Started Free
          </Link>

        </div>
      ) : (
        <Link to="/" className={styles.primaryBtn}>
          <i className="bi bi-search"></i> Join Us Today!
        </Link>
        
      )}
    </div>
    <div className={styles.ctaIllustration}>
      <div className={styles.floatingElements}>
        {/* Floating element with product image */}
        <div className={styles.floatingElement1}>
          <img 
            src="https://images.unsplash.com/photo-1546868871-7041f2a55e12" 
            alt="Tech product" 
            className={styles.floatingImage}
          />
        </div>
        
        {/* Floating element with shopping concept */}
        <div className={styles.floatingElement2}>
          <img 
            src="https://cdn.mos.cms.futurecdn.net/3kcgKLkfPRbskpsYzW239d.jpg" 
            alt="Shopping concept" 
            className={styles.floatingImage}
          />
        </div>
        
        {/* Floating element with savings concept */}
        <div className={styles.floatingElement3}>
          <img 
            src="https://variety.com/wp-content/uploads/2024/09/Sony-PlayStation-Pro-5.png" 
            alt="Savings concept" 
            className={styles.floatingImage}
          />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Premium Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <span>Findora</span>
                <span>AI</span>
              </div>
              <p className={styles.footerDescription}>
                AI-powered product discovery that helps you find exactly what you need with precision and ease.
              </p>
<div className={styles.socialLinks}>
  {/* Twitter/X */}
  <a href="#" className={styles.socialIcon} aria-label="Twitter">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
    </svg>
  </a>

  {/* Facebook */}
  <a href="#" className={styles.socialIcon} aria-label="Facebook">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
    </svg>
  </a>



  {/* Instagram */}
  <a href="#" className={styles.socialIcon} aria-label="Instagram">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
    </svg>
  </a>
</div>
            </div>
            
            <div className={styles.footerGrid}>
              <div className={styles.footerColumn}>
                <h4>Product</h4>
                <ul>
                  <li><Link to="/features">Features</Link></li>
                  <li><Link to="/demo">Demo</Link></li>
                </ul>
              </div>
              
              <div className={styles.footerColumn}>
                <h4>Company</h4>
                <ul>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                </ul>
              </div>
              

              
              <div className={styles.footerColumn}>
                <h4>Legal</h4>
                <ul>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-service">Terms of Service</Link></li>
                  <li><Link to="/cookie-policy">Cookies Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} FindoraAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;


