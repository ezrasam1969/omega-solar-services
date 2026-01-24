import { Routes, Route } from 'react-router-dom';
import WhatsAppButton from './components/WhatsappButton';
import CallButton from './components/callbutton';
import Home from './pages/Home';
import Quote from './pages/Quote';
import AboutSection from './components/AboutSection';



function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutSection />} />
      <Route path="/quote" element={<Quote />} />
    </Routes>
    <CallButton></CallButton><WhatsAppButton /></>

  );
}

export default App;
