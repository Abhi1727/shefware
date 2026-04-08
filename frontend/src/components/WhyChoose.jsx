import { useState } from "react";
import { whyFeatures } from "../content/home";

const WhyChoose = () => {
  const [active, setActive] = useState(whyFeatures[0]);

  return (
    <section className="why">
      <h2>Why Choose Shefware?</h2>
      <div className="grid">
        {whyFeatures.map((feature) => (
          <button
            key={feature}
            type="button"
            className={`feature ${feature === active ? "active" : ""}`}
            onClick={() => setActive(feature)}
          >
            {feature}
          </button>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
