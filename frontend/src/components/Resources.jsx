const Resources = () => {
  const items = [
    {
      title: "News & Updates",
      desc: "Know about the latest product announcements and enhancements.",
    },
    {
      title: "Blogs & Articles",
      desc: "Read technical guides and insights for IT migration teams.",
    },
    {
      title: "FAQ",
      desc: "Find answers to common migration and backup questions.",
    },
  ];

  return (
    <section className="resources">
      <h2>Resources &amp; Learning</h2>
      <div className="grid">
        {items.map((item) => (
          <div key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Resources;
