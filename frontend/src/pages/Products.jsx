import { useMemo, useState, useEffect, useRef } from "react";

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
    title: "Email Backup",
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

const Products = () => {
  const [formState, setFormState] = useState(initialFormState);
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });

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
    <>
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
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 10.5H1M10 1.5L19 10.5L10 17.5" stroke="#003178" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="heading-margin">
                <h3>Continuous Monitoring</h3>
              </div>
              <div className="description-container">
                <p>Real-time monitoring and alerts ensure that your data migration processes are always running smoothly and securely.</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Service Reliability Section */}
      <section className="service-reliability-section">
        <div className="container">
          <div className="reliability-grid">
            <div className="reliability-item">
              <h2>99.9%</h2>
              <p>SERVICE RELIABILITY</p>
            </div>
            <div className="reliability-item">
              <h2>AES-256</h2>
              <p>ENCRYPTION STANDARD</p>
            </div>
            <div className="reliability-item">
              <h2>GDPR</h2>
              <p>COMPLIANCE PROTOCOL</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Ecosystem Section */}
      <section className="email-ecosystem-section">
        <div className="container">
          <div className="heading-container">
            <h2>Works with Your Email Ecosystem</h2>
          </div>
          <div className="description-container">
            <p>Seamless integration and support for major email providers</p>
          </div>
          <div className="background-border">
            <div className="email-providers-row">
              <div className="email-provider-card gmail-card">
                <div className="card-border-top"></div>
                <div className="card-content">
                  <img src="/images/gmail-icon.png" alt="Gmail" />
                  <span>Gmail</span>
                </div>
                <div className="card-border-bottom"></div>
              </div>
              <div className="email-provider-card microsoft-365-card">
                <div className="card-border-top"></div>
                <div className="card-content">
                  <img src="/images/microsoft365-icon.png" alt="Microsoft 365" />
                  <span>Microsoft 365</span>
                </div>
                <div className="card-border-bottom"></div>
              </div>
              <div className="email-provider-card imap-card">
                <div className="card-border-top"></div>
                <div className="card-content">
                  <img src="/images/imap-icon.png" alt="IMAP Servers" />
                  <span>IMAP Servers</span>
                </div>
                <div className="card-border-bottom"></div>
              </div>
              <div className="email-provider-card outlook-card">
                <div className="card-border-top"></div>
                <div className="card-content">
                  <img src="/images/outlook-icon.png" alt="Outlook" />
                  <span>Outlook</span>
                </div>
                <div className="card-border-bottom"></div>
              </div>
              <div className="email-provider-card exchange-card">
                <div className="card-border-top"></div>
                <div className="card-content">
                  <img src="/images/exchange-icon.png" alt="Exchange" />
                  <span>Exchange</span>
                </div>
                <div className="card-border-bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Shefware Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2>HOW SHEFWARE WORKS</h2>
          <p>EASY PROCESS AND GET POWERFUL RESULTS</p>
          <div className="how-it-works-content">
            <div className="process-accordion">
              <div className="accordion-item">
                <div className="accordion-header">
                  <h3>Select Your Tool</h3>
                  <div className="accordion-icon">+</div>
                </div>
              </div>
              <div className="accordion-item">
                <div className="accordion-header">
                  <h3>Connect with Us</h3>
                  <div className="accordion-icon">+</div>
                </div>
              </div>
              <div className="accordion-item">
                <div className="accordion-header">
                  <h3>Configure Settings</h3>
                  <div className="accordion-icon">+</div>
                </div>
              </div>
              <div className="accordion-item active">
                <div className="accordion-header">
                  <h3>Run & Track</h3>
                  <div className="accordion-icon">−</div>
                </div>
                <div className="accordion-content">
                  <p>Start process, monitor progress, and export data seamlessly with our intuitive tracking system.</p>
                </div>
              </div>
            </div>
            <div className="process-circle">
              <div className="circle-center">
                <span>PROCESS</span>
              </div>
              <div className="circle-step step-1">
                <span>Select</span>
              </div>
              <div className="circle-step step-2">
                <span>Connect</span>
              </div>
              <div className="circle-step step-3">
                <span>Configure</span>
              </div>
              <div className="circle-step step-4">
                <span>Run & Track</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try Demo Section */}
      <section className="try-demo-section">
        <div className="container">
          <button className="demo-btn">TRY A DEMO</button>
        </div>
      </section>

      {/* LearningCenter Section */}
      <section className="learning-center-section">
        <div className="container">
          <div className="learning-center-header">
            <div className="learning-center-label">LEARNING CENTER</div>
          </div>
          <div className="learning-center-heading">
            <h2>Resources & Learning</h2>
          </div>
          <div className="learning-center-cards">
            <div className="resource-card resource-card-1">
              <div className="resource-icon-margin">
                <div className="resource-icon-background">
                  <div className="resource-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="resource-heading-margin">
                <div className="resource-heading">
                  <h3>News & Updates</h3>
                </div>
              </div>
              <div className="resource-description-margin">
                <div className="resource-description-container">
                  <p className="resource-description">Know about of latest product announcements and enhancements.</p>
                </div>
              </div>
              <a href="#news" className="resource-link">
                <span>Read More »</span>
              </a>
            </div>
            
            <div className="resource-card resource-card-2">
              <div className="resource-icon-margin">
                <div className="resource-icon-background">
                  <div className="resource-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="resource-heading-margin">
                <div className="resource-heading">
                  <h3>FAQs</h3>
                </div>
              </div>
              <div className="resource-description-margin">
                <div className="resource-description-container">
                  <p className="resource-description">Get fast answers to common questions about our migration tools.</p>
                </div>
              </div>
              <a href="#faqs" className="resource-link">
                <span>Read More »</span>
              </a>
            </div>
            
            <div className="resource-card resource-card-3">
              <div className="resource-icon-margin">
                <div className="resource-icon-background">
                  <div className="resource-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="resource-heading-margin">
                <div className="resource-heading">
                  <h3>Our Blogs</h3>
                </div>
              </div>
              <div className="resource-description-margin">
                <div className="resource-description-container">
                  <p className="resource-description">Know some tips, tutorials, and deep industry understanding.</p>
                </div>
              </div>
              <a href="#blogs" className="resource-link">
                <span>Read More »</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TestimonialsCarousel Section */}
      <section className="testimonials-carousel-section">
        <div className="container">
          <div className="testimonials-header">
            <div className="testimonials-heading">
              <h2>What Our Clients Say</h2>
            </div>
            <div className="testimonials-rating">
              <div className="star-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="star-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="star-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="star-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="star-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">"The Office 365 migration tool was a lifesaver for our acquisition project. Smooth and reliable."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div className="author-info">
                  <div className="author-name">
                    <h4>Andrew</h4>
                  </div>
                  <div className="author-title">
                    <p>CEO, TechCorp</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">"Clean interface, fast processing, and top-tier support. Highly recommended for enterprises."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">L</div>
                <div className="author-info">
                  <div className="author-name">
                    <h4>Laura</h4>
                  </div>
                  <div className="author-title">
                    <p>CTO, DataFlow</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">"Migrating 5,000+ mailboxes with zero downtime seemed impossible until we found Shefware."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">D</div>
                <div className="author-info">
                  <div className="author-name">
                    <h4>Daniel</h4>
                  </div>
                  <div className="author-title">
                    <p>IT Director, GlobalTech</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Top Section */}
      <section className="cta-footer-top">
        <div className="container">
          <h2>100+ Software Solutions to Help Customers.</h2>
          <a href="#products" className="cta-button">VIEW PRODUCTS →</a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Shefware</h3>
              <p>Leading provider of enterprise email migration and data management solutions. We help businesses transform their digital infrastructure with cutting-edge technology and expert support.</p>
            </div>
            <div className="footer-column">
              <h4>Products</h4>
              <ul>
                <li><a href="#">Email Migration</a></li>
                <li><a href="#">Data Backup</a></li>
                <li><a href="#">Cloud Solutions</a></li>
                <li><a href="#">Security Tools</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Solutions</h4>
              <ul>
                <li><a href="#">Enterprise</a></li>
                <li><a href="#">Small Business</a></li>
                <li><a href="#">Education</a></li>
                <li><a href="#">Healthcare</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-social">
              <h4>Find Us on</h4>
              <div className="social-icons">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">t</a>
                <a href="#" className="social-icon">in</a>
                <a href="#" className="social-icon">ig</a>
              </div>
              <div className="email-subscription">
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Shefware. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Products;
