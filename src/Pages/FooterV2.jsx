import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const NAV_LINKS = ["Home", "Categories", "Performance", "Carbon Fiber", "Lighting", "Contact"];

const TICKER_ITEMS = ["Premium Parts", "✦", "Carbon Fiber", "✦", "Fitment Guarantee", "✦", "Performance Upgrades", "✦", "Global Shipping", "✦", "OEM Standard", "✦"];

export default function FooterV2() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleSend = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 3000);
  };

  const fi = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const inputClass = "w-full bg-transparent border-0 border-b border-[#202020] focus:border-[#484848] py-2.5 text-sm text-[#bbb] placeholder-[#383838] outline-none transition-colors duration-200 font-light";

  return (
    <footer
      ref={ref}
      className="bg-[#0c0c0c] text-[#c8c8c8] overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Ticker */}
      <div className="border-b border-[#1e1e1e] py-3 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "ticker 18s linear infinite" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="px-8 text-[10px] font-bold tracking-[.18em] uppercase"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: item === "✦" || i % 4 === 0 ? "#3a3a3a" : "#282828",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Big heading strip */}
      <div className="border-b border-[#1e1e1e] px-10">
        <motion.div {...fi(0)} className="max-w-[1100px] mx-auto flex items-end justify-between gap-8 py-10">
          <h2
            className="text-[clamp(42px,7vw,88px)] font-black uppercase leading-[.95] tracking-[-0.04em] text-[#e8e8e8]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let's<br /><span className="text-[#3a3a3a]">Talk</span><br />Cars.
          </h2>
          <button className="flex items-center gap-2.5 bg-[#1a1a1a] border border-[#242424] rounded-full px-5 py-2.5 pl-2.5 hover:border-[#3a3a3a] transition-colors mb-2 group">
            <div className="w-8 h-8 bg-[#e8e8e8] rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4.5M11 1V7.5" stroke="#0c0c0c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[11px] font-bold tracking-[.12em] uppercase text-[#777] group-hover:text-[#aaa] transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
              Start a project
            </span>
          </button>
        </motion.div>
      </div>

      {/* Three col grid */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 border-b border-[#1e1e1e]">

        {/* Form */}
        <motion.div {...fi(0.05)} className="p-10 border-b md:border-b-0 md:border-r border-[#1e1e1e]">
          <p className="text-[10px] tracking-[.2em] uppercase text-[#333] mb-6">Send a message</p>
          <form onSubmit={handleSend} className="flex flex-col gap-0">
            <input className={inputClass + " mb-5"} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input className={inputClass + " mb-5"} type="email" placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <textarea className={inputClass + " resize-none h-16 mb-6"} placeholder="What are you looking for?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />

            {sent ? (
              <p className="text-xs tracking-[.1em] uppercase text-[#444]">Sent — we'll be in touch ✓</p>
            ) : (
              <button type="submit" className="flex items-center gap-3 group w-fit">
                <span className="text-[11px] font-bold tracking-[.15em] uppercase text-[#666] group-hover:text-[#ccc] transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Send inquiry
                </span>
                <div className="w-9 h-9 border border-[#282828] group-hover:border-[#484848] rounded-full flex items-center justify-center transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1 10L10 1M10 1H4M10 1V7" stroke="#666" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#ccc] transition-colors" />
                  </svg>
                </div>
              </button>
            )}
          </form>
        </motion.div>

        {/* Nav */}
        <motion.div {...fi(0.1)} className="p-10 border-b md:border-b-0 md:border-r border-[#1e1e1e]">
          <p className="text-[10px] tracking-[.2em] uppercase text-[#333] mb-6">Navigation</p>
          <nav className="flex flex-col gap-0">
            {NAV_LINKS.map(link => (
              <a key={link} href="#" className="group flex items-center justify-between text-[13px] text-[#444] hover:text-[#bbb] border-b border-transparent py-2 transition-colors duration-200">
                <span>{link}</span>
                <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-xs text-[#555]">→</span>
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Info */}
        <motion.div {...fi(0.15)} className="p-10">
          <p className="text-[10px] tracking-[.2em] uppercase text-[#333] mb-6">Get in touch</p>
          {[
            { label: "Phone", value: "+629 954 4400" },
            { label: "Email", value: "hello@autoz.com" },
            { label: "Address", value: "Aether Studio\n110 Mercer Street, 5th Floor\nNY 10012, USA" },
          ].map(({ label, value }) => (
            <div key={label} className="mb-5">
              <p className="text-[10px] tracking-[.15em] uppercase text-[#333] mb-1">{label}</p>
              <p className="text-[13px] text-[#555] leading-relaxed whitespace-pre-line">{value}</p>
            </div>
          ))}
          <div className="mt-6 pt-5 border-t border-[#1a1a1a]">
            <p className="text-[10px] tracking-[.15em] uppercase text-[#333] mb-3">Hours</p>
            <p className="text-[13px] text-[#555]">Mon – Fri &nbsp; 9am – 6pm</p>
            <p className="text-[13px] text-[#2e2e2e]">Sat – Sun &nbsp; Closed</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div {...fi(0.2)} className="max-w-[1100px] mx-auto flex items-center justify-between px-10 py-5 gap-4">
        <span className="text-[11px] text-[#2e2e2e] tracking-wide">©2026 AutoZ Tuning Inc. All rights reserved.</span>
        <span className="text-[13px] font-black tracking-[.25em] uppercase text-[#2a2a2a]" style={{ fontFamily: "'Syne', sans-serif" }}>AUTOZ</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="border border-[#1e1e1e] hover:border-[#383838] rounded text-[10px] font-bold tracking-[.15em] uppercase text-[#333] hover:text-[#666] px-3.5 py-2 transition-all"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          ↑ Top
        </button>
      </motion.div>

      <style>{`@keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%)}}`}</style>
    </footer>
  );
}