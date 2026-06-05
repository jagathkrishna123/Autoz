import diffuser from "../assets/diffuser.png";
import exhaust from "../assets/exhaust.png";
import wheelset from "../assets/wheelset.png";
import led from "../assets/led.png";
import plug from "../assets/Plug.png";
import steeringwheel from "../assets/steeringwheel.png";

import { 
  Sparkles,ShieldCheck,Zap,Award, Flame
} from 'lucide-react';





export const CATEGORIES = [
  { id: 'all', name: 'All Upgrades', icon: Sparkles, count: 24, desc: 'Browse our complete premium inventory' },
  { id: 'carbon', name: 'Carbon Fiber', icon: Flame, count: 8, desc: 'Ultra-lightweight aerodynamic styling' },
  { id: 'exhaust', name: 'Exhaust Systems', icon: Zap, count: 6, desc: 'Raw exhaust notes and power gains' },
  { id: 'wheels', name: 'Forged Wheels', icon: Award, count: 5, desc: 'Custom structural monoblock wheels' },
  { id: 'lighting', name: 'LED Lighting', icon: ShieldCheck, count: 5, desc: 'Dynamic indicators & laser tail lights' }
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'V-Spec Carbon Fiber Rear Diffuser',
    category: 'carbon',
    price: 1249,
    oldPrice: 1499,
    rating: 4.9,
    image: diffuser,
    reviews: 124,
    fitment: 'Porsche 911 (992) / Cayman GT4',
    features: ['Gloss UV Clear Coat', 'Pre-preg Carbon Fiber', 'Direct OEM Replacement'],
    badge: 'Popular',
    desc: 'Engineered specifically for high-velocity stability, this rear diffuser guides airflow underneath to minimize turbulence and boost downforce.'
  },
  {
    id: 2,
    name: 'Titanium Valvetronic Cat-back Exhaust',
    category: 'exhaust',
    price: 3499,
    oldPrice: 3850,
    rating: 5.0,
    image: exhaust,
    reviews: 86,
    fitment: 'BMW M3 (G80) / M4 (G82)',
    features: ['Grade 5 Titanium', 'Wireless Valve Control', '+18 HP Performance Gain'],
    badge: 'Best Value',
    desc: 'Unleash the true exhaust note of your engine. Features active valve controllers to shift from refined cruising to raw racetrack resonance.'
  },
  {
    id: 3,
    name: 'GT-R Monoblock Forged Wheel Set',
    category: 'wheels',
    price: 4800,
    oldPrice: 5200,
    rating: 4.8,
    image: wheelset,
    reviews: 43,
    fitment: 'Universal Fit (Custom Offset)',
    features: ['Aviation 6061-T6 Aluminum', 'Super Lightweight', 'Satin Carbon Finish'],
    badge: 'Custom Order',
    desc: 'Individually forged under 10,000 tons of pressure. Tailored to custom wheel offsets and bore sizes for absolute fender flush fitment.'
  },
  {
    id: 4,
    name: 'Sequential Laser LED Tail Lights',
    category: 'lighting',
    price: 699,
    oldPrice: 850,
    rating: 4.7,
    image: led,
    reviews: 198,
    fitment: 'Audi RS6 Avant / RS Q8',
    features: ['Plug & Play Install', 'Startup Dynamic Animation', 'E-Mark Certified'],
    badge: 'New',
    desc: 'Modernize your vehicle styling with dynamic sequential laser LEDs. Includes pre-programmed startup light animations.'
  },
  {
    id: 5,
    name: 'Stage 2 Plug & Play Tuning Module',
    category: 'exhaust', // categorized under performance/exhaust tuning
    price: 899,
    oldPrice: 1050,
    rating: 4.9,
    image: plug,
    reviews: 312,
    fitment: 'Toyota GR Supra / BMW M40i',
    features: ['Smartphone App Control', '5 Custom Driving Maps', 'Safe Engine Guard Engine Tech'],
    badge: 'Performance',
    desc: 'A premium piggyback ECU tuner that delivers instantaneous torque and throttle response without voiding original manufacturer warranty.'
  },
  {
    id: 6,
    name: 'F1-Inspired Alcantara Steering Wheel',
    category: 'carbon',
    price: 950,
    oldPrice: 1100,
    rating: 4.8,
    image: steeringwheel,
    reviews: 75,
    fitment: 'Porsche 911 / Taycan',
    features: ['Genuine Italian Alcantara', 'LED RPM Shift Lights', 'Real Carbon Fiber Trim'],
    badge: 'Premium',
    desc: 'Features built-in LED shift lights, carbon fiber top/bottom trims, and double-stitched Italian Alcantara for ultimate control.'
  }
];