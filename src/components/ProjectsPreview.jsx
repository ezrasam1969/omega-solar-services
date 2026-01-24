import './ProjectsPreview.css';

export default function ProjectsPreview() {
  return (
    <section className="projects" id="projects">
      <h2>Recent Projects</h2>

      <div className="projects-grid">
        <div className="project-card">
          <img src="https://images.unsplash.com/photo-1584270354949-c26b0d1c8b37" />
          <p>Residential – 5kW – City Area</p>
        </div>

        <div className="project-card">
          <img src="https://images.unsplash.com/photo-1592833158982-d0b8d15d6c02" />
          <p>Commercial – 25kW – Office Building</p>
        </div>

        <div className="project-card">
          <img src="https://images.unsplash.com/photo-1509395176047-4a66953fd231" />
          <p>Industrial – 100kW – Factory Rooftop</p>
        </div>
      </div>
    </section>
  );
}
