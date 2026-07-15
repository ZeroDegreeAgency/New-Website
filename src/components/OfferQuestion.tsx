import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OfferQuestion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Create scroll-driven cinematic reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Start animating when top enters bottom of viewport
          end: "bottom top",   // Finish when bottom leaves top of viewport
          scrub: 1,            // Smooth matching scrub cushioning
        }
      });

      // Ambient radial glow expansion and intensification (no filter anim for performance)
      tl.fromTo(
        glowRef.current,
        { scale: 0.7, opacity: 0.1 },
        { scale: 1.3, opacity: 0.35, ease: "none" }
      );

      // Smooth hardware-accelerated slide, scale, and fade (removed letterSpacing and blur animations for perfect smoothness)
      tl.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.96, y: 30 },
        { opacity: 1, scale: 1, y: 0, ease: "power2.out", duration: 0.4 },
        0.1
      )
      .to(
        textRef.current,
        { opacity: 0, scale: 1.04, y: -30, ease: "power2.in", duration: 0.4 },
        0.6
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="offer-question-trigger"
      className="relative min-h-[90vh] w-full bg-[#050505] flex flex-col justify-center items-center overflow-hidden z-20 px-6"
    >
      {/* Background Cinematic Radial Glow - with static blur-[140px] for GPU cache acceleration */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
        {/* Section Pre-Label */}
        <div className="flex justify-center">
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/70 uppercase bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            EXPLORING CAPABILITIES
          </span>
        </div>

        {/* Large, Beautiful Question */}
        <h2
          ref={textRef}
          className="font-display font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white tracking-widest leading-none select-none"
        >
          What do we offer?
        </h2>
      </div>

      {/* Decorative vertical line transition */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-white/10 to-transparent" />
    </div>
  );
}
