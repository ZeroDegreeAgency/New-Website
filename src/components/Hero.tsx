import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".reveal-word");

      // 1. Initial page load (ensure everything starts clean and ready for scroll)
      gsap.set(words, { opacity: 0, y: 15 });
      gsap.set(".hero-subtitle", { opacity: 0, y: 15 });

      // Scroll indicator fade
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 0.65, y: 0, duration: 0.8, ease: "power2.out", delay: 0.5 }
      );

      // 2. Smooth Scroll-linked Pinned Word Reveal & Exit Transition
      if (containerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=180%", // Pinned scroll duration
            pin: true,
            scrub: 1.5, // Matching luxurious inertial cushioning
          }
        });

        // Reveal words step-by-step as you scroll
        if (words.length > 0) {
          tl.to(words, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            ease: "power1.out",
            duration: 0.8,
          });
        }

        // Reveal the subtitle text right after words appear
        tl.to(".hero-subtitle", {
          opacity: 0.8,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.2");

        // Hold briefly, then fade out whole content wrapper gracefully
        tl.to(contentRef.current, {
          y: -100,
          opacity: 0,
          scale: 0.95,
          filter: "blur(10px)",
          duration: 0.6,
          ease: "power2.inOut",
        }, "+=0.3");

        // Hide scroll indicator as soon as user starts scrolling
        tl.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.3,
          ease: "power2.in",
        }, 0);
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const target = document.getElementById("circle-services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden bg-bg-near-black z-10"
    >
      {/* Soft warm radial glow backdrop behind title */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Hero content wrapper */}
      <div
        ref={contentRef}
        className="max-w-4xl relative z-20 text-center flex flex-col items-center justify-center"
      >
        {/* Minimalistic Word-by-Word Title */}
        <h1
          ref={titleRef}
          className="font-serif italic font-normal text-text-primary text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-center flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-6"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          {"Who's telling your Story?".split(" ").map((word, i) => (
            <span key={i} className="reveal-word inline-block opacity-0">
              {word}
            </span>
          ))}
        </h1>

        {/* Lower Subtitle description */}
        <p
          className="hero-subtitle mt-8 text-text-secondary text-sm md:text-base max-w-md font-sans leading-relaxed font-light text-center opacity-0"
        >
          We strip away the static. We refine the message. We build high-concept identities and cinematic stories exclusively for luxury real estate developers and premium architectural landmarks.
        </p>
      </div>

      {/* Scroll indicator at the bottom */}
      <button
        ref={scrollIndicatorRef}
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 group text-center font-mono text-[10px] tracking-[0.2em] text-text-secondary cursor-pointer hover:text-white transition-colors"
      >
        <span className="relative flex h-3 w-3 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-text-secondary opacity-35"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
        </span>
        <span className="uppercase font-medium group-hover:translate-x-1 transition-transform font-mono">SCROLL TO DISCOVER</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </div>
  );
}
