import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "hero", label: "00 — INTRO" },
    { id: "circle-services", label: "01 — SERVICES" },
    { id: "workflow", label: "02 — HOW IT WORKS" },
    { id: "contact", label: "03 — CONNECT" },
  ];

  return (
    <>
      <motion.header
        id="main-nav-bar"
        className="fixed top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 lg:left-12 lg:right-12 z-50 px-5 py-3 md:px-8 md:py-3.5 flex justify-between items-center bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
      >
        {/* Logo / Brand Name */}
        <button
          id="nav-logo"
          onClick={() => {
            onNavigate("hero");
            setMobileMenuOpen(false);
          }}
          className="group flex items-center cursor-pointer text-left gap-2.5 focus:outline-none"
        >
          <svg
            className="h-8 w-8 text-white transition-all duration-300 group-hover:scale-110 flex-shrink-0"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <mask id="logo-mask">
                <rect x="0" y="0" width="100" height="100" fill="white" />
                <circle cx="70" cy="25" r="14.5" fill="black" />
              </mask>
            </defs>
            <path
              d="M 50 12 C 28 12 20 29 20 50 C 20 71 28 88 50 88 C 72 88 80 71 80 50 C 80 29 72 12 50 12 Z M 50 19 C 33 19 31 32 31 50 C 31 68 33 81 50 81 C 67 81 69 68 69 50 C 69 32 67 19 50 19 Z"
              fill="currentColor"
              fillRule="evenodd"
              mask="url(#logo-mask)"
            />
            <circle
              cx="70"
              cy="25"
              r="8"
              stroke="currentColor"
              strokeWidth="4.5"
              fill="none"
            />
          </svg>
          <span className="font-times font-bold text-sm md:text-base tracking-wide text-white transition-all duration-300 group-hover:text-white/80">
            ZERO DEGREE
          </span>
        </button>

        {/* Desktop Navigation Link Tabs */}
        <nav id="desktop-nav-links" className="hidden lg:flex items-center space-x-8 xl:space-x-12">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className="group relative font-mono text-[10px] tracking-widest uppercase cursor-pointer py-1 text-left"
              >
                <span className={`transition-all duration-300 ${isActive ? 'text-white' : 'text-text-secondary group-hover:text-white'}`}>
                  {item.label}
                </span>
                {/* Micro underline transition */}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-500 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Contact Us, Mobile Menu Trigger) */}
        <div id="nav-actions-container" className="flex items-center space-x-3 md:space-x-4">
          {/* Contact Us button */}
          <button
            id="nav-contact-button"
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center justify-center px-4 py-1.5 md:px-5 md:py-2 rounded-full font-mono text-[10px] tracking-widest uppercase bg-white text-neutral-950 font-bold hover:bg-neutral-200 hover:text-neutral-950 hover:shadow-[0_0_20px_rgba(255,255,255,0.45)] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Contact Us
          </button>

          {/* Mobile Menu Icon Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-white transition-all cursor-pointer pl-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-start px-12"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          >
            <div className="flex flex-col space-y-8 w-full">
              <div className="border-b border-white/10 pb-4 mb-4">
                <span className="font-mono text-xs text-text-secondary">MENU DIRECTORY</span>
              </div>
              {menuItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    id={`mobile-nav-item-${item.id}`}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="text-left font-display font-bold text-3xl tracking-tight transition-all text-white flex items-center group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, ease: "easeOut" }}
                  >
                    <span className={`mr-4 font-mono text-xs text-text-secondary group-hover:text-white`}>
                      0{index + 1}
                    </span>
                    <span className={`transition-all duration-300 ${isActive ? 'text-white pl-3' : 'group-hover:pl-3'}`}>
                      {item.label.split(" — ")[1]}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Social credentials in footer of mobile drawer */}
            <div className="absolute bottom-10 left-12 right-12 flex justify-between items-center text-text-secondary font-mono text-[10px] tracking-wider border-t border-white/5 pt-6">
              <span>ZERO DEGREE AGENCY</span>
              <span>INSTAGRAM</span>
              <span>TWITTER</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
