import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import residentialImg from '../assets/images/residential.jpg';
import commImg from '../assets/images/comm.jpg';
import commercialImg from '../assets/images/Commercial.jpg';
import solarLandImg from '../assets/images/solarLand.jpg';
import heroSolarImg from '../assets/images/hero-solar.jpg';
import heroEnImg from '../assets/images/hero-en.jpg';
import powerpanelImg from '../assets/images/powerpanel.jpg';
import solarOutdoorImg from '../assets/images/solarOutdoor.jpg';
import './ProjectsPreview.css';

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Luxury Villa Rooftop Solar",
    type: "Residential",
    capacity: "8 kW",
    systemType: "On-Grid Solar System",
    location: "Jubilee Hills, Hyderabad",
    result: "Reduces monthly electricity bill by ₹7,200 (94% savings)",
    payback: "3.2 Years",
    imageAfter: residentialImg,
    imageBefore: heroSolarImg,
    highlights: ["PM Surya Ghar ₹78k Subsidy", "Mono PERC 540W Panels", "Net Metering Enabled"]
  },
  {
    id: 2,
    title: "Gachibowli Tech Park Office",
    type: "Commercial",
    capacity: "35 kW",
    systemType: "Commercial Rooftop Solar",
    location: "Gachibowli, Hyderabad",
    result: "Saves ₹32,000/month in peak commercial power tariffs",
    payback: "2.8 Years",
    imageAfter: commImg,
    imageBefore: powerpanelImg,
    highlights: ["40% Accelerated Depreciation", "Zero Export Controller", "Remote App Monitoring"]
  },
  {
    id: 3,
    title: "Cherlapally Manufacturing Plant",
    type: "Industrial",
    capacity: "120 kW",
    systemType: "Industrial Solar Plant",
    location: "Cherlapally, Hyderabad",
    result: "Cuts annual operational power expenses by ₹14.5 Lakhs",
    payback: "2.5 Years",
    imageAfter: commercialImg,
    imageBefore: solarLandImg,
    highlights: ["High-Duty Inverters", "Custom Elevated Framing", "24/7 Grid Synchronization"]
  },
  {
    id: 4,
    title: "Banjara Hills Residence",
    type: "Residential",
    capacity: "5 kW",
    systemType: "Hybrid Solar with Storage",
    location: "Banjara Hills, Hyderabad",
    result: "Reduces monthly bill by ₹4,500 with 24/7 uninterrupted power",
    payback: "3.5 Years",
    imageAfter: heroEnImg,
    imageBefore: solarOutdoorImg,
    highlights: ["Lithium Battery Backup", "Zero Power Outages", "App-controlled Monitoring"]
  },
  {
    id: 5,
    title: "Kondapur Retail Complex",
    type: "Commercial",
    capacity: "50 kW",
    systemType: "Commercial Solar Array",
    location: "Kondapur, Hyderabad",
    result: "Generates 6,200 units monthly, achieving 85% grid offset",
    payback: "3.0 Years",
    imageAfter: commImg,
    imageBefore: powerpanelImg,
    highlights: ["Dual MPPT Trackers", "Elevated Roof Structure", "Net Metering Approved"]
  },
  {
    id: 6,
    title: "Patancheru Logistics Hub",
    type: "Industrial",
    capacity: "250 kW",
    systemType: "Mega Industrial Installation",
    location: "Patancheru, Hyderabad",
    result: "Reduces carbon footprint by 280 Tons of CO₂ annually",
    payback: "2.4 Years",
    imageAfter: solarLandImg,
    imageBefore: commercialImg,
    highlights: ["SCADA System", "Custom Weatherproof Array", "High ROI Asset"]
  }
];

export default function ProjectsPreview() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [beforeAfterToggle, setBeforeAfterToggle] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);

  const filterCategories = ['All', 'Residential', 'Commercial', 'Industrial'];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.type === activeFilter);

  const toggleImageState = (id) => {
    setBeforeAfterToggle(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        
        {/* Section Header */}
        <div className="projects-header">
          <div className="projects-subtitle-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Real Results Across Telangana</span>
          </div>
          <h2 className="projects-title">Our Recent Solar Installations</h2>
          <p className="projects-description">
            Explore our real-world solar projects in Hyderabad. Filter by sector and view Before/After roof transformations.
          </p>

          {/* Category Filter Tabs */}
          <div className="projects-filter-bar">
            {filterCategories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map(project => {
            const isShowingBefore = !!beforeAfterToggle[project.id];
            const currentImg = isShowingBefore ? project.imageBefore : project.imageAfter;

            return (
              <div key={project.id} className="project-card">
                
                {/* Image Container with Badges & Toggle */}
                <div className="project-image-wrapper">
                  <img 
                    src={currentImg} 
                    alt={`${project.title} - ${isShowingBefore ? 'Before Installation' : 'Installed Solar'}`}
                    className="project-img"
                    loading="lazy"
                  />
                  <div className="image-overlay-gradient"></div>

                  {/* Project Type Badge */}
                  <span className={`type-badge badge-${project.type.toLowerCase()}`}>
                    {project.type}
                  </span>

                  {/* Capacity Badge */}
                  <span className="capacity-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    {project.capacity}
                  </span>

                  {/* Before / After Toggle Button */}
                  <button 
                    className={`before-after-btn ${isShowingBefore ? 'active-before' : ''}`}
                    onClick={() => toggleImageState(project.id)}
                    title="Toggle Before / After Photo"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>{isShowingBefore ? 'Showing: BEFORE' : 'View BEFORE Roof'}</span>
                  </button>
                </div>

                {/* Card Content Body */}
                <div className="project-card-body">
                  <h3 className="project-name">{project.title}</h3>

                  {/* Location line */}
                  <div className="project-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    <span>{project.location}</span>
                  </div>

                  {/* Highlight Result box */}
                  <div className="project-result-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                    <span className="result-text">{project.result}</span>
                  </div>

                  {/* Technical Highlights Pills */}
                  <div className="project-highlights">
                    {project.highlights.map((item, idx) => (
                      <span key={idx} className="highlight-pill">• {item}</span>
                    ))}
                  </div>

                  {/* Action Row */}
                  <div className="project-card-footer">
                    <button 
                      className="btn-details"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Specs
                    </button>
                    <button 
                      className="btn-similar-quote"
                      onClick={() => navigate('/quote')}
                    >
                      Get Similar Quote →
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Modal for Detailed Project Specs */}
        {selectedProject && (
          <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div className="project-modal-card" onClick={e => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>✕</button>
              
              <div className="modal-header">
                <span className={`type-badge badge-${selectedProject.type.toLowerCase()}`}>
                  {selectedProject.type}
                </span>
                <h2>{selectedProject.title}</h2>
                <p className="modal-location">📍 {selectedProject.location}</p>
              </div>

              <div className="modal-body">
                <img src={selectedProject.imageAfter} alt={selectedProject.title} className="modal-img" />
                
                <div className="modal-stats-grid">
                  <div className="modal-stat-box">
                    <span className="modal-stat-label">Capacity</span>
                    <span className="modal-stat-value">{selectedProject.capacity}</span>
                  </div>
                  <div className="modal-stat-box">
                    <span className="modal-stat-label">System Type</span>
                    <span className="modal-stat-value">{selectedProject.systemType}</span>
                  </div>
                  <div className="modal-stat-box">
                    <span className="modal-stat-label">Estimated Payback</span>
                    <span className="modal-stat-value">{selectedProject.payback}</span>
                  </div>
                </div>

                <div className="modal-result-card">
                  <strong>Impact & Result:</strong>
                  <p>{selectedProject.result}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-modal-close" onClick={() => setSelectedProject(null)}>Close</button>
                <button 
                  className="btn-modal-quote" 
                  onClick={() => {
                    setSelectedProject(null);
                    navigate('/quote');
                  }}
                >
                  Request Solar Estimate
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

