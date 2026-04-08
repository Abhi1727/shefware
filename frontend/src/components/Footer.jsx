import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <h3>100+ Software Solutions to Help Customers</h3>
        <Link to="/products">View Products »</Link>
      </div>
      <div className="footer-grid">
        <div>
          <h4>Shefware</h4>
          <p>Email migration &amp; backup solutions.</p>
        </div>
        <div>
          <h4>Products</h4>
          <Link to="/products">All products</Link>
          <Link to="/services/cloud-backup">Email Backup</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/why-shefware">Why Shefware</Link>
          <a href="#contact">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
