import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

const navItems = [
  { label: "PRODUCTS", href: "/products" },
  { label: "SERVICES", href: "/services", hasDropdown: true },
  { label: "MARKET PLACE", href: "/market-place" },
  { label: "WHY SHEFWARE", href: "/why-shefware" },
];

const servicesData = {
  sections: [
    {
      title: "Cloud Solutions",
      items: [
        { label: "Cloud Backup", href: "/services/cloud-backup", icon: "☁️" },
        { label: "Office 365 Migration", href: "/services/office-365-migration", icon: "🔄" },
        { label: "Email Conversion", href: "/services/email-conversion", icon: "📧" },
      ]
    },
    {
      title: "Migration Services",
      items: [
        { label: "Tenant to Tenant Migration", href: "/services/tenant-to-tenant-migration", icon: "🔄" },
        { label: "Google Workspace to Microsoft 365 Migration", href: "/services/google-workspace-to-microsoft-365-migration", icon: "🔄" },
        { label: "Data Migration", href: "/services/data-migration", icon: "💾" },
      ]
    }
  ]
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (servicesDropdownOpen) {
        if (event.key === 'Escape') {
          setServicesDropdownOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [servicesDropdownOpen]);

  const handleServicesClick = (e) => {
    e.preventDefault();
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  const handleServiceSelect = () => {
    setServicesDropdownOpen(false);
    setMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleServicesClick(e);
    }
  };

  return (
    <>
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
            {navItems.map((item) => (
              <div key={item.href} className="nav-item-wrapper" ref={item.hasDropdown ? dropdownRef : null}>
                {item.hasDropdown ? (
                  <>
                    <button
                      className="nav-link-dropdown"
                      onClick={handleServicesClick}
                      onKeyDown={handleKeyDown}
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg className={`dropdown-arrow ${servicesDropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {servicesDropdownOpen && (
                      <div className="services-dropdown">
                        {servicesData.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="dropdown-section">
                            <h4 className="section-title">{section.title}</h4>
                            <div className="section-items">
                              {section.items.map((serviceItem, itemIndex) => (
                                <Link
                                  key={itemIndex}
                                  to={serviceItem.href}
                                  className="service-item"
                                  onClick={handleServiceSelect}
                                >
                                  <span className="service-icon">{serviceItem.icon}</span>
                                  <span className="service-label">{serviceItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
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
    </>
  );
};

export default Header;
