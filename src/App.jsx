import WhatsAppButton from './components/WhatsappButton';
import CallButton from './components/callbutton';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quote from './pages/Quote';

function App() {
  return (
    <><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quote" element={<Quote />} />
    </Routes>
    <CallButton></CallButton><WhatsAppButton /></>

  );
}

export default App;
