import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "PRODUCTS", href: "/products" },
  { label: "SERVICES", href: "/services", hasDropdown: true },
  { label: "MARKET PLACE", href: "/market-place" },
  { label: "WHY SHEFWARE", href: "/why-shefware" },
];

/**
 * Figma-aligned mega menu: 3 columns, icon tile + title + description.
 * https://www.figma.com/design/qog60m4YVUE6cwuGJkt7ML/shefware-1
 */
const servicesMegaColumns = [
  [
    {
      title: "Cloud Backup",
      description: "Dependable cloud backup for full data protection.",
      href: "/services/cloud-backup",
      icon: "cloud",
    },
    {
      title: "Microsoft Teams Migration",
      description: "Easy transfer of Teams data and collaboration.",
      href: "/services/office-365-migration",
      icon: "teams",
    },
    {
      title: "Google Workspace to Microsoft 365 Migration",
      description: "Smoothly migrate data to Microsoft 365.",
      href: "/services/google-workspace-to-microsoft-365-migration",
      icon: "arrows",
    },
  ],
  [
    {
      title: "Tenant Migration",
      description: "Effective tenant migration with minimum difficulty.",
      href: "/services/tenant-migration",
      icon: "tenant",
    },
    {
      title: "Email Conversion",
      description: "Fast and accurate email structure conversion.",
      href: "/services/email-conversion",
      icon: "mail",
    },
  ],
  [
    {
      title: "Tenant to Tenant Migration",
      description: "Safe and secure tenant-to-tenant migration.",
      href: "/services/tenant-to-tenant-migration",
      icon: "swap",
    },
    {
      title: "Office 365 Migration",
      description: "Zero downtime and complete migration securely.",
      href: "/services/office-365-migration",
      icon: "office",
    },
  ],
];

function MegaMenuIcon({ name }) {
  const stroke = "#003178";
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "cloud":
      return (
        <svg {...common} aria-hidden>
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "teams":
      return (
        <svg {...common} aria-hidden>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "arrows":
      return (
        <svg {...common} aria-hidden>
          <path d="M7 16V4M7 4L3 8M7 4l4 4" />
          <path d="M17 8v12M17 20l4-4M17 20l-4-4" />
        </svg>
      );
    case "tenant":
      return (
        <svg {...common} aria-hidden>
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common} aria-hidden>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "swap":
      return (
        <svg {...common} aria-hidden>
          <path d="M16 3h5v5M4 21V16M21 3l-7 7M8 21l-7-7" />
          <path d="M21 16v5h-5M3 8h5V3M3 21l7-7" />
        </svg>
      );
    case "office":
      return (
        <svg {...common} aria-hidden>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
          <path d="M7 8h2M7 12h4" />
        </svg>
      );
    default:
      return null;
  }
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const servicesShellRef = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesShellRef.current && !servicesShellRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setServicesDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleServicesToggle = (e) => {
    e.preventDefault();
    setServicesDropdownOpen((open) => !open);
  };

  const handleServiceSelect = () => {
    setServicesDropdownOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="top-nav-bar">
        <div className="container">
          <nav className="top-nav">
            <Link to="/services">Support</Link>
            <Link to="/why-shefware">About Us</Link>
            <Link to="/market-place">Contact Us</Link>
          </nav>
        </div>
      </header>

      <header className={`site-header site-header--mega ${servicesDropdownOpen ? "site-header--mega-open" : ""}`} ref={servicesShellRef}>
        <div className="site-header-bar">
          <div className="container header-inner">
            <Link to="/" className="brand">
              <span>Shefware</span>
            </Link>
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
              <div className="main-nav-links">
                {navItems.map((item) => (
                  <div key={item.href} className="nav-item-wrapper">
                    {item.hasDropdown ? (
                      <button
                        type="button"
                        className={`nav-link-dropdown ${servicesDropdownOpen ? "nav-link-dropdown--active" : ""}`}
                        onClick={handleServicesToggle}
                        aria-expanded={servicesDropdownOpen}
                        aria-haspopup="true"
                        aria-controls="services-mega-menu"
                      >
                        {item.label}
                        <svg className={`dropdown-arrow ${servicesDropdownOpen ? "open" : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ) : (
                      <Link to={item.href} onClick={() => setMenuOpen(false)}>
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="nav-actions">
                <button type="button" className="search-icon search-icon--light" aria-label="Search">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
                <Link to="/market-place" className="btn btn-offer nav-cta">
                  OFFER
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {servicesDropdownOpen && (
          <div id="services-mega-menu" className="services-mega-panel" role="menu" aria-label="Services">
            <div className="container">
              <div className="services-mega-grid">
                {servicesMegaColumns.map((column, colIndex) => (
                  <div key={colIndex} className="services-mega-column">
                    {column.map((entry) => (
                      <Link
                        key={entry.href}
                        to={entry.href}
                        className="services-mega-item"
                        onClick={handleServiceSelect}
                        role="menuitem"
                      >
                        <span className="services-mega-icon" aria-hidden>
                          <MegaMenuIcon name={entry.icon} />
                        </span>
                        <span className="services-mega-copy">
                          <strong>{entry.title}</strong>
                          <span className="services-mega-desc">{entry.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {menuOpen && <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    </>
  );
};

export default Header;
