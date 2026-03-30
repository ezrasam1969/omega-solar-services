import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesPreview from '../components/ServicesPreview';
import ProjectsPreview from '../components/ProjectsPreview';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import WhatWeOffer from "../components/WhatWeOffer";



export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection/>
      <WhatWeOffer />
      <ServicesPreview />
      <ProjectsPreview />
      <CTA />
      <Footer/>

    </>
  );
}
