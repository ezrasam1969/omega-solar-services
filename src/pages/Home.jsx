import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import AboutSection from '../components/AboutSection';
import ServicesPreview from '../components/ServicesPreview';
import Process from '../components/Process';
import ProjectsPreview from '../components/ProjectsPreview';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import WhatWeOffer from "../components/WhatWeOffer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <AboutSection/>
      <WhatWeOffer />
      <ServicesPreview />
      <Process />
      <ProjectsPreview />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer/>
    </>
  );
}




