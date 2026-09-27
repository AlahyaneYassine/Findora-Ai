import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Features() {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedFeature, setExpandedFeature] = useState(null);

  const featureCategories = [
    { id: 'all', name: 'All Features' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'security', name: 'Security' }
  ];

const features = [
  {
    id: 1,
    title: "Recherche intelligente avec IA",
    description: "Trouvez rapidement les meilleurs produits grâce à l’IA.",
    longDescription: "Notre système interroge l’API eBay avec des mots-clés, analyse les résultats, filtre les produits non valides, et vous propose uniquement des produits pertinents et fiables.",
    category: 'search',
    icon: "🔍",
    stats: "95% de pertinence au premier essai"
  },
  {
    id: 2,
    title: "Comparaison multi-sources",
    description: "Comparez plusieurs produits sur un seul écran.",
    longDescription: "Affichez les prix, les images, les fournisseurs, les notes, et les descriptions pour chaque produit dans une vue simplifiée. Évitez de jongler entre 10 onglets.",
    category: 'comparison',
    icon: "⚖️",
    stats: "Décision 4x plus rapide"
  },
  {
    id: 3,
    title: "Suivi des produits sélectionnés",
    description: "Sélectionnez et sauvegardez vos produits favoris.",
    longDescription: "Ajoutez des produits à votre sélection personnelle pour les comparer plus tard ou les garder en mémoire avant l’achat.",
    category: 'selection',
    icon: "🛒",
    stats: "85% des utilisateurs utilisent la sélection"
  },
  {
    id: 4,
    title: "Profil utilisateur personnalisé",
    description: "Gérez vos informations et préférences.",
    longDescription: "Créez un profil, mettez à jour votre nom, adresse, avatar et suivez vos activités dans l’application.",
    category: 'profile',
    icon: "👤",
    stats: "70% des utilisateurs complètent leur profil"
  },
  {
    id: 5,
    title: "Sécurité via authentification JWT",
    description: "Connexion sécurisée avec token.",
    longDescription: "Chaque utilisateur est protégé par un système JWT (JSON Web Token), garantissant la confidentialité de vos données et une authentification fiable.",
    category: 'security',
    icon: "🔐",
    stats: "100% des accès vérifiés par token"
  },
  {
    id: 6,
    title: "Interface moderne et responsive",
    description: "Conçu pour tous les appareils.",
    longDescription: "L’application est fluide, rapide, et adaptative. Elle fonctionne parfaitement sur mobile, tablette et desktop.",
    category: 'design',
    icon: "📱",
    stats: "92% de satisfaction utilisateur"
  },
  {
    id: 7,
    title: "Formulaire de contact intégré",
    description: "Contactez facilement l’équipe via l’app.",
    longDescription: "Les utilisateurs peuvent envoyer des messages via le formulaire. Les messages sont sauvegardés dans la base de données MongoDB pour un suivi rapide.",
    category: 'contact',
    icon: "📨",
    stats: "100% des messages reçus en base"
  },
  {
    id: 8,
    title: "Filtrage de données fiable",
    description: "Nettoyage et parsing JSON automatiques.",
    longDescription: "Le backend analyse les données brutes (IA ou API) pour n’afficher que des informations exploitables : produits valides, images disponibles, prix corrects, etc.",
    category: 'utils',
    icon: "🧹",
    stats: "Zéro erreur d'affichage sur 100+ requêtes"
  },
  {
    id: 9,
    title: "Sélection persistante (localStorage)",
    description: "Vos sélections restent sauvegardées.",
    longDescription: "Même en fermant le navigateur, vos produits sélectionnés restent en mémoire grâce au localStorage (stockage local).",
    category: 'UX',
    icon: "💾",
    stats: "Sélection disponible même après redémarrage"
  },
   {
    id: 10,
    title: "Modèles de recherche sauvegardés",
    description: "Créez et réutilisez vos recherches fréquentes.",
    longDescription: "Les utilisateurs peuvent enregistrer des modèles de recherche (catégorie + mot-clé) pour les relancer plus tard en un clic. Gain de temps assuré.",
    category: 'productivity',
    icon: "📑",
    stats: "Économise jusqu'à 15 minutes par session"
  },
  {
    id: 13,
    title: "Analyse des tendances de recherche",
    description: "Suivez vos habitudes de recherche au fil du temps.",
    longDescription: "Un tableau de bord personnalisé vous montre votre historique de recherche, les produits les plus consultés et votre comportement d’achat pour mieux optimiser vos choix.",
    category: 'analytics',
    icon: "📈",
    stats: "68% des utilisateurs affinent leur stratégie"
  },
  {
    id: 14,
    title: "Graphiques d’évolution des prix",
    description: "Visualisez les variations de prix avant d’acheter.",
    longDescription: "Des graphiques interactifs montrent l’évolution des prix pour vous permettre d’acheter au bon moment (quand le prix est bas).",
    category: 'analytics',
    icon: "💹",
    stats: "22% d’économie moyenne avec un bon timing"
  },
  {
    id: 15,
    title: "Protection des données personnelles",
    description: "Vos préférences et recherches sont sécurisées.",
    longDescription: "Toutes les données (profil, recherches, sélection) sont protégées avec chiffrement JWT côté backend. Aucune fuite possible.",
    category: 'security',
    icon: "🔒",
    stats: "100% des requêtes protégées par token"
  },
  {
    id: 16,
    title: "Système de vérification des vendeurs",
    description: "Achetez uniquement chez des vendeurs fiables.",
    longDescription: "L'algorithme vérifie les vendeurs eBay selon leur note, historique et réputation. Les arnaqueurs ou comptes douteux sont automatiquement filtrés.",
    category: 'security',
    icon: "🛡️",
    stats: "99.7% des vendeurs douteux sont bloqués"
  }
  ];

  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeTab);

  const toggleFeatureExpansion = (id) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  const testimonials = [
    {
      quote: "Findora completely changed how I shop online. I found the best deals on a new phone in minutes — no stress, no endless tabs.",
      author: "Sarah Lamine",
      role: "Freelance UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The AI product search is so accurate it feels like magic. It helped me compare prices and features instantly across different stores.",
      author: "Michael Haddad",
      role: "Tech Enthusiast & YouTuber",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "I love how Findora brings everything together — prices, reviews, and even trustworthy sources. It's my go-to before buying anything.",
      author: "Priya Amrani",
      role: "Small Business Owner",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    }
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Animated Background Elements */}
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      
      {/* Navigation */}
      <nav style={styles.navbar}>
        <Link to="/features" style={styles.logoLink}>
          <div style={styles.logo}>Findora</div>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/home" style={styles.navLink}>Home</Link>
          <Link to="/how-it-works" style={styles.navLink}>How It Works</Link>
          <Link to="/about" style={styles.navLink}>About</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Powerful Features</h1>
          <p style={styles.heroSubtitle}>Everything you need to discover smarter, decide faster, and do more.</p>
          <div style={styles.heroButtons}>
            <Link to="/" style={styles.primaryButton}>Join Our Journey</Link>
            
          </div>
        </div>
      </section>

      {/* Features Tabs */}
      <section style={styles.section}>
        <div style={styles.tabsContainer}>
          <div style={styles.tabsHeader}>
            {featureCategories.map(category => (
              <button
                key={category.id}
                style={{
                  ...styles.tabButton,
                  backgroundColor: activeTab === category.id ? '#4B5563' : 'transparent',
                  color: activeTab === category.id ? 'white' : '#4B5563'
                }}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={styles.section}>
        <div style={styles.featuresGrid}>
          {filteredFeatures.map(feature => (
            <div 
              key={feature.id} 
              style={styles.featureCard}
              onClick={() => toggleFeatureExpansion(feature.id)}
            >
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
              
              {expandedFeature === feature.id && (
                <div style={styles.featureExpanded}>
                  <p style={styles.featureLongDescription}>{feature.longDescription}</p>
                  <div style={styles.featureStats}>
                    <span style={styles.statsIcon}>📈</span>
                    <span>{feature.stats}</span>
                  </div>
                </div>
              )}
              
              <div style={styles.featureToggle}>
                {expandedFeature === feature.id ? 'Show less' : 'Learn more'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
<section style={styles.benefitsSection}>
  <div style={styles.benefitsContainer}>
    <div style={styles.benefitsContent}>
      <h2 style={styles.benefitsTitle}>Why Choose Findora?</h2>
      <div style={styles.benefitsGrid}>
        <div style={styles.benefitCard}>
          <div style={styles.benefitIcon}>🧠</div>
          <h3 style={styles.benefitTitle}>AI-Powered Search</h3>
          <p style={styles.benefitText}>
            Let our smart AI agent scan the web and find the most relevant products instantly.
          </p>
        </div>
        <div style={styles.benefitCard}>
          <div style={styles.benefitIcon}>📊</div>
          <h3 style={styles.benefitTitle}>Detailed Comparisons</h3>
          <p style={styles.benefitText}>
            Compare prices, reviews, ratings, and features — all in one clear, unified view.
          </p>
        </div>
        <div style={styles.benefitCard}>
          <div style={styles.benefitIcon}>💸</div>
          <h3 style={styles.benefitTitle}>Best Deals Guaranteed</h3>
          <p style={styles.benefitText}>
            Stay ahead of price drops with real-time tracking and save on every purchase.
          </p>
        </div>
        <div style={styles.benefitCard}>
          <div style={styles.benefitIcon}>🔍</div>
          <h3 style={styles.benefitTitle}>Trustworthy Data</h3>
          <p style={styles.benefitText}>
            Every product detail comes from verified sources so you can shop with confidence.
          </p>
        </div>
      </div>
    </div>

    {/* Illustration Image */}
    <div style={styles.benefitsIllustration}>
      <div style={styles.illustrationContainer}>
        <img
          src="https://www.oraro.co.ke/wp-content/uploads/2024/11/1-1024x540.jpg" // Replace with your actual image path
          alt="AI Product Search Illustration"
          style={{ width: '100%', height: '100%', borderRadius: '20px' }}
        />
      </div>
    </div>
  </div>
</section>


      {/* Testimonials Section */}
      <section style={styles.testimonialsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>What Our Users Say About Findora?</h2>
          <p style={styles.sectionSubtitle}>Your shortcut to finding the right product, at the right price</p>
        </div>
        
        <div style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={styles.testimonialCard}>
              <div style={styles.testimonialQuote}>"{testimonial.quote}"</div>
              <div style={styles.testimonialAuthor}>
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  style={styles.testimonialAvatar}
                />
                <div>
                  <div style={styles.testimonialName}>{testimonial.author}</div>
                  <div style={styles.testimonialRole}>{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Work?</h2>
          <p style={styles.ctaText}>Join thousands of teams already achieving more with Findora</p>
          <div style={styles.ctaButtons}>
            <Link to="/signup" style={styles.ctaPrimaryButton}>Start Free Trial</Link>
            <Link to="/demo" style={styles.ctaSecondaryButton}>Request Demo</Link>
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
    justifyContent: 'center',
    padding: '100px 40px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  heroContent: {
    maxWidth: '800px'
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '20px',
    lineHeight: '1.2',
    background: 'linear-gradient(90deg, #1F2937, #4B5563)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#4B5563',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
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
  section: {
    padding: '80px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  },
  tabsContainer: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    marginBottom: '40px'
  },
  tabsHeader: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  tabButton: {
    padding: '16px 24px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.2s',
    flex: '1 1 auto',
    minWidth: '150px'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px'
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },
  featureIcon: {
    fontSize: '40px',
    marginBottom: '20px'
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '12px'
  },
  featureDescription: {
    fontSize: '15px',
    color: '#6B7280',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  featureExpanded: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #E5E7EB'
  },
  featureLongDescription: {
    fontSize: '15px',
    color: '#4B5563',
    lineHeight: '1.8',
    marginBottom: '20px'
  },
  featureStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#4B5563',
    fontWeight: '500',
    backgroundColor: '#F3F4F6',
    padding: '10px 16px',
    borderRadius: '8px'
  },
  statsIcon: {
    fontSize: '18px'
  },
  featureToggle: {
    color: '#4B5563',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  benefitsSection: {
    backgroundColor: '#1F2937',
    padding: '80px 40px',
    position: 'relative',
    zIndex: 1,
    margin: '80px 0'
  },
  benefitsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '60px'
  },
  benefitsContent: {
    flex: 1,
    minWidth: '300px'
  },
  benefitsTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '40px'
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px'
  },
  benefitCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '30px',
    transition: 'all 0.3s ease'
  },
  benefitIcon: {
    fontSize: '32px',
    marginBottom: '16px'
  },
  benefitTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '12px'
  },
  benefitText: {
    fontSize: '15px',
    color: '#D1D5DB',
    lineHeight: '1.6'
  },
  benefitsIllustration: {
    flex: 1,
    minWidth: '300px'
  },
  illustrationContainer: {
    width: '100%',
    height: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    border: '1px dashed rgba(255, 255, 255, 0.2)'
  },
  testimonialsSection: {
    padding: '80px 40px',
    maxWidth: '1400px',
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
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '30px'
  },
  testimonialCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
  },
  testimonialQuote: {
    fontSize: '18px',
    color: '#4B5563',
    lineHeight: '1.8',
    fontStyle: 'italic',
    marginBottom: '24px',
    position: 'relative'
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  testimonialAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  testimonialName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  testimonialRole: {
    fontSize: '14px',
    color: '#6B7280'
  },
  pricingSection: {
    backgroundColor: '#4B5563',
    padding: '80px 40px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    margin: '80px 0'
  },
  pricingContainer: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  pricingTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '16px'
  },
  pricingText: {
    fontSize: '18px',
    color: '#E5E7EB',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  pricingButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
  },
  pricingButton: {
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
  ctaSection: {
    backgroundColor: '#F9FAFB',
    padding: '80px 40px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    borderTop: '1px solid #E5E7EB',
    borderBottom: '1px solid #E5E7EB'
  },
  ctaContent: {
    maxWidth: '700px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px'
  },
  ctaText: {
    fontSize: '18px',
    color: '#6B7280',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
  },
  ctaPrimaryButton: {
    backgroundColor: '#4B5563',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  ctaSecondaryButton: {
    backgroundColor: 'white',
    color: '#4B5563',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #E5E7EB'
  },
  footer: {
    backgroundColor: 'white',
    padding: '60px 40px 0',
    position: 'relative',
    zIndex: 1
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

export default Features;