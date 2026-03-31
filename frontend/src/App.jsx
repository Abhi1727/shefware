import { useMemo, useState, useEffect, useRef } from "react";
import "./App.css";

const navItems = [
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "Why Shefware", href: "#why-shefware" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

const clientLogos = [
  { name: "J.P. Morgan Chase & Co.", width: "78px", path: "/images/jp-morgan.png" },
  { name: "Microsoft", width: "78px", path: "/images/microsoft.png" },
  { name: "Cisco", width: "83px", path: "/images/cisco.png" },
  { name: "AWS", width: "74px", path: "/images/aws.png" },
  { name: "IBM", width: "110px", path: "/images/ibm.png" },
  { name: "Capgemini", width: "188px", path: "/images/capgemini.png" },
];

const featuredSolutions = [
  {
    title: "Office 365 Migration",
    description: "We safely migrate mailboxes, contacts, folders, and calendars between Microsoft tenants with no loss of data.",
    icon: "/images/microsoft-office.png",
    borderColor: "#3B82F6",
    position: { left: "0px", right: "954px", top: "40px" }
  },
  {
    title: "Tenant Migration",
    description: "Without any timeout between tenants, migrate users, mailboxes, and permissions.",
    icon: "/images/data-migration.png",
    borderColor: "#EF4444",
    position: { left: "318px", right: "636px", top: "40px" }
  },
  {
    title: "Email Conversion",
    description: "Easily export Outlook data files quickly and securely with high file support.",
    icon: "/images/gemini-generated.png",
    borderColor: "#22C55E",
    position: { left: "636px", right: "318px", top: "40px" }
  },
  {
    title: "Text",
    description: "Safeguard email data with upgraded IMAP and local backup tools.",
    icon: "/images/backup-icon.png",
    borderColor: "#F97316",
    position: { left: "954px", right: "0px", top: "40px" }
  }
];

const migrationBenefits = [
  {
    title: "Deliver Accurate Data",
    width: "187px"
  },
  {
    title: "Increased Data Quality",
    width: "175.44px"
  },
  {
    title: "Manage Identification",
    width: "168.45px"
  },
  {
    title: "24/7 Support",
    width: "136px"
  }
];

const valuePropositions = [
  {
    title: "Automated Workflows",
    description: "Intelligent automation that eliminates manual tasks and accelerates your business processes.",
    icon: "🚀"
  },
  {
    title: "Seamless Integration",
    description: "Connect all your tools and platforms effortlessly with our unified ecosystem.",
    icon: "�"
  },
  {
    title: "Real-time Analytics",
    description: "Get instant insights and make data-driven decisions with powerful analytics dashboards.",
    icon: "�"
  }
];

const whyShefwareFeatures = [
  {
    title: "Fast Performance",
    description: "Lightning-fast migration and backup speeds with optimized data processing algorithms.",
    icon: "⚡"
  },
  {
    title: "Secure & Compliant",
    description: "Meet industry compliance standards with encrypted data transfer and secure protocols.",
    icon: "🛡️"
  },
  {
    title: "Automated Workflows",
    description: "Set up automated backup and migration schedules with intelligent scheduling.",
    icon: "🔄"
  }
];

const newMetrics = [
  { value: "9+", label: "Years of Experience" },
  { value: "10M+", label: "Happy Customers" },
  { value: "50+", label: "Partners Worldwide" },
  { value: "2", label: "Global Offices" },
  { value: "100+", label: "Strong Team" },
  { value: "50+", label: "R&D Engineers" }
];

const platformIntegrations = [
  { name: "Office 365", icon: "✓" },
  { name: "AWS", icon: "✓" },
  { name: "Azure", icon: "✓" },
  { name: "Google Workspace", icon: "✓" },
  { name: "Microsoft Teams", icon: "✓" },
  { name: "IMAP", icon: "✓" }
];

const metrics = [
  { value: "10M+", label: "Records Migrated" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "50+", label: "Enterprise Projects" },
  { value: "24/7", label: "Monitoring & Support" },
];

const resources = [];

const initialFormState = {
  fullName: "",
  email: "",
  company: "",
  message: "",
};

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      // Parse the end value to handle different formats
      let numericEnd = end;
      if (typeof end === "string") {
        // Extract numeric part from strings like "10M+" or "99.9%"
        const match = end.match(/[\d.]+/);
        if (match) {
          numericEnd = parseFloat(match[0]);
        }
      }

      const currentCount = numericEnd * easeOutQuart;

      // Format the display value
      let displayValue;
      if (typeof end === "string" && end.includes("M")) {
        displayValue = (currentCount / 1000000).toFixed(1) + "M+";
      } else if (typeof end === "string" && end.includes("%")) {
        displayValue = currentCount.toFixed(1) + "%";
      } else if (typeof end === "string" && end.includes("+")) {
        displayValue = Math.floor(currentCount).toLocaleString() + "+";
      } else {
        displayValue = Math.floor(currentCount).toLocaleString();
      }

      setCount(displayValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation when component mounts
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);

  return <span>{count}</span>;
};

// Intersection Observer Hook for scroll animations
const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};

// Animated Section Component
const AnimatedSection = ({ children, className, animationDelay = 0 }) => {
  const sectionRef = useRef(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <div
      ref={sectionRef}
      className={`${className || ""} ${isVisible ? "animate-in" : "animate-out"}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {children}
    </div>
  );
};

function App() {
  const [formState, setFormState] = useState(initialFormState);
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const apiBaseUrl = useMemo(() => {
    const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
    return configuredBaseUrl.replace(/\/$/, "");
  }, []);

  const onChangeFormField = (event) => {
    const { name, value } = event.target;
    setFormState((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const onSubmitContactForm = async (event) => {
    event.preventDefault();
    setSubmitState({
      status: "loading",
      message: "Sending your request...",
    });

    try {
      const response = await fetch(`${apiBaseUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to send your request right now.");
      }

      setSubmitState({
        status: "success",
        message: data.message || "Thanks! We will reach out shortly.",
      });
      setFormState(initialFormState);
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="page-shell">
      {/* Top Navigation Bar */}
      <header className="top-nav-bar">
        <div className="container">
          <nav className="top-nav">
            <a href="#support">Support</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact Us</a>
          </nav>
        </div>
      </header>

      {/* Main Navigation */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand">
            <span>Shefware</span>
          </a>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>
          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="nav-actions">
              <button className="search-icon" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
              <a href="#contact" className="btn btn-primary nav-cta">
                Book a Demo
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <main id="main-content">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">AI-powered enterprise data migration</p>
              <h1>
                Transform Data.
                <br />
                <span className="highlight">Simplify Migration.</span>
                <br />
                Enable AI Innovation.
              </h1>
              <p className="hero-text">
                Shefware helps organizations move from legacy infrastructure to
                modern cloud ecosystems with performance, governance, and
                reliability built in.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">
                  Start Your Project
                </a>
                <a href="#process" className="btn btn-secondary">
                  Explore Process
                </a>
              </div>
              <div className="hero-kpis">
                <div>
                  <strong>1M+</strong>
                  <span>HAPPY CLIENTS</span>
                </div>
                <div>
                  <strong>100+</strong>
                  <span>PRODUCTS</span>
                </div>
                <div>
                  <strong>10+</strong>
                  <span>YEARS EXPERIENCE</span>
                </div>
              </div>
            </div>
            <aside className="hero-visual">
              {/* <div className="hero-image-placeholder">
                <div className="holographic-display">
                  <div className="cloud-icons">
                    <div className="cloud cloud-1">☁️</div>
                    <div className="cloud cloud-2">☁️</div>
                    <div className="cloud cloud-3">☁️</div>
                  </div>
                  <div className="person-laptop">
                    <div className="laptop-screen">
                      <div className="data-transfer">
                        <div className="arrow"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </aside>
          </div>
        </section>

        {/* Client Logo Section */}
        <section className="client-logo-section">
          <div className="container">
            <h2>Our Clients</h2>
            <div className="logo-row">
              {clientLogos.map((client, index) => (
                <img
                  key={client.name}
                  src={client.path}
                  alt={client.name}
                  style={{ width: client.width, height: '44px' }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Solutions Section */}
        <section className="featured-solutions">
          <div className="container">
            <div className="expertise-label">Our Expertise</div>
            <h2>Our All-in-One Email Data Services</h2>
            <p className="solutions-description">
              Shefware offers advanced services from email migrations to cloud backups, built for IT professionals and businesses.
            </p>
            <div className="solutions-container">
              {featuredSolutions.map((solution, index) => (
                <article 
                  key={solution.title} 
                  className={`solution-card solution-card-${index + 1}`}
                  style={{
                    borderTop: `4px solid ${solution.borderColor}`,
                    left: solution.position.left,
                    right: solution.position.right,
                    top: solution.position.top
                  }}
                >
                  <div className="solution-shadow"></div>
                  <img 
                    src={solution.icon} 
                    alt={solution.title}
                    className="solution-icon"
                  />
                  <div className="solution-content">
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                    <a href="#contact" className="read-more-link">Read More »</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Migration Experts Section */}
        <section className="migration-experts">
          <div className="container">
            <div className="migration-content">
              <div className="migration-label">Migration Experts</div>
              <h2>Migrate Data from Any SOURCE to Any Target!</h2>
              <p className="migration-description">
                Connect with Shefware for Managed or Assisted Migration Services. We use our in-house developed software applications for On-Premise & Cloud Based Data Migration Services.
              </p>
              <div className="benefits-list">
                {migrationBenefits.map((benefit, index) => (
                  <div key={benefit.title} className="benefit-item">
                    <div className="benefit-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="benefit-text">
                      <span style={{ width: benefit.width }}>{benefit.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="migration-image">
              <img 
                src="/images/male-entrepreneur-using-computer-while-working-office.jpg" 
                alt="Male entrepreneur using computer while working in office"
              />
            </div>
          </div>
        </section>

        {/* CTA Bar Section */}
        <section className="cta-bar">
          <div className="container">
            <div className="cta-content">
              <div className="cta-label">Your Trusted Partner</div>
              <h3>Start Managing Your Email Data Today</h3>
            </div>
            <div className="cta-actions">
              <a href="#contact" className="cta-contact-btn">
                <span>Contact Us »</span>
              </a>
              <button className="cta-icon-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="#007BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Hero & Discover Solutions Section */}
        <section className="hero-discover-solutions">
          <div className="background-decoration"></div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-margin"></div>
              <div className="hero-heading">
                <h1>Empower Your Workflow with Shefware</h1>
              </div>
              <div className="hero-margin"></div>
              <div className="hero-description">
                <p>
                  Streamline your operations with our comprehensive suite of tools designed to enhance productivity and drive success.
                </p>
              </div>
              <div className="hero-margin"></div>
              <div className="hero-actions">
                <button className="discover-btn">
                  <span>Discover Solutions</span>
                </button>
              </div>
              <div className="hero-margin"></div>
              <div className="value-propositions">
                {valuePropositions.map((prop, index) => (
                  <div key={prop.title} className={`value-card value-card-${index + 1}`}>
                    <div className="value-margin">
                      <div className="value-icon">
                        <span>{prop.icon}</span>
                      </div>
                    </div>
                    <div className="value-heading">
                      <h3>{prop.title}</h3>
                    </div>
                    <div className="value-description">
                      <p>{prop.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AnimatedSection id="why-shefware" className="section container">
          <div className="why-shefware-content">
            <div className="content-left">
              <div className="heading-container">
                <h2>Why Choose Shefware?</h2>
              </div>
              <div className="features-list">
                {whyShefwareFeatures.map((feature, index) => (
                  <div key={feature.title} className="feature-item">
                    <div className="feature-icon">
                      <span>{feature.icon}</span>
                    </div>
                    <div className="feature-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="learn-more-btn">
                <span>Learn More About Us</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="#FFFFFF" strokeWidth="1.33px" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="metrics-right">
              <div className="metrics-container">
                <div className="metrics-section">
                  <div className="metrics-grid-2x3">
                    <div className="metrics-row">
                      {newMetrics.slice(0, 3).map((metric, index) => (
                        <div key={metric.label} className={`metric-item metric-${index + 1}`}>
                          <div className="metric-margin">
                            <div className="metric-value">
                              <span>{metric.value}</span>
                            </div>
                          </div>
                          <div className="metric-label">
                            <span>{metric.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="metrics-row">
                      {newMetrics.slice(3, 6).map((metric, index) => (
                        <div key={metric.label} className={`metric-item metric-${index + 4}`}>
                          <div className="metric-margin">
                            <div className="metric-value">
                              <span>{metric.value}</span>
                            </div>
                          </div>
                          <div className="metric-label">
                            <span>{metric.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="platform-integrations">
                  <h3>Integrated With Leading Platforms</h3>
                  <div className="platforms-grid">
                    <div className="platform-row">
                      {platformIntegrations.slice(0, 3).map((platform, index) => (
                        <div key={platform.name} className="platform-item">
                          <div className="platform-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M20 6L9 17l-5-5" stroke="#00A63E" strokeWidth="1.67px" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>{platform.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="platform-row">
                      {platformIntegrations.slice(3, 6).map((platform, index) => (
                        <div key={platform.name} className="platform-item">
                          <div className="platform-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M20 6L9 17l-5-5" stroke="#00A63E" strokeWidth="1.67px" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span>{platform.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="hero-section architectural-intelligence">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <div className="architectural-badge">
                  <div className="badge-icon"></div>
                  <span>Architectural Intelligence</span>
                </div>
                <h1>Secure Infrastructure You Can Depend On</h1>
                <p className="hero-subheading">At every step, we protect your data!</p>
                <p className="hero-description">
                  We provide enterprise-grade solutions that combine cutting-edge technology with proven methodologies to deliver exceptional results for your business. Our comprehensive security measures ensure your data remains protected throughout the entire migration process.
                </p>
              </div>
              <div className="hero-visual infrastructure-visual">
                <div className="background-overlay"></div>
                <div className="server-image"></div>
                <div className="gradient-overlay"></div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="bento-grid-features-section">
          <div className="container">
            <div className="section-header">
              <h2>Core Security Architecture</h2>
              <div className="underline"></div>
            </div>
            <div className="features-grid">
              <div className="feature-card feature-1">
                <div className="feature-shadow"></div>
                <div className="feature-margin">
                  <div className="icon-background">
                    <div className="icon">
                      <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 8.5H2C1.44772 8.5 1 8.94772 1 9.5V18.5C1 19.0523 1.44772 19.5 2 19.5H14C14.5523 19.5 15 19.0523 15 18.5V9.5C15 8.94772 14.5523 8.5 14 8.5Z" stroke="#003178" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 8.5V5.5C4 4.30653 4.47411 3.16193 5.31802 2.31802C6.16193 1.47411 7.30653 1 8.5 1C9.69347 1 10.8381 1.47411 11.682 2.31802C12.5259 3.16193 13 4.30653 13 5.5V8.5" stroke="#003178" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="heading-margin">
                  <h3>Secure Connections Encryption</h3>
                </div>
                <div className="description-container">
                  <p>With the help of safe SSL/TLS-encrypted connections, all information transfer is performed. This makes sure that data stays safeguarded while being migrated, converted, and backed up.</p>
                </div>
              </div>

              <div className="feature-card feature-2">
                <div className="feature-shadow"></div>
                <div className="feature-margin">
                  <div className="icon-background">
                    <div className="icon">
                      <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="10.5" r="7.5" stroke="#003178" strokeWidth="2"/>
                        <path d="M9 6.5V10.5L11 12.5" stroke="#003178" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="heading-margin">
                  <h3>Not Permanent Data Processing</h3>
                </div>
                <div className="description-container">
                  <p>Your information is processed for the duration of the task. When the function is finished, the files are disconnected automatically to manage privacy and hinder unimportant storage.</p>
                </div>
              </div>

              <div className="feature-card feature-3">
                <div className="feature-shadow"></div>
                <div className="feature-margin">
                  <div className="icon-background">
                    <div className="icon">
                      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2.5H4C2.89543 2.5 2 3.39543 2 4.5V14.5C2 15.6046 2.89543 16.5 4 16.5H14C15.1046 16.5 16 15.6046 16 14.5V4.5C16 3.39543 15.1046 2.5 14 2.5Z" stroke="#003178" strokeWidth="2"/>
                        <path d="M6 8.5H12M6 11.5H10" stroke="#003178" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="heading-margin">
                  <h3>Privacy-based Infrastructure</h3>
                </div>
                <div className="description-container">
                  <p>Our privacy follows upgraded norms and offers GDPR compliance best practices. Also, accountable for maintaining the sensitive data.</p>
                </div>
              </div>

              <div className="feature-card feature-4">
                <div className="feature-shadow"></div>
                <div className="feature-margin">
                  <div className="icon-background">
                    <div className="icon">
                      <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 8.5H2C1.44772 8.5 1 8.94772 1 9.5V18.5C1 19.0523 1.44772 19.5 2 19.5H14C14.5523 19.5 15 19.0523 15 18.5V9.5C15 8.94772 14.5523 8.5 14 8.5Z" stroke="#003178" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 8.5V5.5C4 4.30653 4.47411 3.16193 5.31802 2.31802C6.16193 1.47411 7.30653 1 8.5 1C9.69347 1 10.8381 1.47411 11.682 2.31802C12.5259 3.16193 13 4.30653 13 5.5V8.5" stroke="#003178" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="heading-margin">
                  <h3>End-to-End Encryption</h3>
                </div>
                <div className="description-container">
                  <p>From the data being uploaded, the process gets completed. The encryption and safe processing techniques safeguard the privacy of your data.</p>
                </div>
              </div>

              <div className="feature-card feature-5">
                <div className="icon-background-large">
                  <div className="overlay-shadow"></div>
                  <div className="icon-large">
                    <svg width="31.8" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 2.5L4 8.5V15.5C4 20.5 7 25.5 16 27.5C25 25.5 28 20.5 28 15.5V8.5L16 2.5Z" stroke="#006E2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14.5L15 17.5L20 11.5" stroke="#006E2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="content-container">
                  <h3>Dependable Processing Engine</h3>
                  <p>We are developed with a powerful processing engine that focuses on migration, conversion, and backup of the same without changing structure, attachments, and metadata.</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <section className="technical-proof-points-section">
          <div className="decorative-tech-pulse"></div>
          <div className="overlay-blur"></div>
          <div className="container">
            <div className="proof-point proof-point-1">
              <div className="number">99.9%</div>
              <div className="description">SERVICE RELIABILITY</div>
            </div>
            <div className="proof-point proof-point-2">
              <div className="acronym">AES-256</div>
              <div className="description">ENCRYPTION STANDARD</div>
            </div>
            <div className="proof-point proof-point-3">
              <div className="acronym">GDPR</div>
              <div className="description">COMPLIANCE PROTOCOL</div>
            </div>
          </div>
        </section>

        <section className="email-ecosystem-section">
          <div className="background-border">
            <div className="container">
              <div className="heading-container">
                <h2>Works with Your Email Ecosystem</h2>
              </div>
              <div className="email-providers-row">
                <div className="email-provider-card gmail-card">
                  <div className="card-border-top"></div>
                  <div className="card-content">
                    <img src="/images/gmail.png" alt="Gmail" />
                    <span>Gmail</span>
                  </div>
                  <div className="card-border-bottom"></div>
                </div>
                <div className="email-provider-card microsoft-365-card">
                  <div className="card-border-top"></div>
                  <div className="card-content">
                    <img src="/images/microsoft-365.png" alt="Microsoft 365" />
                    <span>Microsoft 365</span>
                  </div>
                  <div className="card-border-bottom"></div>
                </div>
                <div className="email-provider-card imap-card">
                  <div className="card-border-top"></div>
                  <div className="card-content">
                    <img src="/images/imap-servers.png" alt="IMAP Servers" />
                    <span>IMAP Servers</span>
                  </div>
                  <div className="card-border-bottom"></div>
                </div>
                <div className="email-provider-card outlook-card">
                  <div className="card-border-top"></div>
                  <div className="card-content">
                    <img src="/images/outlook.png" alt="Outlook" />
                    <span>Outlook</span>
                  </div>
                  <div className="card-border-bottom"></div>
                </div>
                <div className="email-provider-card exchange-card">
                  <div className="card-border-top"></div>
                  <div className="card-content">
                    <img src="/images/exchange.png" alt="Exchange" />
                    <span>Exchange</span>
                  </div>
                  <div className="card-border-bottom"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <div className="container">
            <h2>HOW SHEFWARE WORKS</h2>
            <p>EASY PROCESS AND GET POWERFUL RESULTS</p>
          </div>
        </section>

        <section className="how-it-works-page-section">
          <div className="main-dashboard-container">
            <aside className="aside-sidebar-navigation">
              <div className="recruit-item">
                <div className="container">
                  <h3>Select Your Tool</h3>
                  <p>Choose the solution</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6666 5.33337L7.99992 10L3.33325 5.33337" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="design-item">
                <div className="container">
                  <h3>Connect with Us</h3>
                  <p>Connect your mailbox</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6666 5.33337L7.99992 10L3.33325 5.33337" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="review-item">
                <div className="container">
                  <h3>Configure Settings</h3>
                  <p>Select migration alternatives</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6666 5.33337L7.99992 10L3.33325 5.33337" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="evaluate-item-expanded">
                <div className="container">
                  <div className="container">
                    <div className="background"></div>
                    <h3>Run & Track</h3>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33341 10.6666L8.00008 6L12.6667 10.6666" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="container">
                  <p>Start the process and monitor progress in real time through a detailed dashboard. Once completed, review the results and export your data securely in your chosen format.</p>
                </div>
              </div>
            </aside>

            <div className="main-content-area">
              <div className="visualizer-container">
                <div className="dial-component">
                  <svg className="ticks-svg" width="400" height="400" viewBox="0 0 400 400">
                    {/* Tick marks for the circular dial */}
                    {Array.from({ length: 72 }, (_, i) => {
                      const angle = (i * 5) * Math.PI / 180;
                      const x1 = 200 + 190 * Math.cos(angle);
                      const y1 = 200 + 190 * Math.sin(angle);
                      const x2 = 200 + 195 * Math.cos(angle);
                      const y2 = 200 + 195 * Math.sin(angle);
                      const opacity = i >= 36 && i <= 54 ? (i === 45 ? 1 : 0.6 + (i - 36) * 0.04) : 0.5;
                      
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="rgba(255, 255, 255, 255, 0.5)"
                          strokeOpacity={opacity}
                          strokeWidth="1.5"
                          transform={`rotate(-90 200 200)`}
                        />
                      );
                    })}
                  </svg>
                  
                  <div className="central-recruit-circle">
                    <div className="container">
                      <span>PROCESS</span>
                    </div>
                  </div>
                  
                  <div className="select-label">Select</div>
                  <div className="connect-label">Connect</div>
                  <div className="configure-label">Configure</div>
                  <div className="run-track-label">Run & Track</div>
                </div>
              </div>
              
              <div className="right-side-scroll-bar">
                <div className="background"></div>
                <div className="background"></div>
                <div className="background active"></div>
                <div className="background"></div>
              </div>
              
              <div className="watermark">
                <div className="container">
                  <span>Powered by Shefware</span>
                </div>
                <div className="container">
                  <span>Enterprise Migration Solutions</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="demo-button-container">
            <button className="demo-button">
              <span>TRY A DEMO</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 8L4 4V12Z" fill="#60A5FA"/>
              </svg>
            </button>
          </div>
        </section>

        <section className="learning-center-section">
          <div className="container">
            <div className="container">
              <span>KNOWLEDGE BASE</span>
            </div>
            <div className="heading-2">
              <span>Resources to Help You Stay on Top of IT</span>
            </div>
            <div className="container">
              <div className="resource-card">
                <div className="margin">
                  <div className="background">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M26.6667 10.6667V24C26.6667 24.7073 26.3857 25.3857 25.8857 25.8857C25.3857 26.3857 24.7073 26.6667 24 26.6667H8C7.29273 26.6667 6.6143 26.3857 6.1143 25.8857C5.6143 25.3857 5.33333 24.7073 5.33333 24V8C5.33333 7.29273 5.6143 6.6143 6.1143 6.1143C6.6143 5.6143 7.29273 5.33333 8 5.33333H18.6667L26.6667 10.6667Z" stroke="#3B82F6" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M26.6667 10.6667H18.6667V5.33333L26.6667 10.6667Z" stroke="#3B82F6" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="heading-4-margin">
                  <div className="heading-4">
                    <span>News & Updates</span>
                  </div>
                </div>
                <div className="margin">
                  <div className="container">
                    <span>Know about the latest product announcements and enhancements.</span>
                  </div>
                </div>
                <div className="link">
                  <span>Read More »</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="margin">
                  <div className="background">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63623 23.3638 2.66667 16 2.66667C8.63623 2.66667 2.66667 8.63623 2.66667 16C2.66667 23.3638 8.63623 29.3333 16 29.3333Z" stroke="#EF4444" strokeWidth="2.66667"/>
                      <path d="M12 12H20M12 16H20M12 20H16" stroke="#EF4444" strokeWidth="2.66667" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div className="heading-4-margin">
                  <div className="heading-4">
                    <span>FAQs</span>
                  </div>
                </div>
                <div className="margin">
                  <div className="container">
                    <span>Get fast answers to common questions about our migration tools.</span>
                  </div>
                </div>
                <div className="link">
                  <span>Read More »</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="margin">
                  <div className="background">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 8H28C28 8 28 4 24 4H8C4 4 4 8 4 8Z" stroke="#EAB308" strokeWidth="2.66667"/>
                      <path d="M4 8V26C4 26 4 28 6 28H26C28 28 28 26 28 26V8" stroke="#EAB308" strokeWidth="2.66667" strokeLinecap="round"/>
                      <path d="M10 14H22M10 18H18" stroke="#EAB308" strokeWidth="2.66667" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div className="heading-4-margin">
                  <div className="heading-4">
                    <span>Our Blogs</span>
                  </div>
                </div>
                <div className="margin">
                  <div className="container">
                    <span>Know some tips, tutorials, and deep industry understanding.</span>
                  </div>
                </div>
                <div className="link">
                  <span>Read More »</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel Section */}
        <section className="testimonials-carousel-section">
          <div className="container">
            <div className="testimonials-header">
              <div className="testimonials-heading">
                <h2>What Our Clients Say</h2>
              </div>
              <div className="testimonials-rating">
                <div className="star-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FACC15"/>
                  </svg>
                </div>
                <div className="star-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FACC15"/>
                  </svg>
                </div>
                <div className="star-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FACC15"/>
                  </svg>
                </div>
                <div className="star-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FACC15"/>
                  </svg>
                </div>
                <div className="star-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FACC15"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="testimonials-container">
              <div className="testimonial-card testimonial-card-1">
                <div className="testimonial-content">
                  <div className="testimonial-text">
                    "The Office 365 migration tool was a lifesaver for our acquisition project. Smooth and reliable."
                  </div>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">A</div>
                  <div className="author-info">
                    <div className="author-name">
                      <span>Andrew</span>
                    </div>
                    <div className="author-title">
                      <span>IT Director</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card testimonial-card-2">
                <div className="testimonial-content">
                  <div className="testimonial-text">
                    "Clean interface, fast processing, and top-tier support. Highly recommended for enterprises."
                  </div>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">L</div>
                  <div className="author-info">
                    <div className="author-name">
                      <span>Laura</span>
                    </div>
                    <div className="author-title">
                      <span>Systems Administrator</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-card testimonial-card-3">
                <div className="testimonial-content">
                  <div className="testimonial-text">
                    "Migrating 5,000+ mailboxes with zero downtime seemed impossible until we found Shefware."
                  </div>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">D</div>
                  <div className="author-info">
                    <div className="author-name">
                      <span>Daniel</span>
                    </div>
                    <div className="author-title">
                      <span>Infrastructure Manager</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AnimatedSection id="resources" className="section section-alt">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Knowledge center</p>
              <h2>Resources to support your migration decisions</h2>
              <p>
                Practical guides and architecture notes to help leadership and
                engineering teams align quickly.
              </p>
            </div>
            <div className="resource-grid">
              {resources.map((resource) => (
                <article key={resource.title} className="resource-card">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <a href="#contact">{resource.cta}</a>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <section id="contact" className="section container">
          <div className="contact-layout">
            <div>
              <p className="eyebrow">Contact us</p>
              <h2>Start your migration with a technical consultation</h2>
              <p className="contact-copy">
                Share your current environment and migration goals. Our team
                will respond with an execution plan and timeline.
              </p>
              <div className="contact-points">
                <a href="mailto:hello@shefware.com">hello@shefware.com</a>
                <a href="tel:+919999999999">+91 99999 99999</a>
              </div>
            </div>

            <form className="contact-form" onSubmit={onSubmitContactForm}>
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                value={formState.fullName}
                onChange={onChangeFormField}
                placeholder="Your name"
                required
              />

              <label htmlFor="email">Work Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={onChangeFormField}
                placeholder="name@company.com"
                required
              />

              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                value={formState.company}
                onChange={onChangeFormField}
                placeholder="Your company"
              />

              <label htmlFor="message">Project Requirement</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={onChangeFormField}
                placeholder="Tell us about source, target, data size, and timeline..."
                required
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitState.status === "loading"}
              >
                {submitState.status === "loading"
                  ? "Sending..."
                  : "Submit Request"}
              </button>
              {submitState.message && (
                <p className={`form-message ${submitState.status}`}>
                  {submitState.message}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a href="#top" className="brand footer-brand">
              <span className="brand-mark">S</span>
              <span>Shefware</span>
            </a>
            <p>
              Enterprise-grade data migration and modernization platform for
              secure, intelligent, and scalable transformation.
            </p>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#solutions">Solutions</a>
            <a href="#why-shefware">Why Shefware</a>
            <a href="#resources">Resources</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#contact">Contact Us</a>
            <a href="mailto:hello@shefware.com">Email Support</a>
            <a href="tel:+919999999999">Call Us</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Shefware. All rights reserved.</span>
          <div>
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
            <a href="#top">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
