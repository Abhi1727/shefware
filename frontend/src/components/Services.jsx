import { Link } from "react-router-dom";

const items = [
  { label: "Microsoft 365 Migration", to: "/services/office-365-migration" },
  { label: "Google Workspace Migration", to: "/services/google-workspace-to-microsoft-365-migration" },
  { label: "Tenant Migration", to: "/services/tenant-migration" },
  { label: "Cloud Backup", to: "/services/cloud-backup" },
];

const Services = () => {
  return (
    <section className="services">
      <h2>Enterprise Migration Service</h2>
      <div className="grid">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="card card-link-block">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="center-actions">
        <a href="#contact" className="primary-btn">
          Talk to Expert
        </a>
      </div>
    </section>
  );
};

export default Services;
