import { useMemo, useState, useEffect, useRef } from "react";
import "./App.css";

const navItems = [
  { label: "PRODUCTS", href: "#solutions" },
  { label: "SERVICES", href: "#process" },
  { label: "MARKET PLACE", href: "#why-shefware" },
  { label: "WHY SHEFWARE", href: "#why-shefware" },
];

const partners = [
  "Microsoft 365",
  "Google Workspace",
  "AWS",
  "IBM",
  "Dropbox",
  "Salesforce",
];

const solutions = [
  {
    title: "Office 365 Migration",
    description:
      "Mailbox, calendar, and permission migration with zero-data-loss controls.",
    icon: "📧"
  },
  {
    title: "Tenant to Tenant Migration",
    description:
      "Secure cross-tenant transfer with identity mapping and policy continuity.",
    icon: "🔄"
  },
  {
    title: "Email Conversion",
    description:
      "Convert PST, OST, EML, MBOX, and legacy formats for modern mail systems.",
    icon: "📬"
  },
  {
    title: "Cloud Backup",
    description:
      "Continuous backup architecture with immutable storage and fast restore.",
    icon: "☁️"
  },
];

const processSteps = [
  {
    title: "Discovery & Planning",
    description:
      "We map source systems, define scope, and create a migration blueprint.",
    icon: "🔍"
  },
  {
    title: "Pilot Migration",
    description:
      "A controlled pilot validates mappings, timeline, and risk assumptions.",
    icon: "🚀"
  },
  {
    title: "Full-Scale Execution",
    description:
      "Batch-based migration with live monitoring, checkpoints, and rollback paths.",
    icon: "⚡"
  },
  {
    title: "Optimization & Handover",
    description:
      "Performance tuning, documentation, and operational handover to your team.",
    icon: "🎯"
  },
];

const metrics = [
  { value: "10M+", label: "Records Migrated" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "50+", label: "Enterprise Projects" },
  { value: "24/7", label: "Monitoring & Support" },
];

const resources = [
  {
    title: "Migration Readiness Checklist",
    description:
      "A practical framework to assess systems, dependencies, and migration risk.",
    cta: "Download Checklist",
  },
  {
    title: "Security Architecture Brief",
    description:
      "Understand our encryption model, audit logging, and compliance controls.",
    cta: "Read Brief",
  },
  {
    title: "Enterprise FAQ",
    description:
      "Answers to project timelines, rollback strategy, and integration patterns.",
    cta: "View FAQ",
  },
];

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
      if (typeof end === 'string') {
        // Extract numeric part from strings like "10M+" or "99.9%"
        const match = end.match(/[\d.]+/);
        if (match) {
          numericEnd = parseFloat(match[0]);
        }
      }
      
      const currentCount = numericEnd * easeOutQuart;
      
      // Format the display value
      let displayValue;
      if (typeof end === 'string' && end.includes('M')) {
        displayValue = (currentCount / 1000000).toFixed(1) + 'M+';
      } else if (typeof end === 'string' && end.includes('%')) {
        displayValue = currentCount.toFixed(1) + '%';
      } else if (typeof end === 'string' && end.includes('+')) {
        displayValue = Math.floor(currentCount).toLocaleString() + '+';
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
      className={`${className || ''} ${isVisible ? 'animate-in' : 'animate-out'}`}
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
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand">
            <span className="brand-mark">S</span>
            <span>Shefware</span>
          </a>
          
          <div className="header-utils">
            <a href="#support" className="header-link">Support</a>
            <a href="#about" className="header-link">About Us</a>
            <a href="#contact" className="header-link">Contact Us</a>
            <button className="btn btn-offer">OFFER</button>
            <button className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
          
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
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero-section">
          <div className="hero-background">
            <div className="hero-overlay"></div>
          </div>
          <div className="container hero-content">
            <h1 className="hero-title">
              <span className="title-white">Transform Data.</span>
              <span className="title-blue">Simplify Migration.</span>
              <span className="title-white">Enable AI Innovation.</span>
            </h1>
            <p className="hero-description">
              Shefware is an AI-driven SaaS platform for email migration, conversion, and backup. Built to make email management simple, quick, and reliable.
            </p>
            <div className="hero-statistics">
              <div className="stat-item">
                <div className="stat-number">1 Million+</div>
                <div className="stat-label">HAPPY CLIENTS</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">PRODUCTS</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">YEARS EXPERIENCE</div>
              </div>
            </div>
          </div>
        </section>

        <section className="partners-strip">
          <div className="container">
            <p>Trusted by modern IT teams across global ecosystems</p>
            <div className="partners-grid">
              {partners.map((partner) => (
                <a key={partner} href="#contact" className="partner-pill">
                  {partner}
                </a>
              ))}
            </div>
          </div>
        </section>

        <AnimatedSection id="solutions" className="section container">
          <div className="section-heading">
            <p className="eyebrow">Comprehensive IT solutions</p>
            <h2>Our all-in-one email and data services</h2>
            <p>
              Modular services designed for enterprise delivery, whether you are
              modernizing one business unit or migrating globally.
            </p>
          </div>
          <div className="cards-grid">
            {solutions.map((solution) => (
              <article key={solution.title} className="info-card">
                <div className="card-icon">
                  <span className="icon-emoji">{solution.icon}</span>
                </div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <a href="#contact">Talk to an expert</a>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="process" className="section section-alt">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Execution framework</p>
              <h2>Migrate data from any source to any target</h2>
              <p>
                Our delivery process minimizes downtime and aligns every stage
                with your business continuity requirements.
              </p>
            </div>
            <div className="steps-layout">
              {processSteps.map((step, index) => (
                <article key={step.title} className="step-card">
                  <div className="step-header">
                    <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="step-icon">{step.icon}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="why-shefware" className="section container">
          <div className="section-heading">
            <p className="eyebrow">Why choose Shefware</p>
            <h2>Professional architecture for secure scale</h2>
            <p>
              Every project is designed around governance, resilience, and
              measurable outcomes for your IT and compliance teams.
            </p>
          </div>
          <div className="metric-grid">
            {metrics.map((metric, index) => {
              const metricRef = useRef(null);
              const isVisible = useIntersectionObserver(metricRef, { threshold: 0.3 });
              
              return (
                <article key={metric.label} className="metric-card">
                  <strong ref={metricRef}>
                    {isVisible ? <AnimatedCounter end={metric.value} duration={2000} /> : metric.value}
                  </strong>
                  <span>{metric.label}</span>
                </article>
              );
            })}
          </div>
          <div className="cta-banner">
            <div>
              <h3>Ready to transform your IT infrastructure?</h3>
              <p>
                Build your migration roadmap with certified specialists and
                enterprise delivery support.
              </p>
            </div>
            <a href="#contact" className="btn btn-primary">
              Schedule Consultation
            </a>
          </div>
        </AnimatedSection>

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
