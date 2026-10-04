import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import WhatsAppButton from "./components/WhatsAppButton";
import CallButton from "./components/callbutton";
import Home from "./pages/Home";
import Quote from "./pages/Quote";
import AboutSection from "./components/AboutSection";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

import OwnerLogin from "./pages/owner/OwnerLogin";
import PurchaseOrder from "./pages/owner/PurchaseOrder";
import PWARegister from "./pages/owner/PWARegister";
function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll reveal observer
    const handleScrollReveal = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );

      const elements = document.querySelectorAll("section, .reveal-on-scroll");
      elements.forEach((el) => {
        el.classList.add("reveal-on-scroll");
        observer.observe(el);
      });

      return observer;
    };

    const timer = setTimeout(() => {
      const observer = handleScrollReveal();
      return () => observer?.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <PWARegister />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />

        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/purchase-order" element={<PurchaseOrder />} />
      </Routes>
      <CallButton />
      <WhatsAppButton />
    </>
  );
}

export default App;
