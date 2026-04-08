import { Link } from "react-router-dom";
import { featuredSolutions } from "../content/home";

const FeaturedSolutions = () => {
  return (
    <section className="featured-solutions">
      <div className="featured-kicker">Our Expertise</div>
      <h2>Our All-in-One Email Data Services</h2>
      <p className="featured-lede">
        Shefware offers advanced services from email migrations to cloud backups,
        built for IT professionals and businesses.
      </p>
      <div className="grid featured-grid">
        {featuredSolutions.map((item) => (
          <article key={item.title} className="card featured-card">
            <img src={item.icon} alt="" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link to={item.href}>Read More »</Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSolutions;
