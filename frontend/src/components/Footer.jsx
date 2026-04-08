import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

const Footer = () => {
  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState({ status: "idle", message: "" });

  const onNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterState({ status: "loading", message: "" });
    try {
      const response = await fetch(`${apiBaseUrl}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to subscribe right now.");
      }
      setNewsletterState({ status: "success", message: data.message || "You're subscribed!" });
      setEmail("");
    } catch (error) {
      setNewsletterState({
        status: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <div className="site-footer__brand-row">
              <div className="site-footer__logo-mark" aria-hidden>
                S
              </div>
              <span className="site-footer__brand-name">Shefware</span>
            </div>
            <p className="site-footer__tagline">
              Enterprise-grade IT solutions for cloud migration, data backup,
              and email security.
            </p>
          </div>

          <nav className="site-footer__col" aria-labelledby="footer-products">
            <h3 id="footer-products" className="site-footer__heading">
              Products
            </h3>
            <ul className="site-footer__list">
              <li>
                <Link to="/services/data-migration">Cloud Migration</Link>
              </li>
              <li>
                <Link to="/services/cloud-backup">Email Backup</Link>
              </li>
              <li>
                <Link to="/products">Data Security</Link>
              </li>
              <li>
                <Link to="/services/email-conversion">File Conversion</Link>
              </li>
            </ul>
          </nav>

          <nav className="site-footer__col" aria-labelledby="footer-solutions">
            <h3 id="footer-solutions" className="site-footer__heading">
              Solutions
            </h3>
            <ul className="site-footer__list">
              <li>
                <Link to="/services/office-365-migration">Office 365</Link>
              </li>
              <li>
                <Link to="/market-place">AWS &amp; Azure</Link>
              </li>
              <li>
                <Link to="/services/google-workspace-to-microsoft-365-migration">
                  Google Workspace
                </Link>
              </li>
              <li>
                <Link to="/services/office-365-migration">Microsoft Teams</Link>
              </li>
            </ul>
          </nav>

          <nav className="site-footer__col" aria-labelledby="footer-company">
            <h3 id="footer-company" className="site-footer__heading">
              Company
            </h3>
            <ul className="site-footer__list">
              <li>
                <Link to="/why-shefware">About Us</Link>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#contact">Support</a>
              </li>
              <li>
                <a href="#resources">Documentation</a>
              </li>
            </ul>
          </nav>

          <div className="site-footer__col site-footer__col--social">
            <h3 className="site-footer__heading site-footer__heading--social">
              Find Us on
            </h3>
            <div className="site-footer__social">
              <a
                href="https://facebook.com"
                className="site-footer__social-btn"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"
                    fill="#94A3B8"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="site-footer__social-btn"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    fill="#94A3B8"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="site-footer__social-btn"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6.94 20H3.55V9.33h3.39V20zM5.24 7.84a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12.8 12.16h-3.39v-5.22c0-1.25-.02-2.86-1.74-2.86-1.75 0-2 1.37-2 2.78V20h-3.39V9.33h3.25v1.44h.05c.45-.86 1.56-1.77 3.2-1.77 3.43 0 4.06 2.26 4.06 5.2V20z"
                    fill="#94A3B8"
                  />
                </svg>
              </a>
            </div>
            <p className="site-footer__newsletter-caption">
              Subscribe to our newsletter to get latest updates!
            </p>
            {newsletterState.status === "success" && (
              <p className="site-footer__newsletter-success">{newsletterState.message}</p>
            )}
            {newsletterState.status === "error" && (
              <p className="site-footer__newsletter-error">{newsletterState.message}</p>
            )}
            {newsletterState.status !== "success" && (
              <form
                className="site-footer__newsletter"
                onSubmit={onNewsletterSubmit}
              >
                <input
                  type="email"
                  name="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="site-footer__newsletter-input"
                  autoComplete="email"
                  required
                />
                <button
                  type="submit"
                  className="site-footer__newsletter-btn"
                  aria-label="Subscribe"
                  disabled={newsletterState.status === "loading"}
                >
                  {newsletterState.status === "loading" ? (
                    <span style={{ fontSize: "12px" }}>...</span>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="#FFFFFF"
                        strokeWidth="1.33"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            © 2026 Shefware IT Software and Services. All rights reserved.
          </p>
          <div className="site-footer__legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
