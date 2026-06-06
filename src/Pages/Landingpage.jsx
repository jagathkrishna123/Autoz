import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Menu, X, Search, ShoppingCart, ChevronRight,
  Car, Shield, Truck, Sparkles, ArrowRight,
  User, Flame, Sliders, Play, RotateCcw
} from 'lucide-react';
import bgImage from '../assets/bg.png';
import bgImage2 from '../assets/bgimage.jpg';
import Categories from './Categories';
import Banner from './Banner';
import { useCart } from '../context/CartContext';

// Brand Logos
import bmwLogo from '../assets/bmw.png';
import ferrariLogo from '../assets/ferrari.png';
import benzLogo from '../assets/benz.png';
import renaultLogo from '../assets/renault.png';
import mahindraLogo from '../assets/mahindra.png';
import kiaLogo from '../assets/kia.png';


// Dummy vehicle database for the selector widget
const VEHICLE_DATA = {
  makes: ['Porsche', 'BMW', 'Audi', 'Toyota', 'Ford'],
  models: {
    Porsche: ['911 GT3', 'Cayman GT4', 'Taycan Turbo', 'Macan GTS'],
    BMW: ['M3 Competition', 'M5 CS', 'X5 M', 'Z4 Roadster'],
    Audi: ['RS6 Avant', 'R8 V10', 'RS Q8', 'S5 Coupe'],
    Toyota: ['GR Supra', 'GR Yaris', 'Tacoma TRD Pro', 'Land Cruiser'],
    Ford: ['Mustang Shelby GT500', 'F-150 Raptor', 'Bronco Wildtrak', 'Focus RS']
  },
  years: ['2026', '2025', '2024', '2023', '2022', '2021', '2020']
};

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Categories', href: '#' },
  { name: 'Performance', href: '#' },
  { name: 'Carbon Fiber', href: '#' },
  { name: 'Lighting', href: '#' },
  { name: 'Contact', href: '#' }
];

const BRANDS = [
  {
    name: 'BMW',
    logo: bmwLogo,
    upgrades: 'M Performance Aero, ECU Tunes, Titanium Valved Exhausts',
    count: '150+ parts'
  },
  {
    name: 'Ferrari',
    logo: ferrariLogo,
    upgrades: 'Carbon Fiber Diffusers, F1 Alcantara Wheels, Track Aero',
    count: '40+ parts'
  },
  {
    name: 'Mercedes-Benz',
    logo: benzLogo,
    upgrades: 'AMG Styling, Sequential Laser Tail Lights, Forged Wheels',
    count: '120+ parts'
  },
  {
    name: 'Kia',
    logo: kiaLogo,
    upgrades: 'GT-Line Carbon Styling, Plug & Play Tuners, LED Conversions',
    count: '65+ parts'
  },
  {
    name: 'Mahindra',
    logo: mahindraLogo,
    upgrades: 'Thar & XUV Upgrades, Premium Lighting, Tuning Modules',
    count: '80+ parts'
  },
  {
    name: 'Renault',
    logo: renaultLogo,
    upgrades: 'Sport Hatch Styling, Intake Upgrades, Forged Wheels',
    count: '55+ parts'
  }
];

const Landingpage = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  // Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Vehicle selector states
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [searchStatus, setSearchStatus] = useState('idle'); // idle, searching, found
  const [foundCount, setFoundCount] = useState(0);

  // Scroll handler for navbar glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update models list when make changes
  useEffect(() => {
    setSelectedModel('');
  }, [selectedMake]);

  // Handle vehicle search simulation
  const handleVehicleSearch = (e) => {
    e.preventDefault();
    if (!selectedYear || !selectedMake || !selectedModel) return;

    setSearchStatus('searching');

    // Simulate API search loading
    setTimeout(() => {
      setSearchStatus('found');
      // Generate random matching accessories count
      const count = Math.floor(Math.random() * 150) + 45;
      setFoundCount(count);
    }, 1800);
  };

  const resetVehicleSearch = () => {
    setSelectedYear('');
    setSelectedMake('');
    setSelectedModel('');
    setSearchStatus('idle');
  };

  // Nav link animations
  const navContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  // Mobile sidebar variants
  const sidebarVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const sidebarItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 font-sans text-zinc-100 overflow-x-hidden selection:bg-brand-orange selection:text-black">

      {/* 1. Header / Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'py-6 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-brand-orange to-brand-cyan rounded-xl p-[2px] transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-brand-orange group-hover:text-brand-cyan transition-colors duration-300 animate-pulse" />
                </div>
              </div>
              <span className="font-display font-black text-2xl tracking-tighter uppercase">
                AUTO<span className="text-brand-orange group-hover:text-brand-cyan transition-colors duration-300">Z</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-orange transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>

            {/* Navigation Right Actions */}
            <div className="hidden md:flex items-center gap-4">

              {/* Search Toggle */}
              <div className="relative flex items-center">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.input
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      type="text"
                      placeholder="Search parts, brands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-1.5 rounded-lg text-white focus:outline-none focus:border-brand-orange mr-2"
                    />
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors"
                  aria-label="Search"
                >
                  {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>
              </div>

              {/* Shopping Cart Icon with Badge */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors group"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-zinc-950 font-bold text-[10px] rounded-full flex items-center justify-center border border-zinc-950">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account icon */}
              <button
                className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* "Find Parts" CTA */}
              <a
                href="#garage"
                className="glow-btn bg-brand-orange text-zinc-950 font-display font-bold text-xs uppercase px-5 py-2.5 rounded-lg hover:bg-brand-orange-light transition-all flex items-center gap-1.5"
              >
                <Car className="w-4 h-4" />
                Garage Fit
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              {/* Simple Cart for Mobile */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 hover:bg-zinc-900 rounded-lg text-zinc-400"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4.5 h-4.5 bg-brand-orange text-zinc-950 font-bold text-[9px] rounded-full flex items-center justify-center border border-zinc-950">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* 2. Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer Container */}
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-80 bg-zinc-950 border-l border-zinc-800/60 p-6 z-50 flex flex-col justify-between shadow-3xl"
            >
              <div>
                {/* Header of Mobile Menu */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                      <Flame className="w-4 h-4 text-zinc-950" />
                    </div>
                    <span className="font-display font-bold text-lg uppercase tracking-tight">AutoZ Menu</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search parts, styling..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-brand-orange"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-zinc-500" />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <motion.a
                      variants={sidebarItemVariants}
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900/60 transition-colors"
                    >
                      <span className="font-medium text-base">{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-600" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Sidebar Footer Details */}
              <motion.div
                variants={sidebarItemVariants}
                className="mt-auto pt-6 border-t border-zinc-900 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 border border-zinc-800">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Welcome Back</p>
                    <p className="text-sm font-semibold text-zinc-200">Guest Rider</p>
                  </div>
                </div>

                <a
                  href="#garage"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-brand-orange text-zinc-950 font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-orange-light text-center"
                >
                  <Car className="w-5 h-5" />
                  Garage Fit Finder
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Hero Section */}
      <section className="relative min-h-screen pt-24 md:pt-0 flex items-center justify-center">

        {/* Background Image with Dark Gradient Overlays */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage2})` }}
        >
          {/* Subtle glow and texture overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/70" />

          {/* Neon Glow accent blur spots */}
          <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] bg-brand-orange/15 rounded-full filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] bg-brand-cyan/10 rounded-full filter blur-[100px] pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

            {/* Animated Performance Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="
    inline-flex
    items-center
    gap-1.5
    sm:gap-2

    bg-brand-orange/10
    border
    border-brand-orange/30

    rounded-full

    py-1
    sm:py-1.5

    px-3
    sm:px-4

    text-[9px]
    sm:text-xs

    font-semibold

    tracking-[0.08em]
    sm:tracking-wider

    text-brand-orange

    uppercase

    whitespace-nowrap
  "
            >
              <Sparkles
                className="
      w-3 h-3
      sm:w-3.5 sm:h-3.5

      text-brand-orange
      animate-spin-slow
      shrink-0
    "
              />

              <span className="truncate">
                Ultra-Performance Carbon & Accessories
              </span>
            </motion.div>

            {/* Hero Main Heading */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]"
              >
                Redefine Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-orange-light to-brand-cyan">
                  Drive & Styling
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed font-light"
            >
              Unlock the next level of automotive aesthetics and power. Browse our curated collection of aerospace-grade carbon fiber body kits, custom lighting configurations, and high-performance accessories tailored to absolute perfection.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
             <a
  href="#shop"
  className="
    glow-btn

    flex-1
    sm:flex-initial

    bg-brand-orange
    hover:bg-brand-orange-light

    text-zinc-950
    font-display
    font-bold
    uppercase

    text-[10px]
    sm:text-sm

    tracking-[0.08em]
    sm:tracking-wide

    px-4
    sm:px-8

    py-2.5
    sm:py-4

    rounded-lg
    sm:rounded-xl

    flex
    items-center
    justify-center

    gap-1.5
    sm:gap-2

    group
    transition-all

    whitespace-nowrap
  "
>
  <span>Shop Catalog</span>

  <ArrowRight
    className="
      w-3.5 h-3.5
      sm:w-5 sm:h-5

      group-hover:translate-x-1
      transition-transform
    "
  />
</a>

             <a
  href="#showcase"
  className="
    flex-1
    sm:flex-initial

    bg-zinc-900/60
    hover:bg-zinc-800/70

    border
    border-zinc-800

    text-zinc-300
    hover:text-white

    font-display
    font-bold
    uppercase

    text-[10px]
    sm:text-sm

    tracking-[0.08em]
    sm:tracking-wide

    px-4
    sm:px-8

    py-2.5
    sm:py-4

    rounded-lg
    sm:rounded-xl

    flex
    items-center
    justify-center

    gap-1.5
    sm:gap-2

    transition-all
    backdrop-blur-md

    whitespace-nowrap
    group
  "
>
  <Play
    className="
      w-3.5 h-3.5
      sm:w-4 sm:h-4

      fill-current
      text-zinc-400
      group-hover:text-white

      shrink-0
    "
  />

  <span>Showcase Video</span>
</a>
            </motion.div>

            {/* Trust and Stats Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="pt-6 border-t border-zinc-900/80 w-full grid grid-cols-3 gap-4"
            >
              <div>
                <p className="font-display font-black text-2xl sm:text-3xl text-white">45k+</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Parts Installed</p>
              </div>
              <div>
                <p className="font-display font-black text-2xl sm:text-3xl text-brand-cyan">100%</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Fitment Guarantee</p>
              </div>
              <div>
                <p className="font-display font-black text-2xl sm:text-3xl text-brand-orange">4.9★</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Client Rating</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Vehicle Part Finder Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.15 }}
            className="lg:col-span-5 w-full"
            id="garage"
          >
            <div className="relative bg-black/20 backdrop-blur-md border border-white/8 rounded-2xl p-5 sm:p-6 overflow-hidden">

              {/* Subtle top-left accent line only */}
              <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-brand-orange/60 to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-4 h-4 text-brand-orange" />
                  <h3 className="font-display font-bold text-base tracking-widest text-white/90 uppercase">Vehicle Matcher</h3>
                </div>
                <span className="text-[9px] text-white/30 font-mono uppercase tracking-widest">V.FIT 4.2</span>
              </div>

              {searchStatus !== 'found' ? (
                <form onSubmit={handleVehicleSearch} className="space-y-3">
                  {/* Select Year */}
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      disabled={searchStatus === 'searching'}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-brand-orange/60 focus:bg-white/8 transition-all disabled:opacity-40 appearance-none"
                      required
                    >
                      <option value="" className="bg-zinc-900">Choose Year</option>
                      {VEHICLE_DATA.years.map(y => <option key={y} value={y} className="bg-zinc-900">{y}</option>)}
                    </select>
                  </div>

                  {/* Select Make */}
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">Make</label>
                    <select
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      disabled={!selectedYear || searchStatus === 'searching'}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-brand-orange/60 focus:bg-white/8 transition-all disabled:opacity-40 appearance-none"
                      required
                    >
                      <option value="" className="bg-zinc-900">Choose Make</option>
                      {VEHICLE_DATA.makes.map(m => <option key={m} value={m} className="bg-zinc-900">{m}</option>)}
                    </select>
                  </div>

                  {/* Select Model */}
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">Model</label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={!selectedMake || searchStatus === 'searching'}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-brand-orange/60 focus:bg-white/8 transition-all disabled:opacity-40 appearance-none"
                      required
                    >
                      <option value="" className="bg-zinc-900">Choose Model</option>
                      {selectedMake && VEHICLE_DATA.models[selectedMake]?.map(m => (
                        <option key={m} value={m} className="bg-zinc-900">{m}</option>
                      ))}
                    </select>
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    disabled={!selectedModel || searchStatus === 'searching'}
                    className="w-full mt-1 bg-brand-orange/90 hover:bg-brand-orange text-zinc-950 font-display font-black uppercase text-xs tracking-widest py-3 rounded-lg hover:shadow-[0_0_18px_rgba(255,107,0,0.35)] active:scale-[0.98] transition-all disabled:opacity-30 disabled:hover:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {searchStatus === 'searching' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                        <span>Scanning...</span>
                      </>
                    ) : (
                      <>
                        <Car className="w-3.5 h-3.5" />
                        <span>Find Matching Parts</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Found accessories simulated results dashboard */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5 text-center py-3"
                >
                  <div className="w-14 h-14 bg-brand-cyan/10 border border-brand-cyan/25 rounded-full flex items-center justify-center mx-auto text-brand-cyan">
                    <Shield className="w-7 h-7 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl text-white uppercase tracking-tight">Verified Fitment!</h4>
                    <p className="text-[10px] text-brand-cyan/80 mt-1 font-semibold tracking-widest uppercase">OEM Standard Guaranteed</p>
                    <p className="text-xs text-white/40 mt-3">
                      Found <strong className="text-white font-mono">{foundCount}</strong> parts for your:
                    </p>
                    <p className="text-base font-display font-black text-brand-orange mt-1.5 uppercase tracking-wide">
                      {selectedYear} {selectedMake} {selectedModel}
                    </p>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={resetVehicleSearch}
                      className="flex-1 bg-white/5 border border-white/10 text-white/50 hover:text-white text-[11px] font-semibold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                    <a
                      href="#shop"
                      className="flex-1 bg-brand-orange/90 hover:bg-brand-orange text-zinc-950 text-[11px] font-display font-bold uppercase tracking-wider py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      View Parts
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. Bottom Highlight Strip (Quick Features) */}
      <section className="relative z-10 border-t border-zinc-900 bg-zinc-950/60 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">

            {/* Feature 1 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-900/30 transition-colors group">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-brand-orange group-hover:border-brand-orange/40 transition-colors">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-base text-zinc-100 uppercase tracking-tight">Express Shipping</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Free standard shipping on all orders over $150.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-900/30 transition-colors group">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-brand-cyan group-hover:border-brand-cyan/40 transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-base text-zinc-100 uppercase tracking-tight">Fitment Guarantee</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Not the right match? Return it hassle-free in 30 days.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-900/30 transition-colors group">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-brand-orange group-hover:border-brand-orange/40 transition-colors">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-base text-zinc-100 uppercase tracking-tight">Voted #1 Tuning Hub</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Over 10,000 positive reviews from car enthusiasts globally.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Supported Car Brands Section */}
      <section className="relative z-10 bg-zinc-950 py-24 border-t border-zinc-900 overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-brand-orange/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Title Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <Car className="w-3.5 h-3.5" />
              Elite Partnerships
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight"
            >
              Shop By <span className="text-brand-cyan">Car Brand</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-zinc-400 text-sm sm:text-base mt-4 font-light"
            >
              Explore custom upgrades, body kits, and tuning specs engineered explicitly for your vehicle's platform.
            </motion.p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRANDS.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Accent glow on hover */}
                <div className="absolute -right-12 -bottom-12 w-28 h-28 bg-brand-cyan/10 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Brand Logo Container */}
                  <div className="w-16 h-16 bg-zinc-950/80 border border-zinc-800 rounded-xl flex items-center justify-center p-3 transition-colors duration-300 group-hover:border-brand-orange/40">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} Logo`}
                      className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-zinc-500 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-md tracking-wider">
                    {brand.count}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-2 group-hover:text-brand-orange transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {brand.upgrades}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                  <span>Explore Catalog</span>
                  <ChevronRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product Categories & Catalogue Section */}
      <Categories />

      {/* 7. Banner Section */}
      <Banner />

      {/* 8. Footer Section */}
      <footer className="relative z-10 bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg uppercase tracking-tighter text-white">
              AUTO<span className="text-brand-orange">Z</span>
            </span>
            <span className="text-xs text-zinc-600">| © 2026 AutoZ Tuning Inc. All Rights Reserved.</span>
          </div>
          <div className="flex gap-6 text-xs uppercase tracking-wider font-semibold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Garage</a>
            <a href="#" className="hover:text-white transition-colors">Support Helpline</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landingpage;