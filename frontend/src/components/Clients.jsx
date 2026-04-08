import { clientLogos } from "../content/home";

const Clients = () => {
  return (
    <section className="clients">
      <h2>our clients</h2>
      <p className="clients-lede">
        Supporting organizations with reliable email migration and data
        management solutions
      </p>
      <div className="clients-logos">
        {clientLogos.map((logo) => (
          <img key={logo.name} src={logo.path} alt={logo.name} />
        ))}
      </div>
    </section>
  );
};

export default Clients;
