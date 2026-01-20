import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesPreview from '../components/ServicesPreview';
import ProjectsPreview from '../components/ProjectsPreview';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesPreview />
      <ProjectsPreview />
      <CTA />
      <Footer/>
    </>
  );
}
