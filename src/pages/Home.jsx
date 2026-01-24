import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesPreview from '../components/ServicesPreview';
import ProjectsPreview from '../components/ProjectsPreview';
import CTA from '../components/CTA';
import Footer from '../components/Footer';



export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection/>
      <ServicesPreview />
      <ProjectsPreview />
      <CTA />
      <Footer/>

    </>
  );
}
