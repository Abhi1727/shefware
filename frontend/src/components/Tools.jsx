import { Link } from "react-router-dom";
import { tools } from "../content/home";

const Tools = () => {
  return (
    <section className="tools">
      <h2>Powerful Email Management Tools</h2>
      <div className="grid">
        {tools.map((tool) => (
          <div key={tool.title} className="card">
            <h3>{tool.title}</h3>
            <p>{tool.desc}</p>
            <Link to="/products" className="card-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
      <div className="center-actions">
        <Link to="/services" className="primary-btn">
          View All Tools
        </Link>
      </div>
    </section>
  );
};

export default Tools;
