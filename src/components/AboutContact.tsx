import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  MapPin, 
  Mail, 
  CheckCircle, 
  ChevronDown, 
  Sparkles,
  HelpCircle,
  Phone
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Who do you work with?",
    answer: "Premium real estate developers, boutique builders, and high-end villa/plotting projects looking for cinematic, custom-tailored marketing systems rather than generic, template-driven content."
  },
  {
    question: "Why 3-month engagements only?",
    answer: "Real estate momentum compounds beautifully over time. A full quarter gives us the necessary window to architect a complete, high-performing content system—defining creative pillars, producing episodic campaigns, and delivering granular attribution reporting—instead of shipping disconnected, low-impact posts."
  },
  {
    question: "Do you handle shoots and drone in-house?",
    answer: "Yes, entirely. We deploy fully licensed professional drone pilots, heavy-lift cinema-grade camera rigs, and an elite in-house post-production team. We operate as a single end-to-end studio, managing everything from initial brand strategy to final color grading and asset export."
  },
  {
    question: "Which cities do you serve?",
    answer: "We are currently based exclusively in Ahmedabad to maintain absolute precision and hands-on production quality, with plans to expand our bespoke representation model to other major metropolitan cities soon."
  },
  {
    question: "How soon can we start?",
    answer: "We intentionally onboard a highly limited cohort of developments each quarter to guarantee our signature level of cinematic focus and elite execution. Discovery strategy calls typically occur within 48 hours of your initial inquiry."
  }
];

export default function AboutContact() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    propertyType: "Boutique Residential Development",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        propertyType: "Boutique Residential Development",
        message: ""
      });
    }, 1800);
  };

  return (
    <div className="bg-bg-near-black text-text-primary">
      {/* COMBINED CONNECT & INTEL SECTION */}
      <section
        id="contact"
        className="relative py-28 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#050505] border-t border-white/5"
      >
        {/* Soft warm radial glow backdrop */}
        <div className="absolute bottom-[10%] left-[30%] -translate-x-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
          
          {/* Info & FAQ Left Column */}
          <div className="lg:col-span-5 space-y-12 text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="font-mono text-xs text-white/80 tracking-[0.2em] uppercase">START REPRESENTATION</span>
              </div>
              <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-normal leading-tight">
                Let&apos;s Build.
              </h2>
              <p className="text-text-secondary text-sm font-light font-sans max-w-sm leading-relaxed">
                We accept a limited selection of elite real estate representations annually to ensure extreme focus and production quality. Reach out to schedule a private positioning audit.
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <div className="p-3 rounded-lg bg-white/5 text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase text-text-secondary tracking-widest">Inquire Directly</div>
                  <a href="mailto:hello@zerodegree.agency" className="text-sm font-display text-white hover:text-neutral-300 transition-colors">
                    hello@zerodegree.agency
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <div className="p-3 rounded-lg bg-white/5 text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase text-text-secondary tracking-widest">Inquire via Phone</div>
                  <a href="tel:+91 9979169607" className="text-sm font-display text-white hover:text-neutral-300 transition-colors">
                    +91 9979169607
                  </a>
                </div>
              </div>
            </div>

            {/* Real Estate Intel FAQ Sub-panel */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-white" />
                <span className="font-mono text-xs text-text-secondary tracking-[0.2em] uppercase">ACQUISITION INTEL</span>
              </div>
              
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
                      >
                        <span className="font-display text-xs sm:text-sm font-medium text-text-primary group-hover:text-white transition-colors">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-text-secondary transition-transform duration-500 ${
                            isOpen ? "transform rotate-180 text-white" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-white/5 text-[11px] sm:text-xs text-text-secondary font-light leading-relaxed font-sans">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer credentials */}
            <div className="pt-6 border-t border-white/5 text-xs text-text-secondary font-mono space-y-2">
              <div className="flex justify-between max-w-xs">
                <span>0° GROUP INC. ALL RIGHTS RESERVED</span>
              </div>
              <div className="flex space-x-6 text-[10px] tracking-wider uppercase">
                <a href="#hero" className="hover:text-white transition-colors">INSTAGRAM</a>
                <a href="#hero" className="hover:text-white transition-colors">LINKEDIN</a>
                <a href="#hero" className="hover:text-white transition-colors">TWITTER</a>
              </div>
            </div>
          </div>

          {/* Form Right Column */}
          <div className="lg:col-span-7">
            <div className="liquid-glass p-8 md:p-10 rounded-2xl relative overflow-hidden bg-white/[0.01] border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleFormSubmit}
                    className="space-y-6 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="font-display font-medium text-lg text-white">Submit a Representation Proposal</h3>
                      <p className="text-text-secondary text-xs font-light mt-1">Receive a comprehensive response within 24 business hours.</p>
                    </div>

                    {/* Form errors */}
                    {errorMessage && (
                      <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/50 text-red-300 text-xs font-mono">
                        {errorMessage}
                      </div>
                    )}

                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-text-secondary tracking-wider uppercase block">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="E.g., Julian Vance"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-text-primary focus:outline-none focus:border-white placeholder-white/20 transition-all font-sans"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-text-secondary tracking-wider uppercase block">Corporate Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="E.g., julian@vancearchitecture.com"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-text-primary focus:outline-none focus:border-white placeholder-white/20 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-text-secondary tracking-wider uppercase block">Company / Venture</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="E.g., Vance Heritage Group"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-text-primary focus:outline-none focus:border-white placeholder-white/20 transition-all font-sans"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-text-secondary tracking-wider uppercase block">Asset Class</label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-xs text-text-primary focus:outline-none focus:border-white transition-all font-sans"
                        >
                          <option value="Boutique Residential Development">Boutique Residential Development</option>
                          <option value="Private Villa / Estate">Private Villa / Luxury Estate</option>
                          <option value="Architectural Landmark / Heritage">Architectural Landmark / Heritage Site</option>
                          <option value="Commercial Landmark development">Commercial Landmark Development</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-text-secondary tracking-wider uppercase block">Brief Asset / Project Overview *</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about the property's design style, layout, current development status, and what represents success for this launch."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-text-primary focus:outline-none focus:border-white placeholder-white/20 transition-all font-sans resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-white text-[#050505] font-mono text-xs tracking-widest uppercase font-semibold hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-[0_5px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.2)] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                          <span>SECURELY TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>TRANSMIT PROPOSAL</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    className="py-12 text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", damping: 25 }}
                  >
                    <div className="flex justify-center">
                      <div className="p-4 rounded-full bg-white/5 border border-white/30 text-white animate-bounce">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif italic text-3xl text-white">Transmission Received.</h3>
                      <p className="text-text-secondary text-xs font-light max-w-sm mx-auto font-sans leading-relaxed">
                        Your strategic property brief has been safely secured. Our partners will analyze the architectural details and contact you directly in under 24 business hours.
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="font-mono text-[10px] tracking-widest text-white border-b border-white pb-1 uppercase cursor-pointer hover:text-neutral-300 hover:border-neutral-300 transition-colors"
                      >
                        SUBMIT ANOTHER PROPOSAL
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
