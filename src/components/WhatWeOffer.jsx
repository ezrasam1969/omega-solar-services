import React, { useState, useEffect } from "react";

// 📸 Import all 13 specification images from assets/images/specs
import adaniSpec from "../assets/images/specs/Adani.png";
import deyeSpec from "../assets/images/specs/Deye.png";
import polycabSpec from "../assets/images/specs/Polycab.png";
import renewsysSpec from "../assets/images/specs/Renewsys.png";
import tataSpec from "../assets/images/specs/Tata.png";
import waareeSpec from "../assets/images/specs/Warree.png";
import aparSpec from "../assets/images/specs/apar.png";
import earthingCompoundSpec from "../assets/images/specs/earthing compound.png";
import earthingToolsSpec from "../assets/images/specs/earthing tools.png";
import finolexSpec from "../assets/images/specs/finolex.png";
import polycabWiringSpec from "../assets/images/specs/polycab wiring.png";
import solisSpec from "../assets/images/specs/solis.png";
import sungrowSpec from "../assets/images/specs/sungrow.png";

import "./WhatWeOffer.css";

// =========================================================================
// 📸 SPECIFICATION IMAGES MAPPED TO 4 CATEGORIES
// =========================================================================
const CATEGORIES = [
  {
    id: "modules",
    title: "Solar Modules",
    accentColor: "#10b981",
    accentBg: "rgba(16, 185, 129, 0.12)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="3" y1="15" x2="21" y2="15"></line>
        <line x1="9" y1="3" x2="9" y2="21"></line>
        <line x1="15" y1="3" x2="15" y2="21"></line>
      </svg>
    ),
    description: "High-efficiency Tier-1 Mono PERC & TOPCon panels engineered for maximum solar generation even under partial shading conditions.",
    brands: ["Waaree Solar", "Adani Solar", "Tata Power Solar", "Renewsys Solar"],
    images: [
      { id: "mod-waaree", src: waareeSpec, title: "Waaree Solar Module Specification" },
      { id: "mod-adani", src: adaniSpec, title: "Adani Solar Module Specification" },
      { id: "mod-tata", src: tataSpec, title: "Tata Power Solar Module Specification" },
      { id: "mod-renewsys", src: renewsysSpec, title: "Renewsys Solar Module Specification" }
    ]
  },
  {
    id: "inverters",
    title: "Inverters and Conversion",
    accentColor: "#0284c7",
    accentBg: "rgba(2, 132, 199, 0.12)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        <path d="M6 12h4m-2-2v4"></path>
        <path d="M14 12h4"></path>
      </svg>
    ),
    description: "Advanced string & hybrid inverters with 98.5%+ DC-to-AC conversion efficiency and integrated real-time mobile monitoring.",
    brands: ["Solis Inverters", "Deye Hybrid", "Sungrow Inverters"],
    images: [
      { id: "inv-solis", src: solisSpec, title: "Solis Solar Inverter Specification" },
      { id: "inv-deye", src: deyeSpec, title: "Deye Hybrid Inverter Specification" },
      { id: "inv-sungrow", src: sungrowSpec, title: "Sungrow Solar Inverter Specification" }
    ]
  },
  {
    id: "cabling",
    title: "Heavy Duty Cabling",
    accentColor: "#f59e0b",
    accentBg: "rgba(245, 158, 11, 0.12)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
    description: "UV-protected pure copper & 3-phase armoured cabling engineered specifically to eliminate transmission power losses.",
    brands: ["Polycab Cable", "Apar Anode Cable", "Finolex Solar Wire", "Polycab Wiring Systems"],
    images: [
      { id: "cab-polycab", src: polycabSpec, title: "Polycab Armoured Cable Specification" },
      { id: "cab-apar", src: aparSpec, title: "Apar Solar & Anode Cable Specification" },
      { id: "cab-finolex", src: finolexSpec, title: "Finolex Solar DC Wire Specification" },
      { id: "cab-polycab-wiring", src: polycabWiringSpec, title: "Polycab Wiring & Conduit Specification" }
    ]
  },
  {
    id: "safety",
    title: "Solar Safety and Structures",
    accentColor: "#8b5cf6",
    accentBg: "rgba(139, 92, 246, 0.12)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    description: "Multi-layer surge protection, triple earthing pits, and heavy hot-dip galvanized elevated mounting structures.",
    brands: ["Triple Earthing Compound", "Earthing Protection Equipment"],
    images: [
      { id: "saf-compound", src: earthingCompoundSpec, title: "Earthing Compound & Safety Specification" },
      { id: "saf-tools", src: earthingToolsSpec, title: "Earthing Equipment & Tools Specification" }
    ]
  }
];

export default function WhatWeOffer() {
  // Category filter state for right card slideshow ("all" or categoryId)
  const [activeTab, setActiveTab] = useState("all");

  // Active slide index within the currently filtered slides
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Accordion expanded states for left card items
  const [expandedItems, setExpandedItems] = useState({
    modules: true,
    inverters: false,
    cabling: false,
    safety: false
  });

  // Calculate current visible slides based on selected filter tab
  const getVisibleSlides = () => {
    if (activeTab === "all") {
      return CATEGORIES.flatMap((cat) =>
        cat.images.map((imgObj) => ({ ...imgObj, categoryId: cat.id, categoryTitle: cat.title }))
      );
    }
    const cat = CATEGORIES.find((c) => c.id === activeTab);
    return cat ? cat.images.map((imgObj) => ({ ...imgObj, categoryId: cat.id, categoryTitle: cat.title })) : [];
  };

  const visibleSlides = getVisibleSlides();

  // 🔄 AUTOMATIC CONTINUOUS SLIDESHOW LOOP
  useEffect(() => {
    if (visibleSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % visibleSlides.length);
    }, 3500); // Advances to next slide every 3.5 seconds
    return () => clearInterval(interval);
  }, [visibleSlides.length, activeTab]);

  // Prev / Next controls
  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % visibleSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + visibleSlides.length) % visibleSlides.length);
  };

  // Clicking heading on left expands it and filters/switches slideshow to that heading's spec images
  const handleHeadingClick = (catId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
    setActiveTab(catId);
    setCurrentSlideIndex(0);
  };

  // Toggle expand all / collapse all
  const toggleAll = () => {
    const allExpanded = Object.values(expandedItems).every(Boolean);
    setExpandedItems({
      modules: !allExpanded,
      inverters: !allExpanded,
      cabling: !allExpanded,
      safety: !allExpanded
    });
  };

  return (
    <section className="offer-section" id="services">
      <div className="offer-container">
        
        {/* Section Header */}
        <div className="offer-header">
          <div className="offer-subtitle-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Tier-1 Engineering Components</span>
          </div>
          <h2 className="offer-title">What We Offer</h2>
          <p className="offer-subheading">
            Explore our complete engineering equipment breakdown and technical specification cards.
          </p>
        </div>

        {/* 2-Card Layout */}
        <div className="offer-two-card-layout">

          {/* LEFT CARD: Headings with Info & Brands */}
          <div className="offer-info-card">
            
            <div className="info-card-header">
              <h3 className="info-card-title">System Directory</h3>
              <button className="toggle-all-btn" onClick={toggleAll}>
                {Object.values(expandedItems).every(Boolean) ? "Collapse All" : "Expand All"}
              </button>
            </div>

            <div className="sections-accordion-list">
              {CATEGORIES.map((cat) => {
                const isExpanded = !!expandedItems[cat.id];

                return (
                  <div 
                    key={cat.id} 
                    className={`accordion-item ${isExpanded ? "is-open" : ""}`}
                    style={{ "--item-accent": cat.accentColor }}
                  >
                    
                    {/* Clickable Heading Bar */}
                    <div 
                      className="accordion-header"
                      onClick={() => handleHeadingClick(cat.id)}
                    >
                      <div className="header-title-group">
                        <div 
                          className="accordion-icon-box"
                          style={{ backgroundColor: cat.accentBg, color: cat.accentColor }}
                        >
                          {cat.icon}
                        </div>
                        <h4 className="item-heading-title">{cat.title}</h4>
                      </div>

                      <div className="accordion-action">
                        <span className="expand-indicator">
                          {isExpanded ? "-" : "+"}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Matter: Info & Brands */}
                    {isExpanded && (
                      <div className="accordion-body">
                        <p className="item-description-text">{cat.description}</p>

                        <div className="item-brands-wrap">
                          <span className="brands-label">Brands & Technical Specs:</span>
                          <div className="brands-pills">
                            {cat.brands.map((brand, bIdx) => (
                              <span 
                                key={bIdx} 
                                className="item-spec-pill"
                                style={{ borderLeftColor: cat.accentColor }}
                              >
                                {brand}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>


          {/* RIGHT CARD: Pure Spec Sheet Image Slideshow */}
          <div className="offer-slideshow-card">
            
            {/* Top Category Filter Tabs */}
            <div className="slideshow-filter-tabs">
              <button 
                className={`filter-tab-btn ${activeTab === "all" ? "active-tab" : ""}`}
                onClick={() => {
                  setActiveTab("all");
                  setCurrentSlideIndex(0);
                }}
              >
                All Specs ({CATEGORIES.reduce((acc, c) => acc + c.images.length, 0)})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-tab-btn ${activeTab === cat.id ? "active-tab" : ""}`}
                  onClick={() => {
                    setActiveTab(cat.id);
                    setCurrentSlideIndex(0);
                  }}
                >
                  {cat.title} ({cat.images.length})
                </button>
              ))}
            </div>

            {/* Spec Sheet Display Frame */}
            <div className="slideshow-viewport">
              {visibleSlides.map((slideObj, sIdx) => {
                const isActive = sIdx === currentSlideIndex;

                return (
                  <div 
                    key={slideObj.id} 
                    className={`slide-item ${isActive ? "active-slide" : ""}`}
                  >
                    <img 
                      src={slideObj.src} 
                      alt={slideObj.title} 
                      className="slide-image-element"
                    />
                  </div>
                );
              })}

              {/* Navigation Arrows */}
              {visibleSlides.length > 1 && (
                <>
                  <button className="slide-nav-btn prev-btn" onClick={prevSlide} aria-label="Previous">
                    ‹
                  </button>
                  <button className="slide-nav-btn next-btn" onClick={nextSlide} aria-label="Next">
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Bottom Dots & Spec Cards Strip */}
            {visibleSlides.length > 1 && (
              <div className="slideshow-bottom-nav">
                <div className="dots-navigation">
                  {visibleSlides.map((_, dIdx) => (
                    <button
                      key={dIdx}
                      className={`nav-dot ${dIdx === currentSlideIndex ? "active-dot" : ""}`}
                      onClick={() => setCurrentSlideIndex(dIdx)}
                    />
                  ))}
                </div>

                {/* Thumbnails of Spec Sheet Cards */}
                <div className="thumbnails-strip">
                  {visibleSlides.map((slideObj, tIdx) => (
                    <div 
                      key={slideObj.id}
                      className={`thumb-box ${tIdx === currentSlideIndex ? "active-thumb" : ""}`}
                      onClick={() => setCurrentSlideIndex(tIdx)}
                      title={slideObj.title}
                    >
                      <img src={slideObj.src} alt={slideObj.title} />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}