import { processSteps } from "../content/home";

const Steps = () => {
  return (
    <section id="process" className="steps">
      <h2>HOW SHEFWARE WORKS</h2>
      <p className="steps-lede">EASY PROCESS AND GET POWERFUL RESULTS</p>
      <div className="grid steps-grid">
        {processSteps.map((step) => (
          <article key={step.title} className="step-card">
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Steps;
