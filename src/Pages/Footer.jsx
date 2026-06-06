import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["Home", "About", "Benefit", "Gallery", "Contact"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const PorscheLogo = () => (
  <svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32">
    <text
      x="0" y="16"
      fontFamily="'Courier New', monospace"
      fontWeight="700"
      fontSize="14"
      letterSpacing="4"
      fill="#e5e5e5"
    >
      PORSCHE
    </text>
  </svg>
);

export default function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass = (field) =>
    `w-full bg-[#1a1a1a] border transition-all duration-300 rounded-2xl px-5 py-4 text-sm text-[#d4d4d4] placeholder-[#555] outline-none resize-none ${
      focused === field ? "border-[#555]" : "border-[#2a2a2a]"
    }`;

  return (
    <footer
      ref={ref}
      className="relative w-full bg-[#0a0a0a] text-[#d4d4d4] overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      {/* Subtle noise grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Top border line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#3a3a3a] to-transparent origin-left"
      />

      {/* Main content */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-14 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Left — Logo + Office Info */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <PorscheLogo />
            </motion.div>

            <div className="grid grid-cols-2 gap-8">
              {/* Global Office */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-4"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#888] font-medium">Global Office</p>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#aaa] mb-0.5">Phone</p>
                    <p className="text-[13px] text-[#666]">+629 954 4400</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#aaa] mb-0.5">Address</p>
                    <p className="text-[13px] text-[#666] leading-relaxed">
                      Aether Studio<br />
                      110 Mercer Street, 5th<br />
                      Floor, NY 10012, USA
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-4"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#888] font-medium">Navigation</p>
                <nav className="flex flex-col gap-2.5">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link}
                      href="#"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative text-[13px] text-[#777] hover:text-[#d4d4d4] transition-colors duration-300 w-fit"
                    >
                      <span>{link}</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[0.5px] bg-[#888] group-hover:w-full transition-all duration-400" />
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline gap-4 mb-8"
            >
              <h2
                className="text-3xl md:text-4xl font-light text-[#e8e8e8] tracking-tight"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Have any questions?
              </h2>
              <p className="text-[12px] text-[#555] hidden sm:block">
                Leave a request for a free consultation
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Name + Email row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className={inputClass("name")}
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className={inputClass("email")}
                  required
                />
              </motion.div>

              {/* Message */}
              <motion.textarea
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className={inputClass("message")}
                required
              />

              {/* Send button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className="w-full py-4 rounded-2xl bg-[#1f1f1f] border border-[#333] text-[#888] text-sm text-center tracking-widest uppercase"
                    >
                      Message sent ✓
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      type="submit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      className="group relative w-full py-4 rounded-2xl bg-[#e8e8e8] hover:bg-white text-[#0a0a0a] text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-300 overflow-hidden"
                    >
                      {/* Shimmer effect */}
                      <span
                        className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 ease-in-out"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                          skewX: "-20deg",
                        }}
                      />
                      Send
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent origin-left"
      />

      {/* Bottom bar */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-14 py-6 flex items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-[11px] text-[#444] tracking-wide"
        >
          ©2026 All Rights Reserved
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-0 border border-[#2a2a2a] rounded-full overflow-hidden transition-all duration-300 hover:border-[#444]"
          >
            <span className="text-[11px] text-[#666] group-hover:text-[#aaa] tracking-[0.12em] uppercase px-5 py-2.5 transition-colors duration-300">
              Back to Top
            </span>
            <div className="w-[1px] h-8 bg-[#2a2a2a] group-hover:bg-[#444] transition-colors duration-300" />
            <div className="w-10 h-10 flex items-center justify-center text-[#666] group-hover:text-[#aaa] transition-colors duration-300">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transform -rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300"
              >
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}