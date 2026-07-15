/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OfferQuestion from "./components/OfferQuestion";
import TheCircle from "./components/TheCircle";
import HowItWorks from "./components/HowItWorks";
import AboutContact from "./components/AboutContact";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // Scrollspy to detect active viewport section and highlight navbar tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "circle-services", "workflow", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger initial calculation
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-near-black text-text-primary overflow-x-hidden selection:bg-white/10 selection:text-white">
      {/* 1. Cinematic Film Grain Noise Overlay */}
      <div className="grain-overlay" />

      {/* 2. Premium Desktop trailing cursor */}
      <CustomCursor />

      {/* 3. Global Navbar with Ambient Sound Synthesizer */}
      <Navbar onNavigate={handleNavigation} activeSection={activeSection} />

      {/* 4. Main Content Landmark for SEO & Screen Readers */}
      <main id="main-content">
        {/* 4.1 Hero Section */}
        <Hero />

        {/* 4.2 Cinematic transition question */}
        <OfferQuestion />

        {/* 4.3 Pinned Interactive Circle Services (The centerpiece) */}
        <TheCircle />

        {/* 4.4 How It Works (Bespoke Real Estate Workflow) */}
        <HowItWorks />

        {/* 4.5 Interactive Connect Form & FAQs */}
        <AboutContact />
      </main>
    </div>
  );
}
