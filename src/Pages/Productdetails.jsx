import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ShoppingCart, Zap, Star, Shield, Truck,
  Heart, Share2, Check, Flame, Award, Sparkles, Package,
  RotateCcw, ChevronRight, ShoppingBag, CreditCard
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../assets/assets';

const Productdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();

  const product = PRODUCTS.find(p => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 text-xl mb-4">Product not found.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-brand-orange text-zinc-950 font-bold px-6 py-3 rounded-xl"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const iconMap = {
    carbon: <Flame className="w-24 h-24 text-brand-orange/60" />,
    exhaust: <Zap className="w-24 h-24 text-brand-cyan/60" />,
    wheels: <Award className="w-24 h-24 text-zinc-400/60" />,
    lighting: <Sparkles className="w-24 h-24 text-brand-cyan/60" />,
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900/80 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold uppercase tracking-wider hidden sm:block">Back</span>
          </button>

          {/* Logo */}
          <a href="/" className="font-display font-black text-2xl tracking-tighter uppercase">
            AUTO<span className="text-brand-orange">Z</span>
          </a>

          {/* Cart */}
          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-zinc-950 font-bold text-[10px] rounded-full flex items-center justify-center border border-zinc-950">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto mt-2 flex items-center gap-1.5 text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
          <a href="/" className="hover:text-zinc-300 transition-colors">Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href="/#shop" className="hover:text-zinc-300 transition-colors">Shop</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-400 truncate max-w-[180px]">{product.name}</span>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: Product Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            {/* Main Image Card */}
            <div className="relative bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-10 group">
              {/* Grid texture */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

              {/* Glow */}
              <div className={`absolute w-56 h-56 rounded-full filter blur-[80px] opacity-15 group-hover:opacity-25 transition-opacity duration-500 ${
                product.category === 'carbon' ? 'bg-brand-orange' : 'bg-brand-cyan'
              }`} />

              {/* Corner deco */}
              {/* <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-r from-transparent to-brand-orange" />
              <div className="absolute top-0 right-0 w-[1px] h-20 bg-gradient-to-b from-transparent to-brand-orange" />
              <div className="absolute bottom-0 left-0 w-20 h-[1px] bg-gradient-to-l from-transparent to-brand-cyan" />
              <div className="absolute bottom-0 left-0 w-[1px] h-20 bg-gradient-to-t from-transparent to-brand-cyan" /> */}

              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
                />
              ) : (
                <div className="relative z-10 flex flex-col items-center gap-4">
                  {iconMap[product.category]}
                  <span className="text-xs text-zinc-600 font-mono tracking-widest uppercase">OEM Spec Design</span>
                </div>
              )}

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 bg-brand-orange text-zinc-950 font-display font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-lg">
                  {product.badge}
                </span>
              )}

              {/* Wishlist */}
              <button
                onClick={() => setIsFav(!isFav)}
                className="absolute top-4 right-4 p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl hover:border-red-500/60 transition-all"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-zinc-400'}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: <Truck className="w-4 h-4" />, label: 'Free Shipping', sub: 'Orders over $150' },
                { icon: <Shield className="w-4 h-4" />, label: 'Fitment Guarantee', sub: '30-day returns' },
                { icon: <Package className="w-4 h-4" />, label: 'OEM Quality', sub: 'Certified spec' },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-3 flex flex-col items-center text-center gap-1">
                  <span className="text-brand-orange">{icon}</span>
                  <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wide leading-tight">{label}</span>
                  <span className="text-[9px] text-zinc-600">{sub}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Product Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Category & Fitment Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                {product.fitment}
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                In Stock
              </span>
            </div>

            {/* Product Name */}
            <div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-700'}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-white">{product.rating}</span>
              <span className="text-sm text-zinc-500">({product.reviews} reviews)</span>
              <button className="ml-auto text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>

            {/* Price */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="font-display font-black text-4xl text-white">${product.price.toLocaleString()}</span>
                <span className="text-lg text-zinc-600 line-through">${product.oldPrice.toLocaleString()}</span>
                <span className="bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-bold text-xs px-2.5 py-1 rounded-lg">
                  Save {discount}%
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-2">Price includes GST. Free standard shipping on this item.</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Description</h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-light">{product.desc}</p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-zinc-900/40 border border-zinc-800/60 rounded-xl px-3 py-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-orange" />
                    </div>
                    <span className="text-sm text-zinc-300 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/60">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-xl font-bold"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-display font-black text-lg text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-xl font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-zinc-500">
                  Subtotal: <strong className="text-white">${(product.price * quantity).toLocaleString()}</strong>
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl font-display font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2.5 transition-all duration-300 ${
                  addedToCart
                    ? 'bg-emerald-500 text-white border border-emerald-500'
                    : 'bg-zinc-900 border border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600'
                }`}
              >
                {addedToCart ? (
                  <><Check className="w-5 h-5" /> Added to Cart!</>
                ) : (
                  <><ShoppingBag className="w-5 h-5" /> Add to Cart</>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleBuyNow}
                className="flex-1 py-4 rounded-xl font-display font-bold uppercase tracking-wider text-sm bg-brand-orange hover:bg-amber-500 text-zinc-950 flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.25)] hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]"
              >
                <CreditCard className="w-5 h-5" /> Buy Now
              </motion.button>
            </div>

            {/* Returns note */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 border-t border-zinc-900 pt-4">
              <RotateCcw className="w-3.5 h-3.5 text-brand-cyan" />
              <span>30-day hassle-free returns. <a href="#" className="text-brand-cyan hover:underline">Learn more</a></span>
            </div>
          </motion.div>
        </div>

        {/* ── Related Products ── */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
              You May <span className="text-brand-orange">Also Like</span>
            </h2>
            <a href="/#shop" className="text-xs text-zinc-400 hover:text-white uppercase tracking-wider font-semibold flex items-center gap-1 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map(p => (
              <motion.div
                key={p.id}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/product/${p.id}`)}
                className="group bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              >
                <div className="relative bg-zinc-950 aspect-video flex items-center justify-center p-4 overflow-hidden">
                  <div className={`absolute w-24 h-24 rounded-full filter blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity ${p.category === 'carbon' ? 'bg-brand-orange' : 'bg-brand-cyan'}`} />
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="relative z-10 h-24 object-contain group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="relative z-10">{iconMap[p.category]}</div>
                  )}
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-brand-orange text-zinc-950 font-bold text-[9px] tracking-widest uppercase px-2 py-0.5 rounded">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-display font-black text-sm text-white uppercase tracking-tight line-clamp-1 group-hover:text-brand-orange transition-colors">{p.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-white">${p.price.toLocaleString()}</span>
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-current" /> {p.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Productdetails;