import { useMemo, useState } from "react";
import "./App.css";

const navItems = [
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "Why Shefware", href: "#why-shefware" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
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
  },
  {
    title: "Tenant to Tenant Migration",
    description:
      "Secure cross-tenant transfer with identity mapping and policy continuity.",
  },
  {
    title: "Email Conversion",
    description:
      "Convert PST, OST, EML, MBOX, and legacy formats for modern mail systems.",
  },
  {
    title: "Cloud Backup",
    description:
      "Continuous backup architecture with immutable storage and fast restore.",
  },
];

const processSteps = [
  {
    title: "Discovery & Planning",
    description:
      "We map source systems, define scope, and create a migration blueprint.",
  },
  {
    title: "Pilot Migration",
    description:
      "A controlled pilot validates mappings, timeline, and risk assumptions.",
  },
  {
    title: "Full-Scale Execution",
    description:
      "Batch-based migration with live monitoring, checkpoints, and rollback paths.",
  },
  {
    title: "Optimization & Handover",
    description:
      "Performance tuning, documentation, and operational handover to your team.",
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
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand">
            <span className="brand-mark">S</span>
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
            <a href="#contact" className="btn btn-primary nav-cta">
              Book a Demo
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">AI-powered enterprise data migration</p>
              <h1>
                Transform Data.
                <br />
                Simplify Migration.
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
                  <span>Mailboxes migrated</span>
                </div>
                <div>
                  <strong>100+</strong>
                  <span>Migration workflows</span>
                </div>
                <div>
                  <strong>10+</strong>
                  <span>Years in delivery</span>
                </div>
              </div>
            </div>
            <aside className="hero-panel">
              <h3>Migration Control Center</h3>
              <p>
                Configure source systems, choose targets, enforce policy, and
                monitor each batch in real-time.
              </p>
              <ul>
                <li>End-to-end encryption and audit trails</li>
                <li>Cutover planning with rollback checkpoints</li>
                <li>Built-in validation and exception reporting</li>
              </ul>
              <a href="#contact" className="panel-link">
                Request implementation support
              </a>
            </aside>
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

        <section id="solutions" className="section container">
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
                <div className="card-icon" />
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <a href="#contact">Talk to an expert</a>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section section-alt">
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
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why-shefware" className="section container">
          <div className="section-heading">
            <p className="eyebrow">Why choose Shefware</p>
            <h2>Professional architecture for secure scale</h2>
            <p>
              Every project is designed around governance, resilience, and
              measurable outcomes for your IT and compliance teams.
            </p>
          </div>
          <div className="metric-grid">
            {metrics.map((metric) => (
              <article key={metric.label} className="metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
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
        </section>

        <section id="resources" className="section section-alt">
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
        </section>

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
