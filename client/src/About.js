import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function About() {
  const [activeTab, setActiveTab] = useState('mission');
  const [hoveredTeamMember, setHoveredTeamMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Visionary leader with 15+ years in tech innovation and business strategy.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "CTO",
      bio: "Engineering expert specializing in scalable architecture and cutting-edge technologies.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Head of Product",
      bio: "Product strategist passionate about creating intuitive user experiences.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Lead Designer",
      bio: "Creative director with an eye for elegant, functional design solutions.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50+", label: "Countries" },
    { value: "24/7", label: "Support" },
    { value: "99.9%", label: "Uptime" }
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Animated Background Elements */}
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      
      {/* Navigation */}
      <nav style={styles.navbar}>
        <Link to="/about" style={styles.logoLink}>
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
          <h1 style={styles.heroTitle}>Our Story</h1>
          <p style={styles.heroSubtitle}>Discover the passion and innovation behind Findora that's transforming industries</p>
          <div style={styles.heroButtons}>
            <Link to="/" style={styles.primaryButton}>Join Our Journey</Link>
            <Link to="/contact" style={styles.secondaryButton}>Contact Us</Link>
          </div>
        </div>
       <div style={styles.heroIllustration}>
  <div style={styles.illustrationContainer}>
    <img 
      src="https://www.artificialintelligence-news.com/wp-content/uploads/2024/12/ai-artificial-intelligence-machine-learning-research-privacy-ethics-development.jpg" 
      alt="AI Technology Illustration"
      style={styles.heroImage}
    />
    <div style={styles.animatedOverlay}></div>
  </div>
</div>
      </section>

      {/* About Tabs Section */}
      <section style={styles.section}>
        <div style={styles.tabsContainer}>
          <div style={styles.tabsHeader}>
            <button
              style={{
                ...styles.tabButton,
                borderBottom: activeTab === 'mission' ? '3px solid #4B5563' : 'none',
                color: activeTab === 'mission' ? '#111827' : '#6B7280'
              }}
              onClick={() => setActiveTab('mission')}
            >
              Our Mission
            </button>
            <button
              style={{
                ...styles.tabButton,
                borderBottom: activeTab === 'vision' ? '3px solid #4B5563' : 'none',
                color: activeTab === 'vision' ? '#111827' : '#6B7280'
              }}
              onClick={() => setActiveTab('vision')}
            >
              Our Vision
            </button>
            <button
              style={{
                ...styles.tabButton,
                borderBottom: activeTab === 'values' ? '3px solid #4B5563' : 'none',
                color: activeTab === 'values' ? '#111827' : '#6B7280'
              }}
              onClick={() => setActiveTab('values')}
            >
              Our Values
            </button>
          </div>
          
          <div style={styles.tabContent}>
            {activeTab === 'mission' && (
              <div style={styles.tabPanel}>
                <h3 style={styles.tabPanelTitle}>Empowering Innovation Through Technology</h3>
                <p style={styles.tabPanelText}>
                  At Findora, we're on a mission to revolutionize the way businesses and individuals interact with technology. 
                  We believe in creating solutions that are not just powerful, but also intuitive and accessible to everyone.
                </p>
                <p style={styles.tabPanelText}>
                  Our team of experts works tirelessly to bridge the gap between complex technology and seamless user experiences, 
                  ensuring that our platform delivers real value to every user.
                </p>
              </div>
            )}
            
            {activeTab === 'vision' && (
              <div style={styles.tabPanel}>
                <h3 style={styles.tabPanelTitle}>Shaping the Future of Digital Solutions</h3>
                <p style={styles.tabPanelText}>
                  We envision a world where technology adapts to human needs, not the other way around. Our vision is to 
                  create an ecosystem where innovation thrives and barriers to digital transformation are eliminated.
                </p>
                <p style={styles.tabPanelText}>
                  By 2025, we aim to be the platform of choice for over 1 million users worldwide, setting new standards 
                  for quality, reliability, and user satisfaction in our industry.
                </p>
              </div>
            )}
            
            {activeTab === 'values' && (
              <div style={styles.tabPanel}>
                <h3 style={styles.tabPanelTitle}>The Principles That Guide Us</h3>
                <div style={styles.valuesGrid}>
                  <div style={styles.valueCard}>
                    <div style={styles.valueIcon}>💡</div>
                    <h4 style={styles.valueTitle}>Innovation</h4>
                    <p style={styles.valueDescription}>We constantly push boundaries to deliver cutting-edge solutions</p>
                  </div>
                  <div style={styles.valueCard}>
                    <div style={styles.valueIcon}>🤝</div>
                    <h4 style={styles.valueTitle}>Integrity</h4>
                    <p style={styles.valueDescription}>We do what's right, even when no one is watching</p>
                  </div>
                  <div style={styles.valueCard}>
                    <div style={styles.valueIcon}>❤️</div>
                    <h4 style={styles.valueTitle}>Passion</h4>
                    <p style={styles.valueDescription}>We love what we do and it shows in our work</p>
                  </div>
                  <div style={styles.valueCard}>
                    <div style={styles.valueIcon}>🌍</div>
                    <h4 style={styles.valueTitle}>Impact</h4>
                    <p style={styles.valueDescription}>We measure success by the value we create for our users</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Meet Our Team</h2>
          <p style={styles.sectionSubtitle}>The brilliant minds behind Findora's success</p>
        </div>
        
        <div style={styles.teamGrid}>
          {teamMembers.map(member => (
            <div 
              key={member.id} 
              style={styles.teamCard}
              onMouseEnter={() => setHoveredTeamMember(member.id)}
              onMouseLeave={() => setHoveredTeamMember(null)}
            >
              <div style={{
                ...styles.teamImage,
                backgroundImage: `url(${member.image})`,
                transform: hoveredTeamMember === member.id ? 'scale(1.05)' : 'scale(1)'
              }}></div>
              <div style={styles.teamInfo}>
                <h3 style={styles.teamName}>{member.name}</h3>
                <p style={styles.teamRole}>{member.role}</p>
                {hoveredTeamMember === member.id && (
                  <p style={styles.teamBio}>{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

{/* Creative Timeline Section */}
<section style={styles.section}>
  <div style={styles.sectionHeader}>
    <h2 style={styles.sectionTitle}>Our Journey</h2>
    <p style={styles.sectionSubtitle}>Key milestones in Findora's evolution</p>
  </div>
  
  <div style={styles.timelineContainer}>
    <div style={styles.timelineLine}></div>
    
    <div style={styles.timeline}>
      {/* Timeline Item 1 */}
      <div style={styles.timelineItem}>
        <div style={styles.timelineDot}>
          <div style={styles.innerDot}></div>
          <div style={styles.pulseEffect}></div>
        </div>
        <div style={styles.timelineContent}>
          <div style={styles.timelineCard}>
            <div style={styles.yearBadge}>2018</div>
            <h3 style={styles.timelineTitle}>Company Founded</h3>
            <p style={styles.timelineDescription}>
              Findora was born from a simple idea: to make powerful technology accessible to everyone.
            </p>
            <div style={styles.timelineIcon}>🚀</div>
          </div>
        </div>
      </div>

      {/* Timeline Item 2 */}
      <div style={styles.timelineItem}>
        <div style={styles.timelineDot}>
          <div style={styles.innerDot}></div>
          <div style={styles.pulseEffect}></div>
        </div>
        <div style={styles.timelineContent}>
          <div style={styles.timelineCard}>
            <div style={styles.yearBadge}>2019</div>
            <h3 style={styles.timelineTitle}>First Product Launch</h3>
            <p style={styles.timelineDescription}>
              Our MVP launched to positive reception, validating our core concepts.
            </p>
            <div style={styles.timelineIcon}>🛠️</div>
          </div>
        </div>
      </div>

      {/* Timeline Item 3 */}
      <div style={styles.timelineItem}>
        <div style={styles.timelineDot}>
          <div style={styles.innerDot}></div>
          <div style={styles.pulseEffect}></div>
        </div>
        <div style={styles.timelineContent}>
          <div style={styles.timelineCard}>
            <div style={styles.yearBadge}>2020</div>
            <h3 style={styles.timelineTitle}>Series A Funding</h3>
            <p style={styles.timelineDescription}>
              Secured $10M in funding to accelerate product development and team growth.
            </p>
            <div style={styles.timelineIcon}>💰</div>
          </div>
        </div>
      </div>

      {/* Timeline Item 4 */}
      <div style={styles.timelineItem}>
        <div style={styles.timelineDot}>
          <div style={styles.innerDot}></div>
          <div style={styles.pulseEffect}></div>
        </div>
        <div style={styles.timelineContent}>
          <div style={styles.timelineCard}>
            <div style={styles.yearBadge}>2021</div>
            <h3 style={styles.timelineTitle}>Platform 2.0</h3>
            <p style={styles.timelineDescription}>
              Major update introduced AI-powered features and enhanced analytics.
            </p>
            <div style={styles.timelineIcon}>🤖</div>
          </div>
        </div>
      </div>

      {/* Timeline Item 5 */}
      <div style={styles.timelineItem}>
        <div style={styles.timelineDot}>
          <div style={styles.innerDot}></div>
          <div style={styles.pulseEffect}></div>
        </div>
        <div style={styles.timelineContent}>
          <div style={styles.timelineCard}>
            <div style={styles.yearBadge}>2022</div>
            <h3 style={styles.timelineTitle}>Global Expansion</h3>
            <p style={styles.timelineDescription}>
              Expanded operations to Europe and Asia, serving clients in 50+ countries.
            </p>
            <div style={styles.timelineIcon}>🌎</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Be Part of Our Story?</h2>
          <p style={styles.ctaText}>Join thousands of businesses already transforming their operations with Findora</p>
          <div style={styles.ctaButtons}>
            <Link to="/signup" style={styles.ctaPrimaryButton}>Start Free Trial</Link>
            <Link to="/contact" style={styles.ctaSecondaryButton}>Contact Sales</Link>
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
  0% { box-shadow: 0 0 5px 2px rgba(75, 85, 99, 0.5); }
  50% { box-shadow: 0 0 15px 6px rgba(75, 85, 99, 0.9); }
  100% { box-shadow: 0 0 5px 2px rgba(75, 85, 99, 0.5); }
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
  tabsContainer: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden'
  },
  tabsHeader: {
    display: 'flex',
    borderBottom: '1px solid #E5E7EB'
  },
  tabButton: {
    padding: '20px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s'
  },
  tabContent: {
    padding: '40px'
  },
  tabPanel: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  tabPanelTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '20px'
  },
  tabPanelText: {
    fontSize: '16px',
    color: '#6B7280',
    lineHeight: '1.8',
    marginBottom: '20px'
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px',
    marginTop: '30px'
  },
  valueCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
    padding: '30px',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  },
  valueIcon: {
    fontSize: '36px',
    marginBottom: '16px'
  },
  valueTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '12px'
  },
  valueDescription: {
    fontSize: '15px',
    color: '#6B7280',
    lineHeight: '1.6'
  },
  statsSection: {
    backgroundColor: '#1F2937',
    padding: '60px 40px',
    position: 'relative',
    zIndex: 1
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  statCard: {
    textAlign: 'center',
    minWidth: '200px'
  },
  statValue: {
    fontSize: '48px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '16px',
    color: '#D1D5DB',
    fontWeight: '500'
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px',
    marginTop: '40px'
  },
  teamCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease'
  },
  teamImage: {
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.3s ease'
    
  },
  teamInfo: {
    padding: '24px',
    textAlign: 'center'
  },
  teamName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '4px'
  },
  teamRole: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '12px'
  },
  teamBio: {
    fontSize: '14px',
    color: '#4B5563',
    lineHeight: '1.6',
    marginTop: '12px'
  },

  /* ====== UPDATED TIMELINE SECTION ====== */
  timelineContainer: {
    position: 'relative',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '60px 0',
  },
  timelineLine: {
    position: 'absolute',
    left: '50%',
    top: '0',
    bottom: '0',
    width: '4px',
    backgroundColor: '#E5E7EB',
    transform: 'translateX(-50%)',
    zIndex: '1',
    '@media (max-width: 768px)': {
      left: '30px',
    },
  },
  timeline: {
    position: 'relative',
    zIndex: '2',
  },
  timelineItem: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '60px',
    position: 'relative',
    '&:last-child': {
      marginBottom: '0',
    },
    '@media (max-width: 768px)': {
      justifyContent: 'flex-start',
    },
  },
  timelineDot: {
    position: 'absolute',
    left: '50%',
    top: '20px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#4B5563',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '3',
    border: '4px solid #F9FAFB',
    boxShadow: '0 0 0 2px #4B5563',
    '@media (max-width: 768px)': {
      left: '30px',
    },
  },
  timelineContent: {
    width: 'calc(50% - 40px)',
    '@media (max-width: 768px)': {
      width: 'calc(100% - 80px)',
      marginLeft: '80px',
    },
  },
  timelineCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    position: 'relative',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    },
  },
  yearBadge: {
    display: 'inline-block',
    backgroundColor: '#4B5563',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '15px',
  },
  timelineTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '12px',
  },
  timelineDescription: {
    fontSize: '1rem',
    color: '#6B7280',
    lineHeight: '1.6',
  },
  timelineIcon: {
    position: 'absolute',
    fontSize: '2rem',
    opacity: '0.1',
    right: '30px',
    top: '30px',
  },
  timelineItemOdd: {
    '& $timelineContent': {
      paddingRight: 'calc(50% + 30px)',
      textAlign: 'right',
      '@media (max-width: 768px)': {
        paddingRight: '0',
        textAlign: 'left',
      },
    },
  },
  timelineItemEven: {
    '& $timelineContent': {
      paddingLeft: 'calc(50% + 30px)',
      textAlign: 'left',
      '@media (max-width: 768px)': {
        paddingLeft: '0',
      },
    },
  },
  /* ====== END OF UPDATED TIMELINE SECTION ====== */

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
    border: '1px solid #9CA3AF'
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

export default About;