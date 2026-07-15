import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Compass, Film, Layers, KeyRound, ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WorkflowStep {
  phase: string;
  number: string;
  title: string;
  icon: any;
  tagline: string;
  description: string;
  duration: string;
  actions: string[];
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    phase: "PHASE 01",
    number: "01",
    title: "Discovery",
    icon: Compass,
    tagline: "Unveiling the core vision.",
    description: "A comprehensive 30-minute strategy call to analyze your development, identify the ideal target audience, and establish absolute clarity around your launch ambition.",
    duration: "30 Mins",
    actions: [
      "Development Assessment",
      "Audience Profiling",
      "Ambition Alignment"
    ]
  },
  {
    phase: "PHASE 02",
    number: "02",
    title: "Blueprint",
    icon: Layers,
    tagline: "Bespoke content architecture.",
    description: "A comprehensive 2-week content and marketing strategy establishing high-converting pillars, a structured publication calendar, editorial tone, and premium design references.",
    duration: "2 Weeks",
    actions: [
      "Strategic Content Pillars",
      "Interactive Rollout Calendar",
      "Tone & Style References"
    ]
  },
  {
    phase: "PHASE 03",
    number: "03",
    title: "Production",
    icon: Film,
    tagline: "Crafting pure architectural truth.",
    description: "On-site commercial shoots, cinema edits, and precision 8K drone days. Driven by rapid weekly review loops—absolutely nothing goes live without your formal nod.",
    duration: "Active Phase",
    actions: [
      "Cinema Ground & Aerial Shoots",
      "Precision Editing Loops",
      "Final Review Approval"
    ]
  },
  {
    phase: "PHASE 04",
    number: "04",
    title: "Iteration",
    icon: KeyRound,
    tagline: "Qualified lead generation.",
    description: "Bi-weekly granular reporting. We aggressively double down on high-performing campaigns and quietly retire what doesn't. Engineered specifically to supply high-integrity investor leads.",
    duration: "Continuous",
    actions: [
      "Bi-Weekly Reporting",
      "Strategic Performance Tuning",
      "Investor Lead Generation"
    ]
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Header slide and blur reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=80",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline cards staggered reveal
      gsap.fromTo(
        ".workflow-card-bento",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".workflow-grid-bento",
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="workflow"
      className="relative py-24 bg-[#050505] overflow-hidden px-6 md:px-12 lg:px-24 border-t border-white/5"
    >
      {/* Background Ambience Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-white/[0.01] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-14">
        
        {/* Header Block */}
        <div ref={headingRef} className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center space-x-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-xs text-white/80 tracking-[0.3em] uppercase">SYSTEMATIC WORKFLOW</span>
          </div>
          
          <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-normal leading-tight">
            How Our Business Works.
          </h2>
          
          <p className="font-sans text-xs sm:text-sm text-text-secondary font-light max-w-xl leading-relaxed">
            Operating at 0°—eliminating marketing bloat and generic real-estate templates. Discover our precise, highly efficient luxury representation pipeline.
          </p>
        </div>

        {/* 4-Column Responsive Bento Process Grid */}
        <div className="workflow-grid-bento grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                whileHover={{ y: -6, borderColor: "rgba(255, 255, 255, 0.2)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="workflow-card-bento flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md relative overflow-hidden group min-h-[360px]"
              >
                {/* Subtle top edge white highlight */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card Top: Number badge and Icon */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-serif italic text-2xl font-normal text-white/40 tracking-tight"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      {step.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/90">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Content: Title, Tagline, description */}
                  <div className="space-y-2.5 text-left">
                    <div className="space-y-0.5">
                      <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase">{step.phase}</div>
                      <h3 className="font-sans font-medium text-base text-white group-hover:text-white transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="font-serif italic text-xs text-white/80 font-light leading-relaxed">
                      &ldquo;{step.tagline}&rdquo;
                    </p>
                    
                    <p className="font-sans text-[11px] text-text-secondary font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Deliverables & Duration */}
                <div className="mt-6 pt-4 border-t border-white/5 space-y-4">
                  <div className="space-y-1.5 text-left">
                    <div className="font-mono text-[8px] text-white/30 tracking-widest uppercase">DELIVERABLES</div>
                    <div className="space-y-1">
                      {step.actions.map((act, i) => (
                        <div key={i} className="flex items-center space-x-2 text-[10px] text-text-secondary/90 font-light">
                          <Check className="w-3 h-3 text-white shrink-0" />
                          <span className="truncate">{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-mono text-white/40">TIMEFRAME</span>
                    <span className="font-mono bg-white/5 border border-white/10 px-2.5 py-0.5 rounded text-white font-medium">
                      {step.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Action CTA Section beneath bento cards */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md gap-4 text-left">
          <div className="space-y-1">
            <h4 className="font-sans font-medium text-sm text-white">Ready to begin luxury property positioning?</h4>
            <p className="font-sans text-xs text-text-secondary font-light">Submit a proposal and receive an audit in under 24 business hours.</p>
          </div>
          <button
            onClick={() => {
              const contactSec = document.getElementById("contact");
              if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center space-x-2.5 font-mono text-[10px] tracking-widest text-white hover:text-neutral-300 uppercase cursor-pointer transition-colors shrink-0 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-lg"
          >
            <span>Inquire About Representation</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
