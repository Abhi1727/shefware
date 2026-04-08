import "../styles/Home.css";
import Hero from "../components/Hero";
import Clients from "../components/Clients";
import FeaturedSolutions from "../components/FeaturedSolutions";
import Tools from "../components/Tools";
import Services from "../components/Services";
import MigrationExperts from "../components/MigrationExperts";
import TrustedPartnerCta from "../components/TrustedPartnerCta";
import WhyChoose from "../components/WhyChoose";
import Ecosystem from "../components/Ecosystem";
import Steps from "../components/Steps";
import Resources from "../components/Resources";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Clients />
      <FeaturedSolutions />
      <Tools />
      <Services />
      <MigrationExperts />
      <TrustedPartnerCta />
      <WhyChoose />
      <Ecosystem />
      <Steps />
      <Resources />
      <Testimonials />
      <div id="contact" className="home-contact-anchor" aria-hidden />
      <Footer />
    </div>
  );
};

export default Home;
