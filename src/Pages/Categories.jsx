import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Star, ShoppingBag, Heart, 
  ArrowRight, Zap, Award, Flame, X
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../assets/assets';
import { useCart } from '../context/CartContext';







const Categories = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([2, 4]);

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <section id="shop" className="relative bg-zinc-950 py-24 border-t border-zinc-900 overflow-hidden">
      
      {/* Background Neon Glow Accent */}
      <div className="absolute -bottom-48 -left-48 w-[40vw] h-[40vw] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-48 -right-48 w-[35vw] h-[35vw] bg-brand-orange/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Premium Storefront
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight"
          >
            Upgrade Categories & <span className="text-brand-orange">Parts</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-zinc-400 text-sm sm:text-base mt-4 font-light"
          >
            Select a custom category below to filter parts explicitly engineered to improve aerodynamics, exhaust volume, track speeds, and custom styling.
          </motion.p>
        </div>

        {/* 1. Category Quick Links Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {CATEGORIES.map((cat, index) => {
            const IconComponent = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative overflow-hidden text-left p-5 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                  isActive 
                    ? 'bg-zinc-900 border-brand-orange shadow-lg shadow-brand-orange/5' 
                    : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900/60 hover:border-zinc-700'
                }`}
              >
                {/* Active Hover Background Light Indicator */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br transition-opacity duration-300 rounded-full filter blur-xl opacity-20 pointer-events-none ${
                  isActive ? 'from-brand-orange' : 'from-brand-cyan opacity-0 group-hover:opacity-10'
                }`} />

                <div className="flex flex-col h-full justify-between gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                    isActive 
                      ? 'bg-brand-orange/10 border-brand-orange/40 text-brand-orange' 
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 group-hover:text-white'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tight">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] text-zinc-500 font-medium">
                      {cat.count} Items Available
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* 2. Dynamic Product Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isFav = favorites.includes(product.id);
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer"
                >
                  
                  {/* Product Visual Container (No real image, but stunning stylized mockup) */}
                  <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden flex items-center justify-center p-6">
                    {/* Visual Background Elements */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                    
                    {/* Glowing Core for Aesthetics */}
                    <div className={`absolute w-32 h-32 rounded-full filter blur-[40px] opacity-10 transition-opacity duration-300 group-hover:opacity-20 ${
                      product.category === 'carbon' ? 'bg-brand-orange' : 'bg-brand-cyan'
                    }`} />

                    {/* Render Product Image or Abstract Fallback Icon */}
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="relative z-10 w-full h-full max-h-[140px] object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="relative z-10 flex flex-col items-center">
                        {product.category === 'carbon' && <Flame className="w-16 h-16 text-brand-orange/40 group-hover:scale-110 group-hover:text-brand-orange transition-all duration-500" />}
                        {product.category === 'exhaust' && <Zap className="w-16 h-16 text-brand-cyan/40 group-hover:scale-110 group-hover:text-brand-cyan transition-all duration-500" />}
                        {product.category === 'wheels' && <Award className="w-16 h-16 text-zinc-400/40 group-hover:scale-110 group-hover:text-zinc-200 transition-all duration-500" />}
                        {product.category === 'lighting' && <Sparkles className="w-16 h-16 text-brand-cyan/40 group-hover:scale-110 group-hover:text-brand-cyan transition-all duration-500" />}
                        
                        <span className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase mt-4">
                          OEM SPEC DESIGN
                        </span>
                      </div>
                    )}

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      <span className="bg-zinc-900/90 text-white font-semibold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md border border-zinc-800">
                        {product.fitment.split(' ')[0]} Fit
                      </span>
                      {product.badge && (
                        <span className="bg-brand-orange text-zinc-950 font-display font-black text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-md">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Favorite Heart Trigger */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className="absolute top-4 right-4 p-2 bg-zinc-900/80 border border-zinc-800 rounded-lg hover:text-red-500 transition-all"
                      aria-label="Add to favorites"
                    >
                      <Heart className={`w-4 h-4 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-zinc-400'}`} />
                    </button>

                    {/* Hover Visual Action Overlay */}
                    <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Details Section */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating Row */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-xs font-bold text-zinc-300 ml-1">{product.rating}</span>
                        <span className="text-[10px] text-zinc-500 font-medium">({product.reviews} reviews)</span>
                      </div>

                      {/* Product Name */}
                      <h4 className="font-display font-black text-lg text-white uppercase tracking-tight line-clamp-1 group-hover:text-brand-orange transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-2 font-light">
                        {product.desc}
                      </p>

                      {/* Bullet Specs */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {product.features.slice(0, 2).map((feat, i) => (
                          <span key={i} className="text-[10px] bg-zinc-900 border border-zinc-800/80 px-2 py-0.5 rounded text-zinc-400">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing and Cart Actions */}
                    <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-zinc-500 line-through">${product.oldPrice}</span>
                        <p className="font-display font-black text-xl text-white tracking-tight">
                          ${product.price}
                        </p>
                      </div>
                      
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-brand-orange hover:border-brand-orange hover:text-zinc-950 p-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Catalogue Banner */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-display font-bold uppercase tracking-wider text-xs border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 backdrop-blur px-8 py-4 rounded-xl transition-all"
          >
            <span>Request Custom Offset Spec</span>
            <ArrowRight className="w-4 h-4 text-brand-orange" />
          </a>
        </div>

      </div>

      {/* 3. Product Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-950 border border-zinc-800/80 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative z-50 grid grid-cols-1 md:grid-cols-12"
              >
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white z-20 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Column: Visual Mockup */}
                <div className="md:col-span-5 bg-zinc-950 border-r border-zinc-900/80 flex flex-col items-center justify-center p-8 relative min-h-[250px] md:min-h-full">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:16px_28px] opacity-20" />
                  <div className={`absolute w-32 h-32 rounded-full filter blur-[50px] opacity-20 ${
                    selectedProduct.category === 'carbon' ? 'bg-brand-orange' : 'bg-brand-cyan'
                  }`} />
                  
                  {/* Render Product Image or Abstract Fallback Icon in Modal */}
                  {selectedProduct.image ? (
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="relative z-10 w-full h-auto max-h-[220px] object-contain transform hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="relative z-10 flex flex-col items-center">
                      {selectedProduct.category === 'carbon' && <Flame className="w-20 h-20 text-brand-orange" />}
                      {selectedProduct.category === 'exhaust' && <Zap className="w-20 h-20 text-brand-cyan" />}
                      {selectedProduct.category === 'wheels' && <Award className="w-20 h-20 text-zinc-300" />}
                      {selectedProduct.category === 'lighting' && <Sparkles className="w-20 h-20 text-brand-cyan" />}
                      <span className="text-xs text-zinc-500 font-mono tracking-widest uppercase mt-6">AutoZ Spec Lab</span>
                    </div>
                  )}
                </div>

                {/* Right Column: Spec Content */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Category & Fitment */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-bold text-[9px] tracking-widest uppercase px-2 py-0.5 rounded">
                        {selectedProduct.category}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-medium">
                        Fitment: {selectedProduct.fitment}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                      {selectedProduct.name}
                    </h3>

                    {/* Price and Stock */}
                    <div className="flex items-baseline gap-3 mt-3">
                      <span className="font-display font-black text-3xl text-white">${selectedProduct.price}</span>
                      <span className="text-sm text-zinc-500 line-through">${selectedProduct.oldPrice}</span>
                      <span className="text-xs text-emerald-500 font-semibold uppercase tracking-wider ml-auto bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        In Stock
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 mt-4 leading-relaxed font-light">
                      {selectedProduct.desc}
                    </p>

                    {/* Specs / Features Checkmarks */}
                    <div className="mt-6 space-y-2">
                      <h5 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Specifications</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {selectedProduct.features.map((feat, index) => (
                          <div key={index} className="flex items-center gap-2 text-zinc-300 text-xs font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-8 pt-6 border-t border-zinc-900 flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct, 1);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-brand-orange hover:bg-brand-orange-light text-zinc-950 font-display font-bold uppercase tracking-wide py-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart
                    </button>
                    
                    <button
                      onClick={() => toggleFavorite(selectedProduct.id)}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white px-4 rounded-xl transition-all cursor-pointer"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Categories;
