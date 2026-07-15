import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star, Target, ShieldCheck, Zap, Activity } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceStop } from "../types";

gsap.registerPlugin(ScrollTrigger);

const SERVICES: ServiceStop[] = [
  {
    id: "cinematic-reels",
    number: "01",
    title: "Cinematic Reels",
    shortDesc: "Scroll-stopping short films designed to engage algorithms and audiences alike.",
    longDesc: "Scroll-stopping short films that make properties feel inevitable. Cut with high-frequency precision for modern algorithms, yet meticulously composed to elevate and respect the core architectural brand.",
    angle: 0,
    category: "Short-Form Cinema",
    stats: "Best in the Market / Elite Organic Hook",
    deliverables: ["Vertical Pacing Cuts", "Sound Design Optimization", "Algorithm-First Grading", "Hook & Narrative Testing"]
  },
  {
    id: "drone-aerial",
    number: "02",
    title: "Drone & Aerial",
    shortDesc: "Cinema-grade aerial perspectives capturing absolute spatial context.",
    longDesc: "Elite aerial directors deploying cinema-grade heavy-lift rigs. We capture true spatial context—the sprawling neighborhood, the golden-hour horizon, and the grand narrative of arrival.",
    angle: 60,
    category: "Aerial Cine-Studio",
    stats: "Best in the Market / Elite Spatial Composition",
    deliverables: ["High-Wind Stabilization", "Horizon Pacing Sweeps", "Neighborhood Context Maps", "Golden Hour Cinematic Grading"]
  },
  {
    id: "campaign-design",
    number: "03",
    title: "Campaign Design",
    shortDesc: "Coherent, multi-phase rollout systems for maximum positioning impact.",
    longDesc: "Launch, pre-launch, and exclusive festival campaigns designed as unified typographic and visual systems. We build immersive storytelling ecosystems rather than fragmented, one-off social posts.",
    angle: 120,
    category: "Strategic System Rollout",
    stats: "Elite Narrative Layout Alignment",
    deliverables: ["Visual Rollout Frameworks", "Interactive Launch Portals", "Pre-Registration Funnels", "Exclusive VIP Invitations"]
  },
  {
    id: "content-strategy",
    number: "04",
    title: "Content Strategy",
    shortDesc: "A monthly production rhythm built to accelerate your sales funnel.",
    longDesc: "A highly calibrated monthly publishing rhythm aligned strictly with your active sales funnel. Seamlessly bridging the gap between broad aesthetic awareness reels and high-converting, high-intent private assets.",
    angle: 180,
    category: "Funnel Optimization",
    stats: "Market-Leading Audience Conversions",
    deliverables: ["Monthly Content Calendars", "Audience Segment Mapping", "Conversion Path Outlines", "Funnel-Calibrated Creative Briefs"]
  },
  {
    id: "brand-films",
    number: "05",
    title: "Brand Films",
    shortDesc: "Anthem films and immersive teasers giving developments a voice.",
    longDesc: "High-concept anthem films and cinematic pre-launch teasers that bestow a unique, unforgettable voice upon your development. We translate steel, glass, and location into deep emotional inevitability.",
    angle: 240,
    category: "Premium Anthem Cinema",
    stats: "Director-Level Cinematic Narrative",
    deliverables: ["Narrative Scriptwriting", "Premium Actor Castings", "Ambient Sound Orchestration", "Director-Level Color Styling"]
  },
  {
    id: "performance-reporting",
    number: "06",
    title: "Performance Reporting",
    shortDesc: "Bi-weekly dashboards mapping creative engagement to qualified leads.",
    longDesc: "Bi-weekly digital dashboards and insights calls that directly connect creative content performance to real-world business results. We track reach, engagement metrics, and actual qualified high-net-worth investor leads.",
    angle: 300,
    category: "Intel & Attribution",
    stats: "Transparent Analytics & Real Lead Intel",
    deliverables: ["Bi-Weekly Dashboard Access", "Lead Qualification Tracking", "Algorithm Velocity Analysis", "Creative A/B Performance Audits"]
  }
];

export default function TheCircle() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const activeService = SERVICES[activeStopIndex];

  const CX = 250;
  const CY = 250;
  const R = 180;
  const circleCircumference = 2 * Math.PI * R; // approx 1130.97

  // Auto-scroll the active mobile tab button into center view when active index changes
  useEffect(() => {
    const activeBtn = document.getElementById(`mobile-tab-btn-${activeService?.id}`);
    const container = document.getElementById("mobile-tab-scroll-container");
    if (activeBtn && container) {
      const containerWidth = container.offsetWidth;
      const btnOffsetLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      container.scrollTo({
        left: btnOffsetLeft - containerWidth / 2 + btnWidth / 2,
        behavior: "smooth"
      });
    }
  }, [activeStopIndex, activeService?.id]);

  useEffect(() => {
    let lastActiveIndex = 0;
    let lastActiveMobileIndex = 0;
    const mm = gsap.matchMedia();

    // 1. Tablets & Desktops (>= 768px): Desktop circular dial with smooth scrub rotation
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2400", // Perfectly calibrated scroll duration with zero dead space at start/end
          pin: true,
          scrub: 1.5, // Luxurious inertial cushioning for silky high-FPS feel
          id: "circle-services-trigger",
          onUpdate: (self) => {
            const prog = self.progress;

            // Direct mapping of progress (0 to 1) for the full active scroll range
            const dialProg = prog;

            // Direct SVG attribute updates for max performance and perfect alignment
            const beacon = document.getElementById("orbiting-beacon");
            if (beacon) {
              // Rotate perfectly around center (250, 250) using native SVG transform attribute
              beacon.setAttribute("transform", `rotate(${dialProg * 360} 250 250)`);
            }

            const progressCircle = document.getElementById("progress-ring-circle");
            if (progressCircle) {
              const offset = circleCircumference - dialProg * circleCircumference;
              progressCircle.setAttribute("stroke-dashoffset", `${offset}`);
            }

            const index = Math.min(
              Math.floor(dialProg * SERVICES.length),
              SERVICES.length - 1
            );

            if (index !== lastActiveIndex) {
              lastActiveIndex = index;
              setActiveStopIndex(index);
            }
          }
        }
      });
    });

    // 2. Mobile devices (< 768px): Smooth scrolling/pinning showcase to step through services
    mm.add("(max-width: 767px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1200", // Moderate scroll duration for smooth steps without layout stretching
        pin: true,
        scrub: 1,
        id: "circle-services-trigger-mobile",
        onUpdate: (self) => {
          const prog = self.progress;
          const index = Math.min(
            Math.floor(prog * SERVICES.length),
            SERVICES.length - 1
          );

          if (index !== lastActiveMobileIndex) {
            lastActiveMobileIndex = index;
            setActiveStopIndex(index);
          }
        }
      });
    });

    // Refresh ScrollTrigger after a short delay and on load to account for React rendering and layout settles
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      mm.revert();
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="circle-services"
      className="relative w-full bg-bg-near-black flex flex-col justify-center items-center py-12 md:py-20 px-6 md:px-12 lg:px-24 overflow-hidden min-h-screen h-auto"
    >
      {/* Background glowing ambient light behind circle - Optimized with lower blur/opacity on mobile to prevent GPU fillrate lag */}
      <div className="absolute top-[50%] right-[10%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-[60px] lg:blur-[140px] pointer-events-none opacity-30 lg:opacity-100" />

      {/* DESKTOP INTEGRATED GSAP SCRUBBING GRAPHIC */}
      <div id="desktop-circle-interface" className="hidden md:grid grid-cols-12 gap-12 w-full max-w-7xl items-center relative z-20">
        
        {/* Left Side: Dynamic Details Panel (45% Width) */}
        <div id="services-details-pane" className="col-span-5 flex flex-col justify-center text-left min-h-[420px] lg:min-h-[500px] pr-2 lg:pr-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 10, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              className="space-y-6"
            >
              {/* Category / Counter */}
              <div className="flex items-center space-x-4">
                <span className="font-mono text-5xl font-extralight text-white/40 tracking-wider">
                  {activeService.number}
                </span>
                <div className="h-[1px] w-12 bg-white/10" />
                <span className="font-mono text-xs text-text-secondary tracking-[0.2em] uppercase">
                  {activeService.category}
                </span>
              </div>

              {/* Service Title */}
              <h2 className="font-serif italic text-4xl xl:text-5xl text-text-primary tracking-tight font-normal leading-none">
                {activeService.title}
              </h2>

              {/* Detailed writeup */}
              <p className="text-text-secondary text-sm leading-relaxed font-light font-sans">
                {activeService.longDesc}
              </p>

              {/* Highlight statistics metrics */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center space-x-4">
                <Activity className="w-5 h-5 text-white shrink-0" />
                <div>
                  <div className="font-mono text-[10px] uppercase text-text-secondary tracking-widest">AGENCY STANDARD</div>
                  <div className="font-display font-medium text-white text-sm">{activeService.stats}</div>
                </div>
              </div>

              {/* Specific Deliverables List */}
              <div className="space-y-3 pt-2">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">Key Deliverables</h4>
                <div className="grid grid-cols-2 gap-2">
                  {activeService.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center space-x-2 text-xs text-text-primary/80 font-light">
                      <span className="w-1 h-1 rounded-full bg-white" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Interactive Dial Centerpiece (55% Width) */}
        <div id="interactive-dial-pane" className="col-span-7 flex justify-center items-center relative h-[440px] lg:h-[600px]">
          
          {/* SVG Orbit and Progress Circle container */}
          <div className="relative w-[340px] h-[340px] lg:w-[480px] lg:h-[480px] flex items-center justify-center">
            
            <svg viewBox="0 0 500 500" className="w-full h-full select-none pointer-events-none">
              {/* Outer faint background tracks */}
              <circle
                cx={CX}
                cy={CY}
                r={R + 15}
                className="circle-svg-track"
                fill="none"
                stroke="rgba(255, 255, 255, 0.02)"
                strokeWidth="1"
              />
              <circle
                cx={CX}
                cy={CY}
                r={R - 15}
                className="circle-svg-track"
                fill="none"
                stroke="rgba(255, 255, 255, 0.02)"
                strokeWidth="1"
              />

              {/* Main Background static circular ring */}
              <circle
                cx={CX}
                cy={CY}
                r={R}
                className="circle-svg-track"
                fill="none"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />

              {/* Foreground active glowing progress ring (draws in real time) */}
              <circle
                id="progress-ring-circle"
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="2.5"
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleCircumference}
                strokeLinecap="round"
                style={{
                  transformOrigin: "center center",
                  transform: "rotate(-90deg)", // mathematically aligns the draw-in to start at 12 o'clock
                }}
              />

              {/* Gradient definition for the progress trail */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                  <stop offset="60%" stopColor="rgba(255, 255, 255, 0.4)" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>

              {/* Orbiting Beacon Glow Point */}
              <g id="orbiting-beacon" transform="rotate(0 250 250)">
                {/* Outer pulsing glow */}
                <circle
                  cx={CX}
                  cy={CY - R}
                  r="14"
                  fill="rgba(255, 255, 255, 0.15)"
                  className="animate-pulse"
                />
                {/* Secondary inner glow */}
                <circle
                  cx={CX}
                  cy={CY - R}
                  r="7"
                  fill="rgba(255, 255, 255, 0.6)"
                />
                {/* Core bright white dot */}
                <circle
                  cx={CX}
                  cy={CY - R}
                  r="3.5"
                  fill="#ffffff"
                />
              </g>
            </svg>

            {/* Orbiting labels positioned absolutely around container */}
            {SERVICES.map((srv, index) => {
              const labelAngleRad = (srv.angle - 90) * (Math.PI / 180);
              const isPassed = index <= activeStopIndex;
              const isCurrent = activeStopIndex === index;

              // Radius multiplier so labels sit nicely outside the 480px parent circle (approx 45% radius)
              const offsetMultiplier = 42; 
              const labelLeft = 50 + offsetMultiplier * Math.cos(labelAngleRad);
              const labelTop = 50 + offsetMultiplier * Math.sin(labelAngleRad);

              return (
                <div
                  key={srv.id}
                  id={`orbit-label-${srv.id}`}
                  className="absolute pointer-events-auto select-none transition-all duration-700"
                  style={{
                    left: `${labelLeft}%`,
                    top: `${labelTop}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <button
                    onClick={() => {
                      // Clicking on a label scrolls the screen proportionally to that position!
                      const triggerInstance = ScrollTrigger.getById("circle-services-trigger");
                      if (triggerInstance) {
                        const targetDialProg = (index + 0.5) / SERVICES.length;
                        const targetTotalProg = targetDialProg * 0.6 + 0.2;
                        const targetY = triggerInstance.start + (triggerInstance.end - triggerInstance.start) * targetTotalProg;
                        window.scrollTo({
                          top: targetY + 10,
                          behavior: "smooth"
                        });
                      } else {
                        // Fallback click behaviour if scrolltrigger not registered
                        setActiveStopIndex(index);
                      }
                    }}
                    className={`flex flex-col items-center group cursor-pointer text-center ${
                      isCurrent 
                        ? "scale-110 opacity-100" 
                        : isPassed 
                        ? "opacity-60 hover:opacity-90" 
                        : "opacity-20 hover:opacity-50"
                    }`}
                  >
                    {/* Small pointer point */}
                    <div
                      className={`w-1.5 h-1.5 rounded-full mb-1 transition-all duration-500 ${
                        isCurrent 
                          ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                          : isPassed 
                          ? "bg-white/40" 
                          : "bg-white/20"
                      }`}
                    />

                    {/* Service code */}
                    <span className="font-mono text-[9px] text-white font-semibold tracking-wider">
                      {srv.number}
                    </span>

                    {/* Srv Title */}
                    <span
                      className={`font-display text-[11px] tracking-widest uppercase mt-0.5 whitespace-nowrap transition-all duration-300 ${
                        isCurrent 
                          ? "text-white font-medium blur-none" 
                          : "text-text-secondary group-hover:text-white"
                      }`}
                    >
                      {srv.title.split(" ")[0]}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* MOBILE SECURE TIMELINE REVEAL */}
      <div id="mobile-services-timeline" className="md:hidden w-full max-w-2xl relative z-20 text-left space-y-6">
        <div className="border-b border-white/5 pb-4">
          <span className="font-mono text-xs text-white tracking-widest uppercase">OUR COMPREHENSIVE EXPERTISE</span>
          <h2 className="font-serif italic text-3xl text-white mt-1">Core Marketing Capabilities</h2>
        </div>

        {/* Tab Selector */}
        <div id="mobile-tab-scroll-container" className="flex overflow-x-auto pb-2 gap-2 scrollbar-none snap-x -mx-6 px-6 scroll-smooth">
          {SERVICES.map((srv, idx) => {
            const isSelected = activeStopIndex === idx;
            return (
              <button
                key={srv.id}
                id={`mobile-tab-btn-${srv.id}`}
                onClick={() => {
                  const triggerInstance = ScrollTrigger.getById("circle-services-trigger-mobile");
                  if (triggerInstance) {
                    const targetMobileProg = (idx + 0.5) / SERVICES.length;
                    const targetTotalProg = targetMobileProg * 0.8 + 0.1;
                    const targetY = triggerInstance.start + (triggerInstance.end - triggerInstance.start) * targetTotalProg;
                    window.scrollTo({
                      top: targetY + 10,
                      behavior: "smooth"
                    });
                  } else {
                    setActiveStopIndex(idx);
                  }
                }}
                className={`flex-none snap-start px-4 py-3 rounded-xl border text-left transition-all duration-300 min-w-[110px] cursor-pointer ${
                  isSelected
                    ? "bg-white/15 border-white/25 text-white shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
                    : "bg-white/[0.02] border-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <div className="font-mono text-[9px] tracking-widest text-white/50 mb-0.5">{srv.number}</div>
                <div className="font-sans font-medium text-[11px] whitespace-nowrap">{srv.title}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Card Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-6 rounded-2xl space-y-5 bg-[#0e0e0e] lg:bg-[#0a0a0a]/80 lg:backdrop-blur-md border border-white/10"
          >
            <div className="flex justify-between items-center">
              <span className="font-serif italic text-3xl font-normal text-white/40">{activeService.number}</span>
              <span className="font-mono text-[9px] tracking-widest text-white/60 uppercase bg-white/5 px-2.5 py-1 rounded border border-white/5">
                {activeService.category}
              </span>
            </div>

            <h3 className="font-serif italic text-2xl text-text-primary font-normal">{activeService.title}</h3>
            <p className="text-text-secondary text-xs font-light leading-relaxed font-sans">{activeService.longDesc}</p>

            {/* Proven Metric */}
            <div className="flex items-center space-x-2 text-xs py-2 border-t border-white/5 pt-4">
              <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="font-mono text-text-secondary text-[11px]">Standard:</span>
              <span className="font-display text-white font-semibold text-[11px]">{activeService.stats}</span>
            </div>

            {/* Key Deliverables list */}
            <div className="space-y-2 pt-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">Key Deliverables</span>
              <div className="flex flex-wrap gap-1.5">
                {activeService.deliverables.map((del, dIdx) => (
                  <span key={dIdx} className="text-[10px] bg-white/5 border border-white/5 text-text-primary/90 px-2.5 py-1 rounded-full font-sans font-light">
                    {del}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
