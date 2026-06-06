import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Wrench, Zap } from 'lucide-react';
import carToRight from '../assets/cartoright.png';

const Banner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative w-full bg-zinc-950 overflow-hidden border-t border-zinc-900"
      style={{ minHeight: '600px' }}
    >
      {/* ── Subtle noise / grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 39px,#fff 39px,#fff 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,#fff 39px,#fff 40px)',
        }}
      />

      {/* ── Ambient glow spots ── */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-orange/8 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Giant watermark "GT3" behind the car ── */}
      <motion.span
        initial={{ opacity: 0, x: 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
        aria-hidden="true"
        className="absolute select-none pointer-events-none font-display font-black uppercase leading-none text-white/[0.04]"
        style={{
          fontSize: 'clamp(140px, 22vw, 320px)',
          right: '2%',
          top: '50%',
          transform: 'translateY(-50%)',
          letterSpacing: '-0.04em',
          zIndex: 1,
        }}
      >
        GT3
      </motion.span>

      {/* ── Car image ── right side, touching screen edge ── */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{ zIndex: 2, width: 'clamp(320px, 50%, 700px)' }}
      >
        {/* Fade on the LEFT edge so car blends into the dark bg */}
        <div
          className="absolute inset-y-0 left-0 w-2/5 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #09090b 0%, transparent 100%)',
            zIndex: 3,
          }}
        />
        <img
          src={carToRight}
          alt="High-performance sports car facing right"
          className="w-full h-full object-contain object-bottom select-none"
          draggable={false}
          style={{ opacity: 0.97 }}
        />
      </motion.div>

      {/* ── Main content — left side, car is on the right ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-20 flex flex-col justify-center"
        style={{ minHeight: 'inherit' }}
      >
        <div className="w-full lg:w-1/2 flex flex-col items-start">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center gap-2 mb-5"
        >
          <Wrench className="w-3.5 h-3.5 text-brand-orange" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Premium Auto Parts
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display font-black uppercase leading-[0.92] tracking-tight text-white"
          style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', maxWidth: '560px' }}
        >
          Upgrade your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orange-light">
            performance
          </span>{' '}
          <br className="hidden sm:block" />
          parts today
        </motion.h2>

        {/* Sub description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 text-zinc-400 font-light leading-relaxed max-w-sm"
          style={{ fontSize: 'clamp(13px, 1.5vw, 15px)' }}
        >
          Source OEM-grade and aftermarket components — exhaust systems,
          carbon aero, suspension, and ECU tunes — engineered for your exact
          vehicle fitment.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.52 }}
          className="flex items-center gap-4 mt-8"
        >
          {/* Primary pill button */}
         <a
  href="#shop"
  className="
    glow-btn
    inline-flex
    items-center
    gap-2

    bg-brand-orange
    hover:bg-brand-orange-light

    text-zinc-950
    font-display
    font-black
    uppercase

    text-[10px]
    sm:text-xs

    tracking-[0.12em]
    sm:tracking-widest

    px-4
    sm:px-7

    py-2.5
    sm:py-3.5

    rounded-full

    transition-all
    hover:shadow-[0_0_22px_rgba(255,107,0,0.45)]
    active:scale-[0.97]
  "
>
  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />

  <span className="whitespace-nowrap">
    Shop Parts
  </span>

  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
</a>

          {/* Ghost link */}
          <a
  href="#garage"
  className="
    inline-flex
    items-center
    gap-1

    text-zinc-400
    hover:text-white

    text-[10px]
    sm:text-xs

    font-semibold
    uppercase

    tracking-[0.12em]
    sm:tracking-widest

    transition-colors
    group

    whitespace-nowrap
  "
>
  Fit my vehicle

  <ArrowRight
    className="
      w-2.5 h-2.5
      sm:w-3 sm:h-3
      group-hover:translate-x-1
      transition-transform
    "
  />
</a>
        </motion.div>

        {/* Fine-print disclaimer */}
        <motion.p
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : {}}
  transition={{ duration: 0.6, delay: 0.7 }}
  className="
    mt-4
    sm:mt-5

    text-[9px]
    sm:text-[10px]

    text-zinc-600

    max-w-[220px]
    sm:max-w-xs

    leading-relaxed
  "
>
  Free express shipping on orders over $150 · 30-day fitment guarantee
  on all parts.
</motion.p>

       
        </div>
      </div>
    </section>
  );
};

export default Banner;