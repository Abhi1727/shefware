import "./App.css";
const clientLogos = ["Microsoft", "Google", "AWS", "IBM", "IMAP", "Exchange"];
const expertiseCards = [
  "Office 365 Migration",
  "Tenant Migration",
  "Email Conversion",
  "Cloud Backup",
];
const metrics = [
  { value: "25+", label: "Years Experience", tone: "light" },
  { value: "99.9%", label: "Uptime", tone: "light" },
  { value: "100%", label: "Security", tone: "success" },
  { value: "1", label: "Unified Platform", tone: "light" },
  { value: "24/7", label: "Monitoring", tone: "outline" },
  { value: "100%", label: "Automation", tone: "dark" },
];
const tools = [
  "Content Insights",
  "Migration Validation",
  "Archive Integrator",
  "Migration Accelerator",
  "Policy Engine",
  "Content Integrator",
];
const resources = [
  {
    type: "News",
    title: "The Future of Email Archiving in 2024",
    text: "Stay ahead of industry trends with our latest updates and announcements.",
  },
  {
    type: "FAQs",
    title: "Frequently Asked Questions",
    text: "Everything you need to know about our migration engine and security protocols.",
  },
  {
    type: "Blog",
    title: "Migrating Terabytes: A Tactical Guide",
    text: "Deep dives into technical challenges and how to solve them with Shefware.",
  },
];

function App() {
  return (
    <div className="app-shell">
      <header className="site-header container">
        <a href="#" className="logo">
          Shefware
        </a>
        <nav className="top-nav">
          <a href="#solutions">Solutions</a>
          <a href="#workflow">Workflow</a>
          <a href="#resources">Resources</a>
          <a href="#footer">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero-intro">
          <div className="container center-content">
            <h1>Intelligence that builds Architectural Excellence.</h1>
            <p>
              A comprehensive ecosystem designed to streamline your digital
              asset lifecycle, from ingestion and analysis to archival and
              cross-platform integration.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-muted">Watch Demo</button>
            </div>
          </div>
        </section>

        <section className="hero-workspace container">
          <article className="highlight-panel">
            <h3>AI-powered migration platform</h3>
            <p>
              Shefware helps enterprise teams reduce risk and accelerate
              high-volume, high-accuracy data migration projects.
            </p>
            <a href="#workflow" className="text-link">
              Start your migration journey
            </a>
            <div className="ai-badge">
              <p>AI INSIGHT</p>
              <span>Automate 60% of metadata tagging with Insights.</span>
            </div>
          </article>
          <article className="tools-panel">
            <div className="tools-grid">
              {tools.map((tool) => (
                <div className="tool-item" key={tool}>
                  <div className="tool-icon" />
                  <div>
                    <h4>{tool}</h4>
                    <p>Built to simplify enterprise migration workflows.</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="tools-footer">
              <span>Migration stack optimized for enterprise workloads</span>
              <a href="#solutions">Explore all modules</a>
            </div>
          </article>
        </section>

        <section className="clients">
          <div className="container">
            <h2>Our Clients</h2>
            <div className="logo-row">
              {clientLogos.map((logo) => (
                <div key={logo} className="logo-chip">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="solutions" className="section container section-center">
          <h2>Migration Expertise</h2>
          <p className="section-subtitle">
            A suite of tools designed for enterprise-grade compatibility,
            precision, and security.
          </p>
          <div className="expertise-grid">
            {expertiseCards.map((title) => (
              <article className="expertise-card" key={title}>
                <div className="card-icon" />
                <h4>{title}</h4>
                <p>High-performance pipelines with full compliance controls.</p>
                <a href="#">Learn more</a>
              </article>
            ))}
          </div>
        </section>

        <section className="migration-experts">
          <div className="container split-2">
            <div className="image-placeholder">IT Expert Visual</div>
            <div>
              <h2>Migrate Data from Any SOURCE to Any TARGET!</h2>
              <p>
                Our engine is built for universal compatibility across cloud and
                on-prem systems.
              </p>
              <ul className="check-list">
                <li>Supports legacy and modern platforms</li>
                <li>Automated transformation and mapping</li>
                <li>Security-first migration process</li>
              </ul>
              <button className="btn btn-primary">Start Migration Now</button>
            </div>
          </div>
        </section>

        <section className="trust-banner container">
          <div>
            <h3>Trusted Migration Partner for Enterprises</h3>
            <p>Secure, scalable, and compliant architecture for global teams.</p>
          </div>
          <button className="btn btn-light">Talk to us</button>
        </section>

        <section className="workflow-features">
          <div className="container section-center">
            <h2>Workflow Features that Keep Teams Efficient</h2>
            <div className="feature-row">
              <article>
                <div className="box-icon" />
                <h4>Fast Onboarding</h4>
                <p>Set up and configure migration pipelines in minutes.</p>
              </article>
              <article>
                <div className="box-icon" />
                <h4>Realtime Validation</h4>
                <p>Monitor and validate each batch before final commit.</p>
              </article>
              <article>
                <div className="box-icon" />
                <h4>Smart Automation</h4>
                <p>Reduce manual effort using policy-driven intelligence.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="metrics-intro">
            <h2>Why Leading Enterprises Choose Shefware</h2>
          </div>
          <div className="metrics-grid">
            {metrics.map((item) => (
              <article key={item.label} className={`metric-card ${item.tone}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="infra-section">
          <div className="container split-2">
            <div>
              <h2>Secure Infrastructure with 99.9% Uptime</h2>
              <p>
                Hosted on Tier-4 infrastructure with geo-redundancy and
                AI-driven balancing.
              </p>
              <div className="infra-points">
                <div>
                  <h5>Global Redundancy</h5>
                  <span>Active-active deployment in multiple regions.</span>
                </div>
                <div>
                  <h5>Data Encryption</h5>
                  <span>End-to-end encrypted at rest and in transit.</span>
                </div>
                <div>
                  <h5>Observability</h5>
                  <span>Realtime logs, metrics, and security anomaly alerts.</span>
                </div>
              </div>
            </div>
            <div className="image-placeholder dark">Infrastructure Visual</div>
          </div>
        </section>

        <section className="ecosystem">
          <div className="container section-center">
            <h2>Works with Your Email Ecosystem</h2>
            <div className="ecosystem-row">
              <div>Gmail</div>
              <div>Yahoo</div>
              <div>Exchange</div>
              <div>Office 365</div>
              <div>IMAP</div>
            </div>
          </div>
        </section>

        <section id="workflow" className="workflow-steps">
          <div className="container section-center">
            <h2>How Shefware Works</h2>
            <p>
              A streamlined process to launch migrations quickly and safely.
            </p>
            <div className="steps-grid">
              <article>
                <div className="step-number">1</div>
                <h4>Assess</h4>
                <p>Audit current systems and map your migration scope.</p>
              </article>
              <article>
                <div className="step-number">2</div>
                <h4>Configure</h4>
                <p>Define mappings, policies, and validation criteria.</p>
              </article>
              <article>
                <div className="step-number">3</div>
                <h4>Migrate</h4>
                <p>Run secure migration with continuous monitoring.</p>
              </article>
              <article>
                <div className="step-number">4</div>
                <h4>Optimize</h4>
                <p>Review outcomes and improve through analytics.</p>
              </article>
            </div>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </section>

        <section id="resources" className="section container section-center">
          <h2>Resources to Help You Stay on Top of IT</h2>
          <div className="resource-grid">
            {resources.map((item) => (
              <article key={item.title} className="resource-card">
                <div className="resource-image" />
                <div className="resource-body">
                  <span>{item.type}</span>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="footer" className="site-footer">
        <div className="container footer-top">
          <div>
            <h4>Shefware</h4>
            <p>
              Enterprise-grade migration platform for secure, intelligent, and
              scalable data transformation.
            </p>
          </div>
          <div>
            <h5>Solutions</h5>
            <a href="#">Office 365</a>
            <a href="#">Exchange</a>
            <a href="#">Gmail</a>
            <a href="#">IMAP</a>
          </div>
          <div>
            <h5>Resources</h5>
            <a href="#">News</a>
            <a href="#">FAQs</a>
            <a href="#">Blogs</a>
            <a href="#">API Docs</a>
          </div>
          <div>
            <h5>Newsletter</h5>
            <p>Subscribe for the latest in IT infrastructure and data security.</p>
            <div className="newsletter-row">
              <input placeholder="Your email" />
              <button>Join</button>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Shefware. All rights reserved.</span>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
