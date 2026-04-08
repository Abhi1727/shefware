import { Link } from "react-router-dom";

const clientLogos = [
  { name: "J.P. Morgan Chase & Co.", path: "/images/jp-morgan.svg" },
  { name: "Microsoft", path: "/images/microsoft.svg" },
  { name: "Cisco", path: "/images/cisco.svg" },
  { name: "AWS", path: "/images/aws.svg" },
  { name: "IBM", path: "/images/ibm.svg" },
  { name: "Capgemini", path: "/images/capgemini.svg" },
];

const featuredSolutions = [
  {
    title: "Office 365 Migration",
    description:
      "We safely migrate mailboxes, contacts, folders, and calendars between Microsoft tenants with no loss of data.",
    icon: "/images/microsoft-office.svg",
    href: "/services/office-365-migration",
  },
  {
    title: "Tenant Migration",
    description:
      "Without any timeout between tenants, migrate users, mailboxes, and permissions.",
    icon: "/images/data-migration.svg",
    href: "/services/tenant-migration",
  },
  {
    title: "Email Conversion",
    description:
      "Easily export Outlook data files quickly and securely with high file support.",
    icon: "/images/gemini-generated.svg",
    href: "/services/email-conversion",
  },
  {
    title: "Email Backup",
    description: "Safeguard email data with upgraded IMAP and local backup tools.",
    icon: "/images/backup-icon.svg",
    href: "/services/cloud-backup",
  },
];

const processSteps = [
  { title: "Select Your Tool", detail: "Choose the solution" },
  { title: "Connect with Us", detail: "Connect your mailbox" },
  { title: "Configure Settings", detail: "Select migration alternatives" },
  {
    title: "Run & Track",
    detail:
      "Start the process and monitor progress in real time through a detailed dashboard. Once completed, review the results and export your data securely in your chosen format.",
  },
];

const Home = () => {
  return (
    <main className="home-clean">
      <section className="home-clean__hero">
        <div className="home-clean__container home-clean__hero-grid">
          <div className="home-clean__hero-copy">
            <h1>
              Migrate, Backup &amp; Manage
              <br />
              <span>Email Data</span>
            </h1>
            <p>
              Securely migrate, convert, and protect your email data across
              Microsoft 365, Google Workspace, IMAP, and more.
            </p>
            <div className="home-clean__hero-actions">
              <Link to="/services" className="home-clean__btn home-clean__btn--primary">
                View All Tools
              </Link>
              <a href="#contact" className="home-clean__btn home-clean__btn--ghost">
                Request CALL
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="home-clean__clients">
        <div className="home-clean__container">
          <h2>our clients</h2>
          <p>
            Supporting organizations with reliable email migration and data
            management solutions
          </p>
          <div className="home-clean__logos">
            {clientLogos.map((logo) => (
              <img key={logo.name} src={logo.path} alt={logo.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-clean__featured">
        <div className="home-clean__container">
          <div className="home-clean__kicker">Our Expertise</div>
          <h2>Our All-in-One Email Data Services</h2>
          <p className="home-clean__section-lede">
            Shefware offers advanced services from email migrations to cloud
            backups, built for IT professionals and businesses.
          </p>
          <div className="home-clean__cards">
            {featuredSolutions.map((service) => (
              <article key={service.title} className="home-clean__card">
                <img src={service.icon} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service.href}>Read More »</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-clean__experts">
        <div className="home-clean__container home-clean__experts-grid">
          <div>
            <div className="home-clean__kicker home-clean__kicker--left">
              Migration Experts
            </div>
            <h2>Migrate Data from Any SOURCE to Any Target!</h2>
            <p>
              Connect with Shefware for Managed or Assisted Migration Services.
              We use our in-house developed software applications for On-Premise
              &amp; Cloud Based Data Migration Services.
            </p>
            <ul>
              <li>Deliver Accurate Data</li>
              <li>Increased Data Quality</li>
              <li>Manage Identification</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          <div className="home-clean__experts-image">
            <img
              src="/images/male-entrepreneur-using-computer-while-working-office.svg"
              alt="Migration expert illustration"
            />
          </div>
        </div>
      </section>

      <section className="home-clean__cta">
        <div className="home-clean__container home-clean__cta-row">
          <div>
            <div className="home-clean__kicker home-clean__kicker--left">
              Your Trusted Partner
            </div>
            <h3>Start Managing Your Email Data Today</h3>
          </div>
          <a href="#contact" className="home-clean__btn home-clean__btn--primary">
            Contact Us »
          </a>
        </div>
      </section>

      <section id="process" className="home-clean__process">
        <div className="home-clean__container">
          <h2>HOW SHEFWARE WORKS</h2>
          <p className="home-clean__section-lede">EASY PROCESS AND GET POWERFUL RESULTS</p>
          <div className="home-clean__steps">
            {processSteps.map((step) => (
              <article key={step.title} className="home-clean__step">
                <h4>{step.title}</h4>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-clean__footer-cta">
        <div className="home-clean__container home-clean__footer-cta-row">
          <h2>100+ Software Solutions to Help Customers.</h2>
          <Link to="/products">View Products »</Link>
        </div>
      </section>

      <section id="contact" className="home-clean__contact-anchor" aria-label="Contact" />
    </main>
  );
};

export default Home;
