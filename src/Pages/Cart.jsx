import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ShoppingCart, Trash2, Plus, Minus,
  ChevronRight, ShieldCheck, Truck, RotateCcw,
  Tag, CreditCard, Flame, Zap, Award, Sparkles,
  Package, CheckCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const iconMap = {
  carbon: <Flame className="w-10 h-10 text-brand-orange/50" />,
  exhaust: <Zap className="w-10 h-10 text-brand-cyan/50" />,
  wheels: <Award className="w-10 h-10 text-zinc-400/50" />,
  lighting: <Sparkles className="w-10 h-10 text-brand-cyan/50" />,
};

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty, clearCart, cartTotal, cartCount } = useCart();

  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = cartTotal > 150 ? 0 : 19.99;
  const discount = couponApplied ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discount + shipping;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'AUTOZ10') {
      setCouponApplied(true);
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  // ── Order Confirmed screen ──
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="text-center px-6"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </div>
          <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight mb-3">Order Confirmed!</h2>
          <p className="text-zinc-400 text-base mb-2">Your parts are on their way to your garage.</p>
          <p className="text-sm text-zinc-500">Redirecting you back to the shop...</p>
          <div className="mt-6 w-48 h-1 bg-zinc-900 rounded-full mx-auto overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'linear' }}
              className="h-full bg-brand-orange rounded-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Empty Cart ──
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900/80 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold uppercase tracking-wider hidden sm:block">Back</span>
            </button>
            <a href="/" className="font-display font-black text-2xl tracking-tighter uppercase">
              AUTO<span className="text-brand-orange">Z</span>
            </a>
            <div className="w-20" />
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
            <ShoppingCart className="w-10 h-10 text-zinc-600" />
          </div>
          <h2 className="font-display font-black text-3xl text-white uppercase tracking-tight mb-3">Your Cart is Empty</h2>
          <p className="text-zinc-400 text-sm max-w-sm mb-8">You haven't added any parts yet. Browse our premium catalog and find your perfect upgrade.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-brand-orange hover:bg-amber-500 text-zinc-950 font-display font-bold uppercase tracking-wider px-8 py-4 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,107,0,0.25)]"
          >
            <ShoppingCart className="w-5 h-5" /> Browse Shop
          </button>
        </div>
      </div>
    );
  }

  // ── Cart with Items ──
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">

      {/* Background accents */}
      <div className="fixed -top-48 -right-48 w-[60vw] h-[60vw] bg-brand-orange/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="fixed -bottom-48 -left-48 w-[50vw] h-[50vw] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900/80 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold uppercase tracking-wider hidden sm:block">Continue Shopping</span>
          </button>

          <a href="/" className="font-display font-black text-2xl tracking-tighter uppercase">
            AUTO<span className="text-brand-orange">Z</span>
          </a>

          <div className="flex items-center gap-2 text-zinc-400">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-bold text-white text-sm">{cartCount}</span>
            <span className="text-xs hidden sm:block uppercase tracking-wider">items</span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto mt-2 flex items-center gap-1.5 text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
          <a href="/" className="hover:text-zinc-300 transition-colors">Home</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-400">Cart</span>
        </div>
      </nav>

      {/* ── Page Title ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
          Your <span className="text-brand-orange">Garage Cart</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-1">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      {/* ── Main Layout ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Cart Items List ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Clear cart button */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-xs text-zinc-500 hover:text-red-400 uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            </div>

            <AnimatePresence mode="popLayout">
              {cartItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-zinc-900/40 hover:bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-5 items-start transition-all"
                >
                  {/* Product Thumbnail */}
                  <div
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer hover:border-brand-orange/50 transition-colors p-2"
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${item.category === 'carbon' ? 'bg-brand-orange' : 'bg-brand-cyan'}`} />
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="flex items-center justify-center">{iconMap[item.category]}</div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">{item.category}</span>
                      <h3
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight leading-tight cursor-pointer hover:text-brand-orange transition-colors mt-0.5 line-clamp-2"
                      >
                        {item.name}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1 truncate">{item.fitment}</p>
                    </div>

                    {/* Price + Qty Controls */}
                    <div className="flex items-center justify-between flex-wrap gap-3 mt-1">
                      <div>
                        <span className="font-display font-black text-xl text-white">${(item.price * item.quantity).toLocaleString()}</span>
                        {item.quantity > 1 && (
                          <span className="text-xs text-zinc-500 ml-2">(${item.price.toLocaleString()} ea.)</span>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-bold text-sm text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Trust strip */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: <Truck className="w-4 h-4 text-brand-orange" />, text: 'Free shipping over $150' },
                { icon: <RotateCcw className="w-4 h-4 text-brand-cyan" />, text: '30-day returns' },
                { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, text: 'OEM fitment guaranteed' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-zinc-900/30 border border-zinc-800/60 rounded-xl px-3 py-2.5">
                  {icon}
                  <span className="text-[10px] text-zinc-400 font-semibold leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 sticky top-28 flex flex-col gap-5">
              <h2 className="font-display font-black text-xl text-white uppercase tracking-tight">Order Summary</h2>

              {/* Coupon */}
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    disabled={couponApplied}
                    placeholder="e.g. AUTOZ10"
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-50 placeholder:text-zinc-600"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !coupon}
                    className="px-4 py-2.5 bg-brand-orange hover:bg-amber-500 text-zinc-950 font-bold text-xs uppercase rounded-xl transition-all disabled:opacity-40 flex items-center gap-1"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 10% discount applied!
                  </motion.p>
                )}
                {!couponApplied && (
                  <p className="text-[10px] text-zinc-600 mt-1.5">Try <strong className="text-zinc-500">AUTOZ10</strong> for 10% off</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-zinc-800/60 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="text-zinc-200 font-semibold">${cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400">Promo Discount</span>
                    <span className="text-emerald-400 font-semibold">−${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-emerald-400' : 'text-zinc-200'}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-zinc-600">Add ${(150 - cartTotal).toFixed(2)} more for free shipping</p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline border-t border-zinc-800/60 pt-4">
                <span className="font-display font-black text-lg text-white uppercase tracking-tight">Total</span>
                <span className="font-display font-black text-2xl text-white">${finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckout}
                className="w-full py-4 bg-brand-orange hover:bg-amber-500 text-zinc-950 font-display font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(255,107,0,0.3)] hover:shadow-[0_0_35px_rgba(255,107,0,0.5)]"
              >
                <CreditCard className="w-5 h-5" /> Proceed to Checkout
              </motion.button>

              {/* Security note */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-bit SSL Secure Checkout</span>
              </div>

              {/* Package info */}
              <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-3 flex items-start gap-2.5">
                <Package className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  All orders are professionally packaged with OEM-grade protective foam. Estimated delivery: <strong className="text-zinc-400">3–7 business days.</strong>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Cart;