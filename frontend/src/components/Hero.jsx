import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Migrate, Backup &amp; Manage Email Data</h1>
        <p>
          Securely migrate, convert, and protect your email data across Microsoft
          365, Google Workspace, IMAP, and more.
        </p>
        <div className="hero-buttons">
          <Link to="/services" className="primary-btn">
            View All Tools
          </Link>
          <a href="#contact" className="secondary-btn">
            Request Call →
          </a>
        </div>
      </div>
      <div className="hero-right">
        <img src={heroImage} alt="" />
      </div>
    </section>
  );
};

export default Hero;
