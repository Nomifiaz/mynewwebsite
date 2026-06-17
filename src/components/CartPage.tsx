import React, { useState, useMemo } from "react";
import { 
  Trash2, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Shield, 
  Truck, 
  RotateCcw, 
  Tag, 
  ArrowRight, 
  HelpCircle,
  CheckCircle,
  X,
  CreditCard
} from "lucide-react";
import { CartItem, Product } from "../types";

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onGoBack: () => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function CartPage({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGoBack,
  allProducts,
  onSelectProduct
}: CartPageProps) {
  // Coupon state
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  // Checkout overlay state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Address/shipping details for checkout simulation
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  // Subtotal calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  // Tax calculation (flat 3.5% or matching static if cart has starting items)
  const tax = useMemo(() => {
    if (cart.length === 0) return 0;
    // Let's make it 3.5% of subtotal for active updates
    return subtotal * 0.035;
  }, [subtotal, cart]);

  // Dynamic promo discounts
  const discountAmount = useMemo(() => {
    return subtotal * (discountPercent / 100);
  }, [subtotal, discountPercent]);

  // Total
  const total = useMemo(() => {
    return Math.max(0, subtotal + tax - discountAmount);
  }, [subtotal, tax, discountAmount]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    const code = promoCode.trim().toUpperCase();
    if (code === "PIE30") {
      setDiscountPercent(30);
      setPromoSuccess("Code 'PIE30' applied successfully! 30% discount has been deducted.");
    } else if (code === "WELCOME10") {
      setDiscountPercent(10);
      setPromoSuccess("Code 'WELCOME10' applied successfully! 10% discount has been deducted.");
    } else {
      setPromoError("Invalid promo code. Try 'PIE30' for 30% off or 'WELCOME10' for 10% off!");
    }
  };

  const handleProceedCheckout = () => {
    setIsCheckingOut(true);
  };

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !address) {
      alert("Please provide shipping details");
      return;
    }
    setOrderPlaced(true);
  };

  const closeCheckoutFlow = () => {
    setIsCheckingOut(false);
    setOrderPlaced(false);
    if (orderPlaced) {
      onClearCart();
      onGoBack();
    }
  };

  // Carousel product suggestions (filter out what's already in the cart)
  const cartProductIds = cart.map(item => item.product.id);
  const suggestions = allProducts
    .filter(p => !cartProductIds.includes(p.id))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none animate-fade-in">
      
      {/* Back button link */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-semibold cursor-pointer"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </button>

        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-gray-400 hover:text-red-500 font-medium flex items-center gap-1 cursor-pointer transition-colors"
          >
            Clear All Items
          </button>
        )}
      </div>

      <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 border-b border-gray-100 pb-3 text-left">
        Your Shopping Cart
      </h1>
      <p className="text-gray-500 text-xs mt-1.5 text-left mb-6">
        {cart.length === 0 ? "Your shopping cart is empty" : `You have ${cart.length} unique item types in your cart.`}
      </p>

      {cart.length === 0 ? (
        /* Empty State Layout */
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center flex flex-col items-center justify-center gap-4 shadow-xs select-none">
          <div className="w-16 h-16 rounded-full bg-[#ffefe3] text-[#F37D35] flex items-center justify-center scale-110">
            <Tag size={28} />
          </div>
          <h2 className="font-display font-bold text-gray-800 text-lg">Your basket is currently empty</h2>
          <p className="text-gray-400 text-xs max-w-sm font-sans leading-relaxed">
            Fill your trolley with high-end premium chronographs, laptops, hybrid earbuds and modern accessories. Try out the latest workspace collection!
          </p>
          <button
            onClick={onGoBack}
            className="bg-[#002B24] hover:bg-[#003c32] text-white py-3 px-8 rounded-lg text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer mt-2"
          >
            Start Browsing Catalog
          </button>
        </div>
      ) : (
        /* Interactive Products & Summary Columns Split */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of items (Spans 8 of 12 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {cart.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 flex gap-4 items-center justify-between shadow-xs transition-shadow hover:shadow-xs relative"
              >
                {/* Trash Deletion Icon on Top Right absolutely or relative */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-gray-50 p-1.5 rounded-lg transition-all cursor-pointer"
                  title="Remove from basket"
                >
                  <Trash2 size={16} />
                </button>

                {/* Left: Product Thumbnail and Info block */}
                <div className="flex gap-4 items-center flex-grow">
                  <div className="bg-gray-50 rounded-lg w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden flex items-center justify-center p-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="text-left flex flex-col gap-1 pr-8">
                    <h4 
                      onClick={() => onSelectProduct(item.product)}
                      className="font-display font-semibold text-gray-900 text-sm md:text-base hover:text-[#F37D35] cursor-pointer line-clamp-1 mr-4"
                    >
                      {item.product.name}
                    </h4>
                    
                    {/* Item Specific selected indicators */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400 font-medium">
                      {item.selectedSize && (
                        <span>Size / Specs: <strong className="text-gray-600">{item.selectedSize}</strong></span>
                      )}
                      {item.selectedColor && (
                        <span className="flex items-center gap-1">
                          Color: <strong className="text-gray-600">{item.selectedColor}</strong>
                        </span>
                      )}
                    </div>

                    {/* Small Pricing Row for mobile inside details */}
                    <div className="flex items-center gap-2 mt-1 md:hidden">
                      <span className="text-sm font-bold text-gray-950">${item.product.price}</span>
                      {item.product.originalPrice && (
                        <span className="text-xs text-gray-300 line-through font-mono">${item.product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Area: Large pricing and Quantity counts */}
                <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0 min-w-[120px]">
                  <span className="font-display font-extrabold text-gray-900 text-sm">
                    ${(item.product.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                  {item.product.originalPrice && (
                    <span className="text-xs text-gray-300 line-through font-mono">
                      ${(item.product.originalPrice * item.quantity).toLocaleString("en-US")}
                    </span>
                  )}
                </div>

                {/* Middle/Right: Counter Increments */}
                <div className="flex items-center border border-gray-100 rounded-lg bg-gray-50/50 h-9 shrink-0 select-none mr-8 md:mr-0 pl-1">
                  <button
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 text-gray-400 hover:text-gray-800 flex items-center justify-center cursor-pointer h-full"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-gray-800 font-mono">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 text-gray-400 hover:text-gray-800 flex items-center justify-center cursor-pointer h-full"
                  >
                    <Plus size={11} />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Calculation Panel (Spans 4 of 12 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs select-none relative overflow-hidden">
              <h3 className="font-display font-bold text-gray-900 text-base border-b border-gray-50 pb-3.5 mb-4 text-left">
                Order Summary
              </h3>

              {/* Rows List */}
              <div className="flex flex-col gap-3.5 text-xs text-gray-500 font-medium">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-gray-800 font-semibold font-mono">
                    ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold font-sans">Free</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Tax (Estimated 3.5%)</span>
                  <span className="text-gray-800 font-semibold font-mono">
                    ${tax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between items-center bg-red-55 text-red-650 p-2.5 rounded-lg border border-red-100 font-bold">
                    <span className="flex items-center gap-1 animate-pulse">
                      <Tag size={12} />
                      Promo Deduction ({discountPercent}%)
                    </span>
                    <span className="font-mono">
                      -${discountAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}

                {/* PROMO CONVERSION FIELD SECTION */}
                <form onSubmit={handleApplyPromo} className="mt-2.5 pt-4 border-t border-gray-50 flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400 text-left">Promo Code</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#F37D35]"
                    />
                    <button
                      type="submit"
                      className="text-white px-4 bg-[#002B24] hover:bg-[#00382e] hover:shadow-sm rounded-lg font-bold text-xs cursor-pointer transition-colors whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <span className="text-[10px] text-red-500 text-left font-semibold">{promoError}</span>
                  )}
                  {promoSuccess && (
                    <span className="text-[10px] text-emerald-600 text-left font-semibold">{promoSuccess}</span>
                  )}
                </form>

                {/* TOTAL */}
                <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-gray-100 text-gray-900">
                  <span className="font-display font-bold text-sm">Total</span>
                  <span className="text-xl md:text-2xl font-extrabold text-[#002B24] font-display">
                    ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedCheckout}
                className="w-full mt-6 bg-[#002B24] hover:bg-[#00352c] text-white py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer hover:shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>

              {/* Secure Trust highlights list */}
              <div className="mt-6 flex flex-col gap-3 py-4 border-t border-gray-50 text-[11px] text-gray-400 font-medium select-none text-left">
                <div className="flex items-center gap-2.5">
                  <Shield size={14} className="text-emerald-500" />
                  <span>Secure Pay integrated 256-bit AES protection</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck size={14} className="text-emerald-500" />
                  <span>Fast Delivery inside 48 business hours fully tracked</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw size={14} className="text-emerald-500" />
                  <span>30 Day Returns backed with continuous cash refunds</span>
                </div>
              </div>
            </div>

            {/* Need Help Column Box */}
            <div className="bg-[#e4f8f4] border border-[#cbebe4] rounded-xl p-4 flex gap-3 text-left">
              <div className="p-2 bg-[#002B24] rounded-full text-white shrink-0 h-fit self-center">
                <HelpCircle size={16} />
              </div>
              <div className="flex flex-col gap-0.5 justify-center">
                <h4 className="font-bold text-xs text-[#002B24]">Need help with your order?</h4>
                <p className="text-[11px] text-emerald-800">
                  Chat with our experts or use our smart virtual shopping consultant in the footer bubble!
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Suggested Additions: "You Might Also Like" row */}
      {suggestions.length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-6 select-none">
            <h3 className="font-display text-lg font-bold text-gray-900 text-left">You Might Also Like</h3>
            <span 
              onClick={onGoBack}
              className="text-xs font-semibold text-[#F37D35] hover:underline cursor-pointer"
            >
              Continue Browsing &rarr;
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 select-none">
            {suggestions.map((rec) => (
              <div 
                key={rec.id}
                onClick={() => onSelectProduct(rec)}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md hover-scale p-3.5 cursor-pointer text-left flex flex-col gap-2.5"
              >
                <div className="bg-gray-50 aspect-square rounded-lg flex items-center justify-center p-3 relative overflow-hidden">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-[#F37D35]">{rec.subtitle}</span>
                  <h4 className="font-display font-medium text-gray-800 text-xs line-clamp-1">{rec.name}</h4>
                  <span className="font-extrabold text-gray-900 text-xs mt-1">
                    ${rec.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPACT DETAILED CHECKOUT OVERLAY SIMULATION DIALOG */}
      {isCheckingOut && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4 z-50 animate-fade-in10 select-none">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 flex flex-col gap-4">
            
            <button 
              onClick={closeCheckoutFlow}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer p-1 rounded-full hover:bg-gray-50"
            >
              <X size={18} />
            </button>

            {!orderPlaced ? (
              <form onSubmit={submitOrder} className="flex flex-col gap-4 text-left">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <CreditCard className="text-[#F37D35]" size={20} />
                  <h3 className="font-display font-bold text-gray-900 text-base">Checkout Shipping Details</h3>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="border border-gray-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#002B24]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500">Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Pie Street, New York, NY"
                    className="border border-gray-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#002B24]"
                  />
                </div>

                <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100 text-xs mt-1 font-medium flex flex-col gap-2">
                  <span className="uppercase text-[9px] font-bold text-gray-400">Order Summary Snapshot</span>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal ({cart.length} items)</span>
                    <span className="font-mono text-gray-800 font-bold">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-gray-200 pt-2 text-[#002B24] font-bold">
                    <span>Total due (inclusive tax/discounts)</span>
                    <span className="font-mono">${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 h-11 bg-[#002B24] hover:bg-[#00382e] text-white rounded-lg text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Pay & Authorize Order
                </button>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center gap-4 justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center scale-110">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg">Thank you, {fullName}!</h3>
                <p className="text-gray-500 text-xs max-w-sm font-sans leading-relaxed">
                  Your order has been authorized and queued successfully. A confirmation receipt will be generated and dispatched to your email immediately.
                </p>
                <div className="bg-gray-55 border rounded-lg py-2.5 px-4 font-mono text-xs text-gray-500">
                  Order Reference: #PM-{Math.floor(Math.random() * 900000) + 100000}
                </div>
                <button
                  onClick={closeCheckoutFlow}
                  className="mt-3 bg-[#F37D35] hover:bg-[#e06c25] text-white py-2.5 px-8 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  Dismiss Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
