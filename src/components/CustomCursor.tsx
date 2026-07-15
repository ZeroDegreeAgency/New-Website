import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listen to hoverable elements to change cursor state
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hoverable = target.closest("a, button, [role='button'], .hover-magnetic, select, input, textarea");
      if (hoverable) {
        setIsHovered(true);
        if (hoverable.getAttribute("data-cursor-text")) {
          setCursorText(hoverable.getAttribute("data-cursor-text") || "");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Springing Cursor Ring */}
      <motion.div
        id="custom-cursor-outer"
        className="custom-cursor-dot fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? (cursorText ? 84 : 48) : 12,
          height: isHovered ? (cursorText ? 84 : 48) : 12,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.9)",
          border: isHovered ? "none" : "1px solid rgba(255, 255, 255, 0.5)",
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {cursorText && (
          <span className="text-[10px] text-bg-near-black font-display font-bold uppercase tracking-wider text-center px-2">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Pin-Point dot */}
      <motion.div
        id="custom-cursor-inner"
        className="custom-cursor-dot fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
