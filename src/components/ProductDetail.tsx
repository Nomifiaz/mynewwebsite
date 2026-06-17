import React, { useState } from "react";
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  Plus, 
  Minus,
  Check
} from "lucide-react";
import { Product, CartItem, ProductSpec } from "../types";

interface ProductDetailProps {
  product: Product;
  onGoBack: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetail({
  product,
  onGoBack,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  allProducts,
  onSelectProduct
}: ProductDetailProps) {
  // Gallery state
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  // Attribute picking states
  const colors = product.colors || ["#111111"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  
  const sizes = product.sizes || ["Standard"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  // Quantity counter state
  const [quantity, setQuantity] = useState(1);

  // Tabs state
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews" | "qa">("desc");

  // Wishlist check
  const isWishlisted = wishlist.some(item => item.id === product.id);

  // Handle adding to global state
  const [addedPrompt, setAddedPrompt] = useState(false);

  const handleAddToCartClick = () => {
    // Maps technical color hex back to human-readable text
    const colorLabel = selectedColor === "#1F2937" 
      ? "Slate Blue" 
      : selectedColor === "#064E3B" 
      ? "Forest Green" 
      : selectedColor === "#9CA3AF" 
      ? "Titanium Grey" 
      : "Default Color";

    onAddToCart(product, quantity, colorLabel, selectedSize);
    setAddedPrompt(true);
    setTimeout(() => setAddedPrompt(false), 2000);
  };

  // Dynamic related products list (match category, exclude other brand or custom product)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none animate-fade-in">
      {/* Back to Shop & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </button>
        
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <span>Home</span>
          <ChevronRight size={12} />
          <span>{product.category}</span>
          <ChevronRight size={12} />
          <span>Wearables</span>
          <ChevronRight size={12} />
          <span className="text-gray-700 font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main Grid: Images & Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-xs">
        {/* Left Column: Gallery (Spans 5 of 12 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#f0f2f1]/40 aspect-square rounded-xl overflow-hidden flex items-center justify-center p-6 relative border border-gray-50">
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Small Thumbnails Row */}
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`aspect-square rounded-lg border overflow-hidden p-2 flex items-center justify-center transition-all cursor-pointer ${
                  selectedImage === imgUrl 
                    ? "border-[#F37D35] ring-1 ring-[#F37D35]/50 bg-white" 
                    : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail View ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Controls & Ordering details (Spans 7 of 12 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            {/* Tag Badge */}
            {product.tag && (
              <span className="w-fit bg-[#ffefe3] text-[#F37D35] text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider select-none">
                {product.tag}
              </span>
            )}

            {/* Title */}
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Star Rating Reviews Block */}
            <div className="flex items-center gap-1.5 select-none">
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className="fill-amber-500" 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">({product.ratingCount} Customer Reviews)</span>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-4 mt-1 border-y border-gray-100 py-3.5 select-none">
              <span className="text-3xl font-extrabold text-gray-900 font-display">
                ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through font-mono">
                    ${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="bg-[#fee3e3] text-red-600 text-xs font-bold px-2.5 py-0.5 rounded-sm">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            
            <p className="text-xs text-gray-400 -mt-1 leading-none font-medium">
              Inclusive of all taxes. 12 months EMI available.
            </p>

            {/* SELECT COLOR attributes selector */}
            <div className="mt-2 select-none">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Select Color:
              </h3>
              <div className="flex items-center gap-3">
                {colors.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => setSelectedColor(hex)}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                      selectedColor === hex 
                        ? "border-[#002B24] ring-2 ring-emerald-500/20" 
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: hex }}
                    title={hex}
                  >
                    {selectedColor === hex && (
                      <Check size={12} className={hex === "#9CA3AF" ? "text-gray-900" : "text-white"} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* SELECT SIZE */}
            <div className="mt-2 select-none">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Select Size:
              </h3>
              <div className="flex items-center gap-2.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 border rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedSize === sz 
                        ? "border-[#002B24] bg-[#002B24] text-white" 
                        : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity control and Add to cart actions */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center border border-gray-200 rounded-lg h-12 bg-gray-50/50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 text-gray-500 hover:text-gray-800 transition-colors h-full flex items-center justify-center cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-bold text-sm text-gray-800 font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 text-gray-500 hover:text-gray-800 transition-colors h-full flex items-center justify-center cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Primary action */}
              <button
                onClick={handleAddToCartClick}
                className="flex-grow h-12 bg-[#F37D35] hover:bg-[#e06c25] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {addedPrompt ? "Added to Cart!" : "Add To Cart"}
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={(e) => onToggleWishlist(product, e)}
                className={`w-12 h-12 border rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  isWishlisted 
                    ? "border-red-500 bg-red-50/50 text-red-500" 
                    : "border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50/20"
                }`}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart size={18} className={isWishlisted ? "fill-red-500" : ""} />
              </button>
            </div>
          </div>

          {/* Secure Trust Highlights */}
          <div className="mt-2 border-t border-gray-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 select-none">
            <div className="flex gap-3 items-start text-left">
              <div className="p-2.5 bg-[#eff6ff] rounded-lg text-blue-600">
                <Truck size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-gray-800">Free Standard Shipping</h4>
                <p className="text-xs text-gray-400 mt-1">Est. delivery: Oct 24 - Oct 26</p>
              </div>
            </div>

            <div className="flex gap-3 items-start text-left">
              <div className="p-2.5 bg-[#f0fdf4] rounded-lg text-emerald-600">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-gray-800">Official Warranty</h4>
                <p className="text-xs text-gray-400 mt-1">2 Years Manufacturer warranty covering defects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout: Detailed specifications & reviews */}
      <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-xs">
        {/* Navigation bar tabs */}
        <div className="flex border-b border-gray-100 pb-3 gap-6 font-display font-medium text-sm select-none">
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === "desc" ? "border-[#F37D35] text-gray-950 font-bold" : "border-transparent text-gray-400 hover:text-gray-800"
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === "specs" ? "border-[#F37D35] text-gray-950 font-bold" : "border-transparent text-gray-400 hover:text-gray-800"
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === "reviews" ? "border-[#F37D35] text-gray-950 font-bold" : "border-transparent text-gray-400 hover:text-gray-800"
            }`}
          >
            Reviews ({product.reviews.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("qa")}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === "qa" ? "border-[#F37D35] text-gray-950 font-bold" : "border-transparent text-gray-400 hover:text-gray-800"
            }`}
          >
            Q&A
          </button>
        </div>

        {/* Dynamic Tab Panes */}
        <div className="mt-6">
          {activeTab === "desc" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left select-none leading-relaxed">
              <div className="flex flex-col gap-3">
                <h3 className="font-display font-bold text-gray-900 text-lg">
                  Unrivaled Precision Meets Modern Luxury
                </h3>
                <p className="text-gray-600 text-sm">
                  {product.description}
                </p>
                <div className="flex flex-col gap-2.5 mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-emerald-500 shrink-0" />
                    <span>Premium Aluminum Case with PVD Coating</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-emerald-500 shrink-0" />
                    <span>Scratch-resistant Sapphire Crystal Layer</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-emerald-500 shrink-0" />
                    <span>10-Day Battery Reserve with Always-On Display Mode</span>
                  </div>
                </div>
              </div>

              {/* Side Spec Checklist */}
              {product.specs && product.specs.length > 0 && (
                <div className="bg-gray-50/50 rounded-xl border border-gray-100 p-5">
                  <h4 className="font-display font-bold text-gray-800 text-xs uppercase tracking-widest mb-3 select-none">
                    SPECIFICATIONS
                  </h4>
                  <div className="divide-y divide-gray-100 text-xs">
                    {product.specs.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex justify-between gap-4 font-medium">
                        <span className="text-gray-400">{item.name}</span>
                        <span className="text-gray-700 text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "specs" && (
            <div className="mx-auto max-w-2xl select-none">
              <h3 className="font-display font-bold text-gray-950 text-base mb-4 text-center">Full System Specifications</h3>
              <table className="w-full text-xs text-left divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden bg-gray-50/30">
                <tbody>
                  {product.specs.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : ""}>
                      <td className="px-5 py-3.5 font-bold text-gray-500">{item.name}</td>
                      <td className="px-5 py-3.5 font-medium text-gray-700">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="flex flex-col gap-5 text-left select-none">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <h3 className="font-display font-bold text-gray-900 text-base">Consumer Opinions</h3>
                <button className="bg-[#002B24] hover:bg-[#00382e] text-white text-xs font-semibold py-2 px-4 rounded-md cursor-pointer transition-colors">
                  Write Review
                </button>
              </div>

              {product.reviews && product.reviews.length > 0 ? (
                <div className="flex flex-col gap-4 divide-y divide-gray-50">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="pt-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-800 text-sm">{rev.user}</span>
                        <span className="text-xs text-gray-400 font-mono">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star 
                            key={idx} 
                            size={12} 
                            className={idx < rev.stars ? "fill-amber-500" : "text-gray-200"} 
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400 text-xs font-medium">
                  There are no reviews yet. Be the first to express opinion for this product!
                </div>
              )}
            </div>
          )}

          {activeTab === "qa" && (
            <div className="text-left py-4 select-none">
              <h3 className="font-display font-bold text-gray-900 text-base mb-3">Questions & Answers</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
                Have specific queries regarding compatibility, performance, or shipment? Query our support agents directly or read compiled responses.
              </p>
              
              <div className="mt-5 flex flex-col gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col gap-1.5 text-xs">
                  <p className="font-bold text-gray-800">Q: Does this watch work completely with the Apple Watch app or dynamic wear sync?</p>
                  <p className="text-gray-600 leading-relaxed font-medium">A: Yes! The dynamic health sensors connect via both Android Wear Sync and Apple iOS Health Kit integrations seamlessly over Bluetooth.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER BAR RELATED PRODUCTS (Related Products block) */}
      {relatedProducts.length > 0 && (
        <div className="mt-8 pt-4">
          <div className="flex items-center justify-between mb-5 select-none">
            <h3 className="font-display text-lg font-bold text-gray-900">Related Products</h3>
            <span className="text-xs font-semibold text-[#F37D35] hover:underline cursor-pointer">
              View All Categories &rarr;
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <div 
                key={relProduct.id}
                onClick={() => {
                  onSelectProduct(relProduct);
                  setSelectedImage(relProduct.image);
                  setSelectedColor(relProduct.colors ? relProduct.colors[0] : "#111111");
                  setSelectedSize(relProduct.sizes ? relProduct.sizes[0] : "Standard");
                  setQuantity(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md hover-scale transition-all p-3 cursor-pointer text-left select-none flex flex-col gap-2.5"
              >
                <div className="bg-[#f0f2f1]/40 aspect-square rounded-lg flex items-center justify-center p-3 relative overflow-hidden">
                  <img
                    src={relProduct.image}
                    alt={relProduct.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <h4 className="font-display font-medium text-gray-800 text-xs line-clamp-1">{relProduct.name}</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] text-gray-400 font-bold">{relProduct.rating}</span>
                  </div>
                  <span className="font-bold text-gray-900 text-xs mt-1">
                    ${relProduct.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
